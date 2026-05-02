import { config } from "../config";
import { INotificationStrategy } from "../interface/notification-strategy.interface";
import * as sgMail from "@sendgrid/mail";
import { INotification } from "../interface/notification.interface";

// ONLY job: talk to SendGrid API and send the email
// no business logic, no db calls, no user checks — just provider code
export class EmailStrategy implements INotificationStrategy {
    constructor() {
        sgMail.setApiKey(config.sendgrid.apiKey);
    }

    async send(notification: INotification):Promise<void> {
        await sgMail.send({
            to:notification.receiver,
            subject:notification.subject,
            message:notification.message,
        });
        console.log(`Email has been sent to ${notification.receiver} with subject ${notification.subject} and message ${notification.message}`);
    }
}