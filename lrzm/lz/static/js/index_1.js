// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('right_curveoforder_1'),'dark');
var myChart2 = echarts.init(document.getElementById('right_curveoforder_2'),'dark');
var myChart3 = echarts.init(document.getElementById('right_curveoforder_3'),'dark');
var myChart4 = echarts.init(document.getElementById('right_curveoforder_4'),'dark');
Index();
function Index(){
    $.ajax({
        url:'/json/home',
        dataType:'json',
        type:'get',
        async:false,
        success:function(data){
            $('.shop_total').text(data.total_biz),$('.act_total').text(data.total_act)
            $('.new_shop').text(data.yestertday_biz),$('.new_act').text(data.yesterday_act)
            $('.new_down').text(data.yesterday_add.down),$('.new_sign').text(data.yesterday_add.reg)
            $('.order_total').text((data.order_refund.order.total/10000).toFixed(2)+'万'),$('.new_order').text(data.order_refund.order.yesterday)
            $('.money_total').text((data.order_refund.money.total/10000).toFixed(2)+'万'),$('.new_money').text(data.order_refund.money.yesterday)
            $('.refunds_total').text((data.order_refund.refunds.total/10000).toFixed(2)+'万'),$('.new_refunds').text(data.order_refund.refunds.yesterday)

            for(var i=0;i<5;i++){
                $('.top_act').append("<tr><td>"+data.hot_act[i]+"</td></tr>")
            }
            for(var i=0;i<5;i++){
                $('.top_shop_1').append("<tr><td>"+data.hot_biz[i]+"</td></tr>")
            }
            for(var i=5;i<10;i++){
                $('.top_shop_2').append("<tr><td>"+data.hot_biz[i]+"</td></tr>")
            }
            var total_down=((data.down.reg+data.down.unreg)/10000).toFixed(1),sign=data.down.reg,unsign=data.down.unreg
            var data_cla_x=new Array(),data_cla_y=new Array()
            var data_down_x=new Array(),data_down_y1=new Array(),data_down_y2=new Array(),data_down_y3=new Array()
            var data_order_x=new Array(),data_order_y1=new Array(),data_order_y2=new Array(),data_order_y3=new Array()
            for(var i=0;i<data.act_per.length;i++){
                data_cla_x.push(data.act_per[i].name)
                data_cla_y.push((data.act_per[i].percent*100).toFixed(2))

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
                    text: total_down+'万',
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
                            {value:sign, name:'已注册',itemStyle: {normal: {color:'#8DC1A9'}},},
                            {value:unsign, name:'未注册',itemStyle: {normal: {color:'#EA7E53'}},},
                        ]
                    }
                ]
            };
            var option2 = {
                tooltip : {
                    trigger: 'axis',
                    formatter: function (params){
                        return params[0].name+'<br/>'+params[0].value+"%"
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'value',
                        boundaryGap : [0, 0.01],
                        axisLabel : {
                            formatter: '{value}%'
                        },
                    }
                ],
                yAxis : [
                    {
                        type : 'category',
                        data :data_cla_x
                    }
                ],
                series : [
                    {
                        name:'',
                        type:'bar',
                        itemStyle: {
                            normal: {
                                color:'#B6A2DE',
                                barBorderRadius:[4,4,4,4],
                            },
                        },
                        data:data_cla_y
                    },
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
                        name : '',
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
                        smooth:true,
                        data:data_down_y1
                    },
                    {
                        name:'IOS日增下载量',
                        type:'bar',
                        stack:'down',
                        barCategoryGap: '50%',
                        data:data_down_y2,

                    },
                    {
                        name:'安卓日增下载量',
                        type:'bar',
                        stack:'down',
                        barCategoryGap: '50%',
                        data:data_down_y3,
                    
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
                            formatter: '{value}'
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
                        smooth:true,
                        data:data_order_y2
                    },
                    {
                        name:'总金额',
                        type:'bar',
                        stack:'总数1',
                        barCategoryGap: '50%',
                        data:data_order_y1,
                        itemStyle: {
                            normal: {
                                color:'#2EC7C9',
                                barBorderRadius:[4,4,4,4],
                            },
                        },
                    },
                    {
                        name:'退款金额',
                        type:'bar',
                        stack:'总数2',
                        barCategoryGap: '50%',
                        data:data_order_y3,
                        itemStyle: {
                            normal: {
                                color:'#B6A2DE',
                                barBorderRadius:[4,4,4,4],
                            },
                        },
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