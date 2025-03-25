import { Product } from './product';

export interface BagItem {
    product: Product;
    quantity: number;
}

export interface BagState {
    bagItems: BagItem[];
    totalPrice: number;
    totalItems: number;
}
