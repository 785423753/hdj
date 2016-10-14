/**
 * Created by Administrator on 2016/6/20 0020.
 */
var myChart1 = echarts.init(document.getElementById('download'),'infographic');
var myChart2 = echarts.init(document.getElementById('browse'),'dark');
var myChart3 = echarts.init(document.getElementById('down'),'dark');
var myChart4 = echarts.init(document.getElementById('shop'),'');
var Chart=[myChart1,myChart2,myChart3,myChart4]
for(var i in Chart){
    Chart[i].showLoading();
}
$.get('/?json=1',function(data){
    var data_x=[],data_y1=[],data_y2=[],data_y3=[],data_ios=[],data_and=[],data_total=[],data_x1=[],data_y=[]
    for(var i in data[6].values){
        data_x.push(data[6].values[i].date.split('-')[1]+'/'+data[6].values[i].date.split('-')[2])
        data_y1.push(data[6].values[i].total_pv_day/10000)
        data_y2.push(data[6].values[i].signed_day)
        data_y3.push(data[6].values[i].collected_day)
        data_total.push(data[7].values.data[i]/10000)
        data_ios.push(data[8].values.data[i])
        data_and.push(data[9].values.data[i])
    }
    for(var i in data[2].values){
        //data_x1.push()
        data_y.push({name:data[2].values[i].name+" "+data[2].values[i].percent+"%",value:data[2].values[i].amount})
    }
    myChart1.setOption({
        backgroundColor:'rgba(0,0,0,0)',
        title:{
            text:data[0][0].value,
            x:'center',
            y:'center',
            textStyle:{
                fontSize: 26,
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name:'',
                type:'pie',
                radius: ['45%', '65%'],
                avoidLabelOverlap: false,
                itemStyle:{
                    normal:{
                        label:{
                            show:true,
                            formatter: "{b}:{d}%"
                        },
                    }
                },
                data:[
                    {value:data[0][1].amount, name:'未注册', itemStyle: {normal: {color:'#1C7099',labelLine:{show:true,length:30}}}},
                    {value:data[0][3].amount, name:'VIP', itemStyle: {normal: {color:'#99D2DD'}}},
                    {value:data[0][2].amount, name:'注册未买\nVIP', itemStyle: {normal: {color:'#1BB2D8'}}},
                ]
            }
        ]
    });
    myChart2.setOption({
        grid: {
            bottom: '12%',
        },
        tooltip : {
            trigger: 'axis'
        },
        calculable : true,
        legend: {
            data:['收藏量','签到量','总浏览量']
        },
        xAxis : [
            {
                type : 'category',
                splitLine : {
                    show:false,
                },
                data : data_x
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '数量',
                splitLine : {
                    show:false,
                },
            },
            {
                type : 'value',
                name : '总量（w）',
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
                name:'收藏量',
                type:'bar',
                itemStyle: {normal: {
                    color:'#1790CF',
                }},
                data:data_y3
            },
            {
                name:'签到量',
                type:'bar',
                itemStyle: {normal: {
                    color:'#1BB2D8',
                }},
                data:data_y2
            },
            {
                name:'总浏览量',
                type:'line',
                yAxisIndex: 1,
                itemStyle: {normal: {
                    color:'#99D2DD',
                }},
                data:data_y1
            }
        ]
    });
    myChart3.setOption({
        grid: {
            right: '8%',
            bottom: '12%',
            top:'13%',
        },
        tooltip : {
            trigger: 'axis'
        },
        calculable : true,
        legend: {
            data:['iOS','安卓','下载总量'],
        },
        xAxis : [
            {
                type : 'category',
                splitLine : {
                    show:false,
                },
                data : data_x
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '数量',
                splitLine : {
                    show:false,
                },
            },
            {
                type : 'value',
                name : '总量（w）',
                splitLine : {
                    show:false,
                },
            },
        ],
        series : [
            {
                name:'iOS',
                type:'bar',
                stack:'总量',
                barCategoryGap: '55%',
                itemStyle: {normal: {
                    color:'#408829',
                }},
                data:data_ios
            },
            {
                name:'安卓',
                type:'bar',
                stack:'总量',
                itemStyle: {normal: {
                    color:'#68A54A',
                }},
                data:data_and
            },
            {
                name:'下载总量',
                type:'line',
                yAxisIndex:1,
                itemStyle: {normal: {
                    color:'#A9CBA2',
                }},
                data:data_total
            }
        ]
    });
    myChart4.setOption({
        tooltip : {
            trigger: 'item',
            formatter: "{b}({c})"
        },
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                roam:false,
                left:'1%',
                top:'1%',
                width:'99%',
                height:'85%',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                },
                data:data_y
            }
        ]
    });
    for(var i in Chart){
        Chart[i].hideLoading();
    }
    $(window).resize(function () {
        myChart1.resize();
        myChart2.resize();
        myChart3.resize();
        myChart4.resize();
    })
})

