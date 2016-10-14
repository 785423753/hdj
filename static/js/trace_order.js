//for trace_order.html
var commission_status = $("#commission_status").text();
if(commission_status=='None'){
    commission_status = 0;
}
var commission = $("#commission").text();
if(commission_status=='None'){
    commission = '';
}
var commission_pay_status = $("#commission_pay_status").text();
var is_return_cash = $("#is_return_cash").text();
if(is_return_cash=='None'){
    is_return_cash = 0
}
var return_cash = $("#return_cash").text();
var return_cash_status = $("#return_cash_status").text();
var is_bill = $("#is_bill").text();
var tracking_number = $("#tracking_number").text();
var attendee_job = $("#attendee_job").text();
var is_onself = $("#is_onself").text();
var is_consult = $("#is_consult").text();
var is_visit = $("#is_visit").text();

var order_status_dct = {'未付款':'0','已付订金':'10','已付款':'20','已退款':'30'}

var order_pay_status_dct = {'未处理':'0','待财务确认':'10','正在出库':'20',
                            '已发货':'30','交易完成':'50','退货中':'60','已退货':'70',
                            '已取消':'100','已作废':'110','已开发票':'200'}
var order_status = order_status_dct[$("#order_status").text()];//订单状态
var order_pay_status = order_pay_status_dct[$("#order_pay_status").text()];//支付状态

var refund_reason = $("#refund_reason").text();
var refund_remark = $("#refund_remark").text();
var unpay_reason = $("#unpay_reason").text();
if(unpay_reason=='None'){
    unpay_reason = ''
}
var unpay_remark = $("#unpay_remark").text();

//佣金初始值
$('.commission_chose').val(commission_status);
if($('.commission_chose').val()=='1'){
    $('.commission_check').find('input').eq(0).css('display','block');
    $('.pay_commission_chose_show').eq(0).css('display','block');
    $('.pay_commission_check').eq(0).css('display','block');
}else{
    $('.commission_check').find('input').eq(0).css('display','none');
    $('.pay_commission_chose_show').eq(0).css('display','none');                    
    $('.pay_commission_check').css('display','none');
}
//返现初始值
$('.return_cash_chose').val(is_return_cash);
if($('.return_cash_chose').val()=='1'){
    $('.return_cash_check').find('input').eq(0).css('display','block');
    $('.pay_return_cash_chose_show').eq(0).css('display','block');
}else{
    $('.return_cash_check').find('input').eq(0).css('display','none');
    $('.pay_return_cash_chose_show').eq(0).css('display','none');
}
//发票初始值
$('.bill td .pay_fapiao_chose').val(is_bill);
if($('.bill td .pay_fapiao_chose').val()=='1'){
    $('.bill_check').find('input').eq(0).css('display','block');
}else{
    $('.bill_check').find('input').eq(0).css('display','none');  
}
//是否本人参会
$('.thispiepel_chose').val(is_onself);
//是否回访
$('.result_chose').val(is_visit);
//是否会前咨询
$('.phone_chose').val(is_consult);



//订单状态默认值
$('.order_status_select').val(order_status);
//如果为未付款状态 则显示未付款原因
if($('.order_status_select').val()=='0'){
    $('.order_unpay_reason_show').css('display','block');
    $('.order_unpay_reason_select').val(unpay_reason);
    $('.order_unpay_reason_remark_show').css('display','block');
    $('.order_unpay_reason_remark').css('display','block');
}
//如果为已退款状态 则显示已退款原因
if($('.order_status_select').val()=='30'){
    $('.order_refund_reason_show').css('display','block');
    $('.order_refund_reason_select').eq(0).val(refund_reason);
    $('.order_refund_reason_remark_show').eq(0).css('display','block');
    $('.order_refund_reason_remark').eq(0).css('display','block');
}

//支付状态默认值
$('.order_pay_status').val(order_pay_status);



