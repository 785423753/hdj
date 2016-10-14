//隐藏地址栏
window.onload=function(){
    if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
        bodyTag = document.getElementsByTagName('body')[0];
        bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
    }
    setTimeout(function() {
        window.scrollTo(0, 1)
    }, 0);
};

// 顶部图片轮播
//jQuery(function ($) {
//    $(".slide-pic>li:eq(0),.op>li:eq(0),.slide-txt>li:eq(0)").addClass("cur");
//    if ($(".slide-pic").length > 0) {
//        var defaultOpts = { interval: 5000, fadeInTime: 300, fadeOutTime: 200 };
//        var _titles = $("ul.slide-txt li");
//        var _titles_bg = $("ul.op li");
//        var _bodies = $("ul.slide-pic li");
//        var _count = _titles.length;
//        var _current = 0;
//        var _intervalID = null;
//        var stop = function () { window.clearInterval(_intervalID); };
//        var slide = function (opts) {
//            if (opts) {
//                _current = opts.current || 0;
//            } else {
//                _current = (_current >= (_count - 1)) ? 0 : (++_current);
//            };
//            _bodies.filter(":visible").fadeOut(defaultOpts.fadeOutTime, function () {
//                _bodies.eq(_current).fadeIn(defaultOpts.fadeInTime);
//                _bodies.removeClass("cur").eq(_current).addClass("cur");
//            });
//            _titles.removeClass("cur").eq(_current).addClass("cur");
//            _titles_bg.removeClass("cur").eq(_current).addClass("cur");
//        };
//        var go = function () {
//            stop();
//            _intervalID = window.setInterval(function () { slide(); }, defaultOpts.interval);
//        };
//        var itemMouseOver = function (target, items) {
//            stop();
//            var i = $.inArray(target, items);
//            slide({ current: i });
//        };
//        _titles.hover(function () { if ($(this).attr('class') != 'cur') { itemMouseOver(this, _titles); } else { stop(); } }, go);
//        _bodies.hover(stop, go);
//        go();
//    }
//});


$(".pic-opa-title").each(function(){
    var maxwidth=20;
    if($(this).text().length>maxwidth){
        $(this).text($(this).text().substring(0,maxwidth));
        $(this).html($(this).html()+'...');
    }
});
$("#list_con .list_seachs").click(function(){
    $(".list-seacher").slideToggle();
});


$(".click_submit").on('click','a', function () {
    if($("input[type=hidden][name=price]").val==""||$("input[type=hidden][name=number]").val=="0"){
        alert("您还没有选择价格哦!")
    }else{
        $("#price_form").submit()
    }
});
$(".number").on('click','i', function () {
    var y=$(this).text();
    var x=$(this).parents(".check");
    var z=$(this).parents("setion").siblings();
    var orderprices =x.find(".price").val();
    var returnprice = x.find(".return_price").attr("data-return");
    var number=$(this).parent(".number").find("#number").val();
    var sign =x.find(".price").attr("data-sign");
    x.find("input[type=hidden][class=price]").attr("name","price");
    x.find("input[type=text]").attr("name","ticketNum");
    z.find(".sums_price").text(sign+z.find("input[type=hidden][class=price]").val());
    z.find("input[type=text]").val("0").removeAttr("name");
    z.find("input[type=hidden][class=price]").removeAttr("name");
    if(y=="+"){
        $(this).parent(".number").find("#number").val(parseInt(number)+1)
    }else{
        if(number>0){
            $(this).parent(".number").find("#number").val(parseInt(number)-1)
        }else if(number==0){
            x.find("input[type=text]").removeAttr("name");
            x.find("input[type=hidden][class=price]").removeAttr("name");
        }
    }
    var sum_nums =$(this).parent(".number").find("#number").val();
    var returnpricess=sign+returnprice*sum_nums;
    $(".order-number").val(sum_nums);
    $(".hide_price").val(orderprices);
    $(".returnprice").val(returnprice);
    if(sum_nums==0) {
        $(this).parent().parent().find(".fanli").hide();
    }else{
        x.find(".sums_price").text(sign+orderprices*sum_nums);
        $(".fanli").hide();
        if(returnprice){
            x.find(".fanli span").html("&lowast;付款后，你将获得"+returnpricess+"元现金奖励到你指定的支付宝账号").parent().show();
        }
    }

});
$(".openText").on('click', function () {
    $(this).next(".price_text").show();
});

/*
 表单验证
 */
$("#name").blur(function () {
    var user_name=$.trim($(".user_name").val());
    if(user_name.length==0){
        $(".user_name").css({border:"1px solid red"}).attr("data-judge","false")
    }else{
        $(".user_name").css({border:"1px solid rgb(216, 216, 216)"}).attr("data-judge","true")
    }
});
$("#mobilphone").blur(function () {
    var phone=$.trim($(".mobilphone").val());
    if(phone.length==0|| !(/^1[3-8]+\d{9}$/).test(phone)){
        $(".mobilphone").css({border:"1px solid red"}).attr("data-judge","false")
    }else{
        $(".mobilphone").css({border:"1px solid rgb(216, 216, 216)"}).attr("data-judge","true")
    }
});
$("#captcha").blur(function () {
    var captcha=$.trim($(".captcha").val());
    if(captcha.length!=4){
        $("#captcha").css({border:"1px solid red"}).attr("data-judge","false")
    }else{
        var phone=$.trim($(".mobilphone").val());
        var url="/m/verify_tel_captcha/";
        $.post(url,{mobilphone:phone,captcha:captcha}, function (data) {
            var flag=jQuery.parseJSON(data).flag;
            if(flag==true){
                $("#captcha").css({border:"1px solid rgb(216, 216, 216)"}).attr("data-judge","true")
            }else{
                $("#captcha").css({border:"1px solid red"}).attr("data-judge","false")
            }
        })
    }
});
$("#email").blur(function () {
    var email=$.trim($(".email").val());
    var filter =/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if(email.length==0||!filter.test(email)){
        $(".email").css({border:"1px solid red"}).attr("data-judge","false")
    }else{
        $(".email").css({border:"1px solid rgb(216, 216, 216)"}).attr("data-judge","true")
    }
});

