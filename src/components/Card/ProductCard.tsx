import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';

import {ProductInterface} from 'appTypes/product.type';
import {SIZES} from 'constants/sizes';
import {COLORS} from 'constants';
import {BoxSpace, Wrapper} from 'components/Common';

type ProductCardStyleInterface = {
  card: ViewStyle;
  nameText: TextStyle;
  categoryNameText: TextStyle;
  descriptionText: TextStyle;
  priceText: TextStyle;
};

const styles = StyleSheet.create<ProductCardStyleInterface>({
  card: {
    padding: SIZES.medium,
    backgroundColor: COLORS.BLACK20,
    borderRadius: SIZES.extraSmall,
  },
  nameText: {
    fontSize: SIZES.extraLarge,
  },
  descriptionText: {
    fontSize: SIZES.large,
  },
  categoryNameText: {
    fontSize: SIZES.large,
    color: COLORS.BLACK50,
  },
  priceText: {
    fontSize: SIZES.large,
    color: COLORS.BLACK50,
  },
});

const ProductCard = ({product}: {product: ProductInterface}) => {
  const {name, categoryName, description, harga} = product;
  return (
    <Wrapper style={styles.card}>
      <View style={{flex: 1}}>
        <Text style={styles.nameText}>{name}</Text>
        <BoxSpace.A />
        <Text style={styles.descriptionText}>{description}</Text>
        <BoxSpace.A />
        <Text style={styles.categoryNameText}>{categoryName}</Text>
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.priceText}>{`Rp. ${harga}`}</Text>
      </View>
    </Wrapper>
  );
};

export default ProductCard;