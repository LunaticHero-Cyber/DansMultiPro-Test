import React from 'react';
import {ViewProps} from 'react-native';

import {COLORS} from '@constants';

const Container = (props: ViewProps) => {
  const {children} = props;
  return (
    <view style={{flex: 1, backgroundColor: COLORS.WHITE}}>{children}</view>
  );
};

export default Container;
