$(function(){
	(function(window){
		$(".tagsinput").tagsInput();
		$(parent.document.getElementById("pageLoader")).hide();
	$(".form_datetime").datetimepicker({
        format: "yyyy-mm-dd",
        showMeridian: true,
        autoclose: true,
        todayBtn: true
    });
	function selectImgEvent() {
		var dataImgId = $(event.target).attr("data-img-id");
		var dataImgUrl = $(event.target).attr("data-img-url");
		if($("#selectedMainImg").attr("data-img-id").length>0) {
			var selectedImgIdArray = $("#selectedMainImg").attr("data-img-id").split(",");
			var flag = true;
			var srcImg = $("#selectedMainImg").attr("value");
			for(var i=0;i<selectedImgIdArray.length;i++) {
				if(selectedImgIdArray[i] ==  dataImgId) {
					flag = false;
					break;
				}
			}
			if(flag) {
				$("#selectedMainImg").attr("value",srcImg+"@"+dataImgUrl);
				$("#selectedMainImg").attr("data-img-id",$("#selectedMainImg").attr("data-img-id")+","+dataImgId);
			} else {
				$("#selectedMainImg").attr("value",srcImg.replace("@"+dataImgUrl,""));
				var tmpArray = [];
				for(var i=0,j=0;i<selectedImgIdArray.length;i++) {
					if(selectedImgIdArray[i] != dataImgId ) {
						tmpArray[j++] = selectedImgIdArray[i];
					}
				}
				$("#selectedMainImg").attr("data-img-id",tmpArray.join(","));
			}
		} else {
			$("#selectedMainImg").attr("data-img-id",dataImgId);
			$("#selectedMainImg").attr("value","@"+dataImgUrl);
		}
	}
	CKEDITOR.replace( 'editEvent' );
	$("div#formArea").dropzone({url:"/newevent/save_img/",paramName:"img",success:function(data){
		var responseObject = JSON.parse(data.xhr.responseText);
		$(data.previewElement).find(".dz-size").after($("<div></div>").text(responseObject.url).data("data-img-id",responseObject.id).addClass("dz-url"));
		$(data.previewElement).find(".dz-upload").css("backgroundImage","none");
		$(data.previewElement).find(".dz-details").append($("<input type='checkbox'>").attr("data-img-url",responseObject.url).attr("data-img-id",responseObject.id).css({position:"absolute",right:"-3px"}).bind('click',selectImgEvent));
	}});
	if($("#s_id_Type").length>0) {
		$("#s_id_Type").change(clickSelectPrice);
		$("#s_id_Type").change();
	}

	function clickSelectPrice() {
		var selectType = $(this).val();
		$(".priceModal").hide();
		if(selectType == 1 || selectType == 3 || selectType == 6) {
			$(".priceModal"+selectType).show();
			$(".priceModal6").show();
		}
		if(selectType == 2) {
			$(".priceModal6").show();
		}
	}
	function clickCat() {
		var selectedCatId = $(event.target).attr("value");
		var selectedCatName = $(event.target).html();
		if (!$('.tagsinput').tagExist(selectedCatName)) {
			$(".tagsinput").addTag(selectedCatName);
			$("#selectedTags").attr("value",$("#selectedTags").attr('value')+selectedCatId+"|"+selectedCatName+",");
		}
		return false;
	}
	window.clickCat = clickCat;
	if($("#districtPid-edit").length>0) {
		$.get('http://127.0.0.1:8000/newevent/show_city_json/',{type:'json'},function(data){
			var defaultCityId = $("#selectedCityId").val();
			var flag = false;
			var optionParentHtml = "";
			var optionChildHtml = "";
			var attrHtml = "";
			for(var i=0;i<data.length;i++) {
				var cityParentObj = data[i];
				var cityChildObj = cityParentObj.child;
				for(var j=0;j<cityChildObj.length;j++) {
					var childObj = cityChildObj[j];
					attrHtml += childObj.id+"|"+childObj.district_name+",";
					if(childObj.district_id == defaultCityId) {
						flag = true;
					}
				}
				attrHtml = attrHtml.substring(0,attrHtml.length-1);
				if(flag) {
				  optionParentHtml+="<option selected='selected' data-city="+attrHtml+" value='"+cityParentObj.district_id+"'>"+cityParentObj.district_name+"</option>";
				} else {
				  optionParentHtml+="<option data-city="+attrHtml+" value='"+cityParentObj.district_id+"'>"+cityParentObj.district_name+"</option>";
				}
				attrHtml = "";
				flag = false;
			}
			$("#districtPid-edit").html(optionParentHtml);
			$("#districtPid-edit").change();
		})
		$("#districtPid-edit").change(function(){
			var selectedCityArray = $(this).find("option:selected").attr("data-city").split(",");
			var selectChildHtml = "";
			for(var i=0;i<selectedCityArray.length;i++) {
				var cityChild = selectedCityArray[i];
				selectChildHtml += '<option value="'+cityChild.split("|")[0]+'">'+cityChild.split("|")[1]+"</option>";
			}
			$("#districtId-edit").html(selectChildHtml);
		})
	}
	if($("#id_cat").length>0) {
		$("#id_cat").click(function(event){
			var selectedValue = $(event.target).val();
			$.get('/newevent/get_json_cat/'+selectedValue+'/?_=1411541284292',function(data){
				var title = data[0].name;
				var childTagArray = data[0].tag;
				var tagHtml = "";
				tagHtml += '<h4>' + title +'</h4><ul class="list-inline" id="tagUl">';
				for(var i=0;i<childTagArray.length;i++) {
					var childTag = childTagArray[i];
					tagHtml += '<li><a href="#" onclick="clickCat()" value="'+childTag.id+'">'+ childTag.name + '</a></li>'; 
				}
				tagHtml += '</ul>';
				$("#childCatArea").html(tagHtml);
			});
		});
	
	}
	if($(".tagsinput-add-container").length>0) {
		$(".tagsinput-add-container input").on('blur',function(){
			var tagName = $.trim($(".tagsinput-add-container").parent().find("span:last").text());
			var parentCatId = $("#id_cat").find('option:selected').val();
			var flag = true;
			$("#tagUl li a").each(function(){
				if($(this).text() == tagName) {
					flag = false;
				}
			})
			if(tagName !="" && flag )
			$.post('/newevent/save_tag/',{tag:tagName,ct:parentCatId},function(data){
				var a;
			})
		});
	}
	function searchAddress() {
		window.selectAddress = function() {
			var selectedAddressId = $(event.target).parent("tr").find("td").eq(0).text();
			var selectedAddressName = $(event.target).parent("tr").find("td").eq(1).text();
			var addressCityName = $(event.target).parent("tr").find('td').eq(2).text();
			var htmlTemp = "<tr><td><span class='glyphicon glyphicon-remove deleteAddress'></span>"+"<td>"+selectedAddressId+"</td>"+"<td>"+selectedAddressName+"</td>"+"<td>"+addressCityName+"</td>";
			var alreadyId = $("#selectedVenueId").attr("value");
			if(alreadyId.indexOf(selectedAddressId) ==-1 ) {
				$("#source_address_table_body").append($(htmlTemp));
				$("#selectedVenueId").attr('value',alreadyId+selectedAddressId);
			}
		}
		if($("#search-address").length>0) {
			$("#search-address").change(function(){
			var address = $(this).val();
			var urlPath = "/newevent/get_json_addr_str/"+address+"/?_=1411610829905";
			$.get(urlPath,function(data){
					var tbodyHtml = "";
					for(var i=0;i<data.length;i++) {
						tbodyHtml += "<tr onclick='selectAddress()''>"
						var addressObject = data[i];
						tbodyHtml += "<td>"+addressObject.id+"</td>"+"<td>"+addressObject.name+"</td>"+"<td>"+addressObject.city+"</td></tr>";
					}
					$("#address_table_body").html(tbodyHtml);
				});
			})
		}
		$(".deleteAddress").on('click',function(){
				var addressId = $(this).parent("td").text();
				var readyAdds = $("#selectedVenueId").attr("value");
				readyAdds = readyAdds.replace(addressId+",","");
				$("#selectedVenueId").attr("value",readyAdds).val(readyAdds);
				$(this).parents("tr").remove();
			});
	}
	function searchSeo() {
		window.selectSeo = function() {
			var selectedSeoId = $(event.target).parent("tr").attr("data-id");
			var selecteTitle = $(event.target).parent("tr").find("td").eq(0).text();
			var selecteKeywords = $(event.target).parent("tr").find("td").eq(1).text();
			var selecteDescription = $(event.target).parent("tr").find("td").eq(2).text();
			$("#selectedSeo").val(selectedSeoId);
			$("#seo_table_body").find("td[name=title]").text(selecteTitle);
			$("#seo_table_body").find("td[name=keywords]").text(selecteKeywords);
			$("#seo_table_body").find("td[name=description]").text(selecteDescription);
		}
		if($("#search-seo").length>0) {
			$("#search-seo").change(function(){
				var seo = $(this).val();
				var urlPath = "/find_seo_json/10/"+seo+"/";
				$.get(urlPath,function(data){
					var tbodyHtml = "";
					for(var i=0;i<data.length;i++) {
						var seoObject = data[i];
						tbodyHtml += "<tr onclick='selectSeo()'' data-id='"+seoObject.id+"'>";
						tbodyHtml += "<td>"+seoObject.title+"</td>"+"<td>"+seoObject.keywords+"</td>"+"<td>"+seoObject.description+"</td></tr>";
					}
					$("#search_seo_table_body").html(tbodyHtml);
				});
			});
		}
	}
	searchAddress();
	searchSeo();
	if($("#seoForm").length>0) {
		$("#seoForm").submit(function(){
			var name = $("#seoName").val();
			var title = $("#seoTitle").val();
			var keywords = $("#seoKeywords").val();
			var description = $("#seoDescription").val();
			$.post("/save_seo/",{
				name:name,
				title:title,
				keywords:keywords,
				description:description
			},function(data){
				$("#seo_table_body").find("td[name='title']").text(data.title);
				$("#seo_table_body").find("td[name='description']").text(data.description);
				$("#seo_table_body").find("td[name='keywords']").text(data.keywords);
				$("#selectedSeo").val(data.id);
				$('.seo-modal-panel').modal('hide');
			})
			return false;
		})
	}
	$("#save").click(function(){
		var selectedCatIdStr = "";
		var catMapAry = $("#selectedTags").attr("value").split(",");
		var selectTags = $("#selectedCatArea").find(".tag>span");
		for(var i=0;i<selectTags.length;i++) {
			var tagText = $.trim(selectTags.eq(i).text());
			for(var j=0;j<catMapAry.length;j++) {
				if(tagText == $.trim(catMapAry[j].split("|")[1])) {
					selectedCatIdStr += $.trim(catMapAry[j].split("|")[0])+",";
					break;
				}
			}
		}
		$("#formTags").attr("value",selectedCatIdStr);
		var queryString = $('#neweventtable_form').formSerialize();
		$("#neweventtable_form").ajaxSubmit();
		return false;
	});
	})(window)
})