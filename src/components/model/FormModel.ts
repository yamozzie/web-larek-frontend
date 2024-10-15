import { IEvents } from "../base/events";

export interface IFormModel {
    payment: string;
    address: string;
    email: string;
    phone: string;
    total: number;
    items: string[];
    setOrderAddress(field: string, value: string): void;
    setOrderData(field: string, value: string): void;
    getOrder(): object;
}

export class FormModel implements IFormModel {
    payment: string;
    address: string;
    email: string;
    phone: string;
    total: number;
    items: string[];

    constructor(protected events: IEvents) {
        this.payment = '';
        this.address = '';
        this.email = '';
        this.phone = '';
        this.total = 0;
        this.items = [];
    };

    setOrderAddress(field: string, value: string): void {
        if (field === 'address') {
            this.address = value;
        }

    };

    setOrderData(field: string, value: string): void {
        if (field === 'email') {
            this.email = value;
        } else if (field === 'phone') {
            this.phone = value;
        }
    };

    getOrder(): object {
        return {
            payment: this.payment,
            address: this.address,
            email: this.email,
            phone: this.phone,
            total: this.total,
            items: this.items,
        }
    }
}