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
    //$(".signUpBody .price").on('click', function () {
    //    $(this).addClass("active").siblings().removeClass("active")
    //    $(".hide_price").val($(this).data("price"))
    //    $("#priceNumber").val(1)
    //    $(".total").text($(this).data('priceclass') + "" + $(this).data("price"))
    //    $(".priceExplain" + ($(this).index() + 1)).addClass("active").siblings().removeClass("active")
    //})
    //$(".ticketNumber .fa").on('click', function () {
    //    if ($(this).hasClass("fa-minus")) {
    //        if ($("#priceNumber").val() != 0) {
    //            $("#priceNumber").val($("#priceNumber").val() - 1)
    //        }
    //    } else {
    //        $("#priceNumber").val($("#priceNumber").val() - (-1))
    //    }
    //    $(".order-number").val($("#priceNumber").val());
    //    $(".total").text(priceClass + "" + (parseInt($(".hide_price").val()) * parseInt($("#priceNumber").val())))
    //})
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
    $('#shartQrcode').qrcode({width: 180, height: 180, text: window.location.href});
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
    $("#invoice").on('click', function () {
        if ($(this).is(":checked")) {
            $(".Invoice_div").show()
        } else {
            $(".Invoice_div").hide()
        }
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
    $(".submitForm").submit(function () {
        setTimeout(function () {
            $(".submitForm input[type=text]").popover('destroy')
        }, 1000)
        var filter = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        var option = {
            placement: "top",
            animation: "true",
            container: "body",
        }
        if ($.trim($("#customer_name").val()).length == 0) {
            option.content = "姓名不能为空"
            $("#customer_name").popover(option).popover('show')
            return false;
        } else {
            if (!(/^[\u4e00-\u9fa5 ]{2,20}|[a-zA-Z\/ ]{2,20}$/).test($.trim($("#customer_name").val()))) {
                option.content = "请输入正确的姓名"
                $("#customer_name").popover(option).popover('show')
                return false;
            }
        }
        if ($.trim($("#mobilphone").val()).length == 0) {
            option.content = "手机不能为空"
            $("#mobilphone").popover(option).popover('show')
            return false;
        } else {
            if (!(/^1[3-8]+\d{9}$/).test($('#mobilphone').val())) {
                option.content = "请输入正确的手机号"
                $("#mobilphone").popover(option).popover('show')
                return false;
            }
        }
        if ($.trim($("#captcha").val()).length == 0) {
            option.content = "验证码不能为空"
            $("#captcha").popover(option).popover('show')
            return false;
        } else {
            if($("#captcha").attr("data-captchaflag") == 'false'){
                option.content = "验证码错误"
                $("#captcha").popover(option).popover('show')
                return false;
            }
        }
        if ($.trim($("#email").val()).length == 0) {
            option.content = "邮箱不能为空"
            $("#email").popover(option).popover('show')
            return false;
        } else {
            if (!filter.test($('#email').val())) {
                option.content = "请输入正确的邮箱"
                $("#email").popover(option).popover('show')
                return false;
            }
            if($("#number").val()<=0){
                alert("请选择票价")
                return false;
            }else{
                $("#loading").show()
            }

        }
    })
    $(".orderForm input[type='text']").css({paddingLeft:"8px",height:"40px"})
    $(".orderForm div ").css({marginBottom:"15px"})
    $(".orderForm .post_daiding").on('click', function () {
        setTimeout(function () {
            $(".orderForm input[type=text]").popover('destroy')
        }, 1000)
        var filter = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        var option = {
            placement: "top",
            animation: "true",
            container: "body",
        }
        if ($.trim($("#customer_name").val()).length == 0) {
            option.content = "姓名不能为空"
            $("#customer_name").popover(option).popover('show')
            return false;
        } else {
            if (!(/^[\u4e00-\u9fa5 ]{2,20}|[a-zA-Z\/ ]{2,20}$/).test($.trim($("#customer_name").val()))) {
                option.content = "请输入正确的姓名"
                $("#customer_name").popover(option).popover('show')
                return false;
            }
        }
        if ($.trim($("#mobilphone").val()).length == 0) {
            option.content = "手机不能为空"
            $("#mobilphone").popover(option).popover('show')
            return false;
        } else {
            if (!(/^1[3-8]+\d{9}$/).test($('#mobilphone').val())) {
                option.content = "请输入正确的手机号"
                $("#mobilphone").popover(option).popover('show')
                return false;
            }
        }
        if ($.trim($("#captcha").val()).length == 0) {
            option.content = "验证码不能为空"
            $("#captcha").popover(option).popover('show')
            return false;
        } else {
            if($("#captcha").attr("data-captchaflag") == 'false'){
                option.content = "验证码错误"
                $("#captcha").popover(option).popover('show')
                return false;
            }
        }
        if ($.trim($("#email").val()).length == 0) {
            option.content = "邮箱不能为空"
            $("#email").popover(option).popover('show')
            return false;
        } else {
            if (!filter.test($('#email').val())) {
                option.content = "请输入正确的邮箱"
                $("#email").popover(option).popover('show')
                return false;
            }else {
                if ($('#company').val()=="") {
                    option.content = "请输入公司名称"
                    $("#company").popover(option).popover('show')
                    return false;
                }else {
                    if ($('#job').val()=="") {
                        option.content = "请输入职务名称"
                        $("#job").popover(option).popover('show')
                        return false;
                    }
                }
            }
        }
        var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
        $("#loading").show()
        $.ajax({
            url: "/post_message_json/",
            dataType: "json",
            type: "post",
            data: {
                csrfmiddlewaretoken: csrf.value,
                name: $("#customer_name").val(),
                email: $("#email").val(),
                phone: $(" #mobilphone").val(),
                event_id: $("#event_id_for_submit").val(),
                event_name: $("#event_name").val(),
                company: $("#company").val(),
                job: $("#job").val(),
            },
            success: function (data) {
                $("#loading").hide()
                if (data.code == 1) {
                    swal('提交成功，费用信息有更新我们会及时联系您。');
                    $(".confirm").click(function () {
                        window.location.reload();
                    })
                }
            }
        })

    })
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
//免费报名
$(".freeApply").click(function(){
    setTimeout(function () {
        $("#freeApplyForm input[type=text]").popover('destroy')
    }, 1000)
    var option = {
        placement: "top",
        animation: "true",
        container: "body",
    }
    var name=$("input[name='username']").val();
    var company=$("input[name='company']").val();
    var position=$("input[name='position']").val();
    var phone=$("input[name='phone']").val();
    var mail=$("input[name='mail']").val();
    var event_id=$("input[name='event_id']").val();
    var csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    if($.trim(name)!=""){
        if($.trim(phone).match(/0?(13|14|15|18|17)[0-9]{9}/)){
            if($.trim(company)!=""){
                if($.trim(position)!=""){
                    if($.trim(mail).match(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/)){
                        $.ajax({
                            url:"/spread/freesignup/",
                            dataType:"json",
                            type:"post",
                            async:false,
                            data:{
                                csrfmiddlewaretoken: csrf,
                                name:name,
                                event_id:event_id,
                                job:position,
                                phone:phone,
                                email:mail,
                                company:company
                            },
                            success: function(data){
                                if(data.code==1){
                                    swal('您好，您已成功申请。 请耐心等待主办方审核身份，审核通过后您将收到参会凭证。');
                                    $(".confirm").click(function () {
                                        window.location.reload();
                                    })
                                }else if(data.code==2){
                                    swal('请勿重复提交');
                                }else{
                                    swal("很抱歉，提交失败！")
                                }
                            }
                        });
                    }else{
                        option.content = "请输入正确的邮箱"
                        $("#mail").popover(option).popover('show')
                    }
                }else{
                    option.content = "职位不能为空"
                    $("#position").popover(option).popover('show')
                }
            }else{
                option.content = "公司不能为空"
                $("#company").popover(option).popover('show')
            }
        }else{
            option.content = "请输入正确的手机号码"
            $("#phone").popover(option).popover('show')
        }
    }else{
        option.content = "姓名不能为空"
        $("#username").popover(option).popover('show')
    }
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