//发送验证码
$(".TestGetCode").on('click',function () {
    $("#cap").show();
    if ($(this).attr("disabled")!="disabled") {
        var dateObj,s="";
        dateObj = new Date();
        s+=dateObj.getFullYear();
        s+=dateObj.getMonth()+1;
        s+=dateObj.getDate();
        s+=dateObj.getHours();
        s+=dateObj.getMinutes();
        s+=dateObj.getSeconds();
        var set, i = 300;
        var url = "/send_check_mesage/";
        var tel = $.trim($("#mobilphone").val());
        if (tel != "" && (/^1[3-8]+\d{9}$/).test(tel)) {
            $.get(url, {"tel": tel,"time":s}, function (data) {
                set = setInterval(function () {
                    $(".TestGetCode").text(i + "秒后重发");
                    $(".TestGetCode").attr({disabled: "disabled"});
                    $(".TestGetCode").css({backgroundColor:"#a8a8a8"})
                    i--;
                    if (i < 0) {
                        clearInterval(set);
                        $(".TestGetCode").text("重新发送");
                        $(".TestGetCode").removeAttr("disabled");
                        $(".TestGetCode").css({backgroundColor:"#646464"})
                    }
                }, 1000)
            })
        } else {
            swal("error","手机号码不能为空哦！","error");
            $("#mobilphone").css({border:"1px solid #ec7063"}).focus();
        }
        return false
    }
});
$("#captcha").blur(function () {
    var captcha=$.trim($("#captcha").val());
    var phone=$.trim($("#mobilphone").val());
    var url="/verify_tel_captcha/";
        $.post(url,{mobilphone:phone,captcha:captcha}, function (data) {
            var flag=jQuery.parseJSON(data).flag;
            if(flag!=true||captcha.length!=4){
                swal("error","验证码错误哦！","error");
                $("#captcha").css({border:"1px solid #ec7063"});
                return false
            }
        })
});
$("#send_message").on("click", function () {
    var company = $.trim($("#company").val().replace(/，/g, ",").split(","));
    var meeting = $.trim($("#meeting").val());
    var name = $.trim($("#name").val());
    var mobilphone = $.trim($("#mobilphone").val());
    var captcha = $.trim($("#captcha").val());
    var message = $.trim($("#message").val());
    var iphone = /^1[3-8]+\d{9}$/;
    if(company==0){
        swal("error","邀请人单位不能为空哦！","error");
        $("#company").css({border:"1px solid #ec7063"});
        return false
    }else if(meeting==0){
        swal("error","主办会议名称不能为空哦！","error");
        $("#meeting").css({border:"1px solid #ec7063"});
        return false
    }
    else if(name==0){
        swal("error","联系人姓名不能为空哦！","error");
        $("#name").css({border:"1px solid #ec7063"});
        return false
    }
    else if(mobilphone==0){
        swal("error","手机号码不能为空哦！","error");
        $("#mobilphone").css({border:"1px solid #ec7063"});
        return false
    }
    else if(!iphone.test(mobilphone)){
        swal("error","手机号码有误哦！","error");
        $("#mobilphone").css({border:"1px solid #ec7063"});
        return false
    }
    else if(captcha==0){
        swal("error","验证码不能为空哦！","error");
        $("#captcha").css({border:"1px solid #ec7063"});
        return false
    }
    else if(message==0){
        swal("error","补充信息不能为空哦！","error");
        $("#message").css({border:"1px solid #ec7063"});
        return false
    }else{
        var  ids = $("#ids").val();
        var guestName = $(".guestName").text();
        $.ajax({
            url:"/jiabin/send_guest_invitation/",
            dataType:"json",
            type:"post",
            data:{
                company:company,
                meeting:meeting,
                id:ids,
                name:name,
                mobilphone:mobilphone,
                message:message,
                guestName:guestName,
				captcha:captcha
            },
            success: function(data){
                console.log(data);
                if(data.success==1){
                    $(".content .meeasge_form input,.content .meeasge_form textarea").val("");
                    swal("success","您的信息已提交成功，稍后我们将与您联系。","success")
                }
            },
            error: function () {
                swal("error","对不起,邀请失败","error")
            }
        })
    }
});
$("#company").focus(function(){
    $(this).css({border:"1px solid #ddd"})
});
$("#name").focus(function(){
    $(this).css({border:"1px solid #ddd"})
});
$("#meeting").focus(function(){
    $(this).css({border:"1px solid #ddd"})
});
$("#mobilphone").focus(function(){
    $(this).css({border:"1px solid #ddd"})
});
$("#message").focus(function(){
    $(this).css({border:"1px solid #ddd"})
});
$("#captcha").focus(function(){
    $(this).css({border:"1px solid #ddd"})
});

function font_length(a, b) {
    var maxwidth = a;
    if ($(b).text().length > maxwidth) {
        $(b).text($(b).text().substring(0, maxwidth));
        $(b).html($(b).html() + "...")
    }
}
$(".guestCompany").each(function () {
    font_length(16, $(this))
});