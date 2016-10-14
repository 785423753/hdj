window.onload = function () {
    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
        bodyTag = document.getElementsByTagName("body")[0];
        bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + "px"
    }
    setTimeout(function () {
        window.scrollTo(0, 1)
    }, 0);
    var u = navigator.userAgent;
    $("#down").on("click", function () {
        if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
            window.location.href = "http://app.mi.com/detail/64258";
            window.location = "http://www.huodongjia.com/theme/qrcodedownload.html";
        }
        else if(u.indexOf("iPhone") > -1){
                window.location.href = "https://itunes.apple.com/cn/app/da-huo-dong/id731753448?l=en&amp;mt=8";
                window.location = "http://www.huodongjia.com/theme/qrcodedownload.html";
        }
        else{
            window.location = "http://www.huodongjia.com/theme/qrcodedownload.html";
        }
    });
    $("#down_app").on("click", function () {
        if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
            $(this).find("a").attr("href", "http://app.mi.com/detail/64258");
             window.location = "http://www.huodongjia.com/theme/qrcodedownload.html";
        }
        else if(u.indexOf("iPhone") > -1){
            window.location.href = "https://itunes.apple.com/cn/app/da-huo-dong/id731753448?l=en&amp;mt=8";
            window.location = "http://www.huodongjia.com/theme/qrcodedownload.html";
        }
        else{
            window.location = "http://www.huodongjia.com/theme/qrcodedownload.html";
        }
    })
};
//var flag = 1;
//$(".header_list").on("click", function () {
//    if(flag==1){
//        $(".hidden-div").animate({
//            top:"45px"
//        },300);
//            $(".xiala").css({
//                'transform':'rotate(-180deg)',
//                '-webkit-transform':'rotate(-180deg)'
//            });
//    flag = 0;
//        //$(".list-seacher").slideUp();
//    }else{
//        $(".hidden-div").animate({
//            top:"-46px"
//        },300);
//        $(".xiala").css({
//            'transform':'rotate(0deg)',
//            '-webkit-transform':'rotate(0deg)'
//        });
//        flag = 1;
//    }
//
//});
//$(".hidden-div td").find("a").on("click", function () {
//    $(this).parent().css({backgroundColor:"#fbe623"})
//});
$(".header_seachs").click(function () {
    //$(".hidden-div").animate({
    //    top:"-46px"
    //},300);
    //$(".xiala").css({
    //    'transform':'rotate(0deg)',
    //    '-webkit-transform':'rotate(0deg)'
    //});
    //$(".list-seacher").slideToggle();
    //flag = 1;
});

