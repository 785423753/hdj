/**
 * Created by Administrator on 2016/5/28 0028.
 */
var myChart1 = echarts.init(document.getElementById('month'),'infographic');
var myChart2 = echarts.init(document.getElementById('week_12'),'infographic');
var myChart3 = echarts.init(document.getElementById('month_12'),'infographic');
var myChart4 = echarts.init(document.getElementById('price'),'infographic');
var num=0
$('.select button').click(function () {
    var cat=$('.industry font').attr('data-cat')
    daily(cat)
})
daily()
cat()
function daily(cat){
    var start_day=$('#start_time').val(),end_day=$('#end_time').val()
    $.ajax({
        url:'/newordervis/salesbydays/',
        data:{
            start_time:start_day,
            end_time:end_day,
            cat:cat
        },
        dataType:'json',
        type:'get',
        async:false,
        beforeSend: function () {
            // 禁用按钮防止重复提交
            $(".select button").html('加载中...').attr({ disabled: "disabled" });
        },
        success:function(data){
            var day_x=[],day_y1=[],day_y2=[]
            for(var i=0;i<data[1].length;i++){
                day_x.push(parseInt(data[1][i].date.split('/')[1])+'/'+data[1][i].date.split('/')[2])
                day_y1.push(data[1][i].total_pay)
            }
            for(var i=0;i<data[2].length;i++){
                day_y2.push(data[2][i].total_pay)
            }
            $('.total').text(data[0].totol_sales.split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join(''))
            $('.refund').text(data[0].total_refund)
            $('#start_time').val(data[0].stime),$('#end_time').val(data[0].etime)
            //月对比
            var option1 = {
                backgroundColor: 'rgba(0,0,0,0)',//背景色
                grid: {
                    show:true,
                    left: '3%',
                    right: '3%',
                    bottom: '5%',
                    top:'15%',
                    containLabel: true,
                    borderColor:'#032084',
                    borderWidth:2,
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:[{name:'今年销售额',textStyle: {color: '#F8C01B'}},{name:'去年销售额',textStyle: {color: '#6CD7FB'}}],
                    right:'5%',
                    y:'16%',
                    textStyle: {color: 'red'},
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : true,
                        data :day_x,
                        splitLine : {
                            show:true,
                            lineStyle: {
                                color: 'rgba(14, 30, 82, 0.52)',
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
                        name:'销售额',
                        nameTextStyle:{
                            color:'#20509E'
                        },
                        splitLine : {
                            show:true,
                            lineStyle: {
                                color: 'rgba(14, 30, 82, 0.52)',
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
                        name:'今年销售额',
                        type:'line',
//            smooth:true,
                        symbol:'circle',
                        symbolSize:4,
                        itemStyle: {normal: {
                            areaStyle: {type: 'default',color:'rgba(108, 215, 251, 0.1)'},
                            color:'#F8C01B',
                        }},
                        lineStyle: {
                            normal: {
                                color:'#F8C01B',
                                width:'1',
                                shadowColor: 'rgba(108, 215, 251, 0.4)',
                                shadowBlur: 10,
                                shadowOffsetY: -1,
                                shadowOffsetX: 1
                            }
                        },
                        data:day_y1
                    },
                    {
                        name:'去年销售额',
                        type:'line',
                        symbol:'circle',
                        symbolSize:4,
                        itemStyle: {normal: {
                            areaStyle: {type: 'default',color:'rgba(248, 192, 27, 0.1)'},
                            color:'#6CD7FB',
                        }},
                        lineStyle: {
                            normal: {
                                color:'#6CD7FB',
                                width:'1',
                                shadowColor: 'rgba(248, 192, 27, 0.4)',
                                shadowBlur: 10,
                                shadowOffsetY: -1,
                                shadowOffsetX: 1
                            }
                        },
                        data:day_y2
                    },
                ]
            };
            myChart1.setOption(option1);
        },
        complete:function(){
            $(".select button").html('确定').removeAttr("disabled");
        }
    })
}
function cat(ind) {
    $.ajax({
        url: '/newordervis/salesanalysis/',
        data: {
            json: 1,
            cat:ind
        },
        dataType: 'json',
        type: 'get',
        async: false,
        success: function (data) {
            if(num==0){
                $('.industry ul').html('')
                $('.industry ul').append("<li data-cat=''>全部</li>")
                for (var i = 0; i < data[0].length; i++) {
                    $('.industry ul').append("<li data-cat='" + data[0][i].id + "'>" + data[0][i].name + "</li>")
                }
            }
            var month_x = [], month_y = [], week_y = [], price_y = [],price_x=[]
            for (var i = 0; i < 12; i++) {
                month_x.push(parseInt(data[2][i].date.split('/')[1]) + '月')
                month_y.push((data[2][i].total_pay / 10000).toFixed(5))
                week_y.push((data[1][i].total_pay / 10000).toFixed(5))
            }
            for (var i = 0; i < data[3][1].length; i++) {
                price_y.push(data[3][1][i].amount)
                price_x.push(data[3][1][i].name)
            }
            $('.all_money').text(data[3][0].sales)
            $('.order_num').text(data[3][0].amount)
            $('.average').text(data[3][0].price_avg)
            //12周对比
            var option2 = {
                backgroundColor: 'rgba(0,0,0,0)',//背景色
                grid: {
                    top: '7%',
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: "{b} <br>{a} : {c} 万"
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1周', '2周', '3周', '4周', '5周', '6周', '7周', '8周', '9周', '10周', '11周', '12周'],
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#20509E',
                            },
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#132055',
                                width: 2
                            }
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '销售额（w）',
                        nameTextStyle: {
                            color: '#20509E'
                        },
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#20509E',
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#0C1A47',
                                type: 'solid'
                            }
                        },
                    }
                ],
                series: [
                    {
                        name: '销售额',
                        type: 'line',
                        symbolSize: 5,
//            smooth:true,
                        symbol: 'circle',
                        itemStyle: {
                            normal: {
                                color: '#76FDFD'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: '#76FDFD',
                                width: '2',
                                shadowColor: 'rgba(118, 253, 253, 0.66)',
                                shadowBlur: 10,
                                shadowOffsetY: -1,
                                shadowOffsetX: 1
                            }
                        },
                        data: week_y
                    },
                ]
            };
            myChart2.setOption(option2);
            //12月对比
            var option3 = {
                backgroundColor: 'rgba(0,0,0,0)',//背景色
                grid: {
                    top: '7%',
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: "{b} <br>{a} : {c} 万"
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: month_x,
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#20509E',
                            },
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#132055',
                                width: 2
                            }
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '销售额(w)',
                        nameTextStyle: {
                            color: '#20509E'
                        },
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#20509E',
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#0C1A47',
                                type: 'solid'
                            }
                        },
                    }
                ],
                series: [
                    {
                        name: '销售额',
                        type: 'line',
                        symbolSize: 5,
//            smooth:true,
                        symbol: 'circle',
                        itemStyle: {
                            normal: {
                                color: '#F75D63'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: '#F75D63',
                                width: '2',
                                shadowColor: 'rgba(247, 93, 99, 0.66)',
                                shadowBlur: 10,
                                shadowOffsetY: -1,
                                shadowOffsetX: 1
                            }
                        },
                        data: month_y
                    },
                ]
            };
            myChart3.setOption(option3);
            //成交价格
            var option4 = {
                backgroundColor: 'rgba(0,0,0,0)',//背景色
                grid: {
                    top: '5%',
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: [
                    {
                        type: 'category',
                        data: price_x,
                        splitLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#20509E',
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#132055',
                                width: 2
                            }
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                    }
                ],
                series: [
                    {
                        name: '订单量',
                        type: 'bar',
                        barCategoryGap: '65%',
                        itemStyle: {
                            normal: {
                                color: '#2986C1',
                                label: {show: true, position: 'top', textStyle: {color: '#6EF4FE'}}
                            }
                        },
                        data:price_y
                    },

                ]
            };
            myChart4.setOption(option4);
            $(window).resize(function () {
                myChart2.resize();
                myChart3.resize();
                myChart4.resize();
                myChart1.resize();
            })
        }
    })
}
$('.industry li').click(function () {
    num++
    var ind=$(this).attr('data-cat')
    daily(ind)
    cat(ind)
})