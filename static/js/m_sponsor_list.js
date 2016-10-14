var bodyWidth = $("body").width();
if(bodyWidth<360){
    $(".intro").each(function () {
        font_length(18, $(this))
    });
}else{
    $(".intro").each(function () {
        font_length(25, $(this))
    });
}
function font_length(a, b) {
    var maxwidth = a;
    if ($(b).text().length > maxwidth) {
        $(b).text($(b).text().substring(0, maxwidth));
        $(b).html($(b).html() + "...")
    }
}
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
