const { merge } = require('webpack-merge');
const { resolve } = require('path');
const base = require('./base');


module.exports = merge(base, {
    devtool: 'inline-source-map',
    mode: 'development',  //  当前的运行模式： 开发环境 生产环境 不指定环境， production 生产模式, development 开发环境
    // 服务器配置
    /**
     * deveSersver 会启动一个 HTTP 开发服务器，把一个文件夹作为静态根目录
     * 为了提高性能同，使用的内在文件系统
     * 默认情况下 deveServer 会读取打包后的路径
     * static 其实静态文件目录是可以有多个的
     */
     devServer: {
        contentBase: resolve(__dirname, '../static'), // 告诉服务器内容的来源。仅在需要提供静态文件时才进行配置。devServer.publicPath 将用于确定 bundle 的来源，并具有优先级高于 contentBase, 它将使用当前的工作目录来提供内容
        compress: true, // 是否为每个静态文件开启 gzip compression 的压缩
        writeToDisk: true, // 告诉 devServer 将产生的文件写入硬盘一份。 写入位置为 output.path 配置的目录
        port: 8080,     // 指定HTTP服务器端口号以侦听
        open: true,     // 告诉 dev-server 在服务器启动后打开浏览器。 将其设置为 true 以打开默认浏览器
        // hotOnly: true, // 启用热模块替换（请参见 devServer.hot ），而无需页面刷新作为构建失败时的回退。
        // publicPath: '/', // 增加打包的前缀, 一般不用写的
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '' },
            },
        },
    }
});