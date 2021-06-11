/**
 * 什么是 loader 
 *     本质上是一个函数
 *     接收源文件，返回一个 JS 模块代码
 */

// 自定义的 loader
function loader ( source ) {
    return `module.exports = "${ source }"`;
}
module.exports = loader;