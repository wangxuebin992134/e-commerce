$(function(){
  var currentPage = 1;
  var pageSize = 5 ;
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
          console.log(info);
          var htmlStr = template("second-tpl",info);
          $(".lt_content tbody").html(htmlStr);
          //分页
          $("#paginator").bootstrapPaginator({
             bootstrapMajorVersion:3,
             currentPage:info.page,
             totalPages:Math.ceil(info.total/info.size),
             onPageClicked:function(a,b,c,page){
                currentPage = page ;
                render();

             }
          })
          
      }
    })
  }
  //1.点击添加分类按钮
  $("#addCategory").click(function(){
      $("#addcateModal").modal("show");
    //2.动态渲染下拉菜单(在点击添加分类时就发送ajax请求)动态渲染一级分类
    $.ajax({
       type:"get",
       url:"/category/queryTopCategoryPaging",
       data:{
         page:currentPage,
         pageSize:pageSize
       },
       dataType:"json",
       success:function(info){
          console.log(info);
          var htmlStr = template("dropdownTpl",info);
          $(".dropdown-menu").html(htmlStr);

          
       }
    })
  })
  
  //点击下拉菜单的子菜单
  $(".dropdown-menu").on("click","a",function(){
    var txt = $(this).text();
    $(".second-cate").text(txt);
  })

 //3.配置文件上传插件，进行文件初始化
  $("#fileupload").fileupload({
     dataType:"json",
     done:function(e,data){
        console.log(data);
        var imgurl = data.result.picAddr;
        console.log(imgurl);
        
        $(".img-box img").attr("src",imgurl);
        
     }
  })
  //4.点击模态框的添加按钮 模态框隐藏,页面重新渲染
  //  $("#addmitBtn").click(function(){
  //     $("#addcateModal").modal("hide");
      
  //  })

});