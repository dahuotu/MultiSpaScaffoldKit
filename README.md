# webpack 架构
```shell
   # 多页面配置
     nulti.js

   # 单页面配置
     base.js 全局配置文件
     dev.js  开发环境
     prod.js 生产环境  

   # https://hongkongvision.com/tool/cc_py_conv_zh
```



### 一、webpack 介绍与安装
- 01、创建项目目录: `mkdir 项目目录名称`, 并进入目录，`cd 目录名称` 回车

- 02、初始化 `package.json`： `npm init -y`;

# 1.1、安装 `wbepack` 相关依赖包如下：
```
    npm i webpack webpack-cli -D # -D 是安装到开发依赖中

    // 出现以下的状态的就是安装成功了
    % npm i webpack webpack-cli -D   
    npm notice created a lockfile as package-lock.json. You should commit this file.
    npm WARN scaffoldkit@1.0.0 No repository field.

    + webpack-cli@4.7.0
    + webpack@5.38.1
    added 121 packages from 155 contributors and audited 121 packages in 34.707s

    16 packages are looking for funding
    run `npm fund` for details

    found 0 vulnerabilities


    ┌────────────────────────────────────────────────────────────┐
    │                  npm update check failed                   │
    │            Try running with sudo or get access             │
    │            to the local update config store via            │
    │ sudo chown -R $USER:$(id -gn $USER) /Users/beiyong/.config │
    └────────────────────────────────────────────────────────────┘

```

# 1.2、入口 `entry`

    + 入口的起点(entry point): 提示 webpack 应该使用哪个模块，来做为构构建其内部，依赖图（dependency graph）的开始，进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖。

    + 默认值中是 `/src/index.js`, 但你可以通过在 webpack configguration 中配置 entry 属性，来指定一个 `或多个` 不同的入口起点


# 1.2.1、 `src/index.js`
```js
    const title = require('./title.text');
    
    document.write(title.default);

```

# 1.2.2、 `webpack.config.js`
```js
    const path = require('path');
    
    module.exports = {
        entry: './src/index.js',
    }

```
# 1.3、输出 `output`
- `output` 属性告诉 `webpack` 在哪里输出它所创建的 `bundle`, 以及如何命名这些文件

- 主要输出文件的默认值是 `/dist/mian.js`, 其它生成文件默认入在 `/dist` 文件夹中

- `webpack.config.js`
```js
    const { resolve, join } = require('path');

    // resolve 会把相对路径转换为绝对路径， 解析
    let resolvest = resolve('a', 'b', 'c');
    // 解析:  /xxx/xxx/xxx/xxx/xxx/a/b/c

    console.log("连接: ", resolvest);

    // join 非常的死板或者说机械的连接 连接
    let joinst = join('a', 'b', 'c');
    console.log("连接: ", joinst);
    // 连接:  a/b/c
```
```js
    const { resolve } = require('path');

    module.exports = {
        // 命名空间
        mode: 'production', 
        // 打包入口文件
        entry: './src/index.js',
        // 打包输出文件
        output: {
            path: resolve(__dirname, '../dist'),  // __dirname 是获取当前的目录，../dist是定义要输出到指定目录中的文件目录名
            filename: 'main.js', // 打包输出文件的名称
        }

    }
```

- `package.json`
```js

    /**
     *  "build": "webpack --config config/prod.js"
     *   wbpack wbpack打包工具
     *   --config 配置
     *   config/prod.js 自定义 webpack 打包的配置文件
     * 
     *   提示：
     *      如果要要自定义打包文件一定要按以下的书写方式如下
     *      --config config/prod.js
     * 
     */ 

    {
        "name": "scaffoldkit",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": "webpack --config config/prod.js"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "devDependencies": {
            "webpack": "^5.38.1",
            "webpack-cli": "^4.7.0"
        }
    }

```

# 1.4、loader
- `webpack` 中能理解 `javascrip` 和 `JSON` 文件

- `loader` 让 `webpack` 能够去处理其它类型的文件，并将它们转换为有效模块，以供应程序使用，以及被添加到依赖图中
```js
    /* 
    处理 .txt 文本的插件
    安装：npm i raw-loader -D
    */

   // 自定义 Loader 插件开发
    /**
     * 什么是 loader 
     *     本质上是一个函数
     *     接收源文件，返回一个 JS 模块代码
     * 
     * loader/raw-loader.js
     */

    // 自定义的 loader
    function loader ( source ) {
        return `module.exports = "${ source }"`;
    }
    module.exports = loader;


```

- `webpackk.config.js`
```js
    const { resolve } = require('path');
    const rwLoader = require('../loaders/raw-loader'); // 自定义 loader



    module.exports = {
        mode: 'development',  //  当前的运行模式： 开发环境 生产环境 不指定环境， production 生产模式, development 开发环境
        devtool: false,
        // 打包入口文件
        entry: './src/index.js',
        // 打包输出文件
        output: {
            path: resolve(__dirname, '../dist'),  // 输出文件夹的的绝对路径， resolve 是去找这个文件夹 __dirname是当前文件所在的目录 ../文件夹的名字
            filename: 'main.js', // 打包输出文件的名称
        },
        // 模块
        module: {
            // 处理的规则
            rules: [
                {
                    test: /\.txt$/, // 以 .txt 结尾的进行处理
                    // use: 'raw-loader', 这是官网的
                    // use: rwLoader, // 第一种用法 使用自定义的 loader
                    use: resolve(__dirname, '../loaders', 'raw-loader.js'), // 第二种用法 使用自定义的 loader


                }
            ]
        }

    }
```

