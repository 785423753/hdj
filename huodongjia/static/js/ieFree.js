/**
 * Created by Administrator on 2016/1/30 0030.
 */
/**
 * Created by Administrator on 2016/1/11 0011.
 */
$("#apply").click(function () {
    $("#freeForm input[type='text']").attr("value","")
    $("#freeForm").fadeIn(200)
    $("#codeImg").attr("src","/get_check_code_image/")
})
$(".close").click(function () {
    $("#freeForm").fadeOut(200)
})
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
$("#post").click(function () {
    var filter = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if ($.trim($("#name").val()).length == 0) {
        alert("姓名不能为空")
        $("#name").popover(option).popover('show')
    } else if (!(/^[\u4e00-\u9fa5 ]{2,20}|[a-zA-Z\/ ]{2,20}$/).test($.trim($("#name").val()))) {
        alert("请输入正确的姓名")
    } else if(!(/^1[3-8]+\d{9}$/).test($('#phone').val())){
        alert("请输入正确的手机号")
    }else if(!filter.test($('#email').val())){
        alert("请输入正确的邮箱")
    }else if($("#checkcode").attr("data-captchaflag") == 'false'){
        alert("验证码错误")
    }else{
        $.ajax({
            url:'/freesignup/',
            data:$("#freeForm").serialize(),
            dataType:'json',
            type:'post',
            success: function (data) {
                $("#freeForm input[type='text']").attr("value","")
                if(data.code==1){
                    swal('您好，您已成功申请。 请耐心等待主办方审核身份，审核通过后您将收到参会凭证。');
                }else if(data.code==2){
                    swal('请勿重复提交');
                }else{
                    swal("很抱歉，提交失败！")
                }
                $("#freeForm").fadeOut(200)
            }
        })
    }

})