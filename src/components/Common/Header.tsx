import React, {ReactNode} from 'react';
import {Text, View} from 'react-native';

import {Wrapper} from '../../components/Common';
import {COLORS} from '../../constants';

type Props = {
  children?: ReactNode;
  title?: string;
  RenderAccessoryLeft?: () => JSX.Element;
  RenderAccessoryRight?: () => JSX.Element;
};

export const Header: React.FC<Props> = props => {
  const {title, RenderAccessoryLeft, RenderAccessoryRight, children} = props;

  return (
    <Wrapper
      style={{
        backgroundColor: COLORS.BLACK20,
        padding: 12,
      }}>
      <View
        style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
        {RenderAccessoryLeft && <RenderAccessoryLeft />}
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {children || <Text>{title}</Text>}
      </View>
      <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
        {RenderAccessoryRight && <RenderAccessoryRight />}
      </View>
    </Wrapper>
  );
};

export default Header;