# 1.5、插件(`plugin`)
- loader 用于转换某些类型的模块，而插件侧可以用于执行范围更广的任务，包括：打包优化📦，资源管理，注入环境亦是
```js
    优化 index.html 文件自动加载打包后的 js
    安装插件： npm install html-webpack-plugin -D

```

# 1.5.1、`src\index.html`
- `src\index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <script src="./main.js"></script>
</body>
</html>

```
# 1.5.2 `webpack.config.js`
```js
    const { resolve } = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        mode: 'development',  //  当前的运行模式： 开发环境 生产环境 不指定环境， production 生产模式, development 开发环境
        devtool: false,
        cache: false, // 传入 false 会禁用缓存
        // 打包入口文件
        entry: './src/index.js',
        // 打包输出文件
        output: {
            path: resolve(__dirname, '../dist'),  // 输出文件夹的的绝对路径， resolve 是去找这个文件夹 __dirname是当前文件所在的目录 ../文件夹的名字
            filename: 'main.js', // 打包输出文件的名称
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
                }
            ]
        },
        // 插件
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html', // 以这个文件为模版
            })
        ]

    }
```

# 1.6、模式(`mode`)
- 日常的前端开发工作中，一般都会有两套构建环境
- 一套开发使用，构建结果用于本地开发调试，不进行代码压缩，打印 `debug` 包含 `sourcemap`
- 一套构建后的结果是直接应用于线上的，即代码都是压缩后，运行时不打印 `debug` 信息，静态文件不包括 `sourcemap`
- `webpack 4.x` 版本引入了 `mode` 的概念
- 当你指定使用 `production` mode 时，默认会启用各种性能优化的功能，包括构建结果优化以及 `webpac` 运行性性优化 
- 而如果是 `development` mode 的话，侧会开启 `debug` 工具，运行时打印详情信息，以及更加快速的增量编译构建

# 1.6.1 环境差异
- 开发环境
    + 需要生成 `sourcemap` 文件
    + 需要打印 `debug` 信息
    + 需要 `live reload` 或者 `hot reload` 的功能

- 生产环境
    + 可能需要分离 `CSS` 成单单独的文件，以便多个页面共享同一个 `CSS` 文件
    + 需要压缩 `HTML/CSS/JS` 代码
    + 需要压缩图片

- 其默认值为 `production`

# 1.6.2 `webpack.config.js`
```js
    const { resolve } = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        mode: 'development',  //  当前的运行模式： 开发环境 生产环境 不指定环境， production 生产模式, development 开发环境
        devtool: false,
        cache: false, // 传入 false 会禁用缓存
        // 打包入口文件
        entry: './src/index.js',
        // 打包输出文件
        output: {
            path: resolve(__dirname, '../dist'),  // 输出文件夹的的绝对路径， resolve 是去找这个文件夹 __dirname是当前文件所在的目录 ../文件夹的名字
            filename: 'main.js', // 打包输出文件的名称
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
                }
            ]
        },
        // 插件
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html', // 以这个文件为模版
            })
        ]

    }
```

# 1.7、浏览器兼容性
- `Webpack` 运行所有符合 ES5 标准的浏览器（不支持 IE8 及以下的版本）
- `Webpack` 的 `import()` 和 r`equire.ensure()` 需要 Promise，如果你想要支持旧的浏览器，在使用这些表达式之前，还需要提前加载 `polyfill`

# 2、开发环境配置

# 2.1、开发服务器
# 2.1.1、安装服务器
```
npm install webpack-dev-server --save-dev
```
# 2.1.2、`webpack.config.js`
- `package.json`
```json
    {
        "name": "scaffoldkit",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "start": "webpack server --config config/dev.js",
            "build": "webpack --config webpack.config.js"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "devDependencies": {
            "html-webpack-plugin": "^5.3.1",
            "raw-loader": "^4.0.2",
            "webpack": "^5.38.1",
            "webpack-cli": "^4.7.0",
            "webpack-dev-server": "^3.11.2"
        }
    }


```
```js

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',  //  当前的运行模式： 开发环境 生产环境 不指定环境， production 生产模式, development 开发环境
    devtool: false,
    cache: false, // 传入 false 会禁用缓存
    // 打包入口文件
    entry: './src/index.js',
    // 打包输出文件
    output: {
        path: resolve(__dirname, '../dist'),  // 输出文件夹的的绝对路径， resolve 是去找这个文件夹 __dirname是当前文件所在的目录 ../文件夹的名字
        filename: 'js/main.js', // 打包输出文件的名称
        publicPath: '/assets', // 当你把打包后文件插入到 index.html 文件里的时候，src 如何写到？publicPath+filename, 如： /assets/main.js
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
            }
        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // 以这个文件为模版
        })
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
        hotOnly: true, // 启用热模块替换（请参见 devServer.hot ），而无需页面刷新作为构建失败时的回退。
        // publicPath: '/', // 增加打包的前缀, 一般不用写的
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '' },
            },
        },
    }

}
```


# 2.3、支持 CSS
- `css-loader `用来翻译处理 `@import` 和 `url()`
- `style-loader` 可以把 `css` 播入 `DOM` 中

# 2.3.1、安装模块
```shell
    npm install style-loader css-loader -D # 安装到开发依赖中

    npm install --save-dev postcss-loader postcss # 安装到开发依赖中， 支持 import css from "file.css"; 的方式

    npm i less less-loader node-sass sass-loader -D # 安装到开发依赖中
```
# 2.3.2、`webpack.config.js`
```js


```






