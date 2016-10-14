/**
 * Created by Administrator on 2016/1/19 0019.
 */
$("#captcha").attr("data-captcha","false");
$(".ren").click(function(){
    $(".message_popup").show(100)
    $(".message_popup input[type='text']").attr('value','')
    $(".message_popup input[type='text']").css({border:'1px solid #b8b8b8'})
    $(".thisId").attr("value",$(this).attr('lang'))
});
$(".clearDiv").click(function(){
    $(".message_popup").hide(100)
});
$("#captcha").on('blur', function () {
    var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
    var captcha = $("#captcha").val();
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
                $("#captcha").attr({"data-captcha":false})
                $("#cap_img").click()
            }else{
                $("#captcha").attr({"data-captcha":true})
            }
        }
    });
})

$("#messageSubmit").on('click', function () {
    var thisid=$(".thisId").val();
    var name= $.trim($("#username").val());
    var phone=$.trim($("#tel").val());
    var email=$.trim($("#email").val());
    var content=$.trim($("#content").val());
    var email_pd=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    var iphone = /^1[3-8]+\d{9}$/;
    var captcha=$.trim($("#captcha").val());

    if($("#captcha").attr("data-captcha")=='false'){
        $("#messageSubmit").attr("data-fromFlag","false");
        $("#captcha").css({border:"1px solid #ec7063"});
        return false
    }
   else if(name.length==0){
        $("#messageSubmit").attr("data-fromFlag","false");
        $("#username").css({border:"1px solid #ec7063"});
        return false
    }
    else if(phone.length==0||!iphone.test(phone)){
        $("#username").css({border:"1px solid #b8b8b8"});
        $("#messageSubmit").attr("data-fromFlag","false");
        $("#tel").css({border:"1px solid #ec7063"});
        return false
    }
    else if( email.length==0||!email_pd.test(email)) {
        $("#phone").css({border:"1px solid #b8b8b8"});
        $("#email").css({border: "1px solid #ec7063"});
        $("#messageSubmit").attr("data-fromFlag", "false");
        return false
    }
    else{
        $("#email").css({border:"1px solid #b8b8b8"});
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
                console.log(data)
                if(data.code==0){
                    $(".message_popup").hide();
                    $(".message_popup input,.message_popup textarea").val("");
                    popup(1,"完成提交!","我们将尽快与您取得联系，审核成功后为您点亮图标。")
                }
            }
        })
    }
});
$(document).click(function(event) { 
    if(!$(event.target).closest('.new_popup').length && !$(event.target).is('.new_popup')) {
        if($('.new_popup').is(":visible")) {
            $('.new_popup').hide()
        }
    }        
});
$("#post").click(function () {
    $("#searchForm").submit()
})