import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ProposeRevisionDto } from './dto/propose-revision.dto';
import { ModerateRevisionDto, ModerationAction } from './dto/moderate-revision.dto';
import { User, UserRole } from '@prisma/client';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  private checkRole(user: User, allowedRoles: UserRole[]) {
    if (!allowedRoles.includes(user.role)) {
      throw new ForbiddenException('You do not have permission to perform this action');
    }
  }

  async createExercise(user: User, dto: CreateExerciseDto) {
    this.checkRole(user, [UserRole.ADMIN]);
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: dto.lessonId },
    });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return this.prisma.exercise.create({
      data: dto,
    });
  }

  async proposeRevision(dto: ProposeRevisionDto) {
    // Note: Propose is open to Contributor/Admin (checked at controller)
    // Validate that either lessonId or exerciseId is provided
    if (!dto.lessonId && !dto.exerciseId) {
      throw new BadRequestException('Either lessonId or exerciseId must be provided');
    }

    // Determine current version number
    const lastRevision = await this.prisma.contentRevision.findFirst({
      where: {
        OR: [
          { lessonId: dto.lessonId },
          { exerciseId: dto.exerciseId },
        ],
      },
      orderBy: { versionNumber: 'desc' },
    });

    const versionNumber = lastRevision ? lastRevision.versionNumber + 1 : 1;

    return this.prisma.contentRevision.create({
      data: {
        ...dto,
        versionNumber,
        status: dto.status || 'DRAFT',
      },
    });
  }

  async submitRevision(user: User, id: string) {
    const revision = await this.prisma.contentRevision.findUnique({
      where: { id },
    });

    if (!revision) {
      throw new NotFoundException('Revision not found');
    }
    
    // Check if user is the author or an admin
    if (revision.createdBy !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only the author can submit this revision');
    }

    if (revision.status !== 'DRAFT') {
      throw new BadRequestException('Only DRAFT revisions can be submitted');
    }

    return this.prisma.contentRevision.update({
      where: { id },
      data: { status: 'PENDING_REVIEW' },
    });
  }

  async moderateRevision(user: User, id: string, dto: ModerateRevisionDto) {
    this.checkRole(user, [UserRole.REVIEWER, UserRole.ADMIN]);
    const revision = await this.prisma.contentRevision.findUnique({
      where: { id },
    });

    if (!revision) {
      throw new NotFoundException('Revision not found');
    }

    // Create log entry
    await this.prisma.moderationLog.create({
      data: {
        revisionId: id,
        moderatorId: user.id,
        comment: dto.comment,
        action: dto.action,
      },
    });

    // Update revision status
    let status: 'APPROVED' | 'REJECTED' | 'DRAFT' = 'REJECTED';
    if (dto.action === ModerationAction.APPROVE) {
      status = 'APPROVED';
    } else if (dto.action === ModerationAction.REQUEST_CHANGES) {
      status = 'DRAFT';
    }

    return this.prisma.contentRevision.update({
      where: { id },
      data: { status: status as any },
    });
  }

  async getPublishedContent(lessonId: string) {
    // Return the latest approved/official revision
    return this.prisma.contentRevision.findFirst({
      where: {
        lessonId,
        status: 'APPROVED',
      },
      orderBy: [
        { isOfficial: 'desc' },
        { versionNumber: 'desc' },
      ],
    });
  }

  async getExerciseRevisions(exerciseId: string, skip = 0, take = 50) {
    return this.prisma.contentRevision.findMany({
      where: { 
        exerciseId,
        deletedAt: null
      },
      skip,
      take,
      orderBy: { versionNumber: 'desc' },
      include: { logs: true },
    });
  }
 
  async getRevisionComparison(id: string) {
    const revision = await this.prisma.contentRevision.findUnique({
      where: { id },
    });
 
    if (!revision) {
      throw new NotFoundException('Revision not found');
    }
 
    if (!revision.parentContentId) {
      return { current: revision, parent: null };
    }
 
    const parent = await this.prisma.contentRevision.findUnique({
      where: { id: revision.parentContentId },
    });
 
    return { current: revision, parent };
  }

  async compareTwoRevisions(id1: string, id2: string) {
    const [rev1, rev2] = await Promise.all([
      this.prisma.contentRevision.findUnique({ where: { id: id1 } }),
      this.prisma.contentRevision.findUnique({ where: { id: id2 } }),
    ]);

    if (!rev1 || !rev2) {
      throw new NotFoundException('One or both revisions not found');
    }

    return { rev1, rev2 };
  }

  async rollbackRevision(id: string, user: User) {
    this.checkRole(user, [UserRole.REVIEWER, UserRole.ADMIN]);
    const revision = await this.prisma.contentRevision.findUnique({
      where: { id },
    });

    if (!revision) {
      throw new NotFoundException('Revision not found');
    }

    // Create a new revision based on this one to preserve history
    return this.proposeRevision({
      lessonId: revision.lessonId || undefined,
      exerciseId: revision.exerciseId || undefined,
      isOfficial: revision.isOfficial,
      createdBy: user.id,
      parentContentId: id,
      status: 'APPROVED', // Rollback implies immediate approval if done by reviewer/admin
      data: revision.data as any,
    });
  }
}
