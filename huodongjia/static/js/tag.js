/**
 * Created by Administrator on 2015/12/26 0026.
 */
var key=$(".tag a").text()
var flag=0
if(key=="互联网+"){
    key="互联网"
    flag=1
}
String.prototype.TextFilter=function(){
    var pattern=new RegExp("[+]"); //[]内输入你要过滤的字符，这里是我的
    var rs="";
    for(var i=0;i<this.length;i++){
        rs+=this.substr(i,1).replace(pattern,"<span style='color:#E64E4B'>+</span>");
    }
    return rs;
}
$(".meeting_name,.meeting_des,.meeting_tag a").each(function(){
    if(flag==1){
        var a = $(this).text();
        var txt=a.TextFilter(); //调用上面的去字符方法
        if(txt!=a){
            $(this).html(txt)
        }
    }
    var t=$(this).html();
    //取得需要查出的关键字
    var array = (key).split(",");
    //开始用关键字遍历标签文本
    if($.trim(key)!=""){
    for(var i=0;i<array.length;i++){
        //判断标签是否包含关键字
        if(t.indexOf(array[i])>-1){
            //定义正则表达式对象  array[i]是关键字   "g"是指全局范围
            var a = new RegExp(array[i],"g")
            //对标签文本进行全局替换，包含关键字的位置替换为加红字span对象
            t = t.replace(a,("<span style='color:#E64E4B'>" + array[i] + "</span>"));
            //将替换完的文本对象赋给此对象中A标签对象的html值中

            $(this).html(t);
        }
    }
    }
});
$(".order_email").click(function () {
    $("#emailTakeForm").show()
    $("#codeImg").attr("src","/get_check_code_image/")
})
$(".close").click(function () {
    $("#emailTakeForm").hide()
})
$('input,textarea').placeholder();
$("#post").click(function () {
    $("#searchForm").submit();
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
//邮件订阅
$(".post").click(function () {
    var filter = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
    var Data={}
    $("#emailTakeForm input").each(function (i) {
        Data[$("#emailTakeForm input")[i].name]=$("#emailTakeForm input")[i].value
    })
    Data["csrf"]=csrf.value
    if(!filter.test($('#email').val())){
        $("#email").addClass("not")
    }else{
        $("#email").removeClass("not")
    }
    if($("#checkcode").attr("data-captchaflag") == 'false'){
        $("#checkcode").addClass("not")
    }else{
        $("#checkcode").removeClass("not")
    }
    if($("#industry").val()!=""&&$("#checkcode").attr("data-captchaflag") == 'true'){
        $.ajax({
            url: "/subscriptiontag/",
            type: "post",
            data: Data,
            dataType: "json",
            async: false,
            success: function (data) {
                swal(data.msg)
            }
        })
    }
})
//定位
var f_top
var r_top=$(".right_fixed").offset().top
var width=$(".content_left").width()
$(window).load(function() {
    f_top=$(document).height()-$(window).height()-$(".footer").height()+200
});
$.event.add(window, "scroll", function() {
    var sTop=document.documentElement.scrollTop+document.body.scrollTop;
    if(sTop>=r_top&&sTop<=f_top){
        $(".right_fixed").css({position:"fixed",top:"0",width:width})
        $(".hot_theme").hide()
    }else{
        $(".right_fixed").css({position:"",width:""})
        $(".hot_theme").show()
    }
});
//标签云
$("#hot_tags a").each(function (i) {
    var size=$("#hot_tags a")[0].lang/10
    $($("#hot_tags span")[i]).addClass("w"+parseInt($("#hot_tags a")[i].lang/size))
})