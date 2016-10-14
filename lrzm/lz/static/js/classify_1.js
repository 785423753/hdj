/**
 * Created by Administrator on 2016/4/21 0021.
 */
var myChart1 = echarts.init(document.getElementById('right_curveoforder_1'),'dark');
var myChart3 = echarts.init(document.getElementById('sex'),'dark');
var myChart4 = echarts.init(document.getElementById('marry'),'dark');
classify()
function classify(){
    var start_day=$('#start_time').val(),end_day=$('#end_time').val()
    $.ajax({
        url:'/json/classify',
        dataType:'json',
        type:'get',
        data:{
            start_day:start_day,
            end_day:end_day
        },
        async:false,
        beforeSend: function () {
            // 禁用按钮防止重复提交
            $(".select button").html('加载中...').attr({ disabled: "disabled" });
        },
        success:function(data){
            var Data=new Array(),Data_female=new Array(),Data_male=new Array(),Data_secret=new Array(),Data_name=new Array()
            var Data_marry=new Array(),Data_parents=new Array(),Data_single=new Array(),Data_Secret=new Array(),data_name=[]
            for(var i=0;i<data.act.length;i++){
                var percent=(Math.round(data.act[i].percent * 10000)/100).toFixed(2) + '%'
                Data.push({name:data.act[i].name+'\n'+percent,value:data.act[i].count})
            }
            for(var i=0;i<data.gender.length;i++){
                Data_female.push(data.gender[i].female)
                Data_male.push(data.gender[i].male)
                Data_secret.push(data.gender[i].secret)
                Data_name.push(data.gender[i].name)
            }
            for(var i=0;i<data.personal.length;i++){
                data_name.push(data.personal[i].name)
                Data_marry.push(data.personal[i].married)
                Data_parents.push(data.personal[i].parents)
                Data_single.push(data.personal[i].single)
                Data_Secret.push(data.personal[i].secret)
            }
            var option1 = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{b}  {c}"
                },
                calculable : false,
                series : [
                    {
                        name:'活动分类占比',
                        type:'treemap',
                        roam:'false',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle:{
                                        fontSize:16
                                    }
                                },
                                borderWidth: 1
                            },
                        },
                        data:Data
                    }
                ]
            };

            //sex
            var option2 = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:['男性','女性','保密'],
                    y:'8%',
                    x:'right'
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'value',
                        name:'订单'
                    }
                ],
                yAxis : [
                    {
                        type : 'category',
                        name:'活动分类',
                        data : Data_name
                    }
                ],
                series : [
                    {
                        name:'男性',
                        type:'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                color:'#61A0A8',
                            },
                        },
                        data:Data_male
                    },
                    {
                        name:'女性',
                        type:'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                color:'#D48265',
                            },
                        },
                        data:Data_female
                    },
                    {
                        name:'保密',
                        type:'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                color:'#91C7AE',
                            },
                        },
                        data:Data_secret
                    },
                ]
            };
            var option3 = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:['单身','为人父母','已婚/恋爱中','保密'],
                    y:'8%',
                    x:'right'
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'value',
                        name:'订单'
                    }
                ],
                yAxis : [
                    {
                        type : 'category',
                        name:'活动分类',
                        data : data_name
                    }
                ],
                series : [
                    {
                        name:'单身',
                        type:'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                color:'#FCCE10',
                            },
                        },
                        data:Data_single
                    },
                    {
                        name:'为人父母',
                        type:'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                color:'#27727B',
                            },
                        },
                        data:Data_parents
                    },
                    {
                        name:'已婚/恋爱中',
                        type:'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                color:'#C1232B',
                            },
                        },
                        data:Data_marry
                    },
                    {
                        name:'保密',
                        type:'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                color:'#B5C334',
                            },
                        },
                        data:Data_Secret
                    },
                ]
            };
            myChart1.setOption(option1);
            myChart3.setOption(option2);
            myChart4.setOption(option3);
        }
    })
}

// 为echarts对象加载数据

$(window).resize(function(){
    myChart1.resize();
    myChart3.resize();
    myChart4.resize();
});
$('.select button').on('click',function(){
    classify()
})