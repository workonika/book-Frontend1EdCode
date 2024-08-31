import autodux, { id } from 'autodux';
import { createStore } from 'redux';

const {
    reducer,
    initial,
    slice,
    actions: {
        increment,
        decrement,
    },
    selectors: {
        getCounter,
    }
} = autodux({
    slice: 'counter',
    initial: {
        counter: 0
    },
    actions: {
        increment: state => ({ counter: state.counter + 1 }),
        decrement: state => ({ counter: state.counter - 1 }),
    },
    selectors: {
        getCounter: (__, state) => state.counter,
    }
});

const store = createStore(reducer, initial);
/** другой код*/
const [counter, incrementButton, decrementButton] = ['counter', 'increment', 'decrement'].map(id => document.getElementById(id));
console.log('slice', slice);
incrementButton.addEventListener('click', () => {
    store.dispatch(increment());
    counter.value = getCounter(store.getState());
});

decrementButton.addEventListener('click', () => {
    store.dispatch(decrement());
    counter.value = getCounter(store.getState());
});

counter.value = 0;