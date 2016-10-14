var pyArray = [];
var x = ["100"];
$(".city_ul li a[data-city='false']").each(function () {
    pyArray.push($(this).attr("data-py").split("")[0])
});
pyArray = unique(pyArray);
for (var z = 0; z < pyArray.length; z++) {
    $(".cityPY").append("<li>" + pyArray[z].toLocaleUpperCase() + "</li>")
}
$(".cityPY li").on("click", this, function (event) {
    event.stopPropagation();
    $(".list_city section").stop().animate({scrollTop: x[$(this).index()] - 60}, 1000)
});
function unique(data) {
    data = data || [];
    var a = {};
    for (var i = 0; i < data.length; i++) {
        var v = data[i];
        if (typeof(a[v]) == "undefined") {
            a[v] = 1
        }
    }
    data.length = 0;
    for (var i in a) {
        data[data.length] = i
    }
    return data
}
$("#cat_li").each(function () {
    var maxwidth = 4;
    if ($(this).text().length > maxwidth) {
        $(this).text($(this).text().substring(0, maxwidth))
    }
});
$(".list-nav").html($(".list-navs").html());
$(".list_btn>li").on("click", function (e) {
    var a = $(this).attr("data-value");
    var $this = $(this);
    $("." + a).find("section").show().height($("body").height() - $(".list-header").height() - $(this).height() - 110);
    $(this).siblings().find("section").fadeOut();
    $(this).css({color: "#3366cc"}).siblings().css({color: "#6D6D6D"}).find("i").html("&#xe62b");
    $("." + a).height($("body").height() - $(".list-header").height() - $(this).height()).stop().slideToggle(function () {
        if ($("." + a).css("display") == "block") {
            $("body,html").css({overflow: "hidden"});
            $this.find("i").html("&#xe622")
        } else {
            $("body,html").css({overflow: "auto"});
            $this.find("i").html("&#xe62b")
        }
        $("." + a).find("section").show().height($("." + a).height() - 110)
    });
    if ($("." + a).attr("data-value")) {
        var s = parseInt($("." + a).attr("data-value"));
        $(".cat_ul li a[id='" + s + "']").parent().addClass("cat_li_active");
        $("#tag_" + s).show()
    }
    if (a == "list_city") {
        $(".cityPY").stop().slideToggle();
        for (var s = 0; s < pyArray.length; s++) {
            x.push($(".city_ul li a[data-city='false'][data-py^='" + pyArray[s] + "']").offset().top)
        }
    }
});
$("#list_con  .black-div").on("click", this, function () {
    $(this).fadeOut(500);
    $(".list_btn section").slideUp()
});
$(".cat_ul li").on("click", this, function (event) {
    event.stopPropagation();
    var id = $(this).find("a").attr("id");
    $("#tag_" + id).show();
    $("#tag_" + id).siblings().hide()
});
$(window).scroll(function () {
    if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
        $("#loading").show();
        $("#loadings").hide()
        var new_page = (parseInt($("#list_con .meeting:last").attr("data-page")));
        var h_city = $(".h_city").val();
        var h_cat = $(".h_cat").val();
        var h_month = $(".h_month").val();
        var h_tag = $(".h_tag").val();
        var page = parseInt($(".page").val())+1;
        var keyword = $(".keyword").val();
        var m_key=$(".m_key").val();
        var searchList={keyword:keyword,ajax:1};
        var listUrl="/list_ajax/";
        var searchUrl="/tag/15/"+page;
        var listData = {city: h_city, cat: h_cat, month: h_month, tag: h_tag, page: new_page};
        if($("#list_con .meeting:last").attr("data-page")){
            var url=listUrl;
            var Data=listData;
        }else{
            if(m_key==1){
                var url="/tag_ajax/"
            }else{
                var url=searchUrl;
            }
            var Data=searchList;
        }
        var new_url = window.location.pathname + "page-"+page+"/";
        $.get(new_url, {json:1}, function (data) {
            $(".page").attr('value',page)
            console.log(data)
            if (data&& data.events.length > 0) {
                for (var pid in data.events) {
                    var time, price,pic;
                      if (data.events[pid].event_img.length==0){        //图片为空加上默认图片
                            pic = "http://pic.huodongjia.com/static/images/event_default.jpg"
                       } else {
                            pic = data.events[pid].event_img[0].server__name+data.events[pid].event_img[0].urls;
                       }
                    if (data.events[pid].event_begin_time) {
                        time = data.events[pid].event_begin_time.substring(0,10)
                    } else {
                        time = data.events[pid].event_end_time.substring(0,10)
                    }
                    if (data.events[pid].event_price_type==6) {
                        if(data.events[pid].event_price_unit.length>0){
                            price = data.events[pid].event_price_unit[0].Currency__sign+ data.events[pid].event_price_unit[0].price
                        }else{
                            price="报名截止"
                        }
                    } else if(data.events[pid].event_price_type==4){
                        price = "免费"
                    }else if(data.events[pid].event_price_type==5||data.events[pid].event_price_type==7||data.events[pid].event_price_type==9){
                        price = "待定"
                    }
                    var html = '<section  class="col-sm-12 col-xs-12 meeting" data-href=" ' +data.events[pid].event_id + ' "  data-page=" ' + data.cur_page + ' ">'
                        + "<dl><dt>" + '<a href="' + data.events[pid].event_url + '">'
                        + '<img src="' + pic + '!hdj123"  alt="' + data.events[pid].event_name + '" >'
                        + "</a></dt><dd><ul>" + '<a href="' + data.events[pid].event_url + '">' + '<h3 class="pic-opa-title">'
                        + data.events[pid].event_name + "</h3>" + "</a>" + '<span class="home-money">' + price + "</span>"
                        + '<label class="home-time">' + time + "&nbsp;&nbsp;</label>" + '<label class="home-city"><a href="/' + data.events[pid].event_city_info[0].title + '/">'
                        + data.events[pid].event_city_info[0].district_name + "</a></label>" + "</ul></dd></dl></section>";
                    $("#list_con .meeting:last").after(html)
                }

                $(".pic-opa-title").each(function () {
                    font_length(22, $(this))
                });

                $(".home-city a").each(function () {
                    font_length(4, $(this))
                });

                $("#loading").hide()

            } else {
                $("#loading").hide();
                $("#loadings").show()
            }
        })
    }
});

    var nav_offset,floatdiv
    if($('.current_tag').length==0){
        nav_offset = $("#list_nav").offset().top;
        floatdiv=$('#list_nav')
    }else{
        nav_offset = $(".current_tag").offset().top;
        floatdiv=$('.current_tag')
    }
    $.event.add(window, "scroll", function() {
        var sTop=document.documentElement.scrollTop+document.body.scrollTop;
        if(sTop>=nav_offset){
            floatdiv.css({position: "fixed", top: "0px",width:"100%",margin:"0"})
        }else{
            floatdiv.css({position:"","top":'',width:"",margin:""})
        }
    });

$(".header_seachs").click(function (){
    $(".list-seacher").slideToggle();
});
$(window).scroll(function () {
    var sTop=document.documentElement.scrollTop+document.body.scrollTop;
    var top=$(".top_back")[0];
    if(sTop>10) {
        top.style.bottom = "20px"
    }else{
        top.style.bottom = "-40px"
    }
});
//    回到顶部
$(".top_back").click(function(){
    $('html, body').animate({scrollTop: 0},500);
})
$('.close,.all,.tags').click(function(){
    $('.tags').fadeOut(300)
})
var margintop=parseInt($(window).height()-$('.tags').height())/2
$('.tagList').css({margin:margintop+'px,auto',maxHeight:$(window).height()-30+'px',overflow:'auto'})
$('.more_tag').click(function () {
    $('.tags').show()
})
function validate() {
    $(".myForm").submit()
}