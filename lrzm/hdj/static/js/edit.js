/**
 * Created by Administrator on 2016/6/1 0001.
 */
var myChart2 = echarts.init(document.getElementById('top'),'infographic');
var myChart3 = echarts.init(document.getElementById('price'),'infographic');
var myChart4 = echarts.init(document.getElementById('event'),'infographic');
$('.select button').click(function () {
    $(".select button").html('加载中...').attr({ disabled: "disabled" });
    setTimeout(function(){
        edit()
    },0)
})
edit()
function edit(){
    var start_day=$('#start_time').val(),end_day=$('#end_time').val()
    $.ajax({
        url: '/neweventvis/showevents/?json=1',
        data:{
            start_time:start_day,
            end_time:end_day,
        },
        dataType: 'json',
        type: 'get',
        async: false,
        beforeSend: function () {
            // 禁用按钮防止重复提交
            $(".select button").html('加载中...').attr({ disabled: "disabled" });
        },
        success:function(data){
            $(".select button").html('确定').removeAttr("disabled");
            var price_x=[],price_y=[],event_x=[],event_y1=[],event_y2=[],event_y3=[]
            for(var i=0;i<data.price_range_events.length;i++){
                price_x.push(data.price_range_events[i].name)
                price_y.push(data.price_range_events[i].cnt)
            }
            for(var i=0;i<data.price_type_events.length;i++){
                event_x.push(data.price_type_events[i].name)
                event_y1.push(data.price_type_events[i].price_type_cnt[0].cnt)
                event_y2.push(data.price_type_events[i].price_type_cnt[1].cnt)
                event_y3.push(data.price_type_events[i].price_type_cnt[2].cnt)
            }
            $('.cat').html('')
            $('.num').html('')
            for(var i=0;i<data.cats_events.length;i++){
                $('.cat').append("<li class='col-sm-1 col-xs-1'><span>"+data.cats_events[i].name+"</span><br>"+data.cats_events[i].cnt+"</li>")
            }
            for(var i=0;i<data.citys_events_top5.length;i++){
                $('.num').append("<span>"+data.citys_events_top5[i].cnt+"</span>")
            }
            var option2 = {
                backgroundColor: 'rgba(0,0,0,0)',//背景色
                calculable : true,
                series : [
                    {
                        name:data.citys_events_top5[0].name,
                        type:'pie',
                        hoverAnimation:false,
                        radius : ['45%', '65%'],
                        center: ['10%', '50%'],
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
                            {value:data.citys_events_top5[0].cnt, name:data.citys_events_top5[0].name,itemStyle : {normal : {color : '#4FDFF7'}}},
                            {value:data.citys_events_top5[0].total_cnt-data.citys_events_top5[0].cnt, name:'',itemStyle : {normal : {color : '#19243A'}}},
                        ]
                    },
                    {
                        name:data.citys_events_top5[1].name,
                        type:'pie',
                        hoverAnimation:false,
                        radius : ['45%', '65%'],
                        center: ['30%', '50%'],
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
                            {value:data.citys_events_top5[1].cnt, name:data.citys_events_top5[1].name,itemStyle : {normal : {color : '#4FDFF7'}}},
                            {value:data.citys_events_top5[0].total_cnt-data.citys_events_top5[1].cnt, name:'',itemStyle : {normal : {color : '#19243A'}}},
                        ]
                    },
                    {
                        name:data.citys_events_top5[2].name,
                        type:'pie',
                        hoverAnimation:false,
                        radius : ['45%', '65%'],
                        center: ['50%', '50%'],
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
                            {value:data.citys_events_top5[2].cnt, name:data.citys_events_top5[2].name,itemStyle : {normal : {color : '#4FDFF7'}}},
                            {value:data.citys_events_top5[0].total_cnt-data.citys_events_top5[2].cnt, name:'',itemStyle : {normal : {color : '#19243A'}}},
                        ]
                    },
                    {
                        name:data.citys_events_top5[3].name,
                        type:'pie',
                        hoverAnimation:false,
                        radius : ['45%', '65%'],
                        center: ['70%', '50%'],
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
                            {value:data.citys_events_top5[3].cnt, name:data.citys_events_top5[3].name,itemStyle : {normal : {color : '#4FDFF7'}}},
                            {value:data.citys_events_top5[0].total_cnt-data.citys_events_top5[3].cnt, name:'',itemStyle : {normal : {color : '#19243A'}}},
                        ]
                    },
                    {
                        name:data.citys_events_top5[4].name,
                        type:'pie',
                        hoverAnimation:false,
                        radius : ['45%', '65%'],
                        center: ['90%', '50%'],
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
                            {value:data.citys_events_top5[4].cnt, name:data.citys_events_top5[4].name,itemStyle : {normal : {color : '#4FDFF7'}}},
                            {value:data.citys_events_top5[0].total_cnt-data.citys_events_top5[4].cnt, name:'',itemStyle : {normal : {color : '#19243A'}}},
                        ]
                    },
                ]
            };
            myChart2.setOption(option2);
            var option3 = {
                backgroundColor: 'rgba(0,0,0,0)',//背景色
                grid: {
                    top:'5%',
                    right:'5%'
                },
                tooltip : {
                    trigger: 'axis'
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap:true,
                        data :price_x,
                        splitLine : {
                            show:false,
                        },
                        axisLabel : {
                            show:true,
                            textStyle: {
                                color: '#20509E',
                            },
                        },
                        axisTick:{
                            show:false,
                        },
                        axisLine : {
                            show:true,
                            lineStyle: {
                                color: '#132055',
                                width:2
                            }
                        },
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        splitLine : {
                            show:true,
                            lineStyle: {
                                color: '#0C1A47',
                                type:'solid'
                            }
                        },
                        axisTick:{
                            show:false,
                        },
                        axisLine : {
                            show:false,
                        },
                        axisLabel : {
                            show:true,
                            textStyle: {
                                color: '#20509E',
                            },
                        },
                    }
                ],
                series : [
                    {
                        name:'会议价格',
                        type:'bar',
                        barCategoryGap: '70%',
                        itemStyle: {normal: {
                            color:'#F25252',
                        }},
                        data:price_y
                    },

                ]
            };
            myChart3.setOption(option3);
            var option4 = {
                backgroundColor: 'rgba(0,0,0,0)',//背景色
                grid: {
                    top:'11%',
                    right:'1%',
                    left:'3%'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    x : 'right',
                    textStyle:{
                        color:'#1A4A97'
                    },
                    data:['标准收费','待定','免费']
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap:true,
                        data : event_x,
                        splitLine : {
                            show:false,
                        },
                        axisLabel : {
                            show:true,
                            textStyle: {
                                color: '#20509E',
                            },
                        },
                        axisTick:{
                            show:false,
                        },
                        axisLine : {
                            show:true,
                            lineStyle: {
                                color: '#132055',
                                width:2
                            }
                        },
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'会议场次(场)',
                        nameTextStyle: {
                            color: '#20509E',
                        },
                        splitLine : {
                            show:true,
                            lineStyle: {
                                color: '#1D2C60',
                                type:'solid'
                            }
                        },
                        axisTick:{
                            show:false,
                        },
                        axisLine : {
                            show:false,
                        },
                        axisLabel : {
                            show:true,
                            textStyle: {
                                color: '#20509E',
                            },
                        },
                    }
                ],
                series : [
                    {
                        name:'标准收费',
                        type:'bar',
                        barCategoryGap: '60%',
                        itemStyle: {normal: {
                            color:'#F25252',
                        }},
                        data:event_y1
                    },
                    {
                        name:'待定',
                        type:'bar',
                        barCategoryGap: '60%',
                        itemStyle: {normal: {
                            color:'#68B3D3',
                        }},
                        data:event_y2
                    },
                    {
                        name:'免费',
                        type:'bar',
                        barCategoryGap: '60%',
                        itemStyle: {normal: {
                            color:'#F6D495',
                        }},
                        data:event_y3
                    },
                ]
            };
            myChart4.setOption(option4);
            $(window).resize(function () {
                myChart2.resize();
                myChart3.resize();
                myChart4.resize();
            })
        }
    })
}

