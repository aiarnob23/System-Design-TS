import { PaymentProvider, PaymentRequest, PaymentResult } from "../../domain/payment";

export class StripeProvider implements PaymentProvider {
    async charge(request: PaymentRequest): Promise<PaymentResult> {
        
        return {
            success: true,
            transactionId: "STRIPE_TXN_456",
        };
    }
}