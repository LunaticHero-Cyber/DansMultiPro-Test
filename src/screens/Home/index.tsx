import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';

import {StackParamList} from '@navigators/Root';
import {Header, Container} from '../../components/Common';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../../constants';

type OrderRequestDetailScreenProp = StackNavigationProp<
  StackParamList,
  'AddProduct'
>;

type HomeStyleInterface = {
  addProductButton: ViewStyle;
  addProductButtonText: TextStyle;
};

const styles = StyleSheet.create<HomeStyleInterface>({
  addProductButton: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: COLORS.BLUE,
  },
  addProductButtonText: {
    color: COLORS.WHITE,
  },
});

const Home = ({navigation}: {navigation: OrderRequestDetailScreenProp}) => {
  const onPressAddProductButton = () => {
    navigation.navigate('AddProduct');
  };

  const AddProductButton = () => (
    <TouchableOpacity
      onPress={onPressAddProductButton}
      style={styles.addProductButton}>
      <Text style={styles.addProductButtonText}>Add Product</Text>
    </TouchableOpacity>
  );

  return (
    <Container>
      <Header title="Home" RenderAccessoryRight={AddProductButton} />
    </Container>
  );
};

export default Home;