//各选择框的change事件    
//佣金
$('.commission .commission_chose').change(function(){
    if($(this).val()=='1'){
        $('.commission_check').find('input').eq(0).css('display','block');
        $('.pay_commission_chose_show').eq(0).css('display','block');
        $('.pay_commission_check').eq(0).css('display','block');
    }else{
        $('.commission_check').find('input').eq(0).css('display','none');
        $('.pay_commission_chose_show').eq(0).css('display','none');                    
        $('.pay_commission_check').css('display','none');
    }
});

//佣金结算
$('.commission .pay_commission_chose').change(function(){
    $('.pay_commission_check').find('input').eq(0).css('display','block');
    
});

//返现
$('.return_cash_chose').change(function(){
    if($(this).val()=='1'){
        $('.return_cash_check').find('input').eq(0).css('display','block');
        $('.pay_return_cash_chose_show').eq(0).css('display','block');
    }else{
        $('.return_cash_check').find('input').eq(0).css('display','none');
        $('.pay_return_cash_chose_show').eq(0).css('display','none');
    }
});
//返现结算
$('.pay_return_cash_chose').change(function(){
    if($(this).val()=='1'){
        $('.pay_return_cash_check').find('input').eq(0).css('display','block');
    }else{
        $('.pay_return_cash_check').find('input').eq(0).css('display','none');
    }
});

//发票
$('.bill td .pay_fapiao_chose').change(function(){
    if($(this).val()=='1'){
        $('.bill_check').find('input').eq(0).css('display','block');
    }else{
        $('.bill_check').find('input').eq(0).css('display','none');  
    }
});

//已退款原因
$('.refund_reason_check').change(function(){
    $('.refund_reason_remark').eq(0).css('display','block');
});
//未付款原因
$('.order_unpay_check').change(function(){
    $('.order_unpay_check_remark').eq(0).css('display','block');
});
//订单状态
$('.order_status_select').change(function(){

    if($(this).val()=='0'){
        //显示未支付原因
        $('.order_unpay_reason_show').css('display','block');
        $('.order_unpay_reason_remark_show').css('display','block');
        $('.order_unpay_reason_remark').css('display','block');
        //隐藏已退款原因
        $('.order_refund_reason_show').css('display','none');
        $('.order_refund_reason_remark_show').eq(0).css('display','none');
        $('.order_refund_reason_remark').eq(0).css('display','none');
    }else if($(this).val()=='30'){
        //显示已退款原因
        $('.order_refund_reason_show').css('display','block');
        $('.order_refund_reason_remark_show').eq(0).css('display','block');
        $('.order_refund_reason_remark').eq(0).css('display','block');
        //隐藏未支付原因
        $('.order_unpay_reason_show').css('display','none');
        $('.order_unpay_reason_remark_show').css('display','none');
        $('.order_unpay_reason_remark').css('display','none');
    }else{
        //隐藏已退款原因
        $('.order_refund_reason_show').css('display','none');
        $('.order_refund_reason_remark_show').eq(0).css('display','none');
        $('.order_refund_reason_remark').eq(0).css('display','none');
        //隐藏未支付原因
        $('.order_unpay_reason_show').css('display','none');
        $('.order_unpay_reason_remark_show').css('display','none');
        $('.order_unpay_reason_remark').css('display','none');
    }
});

//提交表单前进行确认
$('.submit_data').click(function(){
    var order_status_dct_reverse = {'0':'未付款','10':'已付订金','20':'已付款','30':'已退款'}
    var order_pay_status_dct_reverse = {'0':'未处理','10':'待财务确认','20':'正在出库',
                            '30':'已发货','50':'交易完成','60':'退货中','70':'已退货',
                            '100':'已取消','110':'已作废','200':'已开发票'}
    
    var order_status = $('.order_status_select').val()
    var order_pay_status = $('.order_pay_status').val()
    var msg = window.confirm('你确定要将订单状态改成:"'+order_status_dct_reverse[order_status]+'",把支付状态改成:"'+order_pay_status_dct_reverse[order_pay_status]+'"吗？');
    if(msg==true){
        $(this).submit();
    }else{
        window.reload();
    }
})
