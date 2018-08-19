$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render(){
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
          var htmlStr = template("first-tpl",info);
          $(".lt_content tbody").html(htmlStr);
          // 分页结构
          $("#paginator").bootstrapPaginator({
             //设置版本
             bootstrapMajorVersion:3,
             currentPage:info.page,
             totalPages:Math.ceil(info.total/info.size),
             onPageClicked:function(a,b,c,page){
                // console.log(page);
                 currentPage = page;
                 render();

                
             }
          })
          
       }
    })
  }
  //点击添加分类
  $("#addCategory").click(function(){
     $("#addModal").modal("show");
  })
  //配置校验字段和状态
  $("#form").bootstrapValidator({
     // 配置校验图标
     feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
      },

     fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类名称"
          }
        }
      }
     }
  })
  //表单验证成功会默认提交表单，阻止表单默认提交，使用ajax提交
  $("#form").on("success.form.bv",function(e){
      e.preventDefault();
      $.ajax({
        type:"post",
        url:"/category/addTopCategory",
        data:$("form").serialize(),
        dataType:"json",
        success:function(info){
          // console.log(info);
          if(info.success){
            //关闭模态框
            $("#addModal").modal("hide");
            render();
          }
          
        }
      })
  })
});