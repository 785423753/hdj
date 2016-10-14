/**
 * Created by Administrator on 2016/4/14 0014.
 */
//    1
// 基于准备好的dom，初始化echarts实例
var myChart_p1 = echarts.init(document.getElementById('p1'),'dark');
var myChart_p2 = echarts.init(document.getElementById('p2'),'dark');
var myChart_p3 = echarts.init(document.getElementById('p3'),'dark');
var myChart_2 = echarts.init(document.getElementById('right_curveoforder_2'),'dark');
var myChart_3 = echarts.init(document.getElementById('right_curveoforder_3'),'dark');
property();
function property(){
    $.ajax({
        url:'http://218.244.137.196:5000/json/userProperty',
        dataType:'json',
        type:'get',
        async:false,
        success:function(data){
            console.log(data)
            var core_user=data.core_user,interactive=data.interactive,sleep=data.sleep
            var female=data.gender.female.count,male=data.gender.male.count,secret=data.gender.secret.count
            var marry=data.marry.married.count,parent=data.marry.parent.count,single=data.marry.single.count,secrect=data.marry.secrect.count
// 指定图表的配置项和数据
            var option_p1 = {
                tooltip : {
                    formatter: "{a} <br/>{c} {b}"
                },
                toolbox: {
                    show : false,
                },
                series : [
                    {
                        name:'互动用户',
                        type:'gauge',
                        z: 3,
                        radius : '70%',
                        splitNumber:10,
                        max:'120000',
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                width: 10
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            length :15,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'auto'
                            }
                        },
                        splitLine: {           // 分隔线
                            length :20,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                color: 'auto'
                            }
                        },
                        title : {
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 14,
//                        fontStyle: 'italic'
                            },
                            offsetCenter: [0, '100%'],
                        },
                        detail : {
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder'
                            }
                        },
                        data:[{value: interactive, name: '互动用户 \n \n (有过下单、收藏、咨询等行为的用户)'}]
                    },
                ]
            };
            myChart_p1.setOption(option_p1);
            var option_p2 = {
                tooltip : {
                    formatter: "{a} <br/>{c} {b}"
                },
                toolbox: {
                    show : false,
                },
                series : [
                    {
                        name:'核心用户',
                        type:'gauge',
                        z: 3,
                        //min:0,
                        //max:330,
                        //center : ['25%', '50%'],    // 默认全局居中
                        radius : '70%',
                        splitNumber:10,
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                width: 10
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            length :15,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'auto'
                            }
                        },
                        splitLine: {           // 分隔线
                            length :20,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                color: 'auto'
                            }
                        },
                        title : {
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 14,
//                        fontStyle: 'italic'
                            },
                            offsetCenter: [0, '100%'],
                        },
                        detail : {
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder'
                            }
                        },
                        data:[{value: core_user, name: '核心用户 \n \n (预定量大于等于2次的用户)'}]
                    },
                ]
            };
            myChart_p2.setOption(option_p2);
            var option_p3 = {
                tooltip : {
                    formatter: "{a} <br/>{c} {b}"
                },
                toolbox: {
                    show : false,
                },
                series : [
                    {
                        name:'沉睡用户',
                        type:'gauge',
                        z: 3,
                        //min:0,
                        //max:220,
                        radius :'70%',
                        //center : ['75%', '50%'],    // 默认全局居中
                        splitNumber:10,
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                width: 10
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            length :15,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'auto'
                            }
                        },
                        splitLine: {           // 分隔线
                            length :20,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                color: 'auto'
                            }
                        },
                        title : {
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                //fontWeight: 'bolder',
                                fontSize: 14,
//                        fontStyle: 'italic'
                            },
                            offsetCenter: [0, '100%'],
                        },
                        detail : {
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder'
                            }
                        },
                        data:[{value: sleep, name: '沉睡用户 \n \n (3个月内没有预定过的用户)'}]
                    },
                ]
            };
            myChart_p3.setOption(option_p3);
//2
            var option_2 = {
                title : {
                    text: '婚姻状况',
                    subtext: '',
                    x:'center',
                    y:'10%'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    y:'50%',
                    data:['已婚','为人父母','单身','保密']
                },
                calculable : true,
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:marry, name:'已婚'},
                            {value:parent, name:'为人父母'},
                            {value:secrect, name:'保密'},
                            {value:single, name:'单身'},
                        ]
                    }
                ]
            };
// 使用刚指定的配置项和数据显示图表。
            myChart_2.setOption(option_2);
//3
            var option_3 = {
                title : {
                    text: '性别比例',
                    subtext: '',
                    x:'center',
                    y:'10%'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'right',
                    y:'50%',
                    data:['男','女','保密']
                },

                calculable : true,
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:male, name:'男'},
                            {value:female, name:'女'},
                            {value:secret, name:'保密'},
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
    myChart_p1.resize();
    myChart_p2.resize();
    myChart_p3.resize();
    myChart_2.resize();
    myChart_3.resize();
})