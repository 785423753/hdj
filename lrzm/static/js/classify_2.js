/**
 * Created by Administrator on 2016/4/21 0021.
 */
//性别
var myChart3 = echarts.init(document.getElementById('sex'),'dark');
classify()
function classify(){
    $.ajax({
        url:'http://218.244.137.196:5000/json/classify',
        dataType:'json',
        type:'get',
        async:false,
        success:function(data){


        }
    })
}

$(window).resize(function() {
    myChart3.resize();
    myChart4.resize();
});