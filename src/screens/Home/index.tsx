import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {ProductInterface} from '@appTypes/product.type';
import {StackParamList} from '@navigators/Root';
import {Header, Container, BoxSpace} from 'components/Common';
import {ProductCard} from 'components/Card';
import {COLORS, SIZES} from 'constants';
import {fetchProductList} from 'services/get/fetchProductList';
import {addProduct} from 'services/post/addProduct';

type OrderRequestDetailScreenProp = StackNavigationProp<
  StackParamList,
  'AddProduct'
>;

type HomeStyleInterface = {
  addProductButton: ViewStyle;
  inputContainer: ViewStyle;
  contentScrollContainer: ViewStyle;
  scrollContainer: ViewStyle;
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
  contentScrollContainer: {
    padding: SIZES.small,
  },
  scrollContainer: {
    flex: 1,
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
  const [responseProductList, setResponseProductList] = useState<
    Array<ProductInterface>
  >([]);
  const [productList, setProductList] = useState<Array<ProductInterface>>([]);

  const onPressAddProductButton = () => {
    addProduct({
      CategoryId: 14,
      categoryName: 'Cemilan4',
      sku: 'MHZVTK',
      name: 'Lays',
      description: 'Ciki ciki yang super enak, hanya di toko klontong kami',
      weight: 500,
      width: 5,
      length: 5,
      height: 5,
      image: 'https://cf.shopee.co.id/file/7cb930d1bd183a435f4fb3e5cc4a896b',
      harga: 30000,
    });
    // navigation.navigate('AddProduct');
  };

  const handleSearchInputChanged = (text: string) => {
    setSearchInput(text);
  };

  const initializeScreen = async () => {
    const products = await fetchProductList();
    setResponseProductList(products);
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

  const RenderList = () => (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentScrollContainer}>
      {productList?.map(product => (
        <>
          <ProductCard key={product.id} product={product} />
          <BoxSpace.B />
        </>
      ))}
    </ScrollView>
  );

  const RenderMainContainer = () => (
    <View style={{flex: 1}}>
      {isProductEmpty() ? <RenderEmptyList /> : <RenderList />}
    </View>
  );

  useEffect(() => {
    if (searchInput) {
      const filteredProductList = responseProductList.filter(product =>
        product.name.toLowerCase().includes(searchInput.toLowerCase()),
      );
      setProductList(filteredProductList);
    } else {
      setProductList(responseProductList);
    }
  }, [responseProductList, searchInput]);

  useEffect(() => {
    initializeScreen();
  }, []);

  return (
    <Container>
      <Header title="Home" RenderAccessoryRight={AddProductButton} />
      <BoxSpace.B />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search by product name"
          value={searchInput}
          onChangeText={handleSearchInputChanged}
          editable={!isProductEmpty()}
          style={styles.input}
        />
      </View>
      <BoxSpace.B />
      <RenderMainContainer />
    </Container>
  );
};

export default Home;
