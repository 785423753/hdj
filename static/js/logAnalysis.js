//初始化查询所有数据

function show(){
    var mydate = new Date();
    var str = "" + mydate.getFullYear();
    str += (mydate.getMonth()+1);
    str += mydate.getDate();
    return str;
}
function order(){
    var timeflag = $(".select_time").find("option:selected").val();
    var classflag = $(".select_order").find("option:selected").val();
    var begintime = $("#begin_time").val();
    var endtime = $("#end_time").val();
    $.get(
        "http://log.huodongjia.com/log/",{date_begin:show(),date_end:endtime,date_recent:timeflag},function(data) {
            var _html="";
            //访问来源信息对比
            var starttime = data.date_begin;
            var endtime = data.date_end;
            $("#start_times").text(starttime);
            $("#end_times").text(endtime);
            $("#times").css({display:"block"});
            for(var s=0;s<data.data.length;s++) {
                var order_name = data.data[s].name;//名字
                var order_city = data.data[s].city;//城市
                var view_count = data.data[s].view_count;//访问量url
                var from_urls = data.data[s].from_urls;//访问来源'
                from_urls =from_urls.join("<br/>");
                var to_urls = data.data[s].to_urls;//访问去向
                to_urls =to_urls.join("<br/>");
                var ev_url = data.data[s].ev_url;//活动url
                var ip_count = data.data[s].ip_count;//ip数量
                var cat = data.data[s].cat;//分类
                var to_odp_count = data.data[s].to_odp_count;//去订单页面
                _html+="<tr>" +
                "<td><a href='"+ev_url+"'>"+order_name+"</a></td>"+
                "<td>"+cat+"</td>"+
                "<td>"+order_city+"</td>"+
                "<td>"+view_count+"</td>"+
                "<td>"+ip_count+"</td>"+
                "<td>"+ from_urls+"</td>"+
                "<td>"+ to_urls+"</td>"+
                "<td>"+to_odp_count+"</td>"+
                "</tr>"
            }
            $(".tbody_meet").html(_html);
        });
}
function orders(){
    var timeflag = $(".select_time").find("option:selected").val();
    var classflag = $(".select_order").find("option:selected").val();
    var begintime = $("#begin_time").val();
    var endtime = $("#end_time").val();
    $.get(
        "http://log.huodongjia.com/log/",{date_begin:begintime,date_end:endtime,date_recent:timeflag},function(data) {
            var _html="";
            console.log(data);
            var starttime = data.date_begin;
            var endtime = data.date_end;
            $("#start_times").text(starttime);
            $("#end_times").text(endtime);
            $("#times").css({display:"block"});
            //访问来源信息对比
            for(var s=0;s<data.data.length;s++) {
                var order_name = data.data[s].name;//名字
                var order_city = data.data[s].city;//城市
                var view_count = data.data[s].view_count;//访问量
                var from_urls = data.data[s].from_urls;//访问来源'
                from_urls =from_urls.join("<br/>");
                var to_urls = data.data[s].to_urls;//访问去向
                to_urls =to_urls.join("<br/>");
                var ev_url = data.data[s].ev_url;//活动url
                var ip_count = data.data[s].ip_count;//ip数量
                var date = data.data[s].date;//日志的日期
                var id = data.data[s].id;//活动id号
                var ip_list = data.data[s].ip_list;//访问ip的列表
                var cat = data.data[s].cat;//分类
                var to_odp_count = data.data[s].to_odp_count;//去订单页面
                _html+="<tr>" +
                "<td><a href='"+ev_url+"'>"+order_name+"</a></td>"+
                "<td>"+cat+"</td>"+
                "<td>"+order_city+"</td>"+
                "<td>"+view_count+"</td>"+
                "<td>"+ip_count+"</td>"+
                "<td>"+ from_urls+"</td>"+
                "<td>"+ to_urls+"</td>"+
                "<td>"+to_odp_count+"</td>"+
                "</tr>"
            }
            $(".tbody_meet").html(_html);
        });
}
function order_calss(){
    var timeflag = $(".select_time").find("option:selected").val();
    var classflag = $(".select_order").find("option:selected").val();
    var begintime = $("#begin_time").val();
    var endtime = $("#end_time").val();
    $.get(
        "http://log.huodongjia.com/log/",{date_begin:begintime,date_end:endtime,date_recent:timeflag,main:classflag},function(data) {
            var starttime = data.date_begin;
            var endtime = data.date_end;
            $("#start_times").text(starttime);
            $("#end_times").text(endtime);
            $("#times").css({display:"block"});
            var _htmls="";
            //访问来源信息对比
            for(var s=0;s<data.data.length;s++) {
                var order_names = data.data[s].name;//分类名字
                var view_counts = data.data[s].view_count;//访问量
                var from_urlss = data.data[s].from_urls;//访问来源'
                from_urlss =from_urlss.join("<br/>");
                var to_urlss = data.data[s].to_urls;//访问去向
                to_urlss =to_urlss.join("<br/>");
                var ip_counts = data.data[s].ip_count;//ip数量
                var to_odp_counts = data.data[s].to_odp_count;//去订单页面
                _htmls+="<tr>" +
                "<td>"+order_names+"</td>"+
                "<td>"+view_counts+"</td>"+
                "<td>"+ip_counts+"</td>"+
                "<td>"+ from_urlss+"</td>"+
                "<td>"+ to_urlss+"</td>"+
                "<td>"+to_odp_counts+"</td>"+
                "</tr>"
            }
            $(".tbody_class").html(_htmls);
        });
}
$(document).ready(function(){
    $(".select_time").find("option").eq(1).attr("selected",true);
    $(".select_order").find("option").eq(0).attr("selected",true);
    order();
});


//时间筛选
$(".search_order").click(function(){
    if($(".select_order").find("option:selected").val()=="event"){
        $(".table_class").css({display:"none"});
        $(".table_order").css({display:"inline-table"});
        orders();
    }else{
        $(".table_order").css({display:"none"});
        $(".table_class").css({display:"inline-table"});
        order_calss();
    }
});

