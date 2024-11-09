import { IProduct } from "../../types";
import { IEvents } from "../base/events";

export interface IClick {
    onClick: (event: MouseEvent) => void;
}

export class catalogItemView {
    protected element: HTMLButtonElement;
    protected cardCategory: HTMLSpanElement;
    protected card: HTMLElement;
    protected title: HTMLHeadElement;
    protected image: HTMLImageElement;
    protected price: HTMLSpanElement;
    protected id: string | null = null;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        this.element = container.querySelector('.gallery__item') as HTMLButtonElement;
        this.cardCategory = container.querySelector('.card__category') as HTMLSpanElement;
        this.title = container.querySelector('.card__title') as HTMLHeadElement;
        this.image = container.querySelector('.card__image') as HTMLImageElement;
        this.price = container.querySelector('.card__price') as HTMLSpanElement;
        this.container?.addEventListener('click', () => this.events.emit('ui:card-select', { id: this.id }));
    }

    render(data: IProduct) {
        if (data) {
            this.id = data.id;
            this.title.textContent = data.title;
            this.image.src = data.image;
            this.cardCategory.textContent = data.category;
            this.price.textContent = data.price !== null ? `${data.price} синапсов` : 'Бесценно';
        }

        return this.container
    }
}