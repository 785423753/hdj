/**
 * Created by Administrator on 2016/5/28 0028.
 */
var myChart2 = echarts.init(document.getElementById('event_2'),'dark');
var myChart3 = echarts.init(document.getElementById('event_3'),'dark');
$.ajax({
    url:'/newordervis/order_source/?json=1',
    dataType:'json',
    type:'get',
    async:false,
    success:function(data){
        var option2 = {
            backgroundColor: 'rgba(0,0,0,0)',//背景色
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            calculable : true,
            series : [
                {
                    name:'支付比例',
                    type:'pie',
                    radius : '55%',
                    data:[
                        {value:data.not_pay_orders_cnt, name:'未支付', itemStyle:{normal:{color:'#1B77C4'}}},
                        {value:data.pay_orders_cnt, name:'已支付', itemStyle:{normal:{color:'#3FA0F1'}}}
                    ]

                }
            ]
        };
        myChart2.setOption(option2);
        var option3 = {
            backgroundColor: 'rgba(0,0,0,0)',//背景色
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
                {
                    name:'支付比例',
                    type:'pie',
                    radius : '65%',
                    itemStyle:{
                        normal:{
                            label:{
                                show:true,
                                formatter: "{b} : {d}%"
                            }
                        }
                    },
                    data:[
                        {value:data.pay_way[4].cnt, name:'对公转账',itemStyle:{normal:{color:'#88B0BB'}}},
                        {value:data.pay_way[0].cnt, name:'网银',itemStyle:{normal:{color:'#99D2DD'}}},
                        {value:data.pay_way[3].cnt, name:'微信',itemStyle:{normal:{color:'#1BB2D8'}}},
                        {value:data.pay_way[2].cnt, name:'其他',itemStyle:{normal:{color:'#1790CF'}}},
                        {value:data.pay_way[1].cnt, name:'支付宝',itemStyle:{normal:{color:'#1C7099'}}},
                    ]
                }
            ]
        };
        myChart3.setOption(option3);
        $(window).resize(function () {
            myChart2.resize();
            myChart3.resize();
        })
    }
})
