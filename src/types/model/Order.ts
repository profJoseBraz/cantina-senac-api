import { TPaymentMethod } from "./PaymentMethod";

export type TOrder = {
    id: number;
    id_forma_pagamento: TPaymentMethod;
    nome_cliente: string;
    data: string;
    valor: number;
}