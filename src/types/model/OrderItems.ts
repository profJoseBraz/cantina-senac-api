import { TOrder } from "./Order";
import { TProduct } from "./Product";

export type TOrderItems = {
    id: number;
    id_pedido: TOrder;
    id_produto: TProduct;
    quantidade: number;
}