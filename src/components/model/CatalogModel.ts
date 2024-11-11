import { IProduct } from "../../types";
import { IEvents } from '../base/events';

export interface ICatalogModel {
    items: IProduct[];
    selectedCard: IProduct;
    setItems(items: IProduct[]): void;
    setPreview(item: IProduct): void;
}

export class CatalogModel implements ICatalogModel {
    protected _items: IProduct[];
    selectedCard: IProduct;

    constructor(protected events: IEvents) {
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

    setPreview(item: IProduct): void {
        this.selectedCard = item;
        this.events.emit('modalCard:open', item);
    }
}