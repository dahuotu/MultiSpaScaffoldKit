const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 多页面打包
 */

module.exports = {
    mode: 'development',  //  当前的运行模式： 开发环境 生产环境 不指定环境， production 生产模式, development 开发环境
    devtool: false,
    // 打包入口文件
    entry: {
        home: './src/pages/home/index.js',
        about: './src/pages/about/index.js',
    },
    // 打包输出文件
    output: {
        path: resolve(__dirname, '../dists'),  // 输出文件夹的的绝对路径， resolve 是去找这个文件夹 __dirname是当前文件所在的目录 ../文件夹的名字
        filename: '[name]/js/bundle.[chunkhash:8].js', // 打包输出文件的名称
        // publicPath: '/assets', // 当你把打包后文件插入到 index.html 文件里的时候，src 如何写到？publicPath+filename, 如： /assets/main.js
        clean: true,    // 清理 /dist 文件夹
    },
    // 别名
    // 模块
    module: {
        // 处理的规则
        rules: [
            {
                test: /\.txt$/, // 以 .txt 结尾的进行处理
                use: 'raw-loader', // 这是官网的
                // use: rwLoader, // 第一种用法 使用自定义的 loader
                // use: resolve(__dirname, '../loaders', 'raw-loader.js'), // 第二种用法 使用自定义的 loader
            },
            // 支持 js 编译
            {
                test: /\.(js|jsx)?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            // 支持 css 编译
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader?modules",
                    "postcss-loader",
                  ],
            },
            // 支持 less 编译
            {
                test: /\.less$/i,
                use: [
                    "style-loader",
                    "css-loader?modules",
                    "less-loader",
                  ],
            },
            // 支持 sass 编译
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    "style-loader",
                    // 将 CSS 转化成 CommonJS 模块
                    "css-loader?modules",
                    // 将 Sass 编译成 CSS
                    "sass-loader",
                ],
            },
            // 支持 png|jpg|gif|svg) 编译
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                    }
                  },
                ],
                type: 'javascript/auto'
            },

        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'home/index.html', 
            // template: './src/pages/home/index.html', // 以这个文件为模版
            template: 'public/index.html', // 以这个文件为模版
            chunks: ['home'],
        }),
        new HtmlWebpackPlugin({
            filename: 'about/index.html', 
            // template: './src/pages/about/index.html', // 以这个文件为模版
            template: 'public/index.html', // 以这个文件为模版
            chunks: ['about'],
        }),
    ],
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
        openPage: ['home', 'about'],// 如果希望指定多个页面在浏览器中打开。
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '' },
            },
        },
    }

}