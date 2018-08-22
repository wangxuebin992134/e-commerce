$(function(){
  //1.获取地址栏参数赋值给搜索框
    var key = getSearch("key");
    // console.log(key);
  $(".search_input").val(key);
  render();
 //2.点击搜索按钮，实现搜索功能
   $(".search_btn").click(function(){
      var key = $(".search_input").val();
      if( key.trim()===""){
        mui.toast("请输入搜索关键字");
       return;
      }
      render();
    //如果有搜索关键字，就添加到本地储存中
     var history = localStorage.getItem("search_list")||'[]';
     var arr  = JSON.parse(history);
     //判断数组有没有重复项
     var index = arr.indexOf(key);
     if(index != -1){
       //说明有重复项
       arr.splice(index,1);
     }
     if(arr.length >= 6){
        arr.pop();
     }
     //添加数组到最前面
     arr.unshift(key);
     //转成字符串存到本地存储
     localStorage.setItem("search_list",JSON.stringify(arr));
    //  console.log(arr);
     
   })

   //3.添加排序功能(点击切换类)
   $(".lt_sort a[data-type]").click(function(){
      
      //如果之前有current类的,切换箭头
      if($(this).hasClass("current")){
          $(this).find("i").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
      }
      $(this).addClass("current").siblings().removeClass("current");
      render();
      

   })



  function render(){
     //准备请求数据，渲染时，显示加载中的效果
      $(".lt_product").html('<div class="loading"></div>');
      //在render方法里面处理所有参数
      //必传的3个参数
      var params = {}
      params.proName = $(".search_input").val();
      params.page = 1;
      params.pageSize=100;
      //可传可不传的参数
      //判断有没有判断高亮元素，判断是否传参
      //根据箭头的方向来判断是升序还是降序
      var $current = $(".lt_sort a.current");
      if($current.length>0){
       var sortName =  $current.data("type");
       var sortValue = $current.find("i").hasClass("fa-angle-down")?2:1;
       params[sortName] = sortValue;
      }

      // params.price
      console.log(params);
    setTimeout(function(){
      $.ajax({
        type:"get",
        url:"/product/queryProduct",
        data:params,
        dataType:"json",
        success:function(info){
            console.log(info);
            var htmlStr = template("productTpl",info);
            $(".lt_product").html(htmlStr);
            
        }
      })
    },500)
  }
})