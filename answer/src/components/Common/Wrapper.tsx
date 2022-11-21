import React from 'react';
import {ViewProps} from 'react-native';

export const Wrapper = (props: ViewProps) => {
  const {children} = props;
  return <view style={{flex: 1, flexDirection: 'column'}}>{children}</view>;
};
