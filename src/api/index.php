<?php

    // 链接数据库
    // 引用
    include 'DBHelper.php';

    $sql = "select * from goodslist";

    // DBhelper 方法
    $result = query_oop($sql);


     if($result){
        $list = json_encode($result, JSON_UNESCAPED_UNICODE);
        echo $list;
       
    } else {
         echo "{state: false, message: '登录失败！！！'}";
        
    }

?>