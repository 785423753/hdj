/**
 * Created by tanyanfei on 16/10/18.
 */
    //select
menue()
function stopEvent(){
    //取消事件冒泡
    var e=arguments.callee.caller.arguments[0]||event; //若省略此句，下面的e改为event，IE运行可以，但是其他浏览器就不兼容
    if (e && e.stopPropagation) {
        // this code is for Mozilla and Opera
        e.stopPropagation();
    } else if (window.event) {
        // this code is for IE
        window.event.cancelBubble = true;
    }
}
function menue(){
    $('.menue_button').on('click',function(){
        var $this=$(this),$menue=$this.next()
        $('.menue').fadeOut(0)
        $menue.fadeIn(0)
        stopEvent()
    })
    $('.menue li').live('click', function () {
        var $this=$(this),$input=$this.parent().next(),$button=$this.parent().prev().children('button')
        $input.val($this.attr('data-value'))
        $button.text($this.text())
        $this.parent().fadeOut(0)
    })
    $('body').on('click',function(){
        $('.menue').fadeOut(0)
    })
}
$('.add_ex').on('click', function () {
    var $exp=$('.experence')
    $exp.append('<div style="position: relative;margin-top: 20px"><input class="new_exp" name="experence" type="text"/><span onclick="del(this)" class="ang_bottom del_ex">&#xe603;</span></div>')
})
function del(obj){
    $(obj).parent().remove()
}
//date
date();
function date(){
    var myDate = new Date();
    var year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var y_html="",m_html="",d_html=""
    for(var i=1950;i<=year;i++){
        y_html+="<li data-value='"+i+"'>"+i+"</li>"
    }
    for(var i=1;i<=12;i++){
        m_html+="<li data-value='"+i+"'>"+i+"</li>"
    }
    for(var i=1;i<=31;i++){
        d_html+="<li data-value='"+i+"'>"+i+"</li>"
    }
    $('.y_menue').html(y_html),$('.m_menue').html(m_html),$('.d_menue').html(d_html)
}