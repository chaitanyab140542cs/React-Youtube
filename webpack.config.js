const path = require('path');






var config = {

    
  entry: ['babel-polyfill','./src/app.js'],
  mode : "development",

  output: {

    path: path.resolve(__dirname, 'dist'),
publicPath : "/dist",
    filename: 'bundle.js'

  },

  module: {

   

  rules : [
     
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
    },
    {
      test: /\.(js|jsx)$/,
      loader: "babel-loader"
      

    }
     
    
    
  ]
},


watch : true,

devServer: {
  historyApiFallback: true,
}

};

module.exports = config;