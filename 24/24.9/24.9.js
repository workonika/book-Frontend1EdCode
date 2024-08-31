import { configureStore, createSlice, combineSlices, nanoid } from '@reduxjs/toolkit';

const rawText = createSlice({
  name: 'raw',
  initialState: [],
  reducers: (create) => ({
    addRawText: create.preparedReducer((text) => {
      return {
        payload: {
          id: nanoid(),
          text,
        }
      }
    }, (state, action) => {
      state.push(action.payload);
    }),
    /* deleteRawText */
  }),
});

const {addRawText} = rawText.actions;

const sanitizedText = createSlice({
  name: 'sanitized',
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(addRawText, (state, action) => {
      const {id, text} = action.payload;
      state.push({
        sanitizedId: nanoid(),
        rawId: id,
        text: text.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
      })
    })
    /* .addCase(deleteRawText, (state, action) => {...}) */
  },
});
console.log(sanitizedText);
const rootReducer = combineSlices(rawText, sanitizedText);

const store = configureStore({
  reducer: rootReducer,
});

const [rawTextDOM, button, unsanitizedList, sanitizedList] = [
  'raw-text', 'button', 'unsanitized-list', 'sanitized-list'].map((id) => document.getElementById(id));

button.addEventListener('click', () => {
  const {value} = rawTextDOM;
  store.dispatch(addRawText(value));
}, false);

store.subscribe(() => {
  const state = store.getState();
  const {raw, sanitized} = state;
  rawTextDOM.value = '';
  unsanitizedList.textContent = '';
  sanitizedList.textContent = '';

  unsanitizedList.appendChild(createListItem('Текст до обработки:'))
  raw.forEach(item => {
    const {text} = item;
    unsanitizedList.appendChild(createListItem(text));
  });

  sanitizedList.appendChild(createListItem('Текст после обработки:'))
  sanitized.forEach(item => {
    const {text} = item;
    sanitizedList.appendChild(createListItem(text));
  });
});

function createListItem(text){
  const div = document.createElement('div');
  div.textContent = text;

  return div;
}