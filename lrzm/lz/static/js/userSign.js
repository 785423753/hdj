/**
 * Created by Administrator on 2016/4/14 0014.
 */
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('right_curveoforder_1'),'dark');
sign();
function sign(){
    var start_day=$('#start_time').val(),end_day=$('#end_time').val()
    $.ajax({
        url:'/json/userSign',
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
            $(".select button").html('确定').removeAttr("disabled");
            var data_x=new Array(),data_y=new Array(),data_total=new Array()
            for(var i=0;i<data.x.length;i++){
                data_x.push(data.x[i].split('-')[2]+'日')
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
                            formatter: '{value}'
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
                        itemStyle:{
                            normal:{
                                color:'#B6A2DE'
                            },
                        },
                        data:data_y,
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                    },
                    {
                        name:'总数',
                        type:'line',
                        smooth:true,
                        yAxisIndex: 1,
                        itemStyle:{
                            normal:{
                                color:'#2EC7C9'
                            },
                        },
                        data:data_total,
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