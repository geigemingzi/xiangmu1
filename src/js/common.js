/**
 * [获取任意两个值间的随机数]
 * @param  {Number} min [最小值]
 * @param  {Number} max [最大值]
 */
function randomNumber(min,max){
    return parseInt(Math.random()*(max - min )+ 1) + min;
}


/**
 * [随机颜色]
 * @param  {[Number]} n [是否用16进制]
 * @return {[String]}   [颜色对应的值]
 */
function randomColor(n){
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
}


/**
 * 随机验证码
 * @param  {[number]} num [验证码个数]
 */
function randomCode(num){
    // 验证码是从str中提取
    var str = 'abcdefghijklnmopqrstuvwxyz0123456789';
    var _code = '';
    for(var i=0; i<num*1; i++){
        var index = parseInt(Math.random()*str.length);
        _code += str[index];   
    }
    return _code;
}





/**
 * [倒计时]
 * @param  {[string]}   end      [结束时间]
 * @param  {Function} callback [结束时执行的函数]
 */
function showTime(end,callback){
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

/**
 * [获取元素的非内联样式]
 * @param  {[element]} ele  [元素]
 * @param  {[String]} attr [查找的样式属性]
 * @return {[String]}      [返回attr对应的属性值]
//  */
// function getCss(ele,attr){
//     var res;
//     if(getComputedStyle){
//         res = getComputedStyle(ele)[attr];
//     }
//     else if(ele.currentStyle){
//         res = ele.currentStyle[attr];
//     }
//     else{
//         res = ele.style[attr];
//     }
//     return res;
// }


/**
 * [绑定事件的方法，兼容IE8-]
 * @param  {Element}  ele       [绑定事件的元素]
 * @param  {String}  type      [事件类型]
 * @param  {Function}  handler   [事件处理函数]
 * @param  {Boolean} isCapture [是否捕获]
 */
function bind(ele,type,handler,isCapture){
    // 标准浏览器
    if(ele.addEventListener){
        ele.addEventListener(type,handler,isCapture);
    }
    // IE8- 
    else if(ele.attachEvent){
        ele.attachEvent('on' + type,handler);
    }
    // DOM节点绑定方式
    else{
        ele["on" + type] = handler;
    }
}




// 有关cookie
var Cookie = {
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



/**
 * 动画函数
 * @param  {[Element]}   ele      [动画元素]
 * @param  {[Object]}   opt      [动画属性与目标值]
 * @param  {Function} callback [回调函数]
 */
function animate(ele, opt, callback){
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
}




// 轮播图封装
/**
 * [bannerAll 轮播图封装]
 * @param  {[element]} banner   [轮播图的box]
 * @param  {[number]} timeLong [切换时间]
 * @param  {[boolean]} btn      [是否需要切换按钮]
 */
function bannerAll(banner, timeLong, btn){
    // 时间一定是number
    let timeLing = timeLong*1;

    let ul = banner.children[0];
    // 复制第一张到最后
    ul.appendChild(ul.children[0].cloneNode(true));

    // 页码
    let len = ul.children.length;

    ul.style.width = banner.clientWidth*len + 'px';

    let index = 0;

    // 判断是否需要左右按钮
    if(btn == true){
        // 添加左右按钮
        let btnPrev = document.createElement('span');
        btnPrev.classList.add('btnPrev');
        btnPrev.innerHTML = '&lt;';
        let btnNext = document.createElement('span');
        btnNext.classList.add('btnNext');
        btnNext.innerHTML = '&gt;';
        banner.appendChild(btnPrev);
        banner.appendChild(btnNext);

        // 上一张下一张
        banner.onclick = e =>{
                if(e.target.className === 'btnPrev'){
                    index++;
                    show();
                }else if(e.target.className === 'btnNext'){
                    index++;
                    show();
                }
        }
    }

    // 添加页码
    let page = document.createElement('div');
    page.className = 'page';
    var content = '';
    // 往page中添加页面
    for(let i=0; i<len-1; i++){
        content += '<span>'+(i+1)+'</span>'
    }
    page.innerHTML = content;
    page.children[index].className = 'active';
    banner.appendChild(page);


    // 动画效果
    let timer = setInterval(autoPlay, timeLong);
    // 鼠标移入移除效果
    banner.onmouseover = function(){
        clearInterval(timer);

    }
    banner.onmouseout = function(){
        timer = setInterval(autoPlay, timeLong);
    }

    function autoPlay(){
        index++;
        show();
    }

    function show(){

        // 判断终点
        if(index >= len){
            // 当完成复制图片时
            ul.style.left = 0;
            index = 0;
        }else if(index < 0){

            index = len - 1;
        }
        // 目标值
        let target = -index*banner.clientWidth;
        // 调用动画函数
        animate(ul, {left: target});

        // 高亮页码
        for(let i=0; i<len-1; i++){
            if(i === index){
                page.children[i].className = 'active';
            }else{
                page.children[i].className = '';
            }
        }

        if(index === len-1){
            page.children[0].className = 'active';
        }
    }

}