/**
 * Created by Administrator on 2016/4/14 0014.
 */
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('right_curveoforder'),'dark');
activity();
function activity(){
    var start_day=$('#start_time').val(),end_day=$('#end_time').val()
    $.ajax({
        url:'/json/activity',
        data:{
            start_day:start_day,
            end_day:end_day
        },
        dataType:'json',
        type:'get',
        async:false,
        beforeSend: function () {
            // 禁用按钮防止重复提交
            $(".select button").html('加载中...').attr({ disabled: "disabled" });
        },
        success:function(data){
            // 指定图表的配置项和数据
            var data_x =new Array(),data_act_today=new Array(),data_act_total=new Array()
            var data_shop_today=new Array(),data_shop_total=new Array()
            for(var i=0;i<data.x.length;i++){
                data_x.push(data.x[i].split('-')[2])
            }
            for(var i=0;i<data.act.y_today.length;i++){
                data_act_today.push(data.act.y_today[i])
                data_act_total.push(data.act.y_total[i])
                data_shop_today.push(data.shop.y_today[i])
                data_shop_total.push(data.shop.y_total[i])
            }

            var option = {
                tooltip : {
                    trigger: 'axis'
                },
                calculable : true,
                legend: {
                    data:['活跃活动量','活跃商家量','每日活动增量','每日商家增量']
                },
                xAxis : [
                    {
                        type : 'category',
                        axisLabel : {
                            formatter: '{value}日'
                        },
                        data : data_x
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '每日增量',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    },
                    {
                        type : 'value',
                        name : '总量',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    }
                ],
                series : [

                    {
                        name:'活跃活动量',
                        type:'line',
                        smooth:true,
                        yAxisIndex: 1,
                        data:data_act_total,
                        itemStyle: {
                            normal: {
                                color:'#C23531',
                            },
                        },
                    },
                    {
                        name:'活跃商家量',
                        type:'line',
                        yAxisIndex: 1,
                        smooth:true,
                        data:data_shop_total,
                        itemStyle: {
                            normal: {
                                color:'#FAD860',
                            },
                        },
                    },
                    {
                        name:'每日活动增量',
                        type:'bar',
                        data:data_act_today,
                        itemStyle: {
                            normal: {
                                color:'#D48265',
                                barBorderRadius:[4,4,4,4],
                            },
                        },
                    },
                    {
                        name:'每日商家增量',
                        type:'bar',
                        data:data_shop_today,
                        itemStyle: {
                            normal: {
                                color:'#91C7AE',
                                barBorderRadius:[4,4,4,4],
                            },
                        },
                    },
                ]
            };
// 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    })
}
$(window).resize(function () {
    myChart.resize();
})


//热门
hot();
function hot(){
    var start_day=$('#start_time').val(),end_day=$('#end_time').val()
    $.ajax({
        url:'/json/hot',
        data:{
            start_day:start_day,
            end_day:end_day
        },
        dataType:'json',
        type:'get',
        async:false,
        success:function(data){
            $(".select button").html('确定').removeAttr("disabled");
            $('.hot_act').html("")
            $('.hot_shop').html("")
            $('.hot_act').append("<tr><td></td><td>活动名称</td><td>所属商家</td><td>类型</td><td>城市</td><td>价格</td><td>状态</td><td>订单量</td></tr>")
            $('.hot_shop').append("<tr><td></td><td>商家名称</td><td>城市</td><td>订单量</td></tr>")
            var t_body
            for(var i=0;i<data.hot_act.length;i++){
                var rank=i+1
                t_body="<tr><td>"+rank+"</td><td>"+data.hot_act[i].act_name+"</td><td>"+data.hot_act[i].biz_name+"</td>" +
                    "<td>"+data.hot_act[i].type+"</td><td>"+data.hot_act[i].city+"</td><td>"+data.hot_act[i].price+"</td>" +
                    "<td>"+data.hot_act[i].status+"</td><td>"+data.hot_act[i].order_count+"</td></tr>"
                $('.hot_act').append(t_body)
            }
            for(var i=0;i<data.hot_shop.length;i++){
                var rank=i+1
                t_body="<tr><td>"+rank+"</td><td>"+data.hot_shop[i].biz_name+"</td>" +
                    "<td>"+data.hot_shop[i].city+"</td>" +
                    "<td>"+data.hot_shop[i].order_count+"</td></tr>"
                $('.hot_shop').append(t_body)
            }
        }
    })
}

$('.select button').on('click',function(){
    activity();
    hot();
})