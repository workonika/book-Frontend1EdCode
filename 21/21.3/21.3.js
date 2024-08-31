import { createStore, applyMiddleware } from 'redux';

const actionTypeList = ['INCREMENT', 'DECREMENT'];
const [INCREMENT, DECREMENT] = actionTypeList;

const rootReducer = (state = 0, action) => {
  if (action.type === INCREMENT || action.type === DECREMENT){
    return state + (action.type === INCREMENT ? 1 : -1);
  }
  return state;
}

const [increment, decrement] = actionTypeList.map(type => () => ({ type, meta: {delay: 1000} }));

const delayedActionMiddleware = store => next => action => {
  if (action.type === INCREMENT && action.meta && action.meta.delay) {
   
    setTimeout(() => {
      next(action)
    }, action.meta.delay);
    return
  }

  return next(action)
}

const store = createStore(rootReducer, 0, applyMiddleware(delayedActionMiddleware));

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

store.subscribe(() => {
  const state = store.getState();
  changeCounter(state)
});
