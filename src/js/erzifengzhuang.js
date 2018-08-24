
var http = {
    baseUrl:"http://10.3.137.226:84",

    filterUrl:function(url){
                if(url.startsWith("http")){
                    return url;
                }else{
                    return this.baseUrl + url;
                }
    },  

    get:function(url,params,callback){
                url = this.filterUrl(url);
                $.ajax({ 
                    url:url,
                    data:params || {},
                    type:"get",
                    headers:{
                        Authorization:window.localStorage.getItem("access_token")
                    },
                    beforeSend:function(){

                    },
                    success:function(res){
                        callback(res);
                    },
                    complete:function(){
                        // $(".mask").hide();
                    },
                    error:function(){
                        console.log(error);
                    }
                });
    },



    post:function(url,params,callback){
        url = this.filterUrl(url);
        $.ajax({
                url:url,
                data:params,
                type:"post",
                headers: {
                            Authorization: "Bearer " + window.localStorage.getItem('access_token')
                },
                beforeSend:function(){
                    $(".mask").show();
                },
                success:function(res){
                    callback(res);
                },
                complete:function(){
                    $(".mask").hide();
                }

        });
    }
}
