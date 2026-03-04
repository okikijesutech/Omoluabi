export declare enum ModerationAction {
    APPROVE = "APPROVE",
    REJECT = "REJECT",
    REQUEST_CHANGES = "REQUEST_CHANGES"
}
export declare class ModerateRevisionDto {
    moderatorId: string;
    comment?: string;
    action: ModerationAction;
}
