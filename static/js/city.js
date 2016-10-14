$(document).ready(function(){
    //$(".select_time").find("option").eq(5).attr("selected",true);
    var timeflag = $(".select_time").find("option:selected").val();
    var cityflag = $(".select_city").find("option:selected").val();
    var priceflag = $(".select_pirce").find("option:selected").val();
    var catflag = $(".select_order").find("option:selected").val();
    var begintime = $("#begin_time").val();
    var endtime = $("#end_time").val();
    
    $.get(
        "http://test2015.huodongjia.com:9010/showdata/",{cat:"69"},function(data) {
            //活动城市分布图
            var city_names=[];
            var city_prices=[];
            var city_counts=[];
            for(var d=0;d<data.city.length;d++){
                city_names.push(data.city[d].city_name);
                city_counts.push(data.city[d].count);
                city_prices.push({name:data.city[d].city_name,value:data.city[d].count});
            }
            require.config({
                paths: {
                    echarts: 'http://echarts.baidu.com/build/dist'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/chart/bar'
                ],

                function (ec) {
                    // 基于准备好的dom，初始化echarts图表
                    var myChart = ec.init(document.getElementById('city'));
                    option = {
                        title: {
                            x: 'center',
                            text: '各分类活动城市分布图（默认为商务会议）',
                            subtext: 'www.huodongjia.com',
                            link: 'http://www.huodongjia.com/business/'
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {show: true, readOnly: true},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        calculable: true,
                        grid: {
                            borderWidth: 0,
                            y: 80,
                            y2: 60
                        },
                        xAxis: [
                            {
                                type: 'category',
                                show: true,
                                data: city_names
                            }
                        ],
                        yAxis: [
                            {   name:'有效活动数量',
                                type: 'value',
                                show: true,
                                splitNumber: 5
                            }
                        ],
                        series: [
                            {
                                name: '各城市活动数量',
                                type: 'bar',
                                itemStyle: {
                                    normal: {
                                        color: "#f3a43b",
                                        label: {
                                            show: true,
                                            position: 'top',
                                            formatter: '{b}\n{c}'
                                        }
                                    }
                                },
                                data: city_prices
                            }
                        ]
                    };
                    // 为echarts对象加载数据
                    myChart.setOption(option);
                    clearTimeout(loadingTicket);
                    loadingTicket = setTimeout(function (){
                        myChart.hideLoading();
                        myChart.setOption(option);
                    },2200);
                });

            //活动家分类订单百分比
            var cat_stt =[];
            for(var i=0;i<data.cat.length;i++){
                cat_stt.push({value:data.cat[i].count,name:data.cat[i].cat_name});
            }
            require(
                [
                    'echarts',
                    'echarts/chart/pie',
                    'echarts/chart/funnel'
                ],
                function (ec) {
                    // 基于准备好的dom，初始化echarts图表
                    var myChart = ec.init(document.getElementById('cat'));
                    option = {
                        title : {
                            text: '活动分类占百分比',
                            subtext: 'www.huodongjia.com',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient : 'vertical',
                            x : 'left',
                            data:cat_stt
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: true},
                                magicType : {
                                    show: true,
                                    type: ['pie', 'funnel'],
                                    option: {
                                        funnel: {
                                            x: '25%',
                                            width: '100%',
                                            funnelAlign: 'left',
                                            max: 1548
                                        }
                                    }
                                },
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        series : [
                            {
                                name:'分类',
                                type:'pie',
                                radius : '55%',
                                width: '100%',
                                center: ['50%', '60%'],
                                data:cat_stt
                            }
                        ]
                    };
                    // 为echarts对象加载数据
                    myChart.setOption(option);
                });

                
            //发布活动
            var time_counts_name=[];
            var time_counts_count=[];
            for(var a=0;a<data.time_count.length;a++){
                time_counts_name.push(data.time_count[a].release_time);
                time_counts_count.push(data.time_count[a].count);
            }

            require(
                [
                    'echarts',
                    'echarts/chart/line',
                    'echarts/chart/bar'
                ],
                function (ec) {
                    // 基于准备好的dom，初始化echarts图表
                    var myChart = ec.init(document.getElementById('main'));
                    option = {
                        title : {
                            text: '活动家月发布活动数量',
                            subtext: '活动家',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data :time_counts_name
                            }
                        ],
                        yAxis : [
                            {
                                name:"活动数量",
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:"发布会议数量",
                                type:'line',
                                stack: '总量',
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            position: 'top',
                                            formatter:'{c}'
                                        }
                                    }
                                },
                                data: time_counts_count
                            }
                        ]

                    };
                    // 为echarts对象加载数据
                    myChart.setOption(option);
                });

            /**/

        });
    
    //通过异步执行一个AJAX来更新缓存获取最新数据
    $.get(
        "http://test2015.huodongjia.com:9010/showdata/",{cat:"69",new:1},function(data) {
            console.log('默认数据更新缓存成功!')
        });

    
    
    //选择分类重新加载柱状图和饼状图
    $(".select_order").change(function(){
        var catflag = $(".select_order").find("option:selected").val();
        $.get(
        "http://test2015.huodongjia.com:9010/showdata/",{cat:catflag},function(data) {

            //
            //活动城市分布图
            var city_names=[];
            var city_prices=[];
            var city_counts=[];
            for(var d=0;d<data.city.length;d++){
                city_names.push(data.city[d].city_name);
                city_counts.push(data.city[d].count);
                city_prices.push({name:data.city[d].city_name,value:data.city[d].count});
            }
            require.config({
                paths: {
                    echarts: 'http://echarts.baidu.com/build/dist'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/chart/bar'
                ],

                function (ec) {
                    // 基于准备好的dom，初始化echarts图表
                    var myChart = ec.init(document.getElementById('city'));
                    option = {
                        title: {
                            x: 'center',
                            text: '各分类活动城市分布图（默认为商务会议）',
                            subtext: 'www.huodongjia.com',
                            link: 'http://www.huodongjia.com/business/'
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {show: true, readOnly: true},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        calculable: true,
                        grid: {
                            borderWidth: 0,
                            y: 80,
                            y2: 60
                        },
                        xAxis: [
                            {
                                type: 'category',
                                show: true,
                                data: city_names
                            }
                        ],
                        yAxis: [
                            {   name:'有效活动数量',
                                type: 'value',
                                show: true,
                                splitNumber: 5
                            }
                        ],
                        series: [
                            {
                                name: '各城市活动数量',
                                type: 'bar',
                                itemStyle: {
                                    normal: {
                                        color: "#f3a43b",
                                        label: {
                                            show: true,
                                            position: 'top',
                                            formatter: '{b}\n{c}'
                                        }
                                    }
                                },
                                data: city_prices
                            }
                        ]
                    };
                    // 为echarts对象加载数据
                    myChart.setOption(option);
                    clearTimeout(loadingTicket);
                    loadingTicket = setTimeout(function (){
                        myChart.hideLoading();
                        myChart.setOption(option);
                    },2200);
                });
            
            //
        });
        
        //通过异步执行一个AJAX来更新缓存获取最新数据
        $.get(
            "http://test2015.huodongjia.com:9010/showdata/",{cat:catflag,new:1},function(data) {
                console.log('分类数据更新缓存成功!')
            });
            
        });
    
    
    
    
    //选择分类重新加载饼状图
    $(".select_order").change(function(){
        var catflag = $(".select_order").find("option:selected").val();
        $.get(
        "http://test2015.huodongjia.com:9010/showdata/",{cat:catflag},function(data) {
    
    //
    //分类百分比
            var cat_stt =[];
            for(var i=0;i<data.cat.length;i++){
                cat_stt.push({value:data.cat[i].count,name:data.cat[i].cat_name});
            }
            require(
                [
                    'echarts',
                    'echarts/chart/pie',
                    'echarts/chart/funnel'
                ],
                function (ec) {
                    // 基于准备好的dom，初始化echarts图表
                    var myChart = ec.init(document.getElementById('cat'));
                    option = {
                        title : {
                            text: '活动分类占百分比',
                            subtext: 'www.huodongjia.com',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient : 'vertical',
                            x : 'left',
                            data:cat_stt
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: true},
                                magicType : {
                                    show: true,
                                    type: ['pie', 'funnel'],
                                    option: {
                                        funnel: {
                                            x: '25%',
                                            width: '100%',
                                            funnelAlign: 'left',
                                            max: 1548
                                        }
                                    }
                                },
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        series : [
                            {
                                name:'分类',
                                type:'pie',
                                radius : '55%',
                                width: '100%',
                                center: ['50%', '60%'],
                                data:cat_stt
                            }
                        ]
                    };
                    // 为echarts对象加载数据
                    myChart.setOption(option);
                });

            //
        });
    });
    
    
        
        
    
    //选择月分重新加载曲线图
    $(".select_time").change(function(e){
        var timeflag = $(".select_time").find("option:selected").val();
        alert(timeflag+'月份发布的活动');
        //重新加载数据
        //
        $.get(
        "http://test2015.huodongjia.com:9010/showdata/",{cat:"69",month:timeflag},function(data) {
            //发布活动
            var time_counts_name=[];
            var time_counts_count=[];
            for(var a=0;a<data.time_count.length;a++){
                time_counts_name.push(data.time_count[a].release_time);
                time_counts_count.push(data.time_count[a].count);
            }

            require(
                [
                    'echarts',
                    'echarts/chart/line',
                    'echarts/chart/bar'
                ],
                function (ec) {
                    // 基于准备好的dom，初始化echarts图表
                    var myChart = ec.init(document.getElementById('main'));
                    option = {
                        title : {
                            text: '活动家月发布活动数量',
                            subtext: '活动家',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data :time_counts_name
                            }
                        ],
                        yAxis : [
                            {
                                name:"活动数量",
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:"发布会议数量",
                                type:'line',
                                stack: '总量',
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            position: 'top',
                                            formatter:'{c}'
                                        }
                                    }
                                },
                                data: time_counts_count
                            }
                        ]

                    };
                    // 为echarts对象加载数据
                    myChart.setOption(option);
                });

            
        });
        //
        
        //通过异步执行一个AJAX来更新缓存获取最新数据
        $.get(
            "http://test2015.huodongjia.com:9010/showdata/",{month:timeflag,new:1},function(data) {
                console.log('月份数据更新缓存成功!')
            });
            

        
        
    });
    
    
    
});
