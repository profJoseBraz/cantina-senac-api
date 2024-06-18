import { TOrder } from "./Order";

export type TOrderItems = {
    id: number;
    id_pedido: TOrder;
    id_produto: number;
    quantidade: number;
}