$(".meeting").on("click", function (event) {
    var hrefs = $(this).attr("data-href");
    event.stopPropagation();
    window.location.href = "/event-" + hrefs + ".html"
});
$("#open_down .close").on("click", function () {
    $(this).parent().hide()
});
$("#home_con .search").focus(function () {
    $(this).val("")
});
$("#home_con .search").blur(function () {
    if ($(this).val().length == 0) {
        $(this).val("请输入关键词")
    }
});
$("#home_con .pic-opa-title").each(function () {
    font_length(18, $(this))
});
$("#list_con .pic-opa-title").each(function () {
    font_length(20, $(this))
});
$(".home-city a").each(function () {
    font_length(4, $(this))
});
$("#pic-opa-titles").each(function () {
    font_length(21, $(this))
});
$(".meeting-active  li a").each(function () {
    var maxwidth = 4;
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
$("#name").blur(function () {
    var user_name = $.trim($(".user_name").val());
    if (user_name.length == 0) {
        $(".user_name").css({border: "1px solid red"}).attr("data-judge", "false")
    } else {
        $(".user_name").css({border: "1px solid rgb(216, 216, 216)"}).attr("data-judge", "true")
    }
});
$("#mobilphone").blur(function () {
    var phone = $.trim($(".mobilphone").val());
    if (phone.length == 0 || !(/^1[3-8]+\d{9}$/).test(phone)) {
        $(".mobilphone").css({border: "1px solid red"}).attr("data-judge", "false")
    } else {
        $(".mobilphone").css({border: "1px solid rgb(216, 216, 216)"}).attr("data-judge", "true")
    }
});
$("#captcha").blur(function () {
    var captcha = $.trim($(".captcha").val());
    if (captcha.length != 4) {
        $("#captcha").css({border: "1px solid red"}).attr("data-judge", "false")
    } else {
        var phone = $.trim($(".mobilphone").val());
        var url = "/verify_tel_captcha/";
        $.post(url, {mobilphone: phone, captcha: captcha}, function (data) {
            var flag = jQuery.parseJSON(data).flag;
            if (flag == true) {
                $("#captcha").css({border: "1px solid rgb(216, 216, 216)"}).attr("data-judge", "true")
            } else {
                $("#captcha").css({border: "1px solid red"}).attr("data-judge", "false")
            }
        })
    }
});
$("#email").blur(function () {
    var email = $.trim($(".email").val());
    var filter = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (email.length == 0 || !filter.test(email)) {
        $(".email").css({border: "1px solid red"}).attr("data-judge", "false")
    } else {
        $(".email").css({border: "1px solid rgb(216, 216, 216)"}).attr("data-judge", "true")
    }
});
$(".submit_indent").bind("click", function () {
    var captcha = $.trim($(".captcha").val());
    var user_name = $.trim($(".user_name").val());
    var email = $.trim($(".email").val());
    var phone = $.trim($(".mobilphone").val());
    var filter = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    var url = "/verify_tel_captcha/";
    $.post(url, {mobilphone: phone, captcha: captcha}, function (data) {
        var flag = jQuery.parseJSON(data).flag;
        if (user_name.length == 0) {
            alert("请输入联系人姓名！");
            return false
        } else {
            if (phone.length == 0) {
                alert("请输入手机号码！");
                return false
            } else {
                if (!(/^1[3-8]+\d{9}$/).test(phone)) {
                    alert("手机号码格式不正确！");
                    return false
                } else {
                    if (captcha == 0) {
                        alert("请输入验证码！");
                        return false
                    } else {
                        if (email.length == 0) {
                            alert("请输入您的邮箱！");
                            return false
                        } else {
                            if (!filter.test(email)) {
                                alert("您的邮箱格式错误！");
                                return false
                            } else {
                                if (flag == false || captcha.length != 4) {
                                    alert("验证码错误！")
                                } else {
                                    $(".indent_submit").submit();
                                    return true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
});
$(".TestGetCode").bind("click", function () {
    var phone = $.trim($(".mobilphone").val());
    if (phone.length == 0) {
        alert("请输入手机号码！")
    } else {
        if (!(/^1[3-8]+\d{9}$/).test(phone)) {
            alert("手机号码格式不正确！")
        }
    }
    if ($(this).attr("disabled") != "disabled") {
        var dateObj, s = "";
        dateObj = new Date();
        s += dateObj.getFullYear();
        s += dateObj.getMonth() + 1;
        s += dateObj.getDate();
        s += dateObj.getHours();
        s += dateObj.getMinutes();
        s += dateObj.getSeconds();
        var set, i = 300;
        var url = "/send_check_mesage/";
        var tel = $.trim($(".mobilphone").val());
        if (tel != "" && (/^1[3-8]+\d{9}$/).test(tel)) {
            $.get(url, {"tel": tel, "time": s}, function (data) {
                set = setInterval(function () {
                    $(".TestGetCode").text(i + "秒后重发");
                    $(".TestGetCode").attr({disabled: "disabled"});
                    $(".TestGetCode").css({backgroundColor: "#E9E9E9"});
                    i--;
                    if (i < 0) {
                        clearInterval(set);
                        $(".TestGetCode").text("重新发送");
                        $(".TestGetCode").removeAttr("disabled");
                        $(".TestGetCode").css({backgroundColor: "#E9E9E9"})
                    }
                }, 1000)
            })
        } else {
            $("#mobilphone").css({border: "1px solid red"});
            $("#mobilphone").focus()
        }
        return false
    }
});
$(".alipy .alipys").eq(0).css({border: "1px solid #F93"}).attr("data-judge", "true");
function validate() {
    $(".myForm").submit()
}
$(".open").on("click", function () {
    $(this).parent().find(".content").slideToggle()
});