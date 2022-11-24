import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {ProductInterface} from '@appTypes/product.type';
import AddProduct from '../screens/AddProduct';
import Home from '../screens/Home';
import ProductDetail from '../screens/ProductDetail';

export type StackParamList = {
  Home: undefined;
  AddProduct: undefined;
  ProductDetail: {
    product: ProductInterface;
  };
};

const RootStack = createStackNavigator<StackParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        options={{headerShown: false}}
        component={Home}
      />
      <RootStack.Screen
        name="AddProduct"
        options={{headerShown: false}}
        component={AddProduct}
      />
      <RootStack.Screen
        name="ProductDetail"
        options={{headerShown: false}}
        component={ProductDetail}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
