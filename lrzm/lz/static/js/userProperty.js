/**
 * Created by Administrator on 2016/4/14 0014.
 */
//    1
// 基于准备好的dom，初始化echarts实例
var myChart_1 = echarts.init(document.getElementById('right_curveoforder_1'),'dark');
var myChart_2 = echarts.init(document.getElementById('right_curveoforder_2'),'dark');
var myChart_3 = echarts.init(document.getElementById('right_curveoforder_3'),'dark');
var myChart_4 = echarts.init(document.getElementById('right_curveoforder_4'),'dark');
var myChart_5 = echarts.init(document.getElementById('right_curveoforder_5'),'dark');
property();
function property(){
    $.ajax({
        url:'/json/userProperty',
        dataType:'json',
        type:'get',
        async:false,
        success:function(data){
            var core_user=(data.user.core_user.percent*100).toFixed(2),interactive=(data.user.interactive_user.percent*100).toFixed(0),sleep=(data.user.sleep_user.percent*100).toFixed(2)
            var other_1=100-core_user,other_2=100-interactive,other_3=100-sleep
            var female=data.gender.female.count,male=data.gender.male.count,secret=data.gender.secret.count
            var marry=data.marry.married.count,parent=data.marry.parent.count,single=data.marry.single.count,secrect=data.marry.secrect.count
            var per=((secret/(female+male+secret))*100).toFixed(2)+'%'
            console.log(other_1)
// 指定图表的配置项和数据
            var labelFromatter = {
                normal : {
                    label : {
                        formatter : function (params){
                            return 100 - params.value + '%'
                        },
                        textStyle: {
                            baseline : 'top'
                        }
                    }
                },
            }
            var labelBottom = {
                normal : {
                    color: '#ccc',
                    label : {
                        show : true,
                        position : 'center'
                    },
                    labelLine : {
                        show : false
                    }
                },
            };
            var radius = [55, 75];
            var option_1 = {
                title:{
                    text: '互动用户',
                    subtext: '有过下单、收藏、咨询等行为的用户',
                    textStyle:{
                        fontSize:14
                    },
                    x : 'center',
                },
                legend: {
                    x : 'left',
                    show:false,
                    orient : 'vertical',
                    data:[
                        '互动用户'
                    ]
                },
                series : [
                    {
                        type : 'pie',
                        x : 'center',
                        radius : radius,
                        itemStyle : labelFromatter,
                        data : [
                            {name:'other', value:other_2, itemStyle : labelBottom},
                            {name:'互动用户', value:interactive,itemStyle: {normal: {color:'#C6E579', label : {
                                show : true,
                                position : 'center',
                                formatter : '{b}',
                                textStyle: {
                                    baseline : 'bottom'
                                }
                            }, labelLine : {
                                show : false
                            }}}}
                        ]
                    },
                ]
            };
           myChart_1.setOption(option_1);
            var option_4 = {
                title:{
                    text: '核心用户（占预订用户比例）',
                    subtext: '预定量大于等于2次的用户',
                    textStyle:{
                        fontSize:14
                    },
                    x : 'center',
                },
                legend: {
                    x : 'left',
                    show:false,
                    orient : 'vertical',
                    data:[
                        '核心用户'
                    ]
                },
                series : [
                    {
                        type : 'pie',
                        x : 'center',
                        radius : radius,
                        itemStyle : labelFromatter,
                        data : [
                            {name:'other', value:other_1, itemStyle : labelBottom},
                            {name:'核心用户', value:core_user,itemStyle: {normal: {color:'#D7504B', label : {
                                show : true,
                                position : 'center',
                                formatter : '{b}',
                                textStyle: {
                                    baseline : 'bottom'
                                }
                            }, labelLine : {
                                show : false
                            }}}}
                        ]
                    },
                ]
            };
            myChart_4.setOption(option_4);
            var option_5 = {
                title:{
                    text: '沉睡用户（占预订用户比例）',
                    subtext: '3个月内没有预定过的用户',
                    textStyle:{
                        fontSize:14
                    },
                    x : 'center',
                },
                legend: {
                    show:false,
                    data:[
                        '沉睡用户'
                    ]
                },
                series : [
                    {
                        type : 'pie',
                        x : 'center',
                        radius : radius,
                        itemStyle : labelFromatter,
                        data : [
                            {name:'other', value:other_3, itemStyle : labelBottom},
                            {name:'沉睡用户', value:sleep,itemStyle: {normal: {color:'#60C0DD', label : {
                                show : true,
                                position : 'center',
                                formatter : '{b}',
                                textStyle: {
                                    baseline : 'bottom'
                                }
                            }, labelLine : {
                                show : false
                            }}}}
                        ]
                    },
                ]
            };
            myChart_5.setOption(option_5);


//2
            var option_2 = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    data:['已婚/恋爱中','为人父母','单身','保密']
                },
                calculable : true,
                series : [
                    {
                        name:'婚姻状况',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        itemStyle: {
                            normal:{label:{
                                show:true,
                                formatter: "{b}({d}%)"
                            }}
                        },
                        data:[
                            {value:marry, name:'已婚/恋爱中', itemStyle: {normal: {color:'#60C0DD'}},},
                            {value:parent, name:'为人父母', itemStyle: {normal: {color:'#0084C6'}},},
                            {value:secrect, name:'保密', itemStyle: {normal: {color:'#FAD860'}},},
                            {value:single, name:'单身', itemStyle: {normal: {color:'#FE8463'}},},
                        ]
                    }
                ]
            };
// 使用刚指定的配置项和数据显示图表。
            myChart_2.setOption(option_2);
//3
            var option_3 = {
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    data:['男','女','保密']
                },
                calculable : false,
                series : [
                    {
                        name:'性别比例',
                        type:'pie',
                        radius : [0, 60],
                        // for funnel
                        center: ['50%', '60%'],
                        funnelAlign: 'right',
                        itemStyle : {
                            normal : {
                                label : {
                                    position : 'inner',
                                    //formatter: "{b}({d}%)"
                                },
                                labelLine : {
                                    show : false
                                }
                            }
                        },
                        data:[
                            {value:male, name:'', itemStyle: {normal: {color:'rgba(0,0,0,0)'}},},
                            {value:female, name:'', itemStyle: {normal: {color:'rgba(0,0,0,0)'}},},
                            {value:secret, name:'保密\n'+per, itemStyle: {normal: {color:'#B6A2DE'}},},
                        ]
                    },
                    {
                        name:'性别比例',
                        type:'pie',
                        radius : [80, 110],
                        // for funnel
                        center: ['50%', '60%'],
                        funnelAlign: 'left',
                        //max: 1048,
                        itemStyle: {
                            normal:{label:{
                                show:true,
                                formatter: "{b}({d}%)"
                            }}
                        },
                        data:[
                            {value:male, name:'男', itemStyle: {normal: {color:'#2EC7C9'}},},
                            {value:female, name:'女', itemStyle: {normal: {color:'#D87A80'}},},
                        ]
                    }
                ]
            };

// 使用刚指定的配置项和数据显示图表。
            myChart_3.setOption(option_3);
        }
    })
}

$(window).resize(function () {
    myChart_1.resize();
    myChart_2.resize();
    myChart_3.resize();
    myChart_4.resize();
    myChart_5.resize();
})


