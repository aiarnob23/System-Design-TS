export type Currency = "USD" | "EUR" | "BDT";

export interface PaymentRequest {
    amount: number;
    currency: Currency;
}

export interface PaymentProvider {
    charge(request : PaymentRequest) : Promise<PaymentResult>;
}

export interface PaymentResult {
    success: boolean;
    transactionId: string;
    error?: string;
}