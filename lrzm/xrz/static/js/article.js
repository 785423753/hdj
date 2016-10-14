/**
 * Created by Administrator on 2016/6/21 0021.
 */
$('.select button').click(function () {
    article()
})
article()
function article(){
    var start_time=$('#start_time').val(),end_time=$('#end_time').val(),city_id=$('#city_id').val()
    var myChart1= echarts.init(document.getElementById('article'),'dark');
    var myChart2= echarts.init(document.getElementById('collection'),'dark');
    myChart1.showLoading();
    myChart2.showLoading();
    $.get('/articlevision/?json=1',{city_id:city_id,start_time:start_time,end_time:end_time},function(data){
        var data_x1=[],data_x2=[],data_visit=[],data_like=[],data_cnt=[],data_self=[]
        for(var i in data.date_visit_like_cnt){
            data_x2.push(data.date_visit_like_cnt[i].create_time.split('-')[1]+'/'+data.date_visit_like_cnt[i].create_time.split('-')[2])
            data_visit.push(data.date_visit_like_cnt[i].article_visit_cnt)
            data_like.push(data.date_visit_like_cnt[i].article_like_cnt)
        }
        for(var i in data.article_date_org_reprint_cnt){
            data_x1.push(data.article_date_org_reprint_cnt[i].create_time.split('-')[1]+'/'+data.article_date_org_reprint_cnt[i].create_time.split('-')[2])
            data_cnt.push(data.article_date_org_reprint_cnt[i].article_reprint_cnt)
            data_self.push(data.article_date_org_reprint_cnt[i].article_org_cnt)
        }
        $('table').html('<tr><td></td><td>文章名称</td><td>所属城市</td><td>浏览次数</td><td>收藏次数</td></tr>')
        for(var i in data.article_hot_top10){
            var j=parseInt(i)+1
            $('table').append("<tr><td><span>"+j+"</span></td><td>"+data.article_hot_top10[i].title+"</td><td>"+data.article_hot_top10[i].city_name+"</td><td>"+data.article_hot_top10[i].article_visit_cnt+"</td><td>"+data.article_hot_top10[i].article_like_cnt+"</td></tr>")
        }
        $($('table').find('span')[0]).css({background:'#E75453'})
        $($('table').find('span')[1]).css({background:'#E2622A'})
        $($('table').find('span')[2]).css({background:'#E5A14F'})
        myChart1.setOption({
            grid: {
                left: '5%',
                right: '5%',
                bottom: '12%',
                top:'10%',
            },
            tooltip : {
                trigger: 'axis'
            },
            calculable : true,
            legend: {
                data:['原创','转载'],
                x:'right'
            },
            xAxis : [
                {
                    type : 'category',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                    data :data_x1
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name : '数量',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                },
            ],
            series : [
                {
                    name:'原创',
                    type:'bar',
                    barCategoryGap: '50%',
                    itemStyle: {normal: {
                        color:'#1790CF',
                    }},
                    data:data_self
                },
                {
                    name:'转载',
                    type:'bar',
                    barCategoryGap: '50%',
                    itemStyle: {normal: {
                        color:'#1BB2D8',
                    }},
                    data:data_cnt
                }
            ]
        });
        myChart2.setOption({
            grid: {
                left: '5%',
                right: '5%',
                bottom: '12%',
                top:'10%',
            },
            tooltip : {
                trigger: 'axis'
            },
            calculable : true,
            legend: {
                data:['浏览量','收藏量'],
                x:'right'
            },
            xAxis : [
                {
                    type : 'category',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                    data :data_x2
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name : '数量',
                    splitLine : {
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                },
            ],
            series : [
                {
                    name:'浏览量',
                    type:'line',
                    symbol:'emptyCircle',
                    symbolSize:5,
                    itemStyle: {normal: {
                        color:'#1790CF',
                    }},
                    data:data_visit
                },
                {
                    name:'收藏量',
                    type:'line',
                    symbol:'emptyCircle',
                    symbolSize:5,
                    itemStyle: {normal: {
                        color:'#1cc9f2',
                    }},
                    data:data_like
                }
            ]
        });
        myChart1.hideLoading();
        myChart2.hideLoading();
        $(window).resize(function () {
            myChart1.resize();
            myChart2.resize();
        })
    })
}

