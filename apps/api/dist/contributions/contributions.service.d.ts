import { PrismaService } from '../prisma/prisma.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
export declare class ContributionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateContributionDto): Promise<{
        id: string;
        type: import(".prisma/client").$Enums.ContributionType;
        status: import(".prisma/client").$Enums.ContributionStatus;
        content: import("@prisma/client/runtime/library").JsonValue;
        comment: string | null;
        createdAt: Date;
        updatedAt: Date;
        knowledgeUnitId: string | null;
        authorId: string;
    }>;
    findAllPending(): Promise<({
        knowledgeUnit: {
            id: string;
            type: import(".prisma/client").$Enums.KnowledgeType;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
        } | null;
        author: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        type: import(".prisma/client").$Enums.ContributionType;
        status: import(".prisma/client").$Enums.ContributionStatus;
        content: import("@prisma/client/runtime/library").JsonValue;
        comment: string | null;
        createdAt: Date;
        updatedAt: Date;
        knowledgeUnitId: string | null;
        authorId: string;
    })[]>;
    findOne(id: string): Promise<({
        knowledgeUnit: {
            id: string;
            type: import(".prisma/client").$Enums.KnowledgeType;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
        } | null;
        author: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
        };
        reviews: {
            id: string;
            comment: string | null;
            createdAt: Date;
            contributionId: string;
            reviewerId: string;
            approved: boolean;
        }[];
    } & {
        id: string;
        type: import(".prisma/client").$Enums.ContributionType;
        status: import(".prisma/client").$Enums.ContributionStatus;
        content: import("@prisma/client/runtime/library").JsonValue;
        comment: string | null;
        createdAt: Date;
        updatedAt: Date;
        knowledgeUnitId: string | null;
        authorId: string;
    }) | null>;
}
