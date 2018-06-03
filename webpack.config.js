const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const DEBUG = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;

const devtool = DEBUG ? '#inline-source-map' : '#eval';
const fileName = DEBUG ? '[name]' : '[name]-[hash]';
const plugins = [
  new ExtractTextPlugin({
    filename: `${fileName}.css`,
    disable: false,
    allChunks: true
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'public/index.html'),
    inject: false,
    favicon: path.join(__dirname, 'public/favicon.ico'),
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
    ADSENSE_AD_CLIENT: JSON.stringify(process.env.ADSENSE_AD_CLIENT || ''),
    ADSENSE_AD_SLOT_PC1: JSON.stringify(process.env.ADSENSE_AD_SLOT_PC1 || ''),
    ADSENSE_AD_SLOT_PC2: JSON.stringify(process.env.ADSENSE_AD_SLOT_PC2 || ''),
    ADSENSE_AD_SLOT_MOBILE: JSON.stringify(process.env.ADSENSE_AD_SLOT_MOBILE || ''),
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      GITHUB_API_TOKEN: JSON.stringify(process.env.GITHUB_API_TOKEN || ''),
    },
  }),
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
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader",
            publicPath: "css",
           })
      },
  ]},
  plugins: plugins,
  devServer: {
     contentBase: [path.join(__dirname, "/"), path.join(__dirname, "/dist")],
     compress: true,
     host: "0.0.0.0",
     port: 8000
  },
  mode: process.env.NODE_ENV || 'development'
}
