import { INotification } from "../interface/notificaiton.interface";
import { INotificationStrategy } from "../interface/notification-strategy.interface";

export class EmailStrategy implements INotificationStrategy {
    async send(notificaiton: INotification) {
        console.log("Sending email...");
        console.log(`Email has been sent to ${notificaiton.receiver} with subject ${notificaiton.subject} and message ${notificaiton.message}`);
    }
}