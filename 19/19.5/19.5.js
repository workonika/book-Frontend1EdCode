import { createStore, combineReducers } from 'redux';
import { isEqualValues } from 'klumba';

const [ADD_BOOK, DELETE_BOOK, CHANGE_LANGUAGE, LOGIN, LOGOUT, /*...*/] = ['ADD_BOOK', 'DELETE_BOOK', 'CHANGE_LANGUAGE', 'LOGIN', 'LOGOUT', /*...*/];

const booksState = [{
  id: 'x3Df82',
  ISBN: '978-5-4461-2264-6',
  title: 'Software Dynamics: оптимизация производительности программного обеспечения',
  preview: '44612264.jpg',
  price: 3056,
  url: 'https://www.piter.com/collection/soon/product/software-dynamics-optimizatsiya-proizvoditelnosti-programmnogo-obespecheniya',
}, {
  id: 'Z2aq12',
  ISBN: '978-5-4461-1818-2',
  title: 'Производительность систем',
  preview: '44611818.jpg',
  price: 4159,
  url: 'https://www.piter.com/collection/all/product/proizvoditelnost-sistem',
}, {
  id: 'pL765Q',
  ISBN: '978-5-4461-1689-8',
  title: 'BPF: профессиональная оценка производительности',
  preview: '44611689.jpg',
  price: 3099,
  url: 'https://www.piter.com/collection/new/product/bpf-professionalnaya-otsenka-proizvoditelnosti',
}];

const languageReducer = (state = 'ru', action) => {
  if (action.type === CHANGE_LANGUAGE) {
    return action.payload;
  }

  return state;
};
/** другие реддьюсеры */
const congratulationReducer = (state = {
  ru: 'Приветствуем тебя',
  en: 'We welcome you',
}, action) => {
  return state;
};

const shoppingCartReducer = (state = [], action) => {
  console.log('action', action);
  
  switch(action.type){
    case ADD_BOOK: {
      const { id } = action.payload;
      const bookInState = state.find(book => book.id === id);

      if (bookInState){
        return state;
      }

      return state.concat(action.payload);
    }
    case DELETE_BOOK: {
      const { id } = action.payload;
      return state.filter(book => book.id !== id)
    }
    default: {
      return state;
    }
  }
};

const notificationsReducer = (state = [
  { id: 1, message: 'Скидка 30% на электронику', isRead: false },
], action) => {
  return state;
};

const isLoggedInReducer = (state = true, action) => {
  if (isEqualValues(action.type, [LOGIN, LOGOUT]) && isEqualValues(action.payload, [true, false])) {
    return action.payload;
  }

  return state;
}

const booksReducer = (state = booksState, action) => {
  //  реализация обработки экшенов при помощи Redux Thunk, так как потребуются запросы к серверу
  return state;
};

const userReducer = (state = {
  id: 1,
  name: 'Питер Пен',
  email: '',
}, action) => {
  //  реализация обработки экшенов при помощи Redux Thunk, так как потребуются запросы к серверу
  return state;
};

const rootReducer = combineReducers({
  language: languageReducer,
  congratulation: congratulationReducer,
  shoppingCart: shoppingCartReducer,
  notifications: notificationsReducer,
  isLoggedIn: isLoggedInReducer,
  books: booksReducer,
  user: userReducer,
});

const store = createStore(rootReducer);

const addBook = (book) => ({ type: ADD_BOOK, payload: book });

const [congratulationElement, shoppingCartElement, booksElement, notificationsElement] = [
  'congratulation', 'shopping_cart', 'books', 'notifications'].map(id => document.getElementById(id));
const defaultState = store.getState();
const { language, isLoggedIn, congratulation, user, books } = defaultState;

store.subscribe(() => {
  const state = store.getState(); 
  const { shoppingCart } = state;
  const length = shoppingCart.length;
  shoppingCartElement.textContent = `В корзине: ${length} ${length > 1 ? ' книги' : ' книга'}`;
});

if (isLoggedIn) {
  const name = document.createTextNode(congratulation[language].concat(' ', user.name));
  congratulationElement.appendChild(name);
}

const df = document.createDocumentFragment();

books.forEach((book) => {
  const { ISBN, title, preview, price, url } = book;
  
  const [img, button, pricing, container] = createElements([
    ['img', 'preview'], ['button', 'button'], ['div', 'price'], ['div', 'book'], 
  ]);
  const a = createAnchor(url);
  a.appendChild(document.createTextNode('Просмотреть в магазине'));

  img.setAttribute('src', `./preview/${preview}`);
  pricing.appendChild(createTextBlock([title, `ISBN: ${ISBN}`, `Цена: ${price} руб.`]));
  button.appendChild(document.createTextNode('Добавить в корзину'));
  button.addEventListener('click', () => store.dispatch(addBook(book)));

  df.appendChild(appendChild(container, [img, button, pricing, a]));
});

booksElement.appendChild(df);
shoppingCartElement.textContent = 'Корзина пуста';

function createElement(tag, cssClass){
  const element = document.createElement(tag);
  element.classList.add(cssClass ?? '');

  return element;
}

function appendChild(parent, children){
  [].forEach.call(children, (child) => parent.appendChild(child));

  return parent;
}

function createElements(elements){
  return elements.map(([tag, cssClass]) => createElement(tag, cssClass));
}

function createTextBlock(textList){
  const section = createElement('section', 'book-description');
  textList.forEach(text => {
    const div = createElement('div', 'description');
    div.appendChild(document.createTextNode(text));
    section.appendChild(div);
  });

  return section;
}

function createAnchor(url){
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('target', 'new');

  return a;
}