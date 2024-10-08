import { IProduct } from "../../types";

export interface IBasketModel {
    items: IProduct[];
    add(data: IProduct): void;
    delete(data: IProduct): void;
};

export class BasketModel implements IBasketModel {
    protected _items: IProduct[];
    
    constructor() {
        this._items = [];
    }

    set items(data: IProduct[]) {
        this._items = data
    }

    add(data: IProduct) {
        this._items.push(data) 
    }

    delete(data: IProduct) {
        const index = this._items.findIndex(item => item.id === data.id);
        if (index > 0) {
            this._items.splice(index, 1)
        }
    }
 };