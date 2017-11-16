export interface IProduct {
    name: string;
    desc: string;
    price: number;
    stock: number;
    sizes: [number],
    colours: [string],
    images: [string],
    reviews: [string];
}