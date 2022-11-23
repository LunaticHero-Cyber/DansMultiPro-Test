import React from 'react';
import {View} from 'react-native';

import {SIZES} from 'constants/sizes';

const BoxSpace = {
  A: () => <View style={{width: SIZES.small, height: SIZES.small}} />,
  B: () => <View style={{width: SIZES.medium, height: SIZES.medium}} />,
  C: () => <View style={{width: SIZES.large, height: SIZES.large}} />,
  D: () => <View style={{width: SIZES.container, height: SIZES.container}} />,
  E: () => <View style={{width: SIZES.box, height: SIZES.box}} />,
  F: () => <View style={{width: SIZES.box2, height: SIZES.box2}} />,
  G: () => <View style={{width: SIZES.header, height: SIZES.header}} />,
};

export default BoxSpace;
