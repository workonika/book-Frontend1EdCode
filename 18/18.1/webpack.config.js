const path = require('path');

module.exports = {
    entry: './18.1.js', 
    output: {
      path: path.resolve(__dirname, 'dist'), 
      filename: './bundle.js' 
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                babelrc: true,
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties'],
              },
            },
          },
        ],
      },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'), 
      open: true 
    }
  };