$(function ($) {
    (function (window) {
            function getKey()  
            {  
                        if(event.keyCode==13){  
                                     alert('click enter');  
                                             }     
                            }  
        Array.prototype.contain = function (obj) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == obj) {
                    return true;
                }
            }
            return false;
        }
        window.newParaIdIndex = 1;
        $(".tagsinput").tagsInput();
        $(parent.document.getElementById("pageLoader")).hide();
        $(".form_datetime").datetimepicker();
        window.selectImgEvent = function () {
            $('input[name=img]').val(11);
            var event = window.event || arguments.callee.caller.arguments[0];
            //var theEvent = window.event || arguments.callee.caller.arguments[0];
            var dataImgId = $(event.target).attr("data-img-id");
            $('input[name=img]').val(dataImgId);
            if ($("#selectedMainImg").attr("value").length > 0) {
                var selectedImgIdArray = $("#selectedMainImg").attr("value").split(",");
                var flag = true;
                for (var i = 0; i < selectedImgIdArray.length; i++) {
                    if (selectedImgIdArray[i] == dataImgId) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    $("#selectedMainImg").attr("value", $("#selectedMainImg").attr("value") + "," + dataImgId);
                    $.get('admin/event/neweventtable/save_img_json/?img_id=' + dataImgId + '&order=1');
                    $("#carousel-example-generic").append("<div class='carousel-inner' data-img-id='"+dataImgId+"' role='listbox'><div class='item active'><img src='"+$(event.target).attr("data-img-url")+"' data-img-id='"+dataImgId+"'><span class='icon-remove removePic'></span><span>"+dataImgId+"</span></div></div>")
                } else {
                    var tmpArray = [];
                    for (var i = 0, j = 0; i < selectedImgIdArray.length; i++) {
                        if (selectedImgIdArray[i] != dataImgId) {
                            tmpArray[j++] = selectedImgIdArray[i];
                        }
                    }
                    $("#selectedMainImg").attr("value", tmpArray.join(","));
                    $("#carousel-example-generic").find(".carousel-inner[data-img-id="+dataImgId+"]").remove();
                    $.get('/newevent/save_img/?img_id=' + dataImgId + '&order=0');
                }
            } else {
                $("#selectedMainImg").attr("value", dataImgId);
            }

        };
        // CKEDITOR.replace('editEvent');
        //if ($("#eventStatus").val().length > 0) {
        //    var eventStatus = $("#eventStatus").val();
        //    if (eventStatus == 0) {
        //        $("#eventState").text('未处理');
        //    } else if (eventStatus == 1) {
        //        $("#eventState").text('已发布');
        //    } else if (eventStatus == 2) {
        //        $("#eventState").text('废弃');
        //    } else if (eventStatus == 3) {
        //        $("#eventState").text('待完善');
        //    } else if (eventStatus == 5) {
        //        $("#eventState").text('编辑中');
        //    } else if (eventStatus == 8) {
        //        $("#eventState").text('后备库');
        //    }
        //}

        var edits=$( 'textarea.ckeditor' ).ckeditor();
        $('.paraUl').sortable();
        $('.paraUl').on('click','.icon-remove',function(){
            if ( $(".paraUl li").length==1) {
                 $("#"+$(this).prevAll("a").attr("aria-controls")).hide();
            $(this).parents("li").remove();
                $("#editEvent_add").addClass('active')
            }else{
                if ($(this).parents("li").hasClass('active')) {
                if ($(this).parents("ul li").index()==0) {
                    $(this).parents("ul").find('li').eq(1).addClass('active');
                    $("#"+$(this).parents("ul").find('li').eq(1).find('a').attr("aria-controls")).addClass('active');
                }else{
                    $(this).parents("ul").find('li').eq(0).addClass('active');
                    $("#"+$(this).parents("ul").find('li').eq(0).find('a').attr("aria-controls")).addClass('active');
                }
            }
            $("#"+$(this).prevAll("a").attr("aria-controls")).hide();
            $(this).parents("li").remove();
            }
        })
        $('.paraUl').on('click','.editTag',function(){
            $(this).prevAll("a").hide();
            $(this).parent().find("span").hide();
            $(this).parents("li").append("<input type='text' value='"+$(this).prevAll("a").text()+"' /><span class='glyphicon glyphicon-ok editTag_ok'></span>");
        })
        $('.paraUl').on('click','.editTag_ok',function(){
            if($.trim($(this).parents("li").find('input').val()).length!=0){
                 $( 'textarea.ckeditor' ).ckeditor();
            $(this).prevAll("a").text($(this).parents("li").find('input').val()).show();
            $(this).parents("li").find('input').remove();
            $(this).parent().find("span").show();
             if($(this).parents("li").find('a[aria-controls*="editEvent_newadd"]')) {
                $(".paraUl li[class*='active']").removeClass('active');
                $(this).parents("li").addClass('active')
                 // $(".tab-content").append('<div role="tabpanel" class="tab-pane" id="'+$(this).parents("li").find("a").attr("aria-controls")+'"><textarea class="ckeditor"></textarea></div>');
                // $( 'textarea.ckeditor' ).ckeditor();
                $(".tab-pane[class*='active']").removeClass('active');
                $("#"+$(this).parents("li").find("a").attr("aria-controls")).addClass(' active');
                $('.paraUl').sortable();
            }
            $(this).remove();
        }else{
            if ($(this).parents("li").find("a").attr("aria-controls")!="editEvent_add") {
            $("#"+$(this).parents("li").find("a").attr("aria-controls")).remove();
        }
                    $(this).parents("li").remove();
        }
        })
        $(".editAdd").on('click', function(event) {
            var timestamp = Date.parse(new Date())/1000;
            var data_par_id = 'newpar_'+timestamp+''+$(".paraUl li").length;
            console.log(data_par_id);
            if ($(".paraUl li").length!=0) {
                $(".paraUl").append('<li role="presentation" class="active"><a data-par-id="'+data_par_id+'" href="#editEvent_newadd'+$(".tab-pane").length+'" aria-controls="editEvent_newadd'+$(".tab-pane").length+'" data-length="'+$(".tab-pane").length+'" role="tab" data-toggle="tab" style="display:none;"></a><span class="icon-remove" style="display:none;"></span><span class="icon-edit editTag" style="display:none;"></span><input type="text" /><span class="glyphicon glyphicon-ok editTag_ok"></span></li>');
                  $(".tab-content").append('<div role="tabpanel" class="tab-pane" id="editEvent_newadd'+$(".tab-pane").length+'"><textarea data-par-id="'+data_par_id+'" id="'+data_par_id+'" class="ckeditor"></textarea></div>');
            }else{
                $(".paraUl").append('<li role="presentation" class="active"><a data-par-id="'+data_par_id+'" href="#editEvent_add" aria-controls="editEvent_add" data-length="" role="tab" data-toggle="tab" style="display:none;"></a><span class="icon-remove" style="display:none;"></span><span class="icon-edit editTag" style="display:none;"></span><input type="text" /><span class="glyphicon glyphicon-ok editTag_ok"></span></li>');
                $('.new_add_par').attr('id',data_par_id);
            }
        });
        //编辑内容批量添加
        //嘉宾添加
        //$(".paraUl li:eq(2) .editTag").after('<span class="glyphicon glyphicon-zoom-in guest-zoom" style="position:absolute !important;top:auto;bottom:5%;left:77%;"></span>');
        $('.guest-zoom').on('click', function(){
            var par_id = $(this).parent('li').find('a').attr('data-length')
            $('.dv_for_jquerymobile iframe').contents().find('#grp-content-title').attr('data',par_id)   
            $(".dv_for_jquerymobile").show(); 
        });
        //
        $(".addselect a").on('click', function(event) {
            var a=$(this).attr("data-value").split("/")
            var timestamp = Date.parse(new Date())/1000;
            if ($(".paraUl li").length!=0) {
                alert(111112222222111)
                $('#submit_mask').show();
                if(confirm("点击确定按钮将清除之前编辑的段落,是否继续？")){
                    $(".tab-pane[class*='active']").removeClass('active');
                    $(".paraUl").html("");
                    for (var i = 0; i< a.length; i++) {
                        var data_par_id = 'newpar_'+timestamp+i;
                        console.log(data_par_id);
                        if (i==0) {
                         $(".paraUl").append('<li role="presentation" class="active"><a data-par-id="'+data_par_id+'" href="#editEvent_newadd'+$(".tab-pane").length+'" aria-controls="editEvent_newadd'+$(".tab-pane").length+'" data-length="'+$(".tab-pane").length+'" role="tab" data-toggle="tab" >'+a[i]+'</a><span class="icon-remove" ></span><span class="icon-edit editTag"></span></li>');
                        $(".tab-content").append('<div role="tabpanel" class="tab-pane active" id="editEvent_newadd'+$(".tab-pane").length+'"><textarea data-par-id="'+data_par_id+'" class="ckeditor"  id="'+data_par_id+'" ></textarea></div>');
                         }else{
                         $(".paraUl").append('<li role="presentation"><a data-par-id="'+data_par_id+'" href="#editEvent_newadd'+$(".tab-pane").length+'" aria-controls="editEvent_newadd'+$(".tab-pane").length+'" data-length="'+$(".tab-pane").length+'" role="tab" data-toggle="tab" >'+a[i]+'</a><span class="icon-remove"></span><span class="icon-edit editTag"></span></li>');
                        $(".tab-content").append('<div role="tabpanel" class="tab-pane" id="editEvent_newadd'+$(".tab-pane").length+'"><textarea data-par-id="'+data_par_id+'" id="'+data_par_id+'" class="ckeditor"></textarea></div>');
                         }
                    };

                    //嘉宾添加
                    //$(".paraUl li:eq(2) .editTag").after('<span class="glyphicon glyphicon-zoom-in editEvent_newadd'+$(".tab-pane").length+'" style="position:absolute !important;top:auto;bottom:5%;left:77%;"></span>');
                    $('.glyphicon').on('click', function(){
                        alert(2222222);
                        var par_id = $(this).parent('li').find('a').attr('data-length')
                        $('.dv_for_jquerymobile iframe').contents().find('#grp-content-title').attr('data',par_id)   
                        $(".dv_for_jquerymobile").show(); 
                    });
                    //

                }
            }else{
                    $(".tab-pane[class*='active']").removeClass('active');
                    for (var i = 0; i< a.length; i++) {
                        var data_par_id = 'newpar_'+timestamp+i;
                        console.log(data_par_id);
                        if (i==0) {
                         $(".paraUl").append('<li role="presentation" class="active"><a data-par-id="'+data_par_id+'" href="#editEvent_newadd'+$(".tab-pane").length+'" aria-controls="editEvent_newadd'+$(".tab-pane").length+'" data-length="'+$(".tab-pane").length+'" role="tab" data-toggle="tab" >'+a[i]+'</a><span class="icon-remove" style="display:none;"></span><span class="icon-edit editTag"></span></li>');
                        $(".tab-content").append('<div role="tabpanel" class="tab-pane active" id="editEvent_newadd'+$(".tab-pane").length+'"><textarea data-par-id="'+data_par_id+'" id="'+data_par_id+'" class="ckeditor"></textarea></div>');
                         }else{
                        $(".paraUl").append('<li role="presentation"><a data-par-id="'+data_par_id+'" href="#editEvent_newadd'+$(".tab-pane").length+'" aria-controls="editEvent_newadd'+$(".tab-pane").length+'" data-length="'+$(".tab-pane").length+'" role="tab" data-toggle="tab" >'+a[i]+'</a><span class="icon-remove" style="display:none;"></span><span class="icon-edit editTag"></span></li>');
                        $(".tab-content").append('<div role="tabpanel" class="tab-pane" id="editEvent_newadd'+$(".tab-pane").length+'"><textarea data-par-id="'+data_par_id+'" class="ckeditor"  id="'+data_par_id+'"></textarea></div>');
                         }
                    };

                    //嘉宾添加
                    //$(".paraUl li:eq(2) .editTag").after('<span class="glyphicon glyphicon-zoom-in" style="position:absolute !important;top:auto;bottom:5%;left:77%;"></span>');
                    $('.glyphicon').on('click', function(){
                        alert(33333333);
                        var par_id = $(this).parent('li').find('a').attr('data-length')
                        $('.dv_for_jquerymobile iframe').contents().find('#grp-content-title').attr('data',par_id)   
                        $(".dv_for_jquerymobile").show(); 
                    });
                    //

            }
                    $( 'textarea.ckeditor' ).ckeditor();
                    $('.paraUl').sortable();
        });
            function copyToClipboard(){
            var theEvent = window.event || arguments.callee.caller.arguments[0];
            var event = window.event || arguments.callee.caller.arguments[0];
            var client = new ZeroClipboard($(".clip_button"));
            client.on('ready', function (event) {
                // console.log( 'movie is loaded' );

                client.on('copy', function (theEvent) {
                    theEvent.clipboardData.setData('text/plain', $(theEvent.target).data('data-clipboard-text'));
                });
                client.on('aftercopy', function (theEvent) {
                    $("#formArea").find('.dz-image-preview').css('border', 'none');
                    $(theEvent.target).parents('div.dz-image-preview').css('border', '1px solid #d9534f');
                })
            });
            client.on('error', function (event) {
                // console.log( 'ZeroClipboard error of type "' + event.name + '": ' + event.message );
                ZeroClipboard.destroy();
            });
            }
        Dropzone.autoDiscover = false;
        var myDropzone = new Dropzone("div#formArea", {
            url: "/admin/event/neweventtable/save_img_json/", paramName: "img", addRemoveLinks: true, success: function (data) {
                var responseObject = JSON.parse(data.xhr.responseText);
                console.log(responseObject);
                if (responseObject.flag) {
                    $(data.previewElement).find(".dz-size").after($("<div></div>").html( "尺寸："+data.width+"*"+data.height).data("data-img-id", responseObject.id).addClass("dz-url").append($("<a></a>").data('data-clipboard-text', 'http://pic.huodongjia.com/'+responseObject.url).addClass('icon-copy').addClass('clip_button').bind('click', copyToClipboard)));
                    $(data.previewElement).find(".dz-upload").css("backgroundImage", "none");
                    $(data.previewElement).find(".dz-details").append($("<input onclick='selectImgEvent(this)' type='checkbox'>").attr("data-img-url", responseObject.url).attr("data-img-id", responseObject.id).css({
                        position: "absolute",
                        right: "-3px",
                        bottom: "-16px"
                    }));
                    $(data.previewElement).find(".dz-details").append("<span style='color:red;display:block;font-size:10px;'>勾选设为主图</span>");
                copyToClipboard()
                } else {
                    $(data.previewElement).find(".dz-size").text('上传图片识别!请重试');
                }
            }
        });
        myDropzone.on('error', function (file) {
            var errorMsg = errorMessage;
        });

        // "精彩回顾"上传模块----------开始--------------------------
        // author:moubo time:12/19 12:07
        function rdcopyToClipboard(){
            var theEvent = window.event || arguments.callee.caller.arguments[0];
            var event = window.event || arguments.callee.caller.arguments[0];
            var client = new ZeroClipboard($(".clip_button"));
            client.on('ready', function (event) {
                // console.log( 'movie is loaded' );

                client.on('copy', function (theEvent) {
                    theEvent.clipboardData.setData('text/plain', $(theEvent.target).data('data-clipboard-text'));
                });
                client.on('aftercopy', function (theEvent) {
                    $("#reviewdocs").find('.dz-image-preview').css('border', 'none');
                    $(theEvent.target).parents('div.dz-image-preview').css('border', '1px solid #d9534f');
                })
            });
            client.on('error', function (event) {
                // console.log( 'ZeroClipboard error of type "' + event.name + '": ' + event.message );
                ZeroClipboard.destroy();
            });
        }
        var reviewdocDropzone = new Dropzone("div#reviewdocs", {
            url: "/admin/event/neweventtable/save_review_docs/",paramName: "docs", addRemoveLinks: true, success: function (data) {
                var responseObject = JSON.parse(data.xhr.responseText);
                var returnid = $("#reviewdocsid").val();
                console.log(responseObject);
                if (responseObject.flag) {
                    var html_str = '<div class="item active file-display" data-file-id='+responseObject.id+'> ';
                    html_str += '<img style="width:100px;height:100px" src="';
                    html_str +=  responseObject.url+'" data-file-id="'+responseObject.id+'" alt="'+responseObject.name+'">';
                    html_str += ' <span class="icon-remove remove-file" style="cursor:pointer;"></span>';
                    html_str += '</div>';
                    $('.doc-list').append(html_str);
                    $(data.previewElement).find(".dz-size").text('上传成功!');
                } else {
                    $(data.previewElement).find(".dz-size").text('上传失败,请重试!');
                }

		$(".remove-file").on('click', function () {
        		$(this).parent('.file-display').remove();
    		});
            }
        });
        reviewdocDropzone.on('error', function (file) {
            var errorMsg = errorMessage;
            alert(errorMessageg);
        });
        // ---------------------- 结束----------------------------------
        if ($("#s_id_Type").length > 0) {
            $("#s_id_Type").change(clickSelectPrice);
            $("#s_id_Type").change();
        }
        if ($("#sendEmail").length > 0) {
            $('#sendEmail').click(function () {
                var eventName = $("#id_name").val();
                var emailContent = $("#remark").val();
                var content = "亲爱的用户，您好！您在活动家发布的活动正在审核中，请您提供更详细的活动内容及活动费用,以便您的活动及时审核上线,谢谢。";
                if (eventName != '' && emailContent != '') {
                    $.post('/newevent/send_email/', {
                        'email': emailContent,
                        'content': content,
                        'subject': eventName
                    }, function (data) {
                        if (data.flag) {
                            alert('发送成功');
                        }
                    });
                }
            });
        }
        function clickSelectPrice() {
            var selectType = $(this).val();
            $(".priceModal").hide();
            if (selectType == 1 || selectType == 3 || selectType == 6) {
                $(".priceModal" + selectType).show();
                $(".priceModal6").show();
            }
            if (selectType == 2) {
                $(".priceModal6").show();
            }
        }

        function clickCat() {
            var theEvent = window.event || arguments.callee.caller.arguments[0];
            var selectedCatId = $(theEvent.target).attr("value");
            console.log($(theEvent.target));
            console.log(selectedCatId);
            var selectedCatName = $(theEvent.target).html();
            if (!$('.tagsinput').tagExist(selectedCatName)) {
                $(".tagsinput").addTag(selectedCatName, selectedCatId);
                //$(theEvent.target).attr('data_value',selectedCatId);
                //$("#selectedTags").attr("value", $("#selectedTags").attr('value') + selectedCatId + "|" + selectedCatName + ",");
            }
            return false;
        }

        function clickRemoveTag() {
            var theEvent = window.event || arguments.callee.caller.arguments[0];
            var deleteTagUrl = '/newevent/del_tag/?tag_id=' + $(theEvent.target).siblings('a').attr('value');
            var tmp = $(theEvent.target).parent('li');
            swal({
                title: "Are you sure?", text: "您确定删除该标签吗?",
                type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55", confirmButtonText: "是的,我要删除!",
                closeOnConfirm: false
            }, function () {
                $.get(deleteTagUrl, function (data) {
                    if (data.flag) {
                        swal("已删除!", "删除成功.", "success");
                        tmp.remove();
                    } else {
                        swal("失败", "标签删除失败!请重试", "error");
                    }
                });
            });
        }

        window.clickRemoveTag = clickRemoveTag;
        window.clickCat = clickCat;
        if ($("#districtPid-edit").length > 0) {
            $.get('/admin/event/neweventtable/show_city_json/', {type: 'json'}, function (data) {
                var defaultCityId = $("#selectedCityId").val().split(",")[0];
                var flag = false;
                var optionParentHtml = "";
                var optionChildHtml = "";
                var attrHtml = "";
                for (var i = 0; i < data.length; i++) {
                    var cityParentObj = data[i];
                    var cityChildObj = cityParentObj.child;
                    for (var j = 0; j < cityChildObj.length; j++) {
                        var childObj = cityChildObj[j];
                        attrHtml += childObj.id + "|" + childObj.district_name + ",";
                        if (childObj.id == defaultCityId) {
                            flag = true;
                        }
                    }
                    attrHtml = attrHtml.substring(0, attrHtml.length - 1);
                    if (flag) {
                        optionParentHtml += "<option selected='selected' data-city=" + attrHtml + " value='" + cityParentObj.id + "'>" + cityParentObj.district_name + "</option>";
                    } else {
                        optionParentHtml += "<option data-city=" + attrHtml + " value='" + cityParentObj.id + "'>" + cityParentObj.district_name + "</option>";
                    }
                    attrHtml = "";
                    flag = false;
                }
                $("#districtPid-edit").html(optionParentHtml);
                $("#districtPid-edit").change();
            });
            $("#districtPid-edit").change(function () {
                var defaultCityId = $("#selectedCityId").val().split(",")[0];
                var selectedCityArray = $(this).find("option:selected").attr("data-city").split(",");
                var selectChildHtml = "";
                for (var i = 0; i < selectedCityArray.length; i++) {
                    var cityChild = selectedCityArray[i];
                    if (cityChild.split('|')[0] == defaultCityId) {
                        selectChildHtml += '<option selected="selected" value="' + cityChild.split("|")[0] + '">' + cityChild.split("|")[1] + "</option>";
                    } else {
                        selectChildHtml += '<option value="' + cityChild.split("|")[0] + '">' + cityChild.split("|")[1] + "</option>";
                    }
                }
                $("#districtId-edit").html(selectChildHtml);
            })
        }


        if ($(".tagsinput-add-container").length > 0) {
            $(".tagsinput-add-container input").on('blur', function () {
                //$(".tagsinput-add-container").parent().find("span:last").attr('data_value', 'newtag_'+Date.parse(new Date())/1000);
                var tagName = $.trim($(".tagsinput-add-container").parent().find("span:last").text());
                if ($("#lastEditTag").val() != tagName) {
                    $("#lastEditTag").attr('value', tagName);
                    var parentCatId = $("#eventCat").find('option:selected').val();
//
                $.ajax({
                    type: 'POST',
                    url: "/newevent/save_tag/",
                    data: {tag: tagName, cat: parentCatId},
                    dataType: 'json',
                    aysnc: false,
                    success: function (data) {
                        var selectedTagsStr = $("#selectedTags").val();
                        if (data.flag) {
                            tag_id = ''
                            for (var i = 0; i < data.tag.length; i++) {
                                var tagNew = data.tag[i];
                                if (tagNew.flag) {
                                    selectedTagsStr += tagNew.id + "|" + tagNew.name + ',';
                                    if (tag_id != '')tag_id += ',';
                                    tag_id += tagNew.id;
                                }
                            }
                            $(".tagsinput-add-container").parent().find("span:last").attr('data_value', tag_id);
                            //$(".tagsinput-add-container").parent().find("span:last").attr('data_value', 'newtag'+Date.parse(new Date())/1000);
                            $("#selectedTags").attr('value', selectedTagsStr);

                        }
                    }
                });
//

                    //$.post('/newevent/save_tag/', {tag: tagName, cat: parentCatId}, function (data) {
                        //var selectedTagsStr = $("#selectedTags").val();
                        //if (data.flag) {
                            //tag_id = ''
                            //for (var i = 0; i < data.tag.length; i++) {
                                //var tagNew = data.tag[i];
                                //if (tagNew.flag) {
                                    //selectedTagsStr += tagNew.id + "|" + tagNew.name + ',';
                                    //if (tag_id != '')tag_id += ',';
                                    //tag_id += tagNew.id;
                                //}
                            //}
                            //$(".tagsinput-add-container").parent().find("span:last").attr('data_value', tag_id);
                            //$("#selectedTags").attr('value', selectedTagsStr);

                        //}
                    //})
                }
            });
        }

        function searchAddress() {
            window.deleteAddress = function (event) {
                if ($(event).parent("td").length > 0) {
                    var addressId = $(event).attr('data-addr-id');
                } else {
                    var addressId = $(event.target).attr('data-addr-id');
                }
                var readyAdds = $("#selectedVenueId").attr("value");
                readyAdds = myReplaceStr(addressId, readyAdds, "");
                $("#selectedVenueId").attr("value", readyAdds).val(readyAdds);
                if ($(event).parents("tr").length > 0) {
                    $(event).parents("tr").remove();
                } else {
                    $(event.target).parents("tr").remove();
                }
                $("#address_table_body").find('tr[data-addr-id=' + addressId + ']').removeClass('selected');
                if ($("#source_address_table_body").find('tr').length == 0) {
                    $("#selectedAddress").hide();
                }
            };
            window.selectAddress = function (event) {
                var selectedAddressId = $(event).attr('data-addr-id');
                var selectedAddressTitle = $(event).find("td").eq(0).text();
                var selectedAddressName = $(event).find("td").eq(1).text();
                var addressCityName = $(event).find('td').eq(2).text();
                var htmlTemp = "<tr data-addr-id='" + selectedAddressId + "''>" + "<td><span class='icon-remove'" + "data-addr-id='" + selectedAddressId + "'" + " onclick='deleteAddress(this)'></span>" + selectedAddressTitle + "</td>" + "<td>" + selectedAddressName + "</td>" + "<td>" + addressCityName + "</td><td><span class='glyphicon glyphicon-edit edit_Address'></span></td></tr>";
                var alreadyId = $("#selectedVenueId").attr("value");
                if (alreadyId.indexOf(selectedAddressId) == -1) {
                    $("#source_address_table_body").append($(htmlTemp));
                    if (alreadyId == '') {
                        $("#selectedVenueId").attr('value', selectedAddressId).val(selectedAddressId);
                    } else {
                        $("#selectedVenueId").attr('value', alreadyId + "," + selectedAddressId).val(alreadyId + "," + selectedAddressId);
                    }
                } else {
                    $("#source_address_table_body").find('tr[data-addr-id=' + selectedAddressId + ']').remove();
                    if ($("#source_address_table_body").find('tr').length == 0) {
                        $("#selectedAddress").hide();
                    }
                    var readyAdds = $("#selectedVenueId").attr("value");
                    readyAdds = myReplaceStr(selectedAddressId, readyAdds, '');
                    $("#selectedVenueId").attr("value", readyAdds).val(readyAdds);

                }
                if ($(event).hasClass('selected')) {
                    $(event).removeClass('selected');
                } else {
                    $(event).addClass('selected');
                }
            };
            $('#addressClose').click(function () {
                $('#searcAddressResult').hide();
                if ($('#selectedAddress tbody tr').length > 0) {
                    $('#selectedAddress').show();
                    $("#selectedAddress").css({'opacity': 1});
                }
                $('#addressOpen').show();
            });
            $('#addressOpen').click(function () {
                if ($("#address_table_body tr").length > 0) {
                    $("#searcAddressResult").show();
                    $("#selectedAddress").css({'opacity': 0});
                }
            });
            $("#search-address").change(function () {
                var address = $(this).val();
                var urlPath = "/newevent/get_json_addr_str/" + address + "/?_=1411610829905";
                $.get(urlPath, function (data) {
                    var alreadyAddressIdArray = $("#selectedVenueId").val().split(',');
                    var flag = false;
                    if (alreadyAddressIdArray.length > 0) {
                        flag = true;
                    }
                    var tbodyHtml = "";
                    for (var i = 0; i < data.length; i++) {
                        var addressObject = data[i];
                        if (flag) {
                            if (alreadyAddressIdArray.contain(data[i].id)) {
                                tbodyHtml += "<tr class='selected' onclick='selectAddress(this)'" + "data-addr-id='" + data[i].id + "'>"
                            } else {
                                tbodyHtml += "<tr onclick='selectAddress(this)'" + "data-addr-id='" + data[i].id + "'>"
                            }
                        }
                        tbodyHtml += "<td>" + addressObject.title + "</td>" + "<td>" + addressObject.address + "</td>" + "<td>" + addressObject.city + "</td></tr>";
                    }
                    $("#address_table_body").html(tbodyHtml);
                    $('#searcAddressResult').show();
                    $("#selectedAddress").css({'opacity': 0});
                });
            })
            $(".deleteAddress").on('click', deleteAddress);
        }

        function myReplaceStr(replaceValue, replaceStr, newValue) {
            var replaceStrAry = replaceStr.split(",");
            var clone = [];
            for (var i = 0, j = 0; i < replaceStrAry.length; i++) {
                if (replaceStrAry[i] == replaceValue) {
                    if (newValue != "") {
                        clone[j++] = newValue;
                    }
                } else {
                    if (replaceStrAry[i] != '') {
                        clone[j++] = replaceStrAry[i];
                    }
                }
            }
            return clone.join(",");
        }

        function iscontain(checkValue, containArray) {
            if (containArray.length == 0) {
                return false;
            }
            for (var i = 0; i < containArray.length; i++) {
                if (containArray[i] === checkValue) {
                    return true;
                }
            }
            return false;
        }

        function searchSeo() {
            window.deleteSeo = function (event) {
                $('#selected_seo_table_body').find('tr').remove();
                $('#selectedSeoId').attr('value', '');
                $('#addSeoBtn').text('新建seo');
            };
            window.selectSeo = function (event) {
                var selectedSeoId = $(event).attr("data-id");
                var selectedSeoName = $(event).find('td').eq(0).text();
                var selecteTitle = $(event).find("td").eq(1).text();
                var selecteDescription = $(event).find("td").eq(2).text();
                var selecteKeywords = $(event).find("td").eq(3).text();
                $("#selectedSeoId").attr("value", selectedSeoId).val(selectedSeoId);
                var seoTr = "<tr dataSeoId=\"" + selectedSeoId + "\"><td><span class='icon-remove' onclick='deleteSeo(this)'></span>" + selectedSeoName + "</td>" + "<td>" + selecteTitle + "</td>" + "<td>" + selecteDescription + "</td><td>" + selecteKeywords + "</td></tr>";
                $("#selected_seo_table_body").html('').append($(seoTr));
                if ($(event).hasClass('selected')) {
                    $(event).removeClass('selected');
                    $("#selected_seo_table_body").html('');
                    $("#selectedSeoId").attr("value", '').val('');
                    $('#addSeoBtn').text('新增seo');
                } else {
                    $(event).parent('tbody').find('tr').removeClass('selected');
                    $(event).addClass('selected');
                    $("#selectedSeoId").attr("value", selectedSeoId).val(selectedSeoId);
                    $('#addSeoBtn').text('修改seo');
                }
                $('#seoClose').click();
                $('#seoOpen').show();
            };
            $('#seoOpen').click(function () {
                if ($("#search_seo_table_body tr").length > 0) {
                    $("#searcSEOResult").show();
                    $("#selectedSeo").css({'opacity': 0});
                }
            });
            $('#seoClose').click(function () {
                $('#searcSEOResult').hide();
                if ($('#selectedSeo tbody tr').length > 0) {
                    $('#selectedSeo').show();
                    $("#selectedSeo").css({'opacity': 1});
                }
                $('#seoOpen').show();
            });
            if ($("#search-seo").length > 0) {
                $("#search-seo").change(function () {
                    var seo = $(this).val();
                    var urlPath = "/newevent/find_seo_json/10/" + seo + "/";
                    $.get(urlPath, function (data) {
                        var tbodyHtml = "";
                        for (var i = 0; i < data.length; i++) {
                            var seoObject = data[i];
                            tbodyHtml += "<tr onclick='selectSeo(this)' data-id='" + seoObject.id + "'>";
                            tbodyHtml += "<td>" + seoObject.title + "</td>" + "<td>" + seoObject.keywords + "</td>" + "<td>" + seoObject.description + "</td><td>" + seoObject.keywords + "</td></tr>";
                        }
                        $("#search_seo_table_body").html(tbodyHtml);
                        $("#searcSEOResult ").show();
                        $('#addSeoBtn').text('修改seo');
                    });
                });
            }
            $(".deleteSeo").on('click', deleteSeo);
        }

        searchSeo();
        searchAddress();
        $("#saveSeo").click(function () {
            if ($("#modal_id_keywords").val() == '') {
                $('#modal_id_keywords').parents('.form-group').addClass('has-error');
                $('#modal_id_keywords').parent('div').append('<span class="help-block">注意!表单提交时,Keywords不能为空</span>');
                return false;
            } else {
                var name = $('#modal_id_name').val();
                var title = $('#modal_id_title').val();
                var keywords = $('#modal_id_keywords').val();
                var description = $('#modal_id_description').val();
                $.post('/newevent/save_seo/', {
                    'name': name,
                    'title': title,
                    'keywords': keywords,
                    'description': description
                }, function (data) {
                    if (data.flag) {
                        $('#selectedSeoId').attr('value', data.id).val(data.id);
                        var seoTr = "<tr dataSeoId=\"" + data.id + "\"><td><span class='icon-remove' onclick='deleteSeo(this)'></span>" + data.name + "</td>" + "<td>" + data.title + "</td>" + "<td>" + data.description + "</td><td>" + data.keywords + "</td></tr>";
                        $('#selected_seo_table_body').html('').append($(seoTr));
                        $('#seoModal').modal('hide')
                        $('#selectedSeo').show();
                    }
                });
            }
            return false;
        });
        $('#seoModal').on('shown.bs.modal', function () {
            if ($('selectedSeoId').val() != '') {
                $('#modal_id_name').val($('#selected_seo_table_body').find('tr td').eq(0).text());
                $('#modal_id_title').val($('#selected_seo_table_body').find('tr td').eq(1).text());
                $('#modal_id_description').val($('#selected_seo_table_body').find('tr td').eq(2).text());
                $('#modal_id_keywords').val($('#selected_seo_table_body').find('tr td').eq(3).text());
            } else {
                $('#modal_id_name').val('');
                $('#modal_id_title').val('');
                $('#modal_id_description').val('');
                $('#modal_id_keywords').val('');
            }
        });






        if ($("#fromUl").length > 0) {
            var alreadyTypeIdArray = [];
            $("#fromUl li").each(function () {
                alreadyTypeIdArray[alreadyTypeIdArray.length] = $(this).find('.fromType').attr('data-type-id');
            });
            function fromUlClick() {
                var showFlag = {flag: false, currentId: ''};
                //showFlag.flag = false;
                //showFlag.currentId = '';
                $("#fromUl").click(function () {
                    var theEvent = window.event || arguments.callee.caller.arguments[0];
                    var relatedId = $(theEvent.target).parents('li').attr('data-id');
                    //if (theEvent.target.className == 'icon icon-remove') {
                    //    swal({
                    //        title: "Are you sure?",
                    //        text: "您确定删除该信息来源吗?",
                    //        type: "warning",
                    //        showCancelButton: true,
                    //        confirmButtonColor: "#DD6B55",
                    //        confirmButtonText: "是的,我要删除!",
                    //        closeOnConfirm: false
                    //    }, function () {
                    //        $("#fromUl").find('li[data-id=' + relatedId + ']').remove();
                    //        var selectedFromId = $("#from_id").attr('value');
                    //        selectedFromId = myReplaceStr(relatedId, selectedFromId, '');
                    //        $("#from_id").attr('value', selectedFromId);
                    //        swal("已删除!", "删除成功.", "success");
                    //    });
                    //}

                    //if (!showFlag.flag && theEvent.target.className == 'icon icon-edit') {
                    //    var theLi = $(theEvent.target).parents('li');
                    //    var url = theLi.find('a').attr('href');
                    //    /*var type_id = theLi.find('.fromType').attr('data-type-id');*/
                    //    var from_id = $(theEvent.target).parents('li').attr('data-id');
                    //    var remark = theLi.find('.right').text();
                    //    var class_id = theLi.find('.contactType').attr('data-type-id');
                    //    var theLiIndex = 0;
                    //    var fromUlLis = $("#fromUl").find('li');
                    //    for (theLiIndex; theLiIndex < fromUlLis.length; theLiIndex++) {
                    //        if (fromUlLis[theLiIndex] == theLi[0]) {
                    //            break;
                    //        }
                    //    }
                    //    var top = (1 + parseInt(theLiIndex)) * 73;
                    //    $('#editFromArea').find('.type_f_Class').find('option[value=' + class_id + ']').attr('selected', true);
                    //    $('#editFromArea').find('.Website').val(url);
                    //    $('#editFromArea').find('.remark').val(remark).attr('value', remark);
                    //    $('#editFromArea').find('.id').attr('value', from_id);
                    //    $('#editFromArea').css({'top': top}).slideDown();
                    //    showFlag.currentId = relatedId;
                    //    showFlag.flag = true;
                    //    return;
                    //}

                    //if (showFlag.flag && showFlag.currentId == relatedId && event.target.className == 'icon icon-edit') {
                    //    from_id = $("#editFromArea").find('.id').attr('value');
                    //    $.ajax({
                    //        type: 'post',
                    //        url: '/newevent/save_from/',
                    //        data: {
                    //            'id': from_id,
                    //            'f_class': $(theEvent.target).parents('li').find('.fromType').attr('data-type-id'),
                    //            'type': $('#editFromArea').find('.type_f_Class').find('option:selected').val(),
                    //            'Website': $('#editFromArea').find('.Website').val(),
                    //            'f_content': $('#editFromArea').find('.remark').val()
                    //        },
                    //        async: false,
                    //        success: function (data) {
                    //            if (data.flag) {
                    //                $("#fromUl").find('li[data-id=' + from_id + ']').find('a').attr('href', data.Website);
                    //                $("#fromUl").find('li[data-id=' + from_id + ']').find('a').next('span').text(data.Website);
                    //                $("#fromUl").find('li[data-id=' + from_id + ']').find('.contactType').text($('#editFromArea').find('.type_f_Class').find('option:selected').text());
                    //                $("#fromUl").find('li[data-id=' + from_id + ']').find('.contactType').attr('data-type-id', data.type_id);
                    //                $("#fromUl").find('li[data-id=' + from_id + ']').attr('data-id', data.id);
                    //                if (data.id !== from_id) {
                    //                    var tmpIdStr = $("#from_id").attr('value');
                    //                    tmpIdStr = myReplaceStr(from_id, tmpIdStr, data.id);
                    //                    $("#from_id").attr('value', tmpIdStr);
                    //                }
                    //                $("#fromUl").find('li[data-id=' + from_id + ']').find('.right').text(data.content);
                    //            }
                    //        }
                    //    });
                    //
                    //    $("#fromUl").find('li[data-id=' + from_id + ']').attr('updated', true);
                    //    $('#editFromArea').slideUp();
                    //    showFlag.currentId = '';
                    //    showFlag.flag = false;
                    //}

                    if (theEvent.target.className == 'icon icon-envelope-alt') {
                        var eventName = $("#id_name").val();
                        var from_id = $(theEvent.target).parents('li').attr('data-id');
                        var fromTypeId = $(theEvent.target).parents('li').find('.fromType').attr('data-type-id');
                        var contactTypeId = $(theEvent.target).parents('li').find('.contactType').attr('data-type-id');
                        if (contactTypeId == 1 || contactTypeId == 2) {
                            contactTypeId = 5;
                        }
                        var emailContent = $(theEvent.target).parents('li').find('.right').text();
                        var content = "亲爱的用户，您好！您在活动家发布的活动正在审核中，请您提供更详细的活动内容及活动费用,以便您的活动及时审核上线,谢谢。";
                        var f_class = $(theEvent.target).parents('li').find('.fromType').text();
                        if (eventName != '' && emailContent != '') {
                            $.post('/newevent/send_email/', {
                                'email': emailContent,
                                'content': content,
                                'subject': eventName
                            }, function (data) {
                                if (data.flag) {
                                    swal("邮件已发送!", "发送成功", "success");
                                    //$.post('/newevent/save_from/', {
                                    //    'from_id': from_id,
                                    //    'type': contactTypeId,
                                    //    'f_class': fromTypeId
                                    //}, function (data) {
                                    //    if (data.flag) {
                                    //        $("#fromUl").find('li[data-id=' + from_id + ']').find('.contactType').attr('data-type-id', 5).text('邮件已发送');
                                    //        $("#fromUl").find('li').find('.contactType').attr('data-type-id', 5).text('邮件已发送');
                                    //
                                    //    }
                                    //});
                                    $("#fromUl").find('li[data-id=' + from_id + ']').find('.contactType').attr('data-type-id', 5).text('邮件已发送');
                                } else {
                                    swal("发送失败!", "请确认该条信息来源的备注中是否有合法的email地址", "error");
                                }
                            });
                        }
                    }
                });
            }

            fromUlClick();

            //添加信息
            $("#add-info").click(function () {
                var url = $("#Website").val();
                var contacts = $("#contacts").val();
                var phone = $("#phone").val();
                var email = $("#email").val();
                var remarktext = $("#remark").val();
                if (url == "" && remarktext == "") {
                    swal("请输入来源信息");
                    return false
                } else {
                    $("#fromUl").append("<li data-id=" + (-Math.round(Math.random() * 10000)) + ">" +
                    "<span class='left'>" +
                    "<a href='" + url + "' target='_blank' style='padding-right:10px;'><i class=' icon-globe'></i></a>" +
                    "来源链接：<span class='website_url'>" + url + "</span>&nbsp;&nbsp;" +
                    "联系人：<span class='contacts'>" + contacts + "</span>&nbsp;&nbsp;" +
                    "电话：<span class='phone'>" + phone + "</span>&nbsp;&nbsp;" +
                    "邮箱：<span class='email'>" + email + "</span>&nbsp;&nbsp;" +
                    "<span class='label label-info contactType'  data-type-id='1'>未联系</span>" +
                    "<span class='label label-info fromType' data-type-id='1'>主办方</span>"+
                    "<span class='right'>" + remarktext + "</span>" +
                    "<i class='icon icon-remove' id='info_remove'></i>" +
                    "<i class='icon icon-edit' id='info_edit'></i>" +
                    "<i class='icon icon-envelope-alt' id='email_edit'></i>" +
                    "<span class='glyphicon glyphicon-remove-circle' id='close_info' style='position: absolute;cursor: pointer;top:1px;font-size: 16px;right: 74px;display: none'></span>"+
                    "<span class='glyphicon glyphicon-ok-circle price_gly' id='open_info' style='position: absolute;cursor:pointer;font-size: 16px;top: 1px;right: 96px;cursor:pointer;display:none'></span>"+
                    "</span></li>");
                    $("#Website").val("");
                    $("#remark").val("");

                }
            });

            //修改信息来源
            function editinfo(){
                var theLi = $(this).parents('li');
                var url = theLi.find('a').attr('href');
                var remark = theLi.find('.right').text();
                var contacts = theLi.find('.contacts').text();
                var phone = theLi.find('.phone').text();
                var email= theLi.find('.email').text();
                $('#editFromArea').find('.Website').val(url);
                $('#editFromArea').find('.contacts').val(contacts);
                $('#editFromArea').find('.phone').val(phone);
                $('#editFromArea').find('.email').val(email);
                $('#editFromArea').find('.remark').val(remark).attr('value', remark);
                $('#editFromArea').css({'top': top}).slideDown();
                $('#editFromArea').data('id', theLi.data('id'));
            }
            $("#fromUl").on("click", ".icon-edit", editinfo);
            function closeinfo(){
                $(this).parent().slideUp();
            }
            $("#editFromArea").on("click", ".glyphicon-remove-circle", closeinfo);
            function success_info(){
                $(this).parent().slideUp();
                var theLi = $('#fromUl li[data-id=' + $('#editFromArea').data('id') + ']')
                theLi.find(".contactType").text($('#editFromArea').find('.type_f_Class').find('option:selected').text());
                theLi.find(".contactType").attr("data-type-id",$('#editFromArea').find('.type_f_Class').find('option:selected').val());
                theLi.find('a').attr('href', $('#editFromArea').find('.Website').val());
                theLi.find('a').next('span').text($('#editFromArea').find('.Website').val());
                theLi.find('.right').text($('#editFromArea').find('.remark').val());
                theLi.find('.contacts').text($('#editFromArea').find('.contacts').val());
                theLi.find('.phone').text($('#editFromArea').find('.phone').val());
                theLi.find('.email').text($('#editFromArea').find('.email').val());
            }
            $("#editFromArea").on("click", ".glyphicon-ok-circle",success_info);

            //删除信息

            function iconremove(){
                var del_item = $(this).parent().parent();
                swal({
                        title: "Are you sure?",
                        text: "您确定删除该信息来源吗?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "是的,我要删除!",
                        closeOnConfirm: false
                    }, function() {
                        del_item.remove();
                        swal("ok!", "已删除", "success");
                        if($(".del_info_id").val().length==0){
                            $(".del_info_id").val(del_item.attr("data-id"))
                        }else{
                            $(".del_info_id").val($(".del_info_id").val()+","+del_item.attr("data-id"));
                        }
                    }
                );

            }
            $("#fromUl").on("click", ".icon-remove", iconremove);
        }
        if ($("#id_f_Class").length > 0) {
            $("#fromArea .type").eq(0).show();
        }
            $("#carousel-example-generic").on('click',".removePic",function () {
                var dataImgId = $(this).parent('div').find('img').attr('data-img-id');
                $(this).parent("div").remove();
                var alreadyImgId = $("#selectedMainImg").val();
                if ($("#carousel-example-generic").find(".item:first-child").length > 0) {
                    $("#carousel-example-generic").find(".item:first-child").addClass('active');
                }
                var tmpArray = [];
                selectedImgIdArray = $("#selectedMainImg").attr('value').split(',');
                for (var i = 0, j = 0; i < $("#carousel-example-generic .carousel-inner .item").length; i++) {
                    tmpArray.push($("#carousel-example-generic .carousel-inner .item").eq(i).find("img").attr("data-img-id"))
                }
                $("#selectedMainImg").attr("value", tmpArray.join(","));
            });
        $(".saveEvent").click(function () {
            alert(11111111)
            $("#mask").show();
            var name = $("#id_name").val();
            if( $.trim(name) == '' ){
                swal('请填写活动名');
                return ;
            }

            if ($(this).hasClass('savePublish')) {
                $("#eventStatus").val(1);
            }
            if ($(this).hasClass('saveTuijian')) {
                $("#eventStatus").val(1);
                var order = 1 + parseInt($("#tujianStatus").val());
                $("#tujianStatus").val(order);
            }
            if ($(this).hasClass('saveContinue')) {
                $("#eventStatus").val(3);
            }
            if ($(this).hasClass('saveReserve')) {
                $("#eventStatus").val(8);
            }
            if ($(this).hasClass('saveDiscard')) {
                $("#eventStatus").val(2);
            }
            var tg_id = ''
            try {
                $("#selectedCatArea").find(".tag>span").each(function (index) {
                    if (tg_id != '')tg_id += ',';
                    if ($(this).attr("data_value")) {
                        tg_id += $(this).attr("data_value");
                    } else {
                        //alert($.trim($(this).text()));
                        tag = $('#selectedTags').val().split(",")
                        for (var i = 0; i < tag.length; i++) {
                            t = tag[i].split('|');
                            if (t[1] == $.trim($(this).text())) {
                                tg_id += t[0];
                                break;
                            }
                        }
                    }

                })
            } catch (e) {

                alert(e.name + " :  " + e.message);
            }
            $("#formTags").attr("value", str_ck(tg_id));
            //if (!confirm($("#formTags").attr("value") + " 调试信息标准格式: 1,2,3 否则请按取消")) {
            if (!confirm(" 调试信息标准格式: 1,2,3 否则请按取消")) {
                return
            }

            if ($("#officalUrl").val() != '' && $("#remark").val() == '') {
                $("#remark").attr('value', 'wait for edit');
            }

            //获取ckeditor中的嘉宾id
            var guest_ckeditor_id = $('.glyphicon-zoom-in').parent('li').find('a').attr('data-length');
            var guest_ckeditor  = $(window.parent)[0].CKEDITOR.document.getById("editAdd"+guest_ckeditor_id).getEditor();
            var guest_html = guest_ckeditor.getData();
            var id_reg = /id="(\d+)"/g;
            var id_list_exp = guest_html.match(id_reg);
            var guest_list = [];
            while(r = id_reg.exec(guest_html)){
                guest_list.push(r[1]);
                
            }
            var guest_id_str = guest_list.join(',');
            $('input[name=event_guests_id]').val(guest_id_str);

            //获取精彩回顾
            //var event_review_arr = [];
            //$('.doc-list').find('.file-display').find('img').each(function(){
            //    event_review_arr.push($(this).attr('data-file-id'));
            //});
            //var event_review_str = event_review_arr.join(',');
            //$('input[name=reviewdocsid]').val(event_review_str);


            // 价格json
            var priceArray=[];
            for(var i=0;i<$(".price_tbody tr").length;i++){
                var priceObj={};
                priceObj.price_id=$(".price_tbody tr").eq(i).attr("data-price-name");
                priceObj.price=$(".price_tbody tr").eq(i).find("td").eq(0).text();
                priceObj.property=$(".price_tbody tr").eq(i).find("td").eq(1).text();
                priceObj.end_time=$(".price_tbody tr").eq(i).find("td").eq(2).text();
                priceObj.sale=$(".price_tbody tr").eq(i).find("td").eq(3).text();
                priceObj.discount=$(".price_tbody tr").eq(i).find("td").eq(4).text();
                priceObj.original_price=$(".price_tbody tr").eq(i).find("td").eq(5).text();
                priceObj.status=$(".price_tbody tr").eq(i).find("td").eq(6).attr("data-value");
                priceObj.content=$(".price_tbody tr").eq(i).find("td").eq(7).text();
                priceObj.limit_people=$(".price_tbody tr").eq(i).find("td").eq(8).text();
                priceObj.begin_time="";
                priceArray.push(JSON.stringify(priceObj))
            }

            $("#priceArray").val("["+priceArray+"]");

            //信息来源json
            var infoArray=[];
            for(var i=0;i<$("#fromUl li").length;i++){
                var infoobj={};
                infoobj.f_class=$("#fromUl li").eq(i).find('.fromType').data('type-id');
                infoobj.type=$("#fromUl li").eq(i).find('.contactType').data('type-id');
                infoobj.website=$("#fromUl li").eq(i).find('a').attr('href');
                infoobj.content=$("#fromUl li").eq(i).find('.right').text();
                infoobj.phone=$("#fromUl li").eq(i).find('.phone').text();
                infoobj.email=$("#fromUl li").eq(i).find('.email').text();
                infoobj.contacts=$("#fromUl li").eq(i).find('.contacts').text();
                infoobj.id=$("#fromUl li").eq(i).data('id');
                infoArray.push(JSON.stringify(infoobj))
            }
            $("#infoarray").val("["+infoArray+"]");

            //场馆地址json
            var addressArray=[];
            for(var i=0;i<$("#source_address_table_body tr").length;i++){
                var addressObj={};
                addressObj.id=$("#source_address_table_body tr").eq(i).data("addr-id");
                addressObj.venue_name=$("#source_address_table_body tr").eq(i).find("td").eq(0).text();
                addressObj.venue_addr=$("#source_address_table_body tr").eq(i).find("td").eq(1).text();
                addressArray.push(JSON.stringify(addressObj))
            }
            $(".add_address").val("["+addressArray+"]");

            //主办方json

            var addsponsorArray=[];
            for(var i=0;i<$("#source_sponsor_table_body tr").length;i++){
                var addsponsorObj={};
                addsponsorObj.id=$("#source_sponsor_table_body tr").eq(i).data("sponsor-id");
                addsponsorObj.sponsor_name=$("#source_sponsor_table_body tr").eq(i).find("td").eq(0).text();
                addsponsorObj.verify=$("#source_sponsor_table_body tr").eq(i).find("td").eq(1).text();
                addsponsorObj.event_count=$("#source_sponsor_table_body tr").eq(i).find("td").eq(2).text();
                addsponsorArray.push(JSON.stringify(addsponsorObj))
            }
            $(".add_sponsor").val("["+addsponsorArray+"]");



            var data = $('#neweventtable_form').serializeArray();
            var paraJson = {};
            var paraArray = [];
            paraJson.txtlist = paraArray;
            $(".paraUl li").each(function (index) {
                var paraLength = $(".paraUl li").length;
                var id = $(this).find("a").attr("data-textId");
                var name = $(this).find("a").text();
                var ids = $(this).find("a").attr("data-length");
                    var paraph= CKEDITOR.document.getById("editAdd"+ids).getEditor().getData();
                    if($.trim(paraph)== ""){
                        paraph = " "
                    }
                    var para = {};
                    if (id) {
                        para.id = id;
                    }
                    if (paraph != '') {
                        para.tabname = name;
                        para.txt = paraph;
                        para.order = paraLength - index;
                        paraArray[index] = JSON.stringify(para);
                    }
            });
            paraJson.event_id = $("#eventId").text();
            var url = '/newevent/save_txt/';
            var that = $(this);
            var fromIdStr = $('#from_id').attr('value');
            if ($('#id_f_Class').length > 0) {
                var fromArray = [];
                $("#fromArea").find('.type').each(function () {
                    var content = $(this).find('#remark').val();
                    var index = content.indexOf('@):');
                    if (index < content.length - 3 || $(this).find('#Website').val() != '') {
                        var content = $(this).find('#remark').val();
                        var index = content.indexOf('@):');
                        var tmp = {};
                        tmp.f_class = this.className.substring(this.className.length - 1);
                        tmp.type = $(this).find('#type_f_Class').find('option:selected').attr('value');
                        tmp.Website = $(this).find('#Website').val();
                        tmp.f_content = content.substring(3 + index);
                        fromArray[fromArray.length] = tmp;
                    }

                });
                if (fromArray.length > 0) {
                    for (var j = 0; j < fromArray.length; j++) {
                        var tmp = fromArray[j];
                        $.ajax({
                            type: 'post',
                            url: '/newevent/save_from/',
                            data: {
                                'f_class': tmp.f_class,
                                'type': tmp.type,
                                'Website': tmp.Website,
                                'f_content': tmp.f_content
                            },
                            async: false,
                            success: function (data) {
                                if (data.flag) {
                                    if (fromIdStr.length > 0) {
                                        if (fromIdStr[fromIdStr.length - 1] != ',') {
                                            fromIdStr += ',';
                                        }
                                    }

                                    fromIdStr += data.id;
                                } else {
                                    sweetAlert("注意!", "由于网络原因来源信息没保存成功!", "error");
                                    return false;
                                }
                            }
                        });

                    }
                }
                /*$.post('/newevent/save_from/',queryString,function(data);*/
            }


            $("#from_id").attr('value', str_ck(fromIdStr));
            //alert($("#from_id").attr('value'))
            if ($(".paraUl li").length > 0) {
                $.ajax({
                    url: url, type: 'post', data: paraJson, error: function (XMLHttpRequest, textStatus, errorThrown) {
                        sweetAlert("注意!", "由于网络原因段落没保存成功!", "error");
                        return false;
                    }, success: function (data) {
                        var paraphId = '';
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].flag) {
                                paraphId += data[i].id + ',';
                            }
                        }
                        $("#paragraph").attr('value', paraphId.substring(0, paraphId.length - 1));
                        if ($("#select_begin_time").val() != '') {
                            var selectBeginTime = $("#select_begin_time").val();
                            if (selectBeginTime.split(' ').length > 1) {
                                $("#select_begin_time").attr('value', selectBeginTime.split(' ')[0]);
                                $("#begin_time_1").attr('value', selectBeginTime.split(' ')[1]);
                            }
                        } else {
                            $("#begin_time_1").attr('value', '');
                        }
                        if ($("#select_end_time").val() != '') {
                            var selectedEndTime = $("#select_end_time").val();
                            if (selectedEndTime.split(' ').length > 1) {
                                $("#select_end_time").attr('value', selectedEndTime.split(' ')[0]);
                                $("#end_time_1").attr('value', selectedEndTime.split(' ')[1]);
                            }
                            ;
                        } else {
                            $("#end_time_1").attr('value', '');
                        }
                        if ($("#ename").val() == 'None') {
                            $("#ename").attr('value', '');
                        }
                        $("#actionType").attr('value', that.attr('data-action-type'));
                        $("#actionType").attr('name', that.attr('data-form-name'));
                        //alert($("#from_id").attr('value'))
                        $("#neweventtable_form").submit();
                    }
                });
            } else if ($(".paraUl li").length == 0 && $($("#editEvent_add").find("iframe").get(0).contentWindow.document.body).html() != '') {
                var para = {};
                para.tabname = '活动介绍';
                para.txt = $($("#editEvent_add").find("iframe").get(0).contentWindow.document.body).html();
                para.order = 1;
                paraArray[paraArray.length] = JSON.stringify(para);
                paraJson.txtlist = paraArray;
                $.ajax({
                    url: url, type: 'post', data: paraJson, error: function (XMLHttpRequest, textStatus, errorThrown) {
                        sweetAlert("注意!", "由于网络原因段落没保存成功!", "error");
                        return false;
                    }, success: function (data) {
                        var paraphId = '';
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].flag) {
                                paraphId += data[i].id + ',';
                            }
                        }

                        $("#paragraph").attr('value', paraphId.substring(0, paraphId.length - 1));
                        if ($("#select_begin_time").val() != '') {
                            var selectBeginTime = $("#select_begin_time").val();
                            if (selectBeginTime.split(' ').length > 1) {
                                $("#select_begin_time").attr('value', selectBeginTime.split(' ')[0]);
                                $("#begin_time_1").attr('value', selectBeginTime.split(' ')[1]);
                            }
                        } else {
                            $("#begin_time_1").attr('value', '');
                        }
                        if ($("#select_end_time").val() != '') {
                            var selectedEndTime = $("#select_end_time").val();
                            if (selectedEndTime.split(' ').length > 1) {
                                $("#select_end_time").attr('value', selectedEndTime.split(' ')[0]);
                                $("#end_time_1").attr('value', selectedEndTime.split(' ')[1]);
                            }
                            ;
                        } else {
                            $("#end_time_1").attr('value', '');
                        }
                        if ($("#ename").val() == 'None') {
                            $("#ename").attr('value', '');
                        }
                        $("#actionType").attr('value', that.attr('data-action-type'));
                        $("#actionType").attr('name', that.attr('data-form-name'));
                        //alert($("#from_id").attr('value'))
                        $("#neweventtable_form").submit();
                    }
                });
            } else {
                if ($("#select_begin_time").val() != '') {
                    var selectBeginTime = $("#select_begin_time").val();
                    if (selectBeginTime.split(' ').length > 1) {
                        $("#select_begin_time").attr('value', selectBeginTime.split(' ')[0]);
                        $("#begin_time_1").attr('value', selectBeginTime.split(' ')[1]);
                    }
                } else {
                    $("#begin_time_1").attr('value', '');
                }
                if ($("#select_end_time").val() != '') {
                    var selectedEndTime = $("#select_end_time").val();
                    if (selectedEndTime.split(' ').length > 1) {
                        $("#select_end_time").attr('value', selectedEndTime.split(' ')[0]);
                        $("#end_time_1").attr('value', selectedEndTime.split(' ')[1]);
                    }
                    ;
                } else {
                    $("#end_time_1").attr('value', '');
                }
                if ($("#ename").val() == 'None') {
                    $("#ename").attr('value', '');
                }
                $("#actionType").attr('value', that.attr('data-action-type'));
                $("#actionType").attr('name', that.attr('data-form-name'));
                $("#neweventtable_form").submit();
            }
            return false;
        });
        //主办发搜索
         var lo=window.location.pathname.split("/")
        var eventId=lo[lo.length-2]
        if(eventId!="add"){
        var event_id_url="/admin/event/neweventtable/show_event_sponsor_json/";
        $.get(event_id_url,{id:eventId},function(data){
            if(data.length==0){
                $("#selectedSponsor").hide()
            }else{
                    for(var x=0;x<data.length;x++){
                        var sponsorId= $(".sponsor_list").val();
                        if (sponsorId == '') {
                            $(".sponsor_list").val(data[x].id);
                        } else {
                            $(".sponsor_list").val(sponsorId + "," + data[x].id);
                        }
                        $("<tr></tr>").attr("data-sponsor-id",data[x].id).append("<td><span class='icon-remove deleteSponsor'></span>"+data[x].name+"</td><td>"+data[x].is_verify+"</td><td>"+data[x].event_count+"</td>").appendTo("#source_sponsor_table_body")
                    }
                $(".deleteSponsor").click(deleteSponsor)
            }
        })
        }else{
            $("#selectedSponsor").hide()
        }

        $(".zbf_text").keydown(function(event){
            var e = event ? event :(window.event ? window.event : null);
            var currKey=0;
            currKey=e.keyCode||e.which||e.charCode;
                if(currKey==13){
                    $(".ss_zbf").click()
                }
            })
        $(".addSponsorText").keydown(function(event){
            var e = event ? event :(window.event ? window.event : null);
            var currKey=0;
            currKey=e.keyCode||e.which||e.charCode;
            if(currKey==13){
                $(".addSponsorBtn").click()
            }
        });
        $(".ss_zbf").click(function(){
            var tx=$(".zbf_text").val();
            var urls="/admin/event/neweventtable/search_sponsor_json/?keywords="+tx;
            $("#sponsor_table_body tr").remove();
            var alreadyId = $(".sponsor_list").attr("value");
            $.get(urls,function(data){
                $("#searcSponsorResult").show();
                $("#selectedSponsor").hide()
                for(var x=0;x<data.length;x++){
                    if(alreadyId.indexOf(data[x].id)!=-1){
                        $("<tr></tr>").attr("data-sponsor-id",data[x].id).addClass("selected").append("<td>"+data[x].name+"</td><td>"+data[x].is_verify+"</td><td>"+data[x].event_count+"</td>").appendTo("#sponsor_table_body")
                    }else{
                        $("<tr></tr>").attr("data-sponsor-id",data[x].id).append("<td>"+data[x].name+"</td><td>"+data[x].is_verify+"</td><td>"+data[x].event_count+"</td>").appendTo("#sponsor_table_body")
                    }
                }
            })
        });
        //场馆添加
        $("#add_address").on('click', function(){
            var fillVenue=$.trim($("#fillVenue").val());
            var house_address=$.trim($("#house_address").val());
            var discity =$("#districtId-edit").find("option:selected").text();
            $('#selectedAddress').show();
            if(house_address==""){
                swal("请输入场馆地址");
                return false
            }else{
                $("#selectedAddress").css("opacity", 1);
                $("#selected_address_table").append("<tr data-addr-id='newaddr'>" +
                "<td><span class='icon-remove deleteAddress' data-addr-id='newaddr'></span>"+fillVenue+"</td>" +
                "<td>"+house_address+"</td>" +
                "<td>"+discity+"</td><td><span class='glyphicon glyphicon-edit edit_Address'></span></td></tr>");
                $("#fillVenue").val("");
                $("#house_address").val("");
            }
        });
        //场馆操作
        $("#selected_address_table").on('click', '.edit_Address', function(event) {
            var thisTd = $(this).parents("tr").find('td');
            var thisTh = $(this).parents("tr").find('th');
            for (var i = thisTd.length - 3; i >= 0; i--) {
                thisTd.eq(i).html("<input type='text' value='"+$.trim(thisTd.eq(i).text())+"' />")
            };
             thisTd.eq(thisTd.length - 1).html("<span class='glyphicon glyphicon-ok-circle ok_address'></span>")
        });
        $("#selected_address_table").on('click', '.ok_address', function(event) {
            var thisTd = $(this).parents("tr").find('td');
            for (var i = thisTd.length - 3; i >= 0; i--) {
                if (i==0) {
                           thisTd.eq(i).html('<span class="icon-remove deleteAddress" ></span>'+$.trim(thisTd.eq(i).find('input').val()))
                }else{
                            thisTd.eq(i).html(thisTd.eq(i).find('input').val())
                }
            };
            thisTd.eq(thisTd.length - 1).html("<span class='glyphicon glyphicon-edit edit_Address'></span>")
        });
        $("#selected_address_table").on('click', '.deleteAddress', function(event) {
            $(this).parent().parent().remove();
        });
        $("#sponsor_table_body").click(function(){
            var event = window.event || arguments.callee.caller.arguments[0];
            var $this=$(event.target).parent();
            var selectedsponsorId=$this.attr("data-sponsor-id")
            var alreadyId = $(".sponsor_list").attr("value");
            if(selectedsponsorId!=undefined){
            $("#source_sponsor_table_body").append("<tr data-sponsor-id='"+selectedsponsorId+"'><td><span class='icon-remove deleteSponsor'></span>"+$this.find("td").eq(0).text()+"</td><td>"+$this.find("td").eq(1).text()+"</td><td>"+$this.find("td").eq(2).text()+"</td></tr>")
            if (alreadyId.indexOf(selectedsponsorId) == -1) {
                if (alreadyId == '') {
                    $(".sponsor_list").attr('value', selectedsponsorId).val(selectedsponsorId);
                } else {
                    $(".sponsor_list").attr('value', alreadyId + "," + selectedsponsorId).val(alreadyId + "," + selectedsponsorId);
                }
            } else {
                $("#source_sponsor_table_body").find('tr[data-sponsor-id=' + selectedsponsorId + ']').remove();
                if ($("#source_sponsor_table_body").find('tr').length == 0) {
                    $("#selectedSponsor").hide();
                }
                var readyAdds = $(".sponsor_list").attr("value");
                readyAdds = myReplaceStr(selectedsponsorId, readyAdds, '');
                $(".sponsor_list").attr("value", readyAdds).val(readyAdds);
            }
            }
            if($this.hasClass("selected")){
                $this.removeClass("selected")
            }else{
                $this.addClass("selected")
            }
        })
        $('#sponsorClose').click(function () {
            $('#searcSponsorResult').hide();
            if ($('#source_sponsor_table_body tr').length > 0) {
                $('#selectedSponsor').show();
                $("#selectedSponsor").css({'opacity': 1});
            }
            $(".deleteSponsor").click(deleteSponsor)
        });
        function deleteSponsor(){
           var _thisId=$(this).parent().parent().attr("data-sponsor-id");
           var sponsor_list=$(".sponsor_list").val();
            sponsor_list = myReplaceStr(_thisId, sponsor_list, "");
            $(".sponsor_list").val(sponsor_list);
            $(this).parent().parent().remove();
        }
        //主办方添加
        $(".addSponsorBtn").click(function(){
            var newsp = 'newsp_' + Date.parse(new Date())/1000;
            var sponsorName=$(".addSponsorText").val();
            $('#selectedSponsor').show();
            var nameArr=sponsorName.replace(/，/g, ",").split(",");
            if(sponsorName==""){
                swal("请输入主办方名称");
                return false
            }else{
                for(var q=0;q<nameArr.length;q++){
                    if(nameArr[q]){
                        $("#source_sponsor_table_body").append("<tr data-sponsor-id='"+newsp+"' data-sponsor-name='"+nameArr[q]+"'><td><span class='icon-remove deleteNewSponsor'></span>"+nameArr[q]+"</td><td>false</td><td>0</td></tr>")
                    }

                }
                $(".deleteNewSponsor").click(deleteNewSponsor)
                $(".addSponsorText").val("")
            }
        });
        function deleteNewSponsor(){
            $(this).parent().parent().remove();
            var _thisName=$(this).parent().parent().attr("data-sponsor-name");
            var sponsor_list=$(".addSponsor").val()
            sponsor_list = myReplaceStr(_thisName, sponsor_list, "");
            $(".addSponsor").val(sponsor_list)
        }
        function str_ck(fromIdStr) {
            //arr_from=fromIdStr.replace(/[ ]/g,"").split(",")
            arr_from = fromIdStr.split(",")
            new_arr = new Array();
            for (var i = 0; i < arr_from.length; i++) {
                try {
                    if (!isNaN(arr_from[i])) {
                        if (arr_from[i] > 0) {
                            new_arr.push(arr_from[i]);
                        }
                    }
                }
                catch (e) {

                    alert(e.name + " :  " + e.message);
                }
            }
            return new_arr.join(",")

        }
        $("ul#retrunId").on('click','a.setMainImag', function () {
            var ImgId=$("#selectedMainImg");
            if($(this).attr("data-click")=="true"){
                if(ImgId.val().length==0){
                    ImgId.val($(this).parent().find("img").attr("data-img-id"))
                }else{
                    if(ImgId.val().indexOf($(this).parent().find("img").attr("data-img-id"))==-1){
                        ImgId.val(ImgId.val()+","+$(this).parent().find("img").attr("data-img-id"))
                    }
                }
                $(this).text("取消设置").attr("data-click","false")
            }else{
                var cancelImgId=$("#selectedMainImg").val();
                var _thisName=$(this).parent().find("img").attr("data-img-id")
                cancelImgId = myReplaceStr(_thisName, cancelImgId, "");
                $("#selectedMainImg").val(cancelImgId);
                $(this).attr("data-click","true").text("设置为主图")
            }
        })
        $("ul#retrunId").on('click','span.removePic', function () {
            $(this).parent("div").parent("li").remove();
            if($("#selectedMainImg").val().indexOf($(this).parent().find("img").attr("data-img-id"))!=-1){
                var cancelImgId=$("#selectedMainImg").val();
                var _thisName=$(this).parent().find("img").attr("data-img-id")
                cancelImgId = myReplaceStr(_thisName, cancelImgId, "");
                $("#selectedMainImg").val(cancelImgId);
            }
        })
    })(window)
});
$(function(event){
    var lo=window.location.pathname.split("/");
    var eventId=lo[lo.length-2];
    if(eventId=="add"){
        eventId="";
    }
    var tagArray=[];
    var tagHtml="";
    $.get("/admin/event/neweventtable/show_event_cat_json/",{id:eventId},function(data){
        tagArray=data;
            for(var i=0;i<data.length;i++){
                var n=-1;
                for(var p=0;p<tagArray[i].children.length;p++){
                    if(tagArray[i].children[p].selected){
                        n=i;
                    }
                }
                if(n!=-1){
                    tagHtml+="<li data-click='true' data-index='"+i+"'><a class='bgcolor' data-tag-id='"+data[i].id+"'>"+data[i].name+"</a></li>"
                }else{
                    tagHtml+="<li data-click='false' data-index='"+i+"'><a data-tag-id='"+data[i].id+"'>"+data[i].name+"</a></li>"
                }
            }
        $(".slist_bg").append(tagHtml).find("li").on("click",one)
        if($(".slist_bg li[data-click=true]").length==0){
            $(".slist_bg li").eq(1).click();
        }else{
            $(".slist_bg li[data-click=true]").click()
        }
    })

    function one(){
        var data_id=$(this).find("a").attr("data-tag-id");
        var tag_index=$(this).attr("data-index")
        $(".slist_class").find("li").remove()
        var oneHtml="";
        oneHtml+="<li data-click='false'><a data-tag-id='"+data_id+"'>all</a></li>"
                var tag2=tagArray[tag_index].children;
                for(var x=0;x<tag2.length;x++){
                    if(tag2[x].selected){
                        oneHtml+="<li data-click='true'><a class='bgcolor' data-tag-id='"+tag2[x].id+"'>"+tag2[x].name+"</a></li>"
                    }else{
                        oneHtml+="<li data-click='false'><a data-tag-id='"+tag2[x].id+"'>"+tag2[x].name+"</a></li>"
                    }
                }
        $(".slist_class").append(oneHtml).find("li").on('click',two)
        $(this).attr("data-click","true").find("a").addClass("bgcolor").parent().siblings().attr("data-click",false).find("a").removeClass("bgcolor");
        if($(".slist_class li[data-click=true]").length==0){
            $(".slist_class li[data-click=false]").eq(0).attr("data-click","true").click().find("a").addClass("bgcolor");
        }else{
            $(".slist_class li[data-click=true]").eq(0).click()
        }
    }
    function two(){
        var tag2_id=$(this).find("a").attr("data-tag-id");
        $("#cat").val($(this).find("a").attr("data-tag-id"));
        if(tag2_id!=undefined){
        var tag2_url="/admin/event/neweventtable/show_tag_by_cat_json/";
        $(this).attr("data-click","true").find("a").addClass("bgcolor").parent().siblings().attr("data-click",false).find("a").removeClass("bgcolor");
        $.get(tag2_url,{id:tag2_id},function(data){
            try {
                var childTagArray = data[0].tag;
                var tagHtml = "";
                tagHtml += '<ul class="list-inline" id="tagUl">';
                for (var i = 0; i < childTagArray.length; i++) {
                    var childTag = childTagArray[i];
                    tagHtml += '<li><a style="cursor:pointer;"  onclick="clickCat()" value="' + childTag.id + '">' + childTag.name + '</a></li>';
                }
                tagHtml += '</ul>';
                $("#childCatArea").html(tagHtml);
            }
            catch (e) {
                alert(e.name + " :  " + e.message);
            }
        })
    }
    }


//模板选中样式
var model = $(".model-pic>a")
    if($(".model-pic").attr("data-event")=="event_tp1"){
        for(var i=0;i<model.length;i++){
            if(model.eq(i).attr("data-value")==$(".model-pic").attr("data-event")){
                model.eq(i).attr("data-checked","true").find("span").css({visibility: "visible"});
                $(".model-input").val(model.eq(i).attr("data-value"));
            }
        }
    }else{
        model.eq(model.length-1).attr("data-checked","true").find("span").css({visibility: "visible"});
        $(".model-input").val(model.eq(model.length-1).attr("data-value"));
    }
model.click(function(){
    model.attr("data-checked","false").find("span").css({visibility: "hidden"});
    $(this).attr("data-checked","true").find("span").css({visibility: "visible"});
    $(".model-input").val($(this).attr("data-value"));
});


//价格管理
//事件绑定
$(".price_table").on('click','.edit_price',edit_price);
$(".price_table").on('click','.removePrice',removePrice);
$(".price_table").on('click','.ok_gly',ok_price);
$(".price_table").on('click','.no_gly',no_price);
$(".price_table").show();

//get price info from neweventpriceunit
$.get(
    "/admin/event/neweventtable/show_price_json/",
    {id:eventId}
    ,function(data){
        if(data.length==0){
            $(".price_table").hide()
        }else{
        for(var i=0;i<data.length;i++){
            if(!data[i].limit_people){
                data[i].limit_people=''
            }
            var original_price = data[i].original_price; 
            if(data[i].original_price==null){
                console.log(1111);
                original_price = ""; 
            }
            $(".price_tbody").append("<tr data-price-unit-id='"+data[i].id+"' data-price-name='"+data[i].id+"'>" +
            "<td>"+data[i].price+"</td>" +
            "<td>"+data[i].property+"</td>" +
            "<td style='font-size:10px;'>"+data[i].end_time+"</td>" +
            "<td>"+data[i].sale+"</td>" +
            "<td>"+data[i].discount+"</td>" +
            "<td>"+original_price+"</td>" +
            "<td data-value='"+data[i].status +"'>"+data[i].status +"</td>" +
            "<td style=''><div title='"+data[i].content  +"' style='max-height: 85px;overflow: hidden'>"+data[i].content  +"</div></td>" +
            "<td style=''>"+data[i].limit_people  +"</td>" +
            "<td><span class='glyphicon glyphicon-edit edit_price'></span><span class='glyphicon glyphicon-remove-circle removePrice'></span></td></tr>");

            if(data[i].status == "1"){
                $(".price_tbody").find("tr").eq(i).find("td").eq(6).text("有效")
            }
            else{
                $(".price_tbody").find("tr").eq(i).find("td").eq(6).text("无效")
            }
        }
        }
    });
//时间判断
    var newPariceId=0;
    Date.prototype.addDays = function(days){
    this.setDate(this.getDate() + days);
    while(!IsValidDate(this.getFullYear(),this.getMonth(),this.getDate())){
    this.setDate(this.getDate() + days);
}
return this;
}
function IsValidYear(psYear){
    var sYear = new String(psYear);
    if(psYear==null){return false;}
    if(isNaN(psYear)==true){return false;}
    if(sYear == ""){return true;}
    if(sYear.match(/[^0-9]/g)!=null){return false;}
    var nYear = parseInt(sYear, 10);
    if((nYear < 0) || (9999 < nYear)){return false;}
    return true;}
function IsValidMonth(psMonth){
    var sMonth = new String(psMonth);
    if(psMonth==null){return false;}
    if(isNaN(psMonth)==true){return false;}
    if(sMonth == ""){return true;}
    if(sMonth.match(/[^0-9]/g)!=null){return false;}
    var nMonth = parseInt(sMonth,10);
    if((nMonth < 0) || (12 < nMonth)){return false;}
    return true;}

function IsValidDay(psDay){
    var sDay  = new String(psDay);
    if(psDay==null){return false;}
    if(isNaN(psDay)==true){return false;}
    if(sDay == ""){return true;}
    if(sDay.match(/[^0-9]/g)!=null){return false;}
    var nDay = parseInt(psDay, 10);
    if((nDay < 0) || (31 < nDay)){return false;}
    return true;}

function getthedate(a, dadd){
    //可以加上错误处理
    //var a = new Date(dd)
    a = a.valueOf()
    a = a + dadd * 24 * 60 * 60 * 1000
    a = new Date(a);
    var m = a.getMonth() + 1;
    if(m.toString().length == 1){
        m='0'+m;
    }
    var d = a.getDate();
    if(d.toString().length == 1){
        d='0'+d;
    }
    return a.getFullYear() + "-" + m + "-" + d;
}
function IsValidDate(psYear, psMonth, psDay){
    if(psYear==null || psMonth==null || psDay==null){return false;}
    var sYear  = new String(psYear);
    var sMonth = new String(psMonth);
    var sDay   = new String(psDay);
    if(IsValidYear(sYear)==false){return false;}
    if(IsValidMonth(sMonth)==false){return false;}
    if(IsValidDay(sDay)==false){return false;}
    var nYear  = parseInt(sYear,  10);
    var nMonth = parseInt(sMonth, 10);
    var nDay   = parseInt(sDay,   10);
    if(sYear=="" &&  sMonth=="" && sDay==""){return true;}
    if(sYear=="" || sMonth=="" || sDay==""){return false;}
    if(nMonth < 1 || 12 < nMonth){return false;}
    if(nDay < 1 || 31 < nDay){return false;}
    if(nMonth == 2){if((nYear % 400 == 0) || (nYear % 4 == 0) && (nYear % 100 != 0)){if((nDay < 1) || (nDay > 29)){return false;}}else{if((nDay < 1) || (nDay > 28)){return false;}}}
    else if((nMonth == 1)  ||(nMonth == 3)  ||(nMonth == 5)  ||(nMonth == 7)  ||(nMonth == 8)  ||(nMonth == 10) ||(nMonth == 12)){if((nDay < 1) || (31 < nDay)){return false;}}else{if((nDay < 1) || (30 < nDay)){return false;}}return true;}
    //end

    //add price start
    $(".price_but").css({backgroundColor:"#d9534f", color:"white"});

    $(".price_but").on('click',function(){
        var newPrice=$("#pr_str").val().split("/");
        var timeA=''
        if($("#stateTime:checked").length!=0&&$("#select_begin_time").val().length==0&&$("#select_end_time").val().length==0){
            var logDate=new Date();
            var logTime=logDate-(-1000*60*60*24*365*50)
            var times=new Date(logTime)
        }else if($("#select_begin_time").val().length==0&&$("#select_end_time").val().length==0){
            swal("请选择活动时间")
            return false
        }else if($("#select_begin_time").val().length==0&&$("#select_end_time").val().length!=0){
            var temp= $("#select_end_time").val().split("-");

            var temp1=temp[2].split(" ");
            var temp2=temp1[1].split(":");
            var timeA=[];
            timeA.push(temp[0],temp[1],temp1[0],temp2[0],temp2[1],temp2[2])
        }else if($("#select_begin_time").val().length!=0&&$("#select_end_time").val().length==0){
            var temp= $("#select_begin_time").val().split("-");
            var temp1=temp[2].split(" ");
            var temp2=temp1[1].split(":");
            var timeA=[];
            timeA.push(temp[0],temp[1],temp1[0],temp2[0],temp2[1],temp2[2])
        }else{
            var temp= $("#select_begin_time").val().split("-");

            var temp1=temp[2].split(" ");
            var temp2=temp1[1].split(":");
            var timeA=[];
            timeA.push(temp[0],temp[1],temp1[0],temp2[0],temp2[1],temp2[2])
            console.log(timeA)
        }
        if(times == undefined){
            var times = new Date(timeA[0],timeA[1]-1,timeA[2],timeA[3],timeA[4],timeA[5]);
        }
        timess = getthedate(times, -1)
        //timess += " " + times.getHours() + ":" + times.getMinutes() + ":" + times.getSeconds();
        timess += " 00:00:00"
        //times = times.addDays(-1)
        //var timess = times.getFullYear()+"-"+(times.getMonth()-(-1))+"-"+times.getDate()+" "+times.getHours()+":"+times.getMinutes()+":"+times.getSeconds();
        if($("#pr_str").val()==""){
            swal("请输入价格");
            return false
        }else{
            for(var i=0;i<newPrice.length;i++){
				if ( newPrice[i] ) {
                	$(".price_tbody").append("<tr data-price-unit-id=0 data-price-name='' data-newParice='"+(newPariceId++)+"'>" +
                	"<td>"+newPrice[i]+"</td>" +
                    "<td>会务费</td>" +
                	"<td style='font-size: 12px;'>"+timess+"</td>" +
                	"<td></td>" +
                	"<td></td>" +
                	"<td></td>" +
                	"<td data-value='1'>有效</td>" +
                	"<td style=''></td>"+
                    "<td data-value='1'></td>" +
                	"<td><span class='glyphicon glyphicon-edit edit_price'></span><span class='glyphicon glyphicon-remove-circle removePrice'></span></td></tr>");
				};
            }
            $(".price_table").show();
            $("#pr_str").val("");
        }
    });

    function removePrice(){
        $(this).parent().parent().fadeOut(function(){$(this).remove()
            if($(".del_price_id").val().length==0){
                $(".del_price_id").val($(this).attr("data-price-name"))
            }else{
                $(".del_price_id").val($(".del_price_id").val()+","+$(this).attr("data-price-name"))
            }
        })
    }

    $("#price_close").click(function(){
        $(".price_table").css({display:"none"});
        $(".price_tbody").html("");
    });

    var pirce_temp =[];
    //edit the price

    function edit_price(){

        var price_tr = $(this).parent().parent();
        for(var i=0;i<price_tr.find("td").length;i++){
            pirce_temp.push(price_tr.find("td").eq(i).text());
             if(i==2){
                var time = 'WdatePicker({dateFmt:"yyyy-MM-dd 00:00:00"})';
                var str = "<input type='text' class='Wdate end_time'  id='select_end_time' onClick='"+time+"' name='end_time'  value='"+price_tr.find("td").eq(2).text()+"' style='height:30px !important'>";
                //price_tr.find("td").eq(2).html("<input type='text' class='Wdate end_time'  id='select_end_time' onClick='' name='end_time'  value='"+price_tr.find("td").eq(2).text()+"' style='height:30px !important'>");
                price_tr.find("td").eq(2).html(str);
            }else if(i==6){
                if(price_tr.find("td").eq(6).attr("data-value")==1){
                    price_tr.find("td").eq(6).html("<select><option value='1' selected>有效</option><option value='0'>无效</option></select>")
                }else{
                    price_tr.find("td").eq(6).html("<select><option value='1' >有效</option><option value='0' selected>无效</option></select>")
                }
            }
            else if(i==price_tr.find("td").length-1){
                price_tr.find("td").eq(i).html("<span class='glyphicon glyphicon-ok-circle price_gly ok_gly'></span>"+"<span class='glyphicon glyphicon-remove-circle price_gly no_gly'></span>");
            }else{
                price_tr.find("td").eq(i).html("<input type='text' value='"+price_tr.find("td").eq(i).text()+"'>");
            }
        }

    }
    //save the price
    function ok_price(){
        var price_tr = $(this).parent().parent();
        for(var i=0;i<price_tr.find("td").length;i++){
            pirce_temp.push(price_tr.find("td").eq(i).text());
            if(i==2){
                price_tr.find("td").eq(2).html(price_tr.find("td").eq(2).find("input").val());
            }else if(i==6){
                price_tr.find("td").eq(6).attr("data-value",price_tr.find("td").eq(6).find("select").val()).html(price_tr.find("td").eq(6).find("option:selected").text());
            }
            else if(i==price_tr.find("td").length-1){
                price_tr.find("td").eq(i).html("<span class='glyphicon glyphicon-edit edit_price'></span><span class='glyphicon glyphicon-remove-circle removePrice'></span>");
            }else{
                price_tr.find("td").eq(i).html(price_tr.find("td").eq(i).find("input").val());
            }
        }
    }

    function no_price(){
        var price_temp = $(this).parent().parent();
        for(var e=0;e<pirce_temp.length;e++){
            if(e==pirce_temp.length-1){
                price_temp.find("td").eq(8).html("<span class='glyphicon glyphicon-edit edit_price'></span><span class='glyphicon glyphicon-remove-circle removePrice'></span>")
            }
            else{
                price_temp.find("td").eq(e).html(pirce_temp[e]);
            }
        }
    }

    $(".imgSearch").click(function () {
        window.open($(this).attr("href"),'newwindow','height=600,width=1000,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no')
        return false;
    });

    // 点击编辑往届会议文档资料
    // author:moubo time:12/19  14:23
    $(".docsearch").click(function () {
        window.open($(this).attr("href"),'newwindow','height=600,width=1000,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no')
        return false;
    });
});

    
