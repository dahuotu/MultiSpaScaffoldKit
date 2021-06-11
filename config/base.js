const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'); // ts 类型检查，让终端可以显示类型错误, 目前 webpack 打包时不会有类型检查信息（为了编译速度，babel 编译 ts 时直接将类型去除，并不会对 ts 的类型做检查），即使类型不正确终端也会显示打包成功，有误导性，为此添加上打包类型检查


//  当前的运行模式： 开发环境 生产环境 不指定环境， production 生产模式, development 开发环境
const isEnv = process.env.NODE_ENV === 'production' ? true : false;

module.exports = {
    // 打包入口文件
    entry: {
        index: './src/index.js',
    },
    // 打包输出文件
    output: {
        path: resolve(__dirname, '../dist'),  // 输出文件夹的的绝对路径， resolve 是去找这个文件夹 __dirname是当前文件所在的目录 ../文件夹的名字
        filename: '[name]/js/main[chunkhash:8].js', // 打包输出文件的名称
        // publicPath: '/assets', // 当你把打包后文件插入到 index.html 文件里的时候，src 如何写到？publicPath+filename, 如： /assets/main.js
        clean: true,    // 清理 /dist 文件夹
    },
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
                test: /\.(js|jsx)$/,
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
            filename: 'index.html',  // 输出文件的文件名称或者文件地址/文件名称
            template: 'public/index.html', // 以这个文件为模版, 本地模板位置
            inject: 'body', // 注入文件位置 body | head | true - body| false - none
            minify: { 
              removeComments: isEnv,  // 压缩后去除注释, 这里可以通过环境变量来控制 
              collapseWhitespace: isEnv, // 去除空格、换行 这里可以通过环境变量来控制
            }
        }),
        new UglifyJSPlugin(),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
              configFile: path.resolve(PROJECT_PATH, '../tsconfig.json'),
            },
        }),
    ],
}