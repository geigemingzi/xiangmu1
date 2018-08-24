(function(){

    jQuery($=>{

        // 轮播图
        
        $('.w_main_banner').wdcarousel({
            ele: '.w_main_banner',
            width: 700,
            height: 360,
            type: 'horizontal',//horizontal,vertical,fade
            // pageNum:true,
            seamless: true,
            imgs: ["../img/goodsImg//flash-sale/index_banner (1).jpg","../img/goodsImg//flash-sale/index_banner (1).png","../img/goodsImg//flash-sale/index_banner (2).jpg","../img/goodsImg//flash-sale/index_banner (1).png"]
        });

        // 获取ul
        let $w_newgoods_list = $('#w_newgoods_list');

        $.post('api/index.php',function(res){
            // console.log(res);
            $data = res;

            // 生成商品列表
           var listLi = $data.map(function(item){
                return `<li data-num="${item.idx}">
                        <div class="w_newgoods_imgbox">
                            <img data-src="${item.imgUrl}" class="w_newgoods_imgbox_img"/>
                            <span><i class="glyphicon glyphicon-heart"></i></span>
                        </div>
                        <div>
                            <span class="w_newgoods_price f14">${item.price}</span>
                            <span class="w_newgoods_favorable f12"><del>${item.favorable}</del></span>
                        </div>
                        <div class="f12">
                            <span class="w_newgoods_name">${item.name}</span>
                            <span class="w_newgoods_pricetime fr">剩余19小时</span>
                        </div>
                    </li>`
            }).join("");
            // 写入页面
            $w_newgoods_list.html(listLi);


            // 懒加载图片
            var imgs = $('.w_newgoods_imgbox_img');
            $(window).scroll(function(){
                var scrollTop = $(window).scrollTop();
                var winHeight = $(window).height();

                for(var i = 0; i < imgs.length; i++){
                    // 判断 图片到达可视局域
                    if(imgs.eq(i).offset().top < scrollTop + winHeight){
                        // 把自定义属性链接 赋给 src
                        imgs.eq(i).attr('src',imgs.eq(i).attr('data-src'));
                    }
                }
            })



            // 事件委托实现边框高亮
            $('#w_newgoods_list li').hover(function(){
                
                $(this).addClass("liborder");
            },function(){
                $(this).removeClass("liborder");
            })
            
        },"json");
        
         // 吸顶菜单效果
        $(window).scroll(function(){
            var scrollY = $(this).scrollTop();

            // 滚动距离后出现滚动条
            if(scrollY >= 1400){
                // 添加类名 然后写样式
                // 
                $('.ceiling_menubox').addClass("celiing_fixed");
                $('.ceiling_menubox_msg').addClass("ceiling_msg");
               
            }else{
                // 删除类名
                $('.ceiling_menubox').removeClass("celiing_fixed");
                $('.ceiling_menubox_msg').removeClass("ceiling_msg");
            }
        });


        // 点击跳转详情页
        $w_newgoods_list.on('click','li',function(e){
            // 获取商品编号
            var num = $(this).attr('data-num');

            // 跳转页面
            window.location.href = 'html/datails.html?' + num;
        })

    });
})();
