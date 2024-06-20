import { TOrder } from "./Order";
import { TProduct } from "./Product";

export type TOrderItems = {
    id: number;
    orderId: TOrder;
    productId: TProduct;
    amount: number;
}