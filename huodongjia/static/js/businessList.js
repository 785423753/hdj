/**
 * Created by Administrator on 2015/12/21 0021.
 */
$(document).ready(function () {
    function stopEvent(){
        //取消事件冒泡
        var e=arguments.callee.caller.arguments[0]||event; //若省略此句，下面的e改为event，IE运行可以，但是其他浏览器就不兼容
        if (e && e.stopPropagation) {
            // this code is for Mozilla and Opera
            e.stopPropagation();
        } else if (window.event) {
            // this code is for IE
            window.event.cancelBubble = true;
        }
    }
    $(".title>div>input").click(function () {
        var _index=$(this).parent().index(),ul=$('.title ul')
         $(this).parent().find("ul").slideToggle(100)
         $(this).parent().find("img").slideToggle(100)
        for(var i=0;i<ul.length;i++){
            if(i!=_index){
                $(ul[i]).slideUp(100)
                $($('.title img')[i]).slideUp(100)
            }
        }
        $("#emailTakeForm").slideUp(100)
        $(".img").slideUp(100)
         stopEvent()
    })
    $("body").click(function (e) {
        if(e.target.id=='prev-img'){
        }else{
            $(".title>div>ul").slideUp(100)
            $(".title>div>img").slideUp(100)
        }
    })
    $(".hot_rec button").click(function () {
        $('.hot_rec button').eq($(this).index()).addClass("choose").siblings().removeClass("choose")
    })
    laydate.skin('danlan')
    var time=""
    var rec=""
    var start = {
        elem: '#start_time',
        event: 'focus',
        format: 'YYYY-MM-DD',
        min:laydate.now(), //设定最小日期为当前日期
        max: '2099-06-16', //最大日期
        istime: true,
        istoday: false,
        choose: function(datas){
            time=datas
            var st=datas.split("-")
            $(".day").html(st[2]);
            var industry=$(".classify>input").attr("lang")
            var city=$(".all_city>input").attr("lang")
            var data_1={date:time,recommend:rec}
            if(industry==""){
                Ajax("/business"+city+"/?date="+time+"&recommend="+rec)
            }else if(city==""){
                Ajax("/"+industry+"/?date="+time+"&recommend="+rec)
            }else{
                Ajax("/"+city+"/"+industry+"/?date="+time+"&recommend="+rec)
            }
        }
    };
    laydate(start);
    $(".email_take").click(function () {
        $("#emailTakeForm").slideToggle(100)
        $(".img").slideToggle(100)
        $("#codeImg").attr("src","/get_check_code_image/")
    })
    //推荐/热门
    $(".recommend").click(function(){
        rec=1
        var industry=$(".classify>input").attr("lang")
        var city=$(".all_city>input").attr("lang")
        var data_2={date:time,recommend:rec}
        if(industry==""){
            Ajax("/business/"+city+"/?date="+time+"&recommend="+rec)
        }else if(city==""){
            Ajax("/"+industry+"/?date="+time+"&recommend="+rec)
        }else{
            Ajax("/"+city+"/"+industry+"/?date="+time+"&recommend="+rec)
        }
    })
    $(".hot").click(function(){
        rec=""
        var industry=$(".classify>input").attr("lang")
        var city=$(".all_city>input").attr("lang")
        var data_3={date:time,recommend:rec}
        if(time==""){
            window.location.href=window.location.href;
        }else  if(industry==""){
            Ajax("/"+city+"/?date="+time+"&recommend="+rec)
        }else if(city==""){
            Ajax("/"+industry+"/?date="+time+"&recommend="+rec)
        }else{
            Ajax("/"+city+"/"+industry+"/?date="+time+"&recommend="+rec)
        }
    })
    //列表请求
    function Ajax(url){
        var all_events= $(".all_events"),pagination=$(".pagination ul")
        all_events.html("<p class='text-center'style='width: 100%'><span class='load fa fa-spinner fa-pulse fa-2x' style='line-height: 220px'></span></p>")
        $.ajax({
            type:'get',
            url :url,
            dataType : 'json',
            success  : function(data) {
                all_events.html('')
                for(var i=0;i<data.events.length;i++){
                    var img
                    if(data.events[i].event_img.length==0){
                        img="<img style='border: 1px solid #eee;' width='100%' src='http://pic.huodongjia.com/static/images/event_default.jpg' alt='" + data.events[i].event_name+ "'/>"
                    }else{
                        img="<img  width='100%' src='" + data.events[i].event_img[0].server__name + data.events[i].event_img[0].urls + "!list223139' alt='" + data.events[i].event_name+ "'/>"
                    }
                    var _html="<div class='col-sm-12 col-xs-12 meeting_list'><div class='col-sm-3 col-xs-3'><a target='_blank' rel='nofollow' href='" + data.events[i].event_url + "'>" +
                            "" + img + "</a></div><div class='col-sm-7 col-xs-7 detail' ><h3 class='meeting_name'>" +
                            "<a target='_blank'  href='" + data.events[i].event_url + "'>" + data.events[i].event_name + "</a></h3><p class='meeting_tag'></p>" +
                            "<p class='meeting_des'>概述:" + data.events[i].event_intro + "</p><p class='addr'>" +
                            "<span><a href=''><font class='m_iconfont'>&#xe609;</font>" + data.events[i].event_city_info[0].district_name + "</a></span>" +
                            "<span><font style='color: #8C8C8C;font-size: 16px;' class='m_iconfont'>&#xe608;&nbsp;</font>" + data.events[i].event_begin_time.slice(0,10) + "</span>" +
                            "</p></div><div class='col-sm-2 col-xs-2 price text-center'>" +
                            "</div></div>"
                            var fake

                    // 计算假原价
                    if(data.events[i].event_price_unit.length){
                     if(data.events[i].event_price_unit[0].fake_original_price==undefined){
                            fake=""
                     }else{
                       fake="<font style='text-decoration: line-through'>原价："+data.events[i].event_price_unit[0].Currency__sign+data.events[i].event_price_unit[0].fake_original_price+"</font>"

                     }       
                    }
                    // 

                    all_events.append(_html)
                    $($(".meeting_tag")[i]).html("")
                    for (var j = 0; j < data.events[i].event_tag_info.length; j++) {
                        var cat = "<a target='_blank' href='/tag/" + data.events[i].event_tag_info[j].id + "/'>" + data.events[i].event_tag_info[j].name + "</a>"
                        $($(".meeting_tag")[i]).append(cat)
                    }
                    if(data.events[i].event_price_type==6&&data.events[i].event_price_unit.length!=0){
                        $($(".price")[i]).html("<p><br/><span>" + data.events[i].event_price_unit[0].Currency__sign+data.events[i].event_price_unit[0].price + 
                            "</span><br/>"+fake+"<p>关注："+data.events[i].visit+"人气</p>")
                    }else  if(data.events[i].event_price_type==6&&data.events[i].event_price_unit.length==0){
                        $($(".price")[i]).html("<p style='line-height: 80px'><span>截止</span><br/>" +
                            "<p>关注："+data.events[i].visit+"人气</p>")
                    }else   if(data.events[i].event_price_type==4){
                        $($(".price")[i]).html("<p  style='line-height: 80px'><span>免费</span><br/>" +
                            "<p>关注："+data.events[i].visit+"人气</p>")
                    }else if(data.events[i].event_price_type==5||data.events[i].event_price_type==7||data.events[i].event_price_type==9){
                        $($(".price")[i]).html("<p  style='line-height: 80px'><span>待定</span><br/>" +
                            "<p>关注："+data.events[i].visit+"人气</p>")
                    }
                }

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
//验证
$("#checkcode").on('blur', function () {
    var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
    var captcha = $("#checkcode");
    $.ajax({
        url: "/verify_captcha/",
        dataType: "json",
        type: "post",
        async: false,
        data: {
            csrfmiddlewaretoken: csrf.value,
            captcha: captcha.val()
        },
        success: function (data) {
            if (data.flag == 'false') {
                captcha.attr({"data-captchaflag":false})
                $("#cap_img").click()
            }else{
                captcha.attr({"data-captchaflag":true})
            }
        }
    });
})
//邮件订阅
$(".post").click(function () {
    var csrf = document.getElementsByName('csrfmiddlewaretoken')[0],industry=$("#industry"),email=$("#email"),checkcode=$("#checkcode")
    var Data={}
    $("#emailTakeForm input").each(function (i) {
        Data[$("#emailTakeForm input")[i].name]=$("#emailTakeForm input")[i].value
    })
    Data["industry"]=$("#industry").val()
    Data["csrf"]=csrf.value
    if(industry.val()==""){
        industry.addClass("not")
    }else{
        industry.removeClass("not")
    }
    if(!email.val().match(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/)){
        email.addClass("not")
    }else{
        email.removeClass("not")
    }
    if(checkcode.attr("data-captchaflag") == 'false'){
        checkcode.addClass("not")
    }else{
        checkcode.removeClass("not")
    }
    if(industry.val()!=""&&email.val().match(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/)&&checkcode.attr("data-captchaflag") == 'true'){
        $.ajax({
            url: "/subscription/",
            type: "post",
            data: Data,
            dataType: "json",
            async: false,
            success: function (data) {
                swal("订阅成功！稍后我们将发送“关键词”相关会议至您的邮箱。")
                $("#emailTakeForm input").attr("value","")
            }
        })
    }

})
//定位
var nav_top=$(".content_right .title").offset().top
var nav_width=$(".content_right").width()
var app_down=$(".app_down").offset().top
var content_left=$(".content_left").width(),f_top
var ver=FuckInternetExplorer()
function FuckInternetExplorer() {
        var b_version = navigator.appVersion;
        var version = b_version.split(";");
        if (version.length > 1) {
            var trim_Version = parseInt(version[1].replace(/[ ]/g, "").replace(/MSIE/g, ""));
            if (trim_Version < 9) {
                return false;
            }
        }
        return true;
    }
    $(window).load(function() {
        f_top=$(document).height()-$(window).height()-$(".footer").height()+180
    });
    if(!ver) {
    }else {
        $.event.add(window, "scroll", function() {
            var sTop=document.documentElement.scrollTop+document.body.scrollTop;
            if(sTop>=nav_top){
                $(".content_right .title").css({position:"fixed",top:"0","z-index":"1000","width":nav_width})
            }else{
                $(".content_right .title").css({position:"","width":"","z-index":""})
            }
            if(sTop>=app_down&&sTop<=f_top){
                $(".fixed_div").css({position:"fixed",top:"0px","z-index":"1000","width":content_left})
                $($(".hot_theme")[0]).hide()
                $($(".hot_theme")[2]).hide()
                $(".theme").hide()
            }else{
                $(".fixed_div").css({position:"","width":"","z-index":""})
                $($(".hot_theme")[0]).show()
                $($(".hot_theme")[2]).show()
                $(".theme").show()
            }
        });
    }

    $('.carousel').carousel(500)
    $(".meeting_cat li a").each(function (i) {
        if($(".meeting_cat li a")[i].title=="it"){
            $(this).addClass("select")
        }
    })
    $(".all_city li a").each(function (i) {
        if($(".all_city li a")[i].title==""){
            $(this).addClass("select")
        }
    })
    $(".m_time li a").each(function (i) {
        if($(".m_time li a")[i].title==""){
            $(this).addClass("select")
        }
    })
    var hot_tags=$("#hot_tags a"),hot_guests=$("#hot_guests a")
    hot_tags.each(function (i) {
        var size=hot_tags[0].lang/10
        $($("#hot_tags span")[i]).addClass("w"+parseInt(hot_tags[i].lang/size))
    })
    hot_guests.each(function (i) {
        var size=hot_guests[0].lang/8
        $($("#hot_guests span")[i]).addClass("w"+parseInt(hot_guests[i].lang/size))
    })
    $("input").placeholder()

    var w=(parseInt($('.banner').css('width'))-1200)/2
    $('.next,.prev').css({width:w+'px'})
    var _Index= 1,length=parseInt($('.review_box a').length)-1
    $('.review_box').css({width:(length+1)*1200+"px"})
    $(window).resize(function(){
        w=(parseInt($('.banner').css('width'))-1200)/2
        $('.next,.prev').css({width:w+'px'})
    })
    function next(){
        _Index++
        var left=parseInt($('.review_box').css('left'))
        $('.review_box').css({
            left:"-"+_Index*1200+"px",transition:"all .5s ease"
        })
        if(_Index>=length){
            _Index=1
            setTimeout(function () {
                $('.review_box').css({
                    left:"-"+_Index*1200+"px",transition:"all 0s ease"
                })
            },500)

        }
    }
    function prev(){
        _Index--
        var left=parseInt($('.review_box').css('left'))
        $('.review_box').css({
            left:"-"+_Index*1200+"px",transition:"all .5s ease"
        })
        if(_Index<=0){
            _Index=length-1
            setTimeout(function () {
                $('.review_box').css({
                    left:"-"+_Index*1200+"px",transition:"all 0s ease"
                })
            },500)
        }
    }
    $('.next').click(function () {
        next()
    })
    $('.prev').click(function () {
        prev()
    })
    var mytime=setInterval (next,3000);
    $('.banner').hover(
        function () {
            clearInterval(mytime);
        },
        function () {
            mytime=setInterval (next,3000);
        }
    )

})
