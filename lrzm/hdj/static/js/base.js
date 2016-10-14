/**
 * Created by Administrator on 2016/5/27 0027.
 */
var myChart2 = echarts.init(document.getElementById('event_2'),'dark');
var myChart3 = echarts.init(document.getElementById('pc'),'dark');
var myChart4 = echarts.init(document.getElementById('news'),'dark');
var myChart5 = echarts.init(document.getElementById('wap'),'dark');
$.ajax({
    url:'/?json=1',
    dataType:'json',
    type:'get',
    async:false,
    success:function(data){
        var data_x=[],data_y=[]
        for(var i=0;i<data.order_list.length;i++){
            data_x.push(data.order_list[i][0])
            if(!data.order_list[i][1]) data.order_list[i][1]=0
            data_y.push(data.order_list[i][1])
        }
        var pc_x=[],pc_y=[]          //pc
        for(var i=0;i<data.website_view[1].length;i++){
            pc_x.push(data.website_view[1][i][0])
            pc_y.push(data.website_view[1][i][1])
        }
        var new_x=[],new_y=[]          //news
        for(var i=0;i<data.news_view[1].length;i++){
            new_x.push(data.news_view[1][i][0])
            new_y.push(data.news_view[1][i][1])
        }
        var wap_x=[],wap_y=[]          //wap
        for(var i=0;i<data.wap_view[1].length;i++){
            wap_x.push(data.wap_view[1][i][0])
            wap_y.push(data.wap_view[1][i][1])
        }
        var option2 = {
            backgroundColor: 'rgba(0,0,0,0)',//背景色
            tooltip : {
                trigger: 'axis',
                backgroundColor:'rgba(81, 180, 247, 0.5)',
                axisPointer:{
                    type:'line',
                    lineStyle:{
                        type: 'dashed',
                        color:'rgba(118, 210, 247, 1)'
                    },

                }
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data :data_x,
                    axisLine : {
                        show:true,
                        lineStyle: {
                            color: '#476184',
                            width:2
                        }
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLabel : {
                        show:true,
                        textStyle: {
                            color: '#2F77AB',
                        },
                    },
                }
            ],
            yAxis : [
                {
                    name:'销售额',
                    type : 'value',
                    nameTextStyle:{
                        color:'#2F77AB'
                    },
                    axisLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLabel : {
                        show:true,
                        textStyle: {
                            color: '#2F77AB',
                        },
                    },
                    splitLine : {
                        show:true,
                        lineStyle: {
                            color: '#2A344E'
                        }
                    },
                }
            ],
            series : [
                {
                    name:'销售额',
                    type:'line',
                    smooth:true,
                    symbol:'emptyCircle',
                    itemStyle: {
                        normal: {
                            areaStyle: {type: 'default',color:'rgba(83, 180, 249, 0.3)'},
                            color:'rgba(118, 210, 247, 1)'
                        }},
                    data:data_y
                },
            ]
        };
        myChart2.setOption(option2);
        var option3 = {
            backgroundColor: 'rgba(0,0,0,0)',//背景色
            tooltip : {
                trigger: 'axis',
                backgroundColor:'rgba(81, 180, 247, 0.5)'
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : pc_x,
                    axisLine : {
                        show:true,
                        lineStyle: {
                            color: '#476184',
                            width:2
                        }
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLabel : {
                        show:true,
                        textStyle: {
                            color: '#2F77AB',
                        },
                    },
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLabel : {
                        show:false,
                    },
                    splitLine : {
                        show:true,
                        lineStyle: {
                            color: '#2A344E'
                        }
                    },
                }
            ],
            series : [
                {
                    name:'pc端访问量',
                    type:'line',
                    smooth:true,
                    symbol:'emptyCircle',
                    itemStyle: {
                        normal: {
                            color:'rgba(118, 210, 247, 1)'
                        }},
                    data:pc_y
                },
            ]
        };
        myChart3.setOption(option3);
        var option4 = {
            backgroundColor: 'rgba(0,0,0,0)',//背景色
            tooltip : {
                trigger: 'axis',
                backgroundColor:'rgba(81, 180, 247, 0.5)'
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : new_x,
                    axisLine : {
                        show:true,
                        lineStyle: {
                            color: '#476184',
                            width:2
                        }
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLabel : {
                        show:true,
                        textStyle: {
                            color: '#2F77AB',
                        },
                    },
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLabel : {
                        show:false,
                    },
                    splitLine : {
                        show:true,
                        lineStyle: {
                            color: '#2A344E'
                        }
                    },
                }
            ],
            series : [
                {
                    name:'news访问量',
                    type:'line',
                    smooth:true,
                    symbol:'emptyCircle',
                    itemStyle: {
                        normal: {
                            color:'rgba(118, 210, 247, 1)'
                        }},
                    data:new_y
                },
            ]
        };
        myChart4.setOption(option4);
        var option5 = {
            backgroundColor: 'rgba(0,0,0,0)',//背景色
            tooltip : {
                trigger: 'axis',
                backgroundColor:'rgba(81, 180, 247, 0.5)'
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : wap_x,
                    axisLine : {
                        show:true,
                        lineStyle: {
                            color: '#476184',
                            width:2
                        }
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLabel : {
                        show:true,
                        textStyle: {
                            color: '#2F77AB',
                        },
                    },
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLabel : {
                        show:false,
                    },
                    splitLine : {
                        show:true,
                        lineStyle: {
                            color: '#2A344E'
                        }
                    },
                }
            ],
            series : [
                {
                    name:'wap端访问量',
                    type:'line',
                    smooth:true,
                    symbol:'emptyCircle',
                    itemStyle: {
                        normal: {
                            color:'rgba(118, 210, 247, 1)'
                        }},
                    data:wap_y
                },
            ]
        };
        myChart5.setOption(option5);
        $(window).resize(function () {
            myChart2.resize();
            myChart3.resize();
            myChart4.resize();
            myChart5.resize();
        })
    }
})


