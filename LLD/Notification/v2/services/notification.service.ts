import { NotificationChannel } from "../channel/notificaton.channel";
import { NotificationBlockedException } from "../exceptions/notification.exceptions";

// real-world User and Order types 
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  optedOutEmail: boolean;
  optedOutSms: boolean;
}

interface Order {
  id: string;
  user: User;
  status: string;
  totalAmount: number;
}

// THIS is where all business logic lives
// it does all the "why" and "when" decisions
// channel and strategy layers never touch business rules
export class NotificationService {
  constructor(private readonly channel: NotificationChannel) {}

  async sendWelcomeEmail(user: User): Promise<void> {
    if (!user.isVerified) {
      throw new NotificationBlockedException("user is not verified");
    }

    if (user.optedOutEmail) {
      throw new NotificationBlockedException("user has opted out of emails");
    }

    await this.channel.send("email", {
      receiver: user.email,
      subject:  "Welcome to our platform!",
      message:  `Hi ${user.name}, we're glad to have you. Get started now!`,
    });
  }

  // called from auth service — validate phone before sending OTP
  async sendOtp(user: User, otp: string): Promise<void> {
    if (!user.phone || !user.phone.startsWith("+")) {
      throw new NotificationBlockedException("invalid phone number format");
    }

    if (user.optedOutSms) {
      throw new NotificationBlockedException("user has opted out of SMS");
    }

    await this.channel.send("sms", {
      receiver: user.phone,
      subject:  "OTP Verification",
      message:  `Your OTP is ${otp}. Valid for 5 minutes. Do not share it.`,
    });
  }

  // called after order placed — fire both email and sms at the same time
  async sendOrderConfirmation(order: Order): Promise<void> {
    const { user } = order;

    const subject = `Order #${order.id} Confirmed`;
    const message = `Hi ${user.name}, your order of BDT ${order.totalAmount} is confirmed!`;

    // run both in parallel — no reason to wait for one before the other
    await Promise.all([
      user.optedOutEmail
        ? Promise.resolve() // skip silently if opted out
        : this.channel.send("email", { receiver: user.email, subject, message }),

      user.optedOutSms
        ? Promise.resolve()
        : this.channel.send("sms", { receiver: user.phone, subject, message }),
    ]);
  }

  // called when order ships — notify via whatsapp for rich message support
  async sendShippingUpdate(order: Order): Promise<void> {
    const { user } = order;

    await this.channel.send("whatsapp", {
      receiver: user.phone,
      subject:  "Your order has shipped",
      message:  `Hi ${user.name}, order #${order.id} is on its way! Status: ${order.status}`,
    });
  }
}