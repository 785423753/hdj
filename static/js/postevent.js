/**
 * Created by Administrator on 2015/12/30 0030.
 */
var editor1=CKEDITOR.replace("notice")
var editor2=CKEDITOR.replace("meeting_date")
var editor3=CKEDITOR.replace("guest")
var editor4=CKEDITOR.replace("meeting_ticket")
$("#start_day").attr("value",laydate.now())
$("#end_day").attr("value",laydate.now())
$("#deadline").attr("value",laydate.now())
var start_day = {
    elem: '#start_day',
    event: 'focus',
    format: 'YYYY-MM-DD',
    min:laydate.now(), //设定最小日期为当前日期
    max: '2099-06-16', //最大日期
    istime: true,
    istoday: false,
    choose: function(datas){
        $("#end_day").attr("value",datas)
        $("#deadline").attr("value",datas)
    }
};
var end_day = {
    elem: '#end_day',
    event: 'focus',
    format: 'YYYY-MM-DD',
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
    format: 'YYYY-MM-DD',
    min:laydate.now(), //设定最小日期为当前日期
    max: '2099-06-16', //最大日期
    istime: true,
    istoday: false,
    choose: function(datas){
    }
};
laydate(start_day);
laydate(end_day);
laydate(deadtime);
for(var i=0;i<24;i++){
    if(i<10){
        i="0"+i
    }
    $("#start_time").append("<option>"+i+":00</option>")
    $("#end_time").append("<option>"+i+":00</option>")
}
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
    }
})
//    修改
var tr,str;
function change(obj){
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
//城市

//tag
var cat_id=$("#event_cat").val()
tags(cat_id)
$("#event_cat").change(function () {
    tags($(this).val())
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
$.ajax({
    url:'/show_city_json/',
    dataType:'text',
    type:'get',
    success: function (data) {
        console.log(data)
    }
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
            var c={"Fee_name":$(str[0]).html(),"price":$(str[1]).html(),"serve":$(str[2]).html(),"deadline":$(str[3]).html()};
            jsonArr.push(c);
        })
        Data["ticket_price"]=JSON.stringify(jsonArr)
    }else{
        Data["ticket_price"]="免费"
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
   console.log(Data)
    if($("#title").val()==""){
        swal("请填写会议标题")
    }else  if($("#address").val()==""){
        swal("请填写场馆名称")
    }else  if(meeting==_html&&schedule==_html&&guest==_html&&ticket==_html){
        swal("请填写会议详情")
    }else  if($("#fee").attr("checked")=="checked"&&$(".project").length==0){
        swal("请填写至少一种票价类型")
    }else  if($("#sponsor").val()==""){
        swal("请填写主办单位名称")
    }else  if(!$("#phone").val().replace(/[ ]/g,"").match(/0?(13|14|15|18|17)[0-9]{9}/)){
        swal("请填写正确的手机号码")
    }else  if(!$("#email").val().match(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/)){
        swal("请填写正确的邮箱地址")
    }else{

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
            var c={"Fee_name":$(str[0]).html(),"price":$(str[1]).html(),"serve":$(str[2]).html(),"deadline":$(str[3]).html()};
            jsonArr.push(c);
        })
        Data["ticket_price"]=JSON.stringify(jsonArr)
    }else{
        Data["ticket_price"]="免费"
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
})
