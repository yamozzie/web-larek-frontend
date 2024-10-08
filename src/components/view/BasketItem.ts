import { IEvents } from "../base/events";

export class BasketItemView {
    protected title: HTMLSpanElement;
    protected addButton: HTMLButtonElement;
    protected deleteButton: HTMLButtonElement;
    protected id: string | null = null;

    constructor(protected container: HTMLTemplateElement, protected events: IEvents) {
        this.title = container.querySelector('.card__title') as HTMLSpanElement;
        this.addButton = container.querySelector('.card__button') as HTMLButtonElement;
        this.deleteButton = container.querySelector('.basket__item-delete') as HTMLButtonElement;

        this.addButton.addEventListener('click', () => this.events.emit('ui:basket-add', { id: this.id }));

        this.deleteButton.addEventListener('click', () => this.events.emit('ui:basket-delete', { id: this.id }));
    }

    render(data: { id: string, title: string }) {
        if (data) {
            this.id = data.id;
            this.title.textContent = data.title;
        }
        return this.container
    }
}