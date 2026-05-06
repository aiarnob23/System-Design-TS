import { CheckoutService } from "./application/checkout.service";
import { PaymentFactory } from "./infrastructure/factories/payment.factory";

async function main() {
    const provider = PaymentFactory.create("stripe");
    const checkout = new CheckoutService(provider);

    await checkout.execute({
        amount: 1000,
        currency: "BDT",
    })
}


main();