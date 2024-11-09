import { catalogItemView } from './CatalogItem';
import { IProduct } from '../../types';
import { IEvents } from '../base/events';

export interface  ICard {
    text: HTMLElement;
    button: HTMLElement;
    render(data: IProduct): HTMLElement;
}

export class CardPreview extends catalogItemView implements ICard {
    text: HTMLElement;
    button: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events)
        this.text = this.container.querySelector('.card__text')!;
        this.button = this.container.querySelector('.card__button')!;
        this.button.addEventListener('click', () => { this.events.emit('ui:basket-add') });
    }

    sale(data: IProduct) {
        if (data.price) {
            return 'Купить'
        } else {
            this.button.setAttribute('disabled', 'true')
            return 'Не продается'
        }
    }

    render(data: IProduct): HTMLElement {
        this.cardCategory.textContent = data.category;
        this.title.textContent = data.title;
        this.image.src = data.image;
        this.price.textContent = data.price !== null ? `${data.price} синапсов` : 'Бесценно';
        this.text.textContent = data.description;

        return this.container
    }
}