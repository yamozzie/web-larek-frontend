import { IProduct } from "../../types";
import { IEvents } from "../base/events";

export class catalogItemView {
    protected button: HTMLButtonElement;
    protected cardCategory: HTMLSpanElement;
    protected title: HTMLHeadElement;
    protected image: HTMLImageElement;
    protected price: HTMLSpanElement;
    protected id: string | null = null;

    constructor(protected container: HTMLTemplateElement, protected events: IEvents) {
        this.button = container.querySelector('.gallery__item') as HTMLButtonElement;
        this.cardCategory = container.querySelector('.card__category') as HTMLSpanElement;
        this.title = container.querySelector('.card__title') as HTMLHeadElement;
        this.image = container.querySelector('.card__image') as HTMLImageElement;
        this.price = container.querySelector('.card__price') as HTMLSpanElement;

        this.button.addEventListener('click', () => this.events.emit('ui:card-select', { id: this.id }));
    }

    render(data: IProduct) {
        if (data) {
            this.id = data.id;
            this.title.textContent = data.title;
            this.image.textContent = data.image;
            this.cardCategory.textContent = data.category
        }

        return this.container
    }
}