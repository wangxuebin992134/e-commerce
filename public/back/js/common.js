
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
 
 //拦截功能
  if(location.href.indexOf("login.html") === -1){
     $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        dataType:"json",
        success:function(info){
            // console.log(info);
            if(info.error===400){
              location.href="login.html";
            }
            
        },
       
     })
  }


$(function(){
 //1.分类管理的切换功能
 $(".nav .category").click(function(){
    $(".nav .child").slideToggle();
    
 })


   //2.点击右侧主体部分切换菜单切换左侧栏
 $(".lt_main .icon_menu").click(function(){
  $(".lt_aside").stop().toggleClass("hidemenu");
  $(".lt_main").stop().toggleClass("hidemenu");
  $(".lt_topbar").stop().toggleClass("hidemenu");
})
//3.点击topbar退出按钮，显示模态框
  $(".icon_logout").click(function(){
    $("#logoutModal").modal("show");
  })
  $(".logoutBtn").click(function(){
      $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        dataType:"json",
        success:function(info){
            // console.log(info);
            if(info.success){
              location.href="login.html";
            }
          
        }
      })
  })
})
