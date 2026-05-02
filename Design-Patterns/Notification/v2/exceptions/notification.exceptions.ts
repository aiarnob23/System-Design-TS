export class StrategyNotFoundException extends Error {
    constructor(type: string) {
        super(`Strategy ${type} is not registered in ChannelRegistry`);
        this.name = "StrategyNotFoundException";
    }
}

export class NotificationBlockedException extends Error {
    constructor(reason:string) {
        super(`Notification is blocked! Reason : ${reason}`);
        this.name = "NotificationBlockedException";
    }
}