/**
 * Created by Administrator on 2015/9/21 0021.
 */
var editor1=CKEDITOR.replace("notice")
var editor2=CKEDITOR.replace("meeting_date")
var editor3=CKEDITOR.replace("guest")
var editor4=CKEDITOR.replace("meeting_ticket")
//$("#event_district").attr("disabled",true)
$(".new_event").each(function(i){
    if(i%2!=0){
        $($(".new_event")[i]).css({padding:"15px 0px 0px 40px"})
    }else{
        $($(".new_event")[i]).css({padding:"15px 40px 0px 0px"})
    }
} )
$(".trace_order_div ").remove();
$.ajax({
    type:'get',
    url :"/get_json_event_cat/",
    dataType : 'json',
    success  : function(data) {
        console.log(111111111111);
        console.log(data);
        for(var j=0;j<data[1].children.length;j++){
            $(".dropdown-menu").append("<li ><a onclick='changecat(this)' lang='"+data[1].children[j].id+"' >"+data[1].children[j].name+"</a></li>")
        }
    }
})
$.ajax({
    type:'get',
    url :"/get_json_tag_by_cat/6/",
    dataType : 'json',
    success  : function(data) {
        for(var i=0;i<data[0].tag.length;i++){
            $(".event_tag").append("<label><input class='event_cat_tag' type='checkbox' data-value='"+data[0].tag[i].id+"' />&nbsp;<span>"+data[0].tag[i].name+"</span></label>")
        }
    }
})
$.ajax({
    type:'get',
    url :"/show_city_json/",
    dataType : 'json',
    success  : function(data) {
        for(var i=0;i<data.length;i++){
            $("#event_city").append("<option value='"+data[i].own_id+"' >"+data[i].district_name+"</option>")
        }
    }
})
$.ajax({
    type:'get',
    url :"/show_city_json/",
    dataType : 'json',
    success  : function(data) {
        for(var i=0;i<data.length;i++){
            if(data[i].own_id==1){
                for(var j=0;j<data[i].child.length;j++){
                    $("#event_district").append("<option value='"+data[i].child[j].id+"' >"+data[i].child[j].district_name+"</option>")
                }
            }
        }
        $("#event_district").attr("disabled",true)
        $("#event_district").css({background:"#FFF"})
        $("#event_city").change(function(){
            var value=$("#event_city").val();
            $("#event_district").html("");
            for(var i=0;i<data.length;i++){
                if(data[i].own_id==value){
                    for(var j=0;j<data[i].child.length;j++){
                        $("#event_district").append("<option value='"+data[i].child[j].id+"' >"+data[i].child[j].district_name+"</option>")
                    }
                }
            }
           if(value==1||value==2||value==9||value==22){
                $("#event_district").attr("disabled",true)
           }else{
               $("#event_district").attr("disabled",false)
           }
        })
    },
    error : function() {

    }
})
function changecat(obj){
    $("#event_cat").html($(obj).html());
    $("#event_cat")[0].value=$(obj)[0].lang;
    var value=$(obj)[0].lang;
    $(".dropdown-menu").fadeOut(200)
    $(".event_tag").html("")
    $.ajax({
        type:'get',
        url :"/get_json_tag_by_cat/"+value+"/",
        dataType : 'json',
        success  : function(data) {
            for(var i=0;i<data[0].tag.length;i++){
                $(".event_tag").append("<label><input class='event_cat_tag' type='checkbox'  value='"+data[0].tag[i].id+"' />&nbsp;<span>"+data[0].tag[i].name+"</span></label>")
            }
        },
        error : function() {

        }
    })
}
//添加票价
var mark=0;          //保存
var a,c;            //提交数据
var flag=0;        //联系方式
var Flag=0;
var jsonArr = new Array();
var jsontag = new Array();
var postjson = new Array();
//保存
$(".save").click(function(){
    $(".add_tip").hide();
    var start=$("#start_time").val();
    var Fee_name=$("#Fee_name").val();
    var price=$("#price").val();
    var deadline=$("#deadline").val();
    var serve=$("#serve").val();
    var _html="<tr class='project'><td>"+Fee_name+"</td>" +
        "<td>"+price+"</td>" +
        "<td>"+serve+"</td>" +
        "<td >"+deadline+"</td>" +
        "<td ><span class='edit' onclick='feechange(this)'><span class='myfont' >&#xe601;</span>&nbsp;编辑</span><p/><span class='delete' onclick='expurgate(this)'>" +
        "<span class='myfont' >&#xf0002;</span>&nbsp;删除</span></td></tr>"
    if(mark==0&&Fee_name!=""&&price.match(/^(\.\d+)|^(\d+(\.\d+)?)$/)&&serve!=""&&deadline!=""){
            $(".t_head").show();
            $(_html).insertAfter(".t_head");
            $(".tips").html("");
            $(".add").hide();
    }else{
        if(price.match(/^(\.\d+)|^(\d+(\.\d+)?)$/)){
            $("#price").css({outline:"none"})
        }else{
            $("#price").css({outline:"1px solid rgba(255, 77, 67, 0.99)"})
        }
        if(serve==""){
            $("#serve").css({outline:"1px solid rgba(255, 77, 67, 0.99)"})
        }else{
            $("#serve").css({outline:"none"})
        }
        if(deadline==""){
            $("#deadline").css({outline:"1px solid rgba(255, 77, 67, 0.99)"})
        }else{
            $("#deadline").css({outline:"none"})
        }
    }
} )
//取消
$(".cancel").click(function (){
    if(mark==0){
        $(".add").hide();
        if($(".project").length==0){
            $(".add_fee").css({marginTop:"0px"})
        }
        //$("#price").attr("value","");
        //$(".add textarea").attr("value","");
        $(".tips").html("");
        $(".add_tip").hide();
        $("#price").css({outline:"none"})
        $("#serve").css({outline:"none"})
        $("#deadline").css({outline:"none"})
    }

})
//添加
$(".add_fee").click(function(){
    $(this).css({marginTop:"10px"})
    if($(".add").css("display")=="table-row"){
        $(".add_tip").show();
    }else{
        $(".add").show();
        $(".add_tip").hide();
        $(".add input").attr("value","");
        $(".add textarea").attr("value","");
        $(".add input").css({outline:"none"})
        $(".add textarea").css({outline:"none"})
        $("#Fee_name").attr("value","会务费");
        $("#deadline").attr("value",$("#start_time").val())
    }
} )
//修改
function feechange(obj){
    if(mark==1){
        alert("请先保存！")
        return false
    }
    mark=1;
    var td=$(obj).parent();
    var tr=$(td).parent();
    var str=tr.children();
    $(tr).hide();
    $(".add").show();
    $(".add_tip").hide();
    $("#Fee_name").attr("value",$(str[0]).html());
    $("#price").attr("value",$(str[1]).html());
    $("#deadline").attr("value",$(str[3]).html());
    $("#serve").attr("value",$(str[2]).html());
    $(".cancel").click(function (){
        $(tr).show();
        $(".add").hide();
        mark=0;
    })
    $(".save").click(function (){
        var start=$("#start_time").val();
        var Fee_name=$("#Fee_name").val();
        var price=$("#price").val();
        var deadline=$("#deadline").val();
        var serve=$("#serve").val();
        var _html="<tr class='project'><td>"+Fee_name+"</td>" +
            "<td>"+price+"</td>" +
            "<td>"+serve+"</td>" +
            "<td >"+deadline+"</td>" +
            "<td><span class='edit'onclick='feechange(this)'><span class='myfont' >&#xe601;</span>&nbsp;编辑</span><p/><span class='delete' onclick='expurgate(this)'>" +
            "<span class='myfont' >&#xf0002;</span>&nbsp;删除</span></td></tr>"
        if(price.match(/^[1-9]\d*|0$/)&&serve!=""&&deadline!="") {
            deadline = $("#start_time").val();
            $(tr).replaceWith(_html);
            mark = 0;
            $(".tips").html("");
            $(".add").hide();
        }else{
            if(price.match(/^[1-9]\d*|0$/)){
                $("#price").css({outline:"none"})
            }else{
                $("#price").css({outline:"1px solid rgba(255, 77, 67, 0.99)"})
            }
            if(serve==""){
                $("#serve").css({outline:"1px solid rgba(255, 77, 67, 0.99)"})
            }else{
                $("#serve").css({outline:"none"})
            }
            if(deadline==""){
                $("#deadline").css({outline:"1px solid rgba(255, 77, 67, 0.99)"})
            }else{
                $("#deadline").css({outline:"none"})
            }
        }
    })
}
//删除
function expurgate(obj){
    var td=$(obj).parent();
    var tr=$(td).parent();
    $(tr).remove();
    $(".add_tip").hide();
    //清空value
    $(".add input").attr("value","");
    $(".add textarea").attr("value","");
    //$(".add").show();
    if($(".project").length==0){
        $(".t_head").hide();
        $(".add_fee").css({marginTop:"0px"})
    }
}
$("#post_Contact").blur(function(){
    var str=$("#post_Contact").val()
    str = str.replace(/[ ]/g,"");
    if(str.match(/0?(13|14|15|18|17)[0-9]{9}/)){
        $("#post_Contact").css({border:"1px solid #ccc"});
        flag=1;
    }else{
        $("#post_Contact").css({border:"1px solid red"});
        flag=0;
    }
})
$("#email").blur(function(){
    var str=$("#email").val()
    if($.trim(str).match(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/)){
        $("#email").css({border:"1px solid #ccc"});
       Flag=1;
    }else{
        $("#email").css({border:"1px solid red"});
        Flag=0;
    }
})
//提交
$(".post").click(function(){
        $(".project").each(function(i){             /*票价*/
            var str=$($(".project")[i]).children();
            c={"Fee_name":$(str[0]).html(),"price":$(str[1]).html(),"serve":$(str[2]).html(),"deadline":$(str[3]).html()};
            jsonArr.push(c);
         })
        $(".event_cat_tag").each(function(i){      /*标签*/
                 if($(".event_cat_tag")[i].checked){
            var m={"tag_id":$(".event_cat_tag")[i].value}
            jsontag.push(m)
        }
            })
        var tags=JSON.stringify(jsontag)
        var fee=JSON.stringify(jsonArr)
        a={
            "event_cat": $("#event_cat").val(),
            "ticket_price":fee,
            "event_theme":$("#event_theme").val(),
            "start_time":$("#start_time").val(),
            "end_time":$("#end_time").val(),
            "event_province":$("#event_city").val(),
            "event_district":$("#event_district").val(),
            "event_address":$("#addr").val(),
            "meeting_notice":editor1.document.getBody().getHtml(),
            "meeting_date":editor2.document.getBody().getHtml(),
            "meeting_guest":editor3.document.getBody().getHtml(),
            "meeting_ticket":editor4.document.getBody().getHtml(),
            "model":"st2",
            "event_tag": tags,
            "post_name":$("#post_name").val(),
            "post_linkman":$("#post_linkman").val(),
            "post_Contact":$("#post_Contact").val(),
            "email":$("#email").val(),
            pay_spread:$("input[name=pay_spread]:checked ").val()
        }
        var m=0;
        for(var i=0;i<$(".e_val").length;i++){
            var k=$(".e_val")[i].value;
            postjson.push(k);
            if(k!=""){
                m++;
                if(m==10&&flag==1&&Flag==1){             //验证
                    $(".post").html("正在提交")
                            $.ajax({
                                url: "/postevent_act/",
                                type: "post",
                                data:a,
                                dataType: "json",
                                async: false,
                                error: function() {
                                    $(".model_tip").html("很抱歉！提交失败");
                                    $('#exampleModal').modal();
                                },
                                success: function(data) {
                                    if(data.code==1){
                                        $(".model_tip").html("发布成功，活动正在审核，请留意短信通知。");
                                        $('#exampleModal').modal();
                                        $(".post").html("提交成功");
                                        $(".modal").click(function (){
                                            window.location.href= window.location.href;
                                        })
                                    }else{
										if(data.code == -1){
											$(".model_tip").html("抱歉，该活动已进入审核阶段，请勿重复提交。谢谢！");
											$('#exampleModal').modal();
                                            $(".post").html("免费发布");
										}
										else{	
											$(".model_tip").html("很抱歉！提交失败");
											$('#exampleModal').modal();
                                            $(".post").html("免费发布");
										}
                                    }
                                }
                            })
                }
            }else{
                var j=$(".e_val")[i].name
                var str=$("label[for="+j+"]").html()
                $(".model_tip").html(str+"还没有填写！")
                $('#exampleModal').modal();
                //$($(".e_val")[i]).focus();
                break;
            }
        }
} )
//点击预览
$(".preview").click(function (){
    var jsonArr_p=new Array();
    var jsontag_p=new Array();
    $(".project").each(function(i){             /*票价*/
        var str=$($(".project")[i]).children();
        c={"Fee_name":$(str[0]).html(),"price":$(str[1]).html(),"serve":$(str[2]).html(),"deadline":$(str[3]).html()};
        jsonArr_p.push(c);
    })
    $(".event_cat_tag").each(function(i){      /*标签*/
        if($(".event_cat_tag")[i].checked){
            var m={"tag_id":$(".event_cat_tag")[i].value}
            jsontag_p.push(m)
        }
    })
    var tags=JSON.stringify(jsontag_p)
    var fee=JSON.stringify(jsonArr_p)
    a={
        "preview":"1",
        "event_cat": $("#event_cat").val(),
        "ticket_price":fee,
        "event_theme":$("#event_theme").val(),
        "start_time":$("#start_time").val(),
        "end_time":$("#end_time").val(),
        "event_province":$("#event_city").val(),
        "event_district":$("#event_district").val(),
        "event_address":$("#addr").val(),
        "meeting_notice":editor1.document.getBody().getHtml(),
        "meeting_date":editor2.document.getBody().getHtml(),
        "meeting_guest":editor3.document.getBody().getHtml(),
        "meeting_ticket":editor4.document.getBody().getHtml(),
        "model":"st2",
        "event_tag": tags,
        "post_name":$("#post_name").val(),
        "post_linkman":$("#post_linkman").val(),
        "post_Contact":$("#post_Contact").val(),
        "email":$("#email").val()
    }
    //var postUrl = url;//提交地址
    var ExportForm = document.createElement("FORM");
    document.body.appendChild(ExportForm);
    ExportForm.method = "POST";
    ExportForm.target="_blank";
    for (var i in a){
        var newElement = document.createElement("input");
        newElement.setAttribute("name", i);
        newElement.setAttribute("type", "hidden");
        ExportForm.appendChild(newElement);
        newElement.value = a[i];
    }
    ExportForm.action = "/postevent_act/";
    ExportForm.submit();
})
//活动类型
$("#event_cat").click(function (event){
    $(".dropdown-menu").fadeToggle(200);
    event.stopPropagation();
})
$(".event_cats").click(function (event){
    $(".dropdown-menu").fadeToggle(200);
    event.stopPropagation();
})
$(".mycontent").click(function (){
    if($(".dropdown-menu").css("display")=="block"){
        $(".dropdown-menu").fadeOut(200)
    }

})
//日期
var start = {
    elem: '#start_time',
    event: 'focus',
    format: 'YYYY/MM/DD',
    min: laydate.now(), //设定最小日期为当前日期
    max: '2099-06-16', //最大日期
    istime: true,
    istoday: false,
    choose: function(datas){
        end.min = datas; //开始日选好后，重置结束日的最小日期
        end.start = datas; //将结束日的初始值设定为开始日
        dead.max=datas;
        $("#deadline").attr("value",$("#start_time").val());
        $("#end_time").attr("value",$("#start_time").val());
    }
};
var end = {
    elem: '#end_time',
    event: 'focus',
    format: 'YYYY/MM/DD',
    min: laydate.now(),
    max: '2099-06-16',
    istime: true,
    istoday: false,
    choose: function(datas){
        start.max = datas; //结束日选好后，重置开始日的最大日期
    }
};
var dead = {
    elem: '#deadline',
    event: 'focus',
    format: 'YYYY/MM/DD',
    min: laydate.now(),
    max: '2099-06-16',
    istime: true,
    istoday: false,
    choose: function(datas){

    }
};
laydate(start);
laydate(dead);
laydate(end);

