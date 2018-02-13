/**
 * Created by Administrator on 2016/9/23 0023.
 */
$(document).ready(function () {
    initialize()
    window.onresize=function(){
        initialize()
    }
    var time=setInterval(Next,3000)
    $('.banner').hover(
        function(){clearInterval(time)},
        function(){time=setInterval(Next,3000)}
    )
    $('.upcoming_event li').on('mouseover', function () {
        //if($(this).index()!=parseInt($('.upcoming_event li').length)-1)
        $('.upcoming_event li').eq($(this).index()).addClass('choose').siblings().removeClass('choose')
    })
})
var banner_index= 1,length=parseInt($('.review_box a').length)-1
function initialize(){
    var l=$('.review_box a').length,w=$(window).width()
    $('.review_box').css({width:l*1200+"px"})
    $('.next,.prev').css({width:(w-1200)/2+"px"})
    $('.next a').css('position',(w<=1250) ? 'absolute' : '');
    $('.next a').css('right',(w<=1250) ? '0px' : '');
}
function Next(){
    banner_index++
    var left=parseInt($('.review_box').css('left'))
    $('.review_box').css({
        left:"-"+banner_index*1200+"px",transition:"all .5s linear"
    })
    if(banner_index>=length){
        banner_index=1
        setTimeout(function () {
            $('.review_box').css({
                left:"-"+banner_index*1200+"px",transition:"all 0s linear"
            })
        },500)

    }
}
function Prev(){
    banner_index--
    var left=parseInt($('.review_box').css('left'))
    $('.review_box').css({
        left:"-"+banner_index*1200+"px",transition:"all .5s linear"
    })
    if(banner_index<=0){
        banner_index=length-1
        setTimeout(function () {
            $('.review_box').css({
                left:"-"+banner_index*1200+"px",transition:"all 0s linear"
            })
        },500)
    }
}
tags()
function tags(){
    $('.tags .news_tag').mouseover(function () {
        var $this=$(this),tad_id=$this.attr('data-id')
        $this.parent().parent().find('.news_tag').removeClass('choose')
        $this.addClass('choose')
        $.get('/dj/get_news_by_cat.mpy',{cat_id:tad_id},function(data){
            var _html=''
            for(var i in data.data ){
                if(i<3){
                     _html+='<div class="media"><a class="media-left" target="_blank" href="/'+data.data[i].id+'.html"><img width="180" height="112" src="'+data.data[i].img+'" alt="'+data.data[i].post_title+'"></a>' +
                        '<div class="media-body"><h4 class="media-heading"><a href="/'+data.data[i].id+'.html" target="_blank">'+data.data[i].post_title+'</a></h4>' +
                        '<p>'+data.data[i].post_excerpt+'</p></div></div>'
                }
            }
            $this.parent().parent().next().html(_html)
        })
    })
}

$('.uploading_video,.uploading').click(function () {
    $('.m_dialog').fadeIn()
    $('#email').css({border:'1px solid #C1C1C1'})
    $('.m_dialog .btn-info').click(function () {
        if(!$("#email").val().match(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/)){
            $('#email').css({border:'1px solid red'})
        }else {
            var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
            $.post('/dj/collect_email.mpy',{email:$("#email").val(),csrfmiddlewaretoken: csrf.value}, function (data) {
                if(data.code){
                    $('.m_dialog').fadeOut()
                    swal("success!", "", "success");
                }else{
                    swal("请重试!", "", "error");
                }
            })
        }
    })
    $('.m_dialog .btn-default').click(function () {
        $('.m_dialog').fadeOut()
    })
})
$('.introduce .more').click(function () {
    var $this=$(this)
    $this.hide()
    $('.pack_up').show()
    $this.prev().css({lineClamp:'inherit'})
})
$('.pack_up').click(function () {
    var $this=$(this)
    $this.hide()
    $('.introduce .more').show()
    $this.next().css({lineClamp:'2'})
})
if($('.introduce p').height()<51){
    $('.introduce .more').hide()
}else {
    $('.introduce p').css({lineClamp:'2'})
}