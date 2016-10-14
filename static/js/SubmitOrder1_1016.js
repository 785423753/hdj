function mySubmit(flag) {
    return flag
}

$(function ($) {

	for(var i=0;i<11;i++){
		$(".quantitys").append("<option value='"+i+"'>"+i+"</option>")
	}

	// 限制购买人数
	$(".quantitys").each(function(){
		var limit_num = $(this).parents('td').find('.limit_people').text();
		var limit_num = parseInt(limit_num);
		if(limit_num){
			$(this).html('');
			for(var i=limit_num;i<11;i++){
				$(this).append("<option value='"+i+"'>"+i+"</option>");
			}
		}
	});

	$(".mess_tbody tr").each(function(){
		var maxwidth=10;
		if($(this).find("td").eq(1).text().length>maxwidth){
			$(this).find("td").eq(1).text($(this).find("td").eq(1).text().substring(0,maxwidth));
		}
		var limit_people = $(this).find('#limit_people').val();

		if(limit_people!=undefined&&limit_people!=''){
			$(this).find('.quantitys').html('');
			for(var i=parseInt(limit_people);i<11;i++){

				$(this).find('.quantitys').append("<option value='"+i+"'>"+i+"</option>")
			}
		}

	});


	$(".table_tr").find(".quantitys").live("change", function () {
			$(".table_tr input[type=radio]").unbind("click");
			$(this).parent().parent().find("input[type=radio]").prop("checked","checked");
			$(this).parents('tr').siblings().find(".quantitys").each(function(){$(this).val("0")});

			var sum_nums =$(this).parent().parent().find(".quantitys").find("option:selected").val();
			var orderprices =$(this).parent().parent().find(".price").attr("data-price");
			var sign = $(this).parent().parent().find(".price").attr("data-sign");
			var returnprice = $(this).parent().parent().find("td").eq(3).attr("data-return");
			var returnpricess=sign+returnprice*sum_nums;
			var total_price = sign+orderprices*sum_nums;
			var total_return_cash = returnprice*sum_nums;

			//show price_intro
            $(".table_tr").eq(0).find('.price_intro').text($(this).parents('tr').find(".new_tooltip").text());

			$('.total_price').show();

            $('.total_price_num').html("<span style='color:#666666;font-family:microsoft yahei;font-size:20px;'>共"+sum_nums+"张，总计:</span>"
                        +"<span style='font-family:microsoft yahei;font-size:24px;color:red;'>"+total_price+"元</span>");

            $('.total_return_num').html("<span class='show_note glyphicon glyphicon-exclamation-sign' style='margin-right:10px;'>"
	                    +"<span class='show_note_font text-left' style='display:none;font-family:microsoft yahei;color:#666666;font-size:12px;position:absolute;z-index:100;margin-left:-164px;margin-top:24px;width:283px;height:95px;padding-left:10px;padding-top:10px;border:1px solid #ccc;background:#fcfcfc;'>"
	                    +"<p style='line-height:22px;'>支付成功后，客服会在2小时内与您确认参会人信息，届时请提供接收返现的支付宝账号给客服。</br>返现时间：一周内返现。</p>"
	                    +    "</span>"
	                    +"</span><font style='font-family:microsoft yahei;font-size:16px;color:#666666;line-height:40px;'>返现金额：</font><font style='color:red;color:#ff8004;'>"+returnpricess+"</font>");

            if(returnpricess=='￥0'){
            	$('.total_return_num').hide();
            }else{
            	$('.total_return_num').show();
            }

			
			$(".hide_price").val(orderprices);
			$(".order-number").val(sum_nums);
			$("#return_cash").val(total_return_cash);
			$(".table_tr").find(".quantitys").unbind("change");
	});
		$(".table_tr input[type='radio']:checked").live("change",function(){
				$(".sum").show();
				$(this).parents('tr').siblings().find(".quantitys").each(function(){$(this).val("0")});
				$(this).parent().parent().find(".quantitys").val("1");
				$(".table_tr input[type=radio]").attr("data-status","false");
				$(this).attr("data-status","true");

				var sum_nums =$(this).parent().parent().find(".quantitys").find("option:selected").val();

				var orderprices =$(this).parent().parent().find(".price").attr("data-price");
				var sign = $(this).parent().parent().find(".price").attr("data-sign");
				var returnprice = $(this).parent().parent().find("td").eq(3).attr("data-return");
				var returnpricess=sign+returnprice*sum_nums;

				$(".sum").show();
				$(".sum").find("td").eq(2).text(sign+orderprices*sum_nums);
				$(".sum").find("td").eq(3).text(sign+returnprice*sum_nums);
				$(".sum").find("td").eq(4).text(sum_nums);

				$(".hide_price").val(orderprices);
				$(".order-number").val(sum_nums);
			    var fanli = returnprice*sum_nums;
			     if(fanli==0){
					 $(".fanli").css({
						 display:"none"
					 });
				 }else{
					 $(".fanli span").html("&lowast;付款后，你将获得"+returnpricess+"元现金奖励到你指定的支付宝账号").parent().show();
				 }
				$(".table_tr").find(".quantitys").unbind("change");
		});
	/*
	表单验证
	 */
	$("#name").blur(function () {
		var user_name=$.trim($(".user_name").val());
		if(user_name.length==0){
			$(".user_name").css({border:"1px solid red"}).attr("data-judge","false")
		}else{
			$(".user_name").css({border:"1px solid rgb(216, 216, 216)"}).attr("data-judge","true")
		}
	});

	$("#mobilphone").blur(function () {
		var phone=$.trim($(".mobilphone").val());
		if(phone.length==0|| !(/^1[3-8]+\d{9}$/).test(phone)){
			$(".mobilphone").css({border:"1px solid red"}).attr("data-judge","false")
		}else{
			$(".mobilphone").css({border:"1px solid rgb(216, 216, 216)"}).attr("data-judge","true")
		}
	});
	$("#captcha").blur(function () {
		var captcha=$.trim($(".captcha").val());
		if(captcha.length!=4){
			$("#captcha").css({border:"1px solid red"}).attr("data-judge","false")
		}else{
			var phone=$.trim($(".mobilphone").val());
			var url="/verify_tel_captcha/";
			$.post(url,{mobilphone:phone,captcha:captcha}, function (data) {
				var flag=jQuery.parseJSON(data).flag;
				if(flag==true){
					$("#captcha").css({border:"1px solid rgb(216, 216, 216)"}).attr("data-judge","true")
				}else{
					$("#captcha").css({border:"1px solid red"}).attr("data-judge","false")
				}
			})
		}
	});
	$("#email").blur(function () {
		var email=$.trim($(".email").val());
		var filter =/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		if(email.length==0||!filter.test(email)){
			$(".email").css({border:"1px solid red"}).attr("data-judge","false")
		}else{
			$(".email").css({border:"1px solid rgb(216, 216, 216)"}).attr("data-judge","true")
		}
	});
	$("#address").blur(function () {
		var contactAddress=$.trim($(".address").val());
		if (contactAddress.length==0) {
			$(".address").css({border:"1px solid red"}).attr("data-judge","false")
		}else{
			$(".address").css({border:"1px solid rgb(216, 216, 216)"}).attr("data-judge","true")
		}
	});
    $(".fapiao").bind("click", function () {
        if ($(".fapiao").attr("checked") == "checked") {
            $(".Invoice_div").css({"display":"block"});
            $("#Invoice").blur(function(){
                var user_name1=$.trim($("#Invoice").val());
                if(user_name1.length==0){
                    $("#Invoice").css({border:"1px solid red"}).attr("data-judge","false")
                }else{
                    $("#Invoice").css({border:"1px solid rgb(216, 216, 216)"}).attr("data-judge","true")
                }
            });
            $("#email_address").blur(function(){
                var user_name2=$.trim($("#email_address").val());
                if(user_name2.length==0){
                    $("#email_address").css({border:"1px solid red"}).attr("data-judge","false")
                }else{
                    $("#email_address").css({border:"1px solid rgb(216, 216, 216)"}).attr("data-judge","true")
                }
            });
        }
        else {
            $(".Invoice_div").css({"display":"none"});
        }
    });



    $(".submit_indent").bind('click',function () {
		var captcha=$.trim($(".captcha").val());
		var phone=$.trim($(".mobilphone").val());
		var url="/verify_tel_captcha/";
		$.post(url,{mobilphone:phone,captcha:captcha}, function (data) {
			var flag=jQuery.parseJSON(data).flag;
		if($(".price_radio:checked").length==0){
			swal("您还没有选择价格哦！");
			return false;
		}
		else if($(".order-number").val()=="0"){
			swal("您还没有选择价格数量哦！");
			return false;
		}
		else if(flag==false||captcha.length!=4){
			swal("验证码错误！");
			return false;
		}
		else if($("input[data-judge='false'][type='text']").length!=0){
            var checked = $("input[data-judge='false'][type='text']").length == 2
                && $('#fapiao').attr('checked') == undefined
                && $('#Invoice').attr('data-judge') == 'false'
                && $('#email_address').attr('data-judge') == 'false';
            if(checked){
                $(".indent_submit").submit();
                return true;
            }else{
                $("input[data-judge='false'][type='text']").eq(0).focus();
                return false;
            }
        }
        else{
            $(".indent_submit").submit();
            return true;
        }
    });
	});
	$(".TestGetCode").bind('click',function () {
		if ($(this).attr("disabled")!="disabled") {
		var dateObj,s="";
		dateObj = new Date();
		s+=dateObj.getFullYear();
		s+=dateObj.getMonth()+1;
		s+=dateObj.getDate();
		s+=dateObj.getHours();
		s+=dateObj.getMinutes();
		s+=dateObj.getSeconds();
		var set, i = 300;
		var url = "/send_check_mesage/";
		var tel = $.trim($(".mobilphone").val());
		if (tel != "" && (/^1[3-8]+\d{9}$/).test(tel)) {
			$.get(url, {"tel": tel,"time":s}, function (data) {
				set = setInterval(function () {
					$(".TestGetCode").text(i + "秒后重发");
					$(".TestGetCode").attr({disabled: "disabled"});
					$(".TestGetCode").css({backgroundColor:"#a8a8a8"})
					i--;
					if (i < 0) {
						clearInterval(set);
						$(".TestGetCode").text("重新发送");
						$(".TestGetCode").removeAttr("disabled");
						$(".TestGetCode").css({backgroundColor:"#646464"})
					}
				}, 1000)
			})
		} else {
			$("#mobilphone").css({border:"1px solid red"});
			$("#mobilphone").focus()
		}
		return false
		};
	});

});



