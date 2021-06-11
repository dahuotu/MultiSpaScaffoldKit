// 关于点击空白关闭弹窗的js写法推荐？
/**
 * 来一个javascript 实现的方案吧 :
 * 
 */
// 点击其他区域时, 隐藏指定区域(cDom)
document.addEventListener("click", event => {
    var cDom = document.querySelector("#filter-header");
    var tDom = event.target;
    if (cDom === tDom || cDom.contains(tDom)) {
      // ... 
    } else {
      cDom.style.display = "none"
    }
});