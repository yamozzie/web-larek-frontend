import { IProduct } from "../../types";
import { IEvents } from "../base/events";

export class CatalogItemView {
    protected element: HTMLElement;
    protected cardCategory: HTMLSpanElement;
    protected card: HTMLElement;
    protected title: HTMLHeadElement;
    protected image: HTMLImageElement;
    protected price: HTMLSpanElement;
    protected id: string | null = null;
    protected colors = <Record<string, string>> {
        "дополнительное": "additional",
        "софт-скил": "soft",
        "кнопка": "button",
        "хард-скил": "hard",
        "другое": "other"
    }

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this.element = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
        this.cardCategory = this.element.querySelector('.card__category') as HTMLSpanElement;
        this.title = this.element.querySelector('.card__title') as HTMLHeadElement;
        this.image = this.element.querySelector('.card__image') as HTMLImageElement;
        this.price = this.element.querySelector('.card__price') as HTMLSpanElement;
    }

    protected setText(element: HTMLElement, value: unknown): string {
        if (element) {
            return element.textContent = String(value);
          }
    }

    set category(value: string) {
        this.setText(this.cardCategory, value)
        this.cardCategory.className = `card__category card__category_${this.colors[value]}`
    }

    render(data: IProduct): HTMLElement {
        if (data) {
            this.id = data.id;
            this.title.textContent = data.title;
            this.image.src = data.image;
            this.cardCategory.textContent = data.category;
            this.category = data.category
            this.price.textContent = data.price !== null ? `${data.price} синапсов` : 'Бесценно';
        }

        return this.element
    }
}