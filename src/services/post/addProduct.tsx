import axios from 'axios';

import {ProductInterface} from '@appTypes/product.type';
import {HOST_PRODUCT_URL} from 'constants/api';

export const addProduct = async (
  newProduct: Omit<ProductInterface, 'id'>,
): Promise<ProductInterface> => {
  try {
    const response = await axios.post<ProductInterface>(
      HOST_PRODUCT_URL,
      newProduct,
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
