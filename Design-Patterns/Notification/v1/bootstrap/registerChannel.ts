import { ChannelRegistry } from "../registry/channel.registry";
import { EmailStrategy } from "../strategy/email.strategy";


export function registerChannel(){
    ChannelRegistry.register("email", new EmailStrategy());
}