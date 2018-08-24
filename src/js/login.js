(function(){
    jQuery($=>{

        // 用户登录
        $('#login_btn').on('click',function(){
            var username = $('#login_username').val();
            var password = $('#login_password').val();

            // 不为空
            if(!username=="" && !password == ""){
                // 发起请求
                $.post('../api/login.php',{username:username,password:password},function(res){
                    var res = window.eval('('+res+')');

                    // 登录成功跳转首页
                    if(res.status){
                        // 清除错误提示
                        $('#w_help_login').text("");

                        // 免登录
                        
                        window.location.href = "../index.html";
                    }
                    else{
                        $('#w_help_login').text(res.mess).css("color","#f30");
                    }
                })
                
            }
        })

    });
})();