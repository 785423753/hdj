/**
 * Created by Administrator on 2016/8/5 0005.
 */
change_ticket(),email(),liuyan(),collect(),review();
var f_top
$(window).load(function() {
    head()
})
function change_ticket(){
    $('.t_body').click(function () {
        var _index=$(this).index()- 1,amount=$(this).find('input').val(),price=$(this).find('.price').text(),property=$(this).find('.property').text(),
            Currency__sign=$(this).attr('data-sign'),price_id=$(this).attr('data-id')
        reset(_index)
        $('table .t_body').eq(0).siblings()
        var limit=parseInt($(this).attr('data-limit'))
        $('.t_body').removeClass('choose')
        $(this).addClass('choose')
        $('#amount').val(amount), $('#price').val(price), $('#property').val(property), $('#Currency__sign').val(Currency__sign), $('#price_id').val(price_id)
        change($(this).find('.count'),limit)
        all()
    })

    $('.add').click(function () {
        var count=parseInt($(this).prev().find('input').val()),limit=parseInt($(this).parent().parent().attr('data-limit'))
            count=count+1
        $(this).prev().find('input').val(count)
        change($(this).prev(),limit)
        all()
    })

    $('.sub').click(function () {
        var count=parseInt($(this).next().find('input').val()),limit=parseInt($(this).parent().parent().attr('data-limit'))
        if(count>limit){
            count=count-1
        }
        $(this).next().find('input').val(count)
        change($(this).next(),limit)
        all()
    })

    function reset(Index){
        $('.t_body').each(function (i) {
            if(i!=Index){
                var limit=parseInt($(this).attr('data-limit'))
                $(this).find('.number').val(limit)
                $(this).find('.sub').addClass('forbid')
            }
        })
    }

    function all(){
        var price=($('#price').val()*$('#amount').val()).toFixed(2),sign=$('#Currency__sign').val()
        $('#all').text(sign+price)
    }
    function change(obj,limit){
        var count=$(obj).find('input').val()
        if(count<=limit){
            $(obj).prev().addClass('forbid')
        }else {
            $(obj).prev().removeClass('forbid')
        }
    }
}
//发送邮箱
function email(){
    $("#emai_code").on('blur', function () {
        var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
        var captcha = $("#emai_code").val();
        $.ajax({
            url: "/verify_captcha/",
            dataType: "json",
            type: "post",
            async: false,
            data: {
                csrfmiddlewaretoken: csrf.value,
                captcha: captcha,
                position:"email"
            },
            success: function (data) {
                if (data.flag == 'false') {
                    $("#emai_code").attr({"data-captchaflag":false})
                    $("#capImg").click()
                }else{
                    $("#emai_code").attr({"data-captchaflag":true})
                }
            }
        });
    })
    $("#exampleInputAmount").blur(function(){
        $('#capImg').attr('src','/get_check_code_image/?position=email')
        $('.yzm').show()
        $(".send_email").click(function () {
            if(!$("#exampleInputAmount").val().match(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/)){
                $("#exampleInputAmount").css({"border":"1px solid red"})
            } else if($("#emai_code").attr("data-captchaflag")=="false"){
                $("#exampleInputAmount").css({"border":"1px solid #BDC4CB"})
                $("#emai_code").css({"border":"1px solid red"})
            }
            else{
                $("#emai_code").css({"border":"1px solid #BDC4CB"})
                $.ajax({
                    url: "/sendemail/",
                    dataType: "json",
                    type: "get",
                    async: false,
                    data: {
                        email:$("#exampleInputAmount").val(),
                        eventid:$("#event_id").val()
                    },
                    success: function (data) {
                        if(data.code==1){
                            swal("发送成功！");
                            $(".input-group input").val("")
                            $("#capImg").click()
                        }else{
                            swal("发送失败！");
                        }
                    }
                })
            }
        })
    })
}
//导航
function head(){
  if($('.e_title').length>6){
        $('.e_title').css({marginRight:'28px'})
    }
    var m_str=new Array(),top=$(".event_nav").offset().top,r_top=$(".right").offset().top
        f_top=$(document).height()-$(window).height()-$(".footer").height()
    $(".event_nav .e_title").on('click', function () {
        $(".event_nav li").eq($(this).index()).addClass('blue_color').siblings().removeClass('blue_color')
        if($(".event_nav").css("position")=="fixed"){
            var s = $("#" + $(this).data("plne")).offset().top- $(".event_nav").height();
        }else{
            var s = $("#" + $(this).data("plne")).offset().top- $(".event_nav").height()-70;
        }
        $("html,body").animate({scrollTop: s})
    })
    $(".event_part").each(function () {
            var m_top=$(this).offset().top-60-70
            m_str.push(m_top)
        })
    $.event.add(window, "scroll", function() {
        var sTop=document.documentElement.scrollTop+document.body.scrollTop,L=$('.e_title').length-1
        for(var j=0;j<m_str.length;j++){
            if(sTop<m_str[1]){
                $(".e_title").removeClass('blue_color')
                $($(".e_title")[L]).addClass('blue_color')
            }
            if(j<m_str.length-1){
                if(sTop>=m_str[j]&&sTop<m_str[j+1]){
                    $(".event_nav li").removeClass('blue_color')
                    $($(".event_nav li")[j-1]).addClass('blue_color')
                }
            }else{
                if(sTop>=m_str[j]){
                    $(".event_nav li").removeClass('blue_color')
                    $($(".event_nav li")[j-1]).addClass('blue_color')
                }
            }
        }
        if(sTop>=top){
            $(".event_nav").css({position:"fixed",top:"0",boxShadow:"0 2px 7px -3px rgba(144, 144, 144, 0.65)"})
        }else{
            $(".event_nav").css({position:"",boxShadow:"none"})
        }
    });
}
//二维码
var this_url="http://m.huodongjia.com"+window.location.pathname
if ((navigator.userAgent.indexOf('MSIE') >= 0)
    && (navigator.userAgent.indexOf('Opera') < 0)){
    $('.qrcode').qrcode({width: 100, height: 100, text:this_url + "?entry=showevent",render:"table"});
}else{
    $('.qrcode').qrcode({width: 100, height: 100, text:this_url + "?entry=showevent",render:"canvas"});
}
function liuyan(){
    //验证
    $("#code").on('blur', function () {
        var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
        var captcha = $("#code").val();
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
                console.log(data)
                if (data.flag == 'false') {
                    $("#code").attr({"data-captchaflag":false})
                    $("#cap_img").click()
                }else{
                    $("#code").attr({"data-captchaflag":true})
                }
            }
        });
    })
