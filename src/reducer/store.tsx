import {configureStore} from '@reduxjs/toolkit';
import {productListReducer} from './reducers';

export const Store = configureStore({
  reducer: {productList: productListReducer.reducer},
});
