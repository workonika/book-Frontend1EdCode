/*1*/ import { configureStore, createSlice, combineSlices } from '@reduxjs/toolkit';
/*2*/ import { createApi, fetchBaseQuery, setupListeners } from '@reduxjs/toolkit/query';
/*3*/ import {createProductCard} from "./createProductCard";
/*4*/ 
/*5*/ // Define a service using a base URL and expected endpoints
/*6*/ export const products = createApi({
/*7*/   reducerPath: 'products',
/*8*/   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
/*9*/   endpoints: (build) => ({
/*10*/     getProducts: build.query({
/*11*/       query: (name) => `${name}`,
/*12*/     }),
/*13*/   }),
/*14*/ });
/*15*/ 
/*16*/ const counter = createSlice({
/*17*/     name: 'counter',
/*18*/     initialState: 0,
/*19*/     reducers: (create) => ({
/*20*/         increment: create.reducer((state) => {
/*21*/             return state += 1;
/*22*/         }),
/*23*/         decrement: create.reducer((state) => {
/*24*/           if(state === 0) {
/*25*/             return state;
/*26*/           }
/*27*/           return state -= 1;
/*28*/       })
/*29*/     })
/*30*/ });
/*31*/ 
/*32*/ const rootReducer = combineSlices(counter, products);
/*33*/ 
/*34*/ const {getProducts} = products.endpoints;
/*35*/ 
/*36*/ const store = configureStore({
/*37*/     reducer: rootReducer,
/*38*/     middleware: (buildGetDefaultMiddleware) => buildGetDefaultMiddleware().concat(products.middleware),
/*39*/ });
/*40*/ 
/*41*/ setupListeners(store.dispatch);
/*42*/ 
/*43*/ const {increment, decrement} = counter.actions;
/*44*/ 
/*45*/ const [incrB, decrB, requestB, counterC, productsC] = [
/*46*/   'increment-button', 'decrement-button', 'products-button', 'counter', 'products-result'
/*47*/ ].map(id => document.getElementById(id));
/*48*/ [[incrB, increment], [decrB, decrement]].forEach(([button, action]) => button.addEventListener('click', () => store.dispatch(action())));
/*49*/ 
/*50*/ requestB.addEventListener('click', () => {
/*51*/   store.dispatch(getProducts.initiate('products'));
/*52*/ }, false);
/*53*/ 
console.log('products createApi', products);
/*54*/ 
/*55*/ store.subscribe(() => {
/*56*/   const state = store.getState();
/*57*/   const {counter, products} = state;
/*58*/   counterC.value = counter;
/*59*/ 
/*60*/   if ('getProducts("products")' in products.queries && 'data' in products.queries['getProducts("products")']){
/*61*/     const productCardList = createProductCard(products.queries['getProducts("products")'].data);
/*62*/     productsC.innerHTML = '';
/*63*/     productCardList.forEach(productCard => productsC.appendChild(productCard));
/*64*/   }

  console.log('state', store.getState());
  // const select = getProducts.select();
  // console.log(select);
  console.log("");
  console.log('products from state', products);
/*65*/ });
console.log("Test auto save without restart");
/*66*/ const state = store.getState();
/*67*/ counterC.value = state.counter;