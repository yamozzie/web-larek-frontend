import { createElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export interface IBasket {
  basket: HTMLElement;
  title: HTMLElement;
  list: HTMLElement;
  button: HTMLButtonElement;
  price: HTMLElement;
  headerBasketButton: HTMLButtonElement;
  headerBasketCounter: HTMLElement;
  renderHeaderBasketCounter(value: number): void;
  renderSumAllProducts(sum: number): void;
  render(): HTMLElement;
}

export class BasketView implements IBasket {
  basket: HTMLElement;
  title: HTMLElement;
  list: HTMLElement;
  button: HTMLButtonElement;
  price: HTMLElement;
  headerBasketButton: HTMLButtonElement;
  headerBasketCounter: HTMLElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    this.basket = template.content.querySelector('.basket').cloneNode(true) as HTMLElement;
    this.title = this.basket.querySelector('.modal__title');
    this.list = this.basket.querySelector('.basket__list');
    this.button = this.basket.querySelector('.basket__button');
    this.price = this.basket.querySelector('.basket__price');
    this.headerBasketButton = document.querySelector('.header__basket');
    this.headerBasketCounter = document.querySelector('.header__basket-counter');

    this.button.addEventListener('click', () => { this.events.emit('ui:order-open') })
    this.headerBasketButton.addEventListener('click', () => { this.events.emit('ui:basket-open') })

    this.items = []
  }

  set items(items: HTMLElement[]) {
    if (items.length) {
      this.list.replaceChildren(...items)
      this.button.removeAttribute('disabled');
    } else {
      this.button.setAttribute('disabled', 'disabled');
      this.list.replaceChildren(createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста' }))
    }
  }

  renderHeaderBasketCounter(value: number): void {
    this.headerBasketCounter.textContent = String(value)
  }

  renderSumAllProducts(sum: number): void {
    this.price.textContent = String(`${sum} синапсов`)
  }

  render() {
    this.title.textContent = 'Корзина'
    return this.basket
  }
}