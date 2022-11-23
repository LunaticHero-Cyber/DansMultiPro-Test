import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {ProductInterface} from '@appTypes/product.type';
import AddProduct from '../screens/AddProduct';
import Home from '../screens/Home';

export type StackParamList = {
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
      {/* <RootStack.Screen name="DetailProduct" component={AddProduct} /> */}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
