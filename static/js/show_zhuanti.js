$(function ($) {
window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":["mshare","qzone","tsina","weixin","tqq","kaixin001","tieba","douban","tsohu","sqq"],"bdPic":"","bdStyle":"0","bdSize":"24"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
$(".bdsharebuttonbox a").css({
    marginLeft: '4px'
});
    // if ($.browser.msie && ($.browser.version <= "8.0")) {
    //     var nav_offset = $("#head_nav").offset();
    //     $(window).scroll(function () {
    //         var body_scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //         if (body_scrollTop > nav_offset.top) {
    //             $("#head_nav").css({top: body_scrollTop});
    //         } else if (body_scrollTop < nav_offset.top) {
    //             $("#head_nav").removeAttr("style");
    //         }
    //     });
    // } else {
    //     var nav_offset = $("#head_nav").offset();
    //     $(window).scroll(function () {
    //         var body_scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //         if (body_scrollTop > nav_offset.top) {
    //             $("#head_nav").css({position: "fixed", top: "20%"})
    //         } else if (body_scrollTop < nav_offset.top) {
    //             $("#head_nav").removeAttr("style")
    //         }
    //     });
    // }
    if($.browser.msie){
        $(".img-responsive").css({width:"auto"})
    }
    var title_text=$(".activityName").text().split("")
    $(".activityName").text("")
    for (var i = 0; i <title_text.length; i++) {
        $(".activityName").html($(".activityName").html()+title_text[i])
        if(title_text[i+1]=="暨"){
            $(".activityName").html($(".activityName").html()+"</br>")
        }
    };
    $("#head_nav .li").eq(0).addClass("active")
    $("#head_nav .li").bind('click', function(event) {
        var x= $(".content").eq($(this).index()).offset();
        $("body,html").animate({scrollTop:x.top}, 300)
    });
    $("#free").bind('click',function(){
        var ordertop = $("#ticket").offset().top;
        $("body,html").animate({scrollTop:ordertop}, 600)
    })


    $(window).scroll(function() {
            var class_top=[];
    $(".content").each(function(index, el) {
    class_top.push($(".content").eq(index).offset().top-5)
    })
    for (var i = 0;i<class_top.length;i++) {
        if(i==0&&$(document).scrollTop()<class_top[i+1]){
                    $("#head_nav li").eq(i).addClass("active").siblings().removeClass("active");
        }else if(i==class_top.length-1&&$(document).scrollTop()>=class_top[i]){
                $("#head_nav li").eq(i).addClass("active").siblings().removeClass("active");
        }else if(class_top[i]<$(document).scrollTop()&&$(document).scrollTop()<=class_top[i+1]){
                   $("#head_nav li").eq(i).addClass("active").siblings().removeClass("active");
        }
    }
    });


    var contentinfo = $(".content_body");
    $(".content_body table").css({width:'100%'});

     if($.trim($(".content_richeng").html()) == ""){
         $(".content_richeng").html("暂无会议日程或等待下一轮通知。如需详细日程安排，报名成功后我们会发详细日程安排到你的邮箱。").css({
            textAlign: "center"
        })
    }
    for (i = 0; i < contentinfo.length; i++) {
        if ($.trim(contentinfo.eq(i).html()) == "") {
            contentinfo.eq(i).html("暂无此内容").css({
                textAlign: "center"
            })
        }
        else{
            contentinfo.eq(i).css({
                textAlign: "left"
            })
        }
    }
    $(".ul_left").addClass("col-lg-8 col-md-7 col-xs-8 col-sm-8 ")
    $(".message").bind("click", function () {
    $(".message_popup").show().css({left:($("body").width()-$(".message_popup").width())/2,top:($("body").height()-$(".message_popup").height())/2})
    })

    $("#captcha").blur(function () {
        var url="/verify_tel_captcha/"
        var captcha=$("#captcha").val()
        var phone=$("#tel").val()
        $.post(url,{mobilphone:phone,captcha:captcha}, function (data) {
            var flag = jQuery.parseJSON(data).flag;
            if(flag==false){
                $("#captcha").attr("data-captcha","false")
            }
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
    $(document).bind('scroll', function () {
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > winh) ? $(".backTop").show() : $(".backTop").hide();
        if (!window.XMLHttpRequest) {
            $backToTopEle.css("top", st + winh - 126);
            $home.css("top", st + winh - 86)
        }
    })
    $(".fanli>a").attr("href",$(".enroll-bt").attr("href"))
    // $(".backTop").on("click", function () {
    //     $("html,body").animate({scrollTop: 0}, 300)
    // });
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
})

