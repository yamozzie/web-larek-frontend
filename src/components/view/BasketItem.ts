import { IProduct } from "../../types";
import { IEvents } from "../base/events";

export interface IBasketItemView {
    items: HTMLElement;
    index: HTMLElement;
    title: HTMLElement;
    price: HTMLElement
    deleteButton: HTMLButtonElement;
    render(data: IProduct, item: number): HTMLElement;
}

export class BasketItemView {
    items: HTMLElement;
    index: HTMLElement;
    title: HTMLSpanElement;
    price: HTMLElement
    deleteButton: HTMLButtonElement;

    constructor(protected template: HTMLTemplateElement, protected events: IEvents) {
        this.items = template.content.querySelector('.basket__item').cloneNode(true) as HTMLElement;
        this.index = this.items.querySelector('.basket__item-index');
        this.title = this.items.querySelector('.card__title');
        this.price = this.items.querySelector('.card__price');
        this.deleteButton = this.items.querySelector('.basket__item-delete') as HTMLButtonElement;

        this.deleteButton.addEventListener('click', () => {events.emit('ui:basket-item-remove', this.items)})
    }

    render(data: IProduct, index: number) {
        this.index.textContent = String(index);
        this.title.textContent = data.title;
        this.price.textContent = data.price !== null ? `${data.price} синапсов` : 'Бесценно';
        return this.items;
    }
}