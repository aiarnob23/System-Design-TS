
// ONLY job: route the notification to the correct strategy
// knows WHICH strategy to use — does NOT know HOW the provider works

import { StrategyNotFoundException } from "../exceptions/notification.exceptions";
import { INotification } from "../interface/notification.interface";
import { ChannelRegistry } from "../registry/channel.registry";

// does NOT know WHY the notification is being sent (that's the service's job)
export class NotificationChannel {
    async send(type:string, notification: INotification): Promise<void> {
        if(!ChannelRegistry.has(type)) {
            throw new StrategyNotFoundException(type);
        }
        
        const strategy = ChannelRegistry.get(type);

        console.log(`Notificatoin channel routing to ${type}`);
        await strategy.send(notification);
    }

    getAvailableChannel():string[] {
        return ChannelRegistry.list();
    }
}