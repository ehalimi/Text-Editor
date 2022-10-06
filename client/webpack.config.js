const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor',
      }),
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'T.E',
        description: 'A text editor application that can be used while being offline as well!',
        background_color: '#000000',
        theme_color: '#9370db',
        start_url: './',
        publicPath: './',
        fingerprints: false,
        inject: true,
        icons: [
          {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons')
          },
        ]
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
