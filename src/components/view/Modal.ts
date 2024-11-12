import { IEvents } from "../base/events";

export class Modal {
    protected modalContainer: HTMLElement;
    protected closeButton: HTMLButtonElement;
    protected modalContent: HTMLElement;
    protected pageWrapper: HTMLElement;

    constructor(template: HTMLElement, protected events: IEvents) {
        this.modalContainer = template
        this.closeButton = template.querySelector('.modal__close');
        this.modalContent = template.querySelector('.modal__content');
        this.pageWrapper = document.querySelector('.page__wrapper');

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

      set locked(value: boolean) {
        if (value) {
          this.pageWrapper.classList.add('page__wrapper_locked')
        } else {
          this.pageWrapper.classList.remove('page__wrapper_locked')
        }
      }
    
      render(): HTMLElement {
        this.modalContent;
        this.open();
        return this.modalContainer
      }
}