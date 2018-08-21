$(function () {
  var currentPage = 1;
  var pageSize = 5;
  //一进入页面进行渲染
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        var htmlStr = template("second-tpl", info);
        $(".lt_content tbody").html(htmlStr);
        //进行分页初始化
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          //注册每个页码点击事件
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();

          }
        })

      }
    })
  }
  //1.点击添加分类按钮
  $("#addCategory").click(function () {
    $("#addcateModal").modal("show");
    //请求一级分类名称，渲染下拉菜单
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var htmlStr = template("dropdownTpl", info);
        $(".dropdown-menu").html(htmlStr);


      }
    })
  })

  //通过注册委托事件,给a添加点击事件
  $(".dropdown-menu").on("click", "a", function () {
    var txt = $(this).text();
    $(".second-cate").text(txt);
    var id = $(this).data("id");
    // console.log(id);
    // 赋值给[name="categoryId"]inputk框
    $("[name='categoryId']").val(id);
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");

  })

  //3.配置文件上传插件，进行文件初始化
  $("#fileupload").fileupload({
    //指定数据类型为json
    dataType: "json",
    //当文件上传完成，响应回来时调用
    done: function (e, data) {
      console.log(data);
      var imgurl = data.result.picAddr;
      console.log(imgurl);
      // 设置图片地址
      $(".img-box img").attr("src", imgurl);
      // 将图片地址存储在隐藏域中
      $("[name='brandLogo']").val(imgurl);
      //手动改变当前表单的字段状态,获取表单校验的实例
      $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");

    }
  })
  // 4.配置表单校验初识化
  // 在注册事件监听的时候没有对隐藏域,支队普通元素进行监听，需要手动设置input检验状态
  $("#form").bootstrapValidator({
    //将默认的排除项重置掉(:默认会对hidden :disabled等进行排除)
    
    excluded:[],
    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请输入一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入二级分类名称"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传图片"
          }
        }
      },
      
    }
  })
  //注册校验成功事件，通过ajax进行提交
  $("#form").on("success.form.bv",function(e){
      //阻止表单的默认提交
      e.preventDefault();
      $.ajax({
        type:"post",
        url:"/category/addSecondCategory",
        data:$("#form").serialize(),
        dataType:"json",
        success:function(info){
          // console.log(info);
          if(info.success){
            //关闭模态框
            $("#addcateModal").modal("hide");
            //重置表单里面的内容和校验状态
            $("#form").data("bootstrapValidator").resetForm();
            currentPage = 1;
            render();
            //找到下拉菜单进行文本重置
            $(".second-cate").text("请选择一级分类");
            //找到图片重置
            $(".img-box img").attr("src","./images/none.png");

          }
          
        }
      })
  })




});