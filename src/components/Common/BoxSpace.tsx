import React from 'react';
import {View, ViewProps} from 'react-native';

import {COLORS} from '../../constants';

const TheBoxSpace = ({color, size = 'padding', ...rest}: BoxSpaceProps) => {
  return (
    <View
      // backgroundColor={__DEV__ ? color : undefined}
      width={SIZES[size]}
      height={SIZES[size]}
      {...rest}
    />
  );
};

const BoxSpace = {
  A: (props: BoxSpaceProps) => <TheBoxSpace color="PINK" {...props} />,
  B: (props: BoxSpaceProps) => (
    <TheBoxSpace color="TURQOISE" size="content" {...props} />
  ),
  C: (props: BoxSpaceProps) => (
    <TheBoxSpace color="YELLOW" size="contentLarge" {...props} />
  ),
  D: (props: BoxSpaceProps) => (
    <TheBoxSpace color="PINK75" size="container" {...props} />
  ),
  E: (props: BoxSpaceProps) => (
    <TheBoxSpace color="TURQOISE75" size="box" {...props} />
  ),
  F: (props: BoxSpaceProps) => (
    <TheBoxSpace color="YELLOW75" size="header" {...props} />
  ),
  G: (props: BoxSpaceProps) => (
    <TheBoxSpace color="BLACK100" size="pinSpacing" {...props} />
  ),
};

export default BoxSpace;
