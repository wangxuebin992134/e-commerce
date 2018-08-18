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
            }
           }
         }
      }
 })
});