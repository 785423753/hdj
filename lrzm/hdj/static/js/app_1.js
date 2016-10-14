/**
 * Created by Administrator on 2016/6/1 0001.
 */
var myChart1 = echarts.init(document.getElementById('event_1'),'infographic');
var myChart4 = echarts.init(document.getElementById('app'),'infographic');
$.ajax({
    url:'/newordervis/app/?json=1',
    dataType:'json',
    type:'get',
    async:false,
    success:function(data){
        var data_x=[],data_y=[]
        for(var i=0;i<data.week_data_info.length;i++){
            data_x.push(parseInt(data.week_data_info[i].daily.split('-')[1])+'/'+data.week_data_info[i].daily.split('-')[2])
            data_y.push(data.week_data_info[i].newuser)
        }
        var option1 = {
            backgroundColor: 'rgba(0,0,0,0)',//背景色
            tooltip : {
                trigger: 'axis'
            },
            grid: {
                show:true,
                top:'10%',
                right:'3%',
                left:'3%',
                containLabel: true,
                borderColor:'#1C2953',
                borderWidth:1,
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data :data_x,
                    splitArea:{
                        show:false,
                    },
                    splitLine : {
                        show:true,
                        lineStyle: {
                            color: '#1C2953',
                            type:'solid'
                        }
                    },
                    axisLine : {
                        show:true,
                        lineStyle: {
                            color: '#1C2953',
                            width:2,
                        }
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLabel : {
                        show:true,
                        textStyle: {
                            color: '#20509E',
                        },
                    },
                },
            ],
            yAxis : [
                {
                    type : 'value',
                    name:'用户量',
                    nameTextStyle:{
                        color:'#20509E'
                    },
                    splitArea:{
                        show:false,
                    },
                    splitLine : {
                        show:true,
                        lineStyle: {
                            color: '#1C2953',
                            type:'solid'
                        }
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLine : {
                        show:true,
                        lineStyle: {
                            color: '#1C2953',
                            width:2
                        }
                    },
                    axisLabel : {
                        show:true,
                        textStyle: {
                            color: '#20509E',
                        },
                    },
                },
            ],
            series : [
                {
                    name:'每日新增',
                    type:'line',
                    stack: '总量',
                    symbol: 'none',
                    smooth:false,
                    itemStyle: {
                        normal: {
                            color:'#E7393A',
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(219, 46, 46, .8)'
                            }, {
                                offset: 1,
                                color: 'rgba(228, 107, 55, .8)'
                            }])
                        }
                    },
                    data:data_y
                },
            ]
        };
        myChart1.setOption(option1);
    }
})

var option4 = {
    backgroundColor: 'rgba(0,0,0,0)',//背景色
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
        {
            name:'使用频率',
            type:'pie',
            radius : '60%',
            x:'center',
            itemStyle:{
                normal:{
                    label:{
                        show:true,
                        formatter: "{b} : {d}%"
                    }
                }
            },
            data:[
                {value:850, name:'1次',itemStyle:{normal:{color:'#E65A59'}}},
                {value:1548, name:'2次',itemStyle:{normal:{color:'#5AA9EC'}}},
                {value:700, name:'3-5次',itemStyle:{normal:{color:'#5DE4E8'}}},
                {value:400, name:'6-9次',itemStyle:{normal:{color:'#D26ADB'}}},
                {value:200, name:'10次以上',itemStyle:{normal:{color:'#F49F5C'}}},
            ]
        }
    ]
};
myChart4.setOption(option4);
$(window).resize(function () {
    myChart4.resize();
})