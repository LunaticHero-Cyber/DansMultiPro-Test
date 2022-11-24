/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import RootNavigator from './src/navigators/Root';
import {COLORS} from './src/constants';
import {Store} from './src/reducer/store';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: COLORS.BLACK20,
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Provider store={Store}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
