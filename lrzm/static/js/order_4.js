/**
 * Created by Administrator on 2016/4/14 0014.
 */
// 基于准备好的dom，初始化echarts实例
var myChart4 = echarts.init(document.getElementById('right_curveoforder_4'),'dark');
section();
function section() {
    var start_day = $('#start_time').val(), end_day = $('#end_time').val()
    $.ajax({
        url: 'http://218.244.137.196:5000/json/section',
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
                data_y.push(data.section.section[i].count)
            }
            $('.avg').text(data.section.avg)
            // 指定图表的配置项和数据
            var option = {
                tooltip : {
                    trigger: 'axis'
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
                        name:'订单量',
                    }
                ],
                series : [
                    {
                        name:'',
                        type:'bar',
                        barCategoryGap: '85%',
                        data:data_y
                    }
                ]
            };
// 使用刚指定的配置项和数据显示图表。
            myChart4.setOption(option);
        }
    })
}
$(window).resize(function () {
    myChart4.resize();
})
$('.select button').on('click',function(){
    section()
})