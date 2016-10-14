function mySubmit(flag) {
    return flag
}
var surl, err;
$.fn.autotype = function () {
    var _this = $(this);
    var str = _this.html();
    str = str.replace(/(\s){2,}/g, "$1");
    var index = 0;
    $(this).html("");
    var timer = function () {
        var args = arguments;
        var current = str.slice(index, index + 1);
        if (current == "<") {
            index = str.indexOf(">", index) + 1
        } else {
            index++
        }
        if (index < str.length - 1) {
            _this.html(str.substring(0, index) + (index & 1 ? "_" : ""));
            setTimeout(args.callee, 70)
        } else {
            _this.html(str.substring(0, index))
        }
    };
    setTimeout(timer, 1000)
};
$(".right").autotype();
window.onload = function () {
    var fileUploader = document.getElementById("file_content");
    var pathDisplayer = document.getElementById("url");
    if (fileUploader.addEventListener) {
        fileUploader.addEventListener("change", fileUploaderChangeHandler, false)
    } else {
        if (fileUploader.attachEvent) {
            fileUploader.attachEvent("onclick", fileUploaderClickHandler)
        } else {
            fileUploader.onchange = fileUploaderChangeHandler
        }
    }
    function fileUploaderChangeHandler() {
        pathDisplayer.value = fileUploader.value
    }

    function fileUploaderClickHandler() {
        setTimeout(function () {
            fileUploaderChangeHandler()
        }, 0)
    }
};
$(function ($) {
    $(".pr ul li").on("mouseover", function () {
        $(this).parent().stop().animate({top: "-96px"}, 500)
    });
    $(".pr ul li").on("mouseout", function () {
        $(this).parent().stop().animate({top: "0px"}, 500)
    });
    $(".pr").css({width: (parseInt($(".pr").width()) - 5), margin: "0px 4px 4px 0px"});
    $(".left form ul li:odd").css({margin: "10px 0 20px 0"});
    $(".file-uploader").width($(".file-btn").width()).css({
        left: (-(parseInt($(".file-btn").width()) + parseInt($(".file-btn").css("padding-left")) * 2) - 2),
        width: ($(".file-btn").width() + 22),
        height: ($(".file-btn").height() + 2)
    });
    $("#url,#file_content").change(function () {
        surl = $(this).val()
    });
    function showRequest() {
            err = "";
            var t_title = $("#title");
            if ($.trim(t_title.val()).len() > 125 || $.trim(t_title.val()).len() == 0) {
                t_title.css({border: "1px solid #e56d89"}).attr("data-judge","false");
                err = "活动标题</br>"
            } else {
                t_title.css({border: "1px solid #a9a9a9"}).attr("data-judge","true")
            }
            var s_time = $.trim($(".start_time").val());
            var e_time = $.trim($(".end_time").val());
            if (s_time.length == 0) {
                $(".start_time").css({border: "1px solid #e56d89"}).attr("data-judge","false");
                err += "开始时间</br>"
            } else {
                $(".start_time").css({border: "1px solid #a9a9a9"}).attr("data-judge","true");
                var start = new Date(s_time.replace("-", "/").replace("-", "/"));
                var end = new Date(e_time.replace("-", "/").replace("-", "/"));
                if (end < start) {
                    $(".start_time").css({border: "1px solid #e56d89"}).attr("data-judge","false");
                    err += "开始时间小于结束时间请重新选择</br>"
                }
            }
            if ($.trim(surl).length == 0) {
                $("#url").css({border: "1px solid #e56d89"}).attr("data-judge","false");
                err += "活动链接或者文档</br>"
            } else {
                var x = /^(http:\/\/|https:\/\/)?((?:[A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[\/\?\:]?.*$/;
                if (x.test(surl)) {
                    $(".x_file").attr("for", "url")
                } else {
                    $(".x_file").attr("for", "file_content");
                    var x = document.getElementById("file_content");
                    photoExt = x.value.substr(x.value.lastIndexOf(".")).toLowerCase();
                    if (photoExt != ".docx" && photoExt != ".doc" && photoExt != ".pdf") {
                        err += "文件上传仅限于.docx，.doc，.pdf格式文件！ </br>"
                    } else {
                        var fileSize = 0;
                        var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
                        if (isIE && !x.files) {
                            var filePath = x.value;
                            var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
                            var file = fileSystem.GetFile(filePath);
                            fileSize = file.Size
                        } else {
                            fileSize = x.files[0].size
                        }
                        fileSize = Math.round(fileSize / 1024 * 100) / 100;
                        if (fileSize >= 2000) {
                            err += "文件最大大小为2MB，请重新上传! </br>"
                        }
                    }
                }
            }
        var $phone=$("#telephone");
            if($.trim($phone.val()).length!=0){
                var t_yz = $.trim($("#verification").val());
                if (t_yz.length == 0) {
                    $("#verification").css({border: "1px solid #e56d89"}).attr("data-judge","false");
                    err += "验证码</br>"
                }else{
                    $("#verification").css({border: "1px solid #a9a9a9"}).attr("data-judge","true");
                }
                $phone.css({border: "1px solid #a9a9a9"}).attr("data-judge","true");
            }else{
                err+="手机号码</br>"
                $phone.css({border: "1px solid #e56d89"}).attr("data-judge","false");
            }
            var sponsor = $.trim($("#host_name").val());
            if (sponsor.length == 0) {
                $("#host_name").css({border: "1px solid #e56d89"}).attr("data-judge","false");
                err += "主办方</br>"
            }else{
                $("#host_name").css({border: "1px solid #a9a9a9"}).attr("data-judge","true");
            }
            var t_qq = $.trim($("#qq").val());
            var x = /^[1-9]\d{4,10}$/;
            if (!x.test(t_qq)) {
                $("#qq").css({border: "1px solid #e56d89"}).attr("data-judge","false");
                err += "QQ</br>"
            } else {
                $("#qq").css({border: "1px solid #a9a9a9"}).attr("data-judge","true")
            }
            var email = $.trim($("#mail").val());
            var filter =/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            if (!filter.test(email)) {
                $("#mail").css({border: "1px solid #e56d89"}).attr("data-judge","false");
                err += "邮箱</br>";
            }else{
                $("#mail").css({border: "1px solid #a9a9a9"}).attr("data-judge","true");
            }
            if(err.length!=0){
                $("#activities input[data-judge='false']").eq(0).focus();
                $('.new_popup').hide()
                return false
            }
            return true
    }
    var options={
        target: '#output',          //把服务器返回的内容放入id为output的元素中      
        beforeSubmit: showRequest,  //提交前的回调函数  
        success: showResponse,      //提交后的回调函数  
        //url: url,                 //默认是form的action， 如果申明，则会覆盖  
        //type: type,               //默认是form的method（get or post），如果申明，则会覆盖  
        dataType: "json"           //html(默认), xml, script, json...接受服务端返回的类型
        //clearForm: true,          //成功提交后，清除所有表单元素的值  
        //resetForm: true,          //成功提交后，重置所有表单元素的值  
    }
    function showResponse(data){
        var obj=eval(data);
        if (obj.code==0) {
            popup(0,"发布失败","发布失败，你可以再次发布或发邮件到wangping@veryevent.com。")
        }else if (obj.code==1) {
            popup(1,"发布成功","我们会在24小时内审核，并把结果发到你的邮箱中， 感谢你对活动家的支持。")
             $("input").val("")
        }else if(obj.code==2){
            $(".new_popup").hide()
            $(".verification").focus();
            popup(0,"验证码错误","请重新填写验证码")
        };
    }
    $('#activities').ajaxForm(options); 
    $('#submit').click(function(){
            popup(1,"正在提交,请稍候...","")
            $('#activities').ajaxSubmit(options);
            return false;
    });
    $("#obtain").on("click", function () {
        var dateObj,s="";
        dateObj = new Date()
        s+=dateObj.getFullYear()
        s+=dateObj.getMonth()+1
        s+=dateObj.getDate()
        s+=dateObj.getHours()
        s+=dateObj.getMinutes()
        s+=dateObj.getSeconds()
        var set, i = 300;
        var url = "/send_check_mesage/";
        var tel = $("#telephone").val();
        if (tel != "" && (/^1[3-8]+\d{9}$/).test(tel)) {
            $.get(url, {"tel": tel,"time":s}, function (data) {
                $(".yzts").css({
                    height:"auto"
                })
                $(".form-phone").attr("data-validation", true);
                set = setInterval(function () {
                    $("#obtain").text(i + "秒后，可以重新发送验证码").attr({disabled: "disabled"});
                    i--;
                    if (i < 0) {
                        clearInterval(set);
                        $("#obtain").text("重发").removeAttr("disabled")
                    }
                }, 1000)
            })
        } else {
            popup(0,"手机号码", "请输入正确的手机号码")
        }
        return false
    });
});
String.prototype.len = function () {
    return this.replace(/[^\x00-\xff]/g, "xx").length
};
// 顶部图片轮播
//jQuery(function ($) {
//    if ($(".slide-pic").length > 0) {
//        var defaultOpts = { interval: 5000, fadeInTime: 300, fadeOutTime: 200 };
//        var _titles = $("ul.slide-txt li");
//        var _titles_bg = $("ul.op li");
//        var _bodies = $("ul.slide-pic li");
//        var _count = _titles.length;
//        var _current = 0;
//        var _intervalID = null;
//        var stop = function () { window.clearInterval(_intervalID); };
//        var slide = function (opts) {
//            if (opts) {
//                _current = opts.current || 0;
//            } else {
//                _current = (_current >= (_count - 1)) ? 0 : (++_current);
//            };
//            _bodies.filter(":visible").fadeOut(defaultOpts.fadeOutTime, function () {
//                _bodies.eq(_current).fadeIn(defaultOpts.fadeInTime);
//                _bodies.removeClass("cur").eq(_current).addClass("cur");
//            });
//            _titles.removeClass("cur").eq(_current).addClass("cur");
//            _titles_bg.removeClass("cur").eq(_current).addClass("cur");
//        };
//        var go = function () {
//            stop();
//            _intervalID = window.setInterval(function () { slide(); }, defaultOpts.interval);
//        };
//        var itemMouseOver = function (target, items) {
//            stop();
//            var i = $.inArray(target, items);
//            slide({ current: i });
//        };
//        _titles.hover(function () { if ($(this).attr('class') != 'cur') { itemMouseOver(this, _titles); } else { stop(); } }, go);
//        _bodies.hover(stop, go);
//        go();
//    }
//});

// 顶部图片轮播结束