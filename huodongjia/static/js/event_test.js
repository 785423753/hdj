
change_ticket(),email(),review(),Collect(),head(),c_right()
function change_ticket(){
    $('.t_body').click(function () {
        var _index=$(this).index()- 1,amount=$(this).find('input').val(),price=$(this).attr('data-price'),property=$(this).find('.property').text(),
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
        if(count<=100) count=count+1
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
    $('.number').keyup(function () {
        var  count=$(this).val(),limit=parseInt($(this).parent().parent().parent().attr('data-limit'))
        if(count>=limit&&count.match(/^[1-9]\d*|0$/)&&count<=100){
            $('#amount').val($(this).val())
            change($(this).parent(),limit)
            all()
        }
    })
    $('.number').change(function () {
        var  count=$(this).val(),limit=parseInt($(this).parent().parent().parent().attr('data-limit'))
        if(count<limit||!count.match(/^[1-9]\d*|0$/)){
            $(this).val(limit)
        }else
        if(count>100){
            $(this).val(100)
        }
        $('#amount').val($(this).val())
        change($(this).parent(),limit)
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
        var price=$('#price').val()*$('#amount').val(),sign=$('#Currency__sign').val()
        $('.hj').show()
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
var f_top,m_str=[]
$(window).load(function() {
    $(".event_part").each(function () {
        var m_top=$(this).offset().top-60-70
        m_str.push(m_top)
    })
    head()
})
//二维码
var this_url="http://m.huodongjia.com"+window.location.pathname
$('.qrcode').qrcode({width: 100, height: 100, text:this_url + "?entry=showevent",render:"table",foreground:'#0073BD'});
$('.share_qrcode div').qrcode({
    width: 150,
    height: 150,
    text:this_url + "?entry=showevent",render:"table",
    foreground:'#0073BD'
});

//发送邮箱
function email(){
    $(".send_email").click(function () {
        if(!$("#exampleInputAmount").val().match(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/)){
            $("#exampleInputAmount").css({"border":"1px solid red"})
        } else{
            $("#emai_code").css({"border":"1px solid #989697"})
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
                        $("#exampleInputAmount").val("")
                    }else{
                        alert("发送失败！");
                    }
                }
            })
        }
    })
}

var box=[],lb=[],time=[]
$('.review_box').each(function (i) {
    box.push($($('.review_box')[i]))
    lb.push('lb_'+i)
    time.push('time'+i)
})
for(var i in box){
    lb[i]=new Review(box[i])
    // time[i]=setInterval (lb[i].next,2500)
}
function Review(box) {
    this.box=box
    this.imgIndex=1
    this.length=box.find('div').length-1
    this.box.css({width:(this.length+1)*500+'px'})
    this.next=function () {
        this.imgIndex++
        var left=parseInt(this.box.css('left'))
        this.box.css({
            left:"-"+this.imgIndex*500+"px",transition:"all .5s ease"
        })
        console.log(this.imgIndex+" "+this.length)
        if(this.imgIndex>=this.length){
            this.imgIndex=1
            var that=this
            setTimeout(function () {
                that.box.css({
                    left:"-"+that.imgIndex*500+"px",transition:"all 0s ease"
                })
            },1000)

        }
    }
    this.prev=function () {
        this.imgIndex--
        var left=parseInt(this.box.css('left'))
        this.box.css({
            left:"-"+this.imgIndex*500+"px",transition:"all .5s ease"
        })
        if(this.imgIndex<=0){
            this.imgIndex=this.length-1
            var that=this
            setTimeout(function () {
                that.box.css({
                    left:"-"+this.imgIndex*500+"px",transition:"all 0s ease"
                })
            },1000)
        }
    }
    this.click=function () {
        var that=this
        this.box.next().click(function () {
            that.prev()
        })
        this.box.next().next().click(function () {
            that.next()
        })
    }
    this.click()
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
                    // alert("收藏成功！")
                    $('.collection img').attr('src','http://pic.huodongjia.com/static/images/images/heart (1).png')
                }else if(data.code == 2){
                    // alert("您已收藏该会议")
                }

            }
        })
    })
}
function head(){
    var top=$(".event_nav").offset().top,r_top=$(".right").offset().top
//            f_top=$(document).height()-$(window).height()-$(".footer").height()
    $(".event_nav .e_title").on('click', function () {
        $(".event_nav li").eq($(this).index()).addClass('blue_color').siblings().removeClass('blue_color')
        if($(".event_nav").css("position")=="fixed"){
            var s = $("#" + $(this).data("plne")).offset().top- $(".event_nav").height();
        }else{
            var s = $("#" + $(this).data("plne")).offset().top- $(".event_nav").height()-70;
        }
        $("html,body").animate({scrollTop: s})
//                $('.t_line').css({left:$(this).index()*(100+19)+'px'})
    })
    $.event.add(window, "scroll", function() {
        var sTop=document.documentElement.scrollTop+document.body.scrollTop,L=$('.e_title').length-1
        if(sTop<=0){
            $('.kf').hide()
        }else{
            $('.kf').show()
        }
        for(var j=0;j<m_str.length;j++){
            if(sTop>=m_str[j]&&sTop<m_str[j+1]){

                $(".event_nav li").eq(j).addClass('blue_color').siblings().removeClass('blue_color')
                $('.t_line').css({left:j*(100+19)+'px'})
            }
        }
        if(sTop>=top){
            $(".event_nav").css({position:"fixed",top:"0",left:"0"})
        }else{
            $(".event_nav").css({position:""})
        }
    });
}
$('.n_wx').click(function () {
    $('.share_qrcode').fadeIn()
    $('.close').click(function () {
        $('.share_qrcode').fadeOut()
    })
})

