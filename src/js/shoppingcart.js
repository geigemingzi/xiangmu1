(function(){

    jQuery($=>{

        $('.cart_header').load('../html/w_header.html #t_toolbar');
        $('.cart_bottom').load('../html/w_header.html #w_bottom');

        // 获取cookie
        var goodslist =JSON.parse(Cookie.get('goodscookie'));
        // 写入页面
        // 生成商品列表 
        create()
        function create(){
            var listLi = goodslist.map(function(item){
            var chajia = item.favorable-item.price
            return `<div class="cart_goods" data-num="${item.idx}">
                        <div><input type="checkbox" class="cart_check"/></div>
                        <div><img src="../${item.imgUrl}"/></div>
                        <div>
                            <p>${item.name}</p>
                            <p><span>XL，黑色</span></p>
                            
                        </div>
                        <div>
                            <span>￥${item.price}</span><span class="cart_goods_price_color"><em>/</em><span>￥${chajia}</span></span>
                        </div>
                        <div>
                            <div class="goods_number">
                                <input type="button" value="-" class="goods_num_sub"/>
                                <input type="text"  class="goods_num_inport" value="${item.qty}" />
                                <input type="button" value="+" class="goods_num_add"/>
                            </div>
                        </div>
                        <div>￥<span>${item.price*item.qty}</span></div>
                        <div><i class="glyphicon glyphicon-trash cart_del_btn"></i></div> 
                    </div>`
            }).join("");
            // 写入页面
            $('.cart_list').html(listLi);
        }


        //数量的改变
        //商品数量的加减
       var amount;
       $('.goods_num_sub').click(function(){
           amount = $(this).next(".goods_num_inport").val()
            if(amount > 0){
                    amount --
                    $(this).next('.goods_num_inport').val(amount);
                }else{
                    amount = 0;
                    $(this).next('.goods_num_inport').val(amount);
                }
            // 改变对象里面的qty
            var idx = $(this).parents('.cart_goods').attr('data-num');

            goodslist.some(function(item,i){
                if(item.idx == idx){
                    item.qty = amount;
                }
            });

       });
       $('.goods_num_add').click(function(){
            amount = $(this).prev(".goods_num_inport").val()
            amount++;
            $(this).prev('.goods_num_inport').val(amount);
            var idx = $(this).parents('.cart_goods').attr('data-num');
            goodslist.some(function(item,i){
                if(item.idx == idx){
                    item.qty = amount;
                }
            });
       });


       // 删除商品
       $('.cart_list').on('click','.cart_del_btn',function(){
            // 出现弹窗

            if(window.confirm("你是否选择删除该商品")){

                // 获取删除商品的编号
                var $num = $(this).parents(".cart_goods").attr('data-num');
                // console.log($num)
                // 查找对应编号的对象
                var idx;
                var has = goodslist.some(function(item,i){
                        idx = i;
                        return item.idx === $num;
                    })
                if(has){
                    // 删除数组对应商品    
                    goodslist.splice(idx,1);
                    // 修改对应cookie
                    Cookie.set('goodscookie',JSON.stringify(goodslist));
                    // 重新生成列表
                    create()
                }
            }

       })

      

       // 价格计算
       var cart_list_num = $('.cart_list_num');//数量
       var cart_list_price = $('.cart_list_price');//价格
       var cart_list_favorable = $('.cart_list_favorable');//满减
       var cart_list_sum = $('.cart_list_sum');//最后价格


       // 判断被选中的商品
       $('.cart_check').click(xuan);

        function xuan(){
            // 判断状态
            var w_pitch = this.checked;
            
            // 获取页面的总计
            var list_num = cart_list_num.text()*1;
            var list_price = cart_list_price.text()*1;
            var list_favorable = cart_list_favorable.text()*1;
            var list_sum = cart_list_sum.text()*1;

            // 获取对应商品的编号
            var idx = $(this).parents(".cart_goods").attr('data-num');
            // 查找商品
            goodslist.some(function(item,i){
                    // 判断对应商品
                    if(item.idx == idx){
                        // 选中加 不选减
                        if(w_pitch){
                            list_num += item.qty*1;
                            list_price += item.price*item.qty*1;
                            list_favorable += item.favorable*item.qty*0.1;
                            
                        }else{
                            list_num -= item.qty*1;
                            list_price -= item.price*item.qty*1;
                            list_favorable -= item.favorable*item.qty*0.1;
                        }

                        // 总价
                        list_sum = list_price - list_favorable

                        // 写入页面
                        cart_list_num.text(list_num);
                        cart_list_price.text(list_price);
                        cart_list_favorable.text(list_favorable);
                        cart_list_sum.text(list_sum);
                    }
                }) 
       }


        // 全选
       $('.cart_Allcheck').click(function(){ 
            var All = this.checked;
            $(':checkbox').attr('checked',All);
       });
    
    });
})();