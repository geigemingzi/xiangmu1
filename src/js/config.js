
require.config({
    // 配置段路径
    paths:{
        "jQuery":"../lib/jquery-3.3.1",
        "wdzoom":"../lib/jQuery-wdzoom/jQuery.wdzoom",
        "wdcarousel":"../lib/jQuery.wdcarousel/jQuery.wdcarousel"
    },

    // 配置模块依赖关系
    shim:{
        "wdzoom":["jQuery"],
        "wdcarousel":["jQuery"]
    }
});