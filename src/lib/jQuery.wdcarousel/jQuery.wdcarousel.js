;(function($){
    jQuery.prototype.wdcarousel = function(obj){
        // 创建对象
        var Carousel = function(options){

            // 属性
            // 默认值
            let defaults = {
                ele: '',//必填参数
                imgs: [],//必传参数
                // 默认宽高
                width: 810,
                height: 320,
                index: 0,
                page:true,//是否显示分页
                pageNum:false,
                button: true,//左右按钮
                aaa:true,
                type: 'vertical',//默认模式
                seamless: true,//是否无缝滚动
                duration:3000 //默认轮播间隔时间
            }

            // 扩展默认函数
            this.opt = Object.assign({}, defaults,options);
            this.len = this.opt.imgs.length;
            // 用来区分无缝时的遍历次数
            this.lastNum = 0;
            // 初始化并传参数
            this.init(this.opt);
        }

        // 方法
        Carousel.prototype.init = function(opt){
            // 获取/生成元素
            // 绑定事件的元素
            this.ele = document.querySelector(opt.ele);
            // 指定专有属性
            this.ele.classList.add('wd-carousel');
            // 设置样式（宽高）
            this.ele.style.width = opt.width + 'px';
            this.ele.style.height = opt.height + 'px';

            // 生成图片(ul, li, img)
            let ul = document.createElement('ul');

            // 判断是否需要无缝
            
            if(opt.seamless){
                // 复制第一张到最后一张
                opt.imgs.push(opt.imgs[0]);
                this.len = opt.imgs.length;
                this.lastNum = 1;
            }
            // 给ul添加类型， 设置轮播类型
            ul.classList.add(opt.type);//horizontal,vertical,fade
            // 水平轮播图需要给ul加宽度
            if(opt.type === 'horizontal'){
                ul.style.width = opt.width * this.len + 'px';
            }else if(opt.type === 'fade'){
                ul.style.width = opt.width + 'px';
                ul.style.height = opt.height + 'px';
            }

            // 写入页面
            ul.innerHTML = opt.imgs.map(url => {
                return '<li><img src="'+url+'" width="'+opt.width+'" height="'+opt.height+'"></li>';
            }).join('');

            this.ele.appendChild(ul);
            // 分页
            if(opt.page){
                this.page = document.createElement('div');
                this.page.className = 'page';
                for(var i = 0; i < this.len - this.lastNum; i++){
                    var span =document.createElement('span');
                    // 往页码中写数字
                    if(opt.pageNum){
                        span.innerText = i + 1;
                    }

                    // 高亮页码
                    if(i === opt.index){
                        span.className = 'active';
                    }
                    this.page.appendChild(span);
                }

                this.ele.appendChild(this.page);
            }


            // 左右按钮
            if(opt.button){
                let btnPrev = document.createElement('span');
                btnPrev.className = 'btn-prev';
                btnPrev.innerHTML = '&lt';

                let btnNext = document.createElement('span');
                btnNext.className = 'btn-next';
                btnNext.innerHTML = '&gt';

                this.ele.appendChild(btnPrev);
                this.ele.appendChild(btnNext);
            } 

            //传递参数
            this.ul = ul;

            // 初始化
            // 页面进入自动轮播
            this.timer = setInterval(this.autoPlay.bind(this), opt.duration);
            this.play();


            // 鼠标移入移除效果
            this.ele.onmouseover = () => {
                this.stop();
            }
            this.ele.onmouseout = () => {
                this.timer = setInterval(this.autoPlay.bind(this), opt.duration);
            }


            // 点击分页切换
            this.ele.onclick = e => {
                if(e.target.parentNode.className === 'page'){
                    opt.index = e.target.innerText - 1;
                    this.play();
                }else if(e.target.className === 'btn-prev'){
                    opt.index--;
                    this.play();
                }else if(e.target.className === 'btn-next'){
                    opt.index++;
                    this.play();
                }
            }
        }
        Carousel.prototype.autoPlay = function(){
            this.opt.index++;
            this.play();
        }

        // 播放
        Carousel.prototype.play = function(){
            let opt = this.opt;

            // 到达最后一张后，重置到第一张
            if(opt.index >= this.len){
                // 无缝时 直接跳转 无动画效果
                if(opt.seamless){
                    this.ul.style.left = 0;
                }
                opt.index = this.lastNum;
            }else if(opt.index < 0){
                opt.index = this.len - 1 
            }

            var obj = {};

            // 水平
            if(opt.type === 'horizontal'){
                obj.left = -opt.index * opt.width;
                animate(this.ul, obj);
            }else if(opt.type === 'vertical'){
                obj.top = -opt.index * opt.height;
                animate(this.ul, obj);
            }else if(opt.type === 'fade'){
                for(var i = 0; i < this.len; i++){
                    animate(this.ul.children[i], {opacity:0});
                }
                animate(this.ul.children[opt.index], {opacity:1});
            }


            // 页码高亮
            if(this.page){
                for(var i = 0; i < this.len - this.lastNum; i++){
                    if(i === opt.index){
                        this.page.children[i].className = 'active';
                    }else{
                        this.page.children[i].className = '';
                    }
                    
                }
                // 只无缝时执行
                if(opt.seamless&&opt.index === this.len -1){
                    // 当滚动到最后一张的时候 页面高亮第一张
                    this.page.children[0].className = 'active';
                }
            }
        }


        // 停止
        Carousel.prototype.stop = function(){
            clearInterval(this.timer);
        }
        // 实例化传进来的对象
        new Carousel(obj)
    }


// 原生JS
/**
 * [获取元素的非内联样式]
 * @param  {[element]} ele  [元素]
 * @param  {[String]} attr [查找的样式属性]
 * @return {[String]}      [返回attr对应的属性值]
 */
function getCss(ele,attr){
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
}
// 缓冲效果 原生JS
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
            }, 40)
        })(attr);
    }
}

})(jQuery);