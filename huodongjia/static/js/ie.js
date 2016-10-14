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
    //二维码
    var text=window.location.href
    if ((navigator.userAgent.indexOf('MSIE') >= 0)
        && (navigator.userAgent.indexOf('Opera') < 0)){
        $('.qrcode').qrcode({width: 145, height: 145, text:text,render:"table"});
    }else{
        $('.qrcode').qrcode({width: 145, height: 145, text:text,render:"canvas"});
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
        data:{eventid:$(this).data("id")},
        success: function (data) {
            if(data.code == "1"){
                swal("收藏成功！")
            }else if(data.code == "2"){
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
$($(".picture")[0]).addClass("e_show")
$($(".event_names span")[0]).addClass("text")
$(".event_names span").click(function () {
    $(".event_names span").show()
    $(this).hide()
    var i=$(this).data("value")
    console.log($(this).data("value"))
    if($($(".picture")[i]).css("display")!="block"){
        $(".e_show").fadeOut(200)
        $(".picture").removeClass("e_show")
        $($(".picture")[i]).fadeIn(200).addClass("e_show")
    }
})
$(".apply").click(function () {
    if($(this).text()!="立即报名"){
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
    if(parseInt(up_top)>=-94){
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
        $(".pic").removeClass("active").fadeOut(200)
        $($(".pic")[i]).fadeIn(200).addClass("active")
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