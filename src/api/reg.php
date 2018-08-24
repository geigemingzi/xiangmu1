<?php
    include 'DBHelper.php';

    $regusername = isset($_POST["username"]) ? $_POST["username"] : "";

    $sql = "select * from juanpiuser where username = '$regusername'";

    $result = query_oop($sql);
    if(!$result){
        echo "{status:true, mess:'用户名合法'}";
    }else{
        echo "{status:false, mess:'用户名已存在'}";
    }
?>