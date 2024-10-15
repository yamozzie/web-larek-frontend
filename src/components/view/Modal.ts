import { IEvents } from "../base/events";

export interface IModal {
    open(): void;
    close(): void;
    render(): HTMLElement;
}

export class Modal implements IModal {
    protected modalContainer: HTMLElement;
    protected closeButton: HTMLButtonElement;
    protected modalContent: HTMLElement;

    constructor(modalContainer: HTMLElement, protected events: IEvents) {
        this.modalContainer = modalContainer
        this.closeButton = modalContainer.querySelector('.modal__close')!;
        this.modalContent = modalContainer.querySelector('.modal__content')!;

        this.closeButton.addEventListener('click', this.close.bind(this))
    }

    set content(value: HTMLElement) {
        while (this.modalContent.firstChild) {
            this.modalContent.removeChild(this.modalContent.firstChild);
        }
        this.modalContent.appendChild(value)
      }
    
      open() {
        this.modalContainer.classList.add('modal_active');
        this.events.emit('modal:open');
      }
    
      close() {
        this.modalContainer.classList.remove('modal_active');
        this.events.emit('modal:close');
      }
    
      render(): HTMLElement {
        this.modalContent;
        this.open();
        return this.modalContainer
      }
}