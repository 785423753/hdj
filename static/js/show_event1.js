$(function ($) {
    if($.browser.msie&&($.browser.version <= "8.0")){
        var nav_offset=$(".border_bot").offset()
        $(window).scroll(function() {
            var body_scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
            if(body_scrollTop > nav_offset.top) {
                $(".border_bot").css({top: body_scrollTop})
            } else if(body_scrollTop < nav_offset.top) {
                $(".border_bot").removeAttr("style")
            }
        });
    }else{
        var nav_offset=$("#navbar-example").offset()
        $(window).scroll(function() {
            var body_scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
            if(body_scrollTop > nav_offset.top) {
                $("#navbar-example").css({position: "fixed", top: "0px"})
            } else if(body_scrollTop < nav_offset.top) {
                $("#navbar-example").removeAttr("style")
            }
        });
    }

    for (var i=0; i <$("#head_nav li h2").length; i++) {
           var x=$("#head_nav li h2").eq(0).text();
           // var y=$(".body_class").eq(i).id("a"+i);
           console.log($("#head_nav li h2").length);
        $("#head_nav li h2").eq(0).replaceWith("<a href='#'>"+x+"</a>")
    };
    var title_text=$(".activityName span").text().split("")
    $(".activityName span").text("")
    for (var i = 0; i <title_text.length; i++) {
        $(".activityName span").html($(".activityName span").html()+title_text[i])
        if(title_text[i+1]=="暨"){
            $(".activityName span").html($(".activityName span").html()+"</br>")
            $(".city").css({
                top: '30%'
            });
            $(".h_time").css({
                top: '28%'
            });
        }
    };
    for (var i = 0; i < $(".class_name").length; i++) {
       var body_title=$(".class_name").eq(i).text()
       if(body_title=="会议通知"||body_title=="相关介绍"||body_title=="活动介绍"||body_title=="演出信息"){
        $(".body_class .class_content").eq(0).html($(".class_name").eq(i).next().html());
       }else if(body_title=="会议日程"||body_title=="行程安排"){
        $(".richeng").html($(".class_name").eq(i).next().html());
       }else if(body_title=="会议嘉宾"){
        $(".body_class .class_content").eq(2).html($(".class_name").eq(i).next().html());
       }else if(body_title=="会议门票"||body_title=="购买须知"||body_title=="预定须知"||body_title=="订票须知"){
        $(".menpiao").html($(".class_name").eq(i).next().html());
       }else{
         $(".body_class .class_content").eq(4).html($(".class_name").eq(i).next().html());
       }
    };
    $("#head_nav li").bind('click', function(event) {
        var x= $(".body_class").eq($(this).index()).offset()
        console.log(x)
        console.log($(document).scrollTop())
        console.log(parseInt(x.top)-$(document).scrollTop())
        console.log($(document).scrollTop()>=class_top[1]&&$(document).scrollTop()<class_top[2])
        $("body,html").animate({scrollTop:x.top-60}, 300,function(){
            if ( $(document).scrollTop()>=class_top[1]&&$(document).scrollTop()<class_top[2]) {
                $("#head_nav li").removeClass('active')
                $("#head_nav li").eq(1).addClass('active')
            }else if ($(document).scrollTop()>=class_top[2]&&$(document).scrollTop()<class_top[3]) {
                $("#head_nav li").removeClass('active')
                $("#head_nav li").eq(2).addClass('active')
            }else if ($(document).scrollTop()>=class_top[3]&&$(document).scrollTop()<class_top[4]) {
                $("#head_nav li").removeClass('active')
                $("#head_nav li").eq(3).addClass('active')
            }else if ($(document).scrollTop()>=class_top[4]) {
                $("#head_nav li").removeClass('active')
                $("#head_nav li").eq(4).addClass('active')
            }else{
                $("#head_nav li").removeClass('active')
                $("#head_nav li").eq(0).addClass('active')
            }
        })
    });
    var class_top=[];
    for (var i = 0; i <$(".body_class").length; i++) {
        class_top[i]=parseInt($(".body_class").eq(i).offset().top-61)
        };
      $(window).scroll(function() {
        if ( $(document).scrollTop()>=class_top[1]&&$(document).scrollTop()<class_top[2]) {
            $("#head_nav li").removeClass('active')
            $("#head_nav li").eq(1).addClass('active')
        }else if ($(document).scrollTop()>=class_top[2]&&$(document).scrollTop()<class_top[3]) {
            $("#head_nav li").removeClass('active')
            $("#head_nav li").eq(2).addClass('active')
        }else if ($(document).scrollTop()>=class_top[3]&&$(document).scrollTop()<class_top[4]) {
            $("#head_nav li").removeClass('active')
            $("#head_nav li").eq(3).addClass('active')
        }else if ($(document).scrollTop()>=class_top[4]) {
            $("#head_nav li").removeClass('active')
            $("#head_nav li").eq(4).addClass('active')
        }else{
            $("#head_nav li").removeClass('active')
            $("#head_nav li").eq(0).addClass('active')
        }
      })
})