$(".submit_indent").bind('click',function () {
    var captcha=$.trim($(".captcha").val());
    var user_name=$.trim($(".user_name").val());
    var email=$.trim($(".email").val());
    var phone=$.trim($(".mobilphone").val());
    var filter =/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    var url="/m/verify_tel_captcha/";
    if(user_name.length==0){
        alert("请输入联系人姓名！");
    }else if(phone.length==0 ){
        alert("请输入手机号码！");
    }else if(!(/^1[3-8]+\d{9}$/).test(phone)){
        alert("手机号码格式不正确！");
    }else if(captcha==0){
        alert("请输入验证码！");
    }
    else if(email.length==0){
        alert("请输入您的邮箱！");
    }else if(!filter.test(email)){
        alert("您的邮箱格式错误！");
    }
    $.post(url,{mobilphone:phone,captcha:captcha}, function (data) {
        var flag=jQuery.parseJSON(data).flag;
        if(flag==false||captcha.length!=4){
            alert("验证码错误！");
            return false;
        }
        else{
            $(".indent_submit").submit();
            return true;
        }
    });
});

$(".TestGetCode").bind('click',function () {
    var phone=$.trim($(".mobilphone").val());
    if(phone.length==0 ){
        alert("请输入手机号码！");
    }else if(!(/^1[3-8]+\d{9}$/).test(phone)){
        alert("手机号码格式不正确！");
    }
    if ($(this).attr("disabled")!="disabled") {
        var dateObj,s="";
        dateObj = new Date();
        s+=dateObj.getFullYear();
        s+=dateObj.getMonth()+1;
        s+=dateObj.getDate();
        s+=dateObj.getHours();
        s+=dateObj.getMinutes();
        s+=dateObj.getSeconds();
        var set, i = 300;
        var url = "/m/send_check_mesage/";
        var tel = $.trim($(".mobilphone").val());
        if (tel != "" && (/^1[3-8]+\d{9}$/).test(tel)) {
            $.get(url, {"tel": tel,"time":s}, function (data) {
                set = setInterval(function () {
                    $(".TestGetCode").text(i + "秒后重发");
                    $(".TestGetCode").attr({disabled: "disabled"});
                    $(".TestGetCode").css({backgroundColor:"#a8a8a8"});
                    i--;
                    if (i < 0) {
                        clearInterval(set);
                        $(".TestGetCode").text("重新发送");
                        $(".TestGetCode").removeAttr("disabled");
                        $(".TestGetCode").css({backgroundColor:"#646464"})
                    }
                }, 1000)
            })
        } else {
            $("#mobilphone").css({border:"1px solid red"});
            $("#mobilphone").focus()
        }
        return false
    }
});
$(".alipy .alipys").eq(0).css({border:"1px solid #F93"}).attr("data-judge","true");
$(".alipy .alipys").click(function(){
    $(this).css({border:"1px solid #F93"}).attr("data-judge","true").siblings().css({border:"1px solid #ddd"}).attr("data-judge","false")
});
function validate(){
    $('.myForm').submit();
}

$(window).scroll(function () {
    if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
        cat = $("#list_con .meeting").attr("data-cat");
        city = $("#list_con .meeting").attr("data-city");
        page = $("#list_con .meeting").attr("data-page");
        offset = $("#list_con .meeting").attr("data-offset");
        len_list = parseInt($("#list_con .meeting").attr("data-len-list"));
        if (offset > 0 && offset == len_list) {
            new_page = (parseInt(page) + 1).toString();
            $.ajax({
                type: "GET",
                url: "/m/list_ajax/" + city + "/" + cat + "/?page=" + new_page,
                cache: false,
                success: function (json) {
                    $("#list_con .meeting").attr("data-page", new_page);
                    if (json && json.code == 1 && json.list.length > 0) {
                        $("#list_con .meeting").attr("data-offset", offset);
                        for (var pid in json.list) {
                            html_str = "";
                            html_str += '<dl><dt>';
                            html_str += '<a href="/m/event-' + json.list[pid].event_id + '.html?invitation=1">';
                            html_str += '<img src="' + json.list[pid].event_img + '"  alt="' + json.list[pid].event_name + '" ></a></dt>';
                            html_str += '<dd>';
                            html_str += '<a href="/m/event-' + json.list[pid].event_id + '.html?invitation=1"><h3 class="pic-opa-title" >' + json.list[pid].event_name + "</h3></a>";
                            event_time = json.list[pid].event_begin_time;
                            price = json.list[pid].price;
                            html_str += '<label class="home-time">' + event_time + "&nbsp;|</label>";
                            html_str += '<label class="home-city"><a href="/' + json.list[pid].district_title + '/" style="color: #4d4d4d">' + json.list[pid].district_name + "</a>" + json.list[pid].event_venue + " " + json.list[pid].event_address + "</label>";
                            html_str += '<span class="home-home-money " >' + price + "</span>";
                            html_str += "</dd></dl>";
                            $("#list_con .meeting").append(html_str)
                        }
                    } else {
                        $("#list_con .meeting").attr("data-offset", 0)
                    }
                }
            })
        }
    }
});


$(".open").on("click", function () {
    $(this).parent().find(".content").slideToggle();
});


