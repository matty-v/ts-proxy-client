const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
  return {
    target: 'web',

    mode: 'development',

    entry: {
      index: './src/index.tsx',
    },

    devtool: 'inline-source-map',

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },

    output: { path: path.resolve(__dirname, 'dist') },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules|__test__/,
          use: ['ts-loader'],
        },
        {
          test: /\.(css|scss)$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
          use: ['file-loader'],
        },
      ],
    },

    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'assets', to: 'assets' }],
      }),
      new webpack.EnvironmentPlugin([
        'PROXY_SERVER_URL', 'GOOGLE_CLIENT_ID', 'NOTION_API_KEY', 'TEST_NOTION_DB_ID'
      ]),
      new webpack.ProvidePlugin({
        Buffer: [require.resolve('buffer/'), 'Buffer'],
      }),
    ],
  };
};
