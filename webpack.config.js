const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const DEBUG = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;
const HOST = process.env.HOST || 'localhost';

const devtool = DEBUG ? '#inline-source-map' : '#eval';
const fileName = DEBUG ? '[name]' : '[name]-[hash]';
const plugins = [
  new MiniCssExtractPlugin({
    filename: `${fileName}.css`
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'public/index.html'),
    inject: false,
    favicon: path.join(__dirname, 'public/favicon.ico'),
    files:{
      "js": `${fileName}.js`,
      "css": `${fileName}.css`
    },
    minify: {
      removeComments: true,
      // collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      // minifyJS: true,
      // minifyCSS: true,
      // minifyURLs: true,
    },
    ADSENSE_AD_CLIENT: process.env.ADSENSE_AD_CLIENT,
    ADSENSE_AD_SLOT_PC1: process.env.ADSENSE_AD_SLOT_PC1,
    ADSENSE_AD_SLOT_PC2: process.env.ADSENSE_AD_SLOT_PC2,
    ADSENSE_AD_SLOT_MOBILE: process.env.ADSENSE_AD_SLOT_MOBILE,
    GOOGLE_ANALYTICS_TRACKING_ID: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      GITHUB_API_TOKEN: JSON.stringify(process.env.GITHUB_API_TOKEN || ''),
      TWITTER_ID: JSON.stringify(process.env.TWITTER_ID || ''),
    },
  }),
  CopyWebpackPlugin([
    { from: path.join(__dirname, "/*Data.json"), to: path.join(__dirname, "/dist/") },
    { from: path.join(__dirname, "/imgs/"), to: path.join(__dirname, "/dist/imgs/"), ignore: [ '*.txt' ]},
    { from: path.join(__dirname, "/otherImages/"), to: path.join(__dirname, "/dist/otherImages/") },
    { from: path.join(__dirname, "/charaimgs/"), to: path.join(__dirname, "/dist/charaimgs/"), ignore: [ '*.txt' ]},
  ]),
  // new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     screw_ie8: true, // React doesn't support IE8
  //     warnings: false,
  //   },
  //   mangle: {
  //     screw_ie8: true,
  //   },
  //   output: {
  //     comments: false,
  //     screw_ie8: true,
  //   },
  // }),
  new ManifestPlugin({
    fileName: 'asset-manifest.json',
  }),
];


module.exports = {
  devtool: devtool,
  entry: ['./src/content.js', './css/style.css', './css/smartphone.css'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `${fileName}.js`,
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /.css$/,
          use: [
              {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                      publicPath: 'css'
                  }
              },
              'css-loader'
          ]
      },
  ]},
  plugins: plugins,
  devServer: {
     contentBase: [path.join(__dirname, "/dist")],
     compress: true,
     host: HOST,
     port: 8000
  },
  mode: process.env.NODE_ENV || 'development'
};
