import { IEvents } from "../base/events";

export class Modal {
    protected modalContainer: HTMLElement;
    protected closeButton: HTMLButtonElement;
    protected modalContent: HTMLElement;

    constructor(template: HTMLElement, protected events: IEvents) {
        this.modalContainer = template
        this.closeButton = template.querySelector('.modal__close');
        this.modalContent = template.querySelector('.modal__content');

        this.closeButton.addEventListener('click', this.close.bind(this))
    }

    set content(value: HTMLElement) {
      this.modalContent.innerHTML = '';
      this.modalContent.appendChild(value);
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