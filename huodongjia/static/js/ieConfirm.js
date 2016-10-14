/**
 * Created by Administrator on 2016/2/16 0016.
 */
/**
 * Created by Administrator on 2016/1/11 0011.
 */
$("#apply").click(function () {
    $("#freeForm input[type='text']").attr("value","")
    $("#freeForm").fadeIn(200)
    $("#codeImg").attr("src","/get_check_code_image/?position=submit")
})
$(".close").click(function () {
    $("#freeForm").fadeOut(200)
})
//��֤
$("#checkcode").on('blur', function () {
    var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
    var captcha = $("#checkcode").val();
    $.ajax({
        url: "/verify_captcha/",
        dataType: "json",
        type: "post",
        async: false,
        data: {
            csrfmiddlewaretoken: csrf.value,
            captcha: captcha,
            position: "submit",
        },
        success: function (data) {
            if (data.flag == 'false') {
                $("#checkcode").attr({"data-captchaflag":false})
                $("#codeImg").click()
            }else{
                $("#checkcode").attr({"data-captchaflag":true})
            }
        }
    });
})
$("#post").click(function () {
    var filter = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if ($.trim($("#name").val()).length == 0) {
        swal("姓名不能为空")
        //$("#name").popover(option).popover('show')
    } else if (!(/^[\u4e00-\u9fa5 ]{2,20}|[a-zA-Z\/ ]{2,20}$/).test($.trim($("#name").val()))) {
        swal("请输入正确的姓名")
    } else if(!(/^1[3-8]+\d{9}$/).test($('#phone').val())){
        swal("请输入正确的手机号")
    }else if(!filter.test($('#email').val())){
        swal("请输入正确的邮箱")
    }else if($("#checkcode").attr("data-captchaflag") == 'false'){
        swal("验证码错误")
    }else{
        $.ajax({
            url:'/pendingorder/',
            data:$("#freeForm").serialize(),
            dataType:'json',
            type:'post',
            success: function (data) {
                $("#freeForm input[type='text']").attr("value","")
                if(data.code==1){
                    swal('提交成功，会议信息更新后，我们会邮件通知您。');
                }else{
                    swal("很抱歉，提交失败！")
                }
                $("#freeForm").fadeOut(200)
            }
        })
    }

})


