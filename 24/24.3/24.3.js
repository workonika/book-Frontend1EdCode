import { configureStore, createSlice, nanoid } from '@reduxjs/toolkit';
import { generateMultipleOfInteger } from './generateInteger';
import { bookTitleList } from './bookTitleList';
import { createProductCardList } from './createProductCardList';
import { createShoppingCartList } from './createShoppingCartList';

const products = bookTitleList.reduce((dictionary, title) => {
  const productId = nanoid();
  const price = generateMultipleOfInteger(500, 2000, 2);

  return {...dictionary, [productId]: { productId, title, price }};
}, {});

//  Начальное состояние корзины
const initialState = {
  products,
  shoppingCart: {}
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToCart: {
      reducer: (state, action) => {
        if (!state.find(book => book.productId === action.payload)){
          state.push({ productId: action.payload, count: 1 });
        }
      },
      prepare: (productId) => {
        return {
          payload: productId,
        };
      },
    },
    removeFromCart: {
      reducer: (state, action) => {
        const index = state.findIndex(book => book.productId === action.payload);
        if (index !== -1) {
          state.splice(index, 1);
        }       
      },
      prepare: (productId) => {
        return {
          payload: productId,
        }
      }
    },
    //  Добавлены кейс-редьюсеры
    incrementCount: (state, action) => {
      state.forEach(elem => {
        if (elem.productId === action.payload){
          elem.count += 1;
        }
      });
    },
    decrementCount: (state, action) => {
      const {payload: productId} = action;
      const book = state.find((book) => book.productId === productId);

      if (book.count === 1){
        return state.filter(book => book.productId !== productId);
      } else {
        state.forEach(elem => {
          if (elem.productId === action.payload){
            elem.count -= 1;
          }
        });
      }
    }
  },
  // другой код
  selectors: {
    getProductById: (state, productId) => {
      return state[productId];
    },
    getTotalProductsCount: (state) => state.reduce((total, book) => total + book.count, 0),
  }
  // другой код
});

const { addToCart, removeFromCart, incrementCount, decrementCount, create } = shoppingCartSlice.actions;
//const { getByProductId, getTotalBookCount, getTotalPrice } = shoppingCartSlice.selectors;

const { reducer } = shoppingCartSlice;

const store = configureStore({
  reducer: { 
    shoppingCart: reducer,
    //  другие редьюсеры
  },
});

const [productsContainerDOM, shoppingCartContainerDOM] = ['products', 'shopping-cart'].map(id => document.getElementById(id));

//  Обработчик события на родительский DOM-элемент для списка книг в товарах. Это делегирование обработки события.
//  Если это INPUT или BUTTON тогда в стор отправляется экшен
productsContainerDOM.addEventListener('click', (e) => {
  const {target} = e;
  const { tagName } = target;
  
  if (tagName !== 'INPUT' && tagName !== 'BUTTON'){
    return;
  }

  const { id } = target.dataset;

  if (tagName === 'BUTTON') {
    const createAction = target.dataset.action === 'increment' ? incrementCount : decrementCount;
    return store.dispatch(createAction(id));
  }

  store.dispatch(addToCart(id));
}, false);

//  Обработчик события на родительский DOM-элемент для списка книг в корзине. Это делегирование обработки события.
shoppingCartContainerDOM.addEventListener('click', (e) => {
  const {target} = e;
  if (target.tagName !== 'BUTTON'){
    return;
  }

  store.dispatch(removeFromCart(target.dataset.id));
});

//  Подписка на обновления стора и обновление корзины и списка товаров
//  TODO Разделить на две функции
store.subscribe(() => {
  const state = store.getState();
  shoppingCartContainerDOM.textContent = '';
  const orderedCount = getTotalBookCount(state);
  shoppingCartContainerDOM.appendChild(createShoppingCartList(books, state.shoppingCart, orderedCount));
  
  const productsDOMList = createProductCardList(books, getByProductId(state));
  
  productsContainerDOM.textContent = '';
  productsContainerDOM.appendChild(productsDOMList);
});

//  Начальное состояние списка книг и корзины
const state = store.getState();
//const productsDOMList = createProductCardList(books, ...);
//  Нужно обязательно задавать эту переменную, так как состояние может загружаться и корзина может быть не пустой
//const orderedCount = getTotalBookCount(state);

productsContainerDOM.appendChild(productsDOMList);
//shoppingCartDOM.appendChild(createShoppingCartList(books, state.shoppingCart, orderedCount));
