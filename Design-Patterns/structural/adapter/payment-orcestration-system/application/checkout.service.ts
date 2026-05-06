import { PaymentProvider } from "../domain/payment";

export class CheckoutService {
    constructor(private readonly provider : PaymentProvider) {}

    async execute(request: PaymentRequest): Promise<void> {
        const result = await this.provider.charge(request);

        if(!result.success) {
            throw new Error(result.error);
        }

        console.log(`Payment ${result.transactionId} processed successfully`);
    }
}