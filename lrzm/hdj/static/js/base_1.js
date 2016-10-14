/**
 * Created by Administrator on 2016/5/27 0027.
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
        var myChart1 = ec.init(document.getElementById('event_1'),theme);
        $.ajax({
            url: '/?json=1',
            dataType: 'json',
            type: 'get',
            async: false,
            success: function (data) {
                var online=data.online_events_cnt,not=data.events_cnt-online
                var option1 = {
                    series : [
                        {
                            type : 'pie',
                            radius : ['50%', '70%'],
                            itemStyle : {
                                normal: {
                                    borderColor:'#2A3650',
                                    barBorderWidth: 2,
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                },
                            },
                            data : [
                                {name:'可售会议', value:online,
                                    itemStyle : {
                                        normal : {
                                            color : (function (){
                                                var zrColor = require('zrender/tool/color');
                                                return zrColor.getRadialGradient(
                                                    100, 80, 110, 180, 150, 60,
                                                    [[0, ' rgba(121, 219, 255, 1)'],[1, 'rgba(29, 112, 151, 1)']]
                                                )
                                            })(),
                                        }
                                    }
                                },
                                {name:'其他', value:not, itemStyle : {
                                    normal : {
                                        color : '#19243A'
                                    }
                                }}
                            ]
                        },
                    ]
                };
                myChart1.setOption(option1);
                $(window).resize(function () {
                    myChart1.resize();
                })
            }
        })

    }
);