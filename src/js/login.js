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
                    // 获取账号信息
                    
                    var user = res.username[0];
                    // 登录成功跳转首页
                    if(res.status){
                        // 清除错误提示
                        $('#w_help_login').text("");

                        var w_userlist = [];

                        w_userlist.unshift(user);
                        console.log(w_userlist);
                        // 1天后删除获取时间
                        var now = new Date();
                        var date = now.getDate();
                        now.setDate(date+1);

                        document.cookie = 'w_userlist=' + JSON.stringify(w_userlist) + ';expires' + now;

                        window.location.href = "../index.html?userisok="+user.username;
                    }
                    else{
                        $('#w_help_login').text(res.mess).css("color","#f30");
                    }
                })
                
            }
        })

    });
})();