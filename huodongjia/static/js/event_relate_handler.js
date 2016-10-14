//保存按键事件
$(function(){
    var save_price_flag = false;
    var save_addr_flag = false;
    var save_sponsor_flag = false;
    var save_par_flag = false;
    var save_tag_flag = false;
    var save_frominfo_flag = false;
    var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
    function save(obj)
    {
        $.ajaxSetup({
            async : false
        });
        //$('input[name=_continue]').val($(this).attr('data-continue-value'));
        $('input[name=isshow]').val($(obj).attr('data-status-value'));
        //组装价格信息price_unit
        var price_unit_arr = [];
        $('.price_tbody').find('tr').each(function (index) {
            var price = {};
            console.log(1111111)
            price.id = $(this).attr('data-price-unit-id');
            price.price = $(this).find('td').eq(0).text();
            price.property = $(this).find('td').eq(1).text();
            price.end_time = $(this).find('td').eq(2).text();
            price.original_price = $(this).find('td').eq(5).text();
            price.status = $(this).find('td').eq(6).attr('data-value');
            price.content = $(this).find('td').eq(7).text();
            price.limit_people = $(this).find('td').eq(8).text();
            price_unit_arr.push(price);
        });
        console.log(price_unit_arr);
        $('#price_unit_list_json').val(JSON.stringify(price_unit_arr));
        //保存价格信息
        $.post('/admin/event/neweventtable/save_price_unit_json/',
            {price_unit_list_json: JSON.stringify(price_unit_arr), csrfmiddlewaretoken: csrf.value},
            function (data) {
                //$('#mask').show();
                console.log(data);
                if (data.flag) {
                    $('#price_unit').val(data.data.join(','));
                    save_price_flag = true;
                } else {
                    sweetAlert(data.msg);
                }
            });


        //组装主办方信息sponsor
        var sponsor_arr = [];
        $('#selectedSponsor').find('#source_sponsor_table_body').find('tr').each(function (index) {
            var sponsor = {};
            sponsor.id = $(this).attr('data-sponsor-id');
            sponsor.name = $(this).find('td').eq(0).text();
            sponsor_arr.push(sponsor);
        });
        $('#sponsor_list_json').val(JSON.stringify(sponsor_arr));
        //保存主办方
        //var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
        $.post('/admin/event/neweventtable/save_sponsor_json/',
            {sponsor_list_json: JSON.stringify(sponsor_arr), csrfmiddlewaretoken: csrf.value},
            function (data) {
                console.log(data);
                if (data.flag) {
                    $('#sponsor_list').val(data.data.join(','));
                    save_sponsor_flag = true;
                } else {
                    sweetAlert(data.msg);
                }
            });


        //组装场馆信息
        var addr_arr = [];
        $('#selectedAddress').find('#source_address_table_body').find('tr').each(function (index) {
            var addr = {};
            addr.id = $(this).attr('data-addr-id');
            addr.name = $(this).find('td').eq(0).text().replace(/\s/g, "").replace('\\n/g', "");
            addr.address = $(this).find('td').eq(1).text();
            addr_arr.push(addr);
        });
        $('#addr_list_json').val(JSON.stringify(addr_arr));
        //var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
        $.post('/admin/event/neweventtable/save_addr_json/',
            {addr_list_json: JSON.stringify(addr_arr), csrfmiddlewaretoken: csrf.value},
            function (data) {
                console.log(data);
                if (data.flag) {
                    $('#addr').val(data.data.join(','));
                    save_addr_flag = true;
                } else {
                    sweetAlert(data.msg);
                }
            });

        //组装往届精彩回顾
        var review_arr = [];
        $('.doc-list').find('.file-display').each(function () {
            var id = $(this).attr('data-file-id');
            console.log(id);
            review_arr.push(id);
        });

        $.post('/admin/event/neweventtable/save_review_json/',
            {review_list_json: JSON.stringify(review_arr), csrfmiddlewaretoken: csrf.value},
            function (data) {
                console.log(data);
                if (data.flag) {
                    save_par_flag = true;
                    $('#id_eventreview').val(data.data.join(','));
                } else {
                    sweetAlert(data.msg);
                }
            });

        //组装段落数据
        var par_arr = [];
        $('.paraUl').find('li').each(function () {
            var par = {};
            var par_id = $(this).find('a').attr('data-par-id');
            par.par_id = par_id;
            par.par_name = $(this).find('a').text();
            par.txt = $(window.parent)[0].CKEDITOR.document.getById(par_id).getEditor().getData();
            par_arr.push(par);
        });
        console.log(par_arr);
        $('#paragraph_list_json').val(JSON.stringify(par_arr));
        //保存段落信息
        //var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
        $.post('/admin/event/neweventtable/save_paragraph_json/',
            {par_list_json: JSON.stringify(par_arr), csrfmiddlewaretoken: csrf.value},
            function (data) {
                console.log(data);
                if (data.flag) {
                    $('#paragraph').val(data.data.join(','));
                    save_par_flag = true;
                } else {
                    sweetAlert(data.msg);
                }
            });

        //组装标签数据
        var tag_arr = [];
        $('#selectedCatArea .tagsinput').find('.tag').each(function (index) {
            var tag = {};
            var tag_id_arr = $('#selectedTags').attr('data-id-arr');
            var tag_id = $(this).find('span').attr('data_value');
            console.log(tag_id);
            if (tag_id == "") {

            }
            tag.id = tag_id;
            tag.name = $(this).find('span').text().replace(/\s/g, "");
            tag_arr.push(tag);
        });
        console.log(tag_arr);
        $('#tag_list_json').val(JSON.stringify(tag_arr));
        //保存标签信息
        //var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
        $.post('/admin/event/neweventtable/save_tag_json/',
            {tag_list_json: JSON.stringify(tag_arr), csrfmiddlewaretoken: csrf.value},
            function (data) {
                console.log(data);
                if (data.flag) {
                    $('#tag').val(data.data.join(','));
                    save_tag_flag = true
                } else {
                    sweetAlert(data.msg);
                }
            });

        //组装信息来源
        var from_info_arr = [];
        $('#fromUl').find('li').each(function (index) {
            var from_info = {};
            from_info.id = $(this).attr('data-id');
            from_info.Website = $(this).find('span[class=website_url]').text();
            from_info.contacts = $(this).find('span[class=contacts]').text();
            from_info.phone = $(this).find('span[class=phone]').text();
            from_info.email = $(this).find('span[class=email]').text();
            from_info.email = $(this).find('span[class=email]').text();
            from_info.content = $(this).find('span[class=right]').text();
            from_info_arr.push(from_info);
        });
        $('#from_info_list_json').val(JSON.stringify(from_info_arr));
        //保存信息来源
        //var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
        $.post('/admin/event/neweventtable/save_from_info_json/',
            {from_info_list_json: JSON.stringify(from_info_arr), csrfmiddlewaretoken: csrf.value},
            function (data) {
                console.log(data);
                if (data.flag) {
                    $('#from_info').val(data.data.join(','));
                    save_frominfo_flag = true
                } else {
                    sweetAlert(data.msg);
                }
        });
        //组装嘉宾信息
        $('.paraUl li a').each(function(index){
            var par_name = $(this).text();
            if(par_name=='会议嘉宾'){
                var ckid = $(this).attr('data-par-id');
                var myck = $(window.parent)[0].CKEDITOR.document.getById(ckid).getEditor(); 
                var guest_html = myck.getData();
                var id_reg = /id="(\d+)"/g;
                var id_list_exp = guest_html.match(id_reg);
                var guest_list = [];
                while(r = id_reg.exec(guest_html)){
                    guest_list.push(parseInt(r[1]));
                }
                console.log(guest_list);
                var guest_id_str = guest_list.join(',');
                $('#id_guest').val(guest_id_str);
            }
        });
        if (save_price_flag && save_addr_flag && save_sponsor_flag && save_addr_flag && save_par_flag && save_tag_flag) {
            swal('保存成功！', 'success', 'success')
            $('form').submit();
        } else {
            swal('保存失败!请仔细检查输入数据...', 'fail', 'error')
            $('#mask').hide();
        }
    }
    $('.save_edit_event').each(function(){
        $(this).click(function(){
        //document.getElementById('mask').style.display='block';
        $('#mask').show();
        var obj=$(this)
            setTimeout(function () {
                save(obj)
            },0)
    });
    });
});
