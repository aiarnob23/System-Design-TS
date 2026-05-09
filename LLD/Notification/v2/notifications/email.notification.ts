import { INotification } from "../interface/notification.interface";

// plain data object — just holds the email payload
export class EmailNotification implements INotification {
    constructor(
        public receiver: string,
        public subject: string,
        public message: string
    ) { }
}