/*1*/ import { configureStore, createSlice, combineSlices } from '@reduxjs/toolkit';
/*2*/ import { createApi, fetchBaseQuery, setupListeners } from '@reduxjs/toolkit/query';
/*3*/ import {createProductCard} from "./createProductCard";
/*4*/ 
/*5*/ // Define a service using a base URL and expected endpoints
/*6*/ export const products = createApi({
/*7*/   reducerPath: 'products',
/*8*/   // baseQuery опустим для данного листинга, чтобы показать чисто работу queryFn
/*9*/   endpoints: (build) => ({
/*10*/     getProducts: build.query({
/*11*/       queryFn(arg, queryApi, extraOptions, baseQuery) {
/*12*/         return {
/*13*/            data: [{
/*14*/              uid: 3,
/*15*/              title: "Nisi lacus sed viverra",
/*16*/              description: "Aliquam faucibus purus in massa.",
/*17*/              price: 600,
/*18*/              params: {
/*19*/                  width: 400,
/*20*/                  length: 500,
/*21*/                  height: 600,
/*22*/                  weight: 3.1,
/*23*/                  color: "blue",
/*24*/                  available: ["red", "green", "blue"],
/*25*/              },
/*26*/              manufacturer: "diam maecenas",
/*27*/            },]
/*28*/          }
/*29*/        },
/*30*/     }),
/*31*/   }),
/*32*/ });
/*33*/ 
/*34*/ const counter = createSlice({
/*35*/     name: 'counter',
/*36*/     initialState: 0,
/*37*/     reducers: (create) => ({
/*38*/         increment: create.reducer((state) => {
/*39*/             return state += 1;
/*40*/         }),
/*41*/         decrement: create.reducer((state) => {
/*42*/           if(state === 0) {
/*43*/             return state;
/*44*/           }
/*45*/           return state -= 1;
/*46*/       })
/*47*/     })
/*48*/ });
/*49*/ 
/*50*/ const rootReducer = combineSlices(counter, products);
/*51*/ 
/*52*/ const {getProducts} = products.endpoints;
/*53*/ 
/*54*/ const store = configureStore({
/*55*/     reducer: rootReducer,
/*56*/     middleware: (buildGetDefaultMiddleware) => buildGetDefaultMiddleware().concat(products.middleware),
/*57*/ });
/*58*/ 
/*59*/ setupListeners(store.dispatch);
/*60*/ 
/*61*/ const {increment, decrement} = counter.actions;
/*62*/ 
/*63*/ const [incrB, decrB, requestB, counterC, productsC] = [
/*64*/   'increment-button', 'decrement-button', 'products-button', 'counter', 'products-result'
/*65*/ ].map(id => document.getElementById(id));
/*66*/ [[incrB, increment], [decrB, decrement]].forEach(([button, action]) => button.addEventListener('click', () => store.dispatch(action())));
/*67*/ 
/*68*/ requestB.addEventListener('click', () => {
/*69*/   store.dispatch(getProducts.initiate('products'));
/*70*/ }, false);
/*71*/ 
console.log('products createApi', products);
/*72*/ 
/*73*/ store.subscribe(() => {
/*74*/   const state = store.getState();
/*75*/   const {counter, products} = state;
/*76*/   counterC.value = counter;
/*77*/ 
/*78*/   if ('getProducts("products")' in products.queries && 'data' in products.queries['getProducts("products")']){
/*79*/     const productCardList = createProductCard(products.queries['getProducts("products")'].data);
/*80*/     productsC.innerHTML = '';
/*81*/     productCardList.forEach(productCard => productsC.appendChild(productCard));
/*82*/   }

  console.log('state', store.getState());
  // const select = getProducts.select();
  // console.log(select);
  console.log("");
  console.log('products from state', products);
/*83*/ });
console.log("Test auto save without restart");
/*84*/ const state = store.getState();
/*85*/ counterC.value = state.counter;


//  export const products = createApi({
//    reducerPath: 'products',
//    endpoints: (builder) => ({
//      getProducts: builder.query({
//        queryFn(arg, queryApi, extraOptions, baseQuery) {
//          return {
//             data: [{
//               // свойства и значения объекта
//             },]
//           }
//         },
//      }),
//    }),
//  });