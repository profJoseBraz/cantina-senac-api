import { TCategory } from "./Category";

export type TProduct = {
    id: number;
    categoryId: TCategory;
    name: string;
    description: string;
    value: number;
    image: string;
}