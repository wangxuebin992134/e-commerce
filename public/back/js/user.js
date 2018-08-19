$(function(){
 
  var currentPage = 1;
  var pageSize = 5;
  var isDelete;
  var currentId;
  render();
  function render(){
    $.ajax({
      type:"get",
      url:'/user/queryUser',
      data:{
        page: currentPage,
        pageSize:pageSize,
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
        var htmlStr = template("tpl",info);
        $(".table tbody").html(htmlStr);
          // 分页初始化
          $("#paginator").bootstrapPaginator({
            // 指定 bootstrap 的版本
            bootstrapMajorVersion: 3,
      
            totalPages: Math.ceil(info.total / info.size),
        
            currentPage: info.page,
          
            onPageClicked: function( a, b, c, page ) {
              
                currentPage = page;
              
                render();
            }
        });
   
        
      }
      
    })
  }
 
  $("tbody").on("click",".btn",function(){
     $("#userModal").modal("show");
   currentId = $(this).parent().data("id");
    //  console.log(currentId );
     
     isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    //  console.log(isDelete);
     
     
  })
  $("#submitBtn").click(function(){
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{
        id: currentId,
        isDelete:isDelete
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
        if(info.success){
          //关闭模态框
          $("#userModal").modal("hide");
          render();
        }
        
      }
      
    })
 })
})