$("input[type='radio']").on('click', function () {
    var tn = $("#tn").val();
    var totalpay = $("#al_price").val();
    // alert(totalpay);
    var event_name = $("#order_rumber").val();
    var bank = $("input[name=bank]:checked").val();
    var url = "/get/order/upgrade/url/";
    $.get(url, {tn: tn, totalpay: totalpay, event_name: event_name, bank: bank}, function (data) {
        console.log(data);
        console.log(1111111111);
        $(".paymentOrder").attr("data-href", data.upgrade_account_url);
    });
});
$("input[type='radio']").eq(0).click();
$(".paymentOrder").on('click', function () {
    if ($("input[type='radio']:checked").length == 0) {
        swal("请选择支付方式！");
        return false;
    } else {
        window.open($(".paymentOrder").attr("data-href"))
        return true;
    }
});
