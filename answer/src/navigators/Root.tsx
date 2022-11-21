import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {ProductInterface} from '@appTypes/product.type';

type StackParamList = {
  Home: undefined;
  AddProduct: undefined;
  DetailProduct: {
    product: ProductInterface;
  };
};

const RootStack = createStackNavigator<StackParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Home" component={} />
      <RootStack.Screen name="AddProduct" component={} />
      <RootStack.Screen name="DetailProduct" component={} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
