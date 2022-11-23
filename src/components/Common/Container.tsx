import React from 'react';
import {View, ViewProps} from 'react-native';

import {COLORS} from '../../constants';

const Container = (props: ViewProps) => {
  const {children} = props;
  return (
    <View style={{flex: 1, backgroundColor: COLORS.WHITE}}>{children}</View>
  );
};

export default Container;
