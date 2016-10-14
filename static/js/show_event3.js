$(function ($) {
window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":["mshare","qzone","tsina","weixin","tqq","kaixin001","tieba","douban","tsohu","sqq"],"bdPic":"","bdStyle":"0","bdSize":"24"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
$(".bdsharebuttonbox a").css({
    marginLeft: '4px'
});
    $(".head_middle").css({
        left: $("body").width() / 2 - 66
    });
    if($.browser.msie){
        $(".img-responsive").css({width:"auto"})
    }
    $("#head_nav li").bind('click', function (event) {
        var x = $(".body_class").eq($(this).index()).offset()
        $("body,html").animate({scrollTop: x.top - 20}, 300)
    });

    if ($.browser.msie && ($.browser.version <= "8.0")) {
        var enrolltop = $(".enroll").offset();
        $(window).scroll(function () {
            var body_scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                $(".enroll").css({top: (body_scrollTop+85)})
            console.log(body_scrollTop+85)
        });
    } else {
        var enrolltop = $(".enroll").offset();
        $(window).scroll(function () {
            var body_scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                $(".enroll").css({position: "fixed", top: "85px"})
        });
    }
    var title_text = $(".activityName").text().split("")
    $(".activityName").text("")
    for (var i = 0; i < title_text.length; i++) {
        $(".activityName").html($(".activityName").html() + title_text[i])
        if (title_text[i + 1] == "暨") {
            $(".activityName").html($(".activityName").html() + "</br>")
        }
    }
    // if($(".content_richeng img").length==0){
    //     $(".content_richeng").html("暂无最新日程，请等待更新。").css({
    //         textAlign: "center"
    //     })
    // }else if($.trim($(".content_richeng").text()).length == 0){
    //     $(".content_richeng").html("暂无最新日程，请等待更新。").css({
    //         textAlign: "center"
    //     })
    // }
    // if($(".content_people img").length==0){
    //     $(".content_people").html("会议嘉宾正在确认中，敬请期待。").css({
    //         textAlign: "center"
    //     })
    // }
    // else if($.trim($(".content_people").text()).length == 0){
    //     $(".content_people").html("会议嘉宾正在确认中，敬请期待。").css({
    //         textAlign: "center"
    //     })
    // }
    // if($(".content_menpiao img").length==0){
    //     $(".content_menpiao").html("会议门票待定，请等待更新。").css({
    //         textAlign: "center"
    //     })
    // }
    // else if($.trim($(".content_menpiao").text()).length == 0){
    //     $(".content_menpiao").html("会议门票待定，请等待更新。").css({
    //         textAlign: "center"
    //     })
    // }
    $(".class_content table").css({width: "100%"})
    $(".clearDiv").bind('click', function () {
        $(".message_popup").hide()
    })
    $(".message").bind("click", function () {
        $(".message_popup").show().css({
            left: ($("body").width() - $(".message_popup").width()) / 2,
            top: ($("body").height() - $(".message_popup").height()) / 2
        })
    })
    $(".clearDiv").bind('click', function () {
        $(".message_popup").hide()
        $(".message_popup input,.message_popup textarea").val("")
    })
    $("#messageSubmit").bind('click', function () {
        var name= $.trim($("#username").val())
        var phone=$.trim($("#tel").val())
        var email=$.trim($("#email").val())
        var content=$.trim($("#content").val())
        var captcha=$("#captcha").attr("data-captcha");
        var eventID=$(".event_id").val()
        var eventName=$(".event_name").val()
        var ps = /^(http:\/\/|https:\/\/)?((?:[A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[\/\?\:]?.*$/;
        var email_pd=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        var fromFlag;
        if(name.length!=0||phone.length!=0||email.length!=0||content.length!=0||captcha!=false||ps.test(content)||email_pd.test(email)){
            fromFlag=true;
        }else{
            fromFlag=false;
        }
        if(fromFlag!=false){
            $.ajax({
                url:"/post_message_json/",
                dataType:"json",
                type:"post",
                data:{name:name,phone:phone,email:email,content:content,event_name:eventName,event_id:eventID},
                success: function(data){
                    if(data.code==1){
                        $(".message_popup").hide()
                        $(".message_popup input,.message_popup textarea").val("")
                        popup(1,"感谢您的留言","稍后会有服务人员联系您！")
                    }
                }
            })
        }
    })
});
$(function ($) {
    //侧边栏
        // $home=$("<div class='new_weixing' id='code'><p>扫一扫，分享给朋友！</p></div>").appendTo($("body"))
        // $(".phone,.new_weixing,.APP").show()
            function toUtf8(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for(i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            }
        }
        return out;
    }
    // var code_url=(window.location.href).replace('www','m');
    // code_url = toUtf8(code_url)
    // $("#code").qrcode(code_url)
    // $('#code').find("canvas").css({
    //     width: '120px',
    //     height: '120px'
    // });
    // $(document).bind('scroll', function () {
    //     var st = $(document).scrollTop(), winh = $(window).height();
    //     (st > winh) ? $(".backTop").show() : $(".backTop").hide();
    //     if (!window.XMLHttpRequest) {
    //         $backToTopEle.css("top", st + winh - 126);
    //         $home.css("top", st + winh - 86)
    //     }
    // })
    // $(".backTop").on("click", function () {
    //     $("html,body").animate({scrollTop: 0}, 300)
    // });
    //$(".phone").hover(function () {
    //    $(this).stop().animate({width: "220px", paddingLeft: "10px"}, 300, function () {
    //        $(".phone a").text("400-003-3879").css({color: "#fff"})
    //    })
    //}, function () {
    //    $(this).stop().animate({paddingLeft: "0px", width: "60px"}, 300);
    //    $(".phone a").text("")
    //})
    // $(".new_weixing a").css({display:"none",overflow:"hidden",float:"left",backgroundColor:"#7eafef",width:"0px",height:"0px",padding:"10px"})
    // $(".new_weixing a #code").hide()
    // $(".new_weixing").hover(function () {
    //     $(".new_weixing a #code").show().parent().show();
    //     $(this).stop().animate({width: "180px"}, 300)
    //     $(".new_weixing a").stop().animate({width:"120px",height:"120px",padding:"10px"},300)
    // }, function () {
    //     $(this).stop().animate({paddingLeft: "0px", width: "60px"}, 300);
    //     $(".new_weixing a").stop().animate({width:"0px",height:"0px",padding:"0px"},300)
    // })
    $(".captcha_btn").bind('click',function () {
        $(".address").css({border:"1px solid rgb(216, 216, 216)"})
        var dateObj,s="";
        dateObj = new Date()
        s+=dateObj.getFullYear()
        s+=dateObj.getMonth()+1
        s+=dateObj.getDate()
        s+=dateObj.getHours()
        s+=dateObj.getMinutes()
        s+=dateObj.getSeconds()
        var set, i = 300;
        var url = "/send_check_mesage/";
        var tel = $.trim($("#tel").val());
        if (tel != "" && (/^1[3-8]+\d{9}$/).test(tel)) {
            $.get(url, {"tel": tel,"time":s}, function (data) {
                set = setInterval(function () {
                    $(".captcha_btn").text(i).attr({disabled: "disabled"});
                    i--;
                    if (i < 0) {
                        clearInterval(set);
                        $(".captcha_btn").text("重发").removeAttr("disabled")
                    }
                }, 1000)
            })
        } else {
            popup(0,"手机号码","请输入正确的手机号码")
            $(".address").css({border:"1px solid red"})
        }
        return false
    });
});

