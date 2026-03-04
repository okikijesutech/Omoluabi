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
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const client_1 = require("@prisma/client");
let ContentService = class ContentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    checkRole(user, allowedRoles) {
        if (!allowedRoles.includes(user.role)) {
            throw new common_1.ForbiddenException('You do not have permission to perform this action');
        }
    }
    async createKnowledgeUnit(dto) {
        return this.prisma.knowledgeUnit.create({ data: dto });
    }
    async proposeContribution(user, dto) {
        return this.prisma.contribution.create({
            data: {
                ...dto,
                userId: user.id
            }
        });
    }
    async submitReview(user, contributionId, dto) {
        this.checkRole(user, [client_1.Role.FOUNDER, client_1.Role.CULTURAL_COUNCIL, client_1.Role.REVIEWER]);
        return this.prisma.review.create({
            data: {
                ...dto,
                contributionId,
                reviewerId: user.id
            }
        });
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentService);
//# sourceMappingURL=content.service.js.map