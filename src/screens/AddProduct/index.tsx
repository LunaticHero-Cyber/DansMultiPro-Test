import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';

import {Header, Container, BoxSpace, Wrapper} from '../../components/Common';
import {StackParamList} from '@navigators/Root';
import {COLORS} from 'constants/colors';
import {SIZES} from 'constants/sizes';
import {addProduct} from 'services/post/addProduct';
import {getRandomInt} from 'utils/common';

type OrderRequestDetailScreenProp = StackNavigationProp<
  StackParamList,
  'AddProduct'
>;

type HomeStyleInterface = {
  button: ViewStyle;
  activeButton: ViewStyle;
  disabledButton: ViewStyle;
  mainContainer: ViewStyle;
  input: ViewStyle;
  largeInput: ViewStyle;
  backButtonText: TextStyle;
  headlineText: TextStyle;
};

const styles = StyleSheet.create<HomeStyleInterface>({
  button: {
    borderRadius: 8,
    padding: 12,
  },
  activeButton: {
    backgroundColor: COLORS.BLUE,
  },
  disabledButton: {
    backgroundColor: COLORS.BLACK60,
  },
  mainContainer: {
    flex: 1,
    padding: SIZES.medium,
  },
  input: {
    borderRadius: SIZES.extraSmall,
    borderWidth: SIZES.outline,
    backgroundColor: COLORS.BLACK10,
    padding: SIZES.medium,
  },
  largeInput: {
    borderRadius: SIZES.extraSmall,
    borderWidth: SIZES.outline,
    backgroundColor: COLORS.BLACK10,
    padding: SIZES.medium,
    height: SIZES.pinSpacing,
    textAlignVertical: 'top',
  },
  backButtonText: {
    color: COLORS.WHITE,
  },
  headlineText: {
    fontSize: SIZES.extraLarge,
    color: COLORS.BLACK100,
  },
});

const AddProduct = ({
  navigation,
}: {
  navigation: OrderRequestDetailScreenProp;
}) => {
  const [productName, setProductName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  const onPressAddProductButton = () => {
    navigation.goBack();
  };

  const BackButton = () => (
    <TouchableOpacity
      onPress={onPressAddProductButton}
      style={[styles.button, styles.activeButton]}>
      <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
  );

  const SubmitFormButton = () => (
    <TouchableOpacity
      onPress={onPressSubmitFormButton}
      style={[
        isAllFilled() ? styles.activeButton : styles.disabledButton,
        styles.button,
      ]}
      disabled={!isAllFilled()}>
      <Text style={styles.backButtonText}>Submit Form</Text>
    </TouchableOpacity>
  );

  const isAllFilled = () =>
    productName &&
    categoryName &&
    sku &&
    description &&
    weight &&
    width &&
    length &&
    height &&
    image &&
    price;

  const onPressSubmitFormButton = () => {
    //TODO: I think categoryId and id in general should be better handled in the BE in API Contract for now it will be "random"
    //In this case I will make categoryId as "random", however the id itself is "Omit" from the ProductInterface as it's body JSON
    const categoryId = getRandomInt(1000);
    const newProduct = {
      CategoryId: categoryId,
      categoryName: categoryName,
      sku: sku,
      name: productName,
      description: description,
      weight: parseInt(weight, 10),
      width: parseInt(width, 10),
      length: parseInt(length, 10),
      height: parseInt(height, 10),
      image: image,
      harga: parseInt(price, 10),
    };

    addProduct(newProduct);
  };

  return (
    <Container>
      <Header
        title="Add Product"
        RenderAccessoryLeft={BackButton}
        RenderAccessoryRight={SubmitFormButton}
      />
      <BoxSpace.C />
      <View style={styles.mainContainer}>
        <Text style={styles.headlineText}>
          Add new item by filling the form below
        </Text>
        <BoxSpace.B />
        <TextInput
          placeholder="Name"
          value={productName}
          onChangeText={setProductName}
          style={styles.input}
        />
        <BoxSpace.A />
        <TextInput
          placeholder="Category"
          value={categoryName}
          onChangeText={setCategoryName}
          style={styles.input}
        />
        <BoxSpace.A />
        <Wrapper>
          <TextInput
            placeholder="SKU"
            value={sku}
            onChangeText={setSku}
            style={[styles.input, {flex: 1}]}
          />
          <BoxSpace.A />
          <TextInput
            placeholder="Price"
            keyboardType="decimal-pad"
            value={price}
            onChangeText={setPrice}
            style={[styles.input, {flex: 1}]}
          />
        </Wrapper>
        <BoxSpace.A />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.largeInput}
          multiline={true}
        />
        <BoxSpace.B />
        <Text style={styles.headlineText}>Item size</Text>
        <BoxSpace.A />
        <Wrapper>
          <TextInput
            placeholder="Weight"
            keyboardType="decimal-pad"
            value={weight}
            onChangeText={setWeight}
            style={[styles.input, {flex: 1}]}
          />
          <BoxSpace.A />
          <TextInput
            placeholder="Width"
            keyboardType="decimal-pad"
            value={width}
            onChangeText={setWidth}
            style={[styles.input, {flex: 1}]}
          />
        </Wrapper>
        <BoxSpace.A />
        <Wrapper>
          <TextInput
            placeholder="Length"
            keyboardType="decimal-pad"
            value={length}
            onChangeText={setLength}
            style={[styles.input, {flex: 1}]}
          />
          <BoxSpace.A />
          <TextInput
            placeholder="Height"
            keyboardType="decimal-pad"
            value={height}
            onChangeText={setHeight}
            style={[styles.input, {flex: 1}]}
          />
        </Wrapper>
        <BoxSpace.C />
        <TextInput
          placeholder="Image link"
          value={image}
          onChangeText={setImage}
          style={styles.input}
        />
      </View>
    </Container>
  );
};

export default AddProduct;
