import {ProductInterface} from '@appTypes/product.type';
import {createSlice} from '@reduxjs/toolkit';

const initialState: Array<ProductInterface> = [];

export const productListReducer = createSlice({
  name: 'productList',
  initialState: initialState,
  reducers: {
    addProductList: (state, action) => {
      return [...state, ...action.payload];
    },
    emptyProductList: state => {
      return [];
    },
  },
});

export const {addProductList, emptyProductList} = productListReducer.actions;
