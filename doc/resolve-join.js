const { resolve, join } = require('path');

// resolve 会把相对路径转换为绝对路径， 解析
let resolvest = resolve('a', 'b', 'c');
// 解析:  /xxx/xxx/xxx/xxx/xxx/a/b/c

console.log("连接: ", resolvest);

// join 非常的死板或者说机械的连接 连接
let joinst = join('a', 'b', 'c');
console.log("连接: ", joinst);
// 连接:  a/b/c