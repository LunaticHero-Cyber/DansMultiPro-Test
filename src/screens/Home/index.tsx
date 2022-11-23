import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';

import {StackParamList} from '@navigators/Root';
import {Header, Container, BoxSpace} from '../../components/Common';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../../constants';
import {SIZES} from 'constants/sizes';

type OrderRequestDetailScreenProp = StackNavigationProp<
  StackParamList,
  'AddProduct'
>;

type HomeStyleInterface = {
  addProductButton: ViewStyle;
  inputContainer: ViewStyle;
  input: ViewStyle;
  addProductButtonText: TextStyle;
};

const styles = StyleSheet.create<HomeStyleInterface>({
  addProductButton: {
    borderRadius: SIZES.extraSmall,
    padding: SIZES.medium,
    backgroundColor: COLORS.BLUE,
  },
  inputContainer: {
    paddingHorizontal: SIZES.small,
  },
  input: {
    borderRadius: SIZES.extraSmall,
    borderWidth: SIZES.outline,
    backgroundColor: COLORS.BLACK20,
    padding: SIZES.medium,
  },
  addProductButtonText: {
    color: COLORS.WHITE,
  },
});

const Home = ({navigation}: {navigation: OrderRequestDetailScreenProp}) => {
  const [searchInput, setSearchInput] = useState('');

  const onPressAddProductButton = () => {
    navigation.navigate('AddProduct');
  };

  const handleSearchInputChanged = (text: string) => {
    setSearchInput(text);
  };

  const AddProductButton = () => (
    <TouchableOpacity
      onPress={onPressAddProductButton}
      style={styles.addProductButton}>
      <Text style={styles.addProductButtonText}>Add Product</Text>
    </TouchableOpacity>
  );

  const RenderEmptyList = () => (
    <View style={{backgroundColor: 'red', flex: 1}} />
  );

  const RenderList = () => <View style={{backgroundColor: 'red', flex: 1}} />;

  const RenderMainContainer = () => (
    <View style={{backgroundColor: 'red', flex: 1}} />
  );

  return (
    <Container>
      <Header title="Home" RenderAccessoryRight={AddProductButton} />
      <BoxSpace.B />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search by product name"
          value={searchInput}
          onChangeText={handleSearchInputChanged}
          style={styles.input}
        />
      </View>
      <BoxSpace.B />
      <RenderMainContainer />
    </Container>
  );
};

export default Home;
