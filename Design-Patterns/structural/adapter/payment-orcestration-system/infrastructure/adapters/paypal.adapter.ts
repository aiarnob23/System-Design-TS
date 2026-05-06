import { PaymentProvider, PaymentRequest, PaymentResult } from "../../domain/payment";
import { LegacyPaypal } from "../providers/legacy-paypal";

export class PaypalAdapter implements PaymentProvider {
    constructor(private readonly paypal: LegacyPaypal) { }

    async charge(request: PaymentRequest): Promise<PaymentResult> {
        try {
            const usdAmount = this.convertToUSD(request);
            const txnId = this.paypal.sendPayment(usdAmount);

            return {
                success: true,
                transactionId: txnId
            };
        } catch (error) {
            return {
                success: false,
                error: this.normalizeError(error),
            };
        }
    }

    private convertToUSD(request: PaymentRequest): number {
        const rates: Record<string, number> = {
            USD: 1,
            EUR: 1.1,
            BDT: 0.0091,
        };

        const rate = rates[request.currency];
        if (!rate) {
            throw new Error(`Unsupported currency: ${request.currency}`);
        }

        return request.amount * rate;
    }

    private normalizeError(error: unknown): string {
        if (error instanceof Error) return error.message;
        return "Unknown PayPal error";
    }
}