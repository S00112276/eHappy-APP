export interface IProduct {
    _id: string;
    name: string;
    desc: string;
    category: string;
    department: string;
    price: number;
    stock: number;
    sizes: [number];
    colours: [string];
    images: [string];
    reviews: [string];
}