$(function(){
    $(".slist-num:lt(3)").css({
        backgroundColor:"#FF9933"
    });

    $(".date_read").click(function(){
        $(".list_popup").show().css({left:($("body").width()-$(".list_popup").width())/2,top:($("body").height()-$(".list_popup").height())/2})
    });
    $(".clearDiv").click(function(){
        $(".list_popup").css({
            display:"none"
        })
    });
    $("#gotodown1").toggle(
        function () {
            $("#gotodown1").attr("src", "http://pic1.qkan.com/static/images/gotoup.png");
            $(".slist_city2").slideDown();
        },
        function () {
            $("#gotodown1").attr("src", "http://pic1.qkan.com/static/images/gotodown.png");
            $(".slist_city2").slideUp();
        }
    );
    $("#gotodown2").toggle(
        function () {
            $("#gotodown2").attr("src", "http://pic1.qkan.com/static/images/gotoup.png");
            $(".slist_tag2").slideDown();
        },
        function () {
            $("#gotodown2").attr("src", "http://pic1.qkan.com/static/images/gotodown.png");
            $(".slist_tag2").slideUp();
        }
    );
});
// 顶部图片轮播
jQuery(function ($) {
    $(".slide-pic>li:eq(0),.op>li:eq(0),.slide-txt>li:eq(0)").addClass("cur")
    if ($(".slide-pic").length > 0) {
        var defaultOpts = { interval: 5000, fadeInTime: 300, fadeOutTime: 200 };
        var _titles = $("ul.slide-txt li");
        var _titles_bg = $("ul.op li");
        var _bodies = $("ul.slide-pic li");
        var _count = _titles.length;
        var _current = 0;
        var _intervalID = null;
        var stop = function () { window.clearInterval(_intervalID); };
        var slide = function (opts) {
            if (opts) {
                _current = opts.current || 0;
            } else {
                _current = (_current >= (_count - 1)) ? 0 : (++_current);
            };
            _bodies.filter(":visible").fadeOut(defaultOpts.fadeOutTime, function () {
                _bodies.eq(_current).fadeIn(defaultOpts.fadeInTime);
                _bodies.removeClass("cur").eq(_current).addClass("cur");
            });
            _titles.removeClass("cur").eq(_current).addClass("cur");
            _titles_bg.removeClass("cur").eq(_current).addClass("cur");
        };
        var go = function () {
            stop();
            _intervalID = window.setInterval(function () { slide(); }, defaultOpts.interval);
        };
        var itemMouseOver = function (target, items) {
            stop();
            var i = $.inArray(target, items);
            slide({ current: i });
        };
        _titles.hover(function () { if ($(this).attr('class') != 'cur') { itemMouseOver(this, _titles); } else { stop(); } }, go);
        _bodies.hover(stop, go);
        go();
    }
});

