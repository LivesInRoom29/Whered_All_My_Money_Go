const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
  entry: {
    app: path.resolve( __dirname + '/index.js'),
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js',
  },
  mode: 'development',
  // Babel
  module: {
    rules: [
      {
        test: /\.js$/,
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
  // To create the manifest
  plugins: [
    new WebpackPwaManifest({
      fingerprints: false,
      name: "Where'd all my money go?",
      short_name: 'Budget App',
      description: 'A progressive web application that allows the user to track their spending and balance whether connected to the internet or not.',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      start_url: '/',
      icons: [
        {
          src: path.resolve( __dirname + '/icons/icon-512x512.png'),
          sizes: [192, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],
};

module.exports = config;
