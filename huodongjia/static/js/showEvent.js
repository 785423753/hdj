/**
 * Created by Administrator on 2015/12/25 0025.
 */
$(document).ready(function () {
    $($(".ticket")[0]).addClass("ticket_choose")
    $($(".ticket")[0]).find("img").show()
    var limit_peo=$('.ticket:first').data('limit')
    if(!limit_peo) {limit_peo=1}
    $('#number').val(limit_peo),$("input[name='amount']").val(limit_peo)
    $('.jifen').html(parseInt(parseInt($('.ticket:first').data('price'))*0.05)*limit_peo)
    $(".ticket").each(function (i) {
        $($(".ticket")[i]).click(function () {
            var price=$(this).data('price'),sign=$(this).data('sign'),note=$(this).data('note'), limit=$(this).data('limit')
            var score=parseInt(parseInt(price)*0.05),ticket_name=$(this).text()
            if(!limit) {limit=1}
            $('.jifen').html(score*limit),$('.explain').html(note),$('#number').val(limit),$('.price').html(sign+price)
            if(note=='None'){
                $('.return').addClass('hide')
            }else{
                $('.return').removeClass('hide')
            }
            //表单
            $("input[name='price']").val(price),$("input[name='property']").val(ticket_name)
            $("input[name='Currency__sign']").val(sign),$("input[name='amount']").val(limit)

            $(".ticket").removeClass("ticket_choose")
            $(".ticket img").hide()
            $(this).addClass("ticket_choose")
            $(this).find("img").show()
        })
    })
    //门票类型
    //票数改变
    $(".add").click(function () {
        var jf=parseInt(parseInt($('.ticket_choose').data('price'))*0.05)
        $("#number").val(parseInt($("#number").val())+1)
        $("input[name='amount']").val($("#number").val())
        $(".jifen").html(jf*$("#number").val())
    })
    $(".sub").click(function () {
        var jf=parseInt(parseInt($('.ticket_choose').data('price'))*0.05)
        var num=$("#number").val(),limit=$('.ticket_choose').data('limit')
        if(!limit){limit=1}
        if(num>limit){
            $("#number").val(parseInt($("#number").val())-1)
            $("input[name='amount']").val($("#number").val())
            $(".jifen").html(jf*$("#number").val())
        }
    })
    $("#number").change(function () {
        var num=$("#number").val(),limit=$('.ticket_choose').data('limit')
        var jf=parseInt(parseInt($('.ticket_choose').data('price'))*0.05)
        if(!limit){limit=1}
        if(!num.match(/^[1-9]\d*$/)||num<limit){
            $("#number").val(limit)
            $("input[name='amount']").val($("#number").val())
            $(".jifen").html(jf*$("#number").val())
        }else{
            $("input[name='amount']").val($("#number").val())
            $(".jifen").html(jf*$("#number").val())
        }
    })
    //票数改变
    //导航
    var m_str=new Array()
    var top=$(".event_nav").offset().top
    var f_top
    //$($(".event_left .title li span")[0]).css({background:"#54A1EF",color:"#fff"})
    $(window).load(function() {
        $(".event_part").each(function (i) {
            var m_top=$(this).offset().top- $(".title").height()
            m_str.push(m_top)
        })
        f_top=$(document).height()-$(window).height()-$(".footer").height()
    });
    $.event.add(window, "scroll", function() {
        var sTop=document.documentElement.scrollTop+document.body.scrollTop;
        for(var j=0;j<m_str.length;j++){
            if(sTop<m_str[0]){
                $(".event_left .title li span").css({background:"",color:""})
                $($(".event_left .title li span")[0]).css({background:"#54A1EF",color:"#fff"})
            }
           if(j<m_str.length-1){
                    if(sTop>=m_str[j]&&sTop<m_str[j+1]){
                        $(".event_left .title li span").css({background:"",color:""})
                        $($(".event_left .title li span")[j]).css({background:"#54A1EF",color:"#fff"})
                   }
           }else{
               if(sTop>=m_str[j]){
                   $(".event_left .title li span").css({background:"",color:""})
                   $($(".event_left .title li span")[j]).css({background:"#54A1EF",color:"#fff"})
               }
           }
        }
        if(sTop>=top){
            $(".event_left .title").css({position:"fixed",top:"0",width:"900px",boxShadow:"0 2px 7px -3px rgba(144, 144, 144, 0.65)"})
            $(".app_down").fadeOut(100)
            $(".apply").fadeIn(100)
            $(".invit").fadeIn(100)
        }else{
            $(".event_left .title").css({position:"",width:"100%",boxShadow:"none"})
            $(".apply").fadeOut(100)
            $(".app_down").fadeIn(100)
            $(".invit").fadeOut(100)
        }
    });
    $(".event_left .title li span").on('click', function () {
        if($(".title").css("position")=="fixed"){
            var s = $("#" + $(this).data("plne")).offset().top- $(".title").height();
        }else{
            var s = $("#" + $(this).data("plne")).offset().top-50- $(".title").height();
        }
        $("html,body").animate({scrollTop: s})

    })


    //二维码
    var this_url=window.location.href
    if ((navigator.userAgent.indexOf('MSIE') >= 0)
        && (navigator.userAgent.indexOf('Opera') < 0)){
        $('.qrcode').qrcode({width: 100, height: 100, text:this_url + "?uId=" + $(this).attr("data-userId"),render:"table"});
    }else{
        $('.qrcode').qrcode({width: 100, height: 100, text:this_url + "?uId=" + $(this).attr("data-userId"),render:"canvas"});
    }
//验证
$("#code").on('blur', function () {
        var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
        var captcha = $("#code").val();
        $.ajax({
            url: "/verify_captcha/",
            dataType: "json",
            type: "post",
            async: false,
            data: {
                csrfmiddlewaretoken: csrf.value,
                captcha: captcha
            },
            success: function (data) {
                if (data.flag == 'false') {
                    $("#code").attr({"data-captchaflag":false})
                    $("#cap_img").click()
                }else{
                    $("#code").attr({"data-captchaflag":true})
                }
            }
        });
    })
    //留言
$(".analytic").click(function () {
        var time=""
        var inputText = $('.emotion').val();
        if($("#code").attr("data-captchaflag")=="false"){
            $("#code").css({"border":"1px solid red"})
        }else{
            $("#code").css({"border":"1px solid #eee"})
            if(inputText!=""){
                $('.emotion').attr("value","")
                $.ajax({
                    url: "/submitcomment/",
                    type: "post",
                    data:{
                        eventid:$("#event_id").val(),
                        message:inputText
                    },
                    dataType: "json",
                    async: false,
                    success: function(data) {
                        if(data.code==1){
                            swal(data.msg);
                        }else if(data.code==0){
                            swal(data.msg);
                            $('.emotion').attr("value","")
                            $(".confirm").click(function () {
                                window.location.href=window.location.href
                            })
                        }
                    },
                })
            }
        }
    })
//字数限制
$(function(){
        //先选出 textarea 和 统计字数 dom 节点
        var textArea = $(".emotion"),
            word = $("#info");
        //调用
        statInputNum(textArea,word);
    });
function statInputNum(textArea,numItem) {
        var max = numItem.text()
        textArea[0].setAttribute("maxlength", max);
        textArea.on('input propertychange', function () {
            numItem.text(max - $(this).val().length);
        });
    }

//定位
var right_child=$(".right_child>div:last-child").offset().top
if($(".e_hide").length<=0){
        right_child=$(".right_child").offset().top
    }
var child_width=$(".event_right").width()
$.event.add(window, "scroll", function() {
    var sTop=document.documentElement.scrollTop+document.body.scrollTop;
    if(sTop>=right_child&&sTop<=f_top){
        $(".right_child").css({position:"fixed",top:"0px","z-index":"1000","width":child_width})
        $(".e_hide").fadeOut(1)
    }else{
        $(".right_child").css({position:"","width":'',"top":''})
        $(".e_hide").fadeIn()
    }
});
    $("#apply").click(function () {
        $("form[name=signup_form]").submit()
    })
})
$(".app_down").hover(
    function () {
        $(".app").show(100)
    },
    function () {
        $(".app").hide()
    }
)
//积分
$(".q_font").mouseover(function () {
    $(".change").fadeIn(100)
})
$("body").click(function(){
    $(".change").fadeOut(100)
})
//发送邮箱
$("#emai_code").on('blur', function () {
    var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
    var captcha = $("#emai_code").val();
    $.ajax({
        url: "/verify_captcha/",
        dataType: "json",
        type: "post",
        async: false,
        data: {
            csrfmiddlewaretoken: csrf.value,
            captcha: captcha,
            position:"email"
        },
        success: function (data) {
            if (data.flag == 'false') {
                $("#emai_code").attr({"data-captchaflag":false})
                $("#capImg").click()
            }else{
                $("#emai_code").attr({"data-captchaflag":true})
            }
        }
    });
})
$("#exampleInputAmount").blur(function(){
    $('#emai_code').show()
    $('#capImg').show().attr('src','/get_check_code_image/?position=email')
    $(".send_email").click(function () {
        if(!$("#exampleInputAmount").val().match(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/)){
            $("#exampleInputAmount").css({"border":"1px solid red"})
        } else if($("#emai_code").attr("data-captchaflag")=="false"){
            $("#exampleInputAmount").css({"border":"1px solid #BDC4CB"})
            $("#emai_code").css({"border":"1px solid red"})
        }
        else{
            $("#emai_code").css({"border":"1px solid #BDC4CB"})
            $.ajax({
                url: "/sendemail/",
                dataType: "json",
                type: "get",
                async: false,
                data: {
                    email:$("#exampleInputAmount").val(),
                    eventid:$("#event_id").val()
                },
                success: function (data) {
                    if(data.code==1){
                        swal("发送成功！");
                        $(".input-group input").val("")
                        $("#capImg").click()
                    }else{
                        swal("发送失败！");
                    }
                }
            })
        }
    })
})

