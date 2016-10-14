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
    $(".headNav li").on('click', function () {
        var s = $("#" + $(this).data("plne")).offset().top - $(".headNav").height();
        $("html,body").animate({scrollTop: s})
    })
    $(".signUpBody .price").on('click', function () {
        $(this).addClass("active").siblings().removeClass("active")
        $(".hide_price").val($(this).data("price"))
        $("#priceNumber").val(1)
        $(".total").text($(this).data('priceclass') + "" + $(this).data("price"))
        $(".priceExplain" + ($(this).index() + 1)).addClass("active").siblings().removeClass("active")
    })
    $(".ticketNumber .fa").on('click', function () {
        if ($(this).hasClass("fa-minus")) {
            if ($("#priceNumber").val() != 0) {
                $("#priceNumber").val($("#priceNumber").val() - 1)
            }
        } else {
            $("#priceNumber").val($("#priceNumber").val() - (-1))
        }
        $(".order-number").val($("#priceNumber").val());
        $(".total").text(priceClass + "" + (parseInt($(".hide_price").val()) * parseInt($("#priceNumber").val())))
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
    $("#sideNavigationBar .barShopping").on("click", function () {
        var s = $("#signUp").offset().top - $(".headNav").height();
        $("html,body").animate({scrollTop: s})
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
            $.get('/countsubmit/',{tel:$("#mobilphone").val()})
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
                },
                success: function (data) {
                    $("#loading").hide()
                    if (data.code == 1) {
                        swal('提交成功，费用信息有更新我们会及时联系您。');
                    }
                }
            })

    })
});


