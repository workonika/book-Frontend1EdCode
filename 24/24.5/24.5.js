import { configureStore, createSlice, combineSlices, nanoid } from '@reduxjs/toolkit';

const events = createSlice({
  name: 'events',
  initialState: {
    current: null,
    happendEventList: [],
  },
  reducers: (create) => ({
    addEvent: create.reducer((state, action) => {
      const {payload} = action;
      if (payload !== state.current) {
        state.current = payload;
        state.happendEventList.push(payload);
      }
    }),
  }),
});

const notes = createSlice({
  name: 'notes',
  initialState: [],
  reducers: (create) => ({
    addNote: create.preparedReducer((text) => {
      return {
        payload: {
          id: nanoid(),
          text,
        }
      }
    }, (state, action) => {
      state.push(action.payload);
    }),
    deleteNote: create.reducer((state, action) => {
      const index = state.findIndex(item => item.id === action.payload);
      const isNotInArray = -1;
      if (index !== isNotInArray){
        state.splice(index, 1);
      }
    }),
  })
});

const [notesList, noteForm, noteButton, eventsList] = ['notes-list', 'note-form', 'note-button', 'events-list'].map((id) => document.getElementById(id));

const rootReducer = combineSlices(events, notes);

const store = configureStore({
  reducer: rootReducer,
});

const { addEvent } = events.actions;
const { addNote, deleteNote } = notes.actions;

['mousemove', 'dblclick', 'scroll', 'click'].forEach((eventName) => document.addEventListener(eventName, () => store.dispatch(addEvent(eventName))));

noteButton.addEventListener('click', () => {
  const value = noteForm.value;
  noteForm.value = '';
  store.dispatch(addNote(value));
})

store.subscribe(() => {
  const state = store.getState();
  notesList.textContent = '';
  state.notes.forEach((note) => {
    const noteDOM = createNote(note);
    notesList.appendChild(noteDOM);
  });
});

store.subscribe(() => {
  const state = store.getState();
  eventsList.textContent = '';
  state.events.happendEventList.forEach((event) => {
    const eventNode = createEvent(event);
    eventsList.appendChild(eventNode);
  });
});

function createNote(note){
  const {id, text} = note;
  const [textNote, textButton] = [text, 'Удалить'].map((text) => document.createTextNode(text));
  const [div, button] = ['div', 'button'].map((tagName) => document.createElement(tagName));

  button.appendChild(textButton);
  button.addEventListener('click', () => store.dispatch(deleteNote(id)));
  div.appendChild(textNote);
  div.appendChild(button);

  return div;
}

function createEvent(text){
  const textNode = document.createTextNode(text);
  const div = document.createElement('div');

  div.appendChild(textNode);

  return div;
}