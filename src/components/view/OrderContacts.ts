import { IEvents } from "../base/events";

export class Contacts {
    formContacts: HTMLFormElement;
    inputAll: HTMLInputElement[];
    buttonSubmit: HTMLButtonElement;
    formErrors: HTMLElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this.formContacts = template.content.querySelector('.form')!.cloneNode(true) as HTMLFormElement;
        this.inputAll = Array.from(this.formContacts.querySelectorAll('.form__input'));
        this.buttonSubmit = this.formContacts.querySelector('.button');
        this.formErrors = this.formContacts.querySelector('.form__errors');

        this.inputAll.forEach(item => {
            item.addEventListener('input', (event) => {
                const target = event.target as HTMLInputElement;
                const field = target.name;
                const value = target.value;
                this.events.emit('contacts:input-change', { field, value })
            })
        });

        this.formContacts.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.events.emit('ui:success-open')
        })
    }

    set valid(value: boolean) {
        if (value) {
            this.buttonSubmit.removeAttribute('disabled')
        }
    }

    render() {
        return this.formContacts
    }

}