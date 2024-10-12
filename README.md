# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Паттерн проектирования

В данном проекте используется паттерн MVP (Model-View-Presenter)

## Типы данных

### Интерфейсы

Интерфейс **IProduct**
Интерфейс, хранящий данные о продуктах c сервера

Интерфейс **IOrder**
Содержит поля для составления заказа


### Модели данных (Model)

#### BasketModel
 
Класс **BasketModel** обеспечивает работу корзины. Наследует интерфейс IBasketModel. Его функция управление данными корзины, добавление и удаление товаров.

Атрибут:
- _items: массив объектов IProduct, содержащий товары в корзине.

Методы:
- add(data: IProduct): добавляет товар в корзину.
- delete(data: IProduct): удаляет товар из корзины по id.
- set items(data: IProduct[]): задает новый массив товаров.

#### CatalogModel

Класс **CatalogModel** обеспечивает работу каталога товаров сайта. Наследует интерфейс ICatalogModel. Его задаача управление данными каталога, получение товаров из сервера.

Атрибут:
- _items: массив объектов IProduct, содержащий товары каталога.

Методы:
- setItems(items: IProduct[]): задает массив продуктов для каталога.
- getProduct(id: string): возвращает объект продукта по id.

### Модели представления (View)

#### BasketView

Класс **BasketView** обеспечивает отображение корзины. Его задача отображать предметы, добавленные в корзину

Атрибут:
- container: элемент HTML, который рендерит корзину.

Метод:
- render(data: { items: HTMLElement[] }): рендер корзины.

#### BasketItemView

Класс **BasketItemView** работает вместе с BasketView, его задача рендерить товары в корзине

Атрибуты:
- container: элемент шаблона HTML для товара в корзине.
- title: название товара
- addButton, deleteButton: элементы управления внутри корзины.
- id: идентификатор товара.

Методы:
- render(data: { id: string, title: string }): отображает данные о товаре.

#### catalogItemView

Класс **catalogItemView** обеспечивает ранедер предметов каталога. Его задача подставлять товары под шаблон, работает вместе с классом catalogView

Атрибуты:
- container: элемент шаблона HTML для одного товара в каталоге.
- title, image, category, price: элементы управления для отображения товара.
- id: идентификатор товара.

Метод:
- render(data: IProduct): отображает данные о товаре.

#### catalogView

Класс **catalogView** рендерит весь каталог со всеми товарами.

Атрибут:
- container: элемент шаблона HTML, который рендерит каталог товаров.

Метод:
- render(data: { items: HTMLElement[] }): добавляет товары в каталог.

### Связующая модель (Presenter)

Презентер не выявлен в явный класс, однако взаимодействие между слоями модели и представления осуществляется через события и вызовы методов. Например, в BasketItemView и CatalogItemView через объект событий events происходит связь между Моделями представления (View) и Моделями данных (Model).