//发送邮箱
//收藏
$(".collect").click(function () {
    $("#login").fadeIn(100)
})
$(".close").click(function () {
    $("#login").fadeOut(100)
    $(".bg").fadeOut(100)
})
$(".collection").on('click', function () {
    var $this=$(this)
    $.ajax({
        url:"/usercenter/collect/",
        type:"get",
        dataType:'json',
        data:{eventid:$(this).attr("id")},
        success: function (data) {
            if(data.code == 1){
              swal("收藏成功！")
            }else if(data.code == 2){
                swal("您已收藏该会议")
            }
            $('.collection').css({color:'#B7B5B5',borderColor:'#B7B5B5'})
        }
    })
})
//收藏
var e_name=$(".event_price h1").text()
$($(".meeting_content")[0]).find("p").find("img").attr("alt",e_name)
$($(".meeting_content")[1]).find("p").find("img").attr("alt",e_name+"日程安排")
//地图
function Map(addr){
    $(".allmap").show()
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);
    map.enableScrollWheelZoom(true);
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(addr, function(point){
        if (point) {
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMap.Marker(point));
        }
    }, "北京市");
}
$(".allmap .fa-remove").click(function () {
    $(".allmap").hide()
})
//地图
//推荐会议
$($(".picture")[0]).addClass("e_show")
$($(".event_names span")[0]).addClass("text")
$(".event_names span").click(function () {
    $(".event_names span").show()
    $(this).hide()
    var i=$(this).data("value")
    if($($(".picture")[i]).css("display")!="block"){
        $(".e_show").fadeOut(0)
        $(".picture").removeClass("e_show")
        $($(".picture")[i]).fadeIn(200).addClass("e_show")
    }
})
//推荐会议
$(".apply").click(function () {
    if($(this).text()!="参会报名"){
        $("#apply").click()
    }
    $('html, body').animate({scrollTop: 0},500);
})
//精彩回顾
if($(".all_img li").length<=4){
    $(".down").hide()
}
$(".down").click(function () {
    var up_top=$(".all_img").css("marginTop")
    var max_top=parseInt($(".all_img li").length-5)*94
    if(parseInt(up_top)<=-max_top){
        $(this).hide()
    }
    if(parseInt(up_top)>-max_top-94){
        $(".all_img").animate({
            marginTop:parseInt(up_top)-94+"px"
        },200)
        $(".up").show()
    }
})
$(".up").click(function () {
    var up_top=$(".all_img").css("marginTop")
    if(parseInt(up_top)>=-94) {
        $(this).hide()
    }
    if(parseInt(up_top)<0){
        $(".all_img").animate({
            marginTop:parseInt(up_top)+94+"px"
        },200)
        $(".down").show()
    }
})
$(".all_img li").click(function (){
    var j=$(".active").index()
    var i=$(this).index()
    if(i!=j){
        $(this).append($(".check"))
        $(".pic").removeClass("active").fadeOut(0)
        $($(".pic")[i]).fadeIn(200).addClass("active")
    }
})

//精彩回顾
