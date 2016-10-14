/**
 * Created by Administrator on 2015/10/17 0017.
 */
$(function ($) {
    $(".hide_price").val($(".price:eq(0)").data("price"))
    var priceClass = $(".signUpBody .price[class *=active]").data('priceclass');
    $(".total").text(priceClass + "" + (parseInt($(".hide_price").val()) * parseInt($("#priceNumber").val())))
    $(".headNav").parent(".navSpeak").height($(".headNav").height())
    if ($.browser.msie && ($.browser.version <= "8.0")) {
        var nav_offset = $(".navBody").offset();
        $(window).scroll(function () {
            $(".barQrcodeHide").hide()
            var body_scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (body_scrollTop > nav_offset.top) {
                $(".navBody").css({top: body_scrollTop});
            } else if (body_scrollTop < nav_offset.top) {
                $(".navBody").removeAttr("style");
            }
        });
    } else {
        var nav_offset = $(".navBody").offset();
        $(window).scroll(function () {
            $(".barQrcodeHide").hide()
            var body_scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (body_scrollTop > nav_offset.top) {
                $(".navBody").css({position: "fixed", top: "0px"})
            } else if (body_scrollTop < nav_offset.top) {
                $(".navBody").removeAttr("style")
            }
        });
    }
    function userPopup(s) {
        $("#userPopupMain").show();
        $("#usercenterPopup").show().find("input").val("");
        var main = $("#usercenterPopup"), aTop = $(window).scrollTop(), aLeft = $(window).width();
        var imagesObj = {
            error: "http://pic.huodongjia.com/static/images/cuowu.png",
            success: "http://pic.huodongjia.com/static/images/chenggong.png"
        }
        $(".popupImages").attr({src: imagesObj[s.images]});
        $(".popupTitle").html(s.title);
        $(".popupTips").html(s.tips);
        $(".popupForm").hide()
        $(".popupTop").show()
        if(s.buttonUrl){
            $(".queding").attr({href: s.buttonUrl});
        }else{
            $("#usercenterPopup a").on('click', function () {
                $("#userPopupMain").hide();

                main.hide();
                main.find("*").removeAttr("style");
            })
        }
        main.css({top: (aTop + ($(window).height() / 2)) - (main.height() / 2), left: (aLeft - main.width()) / 2})
    }
    $("#userPopupMain .fa-times").on('click', function () {
        $("#userPopupMain").hide();
    })
    $(".headNav li").on('click', function () {
        var s = $("#" + $(this).data("plne")).offset().top - $(".headNav").height();
        $("html,body").animate({scrollTop: s})
    })
    $("#sideNavigationBar .barBarkTop").on('click', function () {
        $("html,body").animate({scrollTop: "0px"})
    })
    $("#sideNavigationBar .barQrcode").hover(function () {
        var pos = $(this).offset();
        $(".barQrcodeHide").css({top: pos.top + 10, left: pos.left - 193}).show()
    }, function () {
        $(".barQrcodeHide").hide()
    })
    $("#sideNavigationBar .collection").one('click', function () {
        var $this=$(this)
        $.ajax({
            url:"/usercenter/collect/",
            type:"get",
            data:{old_event_id:$(this).data("id")},
            success: function (data) {
                var s=eval("("+data+")")
                var option;
                if(s.code == "1"){
                    $.ajax({
                        url:"/usercenter/recommend/",
                        type:"get",
                        success: function (data) {
                            var s = eval("("+data+")").share_events
                            var _html="";
                            for(var i=0;i<3;i++){
                                _html += '<div> <a href="/event-'+s[i].event_id+'.html">' +
                                    '<img width="110px" height="70px" src="'+s[i].event_img+'" alt="'+s[i].event_name+'"/> ' +
                                    '<p>'+s[i].event_name+'</p> ' +
                                    '</a></div>'
                            }
                            _html+="<div style='clear: both;'></div>"
                            $("#userPopupMain .popupTuijian").html(_html)
                        }
                    })
                    option={
                        images:"success",
                        title:"收藏成功",
                        tips:"你已收藏<span style='color:#e64d52'>"+$this.data("name")+"</span>,<a style='color: #3290F5;text-decoration: underline;' href='/usercenter/index/?ind=showcollection'>去看看</a>"
                    }
                    $("#sideNavigationBar .collection").addClass("collections").html(" <span></span>已收藏").removeClass("collection")
                }else if(s.code == "2"){
                    option={
                        images:"error",
                        title:"收藏失败",
                        tips:"你已收藏过这个会议,<a href='/usercenter/index/?ind=showcollection'>去看看</a>"
                    }
                }
                userPopup(option)
            }
        })
    })
    $("#sideNavigationBar .barShopping").on("click", function () {
        if($(".signUp1 a").attr("href")){
            window.location.href = $(".signUp1").find("a").attr("href")
        }else{
            var s = $("#signUp").offset().top - $(".headNav").height();
            $("html,body").animate({scrollTop: s})
        }
    })

        $('#shartQrcode').qrcode({width: 180, height: 180, text: window.location.href,render:"table"});
        $("#sideNavigationBar .barShare").hover(function () {
        var pos = $(this).offset();
        $(".barShareHide").css({top: pos.top + 10, left: pos.left - 200}).show()
    }, function () {
        $(".barShareHide").hide()
    })
    $(".priceMore").on('click', function () {
        $(".price").show()
        $(this).hide()
    })
    $("#mobilphone").on('blur', function () {
        if($.trim($("#customer_name").val()).length == 0&&(/^1[3-8]+\d{9}$/).test($('#mobilphone').val())){
            $.get('/countsubmit/',{tel:$("#mobilphone").val(),times:new Date().getTime()})
        }
    })
    // $(".orderFormSubmit button").submit(function () {
    $("#captcha").on('blur', function () {
        var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
        var captcha = $("#captcha").val();
        var submitflag = true;
        $.ajax({
            url: "/verify_captcha/",
            dataType: "json",
            type: "post",
            async: false,
            data: {
                csrfmiddlewaretoken: csrf.value,
                captcha: captcha
            },
            success: function (data) {
                if (data.flag == 'false') {
                    $("#captcha").attr({"data-captchaflag":false})
                    $("#cap_img").click()
                }else{
                    $("#captcha").attr({"data-captchaflag":true})
                }
            }
        });
    })

    $(".orderForm input[type='text']").css({paddingLeft:"8px",height:"40px"})
    $(".orderForm div ").css({marginBottom:"15px"})

});

