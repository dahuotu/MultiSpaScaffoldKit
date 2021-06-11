const { merge } = require('webpack-merge');
const TerserPlugin = require("terser-webpack-plugin"); // terser-webpack-plugin：用去去除生产环境的无用js代码，webpack5 之后自带，不需要另行安装，直接引入使用即可
const base = require('./base');

module.exports = merge(base, {
    mode: 'production',  //  当前的运行模式： 开发环境 生产环境 不指定环境， production 生产模式, development 开发环境
    devtool: 'inline-source-map',
    optimization: {
        minimize: true,
        minimizer:[
          new TerserPlugin({
            extractComments: false,
            terserOptions: {
              compress: { pure_funcs: ['console.log'] },
            }
          }),
        ]
      }
});