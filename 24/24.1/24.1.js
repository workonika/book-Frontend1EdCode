import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = 5;

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    incrementByAmount(state, action) {
      
      return state + action.payload;
    },
  }, 
});

const { increment, decrement, incrementByAmount } = counterSlice.actions;

const { reducer } = counterSlice;

const store = configureStore({
  reducer: {
    counter: reducer,
    //  другие редьюсеры
  },
  preloadedState: {
    counter: 11,
    //  другие области состояния
  },
});

const [counter, incrementButton, decrementButton, amount, incrementByAmountButton] = [
  'counter', 'increment', 'decrement', 'amount', 'incrementByAmount'].map(id => document.getElementById(id));

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

incrementByAmountButton.addEventListener('click', () => {
  const { value } = amount;

  if (value === '0'){
    return;
  }

  store.dispatch(incrementByAmount(Number(value)));
  const state = store.getState();
  changeCounterValue(state);
});

const state = store.getState();
changeCounterValue(state);

store.subscribe(() => {
  const state = store.getState();
  changeCounterValue(state);
});
