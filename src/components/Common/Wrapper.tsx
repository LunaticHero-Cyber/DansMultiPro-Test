import React from 'react';
import {View, ViewProps} from 'react-native';

export const Wrapper = (props: ViewProps) => {
  const {children, style} = props;
  return <View style={[{flexDirection: 'row'}, style]}>{children}</View>;
};

export default Wrapper;
