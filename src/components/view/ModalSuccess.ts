import { IEvents } from "../base/events";

export interface IModalSuccess {
    success: HTMLDivElement;
    description: HTMLElement;
    button: HTMLButtonElement;
    render(total: number): HTMLElement;
}

export class ModalSuccess implements IModalSuccess {
    success: HTMLDivElement;
    description: HTMLElement;
    button: HTMLButtonElement;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        this.success = template.querySelector('.order-success')!.cloneNode(true) as HTMLDivElement;
        this.description = template.querySelector('.order-success__description')!;
        this.button = template.querySelector('.order-success__close')!;

        this.button.addEventListener('click', () => {
            events.emit('success:close')
        })
    }

    render(total: number) {
        this.description.textContent = String(`Списано ${total} синапсов`);
        return this.success
    }
}