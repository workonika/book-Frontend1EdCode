import { configureStore, createSlice, combineSlices } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery, setupListeners } from '@reduxjs/toolkit/query';
import {createProductCard} from "./createProductCard";
 
export const products = createApi({
  reducerPath: 'products',
   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
    endpoints: (build) => ({
     getProducts: build.query({
      async queryFn(arg, queryApi, extraOptions, baseQuery){
          try {
            return await baseQuery(arg, queryApi);            
          } catch(error){
            return { error };
          }
       },
    }),
  }),
});
 
const counter = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: (create) => ({
        increment: create.reducer((state) => {
            return state += 1;
        }),
        decrement: create.reducer((state) => {
          if(state === 0) {
            return state;
          }
         return state -= 1;
     })
   })
});
 
const rootReducer = combineSlices(counter, products);
const {getProducts} = products.endpoints;

const store = configureStore({
    reducer: rootReducer,
    middleware: (buildGetDefaultMiddleware) => buildGetDefaultMiddleware().concat(products.middleware),
});

setupListeners(store.dispatch);

const {increment, decrement} = counter.actions;

const [incrB, decrB, requestB, counterC, productsC] = [
  'increment-button', 'decrement-button', 'products-button', 'counter', 'products-result'
].map(id => document.getElementById(id));
[[incrB, increment], [decrB, decrement]].forEach(([button, action]) => button.addEventListener('click', () => store.dispatch(action())));

requestB.addEventListener('click', () => {
  store.dispatch(getProducts.initiate('products'));
}, false);

console.log('products createApi', products);

store.subscribe(() => {
  const state = store.getState();
  const {counter, products} = state;
  counterC.value = counter;

  if ('getProducts("products")' in products.queries && 'data' in products.queries['getProducts("products")']){
    const productCardList = createProductCard(products.queries['getProducts("products")'].data);
    productsC.innerHTML = '';
    productCardList.forEach(productCard => productsC.appendChild(productCard));
  }

  console.log('state', store.getState());
  // const select = getProducts.select();
  // console.log(select);
  console.log("");
  console.log('products from state', products);
});
console.log("Test auto save without restart");
const state = store.getState();
counterC.value = state.counter;
