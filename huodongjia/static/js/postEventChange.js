/**
 * Created by Administrator on 2016/1/5 0005.
 */
var start_day = {
    elem: '#start_day',
    event: 'focus',
    format: 'YYYY-MM-DD hh:mm',
    min:laydate.now(), //设定最小日期为当前日期
    max: '2099-06-16', //最大日期
    istime: true,
    istoday: false,
    choose: function(datas){
        $("#start_day").attr("value",datas)
        //$("#end_day").attr("value",datas)
        $("#deadline").attr("value",datas)
        deadtime.max = datas
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
        $("#end_day").attr("value",datas)
    }
};
var deadtime = {
    elem: '#deadline',
    event: 'focus',
    format: 'YYYY-MM-DD hh:mm',
    //min:laydate.now(), //设定最小日期为当前日期
    //max: '2099-06-16', //最大日期
    istime: true,
    istoday: false,
    choose: function(datas){
        $("#deadline").attr("value",datas)
    }
};
laydate.skin('danlan')
laydate(start_day);
laydate(end_day);
laydate(deadtime);

$("#fee").focus(function () {
    $(".ticket").show()
})
$("#free").focus(function () {
    $(".ticket").hide()
})
//城市
//tag
//var cat_id=$("#event_cat").val()
//tags(cat_id)
//$("#event_cat").change(function () {
//    tags($(this).val())
//})
$(".all_cat li").click(function () {
    $.ajax({
        url:'/get_json_tag_by_cat/'+$(this).attr("title")+'/',
        dataType:'text',
        type:'get',
        success: function (data) {
            $(".event_tag").html(data)
        }
    })
})
$("#province").change(function () {
    changecity($(this).val())
})
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
//票种
//    保存
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
    if(!parseFloat(price.val())||!price.val().match(/^(\.\d+)|^(\d+(\.\d+)?)$/)){
        $(price).addClass("not")
    }else{
        $(price).removeClass("not")
    }
    if(explain.val()==""){
        $(explain).addClass("not")
    }else{
        $(explain).removeClass("not")
    }
    if(fee_name.val()!=""&&parseFloat(price.val())&&price.val().match(/^(\.\d+)|^(\d+(\.\d+)?)$/)&&explain.val()!=""&&issave==0){
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
//嘉宾

//提交
$("#post").click(function () {
    var Data={}
    var jsonArr = new Array();
    var jsontag = new Array();
    var jsonroof = new Array();
    var jsonguest = new Array();
    var meeting=$($(".event_content")[0]).html()
    var schedule=$($(".event_content")[1]).html()
    if($(".event_content").length>=3){
        var guest=$($(".event_content")[2]).html()
    }else{
        $(".guest").each(function(i){             /*票价*/
            var img_url=$($(".guest")[i]).find("img").attr("src")
            var img_id=$($(".guest")[i]).find(".imgId").val()
            var guest_id=$($(".guest")[i]).find(".guestId").val()
            var name=$($(".guest")[i]).find(".name").text()
            var company=$($(".guest")[i]).find(".company").text()
            var job=$($(".guest")[i]).find(".job").text()
            var theme=$($(".guest")[i]).find(".theme").text()
            var guest_intro=$($(".guest")[i]).find(".guest_intro").text()
            var c={"img_url":img_url,"name":name,"company":company,"job":job,"theme":theme,"guest_intro":guest_intro,"img_id":img_id,"guest_id":guest_id};
            jsonguest.push(c);
        })
        guest=JSON.stringify(jsonguest)
    }
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
        if($("input[name=pathway]")[i].checked==true){
            Data["invoice"]=$(this).val()
        }
    })       //发票
    $("input[name=evidence]").each(function (i) {
        if($($("input[name=evidence]")[i]).attr("checked")=="checked"){
            jsonroof.push($(this).val())
        }
    })
    if($("#charge").attr("checked")=="checked"){
        $("#charge").attr('value','8')
    }else{
        $("#charge").attr('value','0')
    }
    Data["evidence"]=JSON.stringify(jsonroof)
    Data["charge"]= $("#charge").val()
    Data["event_id"]= $("#event_id").val()
    Data["cat"]=$(".active_cat").attr("title")

    // 段落
    var par = [];
    var guest_arr = [];
    var all_guest_html = "";

    $('.event_all .event_para').each(function(){
        var par_item = {}
        var par_title = $(this).find('.event_item').text();
        var par_content = $(this).find('.event_content').html();
        par_item['par_title'] = par_title;
        par_item['par_content'] = par_content;

        if(par_title=='会议嘉宾'){
            

            $('.event_guest').find('.guest').each(function(){
                var guest_item = {};
                var guest_html = '';
                // 
                var guest_id = $(this).find('input[class=guest_id]').val();
                var guest_name = $(this).find('.name').text();
                var guest_img_id = $(this).find('input[class=img_id]').val();
                var guest_company = $(this).find('.company').text();
                var guest_job = $(this).find('.job').text();
                var guest_intro = $(this).find('.guest_intro').text();
                var guest_theme = $(this).find('.theme').text();
                var guest_img_src = $(this).find('img').attr('src');

                guest_item['guest_id'] = guest_id;
                guest_item['guest_name'] = guest_name;
                guest_item['guest_img_id'] = guest_img_id;
                guest_item['guest_company'] = guest_company;
                guest_item['guest_job'] = guest_job;
                guest_item['guest_intro'] = guest_intro;
                guest_item['guest_theme'] = guest_theme;
                //
                if(guest_id){
                    guest_html += '<div class="guest" id="'+guest_id+'" style="float:left;margin-left:10px;"><img src="'+guest_img_src+'" />';
                    guest_html += '<div>'+guest_name+'</div>';
                    guest_html += '<div>'+guest_company+'</div>';
                    guest_html += '<div>'+guest_job+'</div>';
                    guest_html += '</div>'
                }
                

                guest_arr.push(guest_item);
                // 
                all_guest_html += guest_html;
                
            });

            par_item['par_content'] = $($('.event_content')[2]).html();

        }


        par.push(par_item);

    });


    Data['paragraph'] = JSON.stringify(par);
    Data['guest'] = JSON.stringify(guest_arr);
    //嘉宾

    if($("#title").val()==""){
        swal("请填写会议标题")
    }else  if($("#address").val()==""){
        swal("请填写场馆名称")
    }else  if($("#fee").attr("checked")=="checked"&&$(".project").length==0){
        swal("请填写至少一种票价类型")
    }else{
        $(this).val("正在提交...")
        $.ajax({
            url: "/publish/saveChange/",
            type: "post",
            data: Data,
            dataType: "json",
            async: false,
            success: function (data) {
                $("#post").val("提交")
                if(data.code==-1){
                    swal("很抱歉，提交失败！")
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
    var jsonguest = new Array();
    var meeting=$($(".event_content")[0]).html()
    var schedule=$($(".event_content")[1]).html()
    if($(".event_content").length>=3){
        var guest=$($(".event_content")[2]).html()
    }else{
        $(".guest").each(function(i){             /*票价*/
            var img_url=$($(".guest")[i]).find("img").attr("src")
            var img_id=$($(".guest")[i]).find(".imgId").val()
            var guest_id=$($(".guest")[i]).find(".guestId").val()
            var name=$($(".guest")[i]).find(".name").text()
            var company=$($(".guest")[i]).find(".company").text()
            var job=$($(".guest")[i]).find(".job").text()
            var theme=$($(".guest")[i]).find(".theme").text()
            var guest_intro=$($(".guest")[i]).find(".guest_intro").text()
            var c={"img_url":img_url,"name":name,"company":company,"job":job,"theme":theme,"guest_intro":guest_intro,"img_id":img_id,"guest_id":guest_id};
            jsonguest.push(c);
        })
        guest=JSON.stringify(jsonguest)
    }
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
        if($("input[name=pathway]")[i].checked=="checked"){
            Data["invoice"]=$(this).val()
        }
    })       //发票
    $("input[name=evidence]").each(function (i) {
        if($($("input[name=evidence]")[i]).attr("checked")=="checked"){
            jsonroof.push($(this).val())
        }
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
    Data["cat"]=$(".active_cat").attr("title")
    var ExportForm = document.createElement("FORM");
    document.body.appendChild(ExportForm);
    ExportForm.method = "get";
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

