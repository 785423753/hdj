$(function(){
    $(parent.document.getElementById("pageLoader")).hide();
    if($("#action-toggle").length>0) {
      $("#action-toggle").click(function(){
        if($("#action-toggle").attr("checked")) {
            $("#action-toggle").parents("table").find(".action-select").attr("checked","checked");
        } else {
            $("#action-toggle").parents("table").find(".action-select").removeAttr("checked");
        }
      });
    }
    $(".form_datetime").datetimepicker({
        format: "yyyy-mm-dd",
        showMeridian: true,
        autoclose: true,
        todayBtn: true
    });
    $("#result_list>tbody>tr>th>a").on('click',function(){
      var tmp = $(this);
      addRemoveTab(tmp);
      return false;
    });
  })
function addRemoveTab(tmp){
        var isAgain = false;
        var parentTmp = parent.window.document;
       /* $(parentTmp).find("#tabDiv ul.rightListFrame li a").each(function(){
          if(tmp.attr("data-name") === $(this).attr("href").substring(1)) {
            isAgain = true;
          }
        });*/
        if(!isAgain ) {
          $(parentTmp).find("#tabDiv .rightListFrame li").removeClass("active");
          $(parentTmp).find("#tabDiv .tab-content .tab-pane").removeClass("active");
          var tmpHref = tmp.attr("href");
          var keyId = getNumberFormUrl(tmpHref);
          $("<li></li>").addClass("active").append($("<a></a>").text(tmp.text()).attr("href","#"+keyId).attr("data-toggle","tab").append($("<span class='glyphicon glyphicon-remove removeTab'></span>").bind('click',tabClick))).appendTo($(parentTmp).find("#tabDiv ul.rightListFrame"));
          $("<div></div>").addClass("tab-pane").addClass("active").attr("id",keyId).append($("<iframe></iframe>").attr("id","iFrame"+tmp.attr("data-name")).css({"width":"100%","height":"1712px"}).attr("marginheight",0).attr("marginwidth",0).attr("scrolling","none").attr("frameborder",0).attr("name","iframepage").attr("src",tmp.attr("href"))).appendTo($(parentTmp).find("#tabDiv .tab-content"));
          $(parent.document.getElementById("pageLoader")).show();
           // iFrameHeight("iFrame"+tmp.attr("data-name"));
        }
      }
function getNumberFormUrl(urlStr) {
  return $.trim(urlStr.replace(/[^0-9]/ig,""));
}
function tabClick() {
        var href = $(this).parent("a").attr("href");
        var targetId = "";
        if($(this).parents("li").hasClass("active")) {
          if($(this).parents("li").next().length>0) {
            $(this).parents("li").next().addClass("active");
            targetId = $(this).parents("li").next().find("a").attr("href");
          } else if($(this).parents("li").prev().length>0) {
            $(this).parents("li").prev().addClass('active');
            targetId = $(this).parents("li").prev().find("a").attr("href");
          }
          $(top.document).find(targetId).addClass("active");
        }
        $(this).parents("li").remove();
        $(top.document).find(href).remove();
        return  false;
}