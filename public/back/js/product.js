$(function(){
  var currentPage = 1;//当前页
  var pageSize = 2;//一页有多少条
  var picArr = [];//用于存储上传的图片对象
  //1.一进入页面发送ajax请求进行渲染
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
          console.log(info);
          var htmlStr = template("pro-Tpl",info);
          $(".lt_content tbody").html(htmlStr);
          //进行分页初识化
          $("#paginator").bootstrapPaginator({
            //指定版本
            bootstrapMajorVersion:3,
            currentPage:info.page,
            totalPages:Math.ceil(info.total/info.size),
            size:"normal",
            //给下面的页码添加点击事件
            onPageClicked:function(a,b,c,page){
                currentPage = page;
                render();
            },
            //配置每个按钮的文字
            //每个按钮都会调用一次这个方法,他的返回值就是按钮的文本内容
            //参数1：type取值为 first首页 last尾页 pre 上一页 next 下一页 page普通页码
            //参数2: page 当前按钮所指的页码
            //参数3: current 当前页
            itemTexts:function(type,page,current){
              // console.log(arguments);//获取所有参数列表
               switch(type){
                  case "first":{
                    return "首页";
                  }
                  case "last": {
                    return "尾页";
                  }
                  case "pre":{
                     return "上一页";
                  }
                  case "next":{
                     return "下一页";
                  }
                  case "page": {
                    return page;
                  }
               }
            },
            //配置提示提示信息
            tooltipTitles:function(type,page,current){
              switch(type){
                case "first":{
                  return "首页";
                }
                case "last": {
                  return "尾页";
                }
                case "pre":{
                   return "上一页";
                }
                case "next":{
                   return "下一页";
                }
                case "page": {
                  return "前往第"+ page +"页";
                }
             }
            },
            //使用bootstrap的提示框组件
            useBootstrapTooltip:true
          })

          
      }
    })
  }
  //2.点击添加商品按钮，显示模态框
  $("#addBtn").click(function(){
      $("#addModal").modal("show");
      //发送ajax请求，请求二级分类数据，进行下拉菜单渲染
      $.ajax({
        type:"get",
        url:"/category/querySecondCategoryPaging",
        data:{
          page:1,
          pageSize:100
          
        },
        dataType:"json",
        success:function(info){
            console.log(info);
            var htmlStr = template("dropdown-Tpl",info);
            $(".dropdown-menu").html(htmlStr);
            
            
        }
      })
  })
  //3.注册事件委托，给a注册点击事件
  $('.dropdown-menu').on("click","a",function(){
      var txt = $(this).text();
      $(".second-cate").text(txt);
  })
  //4.配置文件上传插件，进行文件上传初始化
  $("#fileupload").fileupload({
    //返回数据类型
    dataType:"json",
    //上传完图片，响应的回调函数
    //每一张图片上传完成，都会响应一次
    done:function(e,data){
      console.log(data);
      //获取图片地址对象
      var picObj = data.result;
      //获取图片地址
      var picAddr = picObj.picAddr;
      //获得的新图片对象添加到数组的最前面
      picArr.unshift(picObj);
      console.log(picArr);
      
      
    }
  })
});