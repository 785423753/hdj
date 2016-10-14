/**
 * Created by Administrator on 2015/12/8 0008.
 */
$("#invoice").on('click', function () {
    if ($(this).is(":checked")) {
        $(".Invoice_div").show()
    } else {
        $(".Invoice_div").hide()
    }
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