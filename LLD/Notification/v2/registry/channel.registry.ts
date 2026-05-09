import { StrategyNotFoundException } from "../exceptions/notification.exceptions";
import { INotificationStrategy } from "../interface/notification-strategy.interface";

// stores all registered strategies in a map
// acts as a lookup table — channel type string → strategy instance
export class ChannelRegistry {
    private static strategies: Map<string, INotificationStrategy> = new Map();

    static register(type: string, strategy: INotificationStrategy): void {
        if (this.strategies.has(type)) {
            console.log(`Strategy ${type} already registered`);
            return;
        }
        this.strategies.set(type, strategy);
        console.log(`Strategy ${type} registered`);
    }

    static get(type: string): INotificationStrategy {
        const strategy = this.strategies.get(type);
        if (!strategy) {
            throw new StrategyNotFoundException(type);
        }
        return strategy;
    }

    static has(type: string): boolean {
        return this.strategies.has(type);
    }

    static list(): string[] {
        return Array.from(this.strategies.keys());
    }

    static unregister(type: string): void {
        this.strategies.delete(type);
    }
}