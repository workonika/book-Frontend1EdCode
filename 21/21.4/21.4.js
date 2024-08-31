import { createStore, compose, applyMiddleware, combineReducers } from 'redux';

const actionTypeList = ['INCREMENT', 'DECREMENT'];
const [INCREMENT, DECREMENT] = actionTypeList;

const counterReducer = (state = 0, action) => {
  if (action.type === INCREMENT || action.type === DECREMENT){
    return state + (action.type === INCREMENT ? 1 : -1);
  }
  return state;
};

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

const changesTrackerEnhancer = (createStore) => (reducer, initialState) => {
  const store = createStore(reducer, initialState);

  let trackedState = initialState;
  const listeners = [];

  const dispatch = (action) => {
    store.dispatch(action);
    listeners.forEach((listener) => listener(store.getState(), trackedState));
    trackedState = store.getState();
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  };

  return {
    ...store,
    dispatch,
    subscribe,
  };
};

const customEnhancers = compose(applyMiddleware(delayedActionMiddleware), changesTrackerEnhancer);

const store = createStore(counterReducer, 0, customEnhancers);

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

store.subscribe((currentState, previousState) => {
  console.log('previousState', previousState);
  changeCounter(currentState)
});
