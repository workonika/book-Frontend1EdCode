import { configureStore, createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [{ id: nanoid(), title: 'Современная фронтенд разработка' }];

const testCreateReducers = createSlice({
  name: 'testCreateReducer',
  initialState,
  reducers: (create) => ({
    deleteFromState: create.reducer((state, action) => {
      console.log('action', action);
      const index = state.findIndex((phraseObject) => phraseObject.id === action.payload);
      if (typeof index === 'number') {
        state.splice(index, 1);
      }
    }),
    saveToState: create.preparedReducer((phrase) => {
      return {
        payload: {
          id: nanoid(),
          title: phrase,
        }
      }
    }, (state, action) => {
      state.push(action.payload);
    }),
  }),
});

const { saveToState, deleteFromState, } = testCreateReducers.actions;

const { reducer, getSelectors } = testCreateReducers;

const store = configureStore({
  reducer: { 
    testCreateReducer: reducer,
    //  другие редьюсеры
  },
});

store.subscribe(() => {
  console.log(store.getState());
});

['Тришкин кафтан', 'Слон и Моська', 'Лебедь, щука и рак', 'Демьянова уха'].forEach(phrase => store.dispatch(saveToState(phrase)));

const state = store.getState();
const { length } = state.testCreateReducer;
const randomIndex = Math.ceil(Math.random() * (length - 1));
const { id: deleteId } = state.testCreateReducer[randomIndex];
console.log('Состояние до экшена deleteFromState', store.getState());
console.log('deleteId', deleteId);
store.dispatch(deleteFromState(deleteId));
console.log('Состояние после экшена deleteFromState', store.getState());

console.log('testCreateReducers', testCreateReducers);
console.log('getInitialState', testCreateReducers.getInitialState())
console.log('get selectors', getSelectors());