//限制购买人数
$(".mess_table tbody tr ").each(function (index) {

    var limit_people = $(this).find('.limit_people').text();
    if(limit_people){
        $(this).find(".quantitys").html("");
        for(var i=parseInt(limit_people);i<11;i++){
            $(this).find(".quantitys").append("<option value='"+i+"'>"+i+"</option>")
        }
    }else{
        $(this).find(".quantitys").html("");
        for(var i=0;i<11;i++){
            $(this).find(".quantitys").append("<option value='"+i+"'>"+i+"</option>")
        }
    }
});

$(".mess_tbody tr").on('click', function () {
    var $this = $(this)
    $this.find("input[type='radio']").prop("checked",true);
    $this.find("select option[value=0]").remove();
    if($this.find("select option[value=0]").length==0){
        $this.siblings().find("select").append("<option value='0'>0</option>")
    }
    $this.siblings().find("select").val("0");
    var sum_nums = $this.find("select").val();
    var thisPrice = $this.find(".price1").data("price");
    var thisPriceType =$this.find(".price1").data("sign");
    var returnPrice = $this.find(".price_return").data("return");
    if($.trim($this.find(".new_tooltip p").html()).length!=0){
        $(".price_intro").html("说明:"+$(this).find(".new_tooltip p").html())
    }
    $(".returnPrice span:eq(1)").text(thisPriceType+""+(sum_nums*returnPrice).toFixed(2))
    $(".priceNumber").text(sum_nums)
    $(".priceZhongji").text(thisPriceType+""+(sum_nums*thisPrice).toFixed(2))
    if(returnPrice){
        $(".total_return_num").show()
    }
    $(".total_price").show()
    $("#number").attr("value",sum_nums)
    $("#money").attr("value",thisPrice)
})
$(".show_note").hover(function () {
    var s = $(this).position()
    $(".show_note_font").css({left:s.left,top: s.top}).show()
}, function () {
    $(".show_note_font").hide()
})
function testAuto(thisId, needLeng) {
    console.log(thisId)
    for(var i=0;i<thisId.length;i++){
        var nowLeng = thisId.eq(i).html().length;
        if (nowLeng > needLeng) {
            var nowWord = thisId.eq(i).html().substr(0, needLeng) + '...';
            thisId.eq(i).html(nowWord);
        }
    }
}
testAuto($("#userPopupMain .popupTuijian p"),14)
