import { TPaymentMethod } from "./PaymentMethod";

export type TOrder = {
    id: number;
    paymentMethodId: TPaymentMethod;
    customerName: string;
    date: string;
    value: number;
}