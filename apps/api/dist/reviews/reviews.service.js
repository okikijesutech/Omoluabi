"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ReviewsService = class ReviewsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createReview(dto) {
        const contribution = await this.prisma.contribution.findUnique({
            where: { id: dto.contributionId },
            include: { reviews: true },
        });
        if (!contribution) {
            throw new common_1.NotFoundException('Contribution not found');
        }
        if (contribution.status !== client_1.ContributionStatus.PENDING) {
            throw new common_1.BadRequestException('This contribution is no longer pending.');
        }
        const existingReview = contribution.reviews.find((r) => r.reviewerId === dto.reviewerId);
        if (existingReview) {
            throw new common_1.BadRequestException('You have already reviewed this contribution');
        }
        const newReview = await this.prisma.review.create({
            data: {
                contributionId: dto.contributionId,
                reviewerId: dto.reviewerId,
                approved: dto.approved,
                comment: dto.comment,
            },
        });
        await this.evaluateThresholds(dto.contributionId);
        return newReview;
    }
    async evaluateThresholds(contributionId) {
        const contribution = await this.prisma.contribution.findUnique({
            where: { id: contributionId },
            include: { reviews: true },
        });
        if (!contribution || contribution.status !== client_1.ContributionStatus.PENDING)
            return;
        let approvals = 0;
        let rejections = 0;
        for (const review of contribution.reviews) {
            if (review.approved)
                approvals++;
            else
                rejections++;
        }
        if (approvals >= 2) {
            await this.executeApproval(contribution.id);
        }
        else if (rejections >= 2) {
            await this.rejectContribution(contribution.id);
        }
    }
    async rejectContribution(contributionId) {
        await this.prisma.contribution.update({
            where: { id: contributionId },
            data: { status: client_1.ContributionStatus.REJECTED },
        });
    }
    async executeApproval(contributionId) {
        const contribution = await this.prisma.contribution.findUnique({
            where: { id: contributionId },
        });
        if (!contribution)
            return;
        const content = contribution.content;
        if (contribution.type === client_1.ContributionType.CREATE) {
            const newKu = await this.prisma.knowledgeUnit.create({
                data: {
                    type: content.type,
                    title: content.title,
                    description: content.description,
                },
            });
            if (content.dialectId && content.textWithTone) {
                await this.prisma.knowledgeVariation.create({
                    data: {
                        knowledgeUnitId: newKu.id,
                        dialectId: content.dialectId,
                        textWithTone: content.textWithTone,
                        phoneticGuide: content.phoneticGuide,
                        notes: content.notes,
                        audioUrl: content.audioUrl,
                    },
                });
            }
        }
        else if (contribution.type === client_1.ContributionType.EDIT) {
            if (!contribution.knowledgeUnitId)
                return;
            await this.prisma.knowledgeUnit.update({
                where: { id: contribution.knowledgeUnitId },
                data: {
                    title: content.title,
                    description: content.description,
                },
            });
        }
        else if (contribution.type === client_1.ContributionType.DIALECT_VARIATION) {
            if (!contribution.knowledgeUnitId)
                return;
            await this.prisma.knowledgeVariation.create({
                data: {
                    knowledgeUnitId: contribution.knowledgeUnitId,
                    dialectId: content.dialectId,
                    textWithTone: content.textWithTone,
                    phoneticGuide: content.phoneticGuide,
                    notes: content.notes,
                    audioUrl: content.audioUrl,
                },
            });
        }
        await this.prisma.contribution.update({
            where: { id: contributionId },
            data: { status: client_1.ContributionStatus.APPROVED },
        });
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map