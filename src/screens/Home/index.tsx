import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {ProductInterface} from '@appTypes/product.type';
import {StackParamList} from '@navigators/Root';
import {Header, Container, BoxSpace, Wrapper} from 'components/Common';
import {ProductCard} from 'components/Card';
import {COLORS, SIZES} from 'constants';
import {fetchProductList} from 'services/get/fetchProductList';

type OrderRequestDetailScreenProp = StackNavigationProp<
  StackParamList,
  'AddProduct'
>;

type HomeStyleInterface = {
  addProductButton: ViewStyle;
  inputContainer: ViewStyle;
  pageHandlerContainer: ViewStyle;
  emptyContainer: ViewStyle;
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
  pageHandlerContainer: {
    paddingHorizontal: SIZES.small,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorResponse, setErrorResponse] = useState<any>();

  const [responseProductList, setResponseProductList] = useState<
    Array<ProductInterface>
  >([]);
  const [filteredProductList, setFilteredProductList] = useState<
    Array<ProductInterface>
  >([]);
  const [renderedProductList, setRenderedProductList] = useState<
    Array<ProductInterface>
  >([]);

  const totalNumberOfProducts = responseProductList?.length;
  const numberOfProductLimit = 10;
  const productListHasRemainder = totalNumberOfProducts % numberOfProductLimit;

  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const onPressAddProductButton = () => {
    navigation.navigate('AddProduct');
  };

  const onPressErrorRetryButton = () => {
    setIsError(false);
    setIsLoading(true);
    handleFetchingProductList();
  };

  const goToNextPage = () => {
    if (currentPage + 1 > totalPage) {
      return;
    }

    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage - 1 < 1) {
      return;
    }

    setCurrentPage(currentPage - 1);
  };

  const handleSearchInputChanged = (text: string) => {
    setSearchInput(text);
  };

  const handlePageTotal = (numberOfProducts: number) => {
    setTotalPage(
      Math.floor(numberOfProducts / numberOfProductLimit) +
        (productListHasRemainder ? 1 : 0),
    );
  };

  const handlePageProducts = (page: number) => {
    const firstIndexOfThePage = numberOfProductLimit * (page - 1);
    const lastIndexOfThePage =
      currentPage !== totalPage
        ? numberOfProductLimit * page
        : filteredProductList?.length;
    const shownProduct = filteredProductList.slice(
      firstIndexOfThePage,
      lastIndexOfThePage,
    );
    setRenderedProductList(shownProduct);
  };

  const handleFetchingProductList = async () => {
    try {
      const products = await fetchProductList();
      setResponseProductList(products);
    } catch (error) {
      setIsError(true);
      setErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isProductEmpty = () => {
    return !filteredProductList?.length;
  };

  const isProductPageMoreThanOne = useCallback(() => {
    return totalPage > 1;
  }, [totalPage]);

  const AddProductButton = () => (
    <TouchableOpacity
      onPress={onPressAddProductButton}
      style={styles.addProductButton}>
      <Text style={styles.addProductButtonText}>Add Product</Text>
    </TouchableOpacity>
  );

  const RenderPageHandler = () =>
    !isProductEmpty() && isProductPageMoreThanOne() ? (
      <Wrapper style={styles.pageHandlerContainer}>
        <Button title="<" onPress={goToPreviousPage} />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>{`${currentPage}/${totalPage}`}</Text>
        </View>
        <Button title=">" onPress={goToNextPage} />
      </Wrapper>
    ) : (
      <></>
    );

  const RenderErrorMessage = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyHeadlineText}>Error loading the data</Text>
      <Text style={styles.emptyTaglineText}>{errorResponse?.message}</Text>
      <BoxSpace.A />
      <Button title="Retry" onPress={onPressErrorRetryButton} />
    </View>
  );

  const RenderLoadingScreen = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyHeadlineText}>Loading data...</Text>
      <Text style={styles.emptyTaglineText}>Please wait for a moment</Text>
    </View>
  );

  const RenderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyHeadlineText}>The list is currently empty</Text>
      <Text style={styles.emptyTaglineText}>Please ADD new product</Text>
    </View>
  );

  const RenderList = () =>
    useMemo(() => {
      return (
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentScrollContainer}>
          {renderedProductList?.map(product => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductDetail', {product})}>
              <ProductCard key={product.name} product={product} />
              <BoxSpace.B />
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    }, [JSON.stringify(renderedProductList)]);

  const HandleRenderLoading = () => (
    <View style={{flex: 1}}>
      {isLoading ? <RenderLoadingScreen /> : <HandleRenderError />}
    </View>
  );

  const HandleRenderError = () => (
    <View style={{flex: 1}}>
      {!isError ? <RenderMainContainer /> : <RenderErrorMessage />}
    </View>
  );

  const RenderMainContainer = () => (
    <View style={{flex: 1}}>
      {isProductEmpty() ? <RenderEmptyList /> : <RenderList />}
    </View>
  );

  useEffect(() => {
    if (searchInput) {
      const filteredProducts = responseProductList.filter(product =>
        product.name.toLowerCase().includes(searchInput.toLowerCase()),
      );
      setCurrentPage(1);
      setFilteredProductList(filteredProducts);
    } else {
      setFilteredProductList(responseProductList);
    }
  }, [responseProductList, searchInput]);

  useEffect(() => {
    handlePageProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (filteredProductList?.length > 0) {
      handlePageTotal(filteredProductList?.length);
      handlePageProducts(currentPage);
    }
  }, [JSON.stringify(filteredProductList)]);

  useFocusEffect(
    useCallback(() => {
      handleFetchingProductList();
    }, []),
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
          editable={!isProductEmpty()}
          style={styles.input}
        />
      </View>
      <BoxSpace.B />
      <RenderPageHandler />
      <BoxSpace.B />
      <HandleRenderLoading />
    </Container>
  );
};

export default Home;
