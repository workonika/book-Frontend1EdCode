import { createElement } from "./createBookCardDOMList";

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

const getTotalPrice = (productList) => productList.reduce((price, product) => price + product.price, 0);

export const createShoppingCartDOMList = (productList, shoppingCartList) => {
    const df = document.createDocumentFragment();

    const [div, hr, details, summary] = createElement(['div', 'hr', 'details', 'summary']);
    const {length} = shoppingCartList;

    if (length !== 0){
        const shoppingCartProductList = productList.filter(product => shoppingCartList.includes(product.productId));
        const shoppingCartTitle = `В корзине ${length} товар${getWordEnding(length)} на сумму ${getTotalPrice(shoppingCartProductList)} руб.`;

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