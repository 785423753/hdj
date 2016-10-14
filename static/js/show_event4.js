$(function($){
    if ($.browser.msie && ($.browser.version <= "8.0")) {
        var nav_offset = $(".head_nav").offset();
        $(window).scroll(function () {
            var body_scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (body_scrollTop > nav_offset.top) {
                $(".head_nav").css({top: body_scrollTop});
            } else if (body_scrollTop < nav_offset.top) {
                $(".head_nav").removeAttr("style");
            }
        });
    } else {
        var nav_offset = $(".head_nav").offset();
        $(window).scroll(function () {
            var body_scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (body_scrollTop > nav_offset.top) {
                $(".head_nav").css({position: "fixed", top: "0px",left:nav_offset.left})
            } else if (body_scrollTop < nav_offset.top) {
                $(".head_nav").removeAttr("style")
            }
        });
    }
    var contentinfo = $(".body_content .container");
    $(".content_body .container table").css({width:'100%'})
    for(i=0;i<contentinfo.length;i++){
        if($.trim(contentinfo.eq(i).html()) == ""){
            $(".content_body .container").eq(i).html("暂无此内容").css({
                textAlign : "center"
            })
        }
        else if($.trim(contentinfo.eq(1).html()) == ""){
            contentinfo.eq(1).html("暂无会议日程或等待下一轮通知。如需详细日程安排，报名成功后我们会发详细日程安排到你的邮箱。").css({
                textAlign: "center"
            })
        }
        else{
            contentinfo.eq(i).css({
                textAlign : "left"
            })
        }
    }
    //锚点
    $(".event_nav li").eq(0).find("a").addClass("active")
    $(".event_nav li").bind('click', function(event) {
        var x= $(".body_content").eq($(this).index()).offset();
        $("body,html").animate({scrollTop:x.top-92}, 300)
        return false;
    });
    var class_top=[];
    $(window).scroll(function() {
        for (var i = 0; i <$(".body_content").length; i++) {
            class_top[i]=$(".body_content").eq(i).offset().top
        }
        if ( $(document).scrollTop()>=class_top[1]-104&&$(document).scrollTop()<class_top[2]-104) {
            $(".event_nav li").eq(1).find("a").addClass("active").parent().siblings().find("a").removeClass("active")
        }else if ($(document).scrollTop()>=class_top[2]-104&&$(document).scrollTop()<class_top[3]-104) {
            $(".event_nav li").eq(2).find("a").addClass("active").parent().siblings().find("a").removeClass("active")
        }else if ($(document).scrollTop()>=class_top[3]-104) {
            $(".event_nav li").eq(3).find("a").addClass("active").parent().siblings().find("a").removeClass("active")
        }
        else{
            $(".event_nav li").eq(0).find("a").addClass("active").parent().siblings().find("a").removeClass("active")
        }
    });
    //侧边栏
    //if($(".ul_right_li_2_fan").length==0){
    $home=$("<div class='new_weixing'><a><img src='http://pic.huodongjia.com/static/images/huodongjia_erweima.jpg' width='100px' alt='活动家微信二维码'/></a></div>"
    + "<div class='backTop'><a href='#'class='iconfont'></a></div>").appendTo($("body"))
    $(".phone,.new_weixing,.APP").show()
    //}else{
    //    $home=$("<div class='fanli'><a href='' rel='nofollow'><img src='http://pic.huodongjia.com/static/images/fanli.png' alt='返利5%'/></a></div>" +
    //    "<div class='new_weixing'><a><img src='http://pic.huodongjia.com/static/images/huodongjia_erweima.jpg' width='100px' alt='活动家微信二维码'/></a></div>"
    //    + "<div class='backTop'><a href='#'class='iconfont'></a></div>").appendTo($("body"))
    //    $(".phone,.new_weixing,.APP").show()
    //}
    $(document).bind('scroll', function () {
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > winh) ? $(".backTop").show() : $(".backTop").hide();
        if (!window.XMLHttpRequest) {
            $backToTopEle.css("top", st + winh - 126);
            $home.css("top", st + winh - 86)
        }
    })
    $(".fanli>a").attr("href",$(".enroll-bt").attr("href"))
    $(".backTop").on("click", function () {
        $("html,body").animate({scrollTop: 0}, 300)
    });
    $(".phone").hover(function () {
        $(this).stop().animate({width: "220px", paddingLeft: "10px"}, 300, function () {
            $(".phone a").text("400-003-3879").css({color: "#fff"})
        })
    }, function () {
        $(this).stop().animate({paddingLeft: "0px", width: "60px"}, 300);
        $(".phone a").text("")
    })
    $(".new_weixing a").css({display:"none",overflow:"hidden",float:"left",backgroundColor:"#7eafef",width:"0px",height:"0px",padding:"10px"})
    $(".new_weixing a img").hide()
    $(".new_weixing").hover(function () {
        $(".new_weixing a img").show().parent().show();
        $(this).stop().animate({width: "180px"}, 300)
        $(".new_weixing a").stop().animate({width:"120px",height:"120px",padding:"10px"},300)
    }, function () {
        $(this).stop().animate({paddingLeft: "0px", width: "60px"}, 300);
        $(".new_weixing a").stop().animate({width:"0px",height:"0px",padding:"0px"},300)
    })
})