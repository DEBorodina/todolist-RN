module.exports = {
  presets: ['module:@react-native/babel-preset', '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.png'],
        alias: {
          '@components': './src/components',
          '@theme': './src/theme',
          '@test-utils': './test-utils',
          '@common-types': './src/common-types',
          '@hooks': './src/hooks',
          'assets/*': './assets/*',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
