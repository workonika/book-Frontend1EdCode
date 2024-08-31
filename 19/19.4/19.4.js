import { createStore } from 'redux';

const [ADD_BOOK, DELETE_BOOK, LOGIN, LOGOUT, /*...*/] = ['ADD_BOOK', 'DELETE_BOOK', 'LOGIN', 'LOGOUT', /*...*/];

// const initialState = {
//   language: 'ru',
//   congratulation: { ru: 'Приветствуем тебя',},
//   shoppingCart: [],
//   notifications: [{ id: 1, message: 'Скидка 30% на электронику', isRead: false },],
//   isLoggedIn: true,
//   user: {/* данные пользователя */},
//   books: [/* данные о книгах */]
// };

const initialState = {
  language: 'ru',
  congratulation: {
    ru: 'Приветствуем тебя',
    en: 'We welcome you',
  },
  shoppingCart: [],
  notifications: [
    { id: 1, message: 'Скидка 30% на электронику', isRead: false },
  ],
  isLoggedIn: true,
  user: {
    id: 1,
    name: 'Питер Пен',
    email: '',
  },
  books: [{
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
  }]
};

const rootReducer = (state, action) => {
  console.log('state', state);
  // оставшася реализация редьюсера
  switch(action.type){
    case ADD_BOOK: {
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(book => book.id !== action.payload.id).concat(action.payload),
      };
    }
    case DELETE_BOOK: {
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(book => book.id !== action.payload.id),
      }
    }
    // реализация обработки других экшенов
    default: {
      return state;
    }
  }
};

const addBook = (ISBN) => ({ type: ADD_BOOK, payload: ISBN });
const delBook = (ISBN) => ({ type: DELETE_BOOK, payload: ISBN });

const store = createStore(rootReducer, initialState);

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
  const a = createA(url);
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

function createA(url){
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('target', 'new');

  return a;
}