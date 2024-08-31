import { createStore } from 'redux';

const initialState = {list: ['Современная фронтенд-разработка']};

const reducer = (state, action) => {
    const { type, payload } = action;

    if (type === 'ADD_PHRASE') {
        return {
            list: [...state.list, payload]
        }
    }

    return state;
}

const {
    getState, subscribe, dispatch, 
} = createStore(reducer, initialState);

const logState = (str) => console.log('state', getState(), str);

logState(`До вызова subscribe ${Date.now()}`);

const unsubscribe = subscribe(() => logState(`Вызов коллбэка ${Date.now()}`));

setTimeout(() => {
    dispatch({ type: 'ADD_PHRASE', 
        payload: 'Первое обновление стора' });
    unsubscribe();
}, 5000);

setTimeout(() => {
    dispatch({ type: 'ADD_PHRASE', 
        payload: 'Второе обновление стора' });
    logState(`После вызова unsubscribe ${Date.now()}`);
}, 7000);
