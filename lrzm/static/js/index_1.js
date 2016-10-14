// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('right_curveoforder_1'),'dark');
var myChart2 = echarts.init(document.getElementById('right_curveoforder_2'),'dark');
var myChart3 = echarts.init(document.getElementById('right_curveoforder_3'),'dark');
var myChart4 = echarts.init(document.getElementById('right_curveoforder_4'),'dark');
Index();
function Index(){
    $.ajax({
        url:'http://218.244.137.196:5000/json/home',
        dataType:'json',
        type:'get',
        async:false,
        success:function(data){
            var total_down=data.down.reg+data.down.unreg,sign=data.down.reg,unsign=data.down.unreg
            var data_cla=new Array()
            var data_down_x=new Array(),data_down_y1=new Array(),data_down_y2=new Array(),data_down_y3=new Array()
            var data_order_x=new Array(),data_order_y1=new Array(),data_order_y2=new Array(),data_order_y3=new Array()
            for(var i=0;i<data.act_per.length;i++){
                data_cla.push({value:data.act_per[i].count, name:data.act_per[i].name})
            }
            for(var i=0;i<data.reg_and_down.x.length;i++){
                data_down_x.push(data.reg_and_down.x[i].split('-')[2])
                data_down_y1.push(data.reg_and_down.y_reg[i])
                data_down_y2.push(data.reg_and_down.ios[i])
                data_down_y3.push(data.reg_and_down.android[i])
            }
            for(var i=0;i<data.order_graph.x.length;i++){
                data_order_x.push(data.order_graph.x[i].split('-')[2])
                data_order_y1.push(data.order_graph.y_money[i])
                data_order_y2.push(data.order_graph.y_order[i])
                data_order_y3.push(data.order_graph.y_refund[i])
            }

            var option1 = {
                title: {
                    text: total_down,
                    subtext: '',
                    x: 'center',
                    y: 'center',
                    textStyle : {
                        fontSize : '20',
                        fontWeight : 'normal'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                calculable : true,
                series : [
                    {
                        name:'',
                        type:'pie',
                        radius : ['40%', '60%'],
                        itemStyle : {
                            normal : {
                                label : {
                                    show : true,
                                    formatter : function (params) {
                                        return params.name+'\n'+(params.percent - 0).toFixed(0) + '%'
                                    }
                                },
                                labelLine : {
                                    length : 0,
                                }
                            },
                        },
                        data:[
                            {value:sign, name:'已注册'},
                            {value:unsign, name:'未注册'},
                        ]
                    }
                ]
            };
            var option2 = {
                title: {
                    text: '',
                    subtext: '',
                    x: 'center',
                    y: 'center',
                    textStyle : {
                        fontSize : '20',
                        fontWeight : 'normal'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                calculable : true,
                series : [
                    {
                        name:'',
                        type:'pie',
                        radius : ['50%', '70%'],
                        itemStyle : {
                            normal : {
                                label : {
                                    show : true,
                                    formatter : function (params) {
                                        return params.name+'\n'+(params.percent - 0).toFixed(0) + '%'
                                    }
                                },
                                labelLine : {
                                    length : 0,
                                }
                            },
                        },
                        data:data_cla
                    }
                ]
            };
            var option3 = {
                tooltip : {
                    trigger: 'axis'
                },
                calculable : true,
                legend: {
                    data:['日增注册量','IOS日增下载量','安卓日增下载量']
                },
                xAxis : [
                    {
                        type : 'category',
                        name : '4月',
                        data : data_down_x,
                        axisLabel : {
                            formatter: '{value} 日'
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    },
                ],
                series : [
                    {
                        name:'日增注册量',
                        type:'line',
                        data:data_down_y1
                    },
                    {
                        name:'IOS日增下载量',
                        type:'bar',
                        stack:'down',
                        barCategoryGap: '50%',
                        data:data_down_y2
                    },
                    {
                        name:'安卓日增下载量',
                        type:'bar',
                        stack:'down',
                        barCategoryGap: '50%',
                        data:data_down_y3
                    },
                ]
            };
            var option4 = {
                tooltip : {
                    trigger: 'axis'
                },
                calculable : true,
                legend: {
                    data:['订单量','总金额','退款金额']
                },
                xAxis : [
                    {
                        type : 'category',
                        name : '',
                        data : data_order_x,
                        axisLabel : {
                            formatter: '{value} 日'
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '金额',
                        axisLabel : {
                            formatter: '{value} 元'
                        }
                    },
                    {
                        type : 'value',
                        name : '订单量',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    },
                ],
                series : [
                    {
                        name:'订单量',
                        type:'line',
                        yAxisIndex: 1,
                        data:data_order_y2
                    },
                    {
                        name:'总金额',
                        type:'bar',
                        stack:'总数1',
                        barCategoryGap: '50%',
                        data:data_order_y1
                    },
                    {
                        name:'退款金额',
                        type:'bar',
                        stack:'总数2',
                        barCategoryGap: '50%',
                        data:data_order_y3
                    },
                ]
            };
             myChart1.setOption(option1);
            myChart2.setOption(option2);
            myChart3.setOption(option3);
            myChart4.setOption(option4);
        }
    })
}

$(window).resize(function () {
    myChart1.resize();
    myChart2.resize();
    myChart3.resize();
    myChart4.resize();
})