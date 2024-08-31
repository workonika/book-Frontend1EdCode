// Подключение необходимых модулей
import { produce } from 'immer';
import { createStore } from 'redux';

// Исходное состояние стора
const initialState = {
  counter: 0,
};

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Редьюсер
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return produce(state, (draftState) => {
        draftState.counter++;
      });
    case DECREMENT:
      return produce(state, (draftState) => {
        draftState.counter--;
      });
    default:
      return state;
  }
};

// Создание Redux store
const store = createStore(reducer);

const [counter, increment, decrement] = ['counter', 'increment', 'decrement'].map(id => document.getElementById(id));

increment.addEventListener('click', () => {
    store.dispatch({ type: INCREMENT });
});

decrement.addEventListener('click', () => {
    store.dispatch({ type: DECREMENT });
});

// Подписка на изменения в сторе
store.subscribe(() => {
    const state = store.getState();
    counter.value = state.counter;
});
const state = store.getState();
counter.value = state.counter;
  console.log(store);