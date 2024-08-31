import { configureStore } from '@reduxjs/toolkit';

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

const loggerEnhancer = (storeCreator) => (reducer, preloadedState, enhancer) => {
  const store = storeCreator(reducer, preloadedState, enhancer);

  const dispatch = (action) => {
    console.log('Dispatched action:', action);
    const result = store.dispatch(action);
    console.log('Current state:', store.getState());
    return result;
  };

  return {
    ...store,
    dispatch,
  };
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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(delayedActionMiddleware),
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(loggerEnhancer),
});

const [counter, incrementButton, decrementButton] = ['counter', 'increment', 'decrement'].map(id => document.getElementById(id));

const changeCounterValue = (state) => {
  counter.value = state.counter;
}

incrementButton.addEventListener('click', () => {
    store.dispatch(increment());
    const state = store.getState();
    changeCounterValue(state);
});

decrementButton.addEventListener('click', () => {
    store.dispatch(decrement());
    const state = store.getState();
    changeCounterValue(state);
});

const state = store.getState();
changeCounterValue(state);

store.subscribe(() => {
  const state = store.getState();
  changeCounterValue(state);
});
