/**
 * Created by Administrator on 2016/4/14 0014.
 */
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('right_curveoforder_1'),'dark');

// 指定图表的配置项和数据
var option = {
    legend: {
        data:['每日新增及总数']
    },
    calculable : true,
    tooltip : {
        trigger: 'axis',
        formatter: "{b} : {c}人"
    },
    yAxis: [
        {
            type : 'value',
            axisLabel : {
                formatter: '{value} 人'
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
            data : ['1', '2', '3', '4', '5', '6', '7', '8','9','10']
        }
    ],
    series : [
        {
            name:'',
            type:'line',
            smooth:true,
            data:[15, 25, 10, 30, 22, 25, 27, 55, 76,20],
            markLine : {
                data : [
                    [
                        {name: '总数',xAxis: 0, yAxis: 20},
                        {name: '总数',xAxis: 9, yAxis: 20,value:450}
                    ],
                ]
            }
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
$(window).resize(function () {
    myChart.resize();
})