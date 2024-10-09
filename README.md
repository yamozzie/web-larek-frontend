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
- src/styles/styles.scss — корневой файл стилей
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

## Типы данных

### Интерфейсы

Интерфейс **IProduct**
Интерфейс, хранящий данные о продуктах c сервера

Интерфейс **IOrder**
Содержит поля для составления заказа


### Модели данных

#### BasketModel
 
Класс **BasketModel** обеспечивает работу корзины. Наследует интерфейс IBasketModel. Его функция описывать логику корзины: добавления и удаление товаров

Компонент **add** добавляет выбранный товар в корзину

Компонент **delete** удаляет выбранный товар из корзины

#### CatalogModel

Класс **CatalogModel** обеспечивает работу каталога товаров сайта. Наследует интерфейс ICatalogModel. Его задача получать данные о товарах сервера

Функция **setItems** задаёт новый массив продуктов. Может использоваться для обновления списка продуктов 

Функция **getProduct** принимает id продукта в качестве аргумента и возвращает объект продукта, который соответствует этому id. Если продукт с таким id не найден, возвращается undefined.

### Модели представления

Класс **BasketView** обеспечивает отображение корзины. Его задача отображать предметы, добавленные в корзину

Класс **BasketItemView** работает вместе с BasketView, его задача рендерить товары в корзине

Класс **catalogItemView** обеспечивает ранедер предметов каталога. Его задача подставлять товары под шаблон, работает вместе с классом catalogView

Класс **catalogView** рендерит весь каталог со всеми товарами.