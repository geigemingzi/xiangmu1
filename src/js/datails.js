require(['config'],function(){
    require(['jQuery','cookie','wdzoom'],function($,Cookie){
        jQuery($=>{
            // 请求头部和底部
            $('.datails_toolbar').load('w_header.html #t_toolbar');
            $('.datails_header').load('w_header.html #t_header');
            
            $('.datails_bottom').load('w_header.html #w_bottom');

            //放大镜
            $('.wd_goods').wdzoom({width:300,height:200});
            $('.small').on('click','img',function(){
                $('.wd_goods img').attr({
                    'src':this.src,
                    'data-big':this.dataset.big
                });
            });
           

           // showtxt
           // 加载w_header 里面的右边导航栏的购物车元素
            var $w_header_car = $('#w_header_car');

           // 获取 data-num 得到 
           var str = location.search; //=> ?data-num
           var num  = str.slice(1);//去掉 ?
           
           // 通过data-num 发起请求获取对应数据
           $.post('../api/datails.php', {goodsidx:num},function(res){
                var res = window.eval('('+res+')');
                // 拿到数据对象
                var data = res.data[0];
                // console.log(data);
                // 写入对应位置
                $('.exhibits_name').text(data.name);
                $('.exhibits_img').attr({src:'../'+data.imgUrl, 'data-big':'../'+data.imgUrl});
                $('.exhibits_price').text('￥'+data.price);
                $('.exhibits_favorable').html('￥<del>'+data.favorable+'</del>');
                $('.exhibits_min_img').html('<img  src="../'+data.imgUrl+'"/> <span>黑色</span>');

                // 点击加入购物车效果
                var goodscookie = Cookie.get('goodscookie');
                // 判断cookie
                if(goodscookie === ""){
                    goodscookie = []
                }else{
                    goodscookie = JSON.parse(goodscookie);
                }
                // 7天后删除获取时间
                var now = new Date();
                var date = now.getDate();
                now.setDate(date+7);

                $('.goods_showcar').click(function(){
                    // 创建图片并写样式和定位
                    var $carimg = $('<img/>').addClass('fly_car').attr({src:'../'+data.imgUrl}).appendTo('body');
                    $carimg.css({
                        'width':'30px',
                        'position':'absolute',
                        'top':$(this).offset().top,
                        'left':$(this).offset().left,
                    })

                    // 加载w_header 里面的右边导航栏的购物车元素
                    $carimg.animate({
                        'top':$w_header_car.offset().top,
                        'left':$w_header_car.offset().left
                    },1000);

                    var has = goodscookie.some(function(item,i){
                        
                        return item.idx === data.idx;
                    })

                    if(has){
                        // 把数量加一
                        data.qty ++
                    }else{
                        // 把数量也写进商品数据对象里面
                        data['qty'] = amount;
                        goodscookie.unshift(data);
                    }

                    // 写入cookie
                    document.cookie = 'goodscookie=' + JSON.stringify(goodscookie) + ';expires' + now;

                });
           });

           // 商品数量的加减
           var amount = $('#goods_num_inport').val();
           $('#goods_num_sub').click(function(){
                if(amount > 0){
                        amount --
                        $('#goods_num_inport').val(amount);
                    }else{
                        amount = 0;
                        $('#goods_num_inport').val(amount);
                    }
           });
           $('#goods_num_add').click(function(){
                amount++;
                $('#goods_num_inport').val(amount);
           });


           // 点击购物车去结算页面
            $w_header_car.on('click',function(){
                window.location.href = 'shoppingcart.html';
            })

        });
    });
});
