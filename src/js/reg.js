require(['config'],function(){
    require(['jQuery','common'],function($,common){
        jQuery($=>{

            // 用户名判断
            var regusername;
            var regpassword;
            var regrepass;
            
            // 判断重名用户
            var regbtn_isok;

            $('#regusername').blur(function(){
                regusername = $(this).val();
               
                // 内容为空 不提交
                if(!regusername == ""){
                    // 请求数据库判断
                    $.post('../api/reg.php',{username:regusername}, function(res){
                        var res = window.eval('('+res+')');
                    
                        $('#w_help-block').text(res.mess);
                        if(res.status){
                            regbtn_isok = true;
                            $('#w_help-block').css('color','#58bc58');
                           
                        }else{
            
                            regbtn_isok = false;
                            $('#w_help-block').css('color','#f30');
                        }
                    })
                }
            });

            // 确认密码
            $('#regrepass').blur(function(){
                console.log(regbtn_isok);
                regpassword = $("#regpassword").val();
                regrepass = $("#regrepass").val();
                if(regrepass==regpassword){
                    $('#w_help_repass').text('');
                    if(regbtn_isok){
                        $('#w_reg_btn').attr('disabled',false);
                    }else{
                        $('#w_reg_btn').attr('disabled',true);
                    }
                }else{
                    $('#w_help_repass').text('密码不一致').css('color','#f00');
                }
            })
            
            
            // 验证码
            var code = common.randomCode(4);
            $('#reg_nextcode').val(code);
            $('#reg_nextcode').on('click',function(){
                code = common.randomCode(4);
                $(this).val(code);
            });
            // 验证码判断
            $('#reg_code').blur(function(){
                var reg_code = $("#reg_code").val();
                var reg_nextcode = $("#reg_nextcode").val();
                if(reg_code==reg_nextcode){
                    $('#reg_help_code').text('');

                     // 用户注册
                    $('#w_reg_btn').click(function(){
                        regpassword = $("#regpassword").val();

                        // 请求数据库写入数据
                         $.post('../api/regWrite.php',{username:regusername,password:regpassword}, function(res){
                                var res = window.eval('('+res+')');
                              
                                if(res.status == true){
                                    regbtn_isok = false;
                                     if(window.confirm("用户注册成功,是否马上登录？")){

                                        window.location.href = "../html/login.html"
                                     }else{
                                         return false;
                                     }
                                 }else{
                                    if(window.confirm("用户注册失败")){
                                        return false;
                                    }else{
                                        return false;
                                    }
                                 }
                        
                        });
                    });

                    
                }else{
                     $('#reg_help_code').text('验证码错误').css('color','#f00');
                }
            })

        });
    });
});
