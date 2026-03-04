"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const dialects_module_1 = require("./dialects/dialects.module");
const knowledge_module_1 = require("./knowledge/knowledge.module");
const contributions_module_1 = require("./contributions/contributions.module");
const reviews_module_1 = require("./reviews/reviews.module");
const learning_paths_module_1 = require("./learning-paths/learning-paths.module");
const progress_module_1 = require("./progress/progress.module");
const prisma_module_1 = require("./prisma/prisma.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, auth_module_1.AuthModule, users_module_1.UsersModule, dialects_module_1.DialectsModule, knowledge_module_1.KnowledgeModule, contributions_module_1.ContributionsModule, reviews_module_1.ReviewsModule, learning_paths_module_1.LearningPathsModule, progress_module_1.ProgressModule, prisma_module_1.PrismaModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map