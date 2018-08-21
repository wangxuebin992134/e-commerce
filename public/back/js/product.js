$(function () {
  var currentPage = 1;//当前页
  var pageSize = 2;//一页有多少条
  var picArr = [];//用于存储上传的图片对象
  //1.一进入页面发送ajax请求进行渲染
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var htmlStr = template("pro-Tpl", info);
        $(".lt_content tbody").html(htmlStr);
        //进行分页初识化
        $("#paginator").bootstrapPaginator({
          //指定版本
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          size: "normal",
          //给下面的页码添加点击事件
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          },
          //配置每个按钮的文字
          //每个按钮都会调用一次这个方法,他的返回值就是按钮的文本内容
          //参数1：type取值为 first首页 last尾页 pre 上一页 next 下一页 page普通页码
          //参数2: page 当前按钮所指的页码
          //参数3: current 当前页
          itemTexts: function (type, page, current) {
            // console.log(arguments);//获取所有参数列表
            switch (type) {
              case "first": {
                return "首页";
              }
              case "last": {
                return "尾页";
              }
              case "pre": {
                return "上一页";
              }
              case "next": {
                return "下一页";
              }
              case "page": {
                return page;
              }
            }
          },
          //配置提示提示信息
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case "first": {
                return "首页";
              }
              case "last": {
                return "尾页";
              }
              case "pre": {
                return "上一页";
              }
              case "next": {
                return "下一页";
              }
              case "page": {
                return "前往第" + page + "页";
              }
            }
          },
          //使用bootstrap的提示框组件
          useBootstrapTooltip: true
        })


      }
    })
  }
  //2.点击添加商品按钮，显示模态框
  $("#addBtn").click(function () {
    $("#addModal").modal("show");
    //发送ajax请求，请求二级分类数据，进行下拉菜单渲染
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100

      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var htmlStr = template("dropdown-Tpl", info);
        $(".dropdown-menu").html(htmlStr);


      }
    })
  })
  //3.注册事件委托，给a注册点击事件
  $('.dropdown-menu').on("click", "a", function () {
    var txt = $(this).text();
    $(".second-cate").text(txt);
    var id = $(this).data("id");
    $('[name="brandId"]').val(id);
    $("#form").data("bootstrapValidator").updateStatus("brandId","VALID");
  })
  //4.配置文件上传插件，进行文件上传初始化
  $("#fileupload").fileupload({
    //返回数据类型
    dataType: "json",
    //上传完图片，响应的回调函数
    //每一张图片上传完成，都会响应一次
    done: function (e, data) {
      console.log(data);
      //获取图片地址对象
      var picObj = data.result;
      //获取图片地址
      var picAddr = picObj.picAddr;
      //获得的新图片对象添加到数组的最前面
      picArr.unshift(picObj);
      console.log(picArr);
      //新的图片应该添加到img-box的前面
      $('.img-box').prepend('<img  width="100px"  src="' + picAddr + '" alt="" >');
      if (picArr.length > 3) {
        picArr.pop();
        $(".img-box img").eq(-1).remove();
       
      }
      if(picArr.length === 3){
        $("#form").data("bootstrapValidator").updateStatus("picStatus","VALID");
      }


    }
  })
  //5.配置表单校验
  $("#form").bootstrapValidator({
    //默认不指定的校验，重置掉
    excluded: [],
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请输入二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式必须以非零形式开头'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
     picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }

    }
  })
  //6.注册验证成功事件
  $("#form").on("success.form.bv",function(e){
    //阻止表单默认提交行为
    e.preventDefault();
    var params = $("#form").serialize();
    params += "&picName1="+picArr[0].picName+"&picAddr1= "+ picArr[0].picAddr ;
    params += "&picName2="+picArr[1].picName+"&picAddr2= "+ picArr[1].picAddr ;
    params += "&picName3="+picArr[2].picName+"&picAddr3= "+ picArr[2].picAddr ;


    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:params,
      dataType:"json",
      success:function(info){
        // console.log(info);
        if(info.success){
          //关闭模态框
          $("#addModal").modal("hide");
          //重置表单的内容和表单的校验
          $("#form").data("bootstrapValidator").resetForm();
          currentPage = 1;
          render();
          //重置下拉菜单的文本内容
          $(".second-cate").text("请选择二级分类");
          //删除所有图片
          $(".img-box ").remove();
          //重置数组
          picArr = [];
          
        }
        
      }
    })

  })
});