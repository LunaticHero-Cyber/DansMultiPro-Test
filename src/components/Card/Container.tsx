import {ProductInterface} from 'appTypes/product.type';
import React from 'react';
import {Text, View} from 'react-native';

import {COLORS} from '../../constants';

const ProductCard = ({product}: {product: ProductInterface}) => {
  const {name, categoryName} = product;
  return (
    <View style={{flex: 1, backgroundColor: COLORS.WHITE}}>
      <Text>{name}</Text>
      <Text>{categoryName}</Text>
    </View>
  );
};

export default ProductCard;