// 顶部图片轮播结束

   $(function(){



//限制字符个数
       $(".table_div ul li a").each(function(){
           var maxwidth=10;
           if($(this).text().length>maxwidth){
               $(this).text($(this).text().substring(0,maxwidth));
               $(this).html($(this).html()+'...');
           }
       });

       $(".slist-title").each(function(){
           var maxwidth=29;
           if($(this).text().length>maxwidth){
               $(this).text($(this).text().substring(0,maxwidth));
               $(this).html($(this).html()+'...');
           }
       });

       $(".more").click(function(){
           $(".list_ul2").css({
              display:"none"
           });
           $(".list_ul").css({
               backgroundColor:"#fcfcfc"
           });
           $(".list_ul").find("a").css({
               color:"#454545"
           });
           $(this).next("ul").css({
               display:"block",
               background:"#cc6699",
               color:"#fff"
           });

           $(this).next("ul").find("a").css({
               color:"#fff"
           });
           $(this).prev().css({
               background:"#cc6699",
               color:"#fff"
           });
           $(this).prev().find("li").css({
               color:"#fff"
           });
           $(this).prev().find("a").css({
               color:"#fff"
           });
           $(this).next("ul").find(".up").css({
               color:"#fff",
               listStyle:"none"
           });
           var len = $(this).next("ul").find("li").length;
           if(len>16 && len<30){
               $(".agenda").css({
                   paddingBottom: "28em"
               })
           }
           else if(len>31 &&  len <50){
               $(".agenda").css({
                   paddingBottom: "60em"
               })
           }
           else if(len>51 && len <76){
               $(".agenda").css({
                   paddingBottom: "80em"
               })
           }
           else if(len>77 && len <100){
               $(".agenda").css({
                   paddingBottom: "100em"
               })
           }
           else{
               $(".agenda").css({
                   paddingBottom: "0em"
               })
           }
           $(this).next("ul").find("li").css({
               color:"#fff"
           })
       });
       $(".up").bind('click',function(){
           $(this).parent("ul").css({
               display:"none"
           });
           $(this).parent().prev().prev().css({
               background:"#fcfcfc"
           });
           $(this).parent().prev().prev().find("a").css({
               color:"#454545"
           });
           $(this).parent().prev().prev().find("li").css({
               color:"#454545"
           });
           $(".agenda").css({
               paddingBottom: "0em"
           })
       });
       $("#tag_info>a").live('click',function(){
           var flag=$(this).attr("data-checked")
           if(flag=="false"){
               $(this).attr("data-checked","true").css({background:"#3366cc", color:"#fff"})
           }
           if(flag=="true"){
               $(this).attr("data-checked","false").css({background:"#eeeeee", color:"#000"})
           }
       });

       $(".class_info a").eq(0).addClass("colorchange").attr("data-checked","true");
       $(".class_info > a").click(function(){
           $(this).addClass("colorchange").attr("data-checked","true").siblings().removeClass("colorchange").attr("data-checked","false");
       });

       $(".list_p_btn").bind('click',function(){
           var email=$.trim($("#email").val());
           var email_pd=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
           var fromFlag;
           var captcha = $("#captcha").val();
           if(email.length!=0){
               fromFlag=true;
           }else{
               $("#email").css({border:"1px solid #ec7063"});
               swal("邮箱不能为空哦！");
               fromFlag=false;
           }
           if(email_pd.test(email)){
               fromFlag=true;
           }else{
               $("#email").css({border:"1px solid #ec7063"});
               swal("邮箱格式不正确哟！");
               fromFlag=false;
           }

           if(captcha==""){
               $("#captcha").css({border:"1px solid #ec7063"});
               swal("验证码不能为空哦！");
               fromFlag=false;
           }
           if(fromFlag!=false){
               var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
               var tag = $("#tag_info>a[data-checked =true]");
               var tagnews = "";
               var cat = $(".class_info > a[data-checked =true]");
               var catnews = "";
               var tagval = "";
               var catval = "";
               var captcha = $("#captcha").val();
               for(var i=0;i<tag.length;i++){
                   tagnews+=tag.eq(i).attr("id")+",";
                   tagval+=tag.eq(i).text()+",";
               }
               for(var i=0;i<cat.length;i++){
                   catnews+=cat.eq(i).attr("id");
                   catval+=cat.eq(i).text();
               }
               $.ajax({
                   url:"/list/subscribe/",
                   dataType:"json",
                   type:"post",
                   data:{
                       csrfmiddlewaretoken: csrf.value,
                       email:email,
                       cat_id:catnews,
                       tag_id:tagnews,
                       captcha:captcha
                   },
                   success: function(data){
                       $("#captcha").val("");
                       $("#cap_img").attr('src','/get_check_code_image/?nocache='+Math.random());
                       if(data.success==1){
                           $(".list_popup").hide();
                           swal("订阅成功!","您已成功订阅"+catval+"——"+tagval,"success");
                       }
                       if(data.description=="captcha"){
                           swal("验证码输错了啦!");
                       }

                   }
               });
           }
       });
       $("#email").focus(function(){
           $(this).css({
               border: "1px solid #b8b8b8"
           })
       });
       $("#captcha").focus(function(){
           $(this).css({
               border: "1px solid #b8b8b8"
           })
       });

   });
    $("#tag_info").html($(".hidden_tag").html());
    function tag(id){
        $("#tag_info").html($('#tag_'+id).html());
    }


