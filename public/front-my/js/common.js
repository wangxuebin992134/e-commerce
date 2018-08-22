//对页面的所有的区域滚动进行初始化
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0004,//阻尼系数,系数越小滑动越灵敏
  bounce:true,
  indicators: false, //是否显示滚动条
});
// 轮播图
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});

//作用：专门用于解析地址栏参数
function getSearch(k){
 var search =  location.search;
 search = decodeURI(search);
 search = search.slice(1);
 var arr = search.split("&");
 var obj ={};
 arr.forEach(function(v,i){
   var key = v.split("=")[0];
   var value = v.split("=")[1];
   obj[key]= value;
 })
 return obj[ k ];

}

