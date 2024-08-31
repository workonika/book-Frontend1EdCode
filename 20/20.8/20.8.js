import { createStore } from 'redux';

const initialState = {list: ['Современная фронтенд-разработка']};
const ADD_PHRASE = 'ADD_PHRASE';
const createAddPhrase = (phrase) => ({ type: ADD_PHRASE, payload: phrase });
const selectAllPhrases = (state) => state.list;

const reducer = (state, action) => {
    const { type, payload } = action;

    if (type === ADD_PHRASE) {
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
subscribe(() => logState(`через dispatch`));
dispatch(createAddPhrase('Библиотеки всё ещё актуальны'));
dispatch(createAddPhrase('Добавляем ещё фразу'));

console.log(selectAllPhrases(getState()));
