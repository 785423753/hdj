/**
 * Created by Administrator on 2016/6/1 0001.
 */
require.config({
    paths: {
        echarts: 'http://echarts.baidu.com/build/dist/'
    }
});
require(
    [
        'echarts',
        'echarts/theme/macarons',
        'echarts/chart/line',
        'echarts/chart/bar',
        'echarts/chart/pie',
        'echarts/chart/map',
    ],
    function (ec,theme) {
        // 基于准备好的dom，初始化echarts图表)
        var myChart2 = ec.init(document.getElementById('city'),'blue');
        var myChart3 = ec.init(document.getElementById('top'),'infographic');
        $.ajax({
            url: '/newordervis/app/?json=1',
            dataType: 'json',
            type: 'get',
            async: false,
            success: function (data) {
                var Data=[],stack
                for(var i=0;i<data.geo_data_info.length;i++) {
                    Data.push({name: data.geo_data_info[i].Name, value: data.geo_data_info[i].newuser})
                }
                stack=data.week_data_info[data.week_data_info.length-1].totaluser

                    var option2 = {
                        backgroundColor: 'rgba(0,0,0,0)',//背景色
                        tooltip : {
                            trigger: 'item'
                        },
                        legend: {
                            //show:false,
                            orient: 'vertical',
                            x:'-50%',
                            data:['用户分布']
                        },
                        series : [
                            {
                                name: '用户分布',
                                type: 'map',
                                mapType: 'china',
                                hoverable: false,
                                //showLegendSymbol:false,
                                roam:false,
                                data : Data,
                                itemStyle:{
                                    normal:{
                                        borderColor:'rgba(100,149,237,1)',
                                        borderWidth:1,
                                        label:{
                                            show:false
                                        },
                                        areaStyle:{
                                            color: 'rgba(0,0,0,0)'
                                        },
                                    },
                                    emphasis:{label:{show:true}}
                                },
                            },
                        ]
                    }
                    myChart2.setOption(option2);
                    var radius=['23%', '33%']
                    var option3 = {
                        backgroundColor: 'rgba(0,0,0,0)',//背景色
                        tooltip : {
                            trigger: 'item'
                        },
                        series : [
                            {
                                type:'pie',
                                hoverAnimation:false,
                                radius :radius ,
                                center: ['18%', '15%'],
                                itemStyle : {
                                    normal: {
                                        label: {
                                            show: true,
                                            position : 'center',
                                            textStyle:{
                                                color : '#4FDFF7'
                                            }
                                        },
                                        labelLine: {
                                            show: false
                                        }
                                    },
                                },
                                data:[
                                    {value:data.geo_data_info[0].newuser, name:data.geo_data_info[0].Name,itemStyle : {normal : {color : '#4FDFF7'}}},
                                    {value:stack-data.geo_data_info[0].newuser, name:'',itemStyle : {normal : {color : '#19243A'}}},
                                ]
                            },
                            {
                                type:'pie',
                                hoverAnimation:false,
                                radius :radius ,
                                center: ['65%', '15%'],
                                itemStyle : {
                                    normal: {
                                        label: {
                                            show: true,
                                            position : 'center',
                                            textStyle:{
                                                color : '#4FDFF7'
                                            }
                                        },
                                        labelLine: {
                                            show: false
                                        }
                                    },
                                },
                                data:[
                                    {value:data.geo_data_info[1].newuser, name:data.geo_data_info[1].Name,itemStyle : {normal : {color : '#4FDFF7'}}},
                                    {value:stack-data.geo_data_info[1].newuser, name:'',itemStyle : {normal : {color : '#19243A'}}},
                                ]
                            },
                            {
                                type:'pie',
                                hoverAnimation:false,
                                radius :radius ,
                                center: ['18%', '48%'],
                                itemStyle : {
                                    normal: {
                                        label: {
                                            show: true,
                                            position : 'center',
                                            textStyle:{
                                                color : '#4FDFF7'
                                            }
                                        },
                                        labelLine: {
                                            show: false
                                        }
                                    },
                                },
                                data:[
                                    {value:data.geo_data_info[2].newuser, name:data.geo_data_info[2].Name,itemStyle : {normal : {color : '#4FDFF7'}}},
                                    {value:stack-data.geo_data_info[2].newuser, name:'',itemStyle : {normal : {color : '#19243A'}}},
                                ]
                            },
                            {
                                type:'pie',
                                hoverAnimation:false,
                                radius :radius ,
                                center: ['65%', '48%'],
                                itemStyle : {
                                    normal: {
                                        label: {
                                            show: true,
                                            position : 'center',
                                            textStyle:{
                                                color : '#4FDFF7'
                                            }
                                        },
                                        labelLine: {
                                            show: false
                                        }
                                    },
                                },
                                data:[
                                    {value:data.geo_data_info[3].newuser, name:data.geo_data_info[3].Name,itemStyle : {normal : {color : '#4FDFF7'}}},
                                    {value:stack-data.geo_data_info[3].newuser, name:'',itemStyle : {normal : {color : '#19243A'}}},
                                ]
                            },
                            {
                                type:'pie',
                                hoverAnimation:false,
                                radius :radius ,
                                center: ['18%', '80%'],
                                itemStyle : {
                                    normal: {
                                        label: {
                                            show: true,
                                            position : 'center',
                                            textStyle:{
                                                color : '#4FDFF7'
                                            }
                                        },
                                        labelLine: {
                                            show: false
                                        }
                                    },
                                },
                                data:[
                                    {value:data.geo_data_info[4].newuser, name:data.geo_data_info[4].Name,itemStyle : {normal : {color : '#4FDFF7'}}},
                                    {value:stack-data.geo_data_info[4].newuser, name:'',itemStyle : {normal : {color : '#19243A'}}},
                                ]
                            },
                        ]
                    };
                    myChart3.setOption(option3);
                    $(window).resize(function () {
                        myChart1.resize();
                        myChart2.resize();
                        myChart3.resize();
                    })
                }

        })

    }
);











