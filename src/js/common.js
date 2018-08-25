// 模块化定义
define(function(){
    return{
        /**
         * [获取任意两个值间的随机数]
         * @param  {Number} min [最小值]
         * @param  {Number} max [最大值]
         */
        randomNumber : function (min,max){
            return parseInt(Math.random()*(max - min )+ 1) + min;
        },

        /**
         * [随机颜色]
         * @param  {[Number]} n [是否用16进制]
         * @return {[String]}   [颜色对应的值]
         */
        randomColor : function (n){
            if(n===16){
                var str = '0123456789abcdef';
                var color = '#';
                for(var i=0;i<6;i++){
                    // 随机获取一个字符
                    var idx = parseInt(Math.random()*str.length);
                    color += str[idx];
                }
                return color;
            }else{
                    var r = parseInt(Math.random()*256);
                    var g = parseInt(Math.random()*256);
                    var b = parseInt(Math.random()*256);

                    return 'rgb('+r+','+g+','+b+')';
            }
        },
        /**
         * 随机验证码
         * @param  {[number]} num [验证码个数]
         */
        randomCode : function (num){
            // 验证码是从str中提取
            var str = 'abcdefghijklnmopqrstuvwxyz0123456789';
            var _code = '';
            for(var i=0; i<num*1; i++){
                var index = parseInt(Math.random()*str.length);
                _code += str[index];   
            }
            return _code;
        },

        /**
         * [获取元素的非内联样式]
         * @param  {[element]} ele  [元素]
         * @param  {[String]} attr [查找的样式属性]
         * @return {[String]}      [返回attr对应的属性值]
         */
        getCss : function(ele,attr){
            var res;
            if(getComputedStyle){
                res = getComputedStyle(ele)[attr];
            }
            else if(ele.currentStyle){
                res = ele.currentStyle[attr];
            }
            else{
                res = ele.style[attr];
            }
            return res;
        },

        /**
         * 动画函数
         * @param  {[Element]}   ele      [动画元素]
         * @param  {[Object]}   opt      [动画属性与目标值]
         * @param  {Function} callback [回调函数]
         */
        animate : function (ele, opt, callback){
            // 使用属性timerLen记录定时器数量
            ele.timerLen = 0;

            for(var attr in opt){
                ele.timerLen++;
                (function(attr){
                    // 防止同名定时器覆盖
                    var timerName = attr + 'Timer';
                    var target = opt[attr];
                    // 添加前先清除同名定时器
                    clearInterval(ele[timerName]);
                    ele[timerName] = setInterval(function(){
                        // 获取当前值
                        var current = getCss(ele, attr);
                        //提取单位 
                        var unit = current.match(/[a-z]*$/)[0];
                        // 提取当前值
                        current = parseFloat(current);
                        // 计算缓冲速度
                        var speed = (target - current)/10;
                        // 针对opacity属性操作
                        if(attr === 'opacity'){
                            speed = speed>0? 0.05 : -0.05; 
                        }else{
                            // 避免speed 过小
                            speed = speed>0? Math.ceil(speed) : Math.floor(speed);
                        }

                        current = current + speed;
                        // 目标判断
                        if(current === target){
                            clearInterval(ele[timerName]);
                            // 重置当前值
                            current = target;
                            ele.timerLen--;
                            // 完成动画后执行回调函数
                            if(typeof callback === 'function' && ele.timerLen === 0){
                                callback();
                            }
                        }
                        ele.style[attr] = current + unit;
                    }, 30)
                })(attr);
            }
        },

        /**
         * [倒计时]
         * @param  {[string]}   end      [结束时间]
         * @param  {Function} callback [结束时执行的函数]
         */
        showTime : function(end,callback){
            // 拿当前时间和结束时间比较
            var offset = Date.parse(end) - Date.now();
            offset = parsetInt(offset/1000);
            // 结束倒计时
            if(offset <= 0){
                clearInterval(timer);
                if(typeof callback === 'function'){
                    callback();
                }
            }

            var sec = offset%60;//剩余秒数
            var min = parseInt(offset/60)%60;//剩余分数
            var hour = parseInt(offset/60/60)%24;//剩余小时数
            var day = parseInt(offset/60/60/24);//天数

            var sec = offset%60;//剩余秒数
            var min = parseInt(offset/60)%60;//剩余分数
            var hour = parseInt(offset/60/60)%24;//剩余小时数
            var day = parseInt(offset/60/60/24);//天数

            // 补0操作
            sec = sec<10 ? '0'+sec : sec;
            min = min<10 ? '0'+min : min;
            hour = hour<10 ? '0'+hour : hour;

            return day + '天' + hour + '时' + min + '分' + sec + '秒'
        }

    }
});























