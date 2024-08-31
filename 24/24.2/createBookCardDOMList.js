export const createElement = (tagList) => tagList.map(tag => document.createElement(tag));

export const createBookCardDOMList = (bookList) => {
    const df = document.createDocumentFragment();
    bookList.forEach(book => {
        const {productId, title, price} = book;

        const [containerBook, img, containerPrice, input, priceSpan, titleDiv] = createElement(['div', 'img', 'div', 'input', 'span', 'div']);

        containerBook.classList.add('book');
        containerPrice.classList.add('price');
        img.src = 'images/wildcard.png';
        input.setAttribute('type', 'image');
        input.setAttribute('src', 'images/basket.png');
        input.setAttribute('title', 'Добавить в корзину');
        input.setAttribute('data-id', productId);
        priceSpan.textContent = `${price} руб.`;
        titleDiv.textContent = title;

        [priceSpan, input].forEach(element => containerPrice.appendChild(element));
        [img, containerPrice, titleDiv].forEach(element => containerBook.appendChild(element));

        df.appendChild(containerBook);        
    });

    return df;
}