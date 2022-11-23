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
import {ProductInterface} from '@appTypes/product.type';

type OrderRequestDetailScreenProp = StackNavigationProp<
  StackParamList,
  'AddProduct'
>;

type HomeStyleInterface = {
  addProductButton: ViewStyle;
  inputContainer: ViewStyle;
  input: ViewStyle;
  addProductButtonText: TextStyle;
  emptyHeadlineText: TextStyle;
  emptyTaglineText: TextStyle;
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
    backgroundColor: COLORS.BLACK10,
    padding: SIZES.medium,
  },
  addProductButtonText: {
    color: COLORS.WHITE,
  },
  emptyHeadlineText: {
    fontSize: SIZES.extraLarge,
    color: COLORS.BLACK100,
  },
  emptyTaglineText: {
    fontSize: SIZES.large,
    color: COLORS.BLACK40,
  },
});

const Home = ({navigation}: {navigation: OrderRequestDetailScreenProp}) => {
  const [searchInput, setSearchInput] = useState('');

  const productList: Array<ProductInterface> = [];

  const onPressAddProductButton = () => {
    navigation.navigate('AddProduct');
  };

  const handleSearchInputChanged = (text: string) => {
    setSearchInput(text);
  };

  const isProductEmpty = () => {
    return !productList?.length;
  };

  const AddProductButton = () => (
    <TouchableOpacity
      onPress={onPressAddProductButton}
      style={styles.addProductButton}>
      <Text style={styles.addProductButtonText}>Add Product</Text>
    </TouchableOpacity>
  );

  const RenderEmptyList = () => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={styles.emptyHeadlineText}>The list is currently empty</Text>
      <Text style={styles.emptyTaglineText}>Please ADD new product</Text>
    </View>
  );

  const RenderList = () => <View style={{backgroundColor: 'red', flex: 1}} />;

  const RenderMainContainer = () => (
    <View style={{flex: 1}}>
      {isProductEmpty() ? <RenderEmptyList /> : <RenderList />}
    </View>
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
          editable={isProductEmpty()}
          style={styles.input}
        />
      </View>
      <BoxSpace.B />
      <RenderMainContainer />
    </Container>
  );
};

export default Home;
