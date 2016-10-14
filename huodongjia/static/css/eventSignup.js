﻿/**
 * Created by Administrator on 2015/12/26 0026.
 */
$('input,textarea').placeholder();
$("label[for='invoice']").click(function () {
    if($("#invoice").attr("checked")=="checked"){
        $(".invoice").slideDown(200)
    }else{
        $(".invoice").slideUp(200)
    }
})
$(".ways li span").click(function () {
    $(".ways li span").removeClass("active")
    $(this).addClass("active")
    var val=$(this).parent().attr("title"),ways=$(this).parent().attr("lang")
    $("#payway").val(val)
    $('#ways').val(ways)
});
//清空银行
$(".ways li span").each(function (index) {
    if(index !=2 ){
        $(this).click(function(){
            $('#bank').val('');
        });
    }
});
//验证
$("#checkcode").on('blur', function () {
    var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
    var captcha = $("#checkcode").val();
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
                $("#checkcode").attr({"data-captchaflag":false})
                $("#cap_img").click()
            }else{
                $("#checkcode").attr({"data-captchaflag":true})
            }
        }
    });
})

//    表单
$("#save").click(function () {
    $('#ways').val($('.active').parent().attr('lang'))
    var filter = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    setTimeout(function () {
        $("#ApplyForm input").popover('destroy')
    }, 1000)
    var option = {
        placement: "top",
        animation: "true",
        container: "body",
    }
    if ($.trim($("#name").val())=="") {
        option.content = "姓名不能为空"
        $("#name").popover(option).popover('show')
    }else if(!(/^[\u4e00-\u9fa5 ]{2,20}|[a-zA-Z\/ ]{2,20}$/).test($.trim($("#name").val()))){
        option.content = "请输入正确的姓名"
        $("#name").popover(option).popover('show')
    }else if(!(/^1[3-8]+\d{9}$/).test($.trim($('#phone').val()))){
        option.content = "请输入正确的手机号"
        $("#phone").popover(option).popover('show')
    }else if(!(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/).test($('#email').val())){
        option.content = "请输入正确的邮箱"
        $("#email").popover(option).popover('show')
    }else if($("#checkcode").attr("data-captchaflag") == 'false'){
        option.content = "验证码错误"
        $("#checkcode").popover(option).popover('show')
    }else if($("#invoice").attr("checked")=="checked"){
         if($("#invoice_title").val()==""){
             option.content = "发票抬头不能为空"
             $("#invoice_title").popover(option).popover('show')
         }else if($("#email_addr").val()==""){
             option.content = "邮寄地址不能为空"
             $("#email_addr").popover(option).popover('show')
         }else{
             $("#ApplyForm").hide(100)
             $(".linkman").show(100)
             $(".change").show()
             $(".form_title").css({textAlign:"left"})
             $(".link_name label").html($.trim($("#name").val()))
             $(".link_email label").html($.trim($("#email").val()))
             $(".link_phone label").html($.trim($("#phone").val()))
             $(".username").attr("value",$.trim($("#name").val()))
             $(".email").attr("value",$.trim($("#email").val()))
             $(".phonenumber").attr("value",$.trim($("#phone").val()))
             $(".pay").attr("value",$.trim($("#payway").val()))
              $(".company").attr("value",$.trim($("#company").val()))
            $(".job").attr("value",$.trim($("#job").val()))
            $(".mark").attr("value",$.trim($("#mark").val()))
            $(".invoice").attr("value","1")
            $(".invoice_title").attr("value",$.trim($("#invoice_title").val()))
            $(".invoice_addr").attr("value",$.trim($("#email_addr").val()))
             if($.trim($("#company").val)!=""){
                 $(".link_company label").html($.trim($("#company").val()))
             }
             if($.trim($("#job").val())!=""){
                 $(".link_job label").html($.trim($("#job").val()))
             }
             if($.trim($("#mark").val())!=""){
                 $(".link_mark label").html($.trim($("#mark").val()))
             }
                 $(".link_email_addr,.link_invoice_title").show()
             $(".Hide").hide()
             $(".link_invoice_title label").html($.trim($("#invoice_title").val()))
             $(".link_email_addr label").html($.trim($("#email_addr").val()))
         }
    }else{
        $("#ApplyForm").hide(100)
        $(".linkman").show(100)
        $(".change").show()
        $(".form_title").css({textAlign:"left"})
        $(".link_name label").html($.trim($("#name").val()))
        $(".link_email label").html($.trim($("#email").val()))
        $(".link_phone label").html($.trim($("#phone").val()))
        $(".username").attr("value",$.trim($("#name").val()))
        $(".email").attr("value",$.trim($("#email").val()))
        $(".phonenumber").attr("value",$.trim($("#phone").val()))
        $(".pay").attr("value",$.trim($("#payway").val()))
        $(".company").attr("value",$.trim($("#company").val()))
        $(".job").attr("value",$.trim($("#job").val()))
        $(".mark").attr("value",$.trim($("#mark").val()))
        $(".invoice").attr("value","0")

        if($.trim($("#company").val())!=""){
            $(".link_company label").html($.trim($("#company").val()))
        }
        if($.trim($("#job").val())!=""){
            $(".link_job label").html($.trim($("#job").val()))
        }
        if($.trim($("#mark").val())!=""){
            $(".link_mark label").html($.trim($("#mark").val()))
        }
        $(".invoice_title,.invoice_addr").val("")
        $(".link_email_addr,.link_invoice_title").hide()
         $(".Hide").show()
    }

    $(".ways li span").click(function () {
        var val=$(this).parent().attr("title")
        $("#payway").attr("value",val)
        $(".pay").attr("value",$.trim($("#payway").val()))
    })
    $("#cap_img").click()
})
$(".change").click(function () {
    $("#ApplyForm").show(100)
    $(".linkman").hide(100)
    $(".change").hide()
    $(".form_title").css({textAlign:"center"})
})
$(".wangyin").click(function(){
    $(".card").slideDown(200);
    $("#bank").attr("value",$(".choosed").find("img").attr("lang"));
})
$(".way").click(function(){
    $(".card").slideUp(200)
})
$(".card ul li img").click(function () {
    var img="<img class='xuanzhong' src='/static/images/xuanzhong.png'/>"
    $(".xuanzhong").remove()
    $(".card ul li ").removeClass("choosed")
    $(this).parent().addClass("choosed")
    $(this).after(img)
    $(".choose_card span").html("(已选择："+$(this).attr("alt")+")")
    $("#bank").attr("value",$(this).attr("lang"))
})
$("#post_order").click(function () {
    $(this).attr("disabled","disabled")
    var name=$(".username").val()
    var phone=$(".phonenumber").val()
    var email=$(".email").val()
    if(name!=""&&phone!=""&&email!=""){
        $("#messageForm").submit();
    }else{
        swal("请填写完整的信息！")
        $(this).removeAttr('disabled')
    }
})
$(".total").append(($("#amount").val()*$("#price").val()).toFixed(2))

$('#phone').on('blur', function () {
    var url=window.location.href+"?phone="+$(this).val()
    $.get(url,{},function(){})
})
