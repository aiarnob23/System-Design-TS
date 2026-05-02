import { INotification } from "../interface/notification.interface";
// plain data object — just holds the sms payload
export class SmsNotification implements INotification {
    constructor(
        public receiver: string,
        public subject: string,
        public message: string
    ) { }
}