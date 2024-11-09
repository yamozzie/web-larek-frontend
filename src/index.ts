import './scss/styles.scss';
import { IOrderForm, IProduct } from './types';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './components/model/BasketModel';
import { CatalogModel } from './components/model/CatalogModel';
import { BasketItemView } from './components/view/BasketItem';
import { FormModel } from './components/model/FormModel';
import { BasketView } from './components/view/Basket';
import { catalogItemView } from './components/view/CatalogItem';
import { catalogView } from './components/view/Catalog';
import { Modal } from './components/view/Modal';
import { ModalSuccess } from './components/view/ModalSuccess';
import { Order } from './components/view/OrderForm';
import { Contacts } from './components/view/OrderContacts';
import { API_URL, CDN_URL } from './utils/constants';
import { ApiModel } from './components/model/ApiModel';
import { CardPreview } from './components/view/CardPreview';

const events = new EventEmitter();
const basket = new BasketView(document.querySelector('#basket'), events);
const basketModel = new BasketModel();
const catalogModel = new CatalogModel(events);
const order = new Order(document.querySelector('#order'), events);
const contacts = new Contacts(document.querySelector('#contacts'), events);
const modal = new Modal(document.querySelector('#modal-container'), events);
const formModel = new FormModel(events);
const apiModel = new ApiModel(CDN_URL, API_URL);
const previewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const template = document.querySelector('#card-catalog') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const modalSuccessTemplate = document.querySelector('#success') as HTMLTemplateElement;
const itemContainer = template.content.firstElementChild.cloneNode(true) as HTMLElement;
const itemView = new catalogItemView(itemContainer, events);


/* function renderCatalog() {
    const catalogContainer = document.querySelector('.gallery');
    const catalog = new catalogView(catalogContainer as HTMLElement);

    apiModel.getListCard()
    .then((products: IProduct[]) => {
        catalogModel.setItems(products);
        const productView = products.map((product) => {
            const template = document.querySelector('#card-catalog') as HTMLTemplateElement;
            const itemContainer = template.content.firstElementChild.cloneNode(true) as HTMLElement;
            const itemView = new catalogItemView(itemContainer, events)
            itemContainer.addEventListener('click', () => {
                const previewContainer = previewTemplate.content.firstElementChild.cloneNode(true) as HTMLElement;
                const previewView = new CardPreview(previewContainer, events);
                catalogModel.selectedCard = product;
                
                previewView.render(product);
                modal.content = previewContainer;
                modal.render();
            });
            itemView.render(product);
            return itemContainer;
        })
        catalog.render({ items: productView })
    })
    .catch((error) => console.log(error))
}; */

function renderCatalog() {
    const container = document.querySelector('.gallery');
    const catalog = new catalogView(container as HTMLElement);

    apiModel.getListCard()
    .then((products: IProduct[]) => {
        catalogModel.setItems(products);
        const productView = products.map((product) => {
        const itemContainer = template.content.firstElementChild.cloneNode(true) as HTMLElement;
        console.log(product)
        const itemView = new catalogItemView(itemContainer, events);
        cardPreview(itemContainer, product);
        itemView.render(product);
        return itemContainer;
        });

        catalog.render({ items: productView });
    });
}

function cardPreview(container: HTMLElement, item: IProduct) {
    container.addEventListener('click', () => {
        const previewContainer = previewTemplate.content.firstElementChild.cloneNode(true) as HTMLElement;
        const previewView = new CardPreview(previewContainer, events);
        catalogModel.selectedCard = item;
        previewView.render(item);
        modal.content = previewContainer;
        modal.render();
    });
}

events.on('basket:change', () => {
    basket.renderSumAllProducts(basketModel.sum());
    basket.renderHeaderBasketCounter(basketModel.counter());
    let i = 0;
    basket.items = basketModel.items.map((item) => {
        const basketItem = new BasketItemView(document.querySelector('#card-basket'), events);
        i += 1;
        return basketItem.render(item, i);
    });
});

events.on('ui:basket-open', () => {
    events.emit('basket:change');
    modal.content = basket.render()
    modal.render()
})

events.on('ui:basket-add', () => {
    basketModel.add(catalogModel.selectedCard);
    events.emit('basket:change');
    modal.close();
});

events.on('ui:basket-item-remove', (item: IProduct) => {
    basketModel.delete(item);
    console.log(item)
    console.log(basketModel.delete(item))
    events.emit('basket:change');
});

events.on('ui:order-open', () => {
    modal.content = order.render();
    modal.render();
    formModel.items = basketModel.items.map(item => item.id)
});

events.on('order:payment-change', (button: HTMLButtonElement) => {
    formModel.payment = button.name
});

events.on('order:address-change', (data: { field: string, value: string }) => {
    formModel.setOrderAddress(data.field, data.value)
});

events.on('errors:address', (errors: Partial<IOrderForm>) => {
    const { address, payment } = errors;
    order.valid = !address && !payment;
    order.formErrors.textContent = Object.values({address, payment}).filter(i => !!i).join(' и ');
})

events.on('ui:contacts-open', () => {
    formModel.total = basketModel.sum();
    modal.content = contacts.render();
    modal.render()
});

events.on('contacts:input-change', (data: { field: string, value: string }) => {
    formModel.setOrderData(data.field, data.value)
})

events.on('errors:contacts', (errors: Partial<IOrderForm>) => {
    const { email, phone } = errors;
    contacts.valid = !email && !phone;
    contacts.formErrors.textContent = Object.values({phone, email}).filter(i => !!i).join(' и ');
}) 

events.on('ui:success-open', () => {
    apiModel.postOrderLot(formModel.getOrder())
      .then((data) => {
        console.log(data)
        const success = new ModalSuccess(modalSuccessTemplate, events);
        modal.content = success.render(basketModel.sum());
        basketModel.clear();
        basket.renderHeaderBasketCounter(basketModel.counter());
        modal.render()
      })
      .catch((error) => { console.log(error) })
})

events.on('ui:success-close', () => { modal.close() })

renderCatalog()