export const ADD_PHRASE = 'ADD_PHRASE';

export const [createAddPhrase] = [ADD_PHRASE]
  .map((type) => (payload) => ({ type, payload }));

button.addEventListener('click', (e) => {
    e.preventDefault();
    const { value } = input;
  
    if (value) {  
      store.dispatch(createAddPhrase(value));
    }
  });