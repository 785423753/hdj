/**
 * Created by Administrator on 2016/4/14 0014.
 */
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('right_curveoforder_1'),'dark');
sign();
function sign(){
    var start_day=$('#start_time').val(),end_day=$('#end_time').val()
    $.ajax({
        url:'http://218.244.137.196:5000/json/userSign',
        data:{
            start_day:start_day,
            end_day:end_day
        },
        dataType:'json',
        type:'get',
        async:false,
        success:function(data){
            console.log(data)
            var data_x=new Array(),data_y=new Array(),data_total=new Array()
            for(var i=0;i<data.x.length;i++){
                data_x.push(data.x[i].split('-')[2])
            }
            for(var i=0;i<data.y_add.length;i++){
                data_y.push(data.y_add[i])
            }
            for(var i=0;i<data.y_total.length;i++){
                data_total.push(data.y_total[i])
            }
            // 指定图表的配置项和数据
            var option = {
                legend: {
                    data:['每日新增','总数']
                },
                calculable : true,
                tooltip : {
                    trigger: 'axis',
                    formatter: "{b} : {c}"
                },
                yAxis: [
                    {
                        type : 'value',
                        name:'每日新增',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    },
                    {
                        type : 'value',
                        name:'总数',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    },
                ],
                xAxis: [
                    {
                        type : 'category',
                        axisLine : {onZero: false},
                        axisLabel : {
                            formatter: '{value} 日'
                        },
                        boundaryGap : false,
                        data : data_x
                    }
                ],
                series : [
                    {
                        name:'每日新增',
                        type:'line',
                        smooth:true,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    shadowColor : 'rgba(0,0,0,0.4)'
                                }
                            }
                        },
                        data:data_y,
                    },
                    {
                        name:'总数',
                        type:'line',
                        smooth:true,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    shadowColor : 'rgba(0,0,0,0.4)'
                                }
                            }
                        },
                        data:data_total,
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                    }
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
$('.select button').on('click',function(){
    sign()
})