var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve (__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'scripts', 'index.js')
//var css = require("!style!css!sass!./file.scss");


var config = {
    //makes sure errors in console map to the correct file and line number
    devtool: 'eval',
    entry: [
        //the script refreshing the browser on non hot updates
        'webpack-dev-server/client?http://localhost:8080',

        //hot updates
        'webpack/hot/dev-server',

        //our app
        mainPath
    ],
    output: {
      // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified. We use the buildPath
    // as that points to where the files will eventually be bundled
    // in production
        path: buildPath,
        filename: 'bundle.js',
        //everything related to webpack should go through a
        // build path, makes proxying easier to handle
        publicPath: '/build/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'app/scripts'),
            exclude: [nodeModulesPath]
        },
        {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"],
            include: path.join(__dirname, 'app/styles')
        }]
    }
};

module.exports = config;
