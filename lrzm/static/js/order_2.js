/**
 * Created by Administrator on 2016/4/14 0014.
 */
// 基于准备好的dom，初始化echarts实例
var myChart2 = echarts.init(document.getElementById('right_curveoforder_2'),'dark');
order_stack()
function order_stack(){
    var start_day=$('#start_time').val(),end_day=$('#end_time').val()
    $.ajax({
        url: 'http://218.244.137.196:5000/json/h_order',
        data: {
            start_day: start_day,
            end_day: end_day
        },
        dataType: 'json',
        type: 'get',
        async: false,
        success:function(data){
            var week1=new Array(), week2=new Array(), week3=new Array(), week4=new Array(), week5=new Array(), week6=new Array(), week0=new Array()
            for(var i=0;i<data.week_0.length;i++){
                week0.push(data.week_0[i])
                week1.push(data.week_1[i])
                week2.push(data.week_2[i])
                week3.push(data.week_3[i])
                week4.push(data.week_4[i])
                week5.push(data.week_5[i])
                week6.push(data.week_6[i])
            }
            // 指定图表的配置项和数据
            var option = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['周一','周二','周三','周四','周五','周六','周日',]
                },

                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        name:'时间',
                        data : ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'订单量',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    }
                ],
                series : [
                    {
                        name:'周一',
                        type:'line',
                        data:week1,
                        //smooth:true,
                    },
                    {
                        name:'周二',
                        type:'line',
                        data:week2,
                        //smooth:true,
                    },
                    {
                        name:'周三',
                        type:'line',
                        data:week3,
                        //smooth:true,
                    },
                    {
                        name:'周四',
                        type:'line',
                        data:week4,
                        //smooth:true,
                    },
                    {
                        name:'周五',
                        type:'line',
                        data:week5,
                        //smooth:true,
                    },
                    {
                        name:'周六',
                        type:'line',
                        data:week6,
                        //smooth:true,
                    },
                    {
                        name:'周日',
                        type:'line',
                        data:week0,
                        //smooth:true,
                    },
                ]
            };

// 使用刚指定的配置项和数据显示图表。
            myChart2.setOption(option);
        }
    })
}
$(window).resize(function () {
    myChart2.resize();
})
$('.select button').on('click',function(){
    order_stack();
})