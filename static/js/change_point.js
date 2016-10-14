$(".talk_result").click(function () {
    var sel = $(".talk_result").val();
    if(sel=="2"){
        $("#rmb").css({display:"block"});
    }
});

$("#subMit").click(function () {

    var str="";
    var html="";
    $('.talk_by_ul li ').each(function(){
        var con = $(this).find('input').eq(1).val();
        if($(this).find("input").is(":checked")){
            html+=$(this).find("input").val()+':'+con+'/';
        }
        var sub =  html.substr(0,html.length-1);
        $("#talk_by").val(sub);
    });

    var idv = $(".sub_co .idvs li").find("input").eq(4).val();
    var rmb = $("#rmb").val();
    $("#charge").val(rmb);
    
    if(rmb!=""){
        $(".sub_co .idvs li").find("input").eq(4).val("佣金比"+rmb+"(票务合作)")
    }else{
        $("#rmb").val("");
        $(".sub_co .idvs li").find("input").eq(4).val(idv)
    }

    $(".sub_co .idvs li").each(function () {
        if($(this).find("input").is(":checked")){
            str+=$(this).find("input").val()+'/';
        }
    });
    str=str.substr(0,str.length-1);
    $("#sub_result").val(str);
    var talk_by = $("#talk_by").val();
       $("#myform").submit();
});


var sub_co = {'1':['需要和领导沟通','一直不回复','联系不上','不透露费用','需先了解'],
    '2':['Logo(媒体合作)','资料入袋(媒体合作)','会刊(媒体合作)','易拉宝(媒体合作)',
        '佣金比(票务合作)'
    ],
    '3':['投诉'],
    '4':['内部/闭门会议','粗鲁挂电话','介意支付功能','自己有推广渠道','有合作,变挂','投诉'],
    '5':['没主动谈','不愿深合作']};

document.getElementsByClassName('talk_result')[0].onchange=function(){
    sub_arr = sub_co[this.value];

    if(sub_co[this.value]){
        str = '';
        str+="<ul class='idvs'>"
        for(var i=0;i<sub_arr.length;i++){
            str+="<li>"
            str += "<input type='checkbox'  value='"+sub_arr[i]+"' />"+sub_arr[i];
            str+="</li>"
        }
        str+="</ul>";
        str+="<input type='text' id='rmb' placeholder='请输入佣金比' style='display: none'>";
        document.getElementsByClassName('sub_co')[0].innerHTML=str
    }else{
        document.getElementsByClassName('sub_co')[0].innerHTML=''
    }
};




$(".talk_by_ul li").click(function () {
    if($(this).find(":checkbox").is(":checked")){
        $(this).find("input").eq(1).show();
    }else{
        $(this).find("input").eq(1).hide();
    }
});


//添加默认选中
$(function(){
    //联系方式默认选中
    var val = $('.chose_contact').text();
    var touch = []
    var dct = {}
    for(var i=0;i<val.split('/').length;i++){
        if(val.split('/')[i].split(':')[0]){
            touch.push(val.split('/')[i].split(':')[0]);
            dct[val.split('/')[i].split(':')[0]] = val.split('/')[i].split(':')[1]
        }
        
    }
    

    
    $('.talk_by_ul li').each(function(index){
        var var_touch = $(this).find('input').eq(0).val()

        if(touch!=[]){
            if(touch.indexOf(var_touch)!=-1){
                $(this).find('input').eq(0).attr('checked','checked')
            }
            
            if(touch.indexOf(var_touch)!=-1){
                $(this).find('input').eq(1).css('display','')
                $(this).find('input').eq(1).val(dct[var_touch]);
            }
            
            
        }
        
        
    });
    
    //洽谈结果默认选中
    var point = $(".point").text();
    if( !point ){
        point = '0'
    }
    $(".talk_result").val(point);
    sub_arr = sub_co[point];
    if(sub_arr){
        str = '';
        str+="<ul class='idvs'>"
        for(var i=0;i<sub_arr.length;i++){
            str+="<li>"
            str += "<input type='checkbox'  value='"+sub_arr[i]+"' />"+sub_arr[i];
            str+="</li>"
        }
        str+="</ul>";
        str+="<input type='text' id='rmb' placeholder='请输入佣金比' style='display: none'>";
        
        $('.sub_co').html(str)
    }
    //具体合作方式
    var chose_join = $(".chose_join").text();
    var arr_lst = chose_join.split('/')

    var arr = []
    for(var i=0;i<arr_lst.length;i++){
        arr.push(arr_lst[i])
    }

    $('.sub_co ul li').each(function(index){
        var this_val = $(this).find('input').eq(0).val();

        if(arr.indexOf(this_val)!=-1){
            $(this).find('input').eq(0).attr('checked','checked')
        }
    });
});

//function s(e,a)
//{
//    if ( e && e.preventDefault )
//        e.preventDefault();
//    else
//        window.event.returnValue=false;
//    a.focus();
//
//}