import { IEvents } from "../base/events";

export class Contacts {
    formContacts: HTMLFormElement;
    inputAll: HTMLInputElement[];
    buttonSubmit: HTMLButtonElement;
    formErrors: HTMLElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this.formContacts = template.content.querySelector('.form')!.cloneNode(true) as HTMLFormElement;
        this.inputAll = Array.from(this.formContacts.querySelectorAll('.form__input'));
        this.buttonSubmit = template.querySelector('.button')!;
        this.formErrors = template.querySelector('.form__errors')!;

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
            this.events.emit('success:open')
        })
    }

    render() {
        return this.formContacts
    }

}