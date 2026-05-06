
export class LegacyPaypal {
    sendPayment(usdAmount: number): string {
        console.log(`Legacy Paypal processed $${usdAmount}`);
        return "PAYPAL_TXN_123";
    }
}