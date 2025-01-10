const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const appDirectory = path.resolve(__dirname);

// Babel loader configuration
const babelLoaderConfiguration = {
  test: /\.(js|jsx|ts|tsx)$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
    path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
  ],

  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: ['@react-native/babel-preset'],
      // Re-write paths to import only the modules needed by the app
      plugins: [
        'react-native-web',
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        '@babel/plugin-proposal-export-namespace-from',
        'react-native-reanimated/plugin',
      ],
    },
  },
};

// Image loader configuration
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};

const ttfLoaderConfiguration = {
  test: /\.ttf$/,
  loader: 'url-loader', // or directly file-loader
  include: [
    path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
  ],
};

// File loader configuration
const fileLoaderConfiguration = {
  test: /\.(woff(2)?|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'fonts/',
      },
    },
  ],
};

module.exports = argv => {
  return {
    entry: path.resolve(appDirectory, 'index.web.js'),
    output: {
      clean: true,
      path: appDirectory + '/build',
      filename: 'static/js/[name].js',
      chunkFilename: 'static/js/[name].chunk.js',
    },
    resolve: {
      extensions: [
        '.web.js',
        '.js',
        '.web.ts',
        '.ts',
        '.web.jsx',
        '.jsx',
        '.web.tsx',
        '.tsx',
      ],
      alias: {
        'react-native$': 'react-native-web',
      },
    },
    module: {
      rules: [
        ttfLoaderConfiguration,
        babelLoaderConfiguration,
        imageLoaderConfiguration,
        fileLoaderConfiguration,
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(woff|woff2|eot|otf|css)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      // Fast refresh plugin
      new ReactRefreshWebpackPlugin(),

      // Plugin that takes public/index.html and injects script tags with the built bundles
      new HtmlWebpackPlugin({
        template: path.resolve(appDirectory, './index.html'),
      }),

      // Defines __DEV__ and process.env as not being null
      new webpack.DefinePlugin({
        __DEV__: argv.mode !== 'production' || true,
        process: { env: {} },
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, './dist'),
      },
      compress: true,
      historyApiFallback: true,
      open: true,
      hot: true,
      port: 9002,
      devMiddleware: {
        writeToDisk: true,
      },
    },
    optimization: {
      // Split into vendor and main js files
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
          },
        },
      },
    },
  };
};
