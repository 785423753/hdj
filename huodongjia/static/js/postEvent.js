/**
 * Created by Administrator on 2015/12/30 0030.
 */
var editor1=CKEDITOR.replace("notice")
var editor2=CKEDITOR.replace("meeting_date")
var editor3=CKEDITOR.replace("guest")
var editor4=CKEDITOR.replace("meeting_ticket")

function getPreDay(s){
    var y = parseInt(s.substr(0,4), 10);

    var m = parseInt(s.substr(4,2), 10)-1;

    var d = parseInt(s.substr(6,2), 10);

    var dt = new Date(y, m, d-1);

    y = dt.getFullYear();

    m = dt.getMonth()+1;

    d = dt.getDate();

    m = (m>=10)?m:"0"+m;
    d = (d>=10)?d:"0"+d;

    return y + "-" + m + "-" + d;

}
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
        $("#end_day").attr("value",datas)

        end_day.min = datas
        deadtime.max = datas
        var days=DateDiff(laydate.now().slice(0,10),datas.slice(0,10))
        if(days<7) swal('请在会议开始前一周提交')
        var s=datas.split(' ')[0].replace(/-/g,'');
        var time=getPreDay(s);
        $("#deadline").attr("value",time+" 17:00")
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
    max: '2099-06-16', //最大日期
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
        $(fee_name).attr("value",'')
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
        }
    }
})
$("#add_price").click(function () {
    $(".add_div").slideDown(10)
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
                $("#Fee_name").attr("value",'')
                $("#price").attr("value",'')
                $("#serve").attr("value",'')
                issave=0;
            }
        }
    })
    $(".cancel").click(function () {
        if(issave==1){
            $(tr).show()
            $("#Fee_name").attr("value",'')
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
    $(".ticket,.invoice_info").show()
    $('#event_price_type').val(6)
})
$("#free").focus(function () {
    $(".ticket,.invoice_info").hide()
    $('#event_price_type').val(4)
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
function tags(tag,tag_id){
    $.ajax({
        url:'/get_json_tag_by_cat/'+tag+'/',
        dataType:'text',
        type:'get',
        success: function (data) {
            $(".event_tag").html(data)
            $('.event_cat_tag').each(function () {
                for(var i in tag_id){
                    if($(this).val()==tag_id[i]){
                        $(this).attr('checked','checked')
                    }
                }
            })
        }
    })
}
function changecity(id,Value){
    $.ajax({
        url:'/show_city_json/'+id+"/",
        dataType:'text',
        type:'get',
        success: function (data) {
            $("#city").html(data)
            $("#city").val(Value)
        }
    })
}
//发送验证码
$('.send_code').on('click',function () {
    var dateObj,s="";
    dateObj = new Date();
    s+=dateObj.getFullYear();
    s+=dateObj.getMonth()+1;
    s+=dateObj.getDate();
    s+=dateObj.getHours();
    s+=dateObj.getMinutes();
    s+=dateObj.getSeconds();
    var set, i = 60;
    var url = "/send_check_mesages/";
    var tel = $.trim($("#phone").val());
    if (tel != "" && (/^1[3-8]+\d{9}$/).test(tel)) {
        $(".send_code").attr({disabled: "disabled"});
        $.ajax({
            url:url,
            type:'get',
            data:{
                tel: tel,time:s
            },
            dataTyoe:'json',
            success:function (data) {
                console.log(data.flag)
                // if(data.flag){
                    set = setInterval(function () {
                        $(".send_code").text("重发还有" + i + "秒").attr({disabled: "disabled"});
                        i--;
                        if (i < 0) {
                            clearInterval(set);
                            $(".send_code").text("重新发送").removeAttr("disabled")
                        }
                    }, 1000)
                // }else{
                //     $(".send_code").text("发送失败,重新发送").removeAttr("disabled")
                // }
            },
            fail:function () {
                $(".send_code").text("发送失败,重新发送").removeAttr("disabled")
            }
        });
    } else {
        swal("请输入正确的手机号码")
    }
    return false
});
$("#checkcode").blur(function () {
    var phone=$.trim($("#phone").val());
    var captcha=$.trim($(this).val());
    var url="/verify_tel_captcha/";
    $.post(url,{mobilphone:phone,captcha:captcha}, function (data) {
            var flag=jQuery.parseJSON(data).flag;
            if(flag==true){
                $("#checkcode").attr("data-captcha","true");
                $("#checkcode").css({borderColor:'#ACB0BB'})
            }else{
                $("#checkcode").attr("data-captcha","false");
                $("#checkcode").css({borderColor:'red'})
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
                    $('.error').css({width:'auto',top:'30px',left:'155px'}).text('该活动已存在，请勿重复提交！').fadeIn(10)
                    $('.arrow').fadeIn(10)
                }else{
                    var key=['发布会','沙龙','旅游','路演','课程培训','评选会','展览','讲座']
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
//提交
$("#post").click(function () {
    var Data={}
    var jsonArr = new Array();
    var jsontag = new Array();
    var jsonnav = new Array();
    var meeting=editor1.document.getBody().getHtml()
    var schedule=editor2.document.getBody().getHtml()
    var guest=editor3.document.getBody().getHtml()
    var ticket=editor4.document.getBody().getHtml()
    var _html="<p><br></p>";
    var invoice= {
       ticket_type:"",       //门票类型
       ticket_other:'',        //门票-其他
       attend_type:"",               //参会凭证
       invoice_type:"",            //发票类型
       invoice_content:'',         //发票内容
       invoice_send_type:"",           //发票领取方式
       invoice_send_time:{},        //开具时间
       refund:''                           //退款说明
   };
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
    var arry_1=[],arry_2=[],arry_3=[],arry_4=[];
    $("input[name=invoice_type]").each(function () {
        if($(this).attr('checked')=='checked'){
            arry_1.push($(this).val());
        };
        Data["invoice_type"]=JSON.stringify(arry_1);
    })
    $("input[name=invoice_send_type]").each(function () {
        if($(this).attr('checked')=='checked'){
            arry_2.push($(this).val());
        };
        Data["invoice_send_type"]=JSON.stringify(arry_2);
    })
    $("input[name=attend_type]").each(function () {
        if($(this).attr('checked')=='checked'){
            arry_3.push($(this).val());
        };
        Data["attend_type"]=JSON.stringify(arry_3);
    })
    $("input[name=ticket_type]").each(function () {
        if($(this).attr('checked')=='checked'){
            arry_4.push($(this).val());
        };
        Data["ticket_type"]=JSON.stringify(arry_4);
    })
    $("input[name=invoice_time]").each(function () {
        if($(this).attr('checked')=='checked'){
            var day=$(this).parent().find('.day').val();
            Data.invoice_send_time={id:"",text:""}
            Data.invoice_send_time.id=$(this).val();
            Data.invoice_send_time.text=day;
        };

    })
    Data["invoice_content"]=$("input[name=invoice_content]").val()
    Data["refund"]=$("textarea[name=refund]").val()
    Data["ticket_type_content"]=$("input[name=ticket_other]").val()
    // Data["invoice"]=invoice;
    $(".nav-pills li").each(function (i) {
        jsonnav.push($($(".nav-pills li")[i]).text())
    })
    Data["meeting"]=meeting
    Data["schedule"]=schedule
    Data["guest"]=guest
    Data["ticket"]=ticket
    Data["meeting_title_name"]=JSON.stringify(jsonnav);
    if($('.sposors span').length > 0){
        var spon=[];
        $('.sposors span').each(function () {
            spon.push($(this).text())
        })
        Data.sponsor=spon.join(',')
    }
    if(Data.title==""){swal("请填写会议标题");return false}
    if(Data.start_day==""){swal("请填写会议开始时间");return false}
    if(Data.address==""){swal("请填写场馆名称");return false}
    //if(Data.img==""){swal("请上传会议主图");return false}
    if(meeting==_html&&schedule==_html&&guest==_html&&ticket==_html){swal("请填写会议详情");return false}
    if(Data.sponsor == ""){swal("请添加主办方");return false}
    if(Data.event_price_type == "6"){
        if($(".project").length==0){swal("请保存票价");return false};
        if(Data.invoice_type == "[]"){swal("请选择发票类型");return false}
        //if(Data.invoice_send_type == "[]"){swal("请选择发票领取方式");return false}
        if(Data.invoice_time == ""){swal("请选择发票开具时间");return false}
        if(Data.ticket_type == "[]"){swal("请选择参会凭证里的门票类型");return false}
     
    }
    if(Data.name == ""){swal("请填写联系人");return false}
    //if(!(/^1+\d{10}$/).test(Data.phone)){swal("请填写正确的手机号码");return false}
    if($("#checkcode").attr("data-captcha")!="true"){swal("验证码错误");return false}
    if(!Data.email.match(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/)){swal("请填写正确的邮箱地址");return false}
    if(!$('#rule').attr('checked')){swal("请仔细阅读并勾选活动家服务条款");return false};
    if($(this).attr('data-sign')==0){
        var str = JSON.stringify(Data);
        sessionStorage.obj = str;
        $('#login').show()
        $('.close').click(function(){
            $('#login').hide()
        })
    }else{
        $.ajax({
            url: "/testpostact/",
            type: "post",
            data: Data,
            dataType: "json",
            async: true,
            beforeSend: function () {
                // 禁用按钮防止重复提交
                $("#post").attr("value","正在提交...")
                $("#post").attr("disabled", "disabled")
            },
            success: function (data) {
                $("#post").attr("value","提交")
                $("#post").removeAttr("disabled")
                if(data.code==-1){
                    swal("很抱歉，提交失败！请联系客服，我们将尽快解决您出现的问题！")
                }else if(data.code==1){
                    swal("提交成功，我们将在24小时内审核您的会议，因提交的会议太多，请耐心等待，审核后会短信通知您，谢谢。")
                    sessionStorage.obj = '';
                    $('.confirm').click(function(){
                        window.location.href='http://www.huodongjia.com/usercenter/index/?ind=myevent'
                    })
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
function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式
    var  aDate,  oDate1,  oDate2,  iDays
    aDate  =  sDate1.split("-")
    oDate1  =  new Date(aDate[0] , aDate[1]- 1 ,aDate[2])     //转换为12-18-2006格式
    aDate  =  sDate2.split("-")
    oDate2  =  new Date(aDate[0] , aDate[1]- 1 ,aDate[2])
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
    return  iDays
}
window.onload= function () {
    if(sessionStorage.obj&&$('#post').attr('data-sign')==1){
        swal('正在提交...')
        var session_data=JSON.parse(sessionStorage.obj)

        $.ajax({
            url: "/postevent_act/",
            type: "post",
            data: session_data,
            dataType: "json",
            async: false,
            beforeSend: function () {
                // 禁用按钮防止重复提交
                $("#post").attr("value","正在提交...")
                $("#post").attr("disabled", "disabled")
            },
            success: function (data) {
                $("#post").attr("value","提交")
                $("#post").removeAttr("disabled")
                if(data.code==-1){
                    swal("很抱歉，提交失败！请联系客服，我们将尽快解决您出现的问题！")
                }else if(data.code==1){
                    swal("提交成功，我们将在24小时内审核您的会议，因提交的会议太多，请耐心等待，审核后会短信通知您，谢谢。")
                    sessionStorage.obj = '';
                    $('.confirm').click(function(){
                        window.location.href='http://www.huodongjia.com/usercenter/index/?ind=myevent'
                    })
                }
            }
        })
    }
}

//获取本地存储数据
//if(sessionStorage.obj){
//    var session=JSON.parse(sessionStorage.obj)
//    
//    $('#title').val(session.title)
//    $('#scale').val(session.scale)
//    $('#start_day').val(session.start_day)
//    $('#address').val(session.address)
//    $('#end_day').val(session.end_day)
//    $('#province').val(session.province)
//    $('#event_cat').val(session.event_cat)
//    $('#name').val(session.name)
//    $('#phone').val(session.phone)
//    $('#email').val(session.email)
//    $('#checkcode').val(session.checkcode)
//    $('#sponsor').val(session.sponsor)
//    $('#url').val(session.url)
//    $('.invoice input').each(function () {
//        if($(this).val()==session.invoice){
//            $(this).attr('checked','checked')
//        }
//    })
//    $('.proof input').each(function () {
//        for(var i in JSON.parse(session.evidence)){
//            if($(this).val()==JSON.parse(session.evidence)[i]){
//                $(this).attr('checked','checked')
//            }
//        }
//    })
//    var Price=JSON.parse(session.ticket_price)
//    for(var i in Price){
//        var _html="<tr class='project'>" +
//            " <td>"+Price[i].Fee_name+"</td><td>"+Price[i].price+"</td><td>"+Price[i].deadline+"</td><td style='width: 38%'>"+Price[i].serve+"</td>" +
//            "<td style='width: 10%;padding:10px 0;'><span class='edit' onclick='change(this)'><font class='myfont'>&#xe601;</font>编辑</span><p/><span class='edit' onclick='expurgate(this)'><font class='myfont'>&#xf0002;</font>删除</span></td>" +
//            "</li>"
//        if(Price.length>0){
//            $('.t_head').show().after(_html)
//        }
//    }
//    window.onload= function () {
//        changecity(session.province,session.city)
//        tags(session.event_cat,JSON.parse(session.event_tag))
//        setTimeout(function(){
//            $('#cke_1_contents iframe').contents().find("body").html(session.meeting)
//            $('#cke_2_contents iframe').contents().find("body").html(session.schedule)
//            $('#cke_3_contents iframe').contents().find("body").html(session.guest)
//            $('#cke_4_contents iframe').contents().find("body").html(session.ticket)
//        },100)
//    }
//}
//获取本地存储数据
