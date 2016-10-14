
       //限制字符个数
       $(".active_info_intro").each(function () {
           var maxwidth = 96;
           if ($(this).text().length > maxwidth) {
               $(this).text($(this).text().substring(0, maxwidth));
               $(this).html($(this).html() + "...")
           }
       });
 

       var hrefs = window.location.href;
       $(".sponsor_url").attr("href",hrefs);
       $(".ul_bt_1").click(function(){
           var url_id;
           var start;
           var stop;
           for(var i = 0; i < location.href.length; i++){
               if(location.href.charAt(i)=='-') start=i+1;if(location.href.charAt(i)=='.') stop=i;
           } url_id = location.href.substring(start,stop);
           var left = $("#like").offset().left+10;
           var top = $("#like").offset().top+10;
           console.log(left+","+top)
           var obj = $(this);
           $(".jia").append('<div class="zan">+1</div>');
           $('.zan').css({
               'position':'absolute',
               'top':top+30,
               'left':left-40,
               'color':'red',
               zIndex:99999
           }).stop().animate({
               'left':left-132,
               'top':top-62
           },'slow',function(){
               $(".zan").remove();
               var sum =obj.find('span').text();
               sum++;
               obj.find('span').text(sum);})
           $.ajax({
               type:"GET",
               url:"sponsor_api/like/"+url_id
           });
       });


$(".come").click(function(){
           $(".message_popup").show().css({left:($("body").width()-$(".message_popup").width())/2,top:"200px"})
       });
       $("#captcha").blur(function () {
           var url="/verify_tel_captcha/";
           var captcha=$("#captcha").val();
           var phone=$("#tel").val();
           $.post(url,{mobilphone:phone,captcha:captcha}, function (data) {
               var flag = jQuery.parseJSON(data).flag;
               console.log(data)
               if(flag==false){
                   $("#captcha").attr("data-captcha","false")
               }else {
                   $("#captcha").attr("data-captcha","true")
               }
           })
       });
       $(".clearDiv").bind('click', function () {
           $(".message_popup").hide();
           $(".message_popup input,.message_popup textarea").val("")
       });
       $("#messageSubmit").bind('click', function () {
           var url_id;
           var start;
           var stop;
           for(var i = 0; i < location.href.length; i++){
               if(location.href.charAt(i)=='-') start=i+1;if(location.href.charAt(i)=='.') stop=i;
           } url_id = location.href.substring(start,stop);
           var name= $.trim($("#username").val());
           var phone=$.trim($("#tel").val());
           var email=$.trim($("#email").val());
           var content=$.trim($("#content").val());
           var captcha=$("#captcha").attr("data-captcha");
           var ps = /^(http:\/\/|https:\/\/)?((?:[A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[\/\?\:]?.*$/;
           var email_pd=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
           var fromFlag;
           if(name.length!=0&&email.length!=0&&captcha!='false'&&email_pd.test(email)){
               fromFlag=true;
           }else{
               $("#username").css({
                   border:"1px solid #ec7063"
               });
               $("#tel").css({
                   border:"1px solid #ec7063"
               });
               $("#email").css({
                   border:"1px solid #ec7063"
               });
               $("#captcha").css({
                   border:"1px solid #ec7063"
               });
               fromFlag=false;
           }
           if(fromFlag!=false){
               var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
               $.ajax({
                   url:"sponsor_api/claim/"+url_id,
                   dataType:"json",
                   type:"post",
                   data:{mine:"test",csrfmiddlewaretoken: csrf.value,
                         name:name,
                         cellphone:phone,
                         email:email,
                         message:content
                   },
                   success: function(data){
                       console.log(data);
                       if(data.code==0){
                           $(".message_popup").hide();
                           $(".message_popup input,.message_popup textarea").val("");
                           popup(1,"完成提交!","我们将尽快与您取得联系，审核成功后为您点亮图标。")

                       }
                   }
               })
           }
       });
       $("#username").focus(function(){
           $(this).css({
               border: "1px solid #b8b8b8"
           })
       });
       $("#tel").focus(function(){
           $(this).css({
               border: "1px solid #b8b8b8"
           })
       });
       $("#email").focus(function(){
           $(this).css({
               border: "1px solid #b8b8b8"
           })
       });
       $(".captcha_btn").bind('click',function () {
           $(".address").css({border:"1px solid rgb(216, 216, 216)"})
           var dateObj,s="";
           dateObj = new Date()
           s+=dateObj.getFullYear()
           s+=dateObj.getMonth()+1
           s+=dateObj.getDate()
           s+=dateObj.getHours()
           s+=dateObj.getMinutes()
           s+=dateObj.getSeconds()
           var set, i = 60;
           var url = "/send_check_mesage/";
           var tel = $.trim($("#tel").val());
           if (tel != "" && (/^1[3-8]+\d{9}$/).test(tel)) {
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
               popup(0,"手机号码","请输入正确的手机号码")
               $(".address").css({border:"1px solid red"})
           }
           return false
       });

