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

const state = getState();
const logState = (str) => console.log('state', getState(), str);
const unsubscribe = subscribe(() => logState(`через dispatch`));
dispatch({type: 'ADD_PHRASE', payload: 'Библиотеки всё ещё актуальны'});
state.list.push('Изменим напрямую');
dispatch({type: 'ADD_PHRASE', payload: 'Добавляем ещё фразу'});
console.log('state', state);