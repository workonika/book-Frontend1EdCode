import { configureStore } from '@reduxjs/toolkit';

const actionTypeList = ['INCREMENT', 'DECREMENT']; 
const [INCREMENT, DECREMENT] = actionTypeList;

const counterReducer = (state = 20, action) => {

    if (action.type === INCREMENT || action.type === DECREMENT){
        return state + (action.type === INCREMENT ? 1 : -1);
    }

    return state;
};

const [increment, decrement] = actionTypeList.map(type => () => ({ type }));

const rootReducer = {
    counter: counterReducer,
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    counter: 5
  },
});

store.subscribe(() => console.log(store.getState()));

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