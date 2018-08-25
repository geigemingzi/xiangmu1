define(function(){
    // 有关cookie
    return {
        get: function(name){
            // 获取所有cookie
            var cookies = document.cookie;
            // 转成数组
            cookies = cookies.split('; ');

            var res = '';
            for(var i=0; i<cookies.length; i++){
                // 拆分cookiename和 cookievalue
                var arr = cookies[i].split('=');
                if(arr[0] === name){
                    res = arr[1];
                    break;
                }
            }
            return res;
        },

        /**
         * 设置/修改cookie
         * @param {[string]} name  [cookie名]
         * @param {[string]} value [cookie值]
         * @param {[Object]} param [cookie参数]
            * expires:Date
            * path：String
            * domain：String
            * secure：Boolean
         */
        set: function(name, value, param){
            var cookie = name + '=' + value;
            if(param){
                // 有效期
                if(param){
                    cookie += ';expires=' + param.expires.toUTCString();
                }
                // 保存路径
                if(param.path){
                    cookie += ';path' + param.path;
                }
                // 域名
                if(param.domain){
                    cookie += ';domain' + param.domain;
                }
                // 安全性
                if(param.secure){
                    cookie += ';secure'
                }
            }

            document.cookie = cookie;
        },

        remove: function(name, path){
            // 设置过期时间达到删除效果
            var now = new Date();
            now.setDate(now.getDate() - 1);
            this.set(name, null, {expires: now, path: path});
        }
    }
});