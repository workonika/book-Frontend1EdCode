export const createElement = (tagList) => tagList.map(tag => document.createElement(tag));

const setAttributeBulk = (element, attributes) => {
    const keys = Reflect.ownKeys(attributes);

    keys.forEach(key => {
        element.setAttribute(key, attributes[key]);
    });

    return element;
};

const setTextContentBulk = (pairs) => {

    const iterator = pairs.values();

    for(const value of iterator){
        const[element, text] = value;
        element.textContent = text;
    }
};

const createProductCardCount = (product, cssClass) => {
    const [containerBook, img, containerPrice, priceSpan, titleDiv, buttonMinus, buttonPlus, count] = createElement(
        ['div', 'img', 'div', 'span', 'div', 'button', 'button', 'span']);

        count.classList.add('book-count');
        img.src = 'images/wildcard.png';

        setTextContentBulk([[count, item.count], [buttonMinus, '-'], [buttonPlus, '+']]);
        setAttributeBulk(buttonMinus, {
            title: 'Удалить один экземпляр',
            'data-id': productId,
            'data-action': 'decrement',
        });
        setAttributeBulk(buttonPlus, {
            title: 'Добавить один экземпляр',
            'data-id': productId,
            'data-action': 'increment',
        });
        [priceSpan, buttonMinus, count, buttonPlus].forEach(element => containerPrice.appendChild(element));

        priceSpan.textContent = `${price} руб.`;
        titleDiv.textContent = title;
        
        [img, containerPrice, titleDiv].forEach(element => containerBook.appendChild(element));

        return containerBook;
};

const createProductCardDefault = () => {};

export const createProductCardList = (productList, handleItem) => {
    const df = document.createDocumentFragment();
    
    productList.forEach(book => {
        const {productId, title, price} = book;

        const [containerBook, img, containerPrice, input, priceSpan, titleDiv, buttonMinus, buttonPlus, count] = createElement(
            ['div', 'img', 'div', 'input', 'span', 'div', 'button', 'button', 'span']);

        containerBook.classList.add('book');
        containerPrice.classList.add('price');
        img.src = 'images/wildcard.png';

        const item = handleItem(productId);

        if (item && item.count > 0) {
            count.classList.add('book-count');

            setTextContentBulk([[count, item.count], [buttonMinus, '-'], [buttonPlus, '+']]);
            setAttributeBulk(buttonMinus, {
                title: 'Удалить один экземпляр',
                'data-id': productId,
                'data-action': 'decrement',
            });
            setAttributeBulk(buttonPlus, {
                title: 'Добавить один экземпляр',
                'data-id': productId,
                'data-action': 'increment',
            });
            [priceSpan, buttonMinus, count, buttonPlus].forEach(element => containerPrice.appendChild(element));
        } else {
            setAttributeBulk(input, {
                type: 'image',
                src: 'images/basket.png',
                title: 'Добавить в корзину',
                'data-id': productId,
            });
            [priceSpan, input].forEach(element => containerPrice.appendChild(element));
        }
        
        priceSpan.textContent = `${price} руб.`;
        titleDiv.textContent = title;
        
        [img, containerPrice, titleDiv].forEach(element => containerBook.appendChild(element));

        df.appendChild(containerBook);        
    });

    return df;
}