//门票列表
var first_tr = null
$('.table_tr').each(function(ind){
    //give a first_tr
    if(ind==0){
        first_tr = $(this);
    }
    //hide the other price_intro
    if(ind>0){
        $(this).find('.price_intro').hide();
    }

    $(this).find('td').each(function(ind){
        if(ind<4){
            $(this).mouseenter(function(){
                $(this).parents('tr').css('background','#FAFAFA');
                $(this).parents('tr').find('.price_intro').css('background','white');
            });
            $(this).mouseout(function(){
                $(this).parents('tr').css('background','white');
                $(this).parents('tr').find('.price_intro').css('background','white');
            });
            //click select the radio
            $(this).click(function(){
                $(this).parents('tr').find(".quantitys").val('1');
                $(this).parents('tr').siblings().find(".quantitys").each(function(){$(this).val("0")});
                var sum_nums =$(this).parents('tr').find(".quantitys").find("option:selected").val();
                var orderprices =$(this).parents('tr').find(".price1").attr("data-price");
                var sign = $(this).parents('tr').find(".price1").attr("data-sign");
                var returnprice = $(this).parents('tr').find("td").eq(3).attr("data-return");
                var returnpricess=sign+returnprice*sum_nums;
                var total_return_cash = returnprice*sum_nums;
                var total_price = sign+orderprices*sum_nums;
                console.log(orderprices)
                $(".hide_price").val(orderprices);
                $(".order-number").val(sum_nums);
                $("#return_cash").val(total_return_cash);
                $("#number").attr("value",sum_nums)
                $("#money").attr("value",total_price)
                $(this).parents('tr').find('input[type=radio]').prop("checked","checked");
                $('.total_price_num').html("<span style='color:#666666;' style='font-family:microsoft yahei;font-size:20px;'>共"+sum_nums+"张，总计：</span>"
                    +"<span style='font-family:microsoft yahei;font-size:20px;color:red;'>"+total_price+".00</span>");



                $('.total_return_num').html("<span class='show_note glyphicon glyphicon-exclamation-sign' style='margin-right:10px;'>"
                    +"<span class='show_note_font text-left' style='font-family:microsoft yahei;color:#666666;font-size:12px;position:absolute;z-index:100;margin-left:-164px;margin-top:24px;width:283px;height:95px;padding-left:10px;padding-top:10px;border:1px solid #ccc;background:#fcfcfc;display:none;'>"
                    +"<p style='line-height:22px;'>支付成功后，客服会在2小时内与您确认参会人信息，届时请提供接收返现的支付宝账号给客服。</br>返现时间：一周内返现。</p>"
                    +    "</span>"
                    +"</span><font style='font-family:microsoft yahei;font-size:16px;color:#666666;line-height:40px;'>返现金额：</font><font style='color:red;color:#ff8004;'>"+returnpricess+".00</font>");
                if(returnpricess=='￥0'){
                    $('.total_return_num').hide();
                }else{
                    $('.total_return_num').show();
                }

                // $('.total_price_note').html("&lowast;付款后，你将获得<span style='font-family:microsoft yahei;font-size:20px;'>"+returnpricess+"元</span>现金奖励到你指定的支付宝账号");
                $('.total_price').show();
                //show price_intro
                $(".price_intro").html("说明："+$(this).parents('tr').find(".new_tooltip").text())
//                    first_tr.find('.price_intro').text($(this).parents('tr').find(".new_tooltip").text());
                //show note for price
                $('.show_note').mouseenter(function(){
                    $('.show_note_font').show();
                });
                //hide note for price
                $('.show_note').mouseout(function(){
                    $('.show_note_font').hide();
                });


            });

        }
    });
});
for(var i=0;i<11;i++){
    $(".quantitys").append("<option value='"+i+"'>"+i+"</option>")
}
// 限制购买人数
$(".quantitys").each(function(){
    var limit_num = $(this).parents('td').find('.limit_people').text();
    var limit_num = parseInt(limit_num);
    if(limit_num){
        $(this).html('');
        for(var i=limit_num;i<11;i++){
            $(this).append("<option value='"+i+"'>"+i+"</option>");
        }
    }
});
$(".mess_tbody tr").each(function(){
    var maxwidth=10;
    if($(this).find("td").eq(1).text().length>maxwidth){
        $(this).find("td").eq(1).text($(this).find("td").eq(1).text().substring(0,maxwidth));
    }
    var limit_people = $(this).find('#limit_people').val();

    if(limit_people!=undefined&&limit_people!=''){
        $(this).find('.quantitys').html('');
        for(var i=parseInt(limit_people);i<11;i++){

            $(this).find('.quantitys').append("<option value='"+i+"'>"+i+"</option>")
        }
    }

});
$(".table_tr").find(".quantitys").live("change", function () {
    $(".table_tr input[type=radio]").unbind("click");
    $(this).parent().parent().find("input[type=radio]").prop("checked","checked");
    $(this).parents('tr').siblings().find(".quantitys").each(function(){$(this).val("0")});

    var sum_nums =$(this).parent().parent().find(".quantitys").find("option:selected").val();
    var orderprices =$(this).parent().parent().find(".price1").attr("data-price");
    var sign = $(this).parent().parent().find(".price1").attr("data-sign");
    var returnprice = $(this).parent().parent().find("td").eq(3).attr("data-return");
    var returnpricess=sign+returnprice*sum_nums;
    var total_price = sign+orderprices*sum_nums;
    var total_return_cash = returnprice*sum_nums;
   $("#number").attr("value",sum_nums)
    $("#money").attr("value",total_price)
    //show price_intro
    $(".table_tr").eq(0).find('.price_intro').text($(this).parents('tr').find(".new_tooltip").text());

    $('.total_price').show();
    $('.total_price_num').html("<span style='color:#666666;font-family:microsoft yahei;font-size:20px;'>共"+sum_nums+"张，总计:</span>"
        +"<span style='font-family:microsoft yahei;font-size:24px;color:red;'>"+total_price+"元</span>");

    $('.total_return_num').html("<span class='show_note glyphicon glyphicon-exclamation-sign' style='margin-right:10px;'>"
        +"<span class='show_note_font text-left' style='display:none;font-family:microsoft yahei;color:#666666;font-size:12px;position:absolute;z-index:100;margin-left:-164px;margin-top:24px;width:283px;height:95px;padding-left:10px;padding-top:10px;border:1px solid #ccc;background:#fcfcfc;'>"
        +"<p style='line-height:22px;'>支付成功后，客服会在2小时内与您确认参会人信息，届时请提供接收返现的支付宝账号给客服。</br>返现时间：一周内返现。</p>"
        +    "</span>"
        +"</span><font style='font-family:microsoft yahei;font-size:16px;color:#666666;line-height:40px;'>返现金额：</font><font style='color:red;color:#ff8004;'>"+returnpricess+"</font>");

    if(returnpricess=='￥0'){
        $('.total_return_num').hide();
    }else{
        $('.total_return_num').show();
    }

    //show note for price
    $('.show_note').mouseenter(function(){
        $('.show_note_font').show();
    });
    //hide note for price
    $('.show_note').mouseout(function(){
        $('.show_note_font').hide();
    });

    $(".hide_price").val(orderprices);
    $(".order-number").val(sum_nums);
    $("#return_cash").val(total_return_cash);
    $(".table_tr").find(".quantitys").unbind("change");
});
$(".table_tr input[type='radio']:checked").live("change",function(){
    $(".sum").show();
    $(this).parents('tr').siblings().find(".quantitys").each(function(){$(this).val("0")});
    $(this).parent().parent().find(".quantitys").val("1");
    $(".table_tr input[type=radio]").attr("data-status","false");
    $(this).attr("data-status","true");
    var sum_nums =$(this).parent().parent().find(".quantitys").find("option:selected").val();
    var orderprices =$(this).parent().parent().find(".price").attr("data-price");
    var sign = $(this).parent().parent().find(".price").attr("data-sign");
    var returnprice = $(this).parent().parent().find("td").eq(3).attr("data-return");
    var returnpricess=sign+returnprice*sum_nums;

    $(".sum").show();
    $(".sum").find("td").eq(2).text(sign+orderprices*sum_nums);
    $(".sum").find("td").eq(3).text(sign+returnprice*sum_nums);
    $(".sum").find("td").eq(4).text(sum_nums);

    $(".hide_price").val(orderprices);
    $(".order-number").val(sum_nums);
    var fanli = returnprice*sum_nums;
    if(fanli==0){
        $(".fanli").css({
            display:"none"
        });
    }else{
        $(".fanli span").html("&lowast;付款后，你将获得"+returnpricess+"元现金奖励到你指定的支付宝账号").parent().show();
    }
    $(".table_tr").find(".quantitys").unbind("change");
});
