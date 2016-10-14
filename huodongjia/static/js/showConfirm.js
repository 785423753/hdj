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
//验证
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
    setTimeout(function () {
        $("#freeForm input[type=text]").popover('destroy')
    }, 1000)
    var option = {
        placement: "top",
        animation: "true",
        container: "body",
    }
    if ($.trim($("#name").val()).length == 0) {
        option.content = "姓名不能为空"
        $("#name").popover(option).popover('show')
    } else if (!(/^[\u4e00-\u9fa5 ]{2,20}|[a-zA-Z\/ ]{2,20}$/).test($.trim($("#name").val()))) {
        option.content = "请输入正确的姓名"
        $("#name").popover(option).popover('show')
    }else if(!(/^1[3-8]+\d{9}$/).test($('#phone').val())){
        option.content = "请输入正确的手机号"
        $("#phone").popover(option).popover('show')
    }else if(!filter.test($('#email').val())){
        option.content = "请输入正确的邮箱"
        $("#email").popover(option).popover('show')
    }else if($("#checkcode").attr("data-captchaflag") == 'false'){
        option.content = "验证码错误"
        $("#checkcode").popover(option).popover('show')
    }else{
        $(this).val("正在提交...")
        $.ajax({
            url:'/pendingorder/',
            data:$("#freeForm").serialize(),
            dataType:'json',
            type:'post',
            success: function (data) {
                $("#post").val("提交")
                $("#freeForm input[type='text']").attr("value","")
                if(data.code==1){
                    swal('提交成功，费用信息有更新我们会及时联系您。');
                }else{
                    swal("很抱歉，提交失败！")
                }
                $("#freeForm").fadeOut(200)
            }
        })
    }

})

//收藏       author:moubo    time:02/01  17:27
$(".collect").click(function () {
    $("#login").fadeIn(100)
})
$(".close").click(function () {
    $("#login").fadeOut(100)
})
$(".collection").one('click', function () {
    var $this=$(this)
    $.ajax({
        url:"/usercenter/collect/",
        type:"get",
        dataType:'json',
        data:{eventid:$(this).attr("id")},
        success: function (data) {
            if(data.code == 1){
              swal("收藏成功！")
            }else if(data.code == 2){
                swal("您已收藏该会议")
            }
        }
    })
})
