import { NotificationChannel } from "./channel/notificaton.channel";
import { ChannelRegistry } from "./registry/channel.registry";
import { NotificationService } from "./services/notification.service";
import { EmailStrategy }    from "./strategies/email.strategy";
import { SmsStrategy }      from "./strategies/sms.strategy";


async function bootstrap() {
  // step 1: register all strategies once at app startup (like a NestJS module)
  ChannelRegistry.register("email",    new EmailStrategy());
  ChannelRegistry.register("sms",      new SmsStrategy());

  console.log("Available channels:", ChannelRegistry.list());

  // step 2: wire up channel and service
  const channel = new NotificationChannel();
  const notificationService = new NotificationService(channel);

  // step 3: simulate real app usage

  const user = {
    id:           "usr_001",
    name:         "Arnob",
    email:        "arnob@example.com",
    phone:        "+8801700000000",
    isVerified:   true,
    optedOutEmail: false,
    optedOutSms:  false,
  };

  const order = {
    id:          "ord_1023",
    user,
    status:      "SHIPPED",
    totalAmount: 1500,
  };

  // welcome email on signup
  await notificationService.sendWelcomeEmail(user);

  // otp during login
  await notificationService.sendOtp(user, "4921");

  // email + sms after order placed
  await notificationService.sendOrderConfirmation(order);

  // whatsapp when order ships
  await notificationService.sendShippingUpdate(order);

  // test blocked notification
  try {
    await notificationService.sendWelcomeEmail({ ...user, isVerified: false });
  } catch (err) {
    console.error((err as Error).message);
  }

  // test unregistered channel
  try {
    await channel.send("push", { receiver: "x", subject: "y", message: "z" });
  } catch (err) {
    console.error((err as Error).message);
  }
}

bootstrap();