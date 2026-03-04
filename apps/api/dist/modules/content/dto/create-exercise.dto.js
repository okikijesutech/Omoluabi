"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExerciseDto = exports.ExerciseType = void 0;
var ExerciseType;
(function (ExerciseType) {
    ExerciseType["MULTIPLE_CHOICE"] = "MULTIPLE_CHOICE";
    ExerciseType["TRANSLATE"] = "TRANSLATE";
    ExerciseType["MATCH"] = "MATCH";
    ExerciseType["LISTEN"] = "LISTEN";
    ExerciseType["AUDIO"] = "AUDIO";
    ExerciseType["IDENTIFY"] = "IDENTIFY";
})(ExerciseType || (exports.ExerciseType = ExerciseType = {}));
class CreateExerciseDto {
    lessonId;
    type;
    data;
}
exports.CreateExerciseDto = CreateExerciseDto;
//# sourceMappingURL=create-exercise.dto.js.map