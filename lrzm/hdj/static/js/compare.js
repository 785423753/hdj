/**
 * Created by Administrator on 2016/5/28 0028.
 */
var myChart1 = echarts.init(document.getElementById('event_1'),'dark');
var myChart2 = echarts.init(document.getElementById('event_2'),'dark');
var myChart3 = echarts.init(document.getElementById('event_3'),'dark');
var myChart4 = echarts.init(document.getElementById('event_4'),'dark');
var myChart5 = echarts.init(document.getElementById('event_5'),'dark');
var myChart6 = echarts.init(document.getElementById('event_6'),'dark');
var myChart7 = echarts.init(document.getElementById('event_7'),'dark');
var myChart8 = echarts.init(document.getElementById('event_8'),'dark');
var myChart9 = echarts.init(document.getElementById('event_9'),'dark');
var myChart10 = echarts.init(document.getElementById('event_10'),'dark');

var myChatList = [myChart1,myChart2,myChart3,myChart4,myChart5,myChart6,myChart7,myChart8,myChart9,myChart10]

var ys=[{
    type : 'value',
    name:'销售额（w）',
    nameTextStyle:{
        color:'#20509E'
    },
    axisLine : {
        show:false,
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
    splitLine : {
        show:true,
        lineStyle: {
            color: '#222F44',
            type:'solid'
        }
    },
}],xs=[{
    type : 'category',
    data : ['01月','02月','03月','04月','05月','06月','07月','08月','09月','10月','11月','12月'],
    splitLine : {
        show:false,
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
    axisLine : {
        show:true,
        lineStyle: {
            color: '#132055',
            width:2
        }
    },
}]


function comparison(cat){

    $.ajax({
        url:'/newordervis/contrastwithpast/',
        data:{
            cat:cat,
            json:1
        },
        dataType:'json',
        type:'get',
        async:false,
        success:function(data){
            console.log('data.length = ' + data.length)
            var myChartList = []
            $('.content').html('');
            for(var a=0;a<data[2].length;a++){
                str = '<div class="part"><h3>'+data[2][a].name+'</h3><div id="event_'+a+'"></div></div>'
                $('.content').append(str);
                myChart = echarts.init(document.getElementById('event_'+a),'dark');
                myChartList.push(myChart);
            }
            console.log(myChartList)
            for(var i=0;i<data[2].length;i++){
                var data_list1=[],data_list2=[]
                for(var j=0;j<12;j++){
                    data_list1.push(data[2][i]['value'][1]['total_sales'][j]['month_sales'])
                }
                for(var k=0;k<12;k++){
                    data_list2.push(data[2][i]['value'][2]['total_sales'][k]['month_sales'])
                }
                var option = {
                    backgroundColor: 'rgba(0,0,0,0)',//背景色
                    tooltip : {
                        trigger: 'axis',
                    },
                    grid: {
                        top:'10%',
                    },
                    legend: {
                        data:[{name:'2016年',textStyle: {color: '#6CD7FB'}},{name:'2015年',textStyle: {color: '#F8C01B'}}],
                        x:'70%'
                    },
                    xAxis :xs,
                    yAxis :ys,
                    series : [
                        {
                            name:'2016年',
                            type:'line',
                            symbolSize:12,
                            itemStyle:{
                                normal:{
                                    color:'#71DEFB'
                                }
                            },
                            data:data_list1
                        },
                        {
                            name:'2015年',
                            type:'line',
                            symbolSize:12,
                            itemStyle:{
                                normal:{
                                    color:'#FEC51C'
                                }
                            },
                            data:data_list2
                        },

                    ]
                };
                myChartList[i].setOption(option);
            }
        }
    });
}

comparison()

$('.industry li').click(function () {
    var ind=$(this).attr('data-cat');
    comparison(ind);
})



