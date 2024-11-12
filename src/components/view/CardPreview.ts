import { CatalogItemView } from './CatalogItem';
import { IProduct } from '../../types';
import { IEvents } from '../base/events';

export interface  ICard {
    text: HTMLElement;
    button: HTMLElement;
    render(data: IProduct): HTMLElement;
}

export class CardPreview extends CatalogItemView implements ICard {
    text: HTMLElement;
    button: HTMLElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        super(template, events);
        this.text = this.element.querySelector('.card__text')!;
        this.button = this.element.querySelector('.card__button')!;
        this.button.addEventListener('click', () => { this.events.emit('ui:basket-add') });
    }

    sale(data: IProduct) {
        if (data.price) {
            return 'Купить'
        } else {
            this.button.setAttribute('disabled', 'true')
            return this.button.textContent = 'Не продается'
        }
    }

    render(data: IProduct): HTMLElement {
        this.cardCategory.textContent = data.category;
        this.title.textContent = data.title;
        this.image.src = data.image;
        this.price.textContent = data.price !== null ? `${data.price} синапсов` : 'Бесценно';
        this.text.textContent = data.description;

        return this.element
    }
}