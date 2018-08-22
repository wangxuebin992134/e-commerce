$(function(){
  //要进行localStorage本地存储进行历史记录管理
   // 准备假数据: 将下面三行代码, 在控制台执行, 可以添加假数据
  // var arr = [ "耐克", "阿迪", "阿迪王", "耐克王", "新百伦" ];
  // var jsonStr = JSON.stringify( arr );
  // localStorage.setItem( "search_list", jsonStr );

  //1.从本地存储读取历史记录,读取的是一个json字符串
    function getHistory(){
      var history = localStorage.getItem("search_list")||'[]';
      //转成数组
      var arr = JSON.parse(history);
      // console.log(arr);
      return arr;

    }
   
    
  //  console.log(getHistory());
   
   function render(){
     var arr = getHistory();
     var htmlStr = template("historyTpl",{arr:arr});
     $(".lt_history").html(htmlStr);
  
     
   }
   render();
   //功能2:清空历史记录
   //注册委托事件
   $(".lt_history").on("click",".btn-empty",function(){
       //添加mui确认框
       //参数message,title,btnValue
       mui.confirm("你确定要清空历史记录嘛?","温馨提示",["取消","确认"],function(e){
          // console.log(e);
          if(e.index === 1){
            localStorage.removeItem("search_list");
            render();
          }
          
       }) 

   })
   
   //功能3：删除单条历史记录
   $(".lt_history").on("click",".btn_del",function(){
      //获取单条删除按钮的对应的index
      var index = $(this).data("index");
      // console.log(index);
      //获取本地存储的历史数据
     var arr = getHistory();
     //删除对应的数组中对应的项
     arr.splice(index,1);
    //  console.log(arr);
     
     //转成json字符串存储到本地储存
     localStorage.setItem("search_list",JSON.stringify(arr));
     //页面重新渲染
     render();
     

      
   })
   // 4.添加历史记录
  //  点击搜索按钮添加点击事件
  $(".search_btn").click(function(){
   //获取input框里的值
    var key = $(".search_input").val().trim();
    if(key === ""){
      alert("请输入搜索关键字");
    }
    //从本地存储获取历史记录
     var arr = getHistory();

     
    
  
    //判断有没有重复项,删除重复项
    
     var index = arr.indexOf(key);
     if(index != -1){
       //说明有重复项
       arr.splice(index,1)
     }
     //数组的长度限制
     if(arr.length >=6){
       arr.pop();
     }
     //添加数组的最前面
     arr.unshift(key);
    //转成json字符串存在本地存储
    localStorage.setItem("search_list",JSON.stringify(arr));
     render();
     //重置input框里文本
     $(".search_input").val("");
     //点击搜索按钮跳转商品列表页
     location.href = "searchList.html?key="+ key;

     
     

  })
  
  
  
      
})