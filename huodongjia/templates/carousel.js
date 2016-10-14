(function($){
    //默认参数
    var defaluts = {
        large_elem: "large_elem",     //大图
        small_elem: "small_elem",    //小图
        left_btn: "left_btn",        //左按�?
        right_btn: "right_btn" ,    //右按�?
        state: "on",                 // �?
        speed: "normal",             //速度
        vis: 4                        //项数
    };
    $.fn.extend({
        /* 带缩略图的轮播效�? */
        "thumbnailImg": function (options) {
            var opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆盖插件默认参数
            //遍历匹配元素的集�?
            return this.each(function () {
                var $this = $(this);
                /* 初始�? */
                $(opts.large_elem).find("ul li").eq(0).show();
                $(opts.small_elem).find("ul li").eq(0).addClass(opts.state);
                var l = $(opts.small_elem).find("ul li").length;
                var l_mean;
                if(l < opts.vis){
                    l_mean = 0;
                }else{
                    l_mean = ((parseInt(l / opts.vis) - 1) * opts.vis) + (l % opts.vis);
                }
                var w = $(opts.small_elem).find("ul li").outerWidth(true);  //缩略图项的宽度（包含内边距）
                $(opts.small_elem).find("ul").css("width",l * w + "px");    //初始化缩略图总宽�?
                /* 缩略图点�? */
                $(opts.small_elem).find("ul li").click(function(){
                    $(this).addClass(opts.state).siblings().removeClass(opts.state);
                    Img($(this).index());
                });
                /* 左按�? */
                $(opts.left_btn).click(function(){
                    var i;
                    $(opts.small_elem).find("ul li").each(function(index){
                        if($(this).hasClass(opts.state)){
                            i = index;
                        }
                    });
                    i--;
                    if(i < 0){
                        i = l - 1;
                    }
                    $(opts.small_elem).find("ul li").eq(i).addClass(opts.state).siblings().removeClass(opts.state);
                    var ml = i * w;
                    if(ml <= l_mean * w){
                        $(opts.small_elem).find("ul").stop().animate({
                            marginLeft: -ml + "px"
                        },opts.speed)
                    }else{
                        $(opts.small_elem).find("ul").stop().animate({
                            marginLeft: -(l_mean * w) + "px"
                        },opts.speed)
                    }
                    Img(i)
                });
                /* 右按�? */
                $(opts.right_btn).click(function(){
                    var i;
                    $(opts.small_elem).find("ul li").each(function(index){
                        if($(this).hasClass(opts.state)){
                            i = index;
                        }
                    });
                    i++;
                    if(i > l-1){
                        i = 0;
                    }
                    $(opts.small_elem).find("ul li").eq(i).addClass(opts.state).siblings().removeClass(opts.state);
                    var ml = i * w;
                    if(ml <= l_mean * w){
                        $(opts.small_elem).find("ul").stop().animate({
                            marginLeft: -ml + "px"
                        },opts.speed)
                    }else{
                        $(opts.small_elem).find("ul").stop().animate({
                            marginLeft: -(l_mean * w) + "px"
                        },opts.speed)
                    }
                    Img(i);
                });
                /* 大图 */
                function Img(i){
                    $(opts.large_elem).find("ul li").eq(i).fadeIn().siblings().hide();
                }
            });
        }
    });
})(jQuery);