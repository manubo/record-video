const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve('./public'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2016', 'react', 'stage-2'],
          }
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            },
          },
          'sass-loader',
        ],
      },
    ]
  },

  resolve: {
    modules: [path.resolve("./src"), 'node_modules'],
  },

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
  }
};