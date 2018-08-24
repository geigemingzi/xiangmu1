<?php

    include "DBHelper.php";

    $username = isset($_POST["username"]) ? $_POST["username"] : "";
    $password = isset($_POST["password"]) ? $_POST["username"] : "";

    $sql = "select * from juanpiuser where username = '$username' and password = '$password'";


    $result = query_oop($sql);

    if($result){
        echo "{status:true, mess:'登录成功'}";
    }else{
        echo "{status:false, mess:'用户名或密码错误'}";
    }
?>