//二维码
$('.kf span').hover(
    function () {
        $(this).css({background:'rgba(255, 255, 255, 0.53)'})
        $('.kf div').eq($(this).index()).show(100)
    },
    function () {
        $(this).css({background:'none'})
        $('.kf div').eq($(this).index()).hide(100)
    }
)

//标题切换
$('.first_title .second_title').click(function () {
    var _index=$(this).index(),h3=$(this).parent()
    h3.find('.second_title').eq(_index).addClass('act_s').siblings().removeClass('act_s')
    h3.next().next().find('.s_tag').eq(_index).addClass('act').siblings().removeClass('act')
})

$('.top_back').click(function () {
    $("html,body").animate({scrollTop: 0})
})

if($('.lazy').length>0){
    $(".lazy").lazyload({threshold : 0 , effect:"show", placeholder : "http://pic.huodongjia.com/static/images/event_default.jpg", event:"scroll"});
}

$('.m_more').click(function () {
    m_str=[]
    var l=$('.guest').length

    if($(this).text()=='查看更多'){
        if(l<=32){
            $(this).text('收起')
            $('.guests').css({maxHeight:'none'})
        }else{
            $(this).text('查看全部')
            $('.guests').css({maxHeight:'800px'})
        }

    }else
    if($(this).text()=='查看全部'){
        $(this).text('收起')
        $('.guests').css({maxHeight:'none'})
    }else
    if($(this).text()=='收起'){
        $(this).text('查看更多')
        $('.guests').css({maxHeight:'400px'})
        $("html,body").animate({scrollTop: $('.guests').parent().parent().offset().top},0)
    }
    $(".event_part").each(function () {
        var m_top=$(this).offset().top-60-70
        m_str.push(m_top)
    })
})

function c_right(){
    var top=$(".kf").offset().top,left=$('.right').offset().left
    $.event.add(window, "scroll", function() {
        var sTop=document.documentElement.scrollTop+document.body.scrollTop
        if(sTop>=top){
            $(".right").css({position:"fixed",top:"50px",left:left,width:'228px'})
            $('.e_hide').hide()
            if($('body').height()-sTop<=1054){
                $(".right").css({position:""})
                $('.e_hide').show()
            }
        }else{
            $(".right").css({position:"relative",width:"22%",top:"0",left:"0"})
            $('.e_hide').show()
        }

    });
}

$('.more_com').click(function () {
    $('.more_comment').css({maxHeight:'none'})
    $(this).hide()
})

var num=0
setInterval(com,2000)
function com(){
    var length=$('.company li').length/2
    if(length>5){
        num++
        $('.company').css({
            top:"-"+num*30+"px",transition:"all .3s ease"
        })
        if(num>=length){
            num=0
            setTimeout(function () {
                $('.company').css({
                    top:"-"+num*30+"px",transition:"all 0s ease"
                })
            },500)
        }
    }
}