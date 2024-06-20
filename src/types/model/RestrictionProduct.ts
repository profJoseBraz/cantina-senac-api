import { TProduct } from "./Product";
import { TRestriction } from "./Restriction";

export type TRestrictionProduct = {
    id: number;
    id_produto: TProduct;
    id_restricao: TRestriction;
}