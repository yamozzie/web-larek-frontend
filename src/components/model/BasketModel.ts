import { IProduct } from "../../types";

export interface IBasketModel {
    items: IProduct[];
    getCount: () => number;
    getTotalSum: () => number;
    getItemsIds: () => string[];
    add(data: IProduct): void;
    delete(data: IProduct): void;
    clear(): void;
}

export class BasketModel implements IBasketModel {
    protected _items: IProduct[];

    constructor() {
        this._items = [];
    }

    set items(data: IProduct[]) {
        this._items = data;
    }

    get items(): IProduct[] {
        return this._items;
    }

    getCount() {
        return this.items.length;
    }

    getTotalSum() {
        return this._items.reduce((sum, item) => sum + item.price, 0);
    }

    getItemsIds() {
        return this._items.map(item => item.id);
    }

    add(data: IProduct) {
        this._items.push(data);
    }

    delete(item: IProduct) {
        const index = this._items.indexOf(item);
        if (index >= 0) {
            this._items.splice(index, 1);
        }
    }

    clear() {
        this._items = [];
    }
}