import { IEvents } from "../base/events";
import { FormErrors } from '../../types/index';

export interface IFormModel {
    payment: string;
    address: string;
    email: string;
    phone: string;
    total: number;
    items: string[];
    setOrderAddress(field: string, value: string): void;
    setOrderData(field: string, value: string): void;
    orderValidate(): boolean;
    contactsValidate(): boolean;
    getOrder(): object;
}

export class FormModel implements IFormModel {
    payment: string;
    address: string;
    email: string;
    phone: string;
    total: number;
    items: string[];
    formErrors: FormErrors = {}

    constructor(protected events: IEvents) {
        this.payment = '';
        this.address = '';
        this.email = '';
        this.phone = '';
        this.total = 0;
        this.items = [];
    };

    setOrderAddress(field: string, value: string): void {
        if (field === 'address') {
            this.address = value;
        }
        if (this.orderValidate()) {
            this.events.emit('ui:order-ready', this.getOrder())
        }
    };

    setOrderData(field: string, value: string): void {
        if (field === 'email') {
            this.email = value;
        } else if (field === 'phone') {
            this.phone = value;
        }

        if (this.contactsValidate()) {
            this.events.emit('ui:order-ready', this.getOrder())
        }
    };

    orderValidate() {
        const errors: typeof this.formErrors = {};

        if (!this.address) {
            errors.address = 'Укажите адрес'
        } else if (!this.payment) {
            errors.payment = 'Выберите способ оплаты'
        }

        this.formErrors = errors
        this.events.emit('errors:address', this.formErrors)
        return Object.keys(errors).length === 0
    }

    contactsValidate() {
        const regexpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const regexpPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/;
        const errors: typeof this.formErrors = {};
    
        if (!this.email) {
          errors.email = 'Необходимо указать email'
        } else if (!regexpEmail.test(this.email)) {
          errors.email = 'Некорректный адрес электронной почты'
        }
    
        if (this.phone.startsWith('8')) {
          this.phone = '+7' + this.phone.slice(1);
        }
    
        if (!this.phone) {
          errors.phone = 'Необходимо указать телефон'
        } else if (!regexpPhone.test(this.phone)) {
          errors.phone = 'Некорректный формат номера телефона'
        }
    
        this.formErrors = errors;
        this.events.emit('errors:contacts', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    getOrder(): object {
        return {
            payment: this.payment,
            address: this.address,
            email: this.email,
            phone: this.phone,
            total: this.total,
            items: this.items,
        }
    };
}