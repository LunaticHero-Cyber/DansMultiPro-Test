import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Header} from '@components/Common/Header';
import {Container} from '@components/Common';
import {StackParamList} from '@navigators/Root';

type OrderRequestDetailScreenProp = StackNavigationProp<
  StackParamList,
  'AddProduct'
>;

const AddProduct = () => {
  const navigation = useNavigation<OrderRequestDetailScreenProp>();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <Header title="Home" onPressLeft={goBack} />
    </Container>
  );
};

export default AddProduct;
