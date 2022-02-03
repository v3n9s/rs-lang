module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './',
    compress: true,
    hot: true,
    port: 5000,
  },
};
