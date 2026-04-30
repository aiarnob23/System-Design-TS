import { INotificationStrategy } from "../interface/notification-strategy.interface";

export class ChannelRegistry {
    private static strategies : Map<string, INotificationStrategy> = new Map();;

    //register a new strategy
    static register(type:string, strategy: INotificationStrategy):void{
        if(this.strategies.has(type)){
            console.log("Strategy already registered");
        }
        this.strategies.set(type, strategy);
    }

    //get strategy 
    static get(type: string) : INotificationStrategy {
        const strategy = this.strategies.get(type);
        if(!strategy) {
            throw new Error(`Strategy ${type} not registered`);
        }
        return strategy;
    }

    static has(type:string):boolean {
        return this.strategies.has(type);
    }

    static list():string[]{
        return Array.from(this.strategies.keys());
    }
}