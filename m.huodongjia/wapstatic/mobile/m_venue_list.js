var bodyWidth = $("body").width();
if(bodyWidth<360){
    $(".intro").each(function () {
        font_length(16, $(this))
    });
    $("#venue_con .title").each(function () {
        $(this).text($.trim($(this).text()));
        font_length(8, $(this))
    });
}else{
    $(".intro").each(function () {
        font_length(23, $(this))
    });
    $("#venue_con .title").each(function () {
        $(this).text($.trim($(this).text()));
        font_length(11, $(this))
    });
}
$(".city ul li a ").each(function () {
    var maxwidth = 2;
    if ($(this).text().length > maxwidth) {
        $(this).text($(this).text().substring(0, maxwidth));
    }
});
function font_length(a, b) {
    var maxwidth = a;
    if ($(b).text().length > maxwidth) {
        $(b).text($(b).text().substring(0, maxwidth));
        $(b).html($(b).html() + "...")
    }
}
var all_list = $(".venue_list").height();
$(".city").height(all_list);
$(".city ul a").on("click",function(){
    $(this).css({color:"#ff9933"})
});
var flag = 1;
function cityshow(){
    $(".city ul li").each(function(i){
        if(i>5){
            $(this).fadeOut();
        }
    });
}
cityshow();
$(".sponsor_bottom").on("click", function () {
    if(flag==1){
        $(".sponsor_bottom").css({
            'transform':'rotate(-90deg)',
            '-webkit-transform':'rotate(-90deg)'
        });
        flag = 0;
        $(".city ul li").each(function(i){
            if(i>5){
                $(this).fadeIn();
            }
        });
    }else{
        $(".sponsor_bottom").css({
            'transform':'rotate(90deg)',
            '-webkit-transform':'rotate(90deg)'
        });
        flag = 1;
        cityshow();
        $("html,body").animate({"scrollTop": 0}, 600)
    }

});

var range = 20;             //距下边界长度/单位px
var maxnum = 200;            //设置加载最多次数
var num = 1;
var totalheight = 0;//主体元素
$(window).scroll(function(){
    var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
    totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
    if(($(document).height()-range) <= totalheight  && num != maxnum) {
        var url =$(".venue_page").val();
        if(url!="false") {
            $("#loading").show();
            $.ajax({
                url: url,
                type: "get",
                async: false,
                success: function (data) {
                    console.log(data);
                    $(".venue_page").val(data.nextPage);
                    var _html = "";
                    for (var pid in data.all_venue_lst) {
                        var sponsor_pic = data.all_venue_lst[pid].venue_pic_url;
                        if(sponsor_pic!=""){
                            var sponsor_pic = data.all_venue_lst[pid].venue_pic_url;
                        }else{
                            var sponsor_pic = "http://pic.huodongjia.com/event/2015-06-17/event1434525054.73.jpg";
                        }
                        var sponsor_url = "/venue-" + data.all_venue_lst[pid].venue_id + ".html";
                        var intro = data.all_venue_lst[pid].venue_intro;
                        if(intro!="" ||intro!="none"){
                            var intro = data.all_venue_lst[pid].venue_intro;
                        }else{
                            var intro = "会场介绍: 暂无相关介绍";
                        }
                        _html += '<a href="' + sponsor_url + '" class="spon_lists">' +
                        '<article class="spon_list">' +
                        '<dl class="col-sm-12 col-xs-12 sponsor_list">' +
                        '<dt class="spon_list_pic">' +
                        '<img src="' + sponsor_pic + '"  alt="' + data.all_venue_lst[pid].venue_name + '" class="sponsor_pic">' +
                        '</dt>' +
                        '<dd class="spon_list_info">' +
                        '<h2 class="title">' + data.all_venue_lst[pid].venue_name + '</h2>' +
                        '<p class="intro">' + intro + '</p>' +
                        '<img src="http://pic.huodongjia.com/static/images/sponsor_right.png" class="sponsor_right" alt="活动家主办方">' +
                        '<span class="meet"><img src="http://pic.huodongjia.com/static/images/sponsor_meet.png" style="width: 15px;" alt="活动家主办方">&nbsp;共举办<span style="color: #CC6;">' + data.all_venue_lst[pid].venue_event_count + '场</span>会议</span>' +
                        "</dd></dl></article>" +
                        "</a>";
                    }
                    $(".venue_list").append(_html);
                    if (bodyWidth < 360) {
                        $(".intro").each(function () {
                            font_length(16, $(this))
                        });
                        $("#venue_con .title").each(function () {
                            $(this).text($.trim($(this).text()));
                            font_length(7, $(this))
                        });
                    } else {
                        $(".intro").each(function () {
                            font_length(23, $(this))
                        });
                        $("#venue_con .title").each(function () {
                            $(this).text($.trim($(this).text()));
                            font_length(11, $(this))
                        });
                    }
                }
            })
        }else{
            $("#loading").hide();
            $("#loadings").show();
        }
    }
});
