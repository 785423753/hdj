/**
 * Created by Administrator on 2016/6/22 0022.
 */
var myChart1= echarts.init(document.getElementById('download'),'dark');
var myChart2= echarts.init(document.getElementById('sign'),'dark');
var myChart3= echarts.init(document.getElementById('percent'),'dark');
var myChart4= echarts.init(document.getElementById('property'),'dark');
$('.select button').click(function () {
    user()
})
user()
function user() {
    myChart1.showLoading();
    var start_time = $('#start_time').val(), end_time = $('#end_time').val()
    $.get('/dataofusers/?json=1', {start: start_time, end: end_time}, function (data) {
        var data_x = [], data_down = [], data_sign = [], data_col = [], data_qd = [], data_com = [], data_total = []
        for (var i in data[1].value) {
            data_x.push(data[1].value[i].date.split('-')[1] + '/' + data[1].value[i].date.split('-')[2])
            data_down.push(data[1].value[i].value)
            data_sign.push(data[2].value[i].value)
        }
        for (var i in data[3].line_value) {
            data_col.push(data[3].line_value[i].value[0])
            data_qd.push(data[3].line_value[i].value[1])
            data_com.push(data[3].line_value[i].value[2])
            data_total.push(data[3].line_value[i].total)
        }
        myChart1.setOption({
            grid: {
                left: '5%',
                right: '3%',
                bottom: '12%',
                top: '10%',
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['新增下载用户', '新增注册用户'],

            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    data: data_x
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '数量',
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                },
            ],
            series: [
                {
                    name: '新增下载用户',
                    type: 'line',
                    symbolSize: 5,
                    symbol: 'emptyCircle',
                    itemStyle: {
                        normal: {
                            color: '#76FDFD'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#76FDFD',
                            width: '1',
                            shadowColor: 'rgba(118, 253, 253, 0.66)',
                            shadowBlur: 10,
                            shadowOffsetY: -1,
                            shadowOffsetX: 1
                        }
                    },
                    data: data_down
                },
                {
                    name: '新增注册用户',
                    type: 'line',
                    symbolSize: 5,
                    symbol: 'emptyCircle',
                    itemStyle: {
                        normal: {
                            color: '#F75D63'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#F75D63',
                            width: '1',
                            shadowColor: 'rgba(247, 93, 99, 0.66)',
                            shadowBlur: 10,
                            shadowOffsetY: -1,
                            shadowOffsetX: 1
                        }
                    },
                    data: data_sign
                },
            ]
        });
        myChart2.setOption({
            grid: {
                left: '5%',
                right: '3%',
                bottom: '12%',
//            top:'8%',
            },
            tooltip: {
                trigger: 'axis'
            },
            calculable: true,
            legend: {
                data: ['收藏', '留言', '签到','总量']
            },
            xAxis: [
                {
                    type: 'category',
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    data: data_x
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '增量',
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                },
            ],
            series: [
                {
                    name: '收藏',
                    type: 'line',
                    symbolSize: 5,
                    itemStyle: {
                        normal: {
                            color: '#001852',
                        }
                    },
                    data: data_col
                },
                {
                    name: '留言',
                    type: 'line',
                    symbolSize: 5,
                    itemStyle: {
                        normal: {
                            color: '#45BFDE',
                        }
                    },
                    data: data_com
                },
                {
                    name: '签到',
                    type: 'line',
                    symbolSize: 5,
                    itemStyle: {
                        normal: {
                            color: '#C7B48F',
                        }
                    },
                    data: data_qd
                },
                {
                    name: '总量',
                    type: 'line',
                    symbolSize: 5,
                    itemStyle: {
                        normal: {
                            color: '#E02156',
                        }
                    },
                    data: data_total
                },
            ]
        });
        myChart3.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            calculable: true,
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '60%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                formatter: "{b}({d}%)",
                            }
                        }
                    },
                    data: [
                        {value: data[3].cake_value[0].amount, name: '互动用户', itemStyle: {normal: {color: '#1CC9F2'}}},
                        {value: data[3].cake_value[1].amount, name: '其他', itemStyle: {normal: {color: '#1790CF'}}},
                    ]
                }
            ]
        });
        myChart4.setOption({
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            calculable : true,
            series : [
                {
                    name:'',
                    type:'pie',
                    radius : '50%',
                    //center: ['50%', '40%'],
                    itemStyle:{
                        normal:{
                            label:{
                                show:true,
                                formatter: "{b}    \n({d}%)"
                            },
                        }
                    },
                    data:[
                        {value:data[4].cake_value[1].amount, name:'男性', itemStyle: {normal: {color:'#001852'}}},
                        {value:data[4].cake_value[2].amount, name:'女性', itemStyle: {normal: {color:'#E01F54'}}},
                        {value:data[4].cake_value[0].amount, name:'保密', itemStyle: {normal: {color:'#B8D2C7'}}},
                    ]
                }
            ]
        });
        myChart1.hideLoading();
        $(window).resize(function () {
            myChart1.resize();
            myChart2.resize();
            myChart3.resize();
            myChart4.resize();
        })
    })
}


