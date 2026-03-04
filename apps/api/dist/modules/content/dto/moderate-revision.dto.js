"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerateRevisionDto = exports.ModerationAction = void 0;
var ModerationAction;
(function (ModerationAction) {
    ModerationAction["APPROVE"] = "APPROVE";
    ModerationAction["REJECT"] = "REJECT";
    ModerationAction["REQUEST_CHANGES"] = "REQUEST_CHANGES";
})(ModerationAction || (exports.ModerationAction = ModerationAction = {}));
class ModerateRevisionDto {
    moderatorId;
    comment;
    action;
}
exports.ModerateRevisionDto = ModerateRevisionDto;
//# sourceMappingURL=moderate-revision.dto.js.map