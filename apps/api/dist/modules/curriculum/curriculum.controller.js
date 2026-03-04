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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurriculumController = void 0;
const common_1 = require("@nestjs/common");
const curriculum_service_1 = require("./curriculum.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const client_1 = require("@prisma/client");
let CurriculumController = class CurriculumController {
    curriculumService;
    constructor(curriculumService) {
        this.curriculumService = curriculumService;
    }
    createCourse(dto) {
        return this.curriculumService.createCourse(dto);
    }
    findAllByLanguage(languageId) {
        if (!languageId)
            return [];
        return this.curriculumService.findAllCoursesByLanguage(languageId);
    }
    getCourseDetail(id) {
        return this.curriculumService.getCourseDetail(id);
    }
    createLevel(dto) {
        return this.curriculumService.createLevel(dto);
    }
    createModule(dto) {
        return this.curriculumService.createModule(dto);
    }
    createLesson(dto) {
        return this.curriculumService.createLesson(dto);
    }
};
exports.CurriculumController = CurriculumController;
__decorate([
    (0, common_1.Post)('course'),
    (0, roles_decorator_1.Roles)(client_1.Role.FOUNDER, client_1.Role.CULTURAL_COUNCIL),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CurriculumController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Get)('courses'),
    __param(0, (0, common_1.Query)('languageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CurriculumController.prototype, "findAllByLanguage", null);
__decorate([
    (0, common_1.Get)('course/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CurriculumController.prototype, "getCourseDetail", null);
__decorate([
    (0, common_1.Post)('level'),
    (0, roles_decorator_1.Roles)(client_1.Role.FOUNDER, client_1.Role.CULTURAL_COUNCIL),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CurriculumController.prototype, "createLevel", null);
__decorate([
    (0, common_1.Post)('module'),
    (0, roles_decorator_1.Roles)(client_1.Role.FOUNDER, client_1.Role.CULTURAL_COUNCIL),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CurriculumController.prototype, "createModule", null);
__decorate([
    (0, common_1.Post)('lesson'),
    (0, roles_decorator_1.Roles)(client_1.Role.FOUNDER, client_1.Role.CULTURAL_COUNCIL, client_1.Role.REVIEWER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CurriculumController.prototype, "createLesson", null);
exports.CurriculumController = CurriculumController = __decorate([
    (0, common_1.Controller)('curriculum'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [curriculum_service_1.CurriculumService])
], CurriculumController);
//# sourceMappingURL=curriculum.controller.js.map