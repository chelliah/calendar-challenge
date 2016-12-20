var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./../webpack.config.js');

var path = require('path')
var mainPath = path.resolve(__dirname, '..', 'app', 'scripts', 'index.js');

module.exports = function(){

  //first we fire up webpack and pass in the configuration we created
  var bundleStart = null;
  var compiler = Webpack(webpackConfig);


  //we give notice in the terminal when it starts bundling and set the time it started
  compiler.plugin('compile', function(){
    console.log('bundling...');
    bundleStart = Date.now();
  })

  //we also give notice when it is done cpmiling, incliding the time it took
  compiler.plugin('done', function() {
   console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });

  var bundler = new WebpackDevServer(compiler, {
    //WE need to tell webpack to server our bundled application
    //from the build path. When proxying:
    //localhost:3000/build -> localhost:8080/build
    publicPath: '/build/',

    //configure hot replacement
    hot: true,

    //some terminal configurations
    quite: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  bundler.listen(8080, 'localhost', function(){
    console.log('bundling project, please wait...')
  })

}
