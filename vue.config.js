const { defineConfig } = require('@vue/cli-service');
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
  // ...
};
module.exports = defineConfig({
  transpileDependencies: true
});
