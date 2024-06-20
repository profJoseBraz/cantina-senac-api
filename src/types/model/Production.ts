import { TProduct } from "./Product";

export type TProduction = {
    id: number;
    id_produto: TProduct;
    data: string;
    quantidade: number;
    observacao: string;
}