import twilio from "twilio";
import { config } from "../config";
import { INotificationStrategy } from "../interface/notification-strategy.interface";
import { INotification } from "../interface/notification.interface";

// ONLY job: talk to Twilio API and send the SMS
// no business logic, no db calls, no user checks — just provider code
export class SmsStrategy implements INotificationStrategy {
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio(config.twilio.accountSid, config.twilio.authToken);
  }

  async send(notification: INotification): Promise<void> {
    await this.client.messages.create({
      to:   notification.receiver,
      from: config.twilio.fromNumber,
      body: notification.message,
    });

    console.log(`[SmsStrategy] sent to ${notification.receiver}`);
  }
}