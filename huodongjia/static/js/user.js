/**
 * Created by Administrator on 2016/9/10 0010.
 */
$('#industry').change(function () {
    $.get('/usercenter/alltags',{cat:$('#industry').val()},function(data){
        $('.interest').html('')
        var Data=JSON.parse(data)
        for(var i in Data[0]){
            $('.interest').append("<span class='choose'>"+Data[0][i]+"</span>")
        }
        for(var i in Data[1]){
            $('.interest').append("<span>"+Data[1][i]+"</span>")
        }
        $('.interest span').click(function () {
            Choose(this)
        })
    })
})
$(".form-horizontal").submit(function () {
    var tags=''
    for(var i=$('.choose').length-1;i>=0;i--){
        if(i==0){
            tags+=$('.choose')[i].innerText
        }else{
            tags+=$('.choose')[i].innerText+','
        }
    }
    $('#tags').val(tags)
    var $this = $(this);
    if(!$('#telephone').val().match(/0?(13|14|15|18|17)[0-9]{9}/)){
        swal("手机号码输入有误")
        return false
    }else if(!$('#email').val().match(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/)){
        swal("邮箱输入有误")
        return false
    }
    $.ajax({
        url:"/usercenter/userprofile/",
        type:"post",
        data:$(".form-horizontal").serialize(),
        success: function (data) {

            if(data.indexOf("code")==-1){
                top.frames.swal(data)
            }else{
                var s=eval("("+data+")")
                if(s.code== 1){
                    if($this.attr("data-status") == 0){
                        var option = {
                            images:"success",
                            title:"更新成功",
                            tips:"恭喜你获得<span style='color: #e65052;'>20</span>积分。<a target='myframe' href='/usercenter/exchange/'>去看看</a>",
                            fromView:false
                        }
                        // top.frames.userPopup(option)
                        history.go(0)
                    }else{
                        top.frames.swal("更新成功")
                        history.go(0)
                    }
                }else{
                    top.frames.swal("修改失败")
                }
            }
        }
    })
    return false
})
$('#telephone').blur(function () {
    if(!$(this).val().match(/0?(13|14|15|18|17)[0-9]{9}/)){
        if($('.error').length==0) $(this).after("<span class='error red'>输入有误</span>")
    }else{
        $('.error').remove()
    }
})
$('#email').blur(function () {
    if(!$(this).val().match(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/)){
        if($('.error').length==0) $(this).after("<span class='error red'>输入有误</span>")
    }else{
        $('.error').remove()
    }
})
$('.interest span').click(function () {
    Choose(this)
})
function Choose(obj){
    if($(obj).attr('class')=='choose'){
        $(obj).removeClass('choose')
    }else{
        $(obj).addClass('choose')
    }
}