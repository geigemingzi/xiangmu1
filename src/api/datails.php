<?php
    include 'DBHelper.php';

    $id = isset($_POST["goodsidx"]) ? $_POST["goodsidx"] : "";

    $sql = "select * from goodslist where idx = '$id'";

    $result = query_oop($sql);
    // 对象转字符串
    $data = json_encode($result);
    if($data){
        echo "{status:true,data:$data}";
    }else{
        echo "{status:false, mess:'获取失败'}";
    }
?>