const path = require('path');
// 使用webpack直接对TS文件进行打包
module.exports = {
  entry: './src/index.ts',
  mode: "production",
  output: {
    filename: 'jerry-ts-utils.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'jerry-ts-utils',
      type: "this"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};