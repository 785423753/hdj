/**
 * Created by Administrator on 2016/4/14 0014.
 */
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('right_curveoforder_1'),'dark');
userAct();
function userAct(){
    var start_day=$('#start_time').val(),end_day=$('#end_time').val()
    $.ajax({
        url:'/json/userAct',
        data:{
            start_day:start_day,
            end_day:end_day
        },
        dataType:'json',
        type:'get',
        async:false,
        beforeSend: function () {
            // 禁用按钮防止重复提交
            $(".select button").html('加载中...').attr({ disabled: "disabled" });
        },
        success:function(data){
            $(".select button").html('确定').removeAttr("disabled");
            var data_x=new Array(),data_all=new Array(),data_col=new Array(),data_order=new Array(),data_con=new Array()
            var total_1,total_2,total_3,total_4
            for(var i=0;i<data.x.length;i++){
                data_x.push(data.x[i].split('-')[2]+'日')
            }
            for(var i=0;i<data.y_all.length;i++){
                data_all.push(data.y_all[i])
                data_order.push(data.y_order[i])
                data_col.push(data.y_col[i])
                data_con.push(data.y_consult[i])
            }
            total_1=data.y_all.reduce(function (x,y) {
                return x+y
            })
            total_2=data.y_col.reduce(function (x,y) {
                return x+y
            })
            total_3=data.y_order.reduce(function (x,y) {
                return x+y
            })
            total_4=data.y_consult.reduce(function (x,y) {
                return x+y
            })
            $('.all').text(total_1), $('.collect').text(total_2), $('.order').text(total_3), $('.con').text(total_4)
            // 指定图表的配置项和数据
            var option = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    //x:'60%',
                    data:['操作行为用户','下单用户','收藏用户','留言用户']
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        axisLabel : {
                            formatter: '{value}'
                        },
                        data : data_x
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value}'
                        },
                    }
                ],
                series : [
                    {
                        name:'操作行为用户',
                        type:'line',
                        stack: '总量',
                        smooth:true,
                        data:data_all,
                    },
                    {
                        name:'下单用户',
                        type:'line',
                        stack: '总量1',
                        smooth:true,
                        data:data_order,
                    },
                    {
                        name:'收藏用户',
                        type:'line',
                        stack: '总量2',
                        smooth:true,
                        data:data_col,
                    },
                    {
                        name:'留言用户',
                        type:'line',
                        stack: '总量3',
                        smooth:true,
                        data:data_con,
                    },
                ],

            };
// 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    })
}
// 指定图表的配置项和数据
$(window).resize(function () {
    myChart.resize();
})
$('.select button').on('click', function () {
    userAct();
})