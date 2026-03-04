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
exports.ContributionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ContributionsService = class ContributionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        if (dto.type !== 'CREATE' && !dto.knowledgeUnitId) {
            throw new common_1.BadRequestException('knowledgeUnitId is required for EDIT and DIALECT_VARIATION types');
        }
        if (dto.type === 'CREATE') {
            const content = dto.content;
            if (!content.dialectId) {
                throw new common_1.BadRequestException('A strictly protected system requires new knowledge to be contextualized by a dialect');
            }
        }
        return this.prisma.contribution.create({
            data: {
                type: dto.type,
                status: client_1.ContributionStatus.PENDING,
                content: dto.content,
                comment: dto.comment,
                authorId: dto.authorId,
                ...(dto.knowledgeUnitId && {
                    knowledgeUnitId: dto.knowledgeUnitId,
                }),
            },
        });
    }
    async findAllPending() {
        return this.prisma.contribution.findMany({
            where: { status: client_1.ContributionStatus.PENDING },
            include: { author: true, knowledgeUnit: true },
        });
    }
    async findOne(id) {
        return this.prisma.contribution.findUnique({
            where: { id },
            include: { author: true, knowledgeUnit: true, reviews: true },
        });
    }
};
exports.ContributionsService = ContributionsService;
exports.ContributionsService = ContributionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContributionsService);
//# sourceMappingURL=contributions.service.js.map