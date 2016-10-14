/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 15-8-20
 * Time: 下午4:25
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function (){
    alert
    var m_height=$($(".activity-list")[0]).css("height");
    $(".activity").css({maxHeight:parseInt(m_height)*6+"px"});
    $(".loadmore").click(function(){
        $(".activity").css({height:"auto",maxHeight:"none"});
        $(".loadmore").css({display:"none"})
    })
    var a=$(".venue-des").css("height");
    $(".venue-des br").each(function (){
        $(this).replaceWith("<p/><span style='padding-left: 2em;line-height: 1' >&nbsp;</span>")
    })
    if(parseInt(a)>=200){
        $(".venue-des").css({height:"200px"});
    }else{

        $(".venue-des").css({height:"auto"});
        $(".more").css({display:"none"})
    }
    $(".more").click(function(){
        $(".venue-des").css({height:"auto"});
        $(".more").css({display:"none"})
    })
    $(".meeting-list").each(function(i){
        if(i%2==0){
            $($(".meeting-list")[i]).css({paddingRight:"5px"})
        }else{
            $($(".meeting-list")[i]).css({paddingLeft:"5px"})
        }
    })
})