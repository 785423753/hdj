/**
 * Created by Administrator on 2015/12/25 0025.
 */
$(document).ready(function () {
    var ret= $(".return_money").text()
    var jf=$(".jifen").text()
    $($(".ticket")[0]).addClass("ticket_choose")
    $($(".ticket")[0]).find("img").show()
    //门票类型
    if($($(".ticket")[0]).data("price")>=1500){
        $(".return_money").html(($($(".ticket")[0]).data("price")*0.05).toFixed(2))
        $("input[name='return_cash']").attr("value",($($(".ticket")[0]).data("price")*0.05).toFixed(2))
    }else{
        $(".return_money").html("0.00")
    }
    $(".ticket").each(function (i) {
        $($(".ticket")[i]).click(function () {
            $(".ticket").removeClass("ticket_choose")
            $(".ticket img").hide()
            $(this).addClass("ticket_choose")
            $(this).find("img").show()
            $("#number").attr("value",1)
            var price=$(this).data("price")
            var exp=$(this).data("note")
            var sign=$(this).data("sign")
            var re_money=(price*0.05).toFixed(2)
            $(".price").html(sign+price)
            $(".explain").html(exp)
            $(".jifen").html(parseInt(price*0.05))
            jf=parseInt(price*0.05)
            if(price>=1500){
                $(".return_money").html(re_money)
                ret=re_money
                $("input[name='return_cash']").attr("value",re_money)
            }else{
                ret=0
                $(".return_money").html("0.00")
                $("input[name='return_cash']").attr("value",0)
            }
            $("input[name='amount']").attr("value",$("#number").val())
            $("input[name='price']").attr("value",price)
            $("input[name='property']").attr("value",$(this).text())
        })
    })
    //票数改变
    $(".add").click(function () {
        var num=$("#number").val()
        $("#number").attr("value",parseInt(num)+1)
        $("input[name='amount']").attr("value",$("#number").val())
        $(".return_money").html((ret*$("#number").val()).toFixed(2))
        $(".jifen").html(jf*$("#number").val())
        $("input[name='return_cash']").attr("value",(ret*$("#number").val()).toFixed(2))
    })
    $(".sub").click(function () {
        var num=$("#number").val()
        if(num>1){
            $("#number").attr("value",parseInt(num)-1)
            $("input[name='amount']").attr("value",$("#number").val())
            $(".return_money").html((ret*$("#number").val()).toFixed(2))
            $(".jifen").html(jf*$("#number").val())
            $("input[name='return_cash']").attr("value",(ret*$("#number").val()).toFixed(2))
        }
    })
    $("#number").change(function () {
        var num=$("#number").val()
        if(!num.match(/^[1-9]\d*$/)){
            $("#number").val("1")
        }
        if(num<1){
            $("#number").val(Math.abs(num))
            $("input[name='amount']").attr("value",$("#number").val())
            $(".jifen").html(jf*$("#number").val())
            if(Math.abs(num)==0){
                $("#number").val("1")
                $("input[name='amount']").attr("value",$("#number").val())
                $(".jifen").html(jf*$("#number").val())
            }
        }else{
            $("input[name='amount']").attr("value",$("#number").val())
            $(".jifen").html(jf*$("#number").val())
        }
    })
    //导航
    var m_str=new Array()
    //var count=$(".event_left .title li").length
    //var width=$(".event_left .title").width()
    //$(".event_left .title li").css({width:parseFloat(1/count)*width+"px"})
    var top=$(".event_left .title").offset().top
    var f_top
    $(window).load(function() {
        $(".meetingBgs_name").each(function (i) {
            var m_top=$($(".meetingBgs")[i]).offset().top- $(".title").height()-60
            m_str.push(m_top)
        })
        f_top=$(document).height()-$(window).height()-$(".footer").height()
    });
    $.event.add(window, "scroll", function() {
        var sTop=document.documentElement.scrollTop+document.body.scrollTop;
        for(var j=0;j<m_str.length;j++){
            if(sTop<m_str[0]){
                $(".event_left .title li span").css({background:""})
            }
           if(j<m_str.length-1){
                    if(sTop>=m_str[j]&&sTop<m_str[j+1]){
                        $(".event_left .title li span").css({background:""})
                        $($(".event_left .title li span")[j]).css({background:"#0167B1"})
                   }
           }else{
               if(sTop>=m_str[j]){
                   $(".event_left .title li span").css({background:""})
                   $($(".event_left .title li span")[j]).css({background:"#0167B1"})
               }
           }
        }
        if(sTop>=top){
            $(".event_left .title").css({position:"fixed",top:"0",width:"900px"})
        }else{
            $(".event_left .title").css({position:"",width:"100%"})
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
    //往届精彩
    if($(".carousel_right .carousel-indicators li").length>4){
        $(".img_down").show()
    }
    $(".carousel_right ol li").each(function (i) {
        $($(".carousel_right ol li")[i]).click(function () {
            $(".carousel_right ol li").removeClass("active")
            $(this).addClass("active")
        })
    })
    $(".img_down").click(function () {
        var length=$(".carousel_right .carousel-indicators li").length
        var top=$(".carousel-indicators").css("marginTop")
        if(parseInt(top)>-(length-4)*95){
            $(".img_up").show()
            $(".carousel-indicators").animate({marginTop:parseInt(top)-95+"px"})
        }else{
            $(".img_down").hide()
        }
    })
    $(".img_up").click(function () {
        var length=$(".carousel_right .carousel-indicators li").length
        var top=$(".carousel-indicators").css("marginTop")
        if(parseInt(top)<0){
            $(".img_down").show()
            $(".carousel-indicators").animate({marginTop:parseInt(top)+95+"px"},500)
        }else{
            $(".img_up").hide()
        }
    })

    //二维码
    var this_url=window.location.href                                         
    if ((navigator.userAgent.indexOf('MSIE') >= 0)                            
        && (navigator.userAgent.indexOf('Opera') < 0)){                       
        $('.qrcode').qrcode({width: 145, height: 145, text:this_url + "?uId=" + $(this).attr("data-userId"),render:"table"});
        }else{                                                                    
        $('.qrcode').qrcode({width: 145, height: 145, text:this_url + "?uId=" + $(this).attr("data-userId"),render:"canvas"});
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
$(function() {
    $(".emotion").keyup(check);
});
function check() {
    var str = $(".emotion").val();
    var len = strlen(str);
    var info = 120 - len;
    info = info + "";
    if (info.indexOf('.') > 0)
        info = info.substring(0, info.indexOf('.'));
    if (len <= 120) {
        $("#info").html(info);
    } else {
        $(".emotion").attr("disable","disable")
    }
}
function trim(str) {
    return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
}
function strlen(str) {
    var str = trim(str);
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        len += str.charCodeAt(i) > 0 && str.charCodeAt(i) < 255 ? 0.5 : 1;
    }
    return len;
}
//定位
var right_child=$(".weixin_share").offset().top
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
            captcha: captcha
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
$(".send_email").click(function () {
    if(!$("#exampleInputAmount").val().match(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/)){
        $("#exampleInputAmount").css({"border":"1px solid red"})
    }else if($("#emai_code").attr("data-captchaflag")=="false"){
        $("#exampleInputAmount").css({"border":"1px solid #3391E8"})
        $("#emai_code").css({"border":"1px solid red"})
    }else{
        $("#emai_code").css({"border":"1px solid #3391E8"})
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
//收藏
$(".collect").click(function () {
    $("#login").fadeIn(100)
})
$(".close").click(function () {
    $("#login").fadeOut(100)
})
$(".collection").one('click', function () {
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
        }
    })
})
var e_name=$(".event_price h1").text()
$($(".meeting_content")[0]).find("p").find("img").attr("alt",e_name)
$($(".meeting_content")[1]).find("p").find("img").attr("alt",e_name+"日程安排")
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


