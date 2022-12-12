import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {JobInterface} from '@appTypes/job.type';
import Home from '../screens/Home';
import JobDetail from '../screens/JobDetail';

export type StackParamList = {
  Home: undefined;
  JobDetail: {
    job: JobInterface;
  };
};

const RootStack = createStackNavigator<StackParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        options={{headerShown: false}}
        component={Home}
      />
      <RootStack.Screen
        name="JobDetail"
        options={{headerShown: false}}
        component={JobDetail}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
