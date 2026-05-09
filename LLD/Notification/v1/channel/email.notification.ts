import { INotification } from "../interface/notificaiton.interface";

export class EmailNotification implements INotification {
    constructor(
        public receiver: string,
        public subject: string,
        public message: string
    ){}
}