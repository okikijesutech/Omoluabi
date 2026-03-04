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
exports.CurriculumService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let CurriculumService = class CurriculumService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCourse(dto) {
        return this.prisma.course.create({ data: dto });
    }
    async findAllCoursesByLanguage(languageId, skip = 0, take = 50) {
        return this.prisma.course.findMany({
            where: { languageId },
            skip,
            take,
            include: {
                levels: {
                    include: {
                        modules: {
                            include: {
                                lessons: true
                            }
                        }
                    }
                }
            }
        });
    }
    async createLevel(dto) {
        return this.prisma.level.create({ data: dto });
    }
    async createModule(dto) {
        return this.prisma.module.create({ data: dto });
    }
    async createLesson(dto) {
        return this.prisma.lesson.create({ data: dto });
    }
    async getCourseDetail(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                levels: {
                    orderBy: { order: 'asc' },
                    include: {
                        modules: {
                            orderBy: { order: 'asc' },
                            include: {
                                lessons: true
                            },
                        },
                    },
                },
            },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return course;
    }
};
exports.CurriculumService = CurriculumService;
exports.CurriculumService = CurriculumService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CurriculumService);
//# sourceMappingURL=curriculum.service.js.map