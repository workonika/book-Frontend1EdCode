import { createElement } from "./createProductCardList";

const getWordEnding = (count) => {
    const [remDivTen, remDivHun] = [count % 10, count % 100];

    if (remDivHun > 10 && remDivHun < 21){
        return 'ов';
    }
    
    switch(remDivTen){
        case 1: 
            return '';

        case 2:
        case 3:
        case 4:
            return 'а';

        default: 
            return 'ов';
    }
};

const getTotalPrice = (productList, state) => productList.reduce((price, product) => {
    const {productId} = product;
    const {count} = state.find(book => book.productId === productId);

    return price + product.price * count; 
}, 0);

export const createShoppingCartList = (productList, state, count) => {
    const df = document.createDocumentFragment();

    const [div, hr, details, summary] = createElement(['div', 'hr', 'details', 'summary']);

    if (count !== 0){
        const shoppingCartProductList = productList.filter(product => {
            const {productId} = product;
            const book = state.find((book) => book.productId === productId);

            return Boolean(book);
        });

        const total = getTotalPrice(shoppingCartProductList, state);
        const shoppingCartTitle = `В корзине ${count} товар${getWordEnding(count)} на сумму ${total} руб.`;

        div.textContent = shoppingCartTitle;
        summary.textContent = 'Товары в корзине';
        details.appendChild(summary);

        shoppingCartProductList.forEach(product => {
            const {title, price, productId} = product;
            const [divProduct, spanTitle, spanPrice] = createElement(['div', 'span', 'span']);
            const button = document.createElement('button');
            
            button.dataset.id = productId;
            button.textContent = 'Удалить';
            spanTitle.textContent = title;
            spanPrice.textContent = ` ${price} руб.`;

            [spanTitle, spanPrice, button].forEach(element => divProduct.appendChild(element));

            df.appendChild(divProduct);
        });

        details.appendChild(df);

        [div, hr, details].forEach(element => df.appendChild(element));

        return df;
    }

    div.textContent = 'В корзине нет товаров';
    [div, hr].forEach(element => df.appendChild(element));

    return df;
};