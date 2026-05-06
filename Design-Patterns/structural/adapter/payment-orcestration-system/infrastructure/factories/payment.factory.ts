import { PaymentProvider } from "../../domain/payment";
import { PaypalAdapter } from "../adapters/paypal.adapter";
import { LegacyPaypal } from "../providers/legacy-paypal";
import { StripeProvider } from "../providers/stripe.provider";

export type ProviderType = "stripe" | "paypal";
export class PaymentFactory {
    static create (type: ProviderType) : PaymentProvider {
        switch(type) {
            case "stripe":
                return new StripeProvider();
            case "paypal":
                return new PaypalAdapter(new LegacyPaypal());
            default:
                throw new Error("Unsupported payment provider");
        }
    }
}