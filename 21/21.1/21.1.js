import { createStore, applyMiddleware } from 'redux';

const [INCREMENT, DECREMENT] = ['INCREMENT', 'DECREMENT'];

const rootReducer = (state = 0, action) => {
  if (action.type === INCREMENT || action.type === DECREMENT){
    return state + (action.type === INCREMENT ? 1 : -1);
  }
  return state;
}

const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

const consollerMiddleware = store => next => action => {
  console.log('store', store);
  console.log('next',next);
  console.log('action', action);

  return next(action);
};

const store = createStore(rootReducer, 0, applyMiddleware(consollerMiddleware));

const [counter, incrementButton, decrementButton] = ['counter', 'increment', 'decrement'].map(id => document.getElementById(id));

const changeCounter = state => counter.value = state;

incrementButton.addEventListener('click', () => {
    store.dispatch(increment());
    const state = store.getState();
    changeCounter(state);
});

decrementButton.addEventListener('click', () => {
    store.dispatch(decrement());
    const state = store.getState();
    changeCounter(state);
});

const state = store.getState();
changeCounter(state);