/**
 * Created by Administrator on 2016/6/20 0020.
 */
var myChart1= echarts.init(document.getElementById('shop'),'dark');
var myChart2= echarts.init(document.getElementById('attention'),'dark');
var myChart3= echarts.init(document.getElementById('industry'),'');
$('.select button').click(function () {
    shop()
})
shop()
function shop(){
    myChart1.showLoading();
    myChart2.showLoading();
    myChart3.showLoading();
    var start_time=$('#start_time').val(),end_time=$('#end_time').val(),city_id=$('#city_id').val()
    $.get('/dataofshops/?json=1',{city:city_id,start:start_time,end:end_time},function(data){
        var data_x=[],data_shop_add=[],data_shop_tol=[],data_cat=[],data_add_like=[],data_add_sign=[],data_total=[]
        for(var i in data[2].value){
            data_x.push(data[2].value[i].date)
            data_shop_add.push(data[2].value[i].add)
            data_shop_tol.push(data[2].value[i].total/1000)
            data_add_like.push(data[3].value[i].add_likes)
            data_add_sign.push(data[3].value[i].add_signed)
            data_total.push(data[3].value[i].total)
        }
        for(var i in data[4].value){
            data_cat.push({name:data[4].value[i].name,value:data[4].value[i].amount})
        }
        $('table').html('<tr><td></td><td>小店名称</td><td>所属城市</td><td>所属类别</td></tr>')
        for(var i in data[5].value){
            var j=parseInt(i)+1
            var tag=''
            for(var item in data[5].value[i].tag){
                tag+=data[5].value[i].tag[item]+' '
            }
            $('table').append('<tr><td><span>'+j+'</span></td><td>'+data[5].value[i].name+'</td><td>'+data[5].value[i].city+'</td><td>'+tag+'</td></tr>')
        }
        $($('table').find('span')[0]).css({background:'#E75453'})
        $($('table').find('span')[1]).css({background:'#E2622A'})
        $($('table').find('span')[2]).css({background:'#E5A14F'})
        myChart1.setOption({
            grid: {
                left: '5%',
                right: '5%',
                bottom: '12%',
                top:'10%',
            },
            tooltip : {
                trigger: 'axis'
            },
            calculable : true,
            legend: {
                data:['新增小店','总量']
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
                    name : '总量（k）',
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
                    type:'bar',
                    barCategoryGap: '60%',
                    itemStyle: {normal: {
                        color:'#68A54A',
                    }},
                    data:data_shop_add
                },
                {
                    name:'总量',
                    type:'line',
                    yAxisIndex: 1,
                    symbolSize:5,
                    itemStyle: {normal: {
                        color:'#A9CBA2',
                    }},
                    data:data_shop_tol
                }
            ]
        });
        myChart2.setOption({
            grid: {
                left: '5%',
                right: '5%',
                bottom: '12%',
                top:'10%',
            },
            tooltip : {
                trigger: 'axis'
            },
            calculable : true,
            legend: {
                data:['每日收藏量','每日签到量','每日总关注度']
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
                    name:'每日收藏量',
                    type:'bar',
                    itemStyle: {normal: {
                        color:'#E52C3C',
                    }},
                    data:data_add_like
                },
                {
                    name:'每日签到量',
                    type:'bar',
                    itemStyle: {normal: {
                        color:'#F7B1AB',
                    }},
                    data:data_add_sign
                },
                {
                    name:'每日总关注度',
                    type:'line',
                    symbolSize:5,
                    yAxisIndex: 1,
                    itemStyle: {normal: {
                        color:'#FA506C',
                    }},
                    data:data_total
                }
            ]
        });
        myChart3.setOption({
            tooltip : {
                trigger: 'item',
                formatter: "{b}: {c}"
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
                    data:data_cat
                }
            ]
        });
        myChart1.hideLoading();
        myChart2.hideLoading();
        myChart3.hideLoading();
        $(window).resize(function () {
            myChart1.resize();
            myChart2.resize();
            myChart3.resize();
        })
    })
}


