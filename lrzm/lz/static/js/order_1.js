/**
 * Created by Administrator on 2016/4/14 0014.
 */
// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('right_curveoforder_1'),'dark');
daily_order()
function daily_order(){
    var start_day=$('#start_time').val(),end_day=$('#end_time').val()
    $.ajax({
        url:'/json/order',
        data:{
            start_day:start_day,
            end_day:end_day
        },
        dataType:'json',
        type:'get',
        async:false,
        beforeSend: function () {
            // 禁用按钮防止重复提交
            $(".select button").val('加载中...').attr({ disabled: "disabled" });
        },
        success:function(data){
            var data_x=new Array(),data_money=new Array(),data_order=new Array(),data_refunds=new Array()
            for(var i=0;i<data.x.length;i++){
                data_x.push(data.x[i].split('-')[2]+'日')
            }
            for(var i=0;i<data.y_money.length;i++){
                data_money.push(data.y_money[i])
                data_order.push(data.y_order[i])
                data_refunds.push(data.y_refunds[i])
            }

            $('.order').text(data.total_order),$('.money').text(data.total_money),$('.refunds').text(data.total_refunds)
            // 指定图表的配置项和数据
            var option = {
                tooltip : {
                    trigger: 'axis'
                },
                calculable : true,
                legend: {
                    data:['每日订单总量','每日订单金额','每日退款金额']
                },
                xAxis : [
                    {
                        type : 'category',
                        axisLabel : {
                            formatter: '{value}'
                        },
                        data :data_x
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '金额',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    },
                    {
                        type : 'value',
                        name : '订单量',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    }
                ],
                series : [
                    {
                        name:'每日订单总量',
                        type:'line',
                        yAxisIndex: 1,
                        smooth:true,
                        data:data_order,
                        itemStyle: {
                            normal: {
                                color:'#FAD860',
                            },
                        },
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                    },
                    {
                        name:'每日订单金额',
                        type:'bar',
                        data:data_money,
                        itemStyle: {
                            normal: {
                                color:'#B6A2DE',
                                barBorderRadius:[4,4,4,4],
                            },
                        },
                    },
                    {
                        name:'每日退款金额',
                        type:'bar',
                        data:data_refunds,
                        itemStyle: {
                            normal: {
                                color:'#2EC7C9',
                                barBorderRadius:[4,4,4,4],
                            },
                        },

                    },

                ]
            };
// 使用刚指定的配置项和数据显示图表。
            myChart1.setOption(option);
        }
    })
}
$(window).resize(function () {
    myChart1.resize();
})
$('.select button').on('click',function(){
    daily_order()
})
