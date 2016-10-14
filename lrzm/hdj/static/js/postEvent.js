/**
 * Created by Administrator on 2015/12/30 0030.
 */
var editor1=CKEDITOR.replace("notice")
var editor2=CKEDITOR.replace("meeting_date")
var editor3=CKEDITOR.replace("guest")
var editor4=CKEDITOR.replace("meeting_ticket")
var start_day = {
    elem: '#start_day',
    event: 'focus',
    format: 'YYYY-MM-DD hh:mm',
    min:laydate.now(), //设定最小日期为当前日期
    max: '2099-06-16', //最大日期
    istime: true,
    istoday: false,
    choose: function(datas){
        $("#end_day").attr("value",datas)
        $("#deadline").attr("value",datas)
        end_day.min = datas
    }
};
var end_day = {
    elem: '#end_day',
    event: 'focus',
    format: 'YYYY-MM-DD hh:mm',
    min:laydate.now(), //设定最小日期为当前日期
    max: '2099-06-16', //最大日期
    istime: true,
    istoday: false,
    choose: function(datas){
    }
};
var deadtime = {
    elem: '#deadline',
    event: 'focus',
    format: 'YYYY-MM-DD hh:mm',
    min:laydate.now(), //设定最小日期为当前日期
    max: '2099-06-16', //最大日期
    istime: true,
    istoday: false,
    choose: function(datas){
    }
};
laydate.skin('danlan')
laydate(start_day);
laydate(end_day);
laydate(deadtime);
//    保存票价
var issave=0;
$(".save").click(function () {
    var fee_name=$("#Fee_name")
    var deadtime=$("#deadline")
    var price=$("#price")
    var explain=$("#serve")
    var _html="<tr class='project'>" +
        " <td>"+fee_name.val()+"</td><td>"+price.val()+"</td><td>"+deadtime.val()+"</td><td style='width: 38%'>"+explain.val()+"</td>" +
        "<td style='width: 10%;padding:10px 0;'><span class='edit' onclick='change(this)'><font class='myfont'>&#xe601;</font>编辑</span><p/><span class='edit' onclick='expurgate(this)'><font class='myfont'>&#xf0002;</font>删除</span></td>" +
        "</li>"
    if(fee_name.val()==""){
        $(fee_name).addClass("not")
    }else{
        $(fee_name).removeClass("not")
    }
    if(!price.val().match(/^(\.\d+)|^(\d+(\.\d+)?)$/)){
        $(price).addClass("not")
    }else{
        $(price).removeClass("not")
    }
    if(explain.val()==""){
        $(explain).addClass("not")
    }else{
        $(explain).removeClass("not")
    }
    if(fee_name.val()!=""&&price.val().match(/^(\.\d+)|^(\d+(\.\d+)?)$/)&&explain.val()!=""&&issave==0){
        $(".t_head").show()
        $(".t_head").after(_html)
        $(price).attr("value",'')
        $(explain).attr("value",'')
    }
})
//    取消
$(".cancel").click(function () {
    if(issave==0){
        $("#price").attr("value",'')
        $("#serve").attr("value",'')
        $("#price").removeClass("not")
        $("#serve").removeClass("not")
        if($(".project").length>0){
            $(".add_div").slideUp(10)
            $("#add_price").show()
        }
    }
})
$("#add_price").click(function () {
    $(".add_div").slideDown(10)
    $(this).hide()
})
//    修改
var tr,str;
function change(obj){
    $(".add_div").show()
    if(issave==1){
        swal("请先保存！")
        return false
    }
    issave=1
    $(obj).parent().parent().hide()
    tr=$(obj).parent().parent()
    str=$(tr).children()
    $("#Fee_name").attr("value",$(str[0]).html());
    $("#price").attr("value",$(str[1]).html());
    $("#deadline").attr("value",$(str[2]).html());
    $("#serve").attr("value",$(str[3]).html());
    $("#price").removeClass("not")
    $("#serve").removeClass("not")
    $(".save").click(function () {
        if(issave==1){
            var fee_name=$("#Fee_name").val()
            var deadtime=$("#deadline").val()
            var price=$("#price").val()
            var explain=$("#serve").val()
            if(fee_name!=""&&price.match(/^(\.\d+)|^(\d+(\.\d+)?)$/)&&explain!=""){
                $(tr).show()
                $(str[0]).html(fee_name)
                $(str[1]).html(price)
                $(str[2]).html(deadtime)
                $(str[3]).html(explain)
                $("#price").attr("value",'')
                $("#serve").attr("value",'')
                issave=0;
            }
        }
    })
    $(".cancel").click(function () {
        if(issave==1){
            $(tr).show()
            $("#price").attr("value",'')
            $("#serve").attr("value",'')
            issave=0;
        }
    })
}
//    删除
function expurgate(obj){
    tr=$(obj).parent().parent()
    $(tr).remove()
}
$("#fee").focus(function () {
    $(".ticket").show()
})
$("#free").focus(function () {
    $(".ticket").hide()
})
//城市/tag
var cat_id=$("#event_cat").val()
tags(cat_id)
$("#event_cat").change(function () {
    tags($(this).val())
})
var city=$("#province").val()
changecity(city)
$("#province").change(function () {
    changecity($(this).val())
})
function tags(tag){
    $.ajax({
        url:'/get_json_tag_by_cat/'+tag+'/',
        dataType:'text',
        type:'get',
        success: function (data) {
            $(".event_tag").html(data)
        }
    })
}
function changecity(id){
    $.ajax({
        url:'/show_city_json/'+id+"/",
        dataType:'text',
        type:'get',
        success: function (data) {
            $("#city").html(data)
        }
    })
}
//发送验证码
$(".captcha_btn").bind('click',function () {
    var dateObj,s="";
    dateObj = new Date();
    s+=dateObj.getFullYear();
    s+=dateObj.getMonth()+1;
    s+=dateObj.getDate();
    s+=dateObj.getHours();
    s+=dateObj.getMinutes();
    s+=dateObj.getSeconds();
    var set, i = 60;
    var url = "/send_check_mesage/";
    var tel = $.trim($("#phone").val());
    if (tel != "" && (/^1[3-8]+\d{9}$/).test(tel)) {
        $(".captcha_btn").attr({disabled: "disabled"});
        $.get(url, {tel: tel,time:s}, function (data) {
            set = setInterval(function () {
                $(".captcha_btn").text("重发还有" + i + "秒").attr({disabled: "disabled"});
                i--;
                if (i < 0) {
                    clearInterval(set);
                    $(".captcha_btn").text("重新发送").removeAttr("disabled")
                }
            }, 1000)
        })
    } else {
        swal("请输入手机号码")
    }
    return false
});
$("#checkcode").blur(function () {
    var phone=$.trim($("#phone").val());
    var captcha=$.trim($("#checkcode").val());
        var url="/verify_tel_captcha/";
        $.post(url,{mobilphone:phone,captcha:captcha}, function (data) {
            var flag=jQuery.parseJSON(data).flag;
            if(flag==true){
                $("#checkcode").attr("data-captcha","true")
            }else{
                $("#checkcode").attr("data-captcha","false")
            }
        })
})
//检索关键字
$("#title").blur(function(){
    if($(this).val()!=''){
        $.ajax({
            url:'/check_event_name/',
            data:{
                name:$('#title').val()
            },
            type:'get',
            dataType:'json',
            async:'false',
            success: function(data){
                if(data.code==1){
                    $('.error').css({width:'auto',top:'30px',left:'155px'}).text('该活动已存在，请无重复提交！').fadeIn(10)
                    $('.arrow').fadeIn(10)
                }else{
                    var key=['发布会','沙龙','旅游','路演','营销','课程培训','评选会','展览','讲座']
                    var t=$("#title").val();
                    for(var i in key){
                        var array = (key[i]).split(",");
                        if($.trim(key)!=""){
                            for(var i=0;i<array.length;i++){
                                //判断标签是否包含关键字
                                if(t.indexOf(array[i])>-1){
                                    $('.error').css({width:'300px',top:'14px',left:'139px'}).text('很抱歉，该活动类型不在活动家业务范畴，活动家将一律禁止发布，请谅解。').fadeIn(10)
                                    $('.arrow').fadeIn(10)
                                }
                                break
                            }
                        }
                    }
                }
            }
        })
    }
})
$("#title").focus(function () {
    $('.error').hide()
    $('.arrow').fadeOut(0)
})
$("#free").focus(function () {
    $(".proof").css({visibility:'hidden'})
    $($(".proof")[0]).css({visibility:'visible'})
    $(".invoice").hide()
    $($(".invoice")[3]).show()
})
$("#fee").focus(function () {
    $(".proof").css({visibility:'visible'})
    $(".invoice").show()
})
//提交
$("#post").click(function () {
    var Data={}
    var jsonArr = new Array();
    var jsontag = new Array();
    var jsonroof = new Array();
    var jsonnav = new Array();
    var meeting=editor1.document.getBody().getHtml()
    var schedule=editor2.document.getBody().getHtml()
    var guest=editor3.document.getBody().getHtml()
    var ticket=editor4.document.getBody().getHtml()
    var _html="<p><br></p>"
    $(".mes").each(function(i){
        Data[$(".mes")[i].id]=$(".mes")[i].value
    })      //基本信息
    if($("#fee").attr("checked")=="checked"){
        $(".project").each(function(i){             /*票价*/
            var str=$($(".project")[i]).children();
            var c={"Fee_name":$(str[0]).html(),"price":$(str[1]).html(),"serve":$(str[3]).html(),"deadline":$(str[2]).html()};
            jsonArr.push(c);
        })
        Data["ticket_price"]=JSON.stringify(jsonArr)
    }else{
        Data["ticket_price"]="[]"
    }      //票价
    $(".event_cat_tag").each(function (i) {
        if($($(".event_cat_tag")[i]).attr("checked")=="checked"){
            jsontag.push($(this).val())
        }
    })
    Data["event_tag"]=JSON.stringify(jsontag)           //会议标签
    $("input[name=pathway]").each(function (i) {
        if($("input[name=pathway]")[i].checked="checked"){
            Data["invoice"]=$(this).val()
        }
    })       //发票
    $("input[name=evidence]").each(function (i) {
        if($($("input[name=evidence]")[i]).attr("checked")=="checked"){
            jsonroof.push($(this).val())
        }
    })
    $(".nav-pills li").each(function (i) {
        jsonnav.push($($(".nav-pills li")[i]).text())
    })
    if($("#charge").attr("checked")=="checked"){
        $("#charge").attr('value','8')
    }else{
        $("#charge").attr('value','0')
    }
    Data["evidence"]=JSON.stringify(jsonroof)
    Data["charge"]= $("#charge").val()
    Data["meeting"]=meeting
    Data["schedule"]=schedule
    Data["guest"]=guest
    Data["ticket"]=ticket
    Data["meeting_title_name"]=JSON.stringify(jsonnav)
    if($("#title").val()==""){
        swal("请填写会议标题")
    }else  if($("#start_day").val()==""){
        swal("请填写会议开始时间")
    }else  if($("#address").val()==""){
        swal("请填写场馆名称")
    }else  if(meeting==_html&&schedule==_html&&guest==_html&&ticket==_html){
        swal("请填写会议详情")
    }else  if($("#fee").attr("checked")=="checked"&&$(".project").length==0){
        swal("请填写至少一种票价类型")
    }else  if($("#name").val()==""){
        swal("请填写联系人")
    }else  if($("#sponsor").val()==""){
        swal("请填写主办单位名称")
    }else  if(!$("#phone").val().replace(/[ ]/g,"").match(/0?(13|14|15|18|17)[0-9]{9}/)){
        swal("请填写正确的手机号码")
    }else  if($("#checkcode").attr("data-captcha")!="true"){
         swal("验证码错误")
    }
    else if(!$("#email").val().match(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/)){
        swal("请填写正确的邮箱地址")
    }else{
        $.ajax({
            url: "/postevent_act/",
            type: "post",
            data: Data,
            dataType: "json",
            async: false,
            beforeSend: function () {
                // 禁用按钮防止重复提交
                $('#post').val("正在提交...").attr({ disabled: "disabled" });
            },
            success: function (data) {
                $("#post").val("提交").removeAttr("disabled");
                if(data.code==-1){
                    swal("很抱歉，提交失败！请联系客服，我们将尽快解决您出现的问题！")
                }else if(data.code==1){
                    swal("发布成功，活动正在审核，请留意短信通知。")
                    window.location.href=window.location.href
                }
            }
        })
    }

})
//预览
$("#preview").click(function () {
    var Data={}
    var jsonArr = new Array();
    var jsontag = new Array();
    var jsonroof = new Array();
    var jsonnav = new Array();
    var meeting=editor1.document.getBody().getHtml()
    var schedule=editor2.document.getBody().getHtml()
    var guest=editor3.document.getBody().getHtml()
    var ticket=editor4.document.getBody().getHtml()
    var _html="<p><br></p>"
    $(".mes").each(function(i){
        Data[$(".mes")[i].id]=$(".mes")[i].value
    })      //基本信息
    if($("#fee").attr("checked")=="checked"){
        $(".project").each(function(i){             /*票价*/
            var str=$($(".project")[i]).children();
            var c={"Fee_name":$(str[0]).html(),"price":$(str[1]).html(),"serve":$(str[3]).html(),"deadline":$(str[2]).html()};
            jsonArr.push(c);
        })
        Data["ticket_price"]=JSON.stringify(jsonArr)
    }else{
        Data["ticket_price"]="[]"
    }      //票价
    $(".event_cat_tag").each(function (i) {
        if($($(".event_cat_tag")[i]).attr("checked")=="checked"){
            jsontag.push($(this).val())
        }
    })
    Data["event_tag"]=JSON.stringify(jsontag)           //会议标签
    $("input[name=pathway]").each(function (i) {
        if($("input[name=pathway]")[i].checked="checked"){
            Data["invoice"]=$(this).val()
        }
    })       //发票
    $("input[name=evidence]").each(function (i) {
        if($($("input[name=evidence]")[i]).attr("checked")=="checked"){
            jsonroof.push($(this).val())
        }
    })
    $(".nav-pills li").each(function (i) {
        jsonnav.push($($(".nav-pills li")[i]).text())
    })
    Data["evidence"]=JSON.stringify(jsonroof)
    Data["charge"]= $("#charge").attr("checked")
    Data["meeting"]=meeting
    Data["schedule"]=schedule
    Data["guest"]=guest
    Data["ticket"]=ticket
    Data["meeting_title_name"]=JSON.stringify(jsonnav)
    var ExportForm = document.createElement("FORM");
    document.body.appendChild(ExportForm);
    ExportForm.method = "post";
    ExportForm.target="_blank";
    for (var i in Data){
        var newElement = document.createElement("input");
        newElement.setAttribute("name", i);
        newElement.setAttribute("type", "hidden");
        ExportForm.appendChild(newElement);
        newElement.value = Data[i];
    }
    ExportForm.action = "/postevent_pre/";
    ExportForm.submit();
})
