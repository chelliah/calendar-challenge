var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve (__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'scripts', 'index.js')

var config = {
  //we change to normal source mapping
  devtool: 'source-map',
  entry: mainPath,
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  module: {
    loaders: [{
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'app/scripts'),
        exclude: [nodeModulesPath]
    },
    {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: path.join(__dirname, 'app/styles')
    }]
  }
};

module.exports = config;
// webpack(config, function(err,stats){
//   if(err){
//     console.log(err);
//   }
// })
