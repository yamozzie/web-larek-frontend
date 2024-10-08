import { IProduct } from "../../types";
import { API_URL } from "../../utils/constants";

export interface ICatalogModel {
    items: IProduct[];
    setItems(items: IProduct[]): void;
    getProduct(id: string): void;
}

export class CatalogModel implements ICatalogModel {
    protected _items: IProduct[];

    constructor() {
        this._items = [];
    }

    get items(): IProduct[] {
        return this._items;
    }

    set items(data: IProduct[]) {
        this._items = data;
    }

    setItems(items: IProduct[]): void {
        this._items = items;
    }

    getProduct(id: string): IProduct | undefined {
        return this._items.find(item => item.id === id);
    }
}