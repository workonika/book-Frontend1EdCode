import { createStore } from 'redux';
//      1
const initialState = ['Современная фронтенд-разработка'];
//      2
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PHRASE':
      return [...state, action.payload];
    default:
      return state;
  }
};
//     4        //   3
const store = createStore(reducer, initialState);

const [output, input, button, subsBtn, unsubsBtn] = ['output', 'input', 'button', 'subsBtn', 'unsubsBtn'].map(
  id => document.querySelector(`#${id}`));
//     5
const subscribeStore = () => {
  //     7            //  6
  const state = store.getState();
    const fragment = document.createDocumentFragment();
    input.value = '';
    output.innerHTML = '';

    state.forEach((phrase) => {
      fragment.appendChild(document.createTextNode(phrase))
      fragment.appendChild(document.createElement('br'));
    });
    output.appendChild(fragment);
};
//      9                 //   8
const unsubscribe = store.subscribe(subscribeStore);

button.addEventListener('click', (e) => {
  e.preventDefault();
  const { value } = input;

  if (value) {  
    //     11     //  10
    store.dispatch({ type: 'ADD_PHRASE', payload: value });
  }
});

unsubsBtn.addEventListener('click', (e) => {
  e.preventDefault();
  unsubscribe();
});

subsBtn.addEventListener('click', (e) => {
  e.preventDefault();
  store.subscribe(subscribeStore);
});