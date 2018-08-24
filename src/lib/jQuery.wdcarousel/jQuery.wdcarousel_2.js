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
                button: true,
                type: 'vertical',
                seamless: true,//是否无缝滚动
                duration:3000 //轮播间隔时间
            }

            // 扩展默认函数
            this.opt = Object.assign({}, defaults,options);
            this.len = this.opt.imgs.length;

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
                for(var i = 0; i < this.len; i++){
                    var span =document.createElement('span');
                    span.innerText = i + 1;

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
                opt.index = 0;
            }else if(opt.index < 0){
                opt.index = this.len - 1;
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
                for(var i = 0; i < this.len; i++){
                    this.page.children[i].className = '';
                }
                this.page.children[opt.index].className = 'active';
            }
        }


        // 停止
        Carousel.prototype.stop = function(){
            clearInterval(this.timer);
        }
    
        new Carousel(obj)
    }
})(jQuery);