var bodyWidth = $("body").width();
if(bodyWidth<360){
    $(".intro").each(function () {
        font_length(18, $(this))
    });
    $("#sponsor_con .title").each(function () {
        $(this).text($.trim($(this).text()));
        font_length(9, $(this))
    });
}else{
    $(".intro").each(function () {
        font_length(23, $(this))
    });
    $("#sponsor_con .title").each(function () {
        $(this).text($.trim($(this).text()));
        font_length(11, $(this))
    });
}
function font_length(a, b) {
    var maxwidth = a;
    if ($(b).text().length > maxwidth) {
        $(b).text($(b).text().substring(0, maxwidth));
        $(b).html($(b).html() + "...")
    }
}

var range = 20;             //距下边界长度/单位px
var maxnum = 200;            //设置加载最多次数
var num = 1;
var totalheight = 0;//主体元素
$(window).scroll(function(){
    var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
    totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
    if(($(document).height()-range) <= totalheight  && num != maxnum) {
        var url =$(".spon_page_search").val();
        if(url!="false") {
            $("#loading").show();
        $.ajax({
            url:url,
            type:"get",
            async:false,
            success: function (data) {
                $(".spon_page_search").val(data.nextPage);
                var _html="";
                for (var pid in data.data) {
                    var sponsor_pic1 = data.data[pid].sponsor_pic;
                    var pic ="http://pic.huodongjia.com/";
                    if(sponsor_pic1=="none" || sponsor_pic1=="" ||sponsor_pic1==null){
                        var sponsor_pic = "http://pic.huodongjia.com/event/2015-06-17/event1434525319.0.jpg"
                    }else{
                        var sponsor_pic =pic+data.data[pid].sponsor_pic;
                    }
                    var intro = data.data[pid].sponsor_intro;
                    var inter =  data.data[pid].sponsor_like_count;
                    if(intro=="" ||intro=="none" ||intro==null){
                        var intro ="暂时没有此主办方介绍..."
                    }else{
                        var intro = data.data[pid].sponsor_intro;
                    }
                    if(inter=="" || inter==null || inter=="none"){
                        var inter = "0";
                    }else{
                        var inter =  data.data[pid].sponsor_like_count;
                    }
                    var sponsor_url = "/sponsor-"+data.data[pid].sponsor_id+".html";
                    _html += '<a href="' + sponsor_url + '" class="spon_lists">'  +
                        '<article class="col-sm-12 col-xs-12 spon_list">' +
                        '<dl class="col-sm-12 col-xs-12 sponsor_list">' +
                        '<dt class="spon_list_pic">' +
                        '<img src="' +sponsor_pic + '"  alt="' + data.data[pid].sponsor_name + '" class="sponsor_pic">'+
                        '</dt>'+
                        '<dd class="spon_list_info">' +
                        '<h2 class="title">' + data.data[pid].sponsor_name + '</h2>'+
                        '<p class="intro">'+intro+'</p>'+
                        '<img src="http://pic.huodongjia.com/static/images/sponsor_right.png" class="sponsor_right" alt="活动家主办方">'+
                        '<span class="inter"><img src="http://pic.huodongjia.com/static/images/sponsor_inter.png" alt="活动家主办方">&nbsp;'+inter+'人</span>'+
                        '<span class="meet"><img src="http://pic.huodongjia.com/static/images/sponsor_meet.png" alt="活动家主办方">'+data.data[pid].recent_events_count+'场</span>'+
                        "</dd></dl></article>"+
                        "</a>";
                }
                $("#spon_search").append(_html);
                if(bodyWidth<360){
                    $(".intro").each(function () {
                        font_length(18, $(this))
                    });
                    $("#sponsor_con .title").each(function () {
                        $(this).text($.trim($(this).text()));
                        font_length(9, $(this))
                    });
                }else{
                    $(".intro").each(function () {
                        font_length(23, $(this))
                    });
                    $("#sponsor_con .title").each(function () {
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
