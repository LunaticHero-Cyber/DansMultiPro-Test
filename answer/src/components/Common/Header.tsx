import React, {ReactNode} from 'react';
import {Text} from 'react-native';
import {Wrapper} from '@components/Common/Wrapper';
import {COLORS} from '@constants/COLORS';

type Props = {
  children?: ReactNode;
  title?: string;
  onPressLeft?: () => void;
  RenderAccessoryLeft?: () => JSX.Element;
  RenderAccessoryRight?: () => JSX.Element;
};

export const Header: React.FC<Props> = props => {
  const {title, RenderAccessoryLeft, RenderAccessoryRight, children} = props;

  return (
    <Wrapper style={{backgroundColor: COLORS.BLACK20}}>
      <view style={{flex: 1}}>
        {RenderAccessoryLeft ? <RenderAccessoryLeft /> : <></>}
      </view>
      <view style={{flex: 1}}>{children || <Text>{title}</Text>}</view>
      <view style={{flex: 1}}>
        {RenderAccessoryRight ? <RenderAccessoryRight /> : <></>}
      </view>
    </Wrapper>
  );
};
