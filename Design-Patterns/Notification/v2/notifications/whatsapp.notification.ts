import { INotification } from "../interface/notification.interface";
// plain data object — just holds the whatsapp payload
export class WhatsappNotification implements INotification {
    constructor(
        public receiver: string,
        public subject: string,
        public message: string
    ) { }
}