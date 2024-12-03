module.exports = {
  presets: ['module:@react-native/babel-preset', '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@theme': './src/theme',
          '@test-utils': './test-utils',
        },
      },
      'react-native-reanimated/plugin',
    ],
  ],
};