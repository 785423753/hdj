/**
 * Created by Administrator on 2016/6/2 0002.
 */
var Data=new Array()
for(var i=1;i<31;i++){
    Data.push(i)
}
var myChart1 = echarts.init(document.getElementById('event_1'),'dark');
var myChart2 = echarts.init(document.getElementById('event_2'),'infographic');
var myChart3 = echarts.init(document.getElementById('event_3'),'infographic');
var myChart4 = echarts.init(document.getElementById('event_4'),'infographic');
var myChart5 = echarts.init(document.getElementById('event_5'),'infographic');
$.ajax({
    url:'/newoperation/op_datas/?json=1',
    dataType:'json',
    type:'get',
    async:false,
    success:function(data){
        var data_x1=[],data_y1=[],data_x2=[],data_y2=[],data_x3=[],data_y3=[]
        for(var i=0;i<data[0].length;i++){
            data_x1.push(data[0][i].name)
            data_y1.push(data[0][i].value)
        }
        for(var i=0;i<data[1].length;i++){
            data_x2.push(data[1][i].name)
            data_y2.push(data[1][i].value)
        }
        for(var i=0;i<data[2].length;i++){
            data_x3.push(data[2][i].name)
            data_y3.push(data[2][i].value)
        }
        //月对比
        var option1 = {
            backgroundColor: 'rgba(0,0,0,0)',//背景色
            grid: {
                show:true,
                left: '2%',
                right: '3%',
                bottom: '5%',
                top:'6%',
                containLabel: true,
                borderColor:'#032084',
                borderWidth:2,
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:[{name:'WAP站',textStyle: {color: '#CE4B4E'}},{name:'网站',textStyle: {color: '#54D0FB'}}],
                right:'5%',
                y:'8%',
                textStyle: {color: 'red'},
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : true,
                    data :Data,
                    splitLine : {
                        show:true,
                        lineStyle: {
                            color: 'rgba(14, 30, 82, 1)',
                            type:'solid'
                        }
                    },
                    axisLine : {
                        show:true,
                        lineStyle: {
                            color: '#032084',
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
                    name:'流量（pv）',
                    nameTextStyle:{
                        color:'#20509E'
                    },
                    boundaryGap: ['20%', '20%'],
                    splitLine : {
                        show:true,
                        lineStyle: {
                            color: 'rgba(14, 30, 82, 1)',
                            type:'solid'
                        }
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLine : {
                        show:true,
                        lineStyle: {
                            color: '#032084',
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
                    name:'WAP站',
                    type:'line',
//            smooth:true,
                    symbol:'circle',
                    symbolSize:6,
                    itemStyle: {normal: {
                        color:'#CE4B4E',
                    }},
                    lineStyle: {
                        normal: {
                            color:'#CE4B4E',
                            width:'1.5',
                        }
                    },
                    data:[120, 132, 101, 134, 90, 230, 210,100, 102, 101, 104, 90, 150, 170,100, 102, 101, 104, 90, 150, 170,120, 132, 101, 134, 90, 230, 210,180,210]
                },
                {
                    name:'网站',
                    type:'line',
//            smooth:true,
                    symbol:'circle',
                    symbolSize:6,
                    itemStyle: {normal: {
                        color:'#54D0FB',
                    }},
                    lineStyle: {
                        normal: {
                            color:'#54D0FB',
                            width:'1.5',
                        }
                    },
                    data:[100, 102, 101, 104, 90, 150, 170,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,100, 102, 101, 104, 90, 150, 170,200,190]
                },
            ]
        };
        myChart1.setOption(option1);
        var placeHolderStyle = {
            normal : {
                color: 'rgba(0,0,0,0)',
                label: {show:false},
                labelLine: {show:false}
            },
            emphasis : {
                color: 'rgba(0,0,0,0)'
            }
        };
        var option2 = {
            backgroundColor: 'rgba(0,0,0,0)',//背景色
            tooltip : {
                show: true,
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                y : '90%',
                data:['搜索引擎','直接访问','外链'],
                textStyle:{
                    color:'#74B8F7',
                    fontSize:12
                }
            },
            series : [
                {
                    type:'pie',
                    clockWise:false,
                    hoverAnimation:false,
                    center:['50%','43%'],
                    radius : [85, 100],
                    itemStyle : {
                        normal: {
                            color:'#3487D5',
                            label: {
                                show:false,
                            },
                            labelLine: {show:false}
                        }},
                    data:[
                        {
                            value:600,
                            name:'搜索引擎'
                        },
                        {
                            value:400,
                            name:'invisible',
                            itemStyle : placeHolderStyle
                        }
                    ]
                },
                {
                    type:'pie',
                    clockWise:false,
                    hoverAnimation:false,
                    center:['50%','43%'],
                    radius : [70, 85],
                    itemStyle : {
                        normal: {
                            color:'#4F99E0',
                            label: {show:false},
                            labelLine: {show:false}
                        }},
                    data:[
                        {
                            value:45,
                            name:'直接访问'
                        },
                        {
                            value:55,
                            name:'invisible',
                            itemStyle : placeHolderStyle
                        }
                    ]
                },
                {
                    type:'pie',
                    clockWise:false,
                    center:['50%','43%'],
                    hoverAnimation:false,
                    radius : [55, 70],
                    itemStyle : {
                        normal: {
                            color:'#74B8F7',
                            label: {show:false},
                            labelLine: {show:false}
                        }},
                    data:[
                        {
                            value:30,
                            name:'外链'
                        },
                        {
                            value:70,
                            name:'invisible',
                            itemStyle : placeHolderStyle
                        }
                    ]
                }
            ]
        };
        myChart2.setOption(option2);
        var option3 = {
            backgroundColor: 'rgba(0,0,0,0)',//背景色
            grid: {
                top:'5%',
                left:'9%',
                right:'5%',
                bottom:'10%'
            },
            tooltip : {
                trigger: 'axis'
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap:true,
                    data : data_x1,
                    splitLine : {
                        show:false,
                    },
                    axisLabel : {
                        show:true,
                        textStyle: {
                            color: '#20509E',
                        },
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLine : {
                        show:true,
                        lineStyle: {
                            color: '#132055',
                            width:2
                        }
                    },
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    splitLine : {
                        show:true,
                        lineStyle: {
                            color: 'rgba(14, 30, 82, 1)',
                            type:'solid'
                        }
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLine : {
                        show:false,
                    },
                    axisLabel : {
                        show:true,
                        textStyle: {
                            color: '#20509E',
                        },
                    },
                }
            ],
            series : [
                {
                    name:'订单量',
                    type:'bar',
                    barCategoryGap: '70%',
                    itemStyle: {normal: {
                        color:'#F25252',
                    }},
                    data:data_y1
                },

            ]
        };
        myChart3.setOption(option3);
        var option4 = {
            backgroundColor: 'rgba(0,0,0,0)',//背景色
            grid: {
                top:'5%',
                right:'5%',
                left:'8%',
                bottom:'10%'
            },
            tooltip : {
                trigger: 'axis'
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap:true,
                    data : data_x2,
                    splitLine : {
                        show:false,
                    },
                    axisLabel : {
                        show:true,
                        textStyle: {
                            color: '#20509E',
                        },
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLine : {
                        show:true,
                        lineStyle: {
                            color: '#132055',
                            width:2
                        }
                    },
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    splitLine : {
                        show:true,
                        lineStyle: {
                            color: 'rgba(14, 30, 82, 1)',
                            type:'solid'
                        }
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLine : {
                        show:false,
                    },
                    axisLabel : {
                        show:true,
                        textStyle: {
                            color: '#20509E',
                        },
                    },
                }
            ],
            series : [
                {
                    name:'订单量',
                    type:'bar',
                    barCategoryGap: '70%',
                    itemStyle: {normal: {
                        color:'#31C1F6',
                    }},
                    data:data_y2
                },

            ]
        };
        myChart4.setOption(option4);
        var option5 = {
            backgroundColor: 'rgba(0,0,0,0)',//背景色
            grid: {
                top:'5%',
                right:'5%',
                left:'8%',
                bottom:'10%'
            },
            tooltip : {
                trigger: 'axis'
            },
            yAxis : [
                {
                    type : 'category',
                    boundaryGap:true,
                    data : data_x3,
                    splitLine : {
                        show:false,
                    },
                    axisLabel : {
                        show:true,
                        textStyle: {
                            color: '#20509E',
                        },
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLine : {
                        show:true,
                        lineStyle: {
                            color: '#132055',
                            width:2
                        }
                    },
                }
            ],
            xAxis : [
                {
                    type : 'value',
                    splitLine : {
                        show:true,
                        lineStyle: {
                            color: 'rgba(14, 30, 82, 1)',
                            type:'solid'
                        }
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLine : {
                        show:true,
                        lineStyle: {
                            color: '#132055',
                            width:2
                        }
                    },
                    axisLabel : {
                        show:true,
                        textStyle: {
                            color: '#20509E',
                        },
                    },
                }
            ],
            series : [
                {
                    name:'订单量',
                    type:'bar',
                    barCategoryGap: '35%',
                    itemStyle: {normal: {
                        color:'#51A3F7',
                    }},
                    data:data_y3
                },

            ]
        };
        myChart5.setOption(option5);
        $(window).resize(function () {
            myChart1.resize();
            myChart2.resize();
            myChart3.resize();
            myChart4.resize();
            myChart5.resize();
        })
    }
})
