/**
 * Created by Administrator on 2016/4/23 0023.
 */
    // 路径配置
require.config({
    paths: {
        echarts: 'http://echarts.baidu.com/build/dist/'
        // echarts: './static/echarts-2.2.7/build/dist/'
    }
});
// 使用
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
        var myChart2 = ec.init(document.getElementById('right_curveoforder_2'),theme);
        city();
        function city() {
            var start_day=$('#start_time').val(),end_day=$('#end_time').val()
            $.ajax({
                url: '/json/city_order',
                dataType: 'json',
                type: 'get',
                data:{
                    start_day:start_day,
                    end_day:end_day
                },
                async: false,
                success: function (data) {
                    $(".select button").html('确定').removeAttr("disabled");
                    var data_geoCoord={},data_val=new Array(),data_top=new Array()
                    for(var i=0;i<data.city.length;i++){
                        data_geoCoord[data.city[i].city]=[data.city[i].location.lon,data.city[i].location.lat]
                        data_val.push({'name':data.city[i].city,value:data.city[i].value,selected:'',itemStyle:{normal:{borderColor: '#87cefa',borderWidth: 1,}}})
                    }
                    for(var i=0;i<data.top.length;i++){
                        data_geoCoord[data.top[i].city]=[data.top[i].location.lon,data.top[i].location.lat]
                        data_top.push({'name':data.top[i].city,value:data.top[i].value})
                        data_val.push({'name':data.top[i].city,value:data.top[i].value,selected:true,itemStyle:{normal:{borderColor: '#1e90ff',borderWidth: 7,}}})
                    }
                    var option = {
                        tooltip : {
                            trigger: 'item',
//                                    formatter: '{b}',
                        },
                        title : {
                            text: '全国各城市订单量',
                            subtext: '',
                            textStyle:{
                                color:'#fff'
                            }
                        },
                        legend: {
                            x:'right',
                            selectedMode:false,
                            data:['北京','广州','深圳','上海','杭州'],
                            textStyle:{
                                color:'#fff'
                            }
                        },
                        series : [
                            {
                                name: '全国订单量分布',
                                type: 'map',
//                                        roam:true,
                                mapType: 'china',
                                mapLocation: {
                                    x: '1%',
                                },
//                                        selectedMode : 'multiple',
                                hoverable:false,
                                itemStyle:{
                                    normal:{
                                        label:{
                                            show:true,
                                            textStyle:{color:'#8B4513'},
                                        },
                                        color:'#DBFCFE'
                                    },
                                    emphasis:{label:{show:false}}
                                },
                                data:[],
                                markPoint : {
                                    symbolSize:5,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                                    itemStyle: {
                                        normal: {
                                            borderColor: '#87cefa',
                                            borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                                            color:'#C6F648',
                                            label: {
                                                show: false
                                            }
                                        },
                                        emphasis: {
                                            borderColor: '#1e90ff',
                                            borderWidth: 7,
                                            label: {
                                                show: false
                                            }
                                        }
                                    },
                                    data : data_val
                                },
                                geoCoord: data_geoCoord
                            },
                            {
                                name:'各城市订单量',
                                type:'pie',
                                roseType : 'area',
                                tooltip: {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                                },
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : true,
                                            formatter : function (params) {
                                                return params.name+' '+params.value
                                            }
                                        },
                                        labelLine : {
                                            length : 0,
                                        }
                                    },
                                },
                                center: ['75%', 225],
                                radius: [30, 120],
                                data:data_top
                            }
                        ],
                        animation: false
                    };
                    if($(window).innerWidth()<960){
                        option = {
                            title : {
                                text: '全国各城市订单量',
                                subtext: '',
                                textStyle:{
                                    color:'#fff'
                                }
                            },
                            tooltip : {
                                trigger: 'item'
                            },
                            legend: {
                                x:'right',
                                y:'5%',
                                selectedMode:false,
                                textStyle:{
                                    color:'#fff'
                                },
                                data:['北京','广州','深圳','上海','杭州'],
                            },
                            series : [
                                {
                                    name: '全国订单量分布',
                                    type: 'map',
                                    mapType: 'china',
                                    mapLocation: {
                                        x: '0',
                                        y:'13%',
                                        height:'40%'
                                    },
                                    itemStyle:{
                                        normal:{label:{show:true}},
                                        emphasis:{label:{show:true}}
                                    },
                                    data:[],
                                    markPoint : {
                                        symbolSize:5,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                                        itemStyle: {
                                            normal: {
                                                borderColor: '#87cefa',
                                                borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                                                color:'#D87A80',
                                                label: {
                                                    show: false
                                                }
                                            },
                                            emphasis: {
                                                borderColor: '#EDD731',
                                                borderWidth: 7,
                                                label: {
                                                    show: false
                                                }
                                            }
                                        },
                                        data : data_val
                                    },
                                    geoCoord: data_geoCoord
                                },
                                {
                                    name:'各城市订单量',
                                    type:'pie',
                                    roseType : 'area',
                                    tooltip: {
                                        trigger: 'item',
                                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                                    },
                                    itemStyle : {
                                        normal : {
                                            label : {
                                                show : true,
                                                formatter : function (params) {
                                                    return params.name+' '+params.value
                                                }
                                            },
                                            labelLine : {
                                                length : -10,
                                            }
                                        },
                                    },
//                            center: [document.getElementById('right_curveoforder_2').offsetWidth - 250, 225],
                                    center:['50%','60%'],
                                    radius: [30, 110],
                                    data:data_top
                                }
                            ],
                            animation: false
                        };
                    }
                    var ecConfig = require('echarts/config');
                    myChart2.on(ecConfig.EVENT.CLICK, function (param){
                        var mapSeries = option.series[0].markPoint;
                        var data = [];
                        var legendData = [];
                        var name;
                        for(var i=0;i<mapSeries.data.length;i++){
                            if(param.data.name==mapSeries.data[i].name){
                                if(mapSeries.data[i].selected==true){
                                    mapSeries.data[i].selected=''
                                    mapSeries.data[i].itemStyle.normal.borderColor="#87cefa"
                                    mapSeries.data[i].itemStyle.normal.borderWidth=1
                                }else{
                                    mapSeries.data[i].selected=true
                                    mapSeries.data[i].itemStyle.normal.borderColor="#1e90ff"
                                    mapSeries.data[i].itemStyle.normal.borderWidth=7
                                }
                            }
                            name = mapSeries.data[i];
                            if(name.selected){
                                data.push({
                                    name: name.name,
                                    value: mapSeries.data[i].value
                                });
                                legendData.push(name.name);
                            }
                        }
                        option.legend.data = legendData;
                        option.series[1].data = data;
                        myChart2.setOption(option, true);
                    })
                    // 为echarts对象加载数据
                    myChart2.setOption(option);
                }
            })
        }
        $(window).resize(function(){
            myChart2.resize();
        });
        $('.select button').on('click',function(){
            city()
        })
    }
);
