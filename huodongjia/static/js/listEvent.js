/**
 * Created by Administrator on 2017/1/7 0007.
 */
$('.dc_vd a').click(function () {
    if($(this).index()==0){
        $('.line').css({left:0})
    }else {
        $('.line').css({left:'50%'})
    }
    $('.dc_vd a').eq($(this).index()).addClass('active').siblings().removeClass('active')
    $('.dx ul').eq($(this).index()).addClass('active').siblings().removeClass('active')
})
var start_day = {
    elem: '#time',
    event: 'focus',
    format: 'YYYY-MM-DD',
    min:laydate.now(), //设定最小日期为当前日期
    max: '2099-06-16', //最大日期
    istime: false,
    istoday: false,
    choose: function(datas){
        $('.date').text(datas)
        $('.sj a').eq($('.date_time').index()).addClass('select').siblings().removeClass('select')

        var industry=$("#industry").val()
        var city=$("#city").val()
        if(industry==""){
            Ajax("/business"+city+"/?date="+datas)
        }else if(city==""){
            Ajax("/"+industry+"/?date="+datas)
        }else{
            Ajax("/"+city+"/"+industry+"/?date="+datas)
        }

    }
};
laydate.skin('danlan')
laydate(start_day);
function Ajax(url){
    var all_events= $(".all_events"),pagination=$(".pagination ul"),_html=''
    all_events.html('<p style="text-align: center"><img class="loading" width="40" src="http://pic.huodongjia.com/static/images/loading.png" alt=""></p>')
    $.ajax({
        type:'get',
        url :url,
        dataType : 'json',
        success  : function(data) {
            all_events.html('')
            var event=data.events
            for(i in event){
                var img_url="http://pic.huodongjia.com/static/images/event_default.jpg",tag='',price=''
                if(event[i].event_img[0].urls){
                    img_url=event[i].event_img[0].server__name+event[i].event_img[0].urls
                }
                for(j in event[i].event_tag_info){
                    tag+='#<a target="_blank" href="/tag/ '+event[i].event_tag_info[j].id+'/"> '+event[i].event_tag_info[j].name+'</a>'
                }
                if(event[i].event_price_type==6){
                    if(event[i].event_price_unit.length==0||!event[i].event_price_valid){
                        price='<span class="pc">报名截止</span>'
                    }else{
                        price='<span class="pc">'+event[i].event_price_unit[0].Currency__sign+event[i].event_price_unit[0].price+'起</span>'
                    }
                }else if(event[i].event_price_type==4){
                    price='<span class="pc">免费</span>'
                }else if(event[i].event_price_type==5||event[i].event_price_type==7){
                    price='<span class="pc">待定</span>'
                }
                _html+='<div class="col-sm-4 eventList" data-href="'+event[i].event_url+'"> <div class="into">' +
                    '<a href="'+event[i].event_url+'" target="_blank"> <img width="292" height="182" src="'+img_url+'" alt="'+event[i].event_name+'"> </a>'+
                    '<h3><a href="'+event[i].event_url+'" target="_blank">'+event[i].event_name+'</a></h3>' +
                    '<p class="meeting_tag">'+tag+'</p>' +
                    '<p class="address"> <span><a href="/'+event[i].event_city_info[0].title+'/" target="_blank"><img  src="http://pic.huodongjia.com/static/images/dw.png">'+event[i].event_city_info[0].district_name+'</a></span>'+price+'</p>' +
                    '<p class="address"> <span><img src="http://pic.huodongjia.com/static/images/times.png">'+event[i].event_begin_time+'</span>' +
                    '<span style="float: right">'+event[i].visit+'人正在关注</span> </p> </div> </div>'
            }
            all_events.html(_html)


            pagination.html("")
            if(data.firstPage!="false"){
                pagination.append("<li style='margin-right:5px' alt='"+data.firstPage+"' ><a >首页</a></li>")
            }
            if(data.prePage!="false"){
                pagination.append("<li style='margin-right:5px' alt='"+data.prePage+"'><a>上一页</a></li>")
            }
            if(data.pageList.length>1){
                for(var i=0;i<data.pageList.length;i++){

                    if(data.pageList[i].flag=="true"){
                        pagination.append("<li style='margin-right:5px' class='page_active' alt='"+data.pageList[i].pageurl+"'><a>"+data.pageList[i].page+"</a></li>")
                    }else{
                        pagination.append("<li style='margin-right:5px' alt='"+data.pageList[i].pageurl+"'><a>"+data.pageList[i].page+"</a></li>")
                    }
                }
            }
            if(data.nextPage!="false"){
                pagination.append("<li style='margin-right:5px' alt='"+data.nextPage+"'><a>下一页</a></li>")
            }
            $(".pagination ul li").click(function () {
                Ajax($(this).attr("alt"))
                $('html, body').animate({scrollTop: 0},0);
            })
        }
    })
}

$('.m_caret').click(function () {
    if($(this).text()=='更多'){
        $(this).parent().css({height:'auto'})
        $(this).find('span').text('收起')
    }else{
        $(this).parent().css({height:'25px'})
        $(this).find('span').text('更多')
    }
    $('.all_events').css({marginTop:($('.condition').height()+20)+'px'})
})
$('.email_order button').click(function () {
    var csrf = document.getElementsByName('csrfmiddlewaretoken')[0],industry=$("#industry"),email=$("#email")
    if(!email.val().match(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/)){
        email.css({borderColor:'red'})
    }else{
        email.css({borderColor:'#989697'})
        $.ajax({
            url: "/subscription/",
            type: "post",
            data: {
                industry:$("#cat").val(),
                csrf:csrf.value,
                email:email.val()
            },
            dataType: "json",
            async: false,
            success: function (data) {
                swal("订阅成功！稍后我们将发送“关键词”相关会议至您的邮箱。")
                email.val('')
            },
            error:function () {
                swal("订阅失败！")
            }
        })
    }
})