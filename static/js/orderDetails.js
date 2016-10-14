$(function($){

	$(".paymentOrder").on('click', function () {
		console.log($("#zhuan:checked"))
		if($("#zhuan:checked").length!=0){
			window.location.href=("/bankpay/")
		}else{
			var tn=$("#tn").val();
			var totalpay= $("#al_price").val();
			var event_name=$("#order_rumber").val();
			var bank = $("input[name=bank]:checked").val();
			var url="/get/order/upgrade/url/";
			$.get(url,{tn:tn,totalpay:totalpay,event_name:event_name,bank:bank}, function (data) {
				window.location.href=(data.upgrade_account_url)
			})
		}
	})
});
