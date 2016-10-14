/**
 * Created by Administrator on 2016/1/19 0019.
 */
$(".all_city input").click(function () {
    $(".cities").slideToggle(100)
    $(this).parent().find(".img").slideToggle(100)
    $(".venue_cat").slideUp(100)
    $(".venue img").slideUp(100)
    stopEvent()
})
$(".venue input").click(function () {
    $(".venue_cat").slideToggle(100)
    $(this).parent().find(".img").slideToggle(100)
    $(".cities").slideUp(100)
    $(".all_city img").slideUp(100)
    stopEvent()
})
$("body").click(function () {
    $(".title_nav>div>ul").slideUp(100)
    $(".title_nav>div>img").slideUp(100)
})
function stopEvent(){
    //阻止冒泡事件
    var e=arguments.callee.caller.arguments[0]||event; //若省略此句，下面的e改为event，IE运行可以，但是其他浏览器就不兼容
    if (e && e.stopPropagation) {
        // this code is for Mozilla and Opera
        e.stopPropagation();
    } else if (window.event) {
        // this code is for IE
        window.event.cancelBubble = true;
    }
}
var nav_top=$(".title_nav").offset().top
var right_child=$(".right_child").offset().top
var nav_width=$(".content_left").width()
var child_width=$(".content_right").width()
var f_top
$(window).load(function() {
    f_top=900
    //console.log($(".footer").height()+"<br/>"+$(document).height())
    //console.log(document.body.scrollHeight+"  "+$(window).height())
});
$.event.add(window, "scroll", function() {
    var sTop=document.documentElement.scrollTop+document.body.scrollTop;

    if(sTop>=nav_top){
        $(".title_nav").css({position:"fixed",top:"0","z-index":"1000","width":nav_width,"border-bottom":"1px solid #eee"})
    }else{
        $(".title_nav").css({position:"","width":"","border-botttom":''})
    }
    if(sTop>=right_child && sTop<=f_top){
        $(".right_child").css({position:"fixed",top:"0px","z-index":"1000","width":child_width})
    }else{
        $(".right_child").css({position:"","width":'',"top":''})
    }
});

function move(_index){
    $('.banner_index a').eq(_index).addClass('banner_act').siblings().removeClass('banner_act')
    $('.banner ul li').eq(_index).addClass('banner_act').siblings().removeClass('banner_act')
}
function next() {
    var _index=$('.banner_index .banner_act').index()
    if(_index>=5){
        _index=-1
    }
    _index++
    move(_index)
}
var time=setInterval( next,4000)
$('.banner').hover(
    function () {
        clearInterval(time);
    },
    function () {
        time=setInterval (next,4000);
    }
)
$('.banner ul li').mouseover(function(){
    var _index=$(this).index()
    move(_index)
})