/**
 * Created by asus on 2015/1/21.
 */
    $("#nav-list li").hover(
        function(){
            $(this).addClass("changecolor");
            $(this).find("a").css({
                color:"#fff"
            })
        },
        function () {
            $(this).removeClass("changecolor");
            $(this).find("a").css({
                color:"grey"
            })
        }
    );

$(function(){
    var introtop = $("#introduction").position().top;
    var cootop = $(".products-bg").position().top;
    var contop = $("#contactUs").position().top;
    $(".intro_we").click(function(){
        $('body').animate({
            scrollTop:introtop+"px"
        },600)
    })
    $(".coo").click(function(){
        $('body').animate({
            scrollTop:cootop+"px"
        },600)
    })
    $(".con").click(function(){
        $('body').animate({
            scrollTop:contop+"px"
        },600)
    })
})