//留言
    $(".analytic").click(function () {
        var time=""
        var inputText = $('.emotion').val();
        if($("#code").attr("data-captchaflag")=="false"){
            $("#code").css({"border":"1px solid red"})
        }else{
            $("#code").css({"border":"1px solid #eee"})
            if(inputText!=""){
                $('.emotion').attr("value","")
                $.ajax({
                    url: "/submitcomment/",
                    type: "post",
                    data:{
                        eventid:$("#event_id").val(),
                        message:inputText
                    },
                    dataType: "json",
                    async: false,
                    success: function(data) {
                        if(data.code==1){
                            swal(data.msg);
                        }else if(data.code==0){
                            swal(data.msg);
                            $('.emotion').attr("value","")
                            $(".confirm").click(function () {
                                window.location.href=window.location.href
                            })
                        }
                    },
                })
            }
        }
    })
//字数限制
    $(function(){
        var textArea = $(".emotion"),word = $("#info");
        statInputNum(textArea,word);
    });
    function statInputNum(textArea,numItem) {
        var max = numItem.text()
        textArea[0].setAttribute("maxlength", max);
        textArea.on('input propertychange', function () {
            numItem.text(max - $(this).val().length);
        });
    }
}
//收藏
function collect(){
    $(".collect").click(function () {
        $("#login").fadeIn(100)
    })
    $(".close").click(function () {
        $("#login").fadeOut(100)
        $(".bg").fadeOut(100)
    })
    $(".collection").on('click', function () {
        var $this=$(this)
        $.ajax({
            url:"/usercenter/collect/",
            type:"get",
            dataType:'json',
            data:{eventid:$(this).attr("id")},
            success: function (data) {
                if(data.code == 1){
                    swal("收藏成功！")
                    $('.collection i').addClass('fa-star').removeClass('fa-star-o')
                }else if(data.code == 2){
                    swal("您已收藏该会议")
                }
            }
        })
    })
}
//右边定位
window.onload= function () {
    var right_child=$(".right_child>div:last-child").offset().top
    if($(".e_hide").length<=0){
        right_child=$(".right_child").offset().top
    }
    $.event.add(window, "scroll", function() {
        var sTop=document.documentElement.scrollTop+document.body.scrollTop;
        if(sTop>=right_child&&sTop<=f_top){
            $(".right_child").css({position:"fixed",top:"25px","z-index":"1000","width":"290px"})
            $(".e_hide").fadeOut(1)
        }else{
            $(".right_child").css({position:"","width":'',"top":''})
            $(".e_hide").fadeIn()
        }
    });
}
$("#bz_apply").click(function () {
    if($('.choose').length==0){
        swal('请选择票价')
    }
    else if ($('#amount').val() == 0) {
        swal('请添加票数')
    } else {
        $("form[name=signup_form]").submit()
    }

})
//精彩回顾
function review(){
    var imgIndex= 1,length=parseInt($('.review_box div').length)-1
    $('.review_box').css({width:(length+1)*500+'px'})
    function Next(){
        imgIndex++
        var left=parseInt($('.review_box').css('left'))
        $('.review_box').css({
            left:"-"+imgIndex*500+"px",transition:"all .5s ease"
        })
        if(imgIndex>=length){
            imgIndex=1
            setTimeout(function () {
                $('.review_box').css({
                    left:"-"+imgIndex*500+"px",transition:"all 0s ease"
                })
            },300)

        }
    }
    function Prev(){
        imgIndex--
        var left=parseInt($('.review_box').css('left'))
        $('.review_box').css({
            left:"-"+imgIndex*500+"px",transition:"all .5s ease"
        })
        if(imgIndex<=0){
            imgIndex=length-1
            setTimeout(function () {
                $('.review_box').css({
                    left:"-"+imgIndex*500+"px",transition:"all 0s ease"
                })
            },300)
        }
    }
    $('.next a').click(function () {
        Next()
    })
    $('.prev a').click(function () {
        Prev()
    })
    var mytime=setInterval (Next,2500);
    $('#Passed').hover(
        function () {
            clearInterval(mytime);
        },
        function () {
            mytime=setInterval (Next,2500);
        }
    )
}

