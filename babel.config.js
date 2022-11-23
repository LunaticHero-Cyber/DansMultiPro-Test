module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        root: ['./src'],
        alias: {
          '@appTypes': './appTypes',
          '@components': './components',
          '@constants': './constants',
          '@navigators': './navigators',
          '@screens': './screens',
        },
      },
    ],
    'jest-hoist',
  ],
};
