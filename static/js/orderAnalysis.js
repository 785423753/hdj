$(document).ready(function(){
    $(".select_time").find("option").eq(1).attr("selected",true);
    var cityflag = $(".select_city").find("option:selected").val();
    var priceflag = $(".select_pirce").find("option:selected").val();
    var catflag = $(".select_order").find("option:selected").val();
    var begintime = $("#begin_time").val();
    var endtime = $("#end_time").val();
    $.get(
        "http://test2015.huodongjia.com:9010/order/show/",{sd_recent:"0d",ts:"1",cat:catflag,city:cityflag,pr_range:priceflag,sd_begin:begintime,sd_end:endtime,json:"1"},function(data){
            //活动家当日订单金额
            var addtime_series_day = [];
            var addtime_add_day = [];
            var addtime_value_day = [];
            var addtime_count =[];
            var _html="";
            for (var e = 0; e < data.order_time_series.length; e++) {
                addtime_add_day.push(data.order_time_series[e].title);
                addtime_value_day.push(data.order_time_series[e].total_price);
                addtime_count.push(data.order_time_series[e].count);
                addtime_series_day.push({
                    value: data.order_time_series[e].total_price,
                    name: data.order_time_series[e].title
                })
            }
            $("#table_price").css({visibility:"visible"});
            var total_order=data.basic_stt.total_order;
            var sum_price=data.basic_stt.sum_price;
            var min_price=data.basic_stt.min_price;
            var max_price=data.basic_stt.max_price;
            var avg_price=data.basic_stt.avg_price;
            $("#min_price").text(min_price);
            $("#max_price").text(max_price);
            $("#avg_price").text(avg_price);
            $("#order_count").text(total_order);
            $("#sum_price").text(sum_price);

            //订单下单量对比
            for(var s=0;s<data.event_stt.length;s++) {
                var order_name = data.event_stt[s].title;//名字
                var order_city = data.event_stt[s].city;//城市
                var order_order = data.event_stt[s].count;//订单数量
                var order_price = data.event_stt[s].price;//单价
                var payed = data.event_stt[s].payed;//已支付
                var unpayed = data.event_stt[s].unpayed;//未支付
                var order_startime = data.event_stt[s].begin_time;//开始时间
                var order_endime = data.event_stt[s].begin_time;//结束时间
                var order_sum = data.event_stt[s].total_price;//总金额
                _html+="<tr><td>"+order_name+"</td>" +
                "<td>"+order_city+"</td>" +
                "<td>"+order_order+"</td>" +
                "<td>"+payed+"</td>" +
                "<td>"+unpayed+"</td>" +
                "<td>"+order_price+"</td>" +
                "<td>"+order_startime+"</td>" +
                "<td>"+order_endime+"</td>" +
                "<td>"+order_sum+"</td></tr>";
            }
            $(".tbody_meet").html(_html);
            require.config({
                paths: {
                    echarts: 'http://echarts.baidu.com/build/dist'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/chart/line',
                    'echarts/chart/bar'
                ],
                function (ec) {
                    // 基于准备好的dom，初始化echarts图表
                    var myChart = ec.init(document.getElementById('main'));
                    var order =$(".order").text();
                    option = {
                        title : {
                            text: '活动家订单金额走势',
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
                                magicType : {show: true,
                                    type: ['line', 'bar', 'stack', 'tiled'],
                                    option:{

                                    }
                                },
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data :addtime_add_day
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:"活动家当日订单金额",
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
                                data: addtime_value_day
                            },
                            {
                                name:"活动家当日订单数量",
                                type:'line',
                                stack: '总量',
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            position: 'top+10px',
                                            formatter:'{c}'
                                        }
                                    }
                                },
                                data:addtime_count
                            }
                        ]
                    };
                    // 为echarts对象加载数据
                    myChart.setOption(option);
                });

            //活动家分类订单百分比
            var cat_stt_add =[];
            var cat_stt_price =[];
            for(var i=0;i<data.cat_stt.length;i++){
                cat_stt_add.push(data.cat_stt[i].title);
                cat_stt_price.push({value:data.cat_stt[i].total_price,name:data.cat_stt[i].title});
            }
            require.config({
                paths: {
                    echarts: 'http://echarts.baidu.com/build/dist'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/chart/pie',
                    'echarts/chart/funnel'
                ],
                function (ec) {
                    // 基于准备好的dom，初始化echarts图表
                    var myChart = ec.init(document.getElementById('main_class'));
                    option = {
                        title : {
                            text: '活动家订单分类占百分比',
                            subtext: '活动家',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient : 'vertical',
                            x : 'left',
                            data:cat_stt_add
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
                                name:'来源',
                                type:'pie',
                                radius : '55%',
                                width: '100%',
                                center: ['50%', '60%'],
                                data:cat_stt_price
                            }
                        ]
                    };
                    // 为echarts对象加载数据
                    myChart.setOption(option);
                });

            //活动家城市订单
            var city_names=[];
            var city_prices=[];
            var city_counts=[];
            for(var d=0;d<data.city_stt.length;d++){
                city_names.push(data.city_stt[d].title);
                city_counts.push(data.city_stt[d].count);
                city_prices.push({name:data.city_stt[d].title,value:data.city_stt[d].total_price});
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
                    var myChart = ec.init(document.getElementById('main_order'));
                    option = {
                        title: {
                            x: 'center',
                            text: '活动家城市订单',
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
                            {   name:'金额',
                                type: 'value',
                                show: true,
                                splitNumber: 5
                            },
                            {
                                name:'订单数量',
                                type: 'value',
                                show: true,
                                splitNumber: 5
                            }
                        ],
                        series: [
                            {
                                name: '活动家城市总销量',
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
                            },
                            {
                                name:"活动家城市订单数量",
                                type:'bar',
                                yAxisIndex:1,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            position: 'top',
                                            formatter:'{c}'
                                        }
                                    }
                                },
                                data:city_counts
                            }
                        ]
                    };
                    // 为echarts对象加载数据
                    myChart.setOption(option);
                });

            //活动家全国订单分布
            var city_name=[];
            var city_price=[];
            var city_count=[];
            for(var c=0;c<data.city_stt.length;c++){
                city_name.push(data.city_stt[c].title);
                city_count.push(data.city_stt[c].count);
                city_price.push({name:data.city_stt[c].title,value:data.city_stt[c].total_price});
            }
            require.config({
                paths: {
                    echarts: 'http://echarts.baidu.com/build/dist'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/chart/map'
                ],
                function (ec) {
                    // 基于准备好的dom，初始化echarts图表
                    var myChartsd = ec.init(document.getElementById('main_city'));
                    option = {
                        title : {
                            text: '活动家全国订单分布地图',
                            subtext: 'www.huodongjia.com',
                            sublink: 'http://www.huodongjia.com',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item'
                        },
                        legend: {
                            orient: 'vertical',
                            x:'left',
                            data:['活动家']
                        },
                        dataRange: {
                            min : 0,
                            max : 30000,
                            calculable : true,
                            color: ['maroon','purple','red','orange','yellow','lightgreen']
                        },
                        toolbox: {
                            show : true,
                            orient : 'vertical',
                            x: 'right',
                            y: 'center',
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        series :  [
                            {
                                name: '活动家',
                                type: 'map',
                                mapType: 'china',
                                hoverable: false,
                                roam:false,
                                data : [],
                                markPoint : {
                                    symbolSize: 7,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                                    itemStyle: {
                                        normal: {
                                            borderColor: '#87cefa',
                                            borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                                            label: {
                                                show: true
                                            }
                                        },
                                        emphasis: {
                                            borderColor: '#1e90ff',
                                            borderWidth: 5,
                                            label: {
                                                show: true
                                            }
                                        }
                                    },
                                    data :city_price
                                },
                                geoCoord: {
                                    "海门":[121.15,31.89],
                                    "鄂尔多斯":[109.781327,39.608266],
                                    "招远":[120.38,37.35],
                                    "舟山":[122.207216,29.985295],
                                    "齐齐哈尔":[123.97,47.33],
                                    "盐城":[120.13,33.38],
                                    "赤峰":[118.87,42.28],
                                    "青岛":[120.33,36.07],
                                    "乳山":[121.52,36.89],
                                    "金昌":[102.188043,38.520089],
                                    "泉州":[118.58,24.93],
                                    "莱西":[120.53,36.86],
                                    "日照":[119.46,35.42],
                                    "胶南":[119.97,35.88],
                                    "南通":[121.05,32.08],
                                    "拉萨":[91.11,29.97],
                                    "云浮":[112.02,22.93],
                                    "梅州":[116.1,24.55],
                                    "文登":[122.05,37.2],
                                    "上海":[121.48,31.22],
                                    "攀枝花":[101.718637,26.582347],
                                    "威海":[122.1,37.5],
                                    "承德":[117.93,40.97],
                                    "厦门":[118.1,24.46],
                                    "汕尾":[115.375279,22.786211],
                                    "潮州":[116.63,23.68],
                                    "丹东":[124.37,40.13],
                                    "太仓":[121.1,31.45],
                                    "曲靖":[103.79,25.51],
                                    "烟台":[121.39,37.52],
                                    "福州":[119.3,26.08],
                                    "瓦房店":[121.979603,39.627114],
                                    "即墨":[120.45,36.38],
                                    "抚顺":[123.97,41.97],
                                    "玉溪":[102.52,24.35],
                                    "张家口":[114.87,40.82],
                                    "阳泉":[113.57,37.85],
                                    "莱州":[119.942327,37.177017],
                                    "湖州":[120.1,30.86],
                                    "汕头":[116.69,23.39],
                                    "昆山":[120.95,31.39],
                                    "宁波":[121.56,29.86],
                                    "湛江":[110.359377,21.270708],
                                    "揭阳":[116.35,23.55],
                                    "荣成":[122.41,37.16],
                                    "连云港":[119.16,34.59],
                                    "葫芦岛":[120.836932,40.711052],
                                    "常熟":[120.74,31.64],
                                    "东莞":[113.75,23.04],
                                    "河源":[114.68,23.73],
                                    "淮安":[119.15,33.5],
                                    "泰州":[119.9,32.49],
                                    "南宁":[108.33,22.84],
                                    "营口":[122.18,40.65],
                                    "惠州":[114.4,23.09],
                                    "江阴":[120.26,31.91],
                                    "蓬莱":[120.75,37.8],
                                    "韶关":[113.62,24.84],
                                    "嘉峪关":[98.289152,39.77313],
                                    "广州":[113.23,23.16],
                                    "延安":[109.47,36.6],
                                    "太原":[112.53,37.87],
                                    "清远":[113.01,23.7],
                                    "中山":[113.38,22.52],
                                    "昆明":[102.73,25.04],
                                    "寿光":[118.73,36.86],
                                    "盘锦":[122.070714,41.119997],
                                    "长治":[113.08,36.18],
                                    "深圳":[114.07,22.62],
                                    "珠海":[113.52,22.3],
                                    "宿迁":[118.3,33.96],
                                    "咸阳":[108.72,34.36],
                                    "铜川":[109.11,35.09],
                                    "平度":[119.97,36.77],
                                    "佛山":[113.11,23.05],
                                    "海口":[110.35,20.02],
                                    "江门":[113.06,22.61],
                                    "章丘":[117.53,36.72],
                                    "肇庆":[112.44,23.05],
                                    "大连":[121.62,38.92],
                                    "临汾":[111.5,36.08],
                                    "吴江":[120.63,31.16],
                                    "石嘴山":[106.39,39.04],
                                    "沈阳":[123.38,41.8],
                                    "苏州":[120.62,31.32],
                                    "茂名":[110.88,21.68],
                                    "嘉兴":[120.76,30.77],
                                    "长春":[125.35,43.88],
                                    "胶州":[120.03336,36.264622],
                                    "银川":[106.27,38.47],
                                    "张家港":[120.555821,31.875428],
                                    "三门峡":[111.19,34.76],
                                    "锦州":[121.15,41.13],
                                    "南昌":[115.89,28.68],
                                    "柳州":[109.4,24.33],
                                    "三亚":[109.511909,18.252847],
                                    "自贡":[104.778442,29.33903],
                                    "吉林":[126.57,43.87],
                                    "阳江":[111.95,21.85],
                                    "泸州":[105.39,28.91],
                                    "西宁":[101.74,36.56],
                                    "宜宾":[104.56,29.77],
                                    "呼和浩特":[111.65,40.82],
                                    "成都":[104.06,30.67],
                                    "大同":[113.3,40.12],
                                    "镇江":[119.44,32.2],
                                    "桂林":[110.28,25.29],
                                    "张家界":[110.479191,29.117096],
                                    "宜兴":[119.82,31.36],
                                    "北海":[109.12,21.49],
                                    "西安":[108.95,34.27],
                                    "金坛":[119.56,31.74],
                                    "东营":[118.49,37.46],
                                    "牡丹江":[129.58,44.6],
                                    "遵义":[106.9,27.7],
                                    "绍兴":[120.58,30.01],
                                    "扬州":[119.42,32.39],
                                    "常州":[119.95,31.79],
                                    "潍坊":[119.1,36.62],
                                    "重庆":[106.54,29.59],
                                    "台州":[121.420757,28.656386],
                                    "南京":[118.78,32.04],
                                    "滨州":[118.03,37.36],
                                    "贵阳":[106.71,26.57],
                                    "无锡":[120.29,31.59],
                                    "本溪":[123.73,41.3],
                                    "克拉玛依":[84.77,45.59],
                                    "渭南":[109.5,34.52],
                                    "马鞍山":[118.48,31.56],
                                    "宝鸡":[107.15,34.38],
                                    "焦作":[113.21,35.24],
                                    "句容":[119.16,31.95],
                                    "北京":[116.46,39.92],
                                    "徐州":[117.2,34.26],
                                    "衡水":[115.72,37.72],
                                    "包头":[110,40.58],
                                    "绵阳":[104.73,31.48],
                                    "乌鲁木齐":[87.68,43.77],
                                    "枣庄":[117.57,34.86],
                                    "杭州":[120.19,30.26],
                                    "淄博":[118.05,36.78],
                                    "鞍山":[122.85,41.12],
                                    "溧阳":[119.48,31.43],
                                    "库尔勒":[86.06,41.68],
                                    "安阳":[114.35,36.1],
                                    "开封":[114.35,34.79],
                                    "济南":[117,36.65],
                                    "德阳":[104.37,31.13],
                                    "温州":[120.65,28.01],
                                    "九江":[115.97,29.71],
                                    "邯郸":[114.47,36.6],
                                    "临安":[119.72,30.23],
                                    "兰州":[103.73,36.03],
                                    "沧州":[116.83,38.33],
                                    "临沂":[118.35,35.05],
                                    "南充":[106.110698,30.837793],
                                    "天津":[117.2,39.13],
                                    "富阳":[119.95,30.07],
                                    "泰安":[117.13,36.18],
                                    "诸暨":[120.23,29.71],
                                    "郑州":[113.65,34.76],
                                    "哈尔滨":[126.63,45.75],
                                    "聊城":[115.97,36.45],
                                    "芜湖":[118.38,31.33],
                                    "唐山":[118.02,39.63],
                                    "平顶山":[113.29,33.75],
                                    "邢台":[114.48,37.05],
                                    "德州":[116.29,37.45],
                                    "济宁":[116.59,35.38],
                                    "荆州":[112.239741,30.335165],
                                    "宜昌":[111.3,30.7],
                                    "义乌":[120.06,29.32],
                                    "丽水":[119.92,28.45],
                                    "洛阳":[112.44,34.7],
                                    "秦皇岛":[119.57,39.95],
                                    "株洲":[113.16,27.83],
                                    "石家庄":[114.48,38.03],
                                    "莱芜":[117.67,36.19],
                                    "常德":[111.69,29.05],
                                    "保定":[115.48,38.85],
                                    "湘潭":[112.91,27.87],
                                    "金华":[119.64,29.12],
                                    "岳阳":[113.09,29.37],
                                    "长沙":[113,28.21],
                                    "衢州":[118.88,28.97],
                                    "廊坊":[116.7,39.53],
                                    "菏泽":[115.480656,35.23375],
                                    "合肥":[117.27,31.86],
                                    "武汉":[114.31,30.52],
                                    "大庆":[125.03,46.58],
                                    "六盘水":[104.82	,26.58],
                                    "台北":[121.31,25.03],
                                    "曼谷":[100.31,13.45],
                                    "大理":[100,25.25],
                                    "高邮":[32.39,119.18],
                                    "清迈":[98.58,18.46],
                                    "关岛":[ 144,13],
                                    "徐汇区":[31.09,121.26]
                                }
                            },
                            {
                                name: '活动家',
                                type: 'map',
                                mapType: 'china',
                                hoverable: false,
                                roam:false,
                                data : [],
                                markPoint : {
                                    symbolSize: 5,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                                    itemStyle: {
                                        normal: {
                                            borderColor: '#87cefa',
                                            borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                                            label: {
                                                show: true
                                            }
                                        },
                                        emphasis: {
                                            borderColor: '#1e90ff',
                                            borderWidth: 5,
                                            label: {
                                                show: true
                                            }
                                        }
                                    },
                                    data :city_count
                                },
                                geoCoord: {
                                    "海门":[121.15,31.89],
                                    "鄂尔多斯":[109.781327,39.608266],
                                    "招远":[120.38,37.35],
                                    "舟山":[122.207216,29.985295],
                                    "齐齐哈尔":[123.97,47.33],
                                    "盐城":[120.13,33.38],
                                    "赤峰":[118.87,42.28],
                                    "青岛":[120.33,36.07],
                                    "乳山":[121.52,36.89],
                                    "金昌":[102.188043,38.520089],
                                    "泉州":[118.58,24.93],
                                    "莱西":[120.53,36.86],
                                    "日照":[119.46,35.42],
                                    "胶南":[119.97,35.88],
                                    "南通":[121.05,32.08],
                                    "拉萨":[91.11,29.97],
                                    "云浮":[112.02,22.93],
                                    "梅州":[116.1,24.55],
                                    "文登":[122.05,37.2],
                                    "上海":[121.48,31.22],
                                    "攀枝花":[101.718637,26.582347],
                                    "威海":[122.1,37.5],
                                    "承德":[117.93,40.97],
                                    "厦门":[118.1,24.46],
                                    "汕尾":[115.375279,22.786211],
                                    "潮州":[116.63,23.68],
                                    "丹东":[124.37,40.13],
                                    "太仓":[121.1,31.45],
                                    "曲靖":[103.79,25.51],
                                    "烟台":[121.39,37.52],
                                    "福州":[119.3,26.08],
                                    "瓦房店":[121.979603,39.627114],
                                    "即墨":[120.45,36.38],
                                    "抚顺":[123.97,41.97],
                                    "玉溪":[102.52,24.35],
                                    "张家口":[114.87,40.82],
                                    "阳泉":[113.57,37.85],
                                    "莱州":[119.942327,37.177017],
                                    "湖州":[120.1,30.86],
                                    "汕头":[116.69,23.39],
                                    "昆山":[120.95,31.39],
                                    "宁波":[121.56,29.86],
                                    "湛江":[110.359377,21.270708],
                                    "揭阳":[116.35,23.55],
                                    "荣成":[122.41,37.16],
                                    "连云港":[119.16,34.59],
                                    "葫芦岛":[120.836932,40.711052],
                                    "常熟":[120.74,31.64],
                                    "东莞":[113.75,23.04],
                                    "河源":[114.68,23.73],
                                    "淮安":[119.15,33.5],
                                    "泰州":[119.9,32.49],
                                    "南宁":[108.33,22.84],
                                    "营口":[122.18,40.65],
                                    "惠州":[114.4,23.09],
                                    "江阴":[120.26,31.91],
                                    "蓬莱":[120.75,37.8],
                                    "韶关":[113.62,24.84],
                                    "嘉峪关":[98.289152,39.77313],
                                    "广州":[113.23,23.16],
                                    "延安":[109.47,36.6],
                                    "太原":[112.53,37.87],
                                    "清远":[113.01,23.7],
                                    "中山":[113.38,22.52],
                                    "昆明":[102.73,25.04],
                                    "寿光":[118.73,36.86],
                                    "盘锦":[122.070714,41.119997],
                                    "长治":[113.08,36.18],
                                    "深圳":[114.07,22.62],
                                    "珠海":[113.52,22.3],
                                    "宿迁":[118.3,33.96],
                                    "咸阳":[108.72,34.36],
                                    "铜川":[109.11,35.09],
                                    "平度":[119.97,36.77],
                                    "佛山":[113.11,23.05],
                                    "海口":[110.35,20.02],
                                    "江门":[113.06,22.61],
                                    "章丘":[117.53,36.72],
                                    "肇庆":[112.44,23.05],
                                    "大连":[121.62,38.92],
                                    "临汾":[111.5,36.08],
                                    "吴江":[120.63,31.16],
                                    "石嘴山":[106.39,39.04],
                                    "沈阳":[123.38,41.8],
                                    "苏州":[120.62,31.32],
                                    "茂名":[110.88,21.68],
                                    "嘉兴":[120.76,30.77],
                                    "长春":[125.35,43.88],
                                    "胶州":[120.03336,36.264622],
                                    "银川":[106.27,38.47],
                                    "张家港":[120.555821,31.875428],
                                    "三门峡":[111.19,34.76],
                                    "锦州":[121.15,41.13],
                                    "南昌":[115.89,28.68],
                                    "柳州":[109.4,24.33],
                                    "三亚":[109.511909,18.252847],
                                    "自贡":[104.778442,29.33903],
                                    "吉林":[126.57,43.87],
                                    "阳江":[111.95,21.85],
                                    "泸州":[105.39,28.91],
                                    "西宁":[101.74,36.56],
                                    "宜宾":[104.56,29.77],
                                    "呼和浩特":[111.65,40.82],
                                    "成都":[104.06,30.67],
                                    "大同":[113.3,40.12],
                                    "镇江":[119.44,32.2],
                                    "桂林":[110.28,25.29],
                                    "张家界":[110.479191,29.117096],
                                    "宜兴":[119.82,31.36],
                                    "北海":[109.12,21.49],
                                    "西安":[108.95,34.27],
                                    "金坛":[119.56,31.74],
                                    "东营":[118.49,37.46],
                                    "牡丹江":[129.58,44.6],
                                    "遵义":[106.9,27.7],
                                    "绍兴":[120.58,30.01],
                                    "扬州":[119.42,32.39],
                                    "常州":[119.95,31.79],
                                    "潍坊":[119.1,36.62],
                                    "重庆":[106.54,29.59],
                                    "台州":[121.420757,28.656386],
                                    "南京":[118.78,32.04],
                                    "滨州":[118.03,37.36],
                                    "贵阳":[106.71,26.57],
                                    "无锡":[120.29,31.59],
                                    "本溪":[123.73,41.3],
                                    "克拉玛依":[84.77,45.59],
                                    "渭南":[109.5,34.52],
                                    "马鞍山":[118.48,31.56],
                                    "宝鸡":[107.15,34.38],
                                    "焦作":[113.21,35.24],
                                    "句容":[119.16,31.95],
                                    "北京":[116.46,39.92],
                                    "徐州":[117.2,34.26],
                                    "衡水":[115.72,37.72],
                                    "包头":[110,40.58],
                                    "绵阳":[104.73,31.48],
                                    "乌鲁木齐":[87.68,43.77],
                                    "枣庄":[117.57,34.86],
                                    "杭州":[120.19,30.26],
                                    "淄博":[118.05,36.78],
                                    "鞍山":[122.85,41.12],
                                    "溧阳":[119.48,31.43],
                                    "库尔勒":[86.06,41.68],
                                    "安阳":[114.35,36.1],
                                    "开封":[114.35,34.79],
                                    "济南":[117,36.65],
                                    "德阳":[104.37,31.13],
                                    "温州":[120.65,28.01],
                                    "九江":[115.97,29.71],
                                    "邯郸":[114.47,36.6],
                                    "临安":[119.72,30.23],
                                    "兰州":[103.73,36.03],
                                    "沧州":[116.83,38.33],
                                    "临沂":[118.35,35.05],
                                    "南充":[106.110698,30.837793],
                                    "天津":[117.2,39.13],
                                    "富阳":[119.95,30.07],
                                    "泰安":[117.13,36.18],
                                    "诸暨":[120.23,29.71],
                                    "郑州":[113.65,34.76],
                                    "哈尔滨":[126.63,45.75],
                                    "聊城":[115.97,36.45],
                                    "芜湖":[118.38,31.33],
                                    "唐山":[118.02,39.63],
                                    "平顶山":[113.29,33.75],
                                    "邢台":[114.48,37.05],
                                    "德州":[116.29,37.45],
                                    "济宁":[116.59,35.38],
                                    "荆州":[112.239741,30.335165],
                                    "宜昌":[111.3,30.7],
                                    "义乌":[120.06,29.32],
                                    "丽水":[119.92,28.45],
                                    "洛阳":[112.44,34.7],
                                    "秦皇岛":[119.57,39.95],
                                    "株洲":[113.16,27.83],
                                    "石家庄":[114.48,38.03],
                                    "莱芜":[117.67,36.19],
                                    "常德":[111.69,29.05],
                                    "保定":[115.48,38.85],
                                    "湘潭":[112.91,27.87],
                                    "金华":[119.64,29.12],
                                    "岳阳":[113.09,29.37],
                                    "长沙":[113,28.21],
                                    "衢州":[118.88,28.97],
                                    "廊坊":[116.7,39.53],
                                    "菏泽":[115.480656,35.23375],
                                    "合肥":[117.27,31.86],
                                    "武汉":[114.31,30.52],
                                    "大庆":[125.03,46.58],
                                    "六盘水":[104.82	,26.58],
                                    "台北":[121.31,25.03],
                                    "曼谷":[100.31,13.45],
                                    "大理":[100,25.25],
                                    "高邮":[32.39,119.18],
                                    "清迈":[98.58,18.46],
                                    "关岛":[ 144,13],
                                    "徐汇区":[31.09,121.26]
                                }
                            }
                        ]
                    };
                    // 为echarts对象加载数据
                    myChartsd.setOption(option);
                });


            //活动家订单支付对比
            var from_stt_title = [];
            var from_stt_count = [];
            var from_stt_price = [];
            var status_title =[];
            var status_count =[];
            var status_pirce =[];
            var status =[];
            var from_stt=[];
            for (var f=0;f<data.from_stt.length; f++) {
                from_stt_title.push(data.from_stt[f].title);
                from_stt_price.push(data.from_stt[f].total_price);
                from_stt_count.push(data.from_stt[f].count);
                from_stt.push({
                    value: data.from_stt[f].total_price,
                    name: data.from_stt[f].title
                })
            }
            for(var q=0;q<data.status_stt.length;q++){
                status_title.push(data.status_stt[q].title);
                status_pirce.push(data.status_stt[q].total_price);
                status_count.push(data.status_stt[q].count);
                status.push({
                    value: data.status_stt[q].total_price,
                    name: data.status_stt[q].title
                })
            }
            require.config({
                paths: {
                    echarts: 'http://echarts.baidu.com/build/dist'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/chart/pie',
                    'echarts/chart/funnel'
                ],
                function (ec) {
                    // 基于准备好的dom，初始化echarts图表
                    var myChart = ec.init(document.getElementById('yunsi'));
                    option = {
                        title : {
                            text: '活动家订单数据对比',
                            subtext: 'www.huodongjia.com',
                            sublink: 'http://www.huodongjia.com',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x:'left',
                            data:status_title
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                magicType : {
                                    show: true,
                                    type: ['pie', 'funnel']
                                },
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        series : [
                            {
                                name:'活动家订单状态',
                                type:'pie',
                                radius : [30, 110],
                                center : ['65%', 200],
                                roseType : 'area',
                                x: '50%',               // for funnel
                                max: 40,                // for funnel
                                sort : 'ascending',     // for funnel
                                data:status
                            },
                            {
                                name:'活动家订单来源',
                                type:'pie',
                                radius : [20, 110],
                                center : ['35%', 200],
                                roseType : 'radius',
                                width: '40%',       // for funnel
                                max: 40,            // for funnel
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : true
                                        },
                                        labelLine : {
                                            show :true
                                        }
                                    }
                                },
                                data:from_stt
                            }
                        ]
                    };
                    // 为echarts对象加载数据
                    myChart.setOption(option);
                });
            //活动家订单TOP榜
            $("#top").css({visibility:"visible"});
        }
    );

});
//条件筛选
$(".search_order").click(function(){
    var timeflag = $(".select_time").find("option:selected").val();
    var cityflag = $(".select_city").find("option:selected").val();
    var priceflag = $(".select_pirce").find("option:selected").val();
    var catflag = $(".select_order").find("option:selected").val();
    var begintime = $("#begin_time").val();
    var endtime = $("#end_time").val();
    $.get(
        "http://test2015.huodongjia.com:9010/order/show/",{sd_recent:timeflag,ts:"1",cat:catflag,city:cityflag,pr_range:priceflag,sd_begin:begintime,sd_end:endtime,json:"1"},function(data){
            //活动家当日订单金额
            var addtime_series_day = [];
            var addtime_add_day = [];
            var addtime_value_day = [];
            var addtime_count =[];
            var _html="";
            for (var e = 0; e < data.order_time_series.length; e++) {
                addtime_add_day.push(data.order_time_series[e].title);
                addtime_value_day.push(data.order_time_series[e].total_price);
                addtime_count.push(data.order_time_series[e].count);
                addtime_series_day.push({
                    value: data.order_time_series[e].total_price,
                    name: data.order_time_series[e].title
                })
            }
            $("#table_price").css({visibility:"visible"});
            var total_order=data.basic_stt.total_order;
            var sum_price=data.basic_stt.sum_price;
            var min_price=data.basic_stt.min_price;
            var max_price=data.basic_stt.max_price;
            var avg_price=data.basic_stt.avg_price;
            $("#min_price").text(min_price);
            $("#max_price").text(max_price);
            $("#avg_price").text(avg_price);
            $("#order_count").text(total_order);
            $("#sum_price").text(sum_price);

            //订单下单量对比
            for(var s=0;s<data.event_stt.length;s++) {
                var order_name = data.event_stt[s].title;//名字
                var order_city = data.event_stt[s].city;//城市
                var order_order = data.event_stt[s].count;//订单数量
                var order_price = data.event_stt[s].price;//单价
                var payed = data.event_stt[s].payed;//已支付
                var unpayed = data.event_stt[s].unpayed;//未支付
                var order_startime = data.event_stt[s].begin_time;//开始时间
                var order_endime = data.event_stt[s].begin_time;//结束时间
                var order_sum = data.event_stt[s].total_price;//总金额
                    _html+="<tr><td>"+order_name+"</td>" +
                    "<td>"+order_city+"</td>" +
                    "<td>"+order_order+"</td>" +
                    "<td>"+payed+"</td>" +
                    "<td>"+unpayed+"</td>" +
                    "<td>"+order_price+"</td>" +
                    "<td>"+order_startime+"</td>" +
                    "<td>"+order_endime+"</td>" +
                    "<td>"+order_sum+"</td></tr>";
            }
            $(".tbody_meet").html(_html);
            require.config({
                paths: {
                    echarts: 'http://echarts.baidu.com/build/dist'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/chart/line',
                    'echarts/chart/bar'
                ],
                function (ec) {
                    // 基于准备好的dom，初始化echarts图表
                    var myChart = ec.init(document.getElementById('main'));
                    var order =$(".order").text();
                    option = {
                        tooltip : {
                            trigger: 'axis'
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                magicType : {show: true,
                                    type: ['line', 'bar', 'stack', 'tiled'],
                                    option:{

                                    }
                                },
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data :addtime_add_day
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:"活动家当日订单金额",
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
                                data: addtime_value_day
                            },
                            {
                                name:"活动家当日订单数量",
                                type:'line',
                                stack: '总量',
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            position: 'top+10px',
                                            formatter:'{c}'
                                        }
                                    }
                                },
                                data:addtime_count
                            }
                        ]
                    };
                    // 为echarts对象加载数据
                    myChart.setOption(option);
                });

            //活动家分类订单占百分比
                var cat_stt_add =[];
                var cat_stt_price =[];
                for(var i=0;i<data.cat_stt.length;i++){
                    cat_stt_add.push(data.cat_stt[i].title);
                    cat_stt_price.push({value:data.cat_stt[i].total_price,name:data.cat_stt[i].title});
                }
                require.config({
                    paths: {
                        echarts: 'http://echarts.baidu.com/build/dist'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/chart/pie',
                        'echarts/chart/funnel'
                    ],
                    function (ec) {
                        // 基于准备好的dom，初始化echarts图表
                        var myChart = ec.init(document.getElementById('main_class'));
                        option = {
                            title : {
                                text: '活动家订单分类占百分比',
                                subtext: '活动家',
                                x:'center'
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                orient : 'vertical',
                                x : 'left',
                                data:cat_stt_add
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
                                    name:'来源',
                                    type:'pie',
                                    radius : '55%',
                                    width: '100%',
                                    center: ['50%', '60%'],
                                    data:cat_stt_price
                                }
                            ]
                        };
                        // 为echarts对象加载数据
                        myChart.setOption(option);
                    });

            //活动家城市订单
                var city_names=[];
                var city_prices=[];
                var city_counts=[];
                for(var d=0;d<data.city_stt.length;d++){
                    city_names.push(data.city_stt[d].title);
                    city_counts.push(data.city_stt[d].count);
                    city_prices.push({name:data.city_stt[d].title,value:data.city_stt[d].total_price});
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
                        var myChart = ec.init(document.getElementById('main_order'));
                        option = {
                            title: {
                                x: 'center',
                                text: '活动家城市订单',
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
                                {   name:'金额',
                                    type: 'value',
                                    show: true,
                                    splitNumber: 5
                                },
                                {
                                    name:'订单数量',
                                    type: 'value',
                                    show: true,
                                    splitNumber: 5
                                }
                            ],
                            series: [
                                {
                                    name: '活动家城市总销量',
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
                                },
                                {
                                    name:"活动家城市订单数量",
                                    type:'bar',
                                    yAxisIndex:1,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                position: 'top',
                                                formatter:'{c}'
                                            }
                                        }
                                    },
                                    data:city_counts
                                }
                            ]
                        };
                        // 为echarts对象加载数据
                        myChart.setOption(option);
                    });


            //活动家订单支付对比
            var from_stt_title = [];
            var from_stt_count = [];
            var from_stt_price = [];
            var status_title =[];
            var status_count =[];
            var status_pirce =[];
            var status =[];
            var from_stt=[];
            for (var f=0;f<data.from_stt.length; f++) {
                from_stt_title.push(data.from_stt[f].title);
                from_stt_price.push(data.from_stt[f].total_price);
                from_stt_count.push(data.from_stt[f].count);
                from_stt.push({
                    value: data.from_stt[f].total_price,
                    name: data.from_stt[f].title
                });
            }
            for(var q=0;q<data.status_stt.length;q++){
                status_title.push(data.status_stt[q].title);
                status_pirce.push(data.status_stt[q].total_price);
                status_count.push(data.status_stt[q].count);
                status.push({
                    value: data.status_stt[q].total_price,
                    name: data.status_stt[q].title
                });
            }
            require.config({
                paths: {
                    echarts: 'http://echarts.baidu.com/build/dist'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/chart/pie',
                    'echarts/chart/funnel'
                ],
                function (ec) {
                    // 基于准备好的dom，初始化echarts图表
                    var myChart = ec.init(document.getElementById('yunsi'));
                    option = {
                        title : {
                            text: '活动家订单数据对比',
                            subtext: 'www.huodongjia.com',
                            sublink: 'http://www.huodongjia.com',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x:'left',
                            data:status_title
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                magicType : {
                                    show: true,
                                    type: ['pie', 'funnel']
                                },
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        series : [
                            {
                                name:'活动家订单状态',
                                type:'pie',
                                radius : [30, 110],
                                center : ['65%', 200],
                                roseType : 'area',
                                x: '50%',               // for funnel
                                max: 40,                // for funnel
                                sort : 'ascending',     // for funnel
                                data:status
                            },
                            {
                                name:'活动家订单来源',
                                type:'pie',
                                radius : [20, 110],
                                center : ['35%', 200],
                                roseType : 'radius',
                                width: '40%',       // for funnel
                                max: 40,            // for funnel
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : true
                                        },
                                        labelLine : {
                                            show :true
                                        }
                                    }
                                },
                                data:from_stt
                            }
                        ]
                    };
                    // 为echarts对象加载数据
                    myChart.setOption(option);
                });

            //活动家全国订单分布
            var city_name=[];
            var city_price=[];
            var city_count=[];
                for(var c=0;c<data.city_stt.length;c++){
                    city_name.push(data.city_stt[c].title);
                    city_count.push(data.city_stt[c].count);
                    city_price.push({name:data.city_stt[c].title,value:data.city_stt[c].total_price});
                }
                require.config({
                    paths: {
                        echarts: 'http://echarts.baidu.com/build/dist'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/chart/map'
                    ],
                    function (ec) {
                        // 基于准备好的dom，初始化echarts图表
                        var myChartsd = ec.init(document.getElementById('main_city'));
                        option = {
                            title : {
                                text: '活动家全国订单分布地图',
                                subtext: 'www.huodongjia.com',
                                sublink: 'http://www.huodongjia.com',
                                x:'center'
                            },
                            tooltip : {
                                trigger: 'item'
                            },
                            legend: {
                                orient: 'vertical',
                                x:'left',
                                data:['活动家']
                            },
                            dataRange: {
                                min : 0,
                                max : 30000,
                                calculable : true,
                                color: ['maroon','purple','red','orange','yellow','lightgreen']
                            },
                            toolbox: {
                                show : true,
                                orient : 'vertical',
                                x: 'right',
                                y: 'center',
                                feature : {
                                    mark : {show: true},
                                    dataView : {show: true, readOnly: false},
                                    restore : {show: true},
                                    saveAsImage : {show: true}
                                }
                            },
                            series : [
                                {
                                    name: '活动家',
                                    type: 'map',
                                    mapType: 'china',
                                    hoverable: false,
                                    roam:false,
                                    data : [],
                                    markPoint : {
                                        symbolSize: 7,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                                        itemStyle: {
                                            normal: {
                                                borderColor: '#87cefa',
                                                borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                                                label: {
                                                    show: true
                                                }
                                            },
                                            emphasis: {
                                                borderColor: '#1e90ff',
                                                borderWidth: 5,
                                                label: {
                                                    show: true
                                                }
                                            }
                                        },
                                        data :city_price
                                    },
                                    geoCoord: {
                                        "海门":[121.15,31.89],
                                        "鄂尔多斯":[109.781327,39.608266],
                                        "招远":[120.38,37.35],
                                        "舟山":[122.207216,29.985295],
                                        "齐齐哈尔":[123.97,47.33],
                                        "盐城":[120.13,33.38],
                                        "赤峰":[118.87,42.28],
                                        "青岛":[120.33,36.07],
                                        "乳山":[121.52,36.89],
                                        "金昌":[102.188043,38.520089],
                                        "泉州":[118.58,24.93],
                                        "莱西":[120.53,36.86],
                                        "日照":[119.46,35.42],
                                        "胶南":[119.97,35.88],
                                        "南通":[121.05,32.08],
                                        "拉萨":[91.11,29.97],
                                        "云浮":[112.02,22.93],
                                        "梅州":[116.1,24.55],
                                        "文登":[122.05,37.2],
                                        "上海":[121.48,31.22],
                                        "攀枝花":[101.718637,26.582347],
                                        "威海":[122.1,37.5],
                                        "承德":[117.93,40.97],
                                        "厦门":[118.1,24.46],
                                        "汕尾":[115.375279,22.786211],
                                        "潮州":[116.63,23.68],
                                        "丹东":[124.37,40.13],
                                        "太仓":[121.1,31.45],
                                        "曲靖":[103.79,25.51],
                                        "烟台":[121.39,37.52],
                                        "福州":[119.3,26.08],
                                        "瓦房店":[121.979603,39.627114],
                                        "即墨":[120.45,36.38],
                                        "抚顺":[123.97,41.97],
                                        "玉溪":[102.52,24.35],
                                        "张家口":[114.87,40.82],
                                        "阳泉":[113.57,37.85],
                                        "莱州":[119.942327,37.177017],
                                        "湖州":[120.1,30.86],
                                        "汕头":[116.69,23.39],
                                        "昆山":[120.95,31.39],
                                        "宁波":[121.56,29.86],
                                        "湛江":[110.359377,21.270708],
                                        "揭阳":[116.35,23.55],
                                        "荣成":[122.41,37.16],
                                        "连云港":[119.16,34.59],
                                        "葫芦岛":[120.836932,40.711052],
                                        "常熟":[120.74,31.64],
                                        "东莞":[113.75,23.04],
                                        "河源":[114.68,23.73],
                                        "淮安":[119.15,33.5],
                                        "泰州":[119.9,32.49],
                                        "南宁":[108.33,22.84],
                                        "营口":[122.18,40.65],
                                        "惠州":[114.4,23.09],
                                        "江阴":[120.26,31.91],
                                        "蓬莱":[120.75,37.8],
                                        "韶关":[113.62,24.84],
                                        "嘉峪关":[98.289152,39.77313],
                                        "广州":[113.23,23.16],
                                        "延安":[109.47,36.6],
                                        "太原":[112.53,37.87],
                                        "清远":[113.01,23.7],
                                        "中山":[113.38,22.52],
                                        "昆明":[102.73,25.04],
                                        "寿光":[118.73,36.86],
                                        "盘锦":[122.070714,41.119997],
                                        "长治":[113.08,36.18],
                                        "深圳":[114.07,22.62],
                                        "珠海":[113.52,22.3],
                                        "宿迁":[118.3,33.96],
                                        "咸阳":[108.72,34.36],
                                        "铜川":[109.11,35.09],
                                        "平度":[119.97,36.77],
                                        "佛山":[113.11,23.05],
                                        "海口":[110.35,20.02],
                                        "江门":[113.06,22.61],
                                        "章丘":[117.53,36.72],
                                        "肇庆":[112.44,23.05],
                                        "大连":[121.62,38.92],
                                        "临汾":[111.5,36.08],
                                        "吴江":[120.63,31.16],
                                        "石嘴山":[106.39,39.04],
                                        "沈阳":[123.38,41.8],
                                        "苏州":[120.62,31.32],
                                        "茂名":[110.88,21.68],
                                        "嘉兴":[120.76,30.77],
                                        "长春":[125.35,43.88],
                                        "胶州":[120.03336,36.264622],
                                        "银川":[106.27,38.47],
                                        "张家港":[120.555821,31.875428],
                                        "三门峡":[111.19,34.76],
                                        "锦州":[121.15,41.13],
                                        "南昌":[115.89,28.68],
                                        "柳州":[109.4,24.33],
                                        "三亚":[109.511909,18.252847],
                                        "自贡":[104.778442,29.33903],
                                        "吉林":[126.57,43.87],
                                        "阳江":[111.95,21.85],
                                        "泸州":[105.39,28.91],
                                        "西宁":[101.74,36.56],
                                        "宜宾":[104.56,29.77],
                                        "呼和浩特":[111.65,40.82],
                                        "成都":[104.06,30.67],
                                        "大同":[113.3,40.12],
                                        "镇江":[119.44,32.2],
                                        "桂林":[110.28,25.29],
                                        "张家界":[110.479191,29.117096],
                                        "宜兴":[119.82,31.36],
                                        "北海":[109.12,21.49],
                                        "西安":[108.95,34.27],
                                        "金坛":[119.56,31.74],
                                        "东营":[118.49,37.46],
                                        "牡丹江":[129.58,44.6],
                                        "遵义":[106.9,27.7],
                                        "绍兴":[120.58,30.01],
                                        "扬州":[119.42,32.39],
                                        "常州":[119.95,31.79],
                                        "潍坊":[119.1,36.62],
                                        "重庆":[106.54,29.59],
                                        "台州":[121.420757,28.656386],
                                        "南京":[118.78,32.04],
                                        "滨州":[118.03,37.36],
                                        "贵阳":[106.71,26.57],
                                        "无锡":[120.29,31.59],
                                        "本溪":[123.73,41.3],
                                        "克拉玛依":[84.77,45.59],
                                        "渭南":[109.5,34.52],
                                        "马鞍山":[118.48,31.56],
                                        "宝鸡":[107.15,34.38],
                                        "焦作":[113.21,35.24],
                                        "句容":[119.16,31.95],
                                        "北京":[116.46,39.92],
                                        "徐州":[117.2,34.26],
                                        "衡水":[115.72,37.72],
                                        "包头":[110,40.58],
                                        "绵阳":[104.73,31.48],
                                        "乌鲁木齐":[87.68,43.77],
                                        "枣庄":[117.57,34.86],
                                        "杭州":[120.19,30.26],
                                        "淄博":[118.05,36.78],
                                        "鞍山":[122.85,41.12],
                                        "溧阳":[119.48,31.43],
                                        "库尔勒":[86.06,41.68],
                                        "安阳":[114.35,36.1],
                                        "开封":[114.35,34.79],
                                        "济南":[117,36.65],
                                        "德阳":[104.37,31.13],
                                        "温州":[120.65,28.01],
                                        "九江":[115.97,29.71],
                                        "邯郸":[114.47,36.6],
                                        "临安":[119.72,30.23],
                                        "兰州":[103.73,36.03],
                                        "沧州":[116.83,38.33],
                                        "临沂":[118.35,35.05],
                                        "南充":[106.110698,30.837793],
                                        "天津":[117.2,39.13],
                                        "富阳":[119.95,30.07],
                                        "泰安":[117.13,36.18],
                                        "诸暨":[120.23,29.71],
                                        "郑州":[113.65,34.76],
                                        "哈尔滨":[126.63,45.75],
                                        "聊城":[115.97,36.45],
                                        "芜湖":[118.38,31.33],
                                        "唐山":[118.02,39.63],
                                        "平顶山":[113.29,33.75],
                                        "邢台":[114.48,37.05],
                                        "德州":[116.29,37.45],
                                        "济宁":[116.59,35.38],
                                        "荆州":[112.239741,30.335165],
                                        "宜昌":[111.3,30.7],
                                        "义乌":[120.06,29.32],
                                        "丽水":[119.92,28.45],
                                        "洛阳":[112.44,34.7],
                                        "秦皇岛":[119.57,39.95],
                                        "株洲":[113.16,27.83],
                                        "石家庄":[114.48,38.03],
                                        "莱芜":[117.67,36.19],
                                        "常德":[111.69,29.05],
                                        "保定":[115.48,38.85],
                                        "湘潭":[112.91,27.87],
                                        "金华":[119.64,29.12],
                                        "岳阳":[113.09,29.37],
                                        "长沙":[113,28.21],
                                        "衢州":[118.88,28.97],
                                        "廊坊":[116.7,39.53],
                                        "菏泽":[115.480656,35.23375],
                                        "合肥":[117.27,31.86],
                                        "武汉":[114.31,30.52],
                                        "大庆":[125.03,46.58],
                                        "六盘水":[104.82	,26.58],
                                        "台北":[121.31,25.03],
                                        "曼谷":[100.31,13.45],
                                        "大理":[100,25.25],
                                        "高邮":[32.39,119.18],
                                        "清迈":[98.58,18.46],
                                        "关岛":[ 144,13],
                                        "徐汇区":[31.09,121.26]
                                    }
                                },
                                {
                                    name: '活动家',
                                    type: 'map',
                                    mapType: 'china',
                                    hoverable: false,
                                    roam:false,
                                    data : [],
                                    markPoint : {
                                        symbolSize: 5,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                                        itemStyle: {
                                            normal: {
                                                borderColor: '#87cefa',
                                                borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                                                label: {
                                                    show: true
                                                }
                                            },
                                            emphasis: {
                                                borderColor: '#1e90ff',
                                                borderWidth: 5,
                                                label: {
                                                    show: true
                                                }
                                            }
                                        },
                                        data :city_count
                                    },
                                    geoCoord: {
                                        "海门":[121.15,31.89],
                                        "鄂尔多斯":[109.781327,39.608266],
                                        "招远":[120.38,37.35],
                                        "舟山":[122.207216,29.985295],
                                        "齐齐哈尔":[123.97,47.33],
                                        "盐城":[120.13,33.38],
                                        "赤峰":[118.87,42.28],
                                        "青岛":[120.33,36.07],
                                        "乳山":[121.52,36.89],
                                        "金昌":[102.188043,38.520089],
                                        "泉州":[118.58,24.93],
                                        "莱西":[120.53,36.86],
                                        "日照":[119.46,35.42],
                                        "胶南":[119.97,35.88],
                                        "南通":[121.05,32.08],
                                        "拉萨":[91.11,29.97],
                                        "云浮":[112.02,22.93],
                                        "梅州":[116.1,24.55],
                                        "文登":[122.05,37.2],
                                        "上海":[121.48,31.22],
                                        "攀枝花":[101.718637,26.582347],
                                        "威海":[122.1,37.5],
                                        "承德":[117.93,40.97],
                                        "厦门":[118.1,24.46],
                                        "汕尾":[115.375279,22.786211],
                                        "潮州":[116.63,23.68],
                                        "丹东":[124.37,40.13],
                                        "太仓":[121.1,31.45],
                                        "曲靖":[103.79,25.51],
                                        "烟台":[121.39,37.52],
                                        "福州":[119.3,26.08],
                                        "瓦房店":[121.979603,39.627114],
                                        "即墨":[120.45,36.38],
                                        "抚顺":[123.97,41.97],
                                        "玉溪":[102.52,24.35],
                                        "张家口":[114.87,40.82],
                                        "阳泉":[113.57,37.85],
                                        "莱州":[119.942327,37.177017],
                                        "湖州":[120.1,30.86],
                                        "汕头":[116.69,23.39],
                                        "昆山":[120.95,31.39],
                                        "宁波":[121.56,29.86],
                                        "湛江":[110.359377,21.270708],
                                        "揭阳":[116.35,23.55],
                                        "荣成":[122.41,37.16],
                                        "连云港":[119.16,34.59],
                                        "葫芦岛":[120.836932,40.711052],
                                        "常熟":[120.74,31.64],
                                        "东莞":[113.75,23.04],
                                        "河源":[114.68,23.73],
                                        "淮安":[119.15,33.5],
                                        "泰州":[119.9,32.49],
                                        "南宁":[108.33,22.84],
                                        "营口":[122.18,40.65],
                                        "惠州":[114.4,23.09],
                                        "江阴":[120.26,31.91],
                                        "蓬莱":[120.75,37.8],
                                        "韶关":[113.62,24.84],
                                        "嘉峪关":[98.289152,39.77313],
                                        "广州":[113.23,23.16],
                                        "延安":[109.47,36.6],
                                        "太原":[112.53,37.87],
                                        "清远":[113.01,23.7],
                                        "中山":[113.38,22.52],
                                        "昆明":[102.73,25.04],
                                        "寿光":[118.73,36.86],
                                        "盘锦":[122.070714,41.119997],
                                        "长治":[113.08,36.18],
                                        "深圳":[114.07,22.62],
                                        "珠海":[113.52,22.3],
                                        "宿迁":[118.3,33.96],
                                        "咸阳":[108.72,34.36],
                                        "铜川":[109.11,35.09],
                                        "平度":[119.97,36.77],
                                        "佛山":[113.11,23.05],
                                        "海口":[110.35,20.02],
                                        "江门":[113.06,22.61],
                                        "章丘":[117.53,36.72],
                                        "肇庆":[112.44,23.05],
                                        "大连":[121.62,38.92],
                                        "临汾":[111.5,36.08],
                                        "吴江":[120.63,31.16],
                                        "石嘴山":[106.39,39.04],
                                        "沈阳":[123.38,41.8],
                                        "苏州":[120.62,31.32],
                                        "茂名":[110.88,21.68],
                                        "嘉兴":[120.76,30.77],
                                        "长春":[125.35,43.88],
                                        "胶州":[120.03336,36.264622],
                                        "银川":[106.27,38.47],
                                        "张家港":[120.555821,31.875428],
                                        "三门峡":[111.19,34.76],
                                        "锦州":[121.15,41.13],
                                        "南昌":[115.89,28.68],
                                        "柳州":[109.4,24.33],
                                        "三亚":[109.511909,18.252847],
                                        "自贡":[104.778442,29.33903],
                                        "吉林":[126.57,43.87],
                                        "阳江":[111.95,21.85],
                                        "泸州":[105.39,28.91],
                                        "西宁":[101.74,36.56],
                                        "宜宾":[104.56,29.77],
                                        "呼和浩特":[111.65,40.82],
                                        "成都":[104.06,30.67],
                                        "大同":[113.3,40.12],
                                        "镇江":[119.44,32.2],
                                        "桂林":[110.28,25.29],
                                        "张家界":[110.479191,29.117096],
                                        "宜兴":[119.82,31.36],
                                        "北海":[109.12,21.49],
                                        "西安":[108.95,34.27],
                                        "金坛":[119.56,31.74],
                                        "东营":[118.49,37.46],
                                        "牡丹江":[129.58,44.6],
                                        "遵义":[106.9,27.7],
                                        "绍兴":[120.58,30.01],
                                        "扬州":[119.42,32.39],
                                        "常州":[119.95,31.79],
                                        "潍坊":[119.1,36.62],
                                        "重庆":[106.54,29.59],
                                        "台州":[121.420757,28.656386],
                                        "南京":[118.78,32.04],
                                        "滨州":[118.03,37.36],
                                        "贵阳":[106.71,26.57],
                                        "无锡":[120.29,31.59],
                                        "本溪":[123.73,41.3],
                                        "克拉玛依":[84.77,45.59],
                                        "渭南":[109.5,34.52],
                                        "马鞍山":[118.48,31.56],
                                        "宝鸡":[107.15,34.38],
                                        "焦作":[113.21,35.24],
                                        "句容":[119.16,31.95],
                                        "北京":[116.46,39.92],
                                        "徐州":[117.2,34.26],
                                        "衡水":[115.72,37.72],
                                        "包头":[110,40.58],
                                        "绵阳":[104.73,31.48],
                                        "乌鲁木齐":[87.68,43.77],
                                        "枣庄":[117.57,34.86],
                                        "杭州":[120.19,30.26],
                                        "淄博":[118.05,36.78],
                                        "鞍山":[122.85,41.12],
                                        "溧阳":[119.48,31.43],
                                        "库尔勒":[86.06,41.68],
                                        "安阳":[114.35,36.1],
                                        "开封":[114.35,34.79],
                                        "济南":[117,36.65],
                                        "德阳":[104.37,31.13],
                                        "温州":[120.65,28.01],
                                        "九江":[115.97,29.71],
                                        "邯郸":[114.47,36.6],
                                        "临安":[119.72,30.23],
                                        "兰州":[103.73,36.03],
                                        "沧州":[116.83,38.33],
                                        "临沂":[118.35,35.05],
                                        "南充":[106.110698,30.837793],
                                        "天津":[117.2,39.13],
                                        "富阳":[119.95,30.07],
                                        "泰安":[117.13,36.18],
                                        "诸暨":[120.23,29.71],
                                        "郑州":[113.65,34.76],
                                        "哈尔滨":[126.63,45.75],
                                        "聊城":[115.97,36.45],
                                        "芜湖":[118.38,31.33],
                                        "唐山":[118.02,39.63],
                                        "平顶山":[113.29,33.75],
                                        "邢台":[114.48,37.05],
                                        "德州":[116.29,37.45],
                                        "济宁":[116.59,35.38],
                                        "荆州":[112.239741,30.335165],
                                        "宜昌":[111.3,30.7],
                                        "义乌":[120.06,29.32],
                                        "丽水":[119.92,28.45],
                                        "洛阳":[112.44,34.7],
                                        "秦皇岛":[119.57,39.95],
                                        "株洲":[113.16,27.83],
                                        "石家庄":[114.48,38.03],
                                        "莱芜":[117.67,36.19],
                                        "常德":[111.69,29.05],
                                        "保定":[115.48,38.85],
                                        "湘潭":[112.91,27.87],
                                        "金华":[119.64,29.12],
                                        "岳阳":[113.09,29.37],
                                        "长沙":[113,28.21],
                                        "衢州":[118.88,28.97],
                                        "廊坊":[116.7,39.53],
                                        "菏泽":[115.480656,35.23375],
                                        "合肥":[117.27,31.86],
                                        "武汉":[114.31,30.52],
                                        "大庆":[125.03,46.58],
                                        "六盘水":[104.82	,26.58],
                                        "台北":[121.31,25.03],
                                        "曼谷":[100.31,13.45],
                                        "大理":[100,25.25],
                                        "高邮":[32.39,119.18],
                                        "清迈":[98.58,18.46],
                                        "关岛":[ 144,13],
                                        "徐汇区":[31.09,121.26]
                                    }
                                }
                            ]
                        };
                        // 为echarts对象加载数据
                        myChartsd.setOption(option);
                    });

            //活动家订单TOP榜
            $("#top").css({visibility:"visible"});
        }
    );

});
