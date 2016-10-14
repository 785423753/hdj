/**
 * Created by Administrator on 2016/4/14 0014.
 */
// 基于准备好的dom，初始化echarts实例
var myChart3 = echarts.init(document.getElementById('right_curveoforder_3'),'dark');
compare()
function compare(){
    $.ajax({
        url:'/json/compare',
        dataType:'json',
        type:'get',
        async:false,
        success:function(data){
            var data_x=new Array(),data_compare=new Array(),data_order=new Array(),data_rent=new Array(),data_compare2=new Array()
            for(var i=0;i<data.x.length;i++){
                data_x.push(data.x[i])
            }
            for(var i=0;i<data.y_order.length;i++){
                data_order.push(data.y_order[i])
                data_compare.push(data.y_compare[i])
                var a=data.y_order[i]-data.y_compare[i]
                if(a<0){
                    data_rent.push({value : Math.abs(a), itemStyle:{ normal:{color:'red'}}})
                }else{
                    data_rent.push(Math.abs(a))
                }
                var rent
                (data.y_order[i]<data.y_compare[i])?rent=data.y_order[i]:rent=data.y_compare[i]
                data_compare2.push(rent)
            }
            // 指定图表的配置项和数据
            var option = {
                tooltip : {
                    trigger: 'axis',
                    formatter: function (params){
                        return '变化: '
                            + (params[0].value - params[1].value).toFixed(2)+ '<br/>'
                            + params[0].seriesName+params[0].name + ' : ' + params[0].value + '<br/>'
                            + params[1].seriesName+params[0].name + ' : ' + params[1].value + '<br/>'
                    }
                },
                legend: {
                    data:['本周', '上周'],
                    selectedMode:false
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
                        name:'订单额',
                        //min : 200,
                        //max : 450
                    }
                ],
                series : [
                    {
                        name:'本周',
                        type:'line',
                        smooth:true,
                        symbol:'circle',
                        symbolSize:4,
                        data:data_order,
                        itemStyle: {
                            normal: {
                                color:'#2EC7C9',
                                barBorderRadius:[4,4,4,4],
                            },
                        },
                    },
                    {
                        name:'上周',
                        type:'line',
                        smooth:true,
                        symbol:'none',
                        itemStyle:{
                            normal:{
                                lineStyle: {
                                    width:1,
                                    type:'dashed'
                                }
                            }
                        },
                        data:data_compare,
                    },
                    {
                        name:'上周2',
                        type:'bar',
                        stack: '1',
                        barWidth: 6,
                        itemStyle:{
                            normal:{
                                color:'rgba(0,0,0,0)'
                            },
                            emphasis:{
                                color:'rgba(0,0,0,0)'
                            }
                        },
                        data:data_compare2
                    },
                    {
                        name:'变化',
                        type:'bar',
                        stack: '1',
                        data:data_rent
                    }
                ]
            };
// 使用刚指定的配置项和数据显示图表。
            myChart3.setOption(option);
        }
    })
}

$(window).resize(function () {
    myChart3.resize();
})