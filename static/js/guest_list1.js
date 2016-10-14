
function login(){
    $("#myForm").submit() ;
}
$(".click_imgs").on("click", function () {
    $("#ceng").fadeIn();
    $(".meeasge_div").css({display:"none"});
    $(this).parent().parent().parent().next("div").fadeIn().css({top:($("body").height()-$(this).parent().parent().parent().next("div").height())/2});
    $("body").addClass("bodys");
});

$(".img_divs").on("click", function () {
        var meeages =  $(this).attr("data-meeages");
        $("."+meeages).fadeIn().css({top:($("body").height()-$("."+meeages).height())/2});
});
$(".glyphicon-remove").click(function () {
    $(this).parent().fadeOut();
    $("#ceng").fadeOut();
    $("body").removeClass("bodys");
});
$(".img_div").hover(function(){
    $(this).find("img").eq(1).css({display:"block"});
},function(){
    $(this).find("img").eq(1).css({display:"none"});
});

function font_length(a, b) {
    var maxwidth = a;
    if ($(b).text().length > maxwidth) {
        $(b).text($(b).text().substring(0, maxwidth));
        $(b).html($(b).html() + "...")
    }
}
$(".guestCompany").each(function () {
    font_length(15, $(this))
});
$(".guestWork").each(function () {
    font_length(16, $(this))
});
