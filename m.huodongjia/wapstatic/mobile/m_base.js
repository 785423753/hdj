/**
 * Created by Administrator on 2016/9/23 0023.
 */
$(".cat").click(function () {
    $(".bg").fadeToggle(10);
    $(".hidden-cat").slideToggle(200)
    $(".cat").toggleClass("choose")
    $("body").toggleClass("Body");
})
$(".bg").click(function () {
    $("body").removeClass("Body");
    $(".hidden-cat").slideUp(200)
    $(".cat").removeClass("choose")
    $(this).fadeOut(10)
})