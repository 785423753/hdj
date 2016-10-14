
change_ticket(),email(),review(),Collect()
function change_ticket(){
    $('.t_body').click(function () {
        var _index=$(this).index()- 1,amount=$(this).find('input').val(),price=$(this).find('.price').text(),property=$(this).find('.property').text(),
            Currency__sign=parseInt($(this).attr('data-sign'))
        reset(_index)
        $('table .t_body').eq(0).siblings()
        var limit=parseInt($(this).attr('data-limit'))
        $('.t_body').removeClass('choose')
        $(this).addClass('choose')
        $('.t_body').css({borderBottom:'1px solid #D7D7D7'})
        $(this).prev().css({border:'none'})
        $('#amount').val(amount), $('#price').val(price), $('#property').val(property)
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

    $("#bz_apply").click(function () {
        if($('.choose').length==0){
            alert('请选择票价')
        }
        else if ($('#amount').val() == 0) {
            alert('请添加票数')
        } else {
            $("form[name=signup_form]").submit()
        }

    })
}

//二维码
var this_url="http://m.huodongjia.com"+window.location.pathname
$('.qrcode').qrcode({width: 150, height: 150, text:this_url + "?entry=showevent",render:"table"});


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
        $('.yzm').show()
        //$('#capImg').show().attr('src','/get_check_code_image/?position=email')
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
                            alert("发送成功！");
                            $(".input-group input").val("")
                            $("#capImg").click()
                        }else{
                            alert("发送失败！");
                        }
                    }
                })
            }
        })
    })
}

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

function Collect(){
    $(".collect").click(function () {
        $("#login").css({display:'block'})
    })
    $(".close").click(function () {
        $("#login").css({display:'none'})
        $(".bg").css({display:'block'})
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
                    alert("收藏成功！")
                    $('.collection i').addClass('fa-star').removeClass('fa-star-o')
                }else if(data.code == 2){
                    alert("您已收藏该会议")
                }

            }
        })
    })
}