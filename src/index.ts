import './scss/styles.scss';
import { IProduct } from './types';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './components/model/BasketModel';
import { CatalogModel } from './components/model/CatalogModel';
import { BasketItemView } from './components/view/BasketItem';
import { FormModel } from './components/model/FormModel';
import { BasketView } from './components/view/Basket';
import { catalogItemView } from './components/view/CatalogItem';
import { Modal } from './components/view/Modal';
import { ModalSuccess } from './components/view/ModalSuccess';
import { Order } from './components/view/OrderForm';
import { Contacts } from './components/view/OrderContacts';

const events = new EventEmitter();
const basketView = new BasketView(document.querySelector('.basket'));
const basketModel = new BasketModel();
const catalogModel = new CatalogModel();
const products = catalogModel.items;
const order = new Order(document.querySelector('#order'), events);
const contacts = new Contacts(document.querySelector('#contacts'), events);
const modal = new Modal(document.querySelector('#modal-container'), events);
const success = new ModalSuccess(document.querySelector('#success'), events);
const formModel = new FormModel(events);

function renderBasket(ids: string[]) {
    const items = ids.map(id => {
        const itemView = new BasketItemView(document.getElementById('#card-basket') as HTMLTemplateElement, events);
        return itemView.render(catalogModel.getProduct(id));
    });
    
    basketView.render({ items });
}

function renderCatalog(products: IProduct[]) {
    const itemTemplate = document.querySelector('#catalog-item-template') as HTMLTemplateElement;
    
    const items = products.map(product => {
        const itemView = new catalogItemView(itemTemplate, events); 
        return itemView.render(product);
    });

    items.forEach(item => {
        itemTemplate.appendChild(item);
    });
}

events.on('basket:change', (event: { items: string[] }) => {
    renderBasket(event.items)
});

events.on('ui:basket-add', () => {
    basketModel.add
});

events.on('ui:basket-remove', () => {
    basketModel.delete
});

events.on('order:open', () => {
    modal.content = order.render();
    modal.render();
    formModel.items = basketModel.items.map(item => item.id)
});

events.on('order:payment-change', (button: HTMLButtonElement) => {
    formModel.payment = button.name
});

events.on('order:address-change', (data: { field: string, value: string }) => {
    formModel.setOrderAddress(data.field, data.value)
})

events.on('contacts:open', (data: { field: string, value: string }) => {
    formModel.setOrderData(data.field, data.value)
})

renderCatalog(products);
