import { INotification } from "./notification.interface";

export interface INotificationStrategy {
    send(notificaiton: INotification): Promise<void>;
}