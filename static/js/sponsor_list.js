/**
 * Created by 01 on 2015/5/8.
 */
$(".active_info_intro").each(function(){
    font_length(65,$(this))
});
$(".meeting li a").each(function(){
    font_length(27,$(this))
});
$(".meeting_title p:lt(2)").each(function(){
    font_length(12,$(this))
});
$(".meeting_title a").each(function(){
    font_length(16,$(this))
});
$(".title_a").each(function(){
    $(this).text($.trim($(this).text()));
    font_length(16,$(this))
});
$(".active_info_title a").each(function(){
    $(this).text($.trim($(this).text()));
    font_length(20,$(this))
});
$(".foot_city a").each(function(){
    $(this).text($.trim($(this).text()));
    font_length(10,$(this))
});
$(".city_names").each(function(){
    $(this).text($.trim($(this).text()));
    $(this).css({fontStyle: "inherit"});
    font_length(12,$(this))
});
$(".hot .event_link a").each(function(){
    font_length(22,$(this))
});

$(".content_right .active_message .sponsor_title").each(function(){
    $(this).text($.trim($(this).text()));
    font_length(8,$(this))
});
$(".new_sponsor ul li a").each(function(){
    $(this).text($.trim($(this).text()));
    font_length(12,$(this))
});
function login(){
    $("#myForm").submit() ;
}
function font_length(a,b){
    var maxwidth=a;
    if($(b).text().length>maxwidth){
        $(b).text($(b).text().substring(0,maxwidth));
        $(b).html($(b).html()+'...');
    }
}
var href = [];
for(var i =0;i<$('.pagination').find('li').length;i++){
    if($('.pagination').find('li')[i].firstChild.href!=undefined){
        href.push($('.pagination').find('li')[i].firstChild.href)
    }
}
function a(i,href){
    $.ajax({
        url:href[i]
    });
}
for(var i=0;i<href.length;i++){
    setTimeout('a(i,href)',3000)
}
$(".come_meeting").click(function(){
    $(".message_popup").show().css({left:($("body").width()-$(".message_popup").width())/2,top:($("body").height()-$(".message_popup").height())/2})
});


$(".clearDiv").bind('click', function () {
    $(".message_popup").hide();
    $(".message_popup input,.message_popup textarea").val("")
});
$(".captcha_btn").bind('click',function () {
    $(".address").css({border:"1px solid rgb(216, 216, 216)"});
    var dateObj,s="";
    dateObj = new Date();
    s+=dateObj.getFullYear();
    s+=dateObj.getMonth()+1;
    s+=dateObj.getDate();
    s+=dateObj.getHours();
    s+=dateObj.getMinutes();
    s+=dateObj.getSeconds();
    var set, i = 60;
    var url = "/send_check_mesage/";
    var tel = $.trim($("#tel").val());
    if (tel != "" && (/^1[3-8]+\d{9}$/).test(tel)) {
        $.get(url, {tel: tel,time:s}, function (data) {
            set = setInterval(function () {
                $(".captcha_btn").text("重发还有" + i + "秒").attr({disabled: "disabled"});
                i--;
                if (i < 0) {
                    clearInterval(set);
                    $(".captcha_btn").text("重新发送").removeAttr("disabled")
                }
            }, 1000)
        })
    } else {
        popup(0,"手机号码","请输入正确的手机号码");
        $(".address").css({border:"1px solid red"})
    }
    return false
});
$("#messageSubmit").bind('click', function () {
    var thisid=$(".thisId").val();
    var name= $.trim($("#username").val());
    var phone=$.trim($("#tel").val());
    var email=$.trim($("#email").val());
    var content=$.trim($("#content").val());
    var email_pd=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    var iphone = /^1[3-8]+\d{9}$/;
    var captcha=$.trim($("#captcha").val());
    if(captcha.length!=4){
        $("#captcha").css({border:"1px solid #ec7063"}).attr("data-captcha","false")
    }else{
        var url="/verify_tel_captcha/";
        $.post(url,{mobilphone:phone,captcha:captcha}, function (data) {
            var flag=jQuery.parseJSON(data).flag;
            if(flag==true){
                $("#captcha").css({border:"1px solid rgb(216, 216, 216)"}).attr("data-captcha","true")
            }else{
                $("#captcha").css({border:"1px solid #ec7063"}).attr("data-captcha","false");
                $("#messageSubmit").attr("data-fromFlag","false");
            }
        })
    }
    if(name.length==0){
        $("#messageSubmit").attr("data-fromFlag","false");
        $("#username").css({border:"1px solid #ec7063"});
        return false
    }else if(phone.length==0||!iphone.test(phone)){
        $("#messageSubmit").attr("data-fromFlag","false");
        $("#tel").css({border:"1px solid #ec7063"});
        return false
    } else if( email.length==0||!email_pd.test(email)) {
        $("#email").css({border: "1px solid #ec7063"});
        $("#messageSubmit").attr("data-fromFlag", "false");
        return false
    }
    else{
        $("#messageSubmit").attr("data-fromFlag","true");
        var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
        $.ajax({
            url:"/sponsor_api/claim/"+thisid+"/",
            dataType:"json",
            type:"post",
            data:{
                name:name,
                csrfmiddlewaretoken: csrf.value,
                cellphone:phone,
                email:email,
                message:content
            },
            success: function(data){
                console.log(data);
                if(data.success==1){
                    $(".message_popup").hide();
                    $(".message_popup input,.message_popup textarea").val("");
                    popup(1,"完成提交!","我们将尽快与您取得联系，审核成功后为您点亮图标。")

                }
            }
        })
    }
});
$("#username").focus(function(){
    $(this).css({
        border: "1px solid #b8b8b8"
    })
});
$("#tel").focus(function(){
    $(this).css({
        border: "1px solid #b8b8b8"
    })
});
$("#email").focus(function(){
    $(this).css({
        border: "1px solid #b8b8b8"
    })
});

