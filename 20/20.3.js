export const ADD_PHRASE = 'ADD_PHRASE';
export const CREATE_USER = 'CREATE_USER';

export const [createAddPhrase, createUser] = [
    ADD_PHRASE, CREATE_USER
].map((type) => (payload) => ({ type, payload }));
