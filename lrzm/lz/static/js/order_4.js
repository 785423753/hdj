/**
 * Created by Administrator on 2016/4/14 0014.
 */
// 基于准备好的dom，初始化echarts实例
var myChart4 = echarts.init(document.getElementById('right_curveoforder_4'),'dark');
var myChart6 = echarts.init(document.getElementById('right_curveoforder_6'),'dark');
section();
function section() {
    var start_day = $('#start_time').val(), end_day = $('#end_time').val()
    $.ajax({
        url: '/json/section',
        data: {
            start_day: start_day,
            end_day: end_day
        },
        dataType: 'json',
        type: 'get',
        async: false,
        success: function (data) {
            var data_x=new Array(),data_y=new Array()
            for(var i=0;i<data.section.section.length-1;i++){
                data_x.push(data.section.section[i].section.join('~'))
            }
            data_x.push(data.section.section[data.section.section.length-1].section+"以上")
            for(var i=0;i<data.section.section.length;i++){
                data_y.push((data.section.section[i].per*100).toFixed(2))
            }
            $('.avg').text((data.section.avg).toFixed(1))
            // 指定图表的配置项和数据
            var option = {
                tooltip : {
                    trigger: 'axis',
                    formatter: function (params){
                        return params[0].name+'<br/>'+params[0].value+"%"
                    }
                },
                legend: {
                    data:[]
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        name:'成交价格/元',
                        data :data_x
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'比例',
                        axisLabel : {
                            formatter: '{value}%'
                        },
                    }
                ],
                series : [
                    {
                        name:'',
                        type:'bar',
                        barCategoryGap: '80%',
                        data:data_y,
                        itemStyle:{
                            normal:{
                                color:'#60C0DD',
                                barBorderRadius:[4,4,4,4],
                            },
                        },
                    }
                ]
            };
// 使用刚指定的配置项和数据显示图表。
            myChart4.setOption(option);
        }
    })
}
category();
function category() {
    var start_day = $('#start_time').val(), end_day = $('#end_time').val()
    $.ajax({
        url: '/json/category',
        data: {
            start_day: start_day,
            end_day: end_day
        },
        dataType: 'json',
        type: 'get',
        async: false,
        success: function (data) {
            var data_x=new Array(),data_y=new Array()
            for(var i=0;i<data.category.length;i++){
                data_x.push(data.category[i].category_name)
                data_y.push(data.category[i].number)
            }
            console.log(data_y)
            // 指定图表的配置项和数据
            var option = {
                tooltip : {
                    trigger: 'item',
                    //formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    show:false,
                    orient : 'vertical',
                    x : 'left',
                    data:data_x
                },
                xAxis : [
                    {
                        type : 'category',
                        data : data_x
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'订单金额',
                    }
                ],
                series : [
                    {
                        name:'',
                        type:'bar',
                        barCategoryGap: '60%',
                        itemStyle: {
                            normal: {
//                        color:'#B6A2DE',
                                barBorderRadius:[4,4,4,4],
                            },
                        },
                        data:data_y
                    }
                ]
            };

// 使用刚指定的配置项和数据显示图表。
            myChart6.setOption(option);
        }
    })
}
$(window).resize(function () {
    myChart4.resize();
    myChart6.resize();
})
$('.select button').on('click',function(){
    section()
    category();
})
