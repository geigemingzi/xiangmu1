<?php

    include "DBHelper.php";

    $username = isset($_POST["username"]) ? $_POST["username"] : "";
    $password = isset($_POST["password"]) ? $_POST["username"] : "";
    
    $sql = "select * from juanpiuser where username = '$username' and password = '$password'";

    $result = query_oop($sql);

    if($result){
         $user = json_encode($result, JSON_UNESCAPED_UNICODE);
        echo "{status:true, username:$user}";
    }else{
        echo "{status:false, mess:'用户名或密码错误'}";
    }
?>