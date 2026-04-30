import { registerChannel } from "./bootstrap/registerChannel";
import { ChannelRegistry } from "./registry/channel.registry";

async function main() {
  registerChannel();

  const type =  "email";

  const strategy = ChannelRegistry.get(type);

  const notification = {
    receiver: "1bOu2@example.com",
    subject: "Hello",
    message: "nothing"
  };

  await strategy.send(notification);
}