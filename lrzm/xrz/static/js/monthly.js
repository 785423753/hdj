/**
 * Created by Administrator on 2016/6/20 0020.
 */
var myChart1= echarts.init(document.getElementById('download'),'dark');
var myChart2= echarts.init(document.getElementById('sign'),'dark');
var myChart3= echarts.init(document.getElementById('lc'),'dark');
var myChart4= echarts.init(document.getElementById('shop'),'dark');
var myChart5= echarts.init(document.getElementById('craftsman'),'dark');
var myChart6= echarts.init(document.getElementById('article'),'dark');
var myChart7= echarts.init(document.getElementById('flow'),'dark');
var myChart8= echarts.init(document.getElementById('interact'),'dark');
var Chart=[myChart1,myChart2,myChart4,myChart5,myChart6,myChart7,myChart8]
$('.select').eq(0).find('button').click(function () {
    down()
})
$('.select').eq(1).find('button').click(function () {
    retentions()
})
down(),retentions()
function down(){
    for(var i in Chart){
        Chart[i].showLoading();
    }
    var start_time=$('#start_time_1').val(),end_time=$('#end_time_1').val()
    $.get('/download/',{start:start_time,end:end_time},function(data){
        $('#start_time_1').val(data[1][0].start_date), $('#end_time_1').val(data[1][0].end_date)
        var data_x=[],data_ios=[],data_and=[],data_tol=[],data_vip=[],data_reg=[],data_tal=[]
        for(var i=1;i<data[1].length;i++){
            data_x.push(data[1][i].month)
            data_ios.push(data[1][i].ios)
            data_and.push(data[1][i].android)
            data_tol.push(data[1][i].total)
        }
        for(var i in data[0]){
            data_vip.push(data[0][i].vip)
            data_reg.push(data[0][i].registed)
            data_tal.push(data[0][i].total)
        }
        myChart1.setOption({
            grid: {
//            left: '5%',
//            right: '5%',
                bottom: '12%',
//            top:'8%',
            },
            tooltip : {
                trigger: 'axis'
            },
            calculable : true,
            legend: {
                data:['iOS新增','安卓新增','总量'],
                x:'right'
            },
            xAxis : [
                {
                    type : 'category',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                    data :data_x
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name : '增量',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                },
                {
                    type : 'value',
                    name : '总量',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                }
            ],
            series : [
                {
                    name:'iOS新增',
                    type:'bar',
                    stack:'总量',
                    barCategoryGap: '60%',
                    itemStyle: {normal: {
                        color:'#D8361B',
                    }},
                    data:data_ios
                },
                {
                    name:'安卓新增',
                    type:'bar',
                    stack:'总量',
                    barCategoryGap: '60%',
                    itemStyle: {normal: {
                        color:'#F16B4C',
                    }},
                    data:data_and
                },
                {
                    name:'总量',
                    type:'line',
                    yAxisIndex: 1,
                    itemStyle: {normal: {
                        color:'#F7B4A9',
                    }},
                    data:data_tol
                }
            ]
        });
        myChart2.setOption({
            grid: {
//            left: '5%',
//            right: '5%',
                bottom: '12%',
//            top:'8%',
            },
            tooltip : {
                trigger: 'axis'
            },
            calculable : true,
            legend: {
                data:['注册新增','VIP新增','总量'],
                x:'right'
            },
            xAxis : [
                {
                    type : 'category',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                    data : data_x
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name : '增量',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                },
                {
                    type : 'value',
                    name : '总量',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                }
            ],
            series : [
                {
                    name:'注册新增',
                    type:'bar',
                    itemStyle: {normal: {
                        color:'#D8361B',
                    }},
                    data:data_reg
                },
                {
                    name:'VIP新增',
                    type:'bar',
                    itemStyle: {normal: {
                        color:'#F16B4C',
                    }},
                    data:data_vip
                },
                {
                    name:'总量',
                    type:'line',
                    yAxisIndex: 1,
                    itemStyle: {normal: {
                        color:'#F7B4A9',
                    }},
                    data:data_tal
                }
            ]
        });
        myChart1.hideLoading();
        myChart2.hideLoading();
        $(window).resize(function () {
            myChart1.resize();
            myChart2.resize();
        })
    })
    $.get('/restofmonth/',{start:start_time,end:end_time},function(data){
        var data_x=[],data_shop_add=[],data_shop_tol=[],data_man_add=[],data_man_tol=[],data_atc_add=[],data_gz_add=[],data_atc_tol=[],data_scan_add=[],data_scan_tol=[]
        var data_col=[],data_sign=[],data_com=[],data_total=[]
        for(var i in data[1].value){
            data_x.push(data[1].value[i].month)
            data_shop_add.push(data[1].value[i].add)
            data_shop_tol.push(data[1].value[i].total)
            data_man_add.push(data[2].value[i].add)
            data_man_tol.push(data[2].value[i].total)
            data_atc_add.push(data[3].value[i].add_article)
            data_gz_add.push(data[3].value[i].add_wechat)
            data_atc_tol.push(data[3].value[i].total)
            data_scan_add.push(data[4].value[i].add)
            data_scan_tol.push(data[4].value[i].total)
        }
        for(var i in data[5].value){
            data_col.push(data[5].value[i].collected)
            data_sign.push(data[5].value[i].signed)
            data_com.push(data[5].value[i].comment)
            data_total.push(data[5].value[i].total)
        }
        myChart4.setOption({
            grid: {
//            left: '5%',
//            right: '5%',
                bottom: '12%',
//            top:'8%',
            },
            tooltip : {
                trigger: 'axis'
            },
            calculable : true,
            legend: {
                data:['新增小店','总量'],
            },
            xAxis : [
                {
                    type : 'category',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                    data : data_x
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name : '增量',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                },
                {
                    type : 'value',
                    name : '总量',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                }
            ],
            series : [
                {
                    name:'新增小店',
                    barCategoryGap: '65%',
                    type:'bar',
                    itemStyle: {normal: {
                        color:'#44B7D3',
                    }},
                    data:data_shop_add
                },
                {
                    name:'总量',
                    type:'line',
                    yAxisIndex: 1,
                    itemStyle: {normal: {
                        color:'#8AEDD5',
                    }},
                    data:data_shop_tol
                }
            ]
        });
        myChart5.setOption({
            grid: {
//            left: '5%',
//            right: '5%',
                bottom: '12%',
//            top:'8%',
            },
            tooltip : {
                trigger: 'axis'
            },
            calculable : true,
            legend: {
                data:['新增匠人','总量'],
            },
            xAxis : [
                {
                    type : 'category',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                    data :data_x
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name : '增量',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                },
                {
                    type : 'value',
                    name : '总量',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                }
            ],
            series : [
                {
                    name:'新增匠人',
                    barCategoryGap: '65%',
                    type:'bar',
                    itemStyle: {normal: {
                        color:'#44B7D3',
                    }},
                    data:data_man_add
                },
                {
                    name:'总量',
                    type:'line',
                    yAxisIndex: 1,
                    itemStyle: {normal: {
                        color:'#8AEDD5',
                    }},
                    data:data_man_tol
                }
            ]
        });
        myChart6.setOption({
            grid: {
//            left: '5%',
//            right: '5%',
                bottom: '12%',
//            top:'8%',
            },
            tooltip : {
                trigger: 'axis'
            },
            calculable : true,
            legend: {
                data:['公众号','文章','总量'],
            },
            xAxis : [
                {
                    type : 'category',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                    data : data_x
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name : '增量',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                },
                {
                    type : 'value',
                    name : '总量',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                }
            ],
            series : [
                {
                    name:'公众号',
                    barCategoryGap: '65%',
                    type:'bar',
                    stack:'总量',
                    itemStyle: {normal: {
                        color:'#2797D2',
                    }},
                    data:data_gz_add
                },
                {
                    name:'文章',
                    barCategoryGap: '65%',
                    stack:'总量',
                    type:'bar',
                    itemStyle: {normal: {
                        color:'#44B7D3',
                    }},
                    data:data_atc_add
                },
                {
                    name:'总量',
                    type:'line',
                    yAxisIndex: 1,
                    itemStyle: {normal: {
                        color:'#8AEDD5',
                    }},
                    data:data_atc_tol
                }
            ]
        });
        myChart7.setOption({
            grid: {
//            left: '5%',
//            right: '5%',
                bottom: '12%',
//            top:'8%',
            },
            tooltip : {
                trigger: 'axis'
            },
            calculable : true,
            legend: {
                data:['新增浏览量','总量'],
            },
            xAxis : [
                {
                    type : 'category',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                    data : data_x
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name : '增量',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                },
                {
                    type : 'value',
                    name : '总量',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                }
            ],
            series : [
                {
                    name:'新增浏览量',
                    barCategoryGap: '65%',
                    type:'bar',
                    itemStyle: {normal: {
                        color:'#44B7D3',
                    }},
                    data:data_scan_add
                },
                {
                    name:'总量',
                    type:'line',
                    yAxisIndex: 1,
                    itemStyle: {normal: {
                        color:'#8AEDD5',
                    }},
                    data:data_scan_tol
                }
            ]
        });
        myChart8.setOption({
            grid: {
                left: '5%',
                right: '5%',
                bottom: '12%',
//            top:'8%',
            },
            tooltip : {
                trigger: 'axis'
            },
            calculable : true,
            legend: {
                data:['收藏','留言','签到','总量']
            },
            xAxis : [
                {
                    type : 'category',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                    data : data_x
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name : '增量',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                },
            ],
            series : [
                {
                    name:'收藏',
                    barCategoryGap: '65%',
                    type:'line',
                    //stack:'总量',
                    itemStyle: {normal: {
                        color:'#001852',
                    }},
                    data:data_col
                },
                {
                    name:'留言',
                    barCategoryGap: '65%',
                    type:'line',
                    //stack:'总量',
                    itemStyle: {normal: {
                        color:'#45BFDE',
                    }},
                    data:data_com
                },
                {
                    name:'签到',
                    barCategoryGap: '65%',
                    type:'line',
                    //stack:'总量',
                    itemStyle: {normal: {
                        color:'#C7B48F',
                    }},
                    data:data_sign
                },
                {
                    name:'总量',
                    type:'line',
                    itemStyle: {normal: {
                        color:'#E02156',
                    }},
                    data:data_total
                }
            ]
        });
        var chart=[myChart4,myChart5,myChart6,myChart7,myChart8]
        for(var i in chart){ chart[i].hideLoading()}
        $(window).resize(function () {
            myChart4.resize();
            myChart5.resize();
            myChart6.resize();
            myChart7.resize();
            myChart8.resize();
        })
    })
}
function retentions() {
    myChart3.showLoading();
    var start_time = $('#start_time_2').val(), end_time = $('#end_time_2').val()
    $.get('/retentions/', {start: start_time, end: end_time}, function (data) {
        $('#start_time_2').val(data[0].start_date), $('#end_time_2').val(data[0].end_date)
        var data_x = [], data_ios = [], data_and = []
        for (var i in data[1].value) {
            data_x.push(data[1].value[i].date.split('-')[1] + "/" + data[1].value[i].date.split('-')[2])
            data_ios.push(data[1].value[i].data)
            data_and.push(data[2].value[i].data)
        }
        myChart3.setOption({
            grid: {
                left: '5%',
                right: '5%',
                bottom: '12%',
                top: '9%',
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params){
                    return params[0].name+'<br/>'+params[0].seriesName + ' : ' + params[0].value + '%<br/>'
                        + params[1].seriesName + ' : ' + params[1].value + '%<br/>'

                }
            },
            calculable: true,
            legend: {
                data: ['iOS', '安卓',],
                x: '85%'
            },
            xAxis: [
                {
                    name: '日期',
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
                    name: '百分比（%）',
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
                    name: 'iOS',
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 5,
                    itemStyle: {
                        normal: {
                            color: '#E52C3C',
                        }
                    },
                    data: data_ios
                },
                {
                    name: '安卓',
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 5,
                    itemStyle: {
                        normal: {
                            color: '#F7B1AB',
                        }
                    },
                    data: data_and
                },
            ]
        });
        myChart3.hideLoading();
        $(window).resize(function () {
            myChart3.resize();
        })
    })
}


