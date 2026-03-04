"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLessonDto = exports.LessonDifficulty = void 0;
var LessonDifficulty;
(function (LessonDifficulty) {
    LessonDifficulty["BEGINNER"] = "BEGINNER";
    LessonDifficulty["INTERMEDIATE"] = "INTERMEDIATE";
    LessonDifficulty["ADVANCED"] = "ADVANCED";
})(LessonDifficulty || (exports.LessonDifficulty = LessonDifficulty = {}));
class CreateLessonDto {
    moduleId;
    title;
    order;
    difficulty;
}
exports.CreateLessonDto = CreateLessonDto;
//# sourceMappingURL=create-lesson.dto.js.map