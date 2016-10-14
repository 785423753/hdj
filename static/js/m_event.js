$(document).ready(function () {
    $(".Invitation_info").animate({marginTop: "42px", opacity: "1"}, 1200, function () {
        $(".Invitation_button").animate({opacity: "1"}, 500, function () {
            $(".swiper-container .goback").fadeIn(500)
        })
    })
});
$(".Notice-header h2").each(function () {
    font_length(14, $(this))
});
$("#cat_li").each(function () {
    font_length(4, $(this))
});
$(".pic-opa-title").each(function () {
    font_length(18, $(this))
});
$(".end_time").each(function () {
    var maxwidth = 15;
    if ($(this).text().length > maxwidth) {
        $(this).text($(this).text().substring(0, maxwidth))
    }
});
function font_length(a, b) {
    var maxwidth = a;
    if ($(b).text().length > maxwidth) {
        $(b).text($(b).text().substring(0, maxwidth));
        $(b).html($(b).html() + "...")
    }
}

$(".Notice_body").not(".Invitation,.check_meeting").each(function () {
    $(this).css({width: "100%", height: "auto"});
    $(this).find("p").css({width: "100%", height: "auto"});
    $(this).find("img").css({width: "100%", height: "auto"});
    $(this).find("div").css({width: "100%", height: "auto"});
    $(this).find("table").css({width: "100%", height: "auto"})
});
var a = $("html").height();
var b = $(".Notice-header").height();
var tabsSwiper = new Swiper(".swiper-container", {
    speed: 500, onSlideChangeStart: function (index) {
        if (index.activeIndex == $(".Notice_body").length - 1) {
            $(".click_submit").css("display", "block").parent().fadeIn(800);
            $(".swiper-button-prev").hide();
            $(".swiper-button-next").hide();
            $("body").height("100%")
        }
        else {
            $(".click_submit").css("display", "none").parent().fadeOut(900);
            $(".swiper-button-prev").show();
            $(".swiper-button-next").show()

        }
        $(".Notice_body").animate({scrollTop: 0}, 300)
    }
});
$(".button_div").on("click", this, function (e) {
    var s = $(this).index() + 1;
    tabsSwiper.slideTo(s, 1000, false);
    if (s == $(".Notice_body").length - 1) {
        $(".click_submit").css("display", "block").parent().fadeIn(1000);
        $("body").height("100%")
    }
});
$(".click_submit").on("click", function () {
    if ($("input[type=hidden][name=price]").length == 0 || $("input[name=ticketNum]").length == 0) {
        alert("您还没有选择价格哦!");
        return false
    } else {
        $("#price_form").submit()
    }
});
$(".ul_left").find("li:last-child").removeClass("hidden-md hidden-sm hidden-xs");
$(".meeting_Notice .ul_left").find("li:last-child").text("通知");
$(".meeting_date .ul_left").find("li:last-child").text("日程");
$(".meeting_people .ul_left").find("li:last-child").text("嘉宾");
$(".swiper-container").css({height: "100%"});
$(".number").on("click", "i", function () {
    var y = $(this).text();
    var x = $(this).parents(".check");
    var z = $(this).parents("setion").siblings();
    var orderprices = x.find(".price").val();
    var returnprice = x.find(".return_price").attr("data-return");
    var number = $(this).parent(".number").find(".priceNumber").val();
    var sign = x.find(".price").attr("data-sign");
    x.find("input[type=hidden][class=price]").attr("name", "price");
    x.find("input[type=text]").attr("name", "ticketNum");
    z.each(function () {
        $(this).find(".sums_price").text(sign + $(this).find("input[type=hidden][class=price]").val());
        $(this).find(".fanli").hide();
        $(this).find("input[type=text]").val("0").removeAttr("name");
        $(this).find("input[type=hidden][class=price]").removeAttr("name")
    });
    if (y == "+") {
        $(this).parent(".number").find(".priceNumber").val(parseInt(number) + 1);
        x.find(".sums_price").text(sign + orderprices * (parseInt(number) + 1));
        x.find(".fanli span").html("&lowast;付款后,你将获得" + returnprice * (parseInt(number) + 1) + "元现金奖励到你指定的支付宝账号").parent().show()
    } else {
        if (number > 1) {
            $(this).parent(".number").find(".priceNumber").val(parseInt(number) - 1);
            x.find(".sums_price").text(sign + orderprices * (parseInt(number) - 1));
            x.find(".fanli span").html("&lowast;付款后,你将获得" + returnprice * (parseInt(number) - 1) + "元现金奖励到你指定的支付宝账号").parent().show()
        } else {
            if (number == 1) {
                $(this).parent(".number").find(".priceNumber").val(parseInt(number) - 1);
                $(this).find(".fanli").hide();
                $("input[type=text]").removeAttr("name");
                $("input[type=hidden][class=price]").removeAttr("name");
                $(this).parent().parent().find(".fanli").hide()
            }
        }
    }
    $(".returnprice").val(returnprice * parseInt($(this).parent(".number").find(".priceNumber").val()))
});
$(".openText").on("click", function () {
    $(this).next(".price_text").show()
});
//$(".Notice_body").on("click", "img", function () {
//    $("body,html").on("touchmove", function (event) {
//        event.preventDefault();
//        return false
//    });
//    $("#pageContent").show();
//    $("#imageFullScreen").attr("src", $(this).attr("src"));
//    $("#imageFullScreen").smartZoom({"containerClass": "zoomableContainer"});
//    function zoomButtonClickHandler(e) {
//        var scaleToAdd = 0.8;
//        if (e.target.id == "zoomOutButton") {
//            scaleToAdd = -scaleToAdd
//        }
//        $("#imageFullScreen").smartZoom("zoom", scaleToAdd)
//    }
//});
//$("#pageContent").on("click", this, function () {
//    $("body,html").off();
//    $(this).hide()
//});
var but = $(".but_div").length;
if (but == 2) {
    $(".button_div").css({marginTop: "15%"});
    $(".button_divs").css({marginTop: "18%"})
} else if (but == 1) {
    $(".but_div").css({marginTop: "20%"});
    $(".button_divs").css({marginTop: "20%"})
} else {
    $(".button_div").css({marginTop: "10%"})
}