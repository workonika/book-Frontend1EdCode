const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './22.3.js',
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'dist'),
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
    optimization: {
      minimize: false, // Отключение минификации
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: false, // Отключение углификации
            output: {
              beautify: true // Сохранение читаемого формата кода
            }
          }
        })
      ],
    },
  }
