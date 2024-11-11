import { IProduct } from "../../types";

export interface IBasketModel {
    items: IProduct[];
    getCount: () => number;
    getTotalSum: () => number;
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

    get items(): IProduct[] {
        return this._items;
    }

    getCount() {
        return this.items.length
    }

    getTotalSum() {
        let sum = 0;
        this._items.forEach(item => {
            sum += item.price;
        });
    
        return sum;
    }

    add(data: IProduct) {
        this._items.push(data) 
    }

    delete(item: IProduct) {
        const index = this._items.findIndex(
            (i) => i.title === item.title && i.price === item.price
        );
        if (index >= 0) {
            this._items.splice(index, 1);
        }
    }

    clear() {
        this._items = []
    }
 };