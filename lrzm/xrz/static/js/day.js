/**
 * Created by Administrator on 2016/6/21 0021.
 */
$('.select button').click(function () {
    article()
})
article()
function article(){
    var start_time=$('#start_time').val(),end_time=$('#end_time').val()
    var myChart1= echarts.init(document.getElementById('collection'),'dark');
    myChart1.showLoading();
    $.get('/everydaytopic/?json=1',{start_time:start_time,end_time:end_time},function(data){
        var data_x1=[],data_visit=[],data_like=[]

        for(var i in data.topic_date_like_comment_cnt){
            data_x1.push(data.topic_date_like_comment_cnt[i].create_time.split('-')[1]+'/'+data.topic_date_like_comment_cnt[i].create_time.split('-')[2])
            data_visit.push(data.topic_date_like_comment_cnt[i].topic_comment_cnt)
            data_like.push(data.topic_date_like_comment_cnt[i].topic_like_cnt)
        }
        $('.attention').html('')
        for(var i in data.topic_hot_top10){
          $('.attention').append('<li>'+data.topic_hot_top10[i].topic+'</li>')
        }
        myChart1.setOption({
            grid: {
                left: '3%',
                right: '3%',
                bottom: '12%',
                top:'10%',
            },
            tooltip : {
                trigger: 'axis'
            },
            calculable : true,
            legend: {
                data:['留言量','收藏量'],
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
                    name:'收藏量',
                    type:'line',
                    symbol:'emptyCircle',
                    symbolSize:5,
                    itemStyle: {normal: {
                        color:'#F7B1AB',
                    }},
                    data:data_like
                },
                {
                    name:'留言量',
                    type:'line',
                    symbol:'emptyCircle',
                    symbolSize:5,
                    itemStyle: {normal: {
                        color:'#E52C3C',
                    }},
                    data:data_visit
                }
            ]
        });
        myChart1.hideLoading();
        $(window).resize(function () {
            myChart1.resize();
        })
    })
}



