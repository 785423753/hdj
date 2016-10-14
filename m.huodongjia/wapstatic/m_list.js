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
$("#list_con .cat_ul li").on("click", function () {
    $(this).addClass("cat_li_active").siblings().removeClass("cat_li_active")
});
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
        var new_page = (parseInt($("#list_con .meeting:last").attr("data-page")));
        var h_city = $(".h_city").val();
        var h_cat = $(".h_cat").val();
        var h_month = $(".h_month").val();
        var h_tag = $(".h_tag").val();
        var page = $(".page").val();
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
        $.get(url, Data, function (data) {
            if (data && data.code == 1 && data.list.length > 0) {
                for (var pid in data.list) {
                    var time, price;
                    if (data.list[pid].event_begin_time) {
                        time = data.list[pid].event_begin_time
                    } else {
                        time = data.list[pid].event_end_time
                    }
                    if (isNaN(parseInt(data.list[pid].event_price))) {
                        price = data.list[pid].event_price
                    } else {
                        price = parseInt(data.list[pid].event_price.split("/")[0]) + data.list[pid].event_price_unit
                    }
                    var html = '<section  class="col-sm-12 col-xs-12 meeting" data-page=" ' + data.page + ' ">' + "<dl><dt>" + '<a href="' + data.list[pid].event_url + '">' + '<img src="' + data.list[pid].event_img + '"  alt="' + data.list[pid].event_name + '" >' + "</a></dt><dd><ul>" + '<a href="' + data.list[pid].event_url + '">' + '<h3 class="pic-opa-title">' + data.list[pid].event_name + "</h3>" + "</a>" + '<span class="home-money">' + price + "</span>" + '<label class="home-time">' + time + "&nbsp;&nbsp;|</label>" + '<label class="home-city"><a href="/' + data.list[pid].district_title + '/">' + data.list[pid].district_name + "</a></label>" + "</ul></dd></dl></section>";
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
if ($("#list_nav").length != 0) {
    var nav_offset = $("#list_nav").offset().top;
    $.event.add(window, "scroll", function() {
        var sTop=document.documentElement.scrollTop+document.body.scrollTop;
        if(sTop>=nav_offset){
            $("#list_nav").css({position: "fixed", top: "0px"})
        }else{
            $("#list_nav").css({position:"","top":''})
        }
    });
}
