/**
 * Created by Administrator on 2015/12/8 0008.
 */
$(".orderForm .post_daid").on('click', function () {
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
    if ($('#company').val()=="") {
        option.content = "请输入公司名称"
        $("#company").popover(option).popover('show')
        return false;
    }else {
        if ($('#job').val()=="") {
            option.content = "请输入职务名称"
            $("#job").popover(option).popover('show')
            return false;
        } if ($.trim($("#email").val()).length == 0) {
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
    }

    var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
    $.ajax({
        url: "/spread/freesignup/",
        dataType: "json",
        type: "post",
        data: {
            csrfmiddlewaretoken: csrf.value,
            name: $("#customer_name").val(),
            email: $("#email").val(),
            phone: $(" #mobilphone").val(),
            event_id: $("#event_id_for_submit").val(),
            company: $("#company").val(),
            job: $("#job").val(),
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
    })

})
