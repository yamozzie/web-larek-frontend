export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
};

export interface IOrderForm {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: string | number;
    items: string[];
};
