/**
 * Created by Administrator on 2016/8/18 0018.
 */
$(".lazy").lazyload({threshold : 0 , effect:"show", placeholder : "http://pic.huodongjia.com/static/images/event_default.jpg", event:"scroll"});
function move(_index){
    $('.banner_index a').eq(_index).addClass('banner_act').siblings().removeClass('banner_act')
    $('.banner ul li').eq(_index).addClass('banner_act').siblings().removeClass('banner_act')
}
function next() {
    var _index=$('.banner_index .banner_act').index()
    if(_index>=5){
        _index=-1
    }
    _index++
    move(_index)
}
var time=setInterval( next,4000)
$('.banner').hover(
    function () {
        clearInterval(time);
    },
    function () {
        time=setInterval (next,4000);
    }
)
$('.banner ul li').mouseover(function(){
    var _index=$(this).index()
    move(_index)
})