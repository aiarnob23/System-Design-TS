import { INotification } from "./notificaiton.interface";

export interface INotificationStrategy {
    send(notificaiton: INotification) : Promise<void>;
}