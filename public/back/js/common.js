
  //在第一个ajax发送请求时,调用
  //实现第一个ajax请求时，开启进度条
  //在所有ajax请求都完成是，结束进度条
 $(document).ajaxStart(function(){
   NProgress.start();
 })
 $(document).ajaxStop(function(){
   setTimeout(function(){
    NProgress.done();
   },500)
 })
