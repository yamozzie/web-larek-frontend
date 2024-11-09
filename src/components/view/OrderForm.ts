import { IEvents } from '../base/events';

export class Order {
    formOrder: HTMLFormElement;
    buttonAll: HTMLButtonElement[];
    buttonSubmit: HTMLButtonElement;
    formErrors: HTMLElement;

    constructor(protected template: HTMLTemplateElement, protected events: IEvents) {
        this.formOrder = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
        this.buttonAll = Array.from(this.formOrder.querySelectorAll('.button_alt'));
        this.buttonSubmit = this.formOrder.querySelector('.order__button');
        this.formErrors = this.formOrder.querySelector('.form__errors');

        this.buttonAll.forEach(item => {
            item.addEventListener('click', () => {
                this.paymentSelection = item.name;
                events.emit('order:payment-change', item);
            });
          });

        this.formOrder.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
            const field = target.name;
            const value = target.value;
            this.events.emit(`order:address-change`, { field, value });
          });

        this.formOrder.addEventListener('submit', (evt: Event) => {
            evt.preventDefault();
            events.emit('ui:contacts-open')
        })
    };

    set paymentSelection(paymentMethod: string) {
        this.buttonAll.forEach(item => {
            item.classList.toggle('button_alt-active', item.name === paymentMethod);
        })
      }
    
    set valid(value: boolean) {
        if (value) {
            this.buttonSubmit.removeAttribute('disabled')
        }
        // this.buttonSubmit.disabled = !value;
    }

    render() {
        return this.formOrder
    }
}