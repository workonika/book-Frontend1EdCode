import { configureStore, Tuple } from '@reduxjs/toolkit';

const actionTypeList = ['INCREMENT', 'DECREMENT']; 
const [INCREMENT, DECREMENT] = actionTypeList;

const counterReducer = (state = 20, action) => {

    if (action.type === INCREMENT || action.type === DECREMENT){
        return state + (action.type === INCREMENT ? 1 : -1);
    }

    return state;
};

const delayedActionMiddleware = store => next => action => {
  if (action.type === INCREMENT && action.meta && action.meta.delay) {
    setTimeout(() => {
      next(action)
    }, action.meta.delay);
    return
  }

  return next(action)
};

const [increment, decrement] = actionTypeList.map(type => () => ({ type, meta: {delay: 1000}  }));

const rootReducer = {
    counter: counterReducer,
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    counter: 5
  },
  middleware: () => new Tuple(delayedActionMiddleware),
});

const [counter, incrementButton, decrementButton] = ['counter', 'increment', 'decrement'].map(id => document.getElementById(id));

incrementButton.addEventListener('click', () => {
    store.dispatch(increment());
    const state = store.getState();
    counter.value = state.counter;
});

decrementButton.addEventListener('click', () => {
    store.dispatch(decrement());
    const state = store.getState();
    counter.value = state.counter;
});

const state = store.getState();
counter.value = state.counter;

store.subscribe(() => {
  const state = store.getState();
  counter.value = state.counter;
});