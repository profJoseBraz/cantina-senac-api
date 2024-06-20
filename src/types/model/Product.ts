import { TCategory } from "./Category";

export type TProduct = {
    id: number;
    id_categoria: TCategory;
    nome: string;
    descricao: string;
    valor: number;
    imagem: string;
}