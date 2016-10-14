/**
 * Created by Administrator on 2016/4/27 0027.
 */
var myChart1 = echarts.init(document.getElementById('right_curveoforder_1'),'dark');
var myChart2 = echarts.init(document.getElementById('right_curveoforder_2'),'dark');
var myChart3 = echarts.init(document.getElementById('right_curveoforder_3'),'dark');
var myChart4 = echarts.init(document.getElementById('right_curveoforder_4'),'dark');
var myChart5= echarts.init(document.getElementById('right_curveoforder_5'),'dark');
var myChart6= echarts.init(document.getElementById('right_curveoforder_6'),'dark');
var myChart7= echarts.init(document.getElementById('right_curveoforder_7'),'dark');
var myChart8= echarts.init(document.getElementById('right_curveoforder_8'),'dark');
var myChart9= echarts.init(document.getElementById('right_curveoforder_9'),'dark');
download();
function download() {
    var start_day=$('#start_time').val(),end_day=$('#end_time').val()
    $.ajax({
        url: '/json/date_down',
        dataType: 'json',
        data:{
            start_day:start_day,
            end_day:end_day
        },
        type: 'get',
        async: false,
        beforeSend: function () {
            // 禁用按钮防止重复提交
            $(".select button").val('加载中...').attr({ disabled: "disabled" });
        },
        success: function (data) {
            var data_date=new Array(),data_all=new Array(),data_ios=new Array(),data_android=new Array()
            for(var i=0;i<data.android.length;i++){
                data_date.push(data.android[i].date.split('-')[1]+'月')
                data_all.push(data.android[i].all+data.ios[i].all)
                data_ios.push(data.ios[i].cur)
                data_android.push(data.android[i].cur)
            }
            var option = {
                title:{
                    text : '下载用户',
                    textStyle:{
                        fontSize:14
                    }
                },
                tooltip : {
                    trigger: 'axis',
                },
                calculable : true,
                legend: {
                    data:['IOS下载量','安卓下载量','下载总量']
                },
                xAxis : [
                    {
                        type : 'category',
                        axisLabel : {
                            formatter: '{value}'
                        },
                        data : data_date
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '新增',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    },
                    {
                        type : 'value',
                        name : '总量',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    }
                ],
                series : [

                    {
                        name:'IOS下载量',
                        type:'bar',
                        stack:'总量',
                        barCategoryGap: '60%',
                        data:data_ios,
                        itemStyle:{
                            normal:{
                                color:'#B6A2DE'
                            },
                        },
                    },
                    {
                        name:'安卓下载量',
                        type:'bar',
                        stack:'总量1',
                        barCategoryGap: '60%',
                        data:data_android,
                        itemStyle:{
                            normal:{
                                color:'#2EC7C9'
                            },
                        },
                    },
                    {
                        name:'下载总量',
                        type:'line',
                        smooth:true,
                        data:data_all,
                        yAxisIndex: 1,
                        itemStyle:{
                            normal:{
                                color:'#FFBF43'
                            },
                        },
                        lineStyle: {
                            normal: {
                                color:'#FFBF43',
                                width: 3,
                                shadowColor: 'rgba(0,0,0,0.4)',
                                shadowBlur: 10,
                                shadowOffsetY: 10
                            }
                        },
                    }
                ]
            };
            myChart1.setOption(option);
        },
    })
}
//注册量
sign();
function sign() {
    var start_day=$('#start_time').val(),end_day=$('#end_time').val()
    $.ajax({
        url: '/json/reg_month',
        dataType: 'json',
        data:{
            start_day:start_day,
            end_day:end_day
        },
        type: 'get',
        async: false,
        success: function (data) {
            var data_date=new Array(),data_all=new Array(),data_day=new Array()
            for(var i=0;i<data.reg.length;i++){
                data_date.push(data.reg[i].date.split('-')[1]+'月')
                data_all.push(data.reg[i].all)
                data_day.push(data.reg[i].cur)
            }
            var option = {
                title:{
                    text : '注册用户',
                    textStyle:{
                        fontSize:14
                    }
                },
                tooltip : {
                    trigger: 'axis'
                },
                calculable : true,
                legend: {
                    data:['新增注册量','注册总量']
                },
                xAxis : [
                    {
                        type : 'category',
                        axisLabel : {
                            formatter: '{value}'
                        },
                        data : data_date
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '新增',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    },
                    {
                        type : 'value',
                        name : '总量',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    }
                ],
                series : [

                    {
                        name:'新增注册量',
                        type:'bar',
                        barCategoryGap: '65%',
                        itemStyle:{
                            normal:{
                                color:'#61A0A8'
                            },
                        },
                        data:data_day
                    },
                    {
                        name:'注册总量',
                        type:'line',
                        smooth:true,
                        data:data_all,
                        yAxisIndex: 1,
                        itemStyle:{
                            normal:{
                                color:'#D87C7C'
                            },
                        },
                        lineStyle: {
                            normal: {
                                color:'#D87C7C',
                                width: 3,
                                shadowColor: 'rgba(0,0,0,0.4)',
                                shadowBlur: 10,
                                shadowOffsetY: 10
                            }
                        },
                    }
                ]
            };
            myChart2.setOption(option);
        },
    })
}
//商家
shop();
function shop() {
    var start_day=$('#start_time').val(),end_day=$('#end_time').val()
    $.ajax({
        url: '/json/biz_month',
        dataType: 'json',
        data:{
            start_day:start_day,
            end_day:end_day
        },
        type: 'get',
        async: false,
        success: function (data) {
            var data_date=new Array(),data_all=new Array(),data_day=new Array()
            for(var i=0;i<data.biz.length;i++){
                data_date.push(data.biz[i].date.split('-')[1]+'月')
                data_all.push(data.biz[i].all)
                data_day.push(data.biz[i].cur)
            }
            var option = {
                title:{
                    text : '商家量',
                    textStyle:{
                        fontSize:14
                    }
                },
                tooltip : {
                    trigger: 'axis'
                },
                calculable : true,
                legend: {
                    data:['新增商家','商家总量']
                },
                xAxis : [
                    {
                        type : 'category',
                        axisLabel : {
                            formatter: '{value}'
                        },
                        data : data_date
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '新增',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    },
                    {
                        type : 'value',
                        name : '总量',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    }
                ],
                series : [

                    {
                        name:'新增商家',
                        type:'bar',
                        barCategoryGap: '60%',
                        itemStyle:{
                            normal:{
                                color:'#D6AA81'
                            },
                        },
                        data:data_day
                    },
                    {
                        name:'商家总量',
                        type:'line',
                        smooth:true,
                        yAxisIndex: 1,
                        itemStyle:{
                            normal:{
                                color:'#919E8B'
                            },
                        },
                        lineStyle: {
                            normal: {
                                color:'#919E8B',
                                width: 3,
                                shadowColor: 'rgba(0,0,0,0.4)',
                                shadowBlur: 10,
                                shadowOffsetY: 10
                            }
                        },
                        data:data_all
                    }
                ]
            };
            myChart3.setOption(option);
        }
    })
}
//活动
activity();
function activity() {
    var start_day=$('#start_time').val(),end_day=$('#end_time').val()
    $.ajax({
        url: '/json/act_month',
        dataType: 'json',
        data:{
            start_day:start_day,
            end_day:end_day
        },
        type: 'get',
        async: false,
        success: function (data) {
            var data_date=new Array(),data_all=new Array(),data_day=new Array(),data_sta=new Array()
            for(var i=0;i<data.act.length;i++){
                data_date.push(data.act[i].date.split('-')[1]+'月')
                data_all.push(data.act[i].all)
                data_day.push(data.act[i].cur)
            }
            data_sta.push(data.status_per[4].value)
            data_sta.push(data.status_per[0].value)
            data_sta.push(data.status_per[1].value)
            data_sta.push(data.status_per[3].value)
            data_sta.push(data.status_per[2].value)

            var option = {
                title:{
                    text : '活动量',
                    textStyle:{
                        fontSize:14
                    }
                },
                tooltip : {
                    trigger: 'axis'
                },
                calculable : true,
                legend: {
                    data:['新增活动','活动总量']
                },
                xAxis : [
                    {
                        type : 'category',
                        axisLabel : {
                            formatter: '{value}'
                        },
                        data : data_date
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '新增',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    },
                    {
                        type : 'value',
                        name : '总量',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    }
                ],
                series : [

                    {
                        name:'新增活动',
                        type:'bar',
                        barCategoryGap: '60%',
                        itemStyle:{
                            normal:{
                                color:'#919E8B'
                            },
                        },
                        data:data_day
                    },
                    {
                        name:'活动总量',
                        type:'line',
                        yAxisIndex: 1,
                        smooth:true,
                        data:data_all,
                        itemStyle:{
                            normal:{
                                color:'#C23531'
                            },
                        },
                        lineStyle: {
                            normal: {
                                color:'#C23531',
                                width: 3,
                                shadowColor: 'rgba(0,0,0,0.4)',
                                shadowBlur: 10,
                                shadowOffsetY: 10
                            }
                        },
                    }
                ]
            };
            myChart4.setOption(option);
            var option = {
                title:{
                    text : '活动状态',
                    textStyle:{
                        fontSize:14
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function (params) {
                        var tar = params[1];
                        return tar.name + tar.seriesName + ' : ' + tar.value;
                    }
                },
                xAxis : [
                    {
                        type : 'category',
                        splitLine: {show:false},
                        data : ['总活动数','已下线','通过审核','已删除','待审核']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'辅助',
                        type:'bar',
                        stack: '总量',
                        itemStyle:{
                            normal:{
                                barBorderColor:'rgba(0,0,0,0)',
                                color:'rgba(0,0,0,0)'
                            },
                            emphasis:{
                                barBorderColor:'rgba(0,0,0,0)',
                                color:'rgba(0,0,0,0)'
                            }
                        },
                        data:[0, 600, 400, 200, 50],
                    },
                    {
                        name:'',
                        type:'bar',
                        stack: '总量',
                        barCategoryGap: '50%',
                        itemStyle : { normal: {label : {show: true, position: 'inside'},barBorderRadius:[5, 5, 5, 5], color:'#B6A2DE'}},
                        data:data_sta
                    }
                ]
            };
            myChart5.setOption(option);
        }
    })
}
//用户留存
keep_user();
function keep_user() {
    $.ajax({
        url: '/json/keep_user',
        dataType: 'json',
        type: 'get',
        async: false,
        success: function (data) {
            var data_date=new Array(),data_ios=new Array(),data_android=new Array()
            for(var i=0;i<data.ios.length;i++){
                data_date.push(data.ios[i].date.split('-')[2]+'日')
                data_ios.push(data.ios[i].keep_per)
                data_android.push(data.android[i].keep_per)
            }
            var option = {
                title:{
                    text : '用户7日留存',
                    textStyle:{
                        fontSize:14
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    formatter: function (params){
                        return params[0].name+'<br/>'+params[0].seriesName + ' : ' + params[0].value + '%<br/>'
                            + params[1].seriesName + ' : ' + params[1].value + '%<br/>'

                    }
                },
                calculable : true,
                legend: {
                    data:['IOS','安卓']
                },
                xAxis : [
                    {
                        type : 'category',
                        axisLabel : {
                            formatter: '{value}'
                        },
                        data : data_date
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '',
                        axisLabel : {
                            formatter: '{value}%'
                        }
                    }
                ],
                series : [
                    {
                        name:'IOS',
                        type:'line',
                        smooth:true,
//                            barCategoryGap: '50%',
                        data:data_ios,
                        lineStyle: {
                            normal: {
                                width: 2,
                                shadowColor: 'rgba(0,0,0,0.4)',
                                shadowBlur: 10,
                                shadowOffsetY: 10
                            }
                        },
                    },
                    {
                        name:'安卓',
                        type:'line',
                        smooth:true,
                        data:data_android,
                        lineStyle: {
                            normal: {
                                width: 2,
                                shadowColor: 'rgba(0,0,0,0.4)',
                                shadowBlur: 10,
                                shadowOffsetY: 10
                            }
                        },
                    }
                ]
            };
            myChart6.setOption(option);
        }
    })
}
//gmv
gmv();
function gmv() {
    var start_day=$('#start_time').val(),end_day=$('#end_time').val()
    $.ajax({
        url: '/json/gmv_month',
        dataType: 'json',
        data:{
            start_day:start_day,
            end_day:end_day
        },
        type: 'get',
        async: false,
        success: function (data) {
            var data_date=new Array(),data_all=new Array(),data_day=new Array()
            for(var i=0;i<data.gmv.length;i++){
                data_date.push(data.gmv[i].date.split('-')[1]+'月')
                data_all.push(data.gmv[i].all)
                data_day.push(data.gmv[i].cur)
            }
            var option = {
                title:{
                    text : 'GMV',
                    textStyle:{
                        fontSize:14
                    }
                },
                tooltip : {
                    trigger: 'axis'
                },
                calculable : true,
                legend: {
                    data:['新增GMV','总GMV']
                },
                xAxis : [
                    {
                        type : 'category',
                        axisLabel : {
                            formatter: '{value}'
                        },
                        data : data_date
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '新增',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    },
                    {
                        type : 'value',
                        name : '总量',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    }
                ],
                series : [
                    {
                        name:'新增GMV',
                        type:'bar',
                        barCategoryGap: '60%',
                        data:data_day,
                        itemStyle:{
                            normal:{
                                color:'#919E8B'
                            },
                        },
                    },
                    {
                        name:'总GMV',
                        type:'line',
                        smooth:true,
                        yAxisIndex: 1,
                        data:data_all,
                        itemStyle:{
                            normal:{
                                color:'#E3C2A2'
                            },
                        },
                        lineStyle: {
                            normal: {
                                color:'#E3C2A2',
                                width: 3,
                                shadowColor: 'rgba(0,0,0,0.4)',
                                shadowBlur: 10,
                                shadowOffsetY: 10
                            }
                        },
                    }
                ]
            };
            myChart7.setOption(option);
        }
    })
}
//销售额
sold();
function sold() {
    var start_day=$('#start_time').val(),end_day=$('#end_time').val()
    $.ajax({
        url: '/json/sold_month',
        dataType: 'json',
        data:{
            start_day:start_day,
            end_day:end_day
        },
        type: 'get',
        async: false,
        success: function (data) {
            var data_date=new Array(),data_all=new Array(),data_day=new Array()
            for(var i=0;i<data.sold.length;i++){
                data_date.push(data.sold[i].date.split('-')[1]+'月')
                data_all.push(data.sold[i].all)
                data_day.push(data.sold[i].cur)
            }
            var option = {
                title:{
                    text : '销售额',
                    textStyle:{
                        fontSize:14
                    }
                },
                tooltip : {
                    trigger: 'axis'
                },
                calculable : true,
                legend: {
                    data:['新增销售额','销售总额']
                },
                xAxis : [
                    {
                        type : 'category',
                        axisLabel : {
                            formatter: '{value}'
                        },
                        data : data_date
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '新增',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    },
                    {
                        type : 'value',
                        name : '总量',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    }
                ],
                series : [

                    {
                        name:'新增销售额',
                        type:'bar',
                        barCategoryGap: '60%',
                        itemStyle:{
                            normal:{
                                color:'#E69D87'
                            },
                        },
                        data:data_day
                    },
                    {
                        name:'销售总额',
                        type:'line',
                        smooth:true,
                        yAxisIndex: 1,
                        itemStyle:{
                            normal:{
                                color:'#C23531'
                            },
                        },
                        lineStyle: {
                            normal: {
                                color:'#C23531',
                                width: 3,
                                shadowColor: 'rgba(0,0,0,0.4)',
                                shadowBlur: 10,
                                shadowOffsetY: 10
                            }
                        },
                        data:data_all
                    }
                ]
            };
            myChart8.setOption(option);
        }
    })
}
//arpu
arpu();
function arpu() {
    var start_day=$('#start_time').val(),end_day=$('#end_time').val()
    $.ajax({
        url: '/json/arpu_month',
        dataType: 'json',
        data:{
            start_day:start_day,
            end_day:end_day
        },
        type: 'get',
        async: false,
        success: function (data) {
            $(".select button").val('确定').removeAttr("disabled");
            var data_date=new Array(),data_day=new Array(),avg_arpu,buy_rate
            for(var i=0;i<data.arpu.length;i++){
                data_date.push(data.arpu[i].date.split('-')[1]+'月')
                data_day.push(data.arpu[i].cur)
            }
            avg_arpu=data.avg_arpu, buy_rate=data.buy_rate
            $('.avg').html('平均arpu值：'+avg_arpu)
            $('.buy_rate').html('购买频次：'+buy_rate)
            var option = {
                title:{
                    text : 'ARPU',
                    textStyle:{
                        fontSize:14
                    }
                },
                tooltip : {
                    trigger: 'axis'
                },
                calculable : true,
                legend: {
                    data:['arpu']
                },
                xAxis : [
                    {
                        type : 'category',
                        axisLabel : {
                            formatter: '{value}'
                        },
                        data : data_date
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
                        name:'arpu',
                        type:'line',
                        smooth:true,
                        itemStyle:{
                            normal:{
                                color:'#FFBF43'
                            },
                        },
                        lineStyle: {
                            normal: {
                                color:'#FFBF43',
                                width: 3,
                                shadowColor: 'rgba(0,0,0,0.4)',
                                shadowBlur: 10,
                                shadowOffsetY: 10
                            }
                        },
                        data:data_day,
                    }
                ]
            };
            myChart9.setOption(option);
        }
    })
}
$(window).resize(function () {
    myChart1.resize();
    myChart2.resize();
    myChart3.resize();
    myChart4.resize();
    myChart5.resize();
    myChart6.resize();
    myChart7.resize();
    myChart8.resize();
    myChart9.resize();
})
$('.select button').on('click',function(){
    download();
    sign();
    gmv();
    sold();
    arpu();
    activity();
    shop();
})
