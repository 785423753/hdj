(function ($) {
    $.fn.promptumenu = function (options) {
        var settings = $.extend({"columns": 3, "rows": 4, "direction": "horizontal", "width": "auto", "height": "auto", "duration": 500, "pages": true, "inertia": 200}, options);
        return this.each(function () {
            var $this = $(this);
            var properties;
            var cursor = {x: 0, y: 1, page: 1};
            var cells = {"width": 0, "height": 0, "pages": 1, "current_page": 1};
            var methods = {go_to: function (index, easing, webkit) {
                if (easing === undefined) {
                    easing = "swing"
                }
                if (webkit === undefined) {
                    webkit = false
                }
                var anim, anim_css;
                if (settings.direction == "vertical") {
                    anim = {"top": (index - 1) * properties.height * (-1)};
                    anim_css = {"-webkit-transform": "translate3d(0px, " + ((index - 1) * properties.height * (-1)) + "px, 0px)"}
                } else {
                    anim = {"left": (index - 1) * properties.width * (-1)};
                    anim_css = {"-webkit-transform": "translate3d(" + ((index - 1) * properties.width * (-1)) + "px, 0px, 0px)"}
                }
                if (webkit) {
                    $this.css({"-webkit-transition-property": "-webkit-transform", "-webkit-transition-duration": settings.duration + "ms", "-webkit-transition-timing-function": "ease-out"});
                    $this.css(anim_css);
                    $this.data("ppos", (index - 1) * properties.width * (-1))
                } else {
                    $this.animate(anim, settings.duration, easing)
                }
                $this.parent(".promptumenu_window").find(".promptumenu_nav a.active").removeClass("active");
                $this.parent(".promptumenu_window").find(".promptumenu_nav a:nth-child(" + (index) + ")").addClass("active");
                cells.current_page = index
            }, next_page: function () {
                methods.go_to(cells.current_page + 1)
            }, prev_page: function () {
                methods.go_to(cells.current_page - 1)
            }};
            if ($this.data("promptumenu")) {
                console.error("You are calling promptumenu for an element more than twice. Please have a look.")
            } else {
                $this.data("promptumenu", true);
                $this.data("ppos", 0);
                properties = {"width": (settings.width == "auto") ? $this.width() : settings.width, "height": (settings.height == "auto") ? $this.height() : settings.height, "padding": 0, "display": "block", "overflow": "hidden"};
                cells.width = properties.width / settings.columns;
                cells.height = properties.height / settings.rows;
                $this.wrap('<div class="promptumenu_window" />');
                $this.parent(".promptumenu_window").css(properties);
                $this.css({"display": "block", "position": "absolute", "list-style": "none", "overflow": "visible", "height": "auto", "width": "100%", "left": 2, "margin": 0, "padding": 0, "font-size": "0.85em"});
                $this.children("li").css({"display": "block", "margin": "0 10px","float":"left"});
                $this.children("li").each(function () {
                    var $li = $(this);
                    cursor.x += 1;
                    if (cursor.x > settings.columns) {
                        cursor.x = 1;
                        cursor.y += 1
                    }
                    if (cursor.y > settings.rows) {
                        cursor.x = 1;
                        cursor.y = 1;
                        cursor.page += 1
                    }
                    $li.data("layout", $.extend({}, cursor));
                    if (settings.direction == "vertical") {
                        $li.css({"top": 0, "left": Math.round((cursor.x * cells.width - cells.width / 2) - ($li.width() / 2))});
                        $li.find("img").bind("load", function () {
                            var cursor = $li.data("layout");
                            $li.css({"top": 0, "left": Math.round((cursor.x * cells.width - cells.width / 2) - ($li.width() / 2))})
                        })
                    } else {
                        $li.css({"top": 0, "left": Math.round((cursor.x * cells.width - cells.width / 2) - ($li.width() / 2) + (cursor.page - 1) * properties.width)});
                        $li.find("img").bind("load", function () {
                            var cursor = $li.data("layout");
                            $li.css({"top": 0, "left": Math.round((cursor.x * cells.width - cells.width / 2) - ($li.width() / 2) + (cursor.page - 1) * properties.width)})
                        })
                    }
                });
                cells.pages = cursor.page;
                $this.data("promptumenu_page_count", cells.pages);
                if (cells.pages > 1 && settings.pages == true) {
                    var page_links = '<a class="active">Page 1</a>';
                    for (i = 2; i <= cells.pages; i++) {
                        page_links = page_links + "<a>Page " + i + "</a>"
                    }
                    $this.parent("div.promptumenu_window").append('<div class="promptumenu_nav">' + page_links + "</div>");
                    $this.parent("div.promptumenu_window").find(".promptumenu_nav a").bind("click.promptumenu", function () {
                        methods.go_to($(this).index() + 1)
                    })
                }
                if (settings.direction == "vertical") {
                    $this.css({"width": properties.width, "height": properties.height * cells.pages})
                } else {
                    $this.css({"width": properties.width * cells.pages, "height": properties.height})
                }
                $this.bind("mousedown.promptumenu", function (mdown) {
                    mdown.preventDefault();
                    $this.stop(true, false);
                    var init_pos = $this.position();
                    var click = {"x": mdown.pageX, "y": mdown.pageY};
                    var delta = {"x": 0, "y": 0};
                    var mmove_event = new Array();
                    $(document).bind("mousemove.promptumenu", function (mmove) {
                        mmove.preventDefault();
                        var date = new Date();
                        var this_event = {"time": date.getTime(), "x": mmove.pageX, "y": mmove.pageY};
                        while (mmove_event.length > 4) {
                            mmove_event.shift()
                        }
                        if (settings.direction == "vertical") {
                            delta.y = mmove.pageY - click.y;
                            $this.css("top", init_pos.top + delta.y)
                        } else {
                            delta.x = mmove.pageX - click.x;
                            $this.css("left", init_pos.left + delta.x)
                        }
                        mmove_event.push(this_event)
                    });
                    $(document).bind("mouseup.promptumenu", function (mup) {
                        mup.preventDefault();
                        $(document).unbind(".promptumenu");
                        var date = new Date();
                        var delta_start = mmove_event[0];
                        var delta_end = {"time": date.getTime(), "x": mup.pageX, "y": mup.pageY};
                        var event_delta = {"time": (delta_end.time - delta_start.time), "x": (delta_end.x - delta_start.x), "y": (delta_end.y - delta_start.y)};
                        var speed = {"x": event_delta.x / event_delta.time, "y": event_delta.y / event_delta.time};
                        if (settings.direction == "vertical") {
                            var pos = init_pos.top + delta.y + speed.y * settings.inertia;
                            if (pos < ((-1) * properties.height * (cells.pages - 1))) {
                                pos = (-1) * properties.height * (cells.pages - 1)
                            } else {
                                if (pos > 0) {
                                    pos = 0
                                }
                            }
                            if (settings.pages) {
                                var snap_to_page = Math.round((-pos) / properties.height);
                                methods.go_to(snap_to_page + 1, "inertia")
                            } else {
                                $this.animate({"top": pos}, Math.abs(speed.y * settings.inertia), "inertia")
                            }
                        } else {
                            var pos = init_pos.left + delta.x + speed.x * settings.inertia;
                            if (pos < ((-1) * properties.width * (cells.pages - 1))) {
                                pos = (-1) * properties.width * (cells.pages - 1)
                            } else {
                                if (pos > 0) {
                                    pos = 0
                                }
                            }
                            if (settings.pages) {
                                var snap_to_page = Math.round((-pos) / properties.width);
                                methods.go_to(snap_to_page + 1, "inertia")
                            } else {
                                $this.animate({"left": pos}, Math.abs(speed.x * settings.inertia), "inertia")
                            }
                        }
                    })
                });
                try {
                    var tinit_pos, tclick, tdelta;
                    var tmove_event = new Array();
                    var touchmove = function (tmove) {
                        tmove.preventDefault();
                        var date = new Date();
                        var this_event = {"time": date.getTime(), "x": tmove.touches[0].pageX, "y": tmove.touches[0].pageY};
                        while (tmove_event.length > 4) {
                            tmove_event.shift()
                        }
                        if (settings.direction == "vertical") {
                            tdelta.y = tmove.touches[0].pageY - tclick.y;
                            $this.css("-webkit-transform", "translate3d(0px, " + (tinit_pos + tdelta.y) + "px, 0px)")
                        } else {
                            tdelta.x = tmove.touches[0].pageX - tclick.x;
                            $this.css("-webkit-transform", "translate3d(" + (tinit_pos + tdelta.x) + "px, 0px, 0px)")
                        }
                        tmove_event.push(this_event)
                    };
                    var touchend = function (tend) {
                        tend.preventDefault();
                        document.removeEventListener("touchmove", touchmove, false);
                        document.removeEventListener("touchend", touchend, false);
                        var date = new Date();
                        var delta_start = tmove_event[0];
                        var delta_end = tmove_event[tmove_event.length - 1];
                        var event_delta = {"time": (delta_end.time - delta_start.time), "x": (delta_end.x - delta_start.x), "y": (delta_end.y - delta_start.y)};
                        var speed = {"x": event_delta.x / event_delta.time, "y": event_delta.y / event_delta.time};
                        if (settings.direction == "vertical") {
                            if (isNaN(speed.y)) {
                                speed.y = 2
                            }
                            $this.css({"-webkit-transition-duration": Math.abs(speed.y * settings.inertia * 3) + "ms", "-webkit-transition-timing-function": "ease-out"});
                            var pos = tinit_pos + tdelta.y + speed.y * settings.inertia;
                            if (pos < ((-1) * properties.height * (cells.pages - 1))) {
                                pos = (-1) * properties.height * (cells.pages - 1)
                            } else {
                                if (pos > 0) {
                                    pos = 0
                                }
                            }
                            if (settings.pages) {
                                var snap_to_page = Math.round((-pos) / properties.height);
                                methods.go_to(snap_to_page + 1, "inertia", true)
                            } else {
                                $this.css("-webkit-transform", "translate3d(0px, " + pos + "px, 0px)");
                                $this.data("ppos", pos)
                            }
                        } else {
                            if (isNaN(speed.x)) {
                                speed.x = 2
                            }
                            $this.css({"-webkit-transition-duration": Math.abs(speed.y * settings.inertia * 3) + "ms", "-webkit-transition-timing-function": "ease-out"});
                            var pos = tinit_pos + tdelta.x + speed.x * settings.inertia;
                            if (pos < ((-1) * properties.width * (cells.pages - 1))) {
                                pos = (-1) * properties.width * (cells.pages - 1)
                            } else {
                                if (pos > 0) {
                                    pos = 0
                                }
                            }
                            if (settings.pages) {
                                var snap_to_page = Math.round((-pos) / properties.width);
                                methods.go_to(snap_to_page + 1, "inertia", true)
                            } else {
                                $this.css("-webkit-transform", "translate3d(" + pos + "px, 0px, 0px)");
                                $this.data("ppos", pos)
                            }
                        }
                    };
                    $this[0].addEventListener("touchstart", function (tstart) {
                        $this.unbind(".promptumenu");
                        $this.stop(true, false);
                        $this.css({"-webkit-transition-duration": "0ms"});
                        var date = new Date();
                        tinit_pos = $this.data("ppos");
                        tclick = {"x": tstart.touches[0].pageX, "y": tstart.touches[0].pageY, "time": date.getTime()};
                        tdelta = {"x": 0, "y": 0};
                        tmove_event = new Array();
                        document.addEventListener("touchmove", touchmove, false);
                        document.addEventListener("touchend", touchend, false);
                        document.addEventListener("touchcancel", touchend, false)
                    }, false)
                } catch (error) {
                }
            }
        })
    }
})(jQuery);
jQuery.extend(jQuery.easing, {inertia: function (x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b
}});