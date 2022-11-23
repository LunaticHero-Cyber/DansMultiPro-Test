import React from 'react';

import {StackNavigationProp} from '@react-navigation/stack';

import {Header, Container, BoxSpace} from '../../components/Common';
import {StackParamList} from '@navigators/Root';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS} from 'constants/colors';

type OrderRequestDetailScreenProp = StackNavigationProp<
  StackParamList,
  'AddProduct'
>;

type HomeStyleInterface = {
  backButton: ViewStyle;
  backButtonText: TextStyle;
};

const styles = StyleSheet.create<HomeStyleInterface>({
  backButton: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: COLORS.BLUE,
  },
  backButtonText: {
    color: COLORS.WHITE,
  },
});

const AddProduct = ({
  navigation,
}: {
  navigation: OrderRequestDetailScreenProp;
}) => {
  const onPressAddProductButton = () => {
    navigation.goBack();
  };

  const BackButton = () => (
    <TouchableOpacity
      onPress={onPressAddProductButton}
      style={styles.backButton}>
      <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
  );

  return (
    <Container>
      <Header title="Add Product" RenderAccessoryLeft={BackButton} />
      <View style={{backgroundColor: 'red', flex: 1}} />
    </Container>
  );
};

export default AddProduct;
