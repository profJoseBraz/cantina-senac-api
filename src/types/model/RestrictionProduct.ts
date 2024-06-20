import { TProduct } from "./Product";
import { TRestriction } from "./Restriction";

export type TRestrictionProduct = {
    id: number;
    productId: TProduct;
    restrictionId: TRestriction;
}