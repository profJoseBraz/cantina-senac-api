import { TProduct } from "./Product";

export type TProduction = {
    id: number;
    productId: TProduct;
    date: string;
    amount: number;
    observation: string;
}