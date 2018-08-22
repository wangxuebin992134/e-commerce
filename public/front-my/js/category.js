$(function(){
  //1.一进入页面就发送ajax请求,获取一级分类数据，进行渲染
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    dataType:"json",
    success:function(info){
      // console.log(info);
      var htmlStr = template("leftTpl",info);
      $(".lt_category_left ul").html(htmlStr);
      renderSecondById(info.rows[0].id);

      
    }
  })
  //2.点击一级分类,渲染二级分类
  //注册委托事件，给a注册点击事件
  $(".lt_category_left").on("click","a",function(){
    
      $(this).addClass("current").parent().siblings().find("a").removeClass("current");
      var id = $(this).data("id");
      // console.log(id);
      renderSecondById(id);
  
  })
  function renderSecondById(id){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{
        id:id
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
        var htmlStr = template("rightTpl",info);
        $(".lt_category_right ul").html(htmlStr);
        
      }
    })
  }
})