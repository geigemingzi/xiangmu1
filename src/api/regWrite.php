<?php
    include 'DBHelper.php';

    $regusername = isset($_POST["username"]) ? $_POST["username"] : "";
    $regpassword = isset($_POST["password"]) ? $_POST["password"] : "";

   
    $sql = "insert into juanpiuser(username,password) values('$regusername','$regpassword')";

    $result = excute_oop($sql);
    
    if($result){
        echo "{status:true, mess:'注册成功'}";
    }else{
        echo "{status:false, mess:'注册失败'}";
    }
?>