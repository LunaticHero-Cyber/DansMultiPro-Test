import axios from 'axios';

import {ProductInterface} from '@appTypes/product.type';
import {HOST_PRODUCT_URL} from 'constants/api';

export const fetchProductList = async (): Promise<Array<ProductInterface>> => {
  try {
    const response = await axios.get<Array<ProductInterface>>(HOST_PRODUCT_URL);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
