export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    reviews: { id: string; userName: string; comment: string; rating: number; date: string }[];
}
