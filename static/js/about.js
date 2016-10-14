
$(function() {
    var src = "http://pic.huodongjia.com/images/about-two-";
    var srcone = "http://pic.huodongjia.com/images/aboutus_";
    var $img = $(".products-img li");
    $img.hover(function() {
        $(this).find("img").attr({src:srcone+ parseInt($(this).index()+1)+".png"});
    },function() {
        $(this).find("img").attr({src:src+ parseInt($(this).index()+1)+".png"});
    });
});

$(function(){
    $(".new_weixing").remove();
    $(".phone").remove();
    $(".APP").remove();
    $(".backToTop").remove();
});

var class_top=[];
    var nav_offset=$("#nav-list").offset();
if($.browser.msie&&($.browser.version <= "8.0")){
    $(window).scroll(function() {
        var body_scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
        if(body_scrollTop > nav_offset.top) {
            $("#nav-list").css({top: body_scrollTop})
        } else if(body_scrollTop < nav_offset.top) {
            $("#nav-list").removeAttr("style")
        }
    });
}else{
            var nav_offset=$("#nav-list").offset();
    $(window).scroll(function() {
        var body_scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
        if(body_scrollTop > nav_offset.top) {
            $("#nav-list").css({position: "fixed", top: "0px"})
        } else if(body_scrollTop < nav_offset.top) {
            $("#nav-list").removeAttr("style")
        }
    });
}

$("#nav-list li").bind('click', function(event) {
    var x= $(".about-div").eq($(this).index()).offset();
    $("body,html").animate({
        scrollTop:x.top-109
    },600)
});

for (var i = 0; i <$(".about-div").length; i++) {
    class_top[i]=$(".about-div").eq(i).offset().top
}
$(window).scroll(function() {
    if ( $(document).scrollTop()>=class_top[1]-112&&$(document).scrollTop()<class_top[2]-112) {
        $("#nav-list li").eq(1).addClass("changecolor").siblings().removeClass("changecolor")
    }else if ($(document).scrollTop()>=class_top[2]-112) {
        $("#nav-list li").eq(2).addClass("changecolor").siblings().removeClass("changecolor")
    }else{
        $("#nav-list li").eq(0).addClass("changecolor").siblings().removeClass("changecolor")
    }
});
$(".mainWrapper").css({
    backgroundColor:"#fcfcfc"
})