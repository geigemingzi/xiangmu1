(function(){

    jQuery($=>{
        $('.list_toolbar').load('w_header.html #t_toolbar');
        $('.list_header').load('w_header.html #t_header');
        $('.list_r_nav').load('w_header.html #t_r_nav');
        $('.list_bottom').load('w_header.html #w_bottom');



        // 请求数据生成列表
        $.post('../api/index.php',function(res){
            // console.log(res);
            $data = res;
            // 生成商品列表
           var listLi = $data.map(function(item){
                return `<li data-num="${item.idx}">
                        <div class="w_newgoods_imgbox">
                            <img data-src="..\/${item.imgUrl}" class="w_newgoods_imgbox_img"/>
                            <span><i class="glyphicon glyphicon-heart"></i></span>
                        </div>
                        <div>
                            <span class="w_newgoods_price f18">￥${item.price}</span>
                            <span class="w_newgoods_favorable f12"><del>￥${item.favorable}</del></span>
                        </div>
                        <div class="f12">
                            <span class="w_newgoods_name">${item.name}</span>
                            <span class="w_newgoods_pricetime fr">剩余19小时</span>
                        </div>
                    </li>`
            }).join("");
            // 写入页面
            $('#w_newgoods_list').html(listLi);

            // 懒加载
            var imgs = $('.w_newgoods_imgbox_img');
            addInimg()
            $(window).scroll(addInimg);
            
            function addInimg(){
                // 懒加载图片
                var scrollTop = $(window).scrollTop();
                var winHeight = $(window).height();

                    for(var i = 0; i < imgs.length; i++){
                        
                        // 判断 图片到达可视局域
                        if(imgs.eq(i).offset().top < scrollTop + winHeight){
                            // 把自定义属性链接 赋给 src
                            imgs.eq(i).attr('src',imgs.eq(i).attr('data-src'));
                        }
                    }
            }


            // 事件委托实现边框高亮
            $('#w_newgoods_list li').hover(function(){
                
                $(this).addClass("liborder");
            },function(){
                $(this).removeClass("liborder");
            })
        },"json");
        


        
        $(window).scroll(function(){
            
            // 吸顶菜单效果
            var scrollY = $(this).scrollTop();
            // 滚动距离后出现滚动条
            if(scrollY >= 300){
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

       


        // 页面跳转 到详情页
        $('#w_newgoods_list').on('click','li',function(e){
            // 获取商品编号
            var num = $(this).attr('data-num');

            // 跳转页面
            window.location.href = 'datails.html?' + num;
        });
    });
})();