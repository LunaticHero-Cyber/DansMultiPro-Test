import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Button,
  Image,
  ImageStyle,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {ProductInterface} from '@appTypes/product.type';
import {StackParamList} from '@navigators/Root';
import {Header, Container, BoxSpace, Wrapper} from 'components/Common';
import {ProductCard} from 'components/Card';
import {COLORS, SIZES} from 'constants';
import {fetchProductList} from 'services/get/fetchProductList';

type ProductDetailProp = StackNavigationProp<StackParamList, 'ProductDetail'>;
type ProductDetailRoute = RouteProp<StackParamList, 'ProductDetail'>;

type ProductDetailStyleInterface = {
  button: ViewStyle;
  mainContainer: ViewStyle;
  keyText: TextStyle;
  keyValueText: TextStyle;
  backButtonText: TextStyle;
  productImage: ImageStyle;
};

const styles = StyleSheet.create<ProductDetailStyleInterface>({
  button: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: COLORS.BLUE,
  },
  mainContainer: {
    padding: SIZES.medium,
  },
  keyText: {
    fontSize: SIZES.large,
    color: COLORS.BLACK40,
  },
  keyValueText: {
    fontSize: SIZES.extraLarge,
    color: COLORS.BLACK100,
  },
  backButtonText: {
    color: COLORS.WHITE,
  },
  productImage: {
    width: '30%',
    height: '30%',
  },
});

const ProductDetail = ({
  navigation,
  route,
}: {
  navigation: ProductDetailProp;
  route: ProductDetailRoute;
}) => {
  const {
    categoryName,
    sku,
    name,
    description,
    weight,
    width,
    length,
    height,
    image,
    harga,
  } = route?.params.product;

  const onBackButton = () => {
    navigation.goBack();
  };

  const BackButton = () => (
    <TouchableOpacity onPress={onBackButton} style={styles.button}>
      <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
  );

  return (
    <Container>
      <Header title="Product Detail" RenderAccessoryLeft={BackButton} />
      <View style={styles.mainContainer}>
        <Image
          style={styles.productImage}
          source={{
            uri: image,
          }}
        />
        <BoxSpace.C />
        <Text style={styles.keyText}>Product Name / SKU</Text>
        <Text style={styles.keyValueText}>{`${name} / ${sku}`}</Text>
        <BoxSpace.B />
        <Text style={styles.keyText}>Category Name</Text>
        <Text style={styles.keyValueText}>{categoryName}</Text>
        <BoxSpace.B />
        <Text style={styles.keyText}>Price</Text>
        <Text style={styles.keyValueText}>{harga}</Text>
        <BoxSpace.B />
        <Text style={styles.keyText}>Item size</Text>
        <Wrapper style={{width: '40%'}}>
          <Text
            style={[
              styles.keyValueText,
              {width: '50%'},
            ]}>{`Weight: ${weight}`}</Text>
          <BoxSpace.B />
          <Text style={styles.keyValueText}>{`Height: ${height}`}</Text>
        </Wrapper>
        <Wrapper style={{width: '40%'}}>
          <Text
            style={[
              styles.keyValueText,
              {width: '50%'},
            ]}>{`Width: ${width}`}</Text>
          <BoxSpace.B />
          <Text style={styles.keyValueText}>{`Length: ${length}`}</Text>
        </Wrapper>
        <BoxSpace.B />
        <Text style={styles.keyText}>Description</Text>
        <Text style={styles.keyValueText}>{description}</Text>
        <BoxSpace.B />
      </View>
    </Container>
  );
};

export default ProductDetail;
