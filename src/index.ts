import './scss/styles.scss';
import { IProduct } from './types';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './components/model/BasketModel';
import { CatalogModel } from './components/model/CatalogModel';
import { BasketItemView } from './components/view/BasketItem';
import { BasketView } from './components/view/Basket';
import { catalogItemView } from './components/view/CatalogItem';
import { Modal } from './components/view/Modal';
import { ModalSuccess } from './components/view/ModalSuccess';
import { Order } from './components/view/OrderForm';

const events = new EventEmitter();
const basketView = new BasketView(document.querySelector('.basket'));
const basketModel = new BasketModel();
const catalogModel = new CatalogModel();
const products = catalogModel.items;

function renderBasket(ids: string[]) {
    const items = ids.map(id => {
        const itemView = new BasketItemView(document.getElementById('#card-basket') as HTMLTemplateElement, events);
        return itemView.render(catalogModel.getProduct(id));
    });
    
    basketView.render({ items });
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

renderCatalog(products);
