/**
 * Created by Administrator on 2015/12/19 0019.
 */

function supportCss3(style) {
    var prefix = ['webkit', 'Moz', 'ms', 'o'],
        i,
        humpString = [],
        htmlStyle = document.documentElement.style,
        _toHumb = function (string) {
            return string.replace(/-(\w)/g, function ($0, $1) {
                return $1.toUpperCase();
            });
        };

    for (i in prefix)
        humpString.push(_toHumb(prefix[i] + '-' + style));

    humpString.push(_toHumb(style));

    for (i in humpString)
        if (humpString[i] in htmlStyle) return true;

    return false;
}
var bannerLength = $(".bannnerImg li").length;
var bannner = $(".bannnerImg ul");
var bannerIndex = 0;
var Width=parseInt($(".bannnerImg").css("width"));
$(window).resize(function() {
    Width=parseInt($(".bannnerImg").css("width"));
});
bannner.css({transition:"all 1000ms ease",transform:"translate3d(-"+bannerIndex*Width+"px, 0px, 0px)"});
bannner.find("li:eq(0)").css({display:"block"});
bannerIndex+=1;
var bannerTime = window.setInterval(function () {
    if(bannerIndex>bannerLength-1){
        bannerIndex=0;
    }
    $(".bannnerText ul li").eq(bannerIndex).addClass("active").siblings().removeClass("active");
    if(supportCss3("transform")){
        bannner.css({transform:"translate3d(-"+bannerIndex*Width+"px, 0px, 0px)"});
        bannner.css({msTransform:"translate(-"+bannerIndex*Width+"px, 0px)"});
    }else{
        $(".bannnerImg ul").animate({
            left:-bannerIndex*Width+"px"
        },1000)
    }
    bannerIndex+=1;
},5000);
$(".bannnerText ul li").hover(function () {
    window.clearInterval(bannerTime);
    bannerIndex = $(this).index();
    $(".bannnerText ul li").eq(bannerIndex).addClass("active").siblings().removeClass("active");
    if(supportCss3("transform")){
        bannner.css({transform:"translate3d(-"+bannerIndex*Width+"px, 0px, 0px)"});
        bannner.css({msTransform:"translate(-"+bannerIndex*Width+"px, 0px)"});
    }else{
        $(".bannnerImg ul").animate({
            left:-bannerIndex*Width+"px"
        },1000)
    }
})
$(".bannnerText").mouseleave(function () {
    bannerTime = window.setInterval(function () {
        if(bannerIndex>bannerLength-1){
            bannerIndex=0;
        }
        $(".bannnerText ul li").eq(bannerIndex).addClass("active").siblings().removeClass("active");
        if(supportCss3("transform")){
            bannner.css({transform:"translate3d(-"+bannerIndex*Width+"px, 0px, 0px)"});
            bannner.css({msTransform:"translate(-"+bannerIndex*Width+"px, 0px)"});
        }else{
            $(".bannnerImg ul").animate({
                left:-bannerIndex*Width+"px"
            },1000)
        }
        bannerIndex+=1;
    },5000);
})
