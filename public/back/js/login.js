$(function(){
 $("#form").bootstrapValidator({
     // 配置校验图标
     feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
      },

      fields:{
        username:{
            validators:{
              notEmpty:{
                message:"用户名不能为空"
              },
              stringLength:{
                min:2,
                max:6,
                message: "用户名长度必须在 2-6 位"
              },
              callback:{
                message:"用户名不存在"
              }
            }
           

          },
         password:{
           validators:{
             notEmpty:{
               message:"密码不能为空"
             },
             stringLength:{
              min:6,
              max:12,
              message:"密码长度必须在6-12位"
            },
            callback:{
              message:"密码错误"
            }

           }
         }
      }
 })
 $()
 //表单验证成功，会默认提交表单，阻止默认提交
 $("#form").on('success.form.bv',function(e){
    e.preventDefault();
    //使用ajax发送请求
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$("#form").serialize(),
      success:function(info){
         console.log(info);
        if(info.success){
           location.href= "index.html";
           
        }
        if(info.error === 1000){
          $('#form').data("bootstrapValidator").updateStatus("username", "INVALID",'callback');



        }
        if(info.error=="1001"){
          $("form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
        }
         
      }

    });
    //重置功能
    $([type="reset"]).click(function(){
      
        $("#form").data('bootstrapValidator').resetForm();
    })

 })
 
});