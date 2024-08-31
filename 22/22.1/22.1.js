import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';

const LOADING = Symbol('Состояние загрузки');
const FETCH_SUCCESS = Symbol('Успешное получение ресурса с эндпоинта');
const FETCH_ERROR = Symbol('Произошла ошибка во время получения');

const initialState = {
    loading: false,
    data: [],
    error: null,
    count: 0,
};

// Экшен криэйтер обычный
export const createLoading = () => ({ type: LOADING });
// Экшен криэйтер для Redux Thunk
export const fetchData = (postId) => {

  return async (dispatch) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      const json = await response.json();
      
      dispatch({ type: FETCH_SUCCESS, payload: { data: json, count: postId } });
    } catch (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING: 
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
        count: action.payload.count,
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

const [
  output, loadingDiv, loadedCount, button,
] = ['#output', '#loading', '#loaded-count', 'button'].map(selector => document.querySelector(selector));

const selectors = ['count', 'loading', 'data', 'error'].map((stateName) => (state) => state[stateName]); 

const appendPost = (post, error) => {
  const container = document.createElement('div');
  console.log('error', error)
  if (error) {
    container.classList.add('error');
  }

  const { id, title, body } = post;
  
  container.setAttribute('id', id);
  container.classList.add('container');
  
  const titleDiv = document.createElement('div');
  titleDiv.textContent = title; 
  titleDiv.classList.add('title');

  const bodyDiv = document.createElement('div');
  bodyDiv.textContent = body; 
  bodyDiv.classList.add('body');

  container.appendChild(titleDiv);
  container.appendChild(bodyDiv);
  output.appendChild(container);
};

const callback = () => {
  const state = store.getState();
  const [count, loading, data, error] = selectors.map(selectorFn => selectorFn(state));

  if (loading){
    loadingDiv.style.display = 'flex';
  } else {
    appendPost(data, error);
    loadingDiv.style.display = 'none';
    loadedCount.textContent = count;
  }
};

loadingDiv.style.display = 'none';
store.subscribe(callback);

button.addEventListener('click', () => {
  const state = store.getState();
  const [selectCount] = selectors;
  const count = selectCount(state);
  store.dispatch(fetchData(count + 1));
  store.dispatch(createLoading());
}, false);
