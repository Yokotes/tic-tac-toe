const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const clientConfig = {
    entry: './src/client.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'client.bundle.js',
      publicPath: '/'
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader'
          },
          exclude:/(node_modules|bower_components)/,
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
              }
            }
          ]
        }
      ],
    },
    resolve: {
      extensions: [ '.ts', '.js', '.jsx' ],
    }
}

const serverConfig = {
  entry: './src/server.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js',
    publicPath: '/'
  },
  target: 'node',
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude:/(node_modules|bower_components)/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }
        ]
      }
    ],
  },
  resolve: {
      extensions: [ '.ts', '.js', '.jsx' ],
  }
}

module.exports = [ clientConfig, serverConfig]