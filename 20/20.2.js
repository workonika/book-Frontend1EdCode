export const ADD_PHRASE = 'ADD_PHRASE';
export const CREATE_USER = 'CREATE_USER';

export const createAddPhrase = (phrase) => ({
    type: ADD_PHRASE,
    payload: phrase,
});

export const createUser = (user) => ({
    type: CREATE_USER,
    payload: user,
});