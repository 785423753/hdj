/**
 * Created by Administrator on 2016/11/25 0025.
 */

$(document).ready(function(){
    var myDate = new Date();
    var today=myDate.toLocaleDateString().replace('/','-').replace('/','-')
    var reg = /^(?=.*\d.*\b)/,that=this,url=window.location.pathname
//场馆


   var vm= new Vue({
        el: '#md_price',
        data: {
            previous_id:'',
            add_guest:{
                type_name:'',
                id:'',
                url:'http://pic.huodongjia.com/static/images/avatar.png',
                job:'',
                company:'',
                name:''
            },
            new_price:'',
            new_sponsor:'',
            new_tag:'',
            new_ring:'',
            current_province:'',
            current_city:'',
            current_cat:6,
            current_tag:[],
            new_source:{
                url:'',
                name:'',
                mail:'',
                phone:'',
                mark:''
            },
            isedit:false,
            province:[],
            city:'',
            cat:[
                {
                    ename: "it",
                    name: "IT互联网",
                    id: 2
                },
                {
                    ename: "finance",
                    name: "金融财经",
                    id: 6
                },
                {
                    ename: "medical",
                    name: "医疗医学",
                    id: 4
                },
                {
                    ename: "energy",
                    name: "能源化工",
                    id: 3
                },
                {
                    ename: "agricultur",
                    name: "农林牧渔",
                    id: 9
                },
                {
                    ename: "edutrain",
                    name: "教育培训",
                    id: 118
                },
                {
                    ename: "manufact",
                    name: "加工制造",
                    id: 120
                },
                {
                    ename: "realestate",
                    name: "地产建筑",
                    id: 122
                },
                {
                    ename: "culmedia",
                    name: "文化传媒",
                    id: 124
                },
                {
                    ename: "servindust",
                    name: "服务行业",
                    id: 126
                },
                {
                    ename: "tralogist",
                    name: "交通物流",
                    id: 128
                },
                {
                    ename: "trade",
                    name: "其它行业",
                    id: 96
                }
            ],
            tag:[],
            left:'',
            right:'',
            left_t:'',
            right_t:'',
            title_index:1,
            tag_index:'',
            id:'',
            all_tags:{},
            all_citys:[],
            choosed_tags:[],
            Editor_txt:[],
            search_sponsor:[],
            search_venue:[],
            search_guest:[],

            event:{
                id: '',
                isshow_id:5,
                introduction:'',
                name: '',
                scale: '',
                begin_time: today+' 08:00',
                end_time: today+' 18:00',
                city_id: 101,
                cat_id: 2,
                province_id:600,
                tags: [],
                // imgs_id: ['241029', '241027'],
                venue_title: '',
                venue_address: '',
                sponsor_list: [],
                ticket_list: [],
                price_type: '4',
                previous_id: [],
                from_info_list: [
                ],
                imgs:[
                ],
                review_list:[
                ],
            },
            event_content:[
                {name:'会议详情',left:1,right:10,level:0,value:'<p>会议详情</p>',id:1,type:0,children:[]},
                    {name:'会议介绍',left:2,right:3,level:1,value:'<p>会议介绍</p>',id:2,type:0,children:[]},
                    {name:'会议日程',left:4,right:5,level:1,value:'<p>会议日程</p>',id:3,type:1,children:[]},
                    {name:'会议嘉宾',left:6,right:7,level:1,value:'<p>会议嘉宾</p>',id:4,type:2,
                        children:[
                        {name:'秦捷云',url:'http://pic.huodongjia.com/guest/2016-12-13/1481612241.24.jpg!hdj123',job:'创始合伙人',company:'天使基金',img_id:''},
                            ]},
                    {name:'参会指南',left:8,right:9,level:1,value:'<p>参会指南</p>',id:5 ,type:0,children:[]},



                //{1: editor, 4:editor,  6:editor, 10: editor}
                // [editor_1, editor-]
            ]
        },
        methods: {
            ready:function(){
                var that=this
                if(reg.test(url)){
                    $.get(url,{},function (data) {
                        console.log(data)
                        that.event=data.event
                        that.event_content=data.event_content
                        that.$nextTick(function () {
                            // alert('1')
                            $('.price_time').datetimepicker({ format:'Y-m-d H:i',})
                        })
                        that.get_data()

                    })
                }else{
                    that.get_data()
                }
            },
            get_data:function () {
                var tags={},current_tag=this.current_tag,i=this.title_index,key=this.event.cat_id,that=this
                $('#price_type').val(that.event.price_type)
                that.previous_id=that.event.previous_id.join(',')
                $.get('/admin/event/neweventtable/show_tag_json_v2/',{},function (data) {
                    that.all_tags=data
                    that.tag=that.all_tags[key]
                    $('a.active').click()
                })
                $.get('/admin/event/neweventtable/show_city_json_v2/',{},function (data){
                    that.all_citys=data
                    for(i in that.all_citys){
                        if(that.event.province_id==that.all_citys[i].id){
                            that.city=that.all_citys[i].child
                        }
                    }
                })
                $('.modal').modal();
                this.id=this.event_content.length
                this.left=this.event_content[1].left
                this.right=this.event_content[1].right
                if(this.right-this.left==1){
                    this.left_t=this.left
                    this.right_t=this.right
                }else{
                    this.left_t=this.event_content[1].left+1
                    this.right_t=this.event_content[1].left+2
                }

                this.$nextTick(function () {
                    that.create()
                })

            },
            create:function () {

                var id=[],content=this.event_content,_id=[],editor=[]
                for(i in content){
                    // if(content[i].right-content[i].left==1){
                    id.push('edtor_'+content[i].id)
                    _id.push(content[i].id)
                    editor.push('editor_'+content[i].id)
                    this.Editor_txt.push({id:content[i].id,value:content[i].value})

                    // }
                }
                console.log(this.Editor_txt)
                //创建editor
                var that=this
                    for(var i in content){
                        $('#'+id[i]).css({height:'600px'})

                        var editor= new wangEditor(id[i]);
                        editor.onchange=function () {
                            var id=this.$txt[0].id.split('_')[1]
                            for(i in that.Editor_txt){
                                if(that.Editor_txt[i].id==id){
                                    that.Editor_txt[i].value=this.$txt.html()
                                }
                            }
                        }
                        editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
                            if (item === 'location') {
                                return null;
                            }
                            if (item === 'emotion') {
                                return null;
                            }
                            return item;
                        });
                        editor.config.uploadImgUrl = '/admin/event/neweventtable/save_img_json_v2/';
                        editor.config.uploadImgFileName = 'img'
                        editor.config.uploadImgFns.onload=function (resultText, xhr){
                            var img=JSON.parse(resultText)
                            this.command(null, 'insertHtml', '<img src="' +img.url + '" style="max-width:100%;"/>');
                        }
                        editor.create();
                    }


            },
            choose_pro:function (e) {
                console.log(e.target.value)
                if(e.target.id=='province'){
                    this.event.province_id=e.target.value
                    for(i in this.all_citys){
                        if(this.event.province_id==this.all_citys[i].id){
                            this.city=this.all_citys[i].child
                        }
                    }
                    var that=this
                    that.$nextTick(function () {
                        that.event.city_id=$('#city').val()
                    })
                }else{
                    this.event.city_id=e.target.value
                }
            },
            choosed_tag:function (name,id) {
                var str=[]
                for(i in this.event.tags){
                    str.push(this.event.tags[i].id)
                }
                var s=str.indexOf(id)
                if(s==-1){
                    this.event.tags.push({id:id,name:name})
                }
            },
            addNewTodo: function () {
                var price=this.new_price.split('/')
                if(price!=''){
                    for(i in price){
                        this.event.ticket_list.push({
                            price:price[i],
                            property: '会务费',
                            begin_time: today+" 08:00",
                            end_time: today+" 18:00",
                            content: '',
                            limit_people: '1',
                            stock: 999,
                            status: 1
                        })
                    }
                }else {
                    Materialize.toast('请填写票价!','3000')
                }
                this.new_price=''
                this.$nextTick(function () {
                    $('.price_time').datetimepicker({format:'Y-m-d H:i',})
                })
            },
            addSource:function(){
               var source=this.new_source
                console.log(JSON.stringify(source))
                if(source.mark!=''||source.url!=''){
                    this.event.from_info_list.push({
                        id:0,
                        url:source.url,
                        contacts:source.name,
                        email:source.mail,
                        telephone:source.phone,
                        content:source.mark
                    })
                }else {
                    Materialize.toast('请填写来源信息!','3000')
                }
                this.new_source={}
            },
            change:function(index,id){
                var table=document.getElementById(id)
                $(table).find('tbody').find('tr').eq(index).addClass('choose')
            },
            done: function (index,id) {
                var table=document.getElementById(id)
                $(table).find('tbody').find('tr').eq(index).removeClass('choose')
            },
            change_time: function (index,cs) {
                var time=$('.'+cs+''),value=time[index].value
                cs=='start_time' ? this.event.ticket_list[index].begin_time=value:this.event.ticket_list[index].end_time=value
            },
            choose_cat: function (index) {
                this.current_cat=$('.tabs li').eq(index).attr('data-id')
            },
            onFileChange:function(e) {
                var files = e.target.files || e.dataTransfer.files,id=e.target.id,that=this
                $('#'+id).prev().text('正在上传...')
                $('.'+id).show()
                if (!files.length)
                    return;
                this.createImage(files[0],e.target.id);
                var img_data=new FormData()
                img_data.append("img", files[0]);
                $.ajax({
                    url:'/admin/event/neweventtable/save_img_json_v2/',
                    data:img_data,
                    type:'post',
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    contentType: false,  // 告诉jQuery不要去设置Content-Type请求头
                    success:function (data) {
                        console.log(data)
                        that.createImage(data.url,data.id,id)
                        $('#'+id).prev().text('上传成功')
                        $('.'+id).hide()
                    },
                    error:function () {
                        $('#'+id).prev().text('上传失败')
                        $('.'+id).hide()
                    }
                })
            },
            createImage:function(url,img_id,id) {
                console.log(id)
                var vm = this,pic='http://pic.huodongjia.com/';
                if(id=='banner'){
                    vm.event.imgs.push ({
                        id:img_id,
                        url:url,
                    });
                }else if(id=='review'){
                    vm.event.review_list.push ({
                        url:url,
                        description:''
                    });
                }else if(id=='guest'){
                    vm.add_guest.url=url
                    vm.add_guest.id=img_id
                }
            },
            editor:function(a,b){
                //编辑器
                var a= new wangEditor(id);
                var id=['ss'],Edtior=[]
                // for(var i in this.event_content){
                //     if(this.event_content[i].children){
                //         for(var j in this.event_content[i].children){
                //             id.push("notice"+i+j)
                //             Edtior.push('edtior'+i+j)
                //         }
                //     }else {
                //         id.push("notice"+i)
                //         Edtior.push('edtior'+i)
                //     }
                //
                // }
                // console.log(Edtior)

                // Editor = []
                for(var i in id){
                    $('#'+id[i]).css({height:'400px'})
                    var editor = new wangEditor(id[i]);
                    // console.log(Edtior[i].config==undefined)
                    // if(!Edtior[i]){
                    //
                    // }
                    editor.onchange = function () {
                        // 编辑区域内容变化时，实时打印出当前内容
                        console.log(  $('#'+id[i]))
                        $('#'+id[i]).change()
                    };
                    editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
                        if (item === 'location') {
                            return null;
                        }
                        if (item === 'emotion') {
                            return null;
                        }
                        return item;
                    });

                    editor.create();
                    // Editor.push(editor);
                }
            },
            choose_title:function (left,right,index) {
                this.left=left
                this.right=right
                this.title_index=index
                if(right-left==1){
                    this.left_t=left
                    this.right_t=right
                }else {
                    this.left_t=left+1
                    this.right_t=left+2
                    this.tag_index=index+1
                }
            },
            delete_tag:function (index,right,id) {
                var content=this.event_content,a=this.title_index
                for(var i in content){
                    if(content[i].left>right) content[i].left-=2
                    if(content[i].right>right) content[i].right-=2
                }
                content.splice(index,1)
                if(this.left>right) this.left-=2
                if(this.right>right) this.right-=2

                this.left_t=this.left+1
                this.right_t=this.left+2
                if(this.right-this.left==1){
                    this.left_t=this.left
                    this.right_t=this.right
                }
                for(i in content){
                    for(j in this.Editor_txt){
                        if(this.Editor_txt[j].id==content[i].id){
                            content[i].value=this.Editor_txt[j].value
                        }
                    }
                }
            },
            add_tag:function () {
                var content=this.event_content,a=this.title_index,r=content[a].right,l=content[a].left,_index,type=true,g_i=''
                for(i in content){
                    if(content[i].left==l) {
                        if(content[i].type==2) type=false,g_i=i
                    }
                }
                if(this.new_tag&&type){
                    this.id++
                    for(i in content){
                        if(r-content[i].right==1) _index=parseInt(i)+1, console.log(_index)
                        if(content[i].left>=r) content[i].left+=2
                        if(content[i].right>=r) content[i].right+=2
                    }
                    this.left=content[a].left
                    this.right=content[a].right
                    if(r-l==1){
                        this.left_t=r
                        this.right_t=r+1
                    }
                    content.push({name:this.new_tag,left:r,right:r+1,level:2,value:this.new_tag,id:this.id,type:0,children:[]})
                    this.Editor_txt.push({id:this.id,value:this.new_tag})
                    console.log(this.Editor_txt)
                    // content.splice(_index,0,{name:this.new_tag,left:r,right:r+1,level:2,value:this.new_tag,id:this.id})
                    this.new_tag=''
                    var that=this
                    this.$nextTick(function () {
                        var last_id=content[content.length-1].id
                        var editor = new wangEditor('edtor_'+last_id);
                        $('#edtor_'+last_id).css({height:'400px'})
                        editor.onchange=function () {
                            var id=this.$txt[0].id.split('_')[1]
                            for(i in that.Editor_txt){
                                if(that.Editor_txt[i].id==id){
                                    that.Editor_txt[i].value=this.$txt.html()
                                    console.log(this.$txt.html())
                                }
                            }
                        }
                        editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
                            if (item === 'location') {
                                return null;
                            }
                            if (item === 'emotion') {
                                return null;
                            }
                            return item;
                        });
                        editor.create();
                    })
                }else {
                    // 添加嘉宾标签
                    content[g_i].children.push(
                        // {name:this.new_tag,children:[]}
                    )
                    this.new_tag=''
                }
            },
            add_guests:function () {
                var type=this.add_guest.type_name,content=this.event_content
                if(this.add_guest.name){
                    for(i in content){
                        if(content[i].type==2){
                            if(type==''){
                                content[i].children.push({name:this.add_guest.name,url:this.add_guest.url,job:this.add_guest.job,company:this.add_guest.company,img_id:this.add_guest.id})
                                this.add_guest={
                                    type_name:'',
                                    id:'',
                                    url:'http://pic.huodongjia.com/static/images/avatar.png',
                                    job:'',
                                    company:'',
                                    name:''
                                }
                                $('#modal1').modal('close');
                            }else{
                                for(j in content[i].children){
                                    if(content[i].children[j].name==type){
                                        content[i].children[j].children.push({name:this.add_guest.name,url:this.add_guest.url,job:this.add_guest.job,company:this.add_guest.company,img_id:this.add_guest.id})
                                        this.add_guest={
                                            type_name:'',
                                            id:'0',
                                            url:'http://pic.huodongjia.com/static/images/avatar.png',
                                            job:'',
                                            company:'',
                                            name:''
                                        }
                                        $('#modal1').modal('close');
                                    }
                                }
                            }
                        }
                    }
                }else{
                  alert('填写嘉宾名字')
                }

            },
            delete_guest:function (index) {
                var content=this.event_content
                var r=confirm("你确定删除整个嘉宾分类吗？？");
                if (r==true)
                {
                    for(i in content){
                        if(content[i].type==2){
                            content[i].children.splice(index,1)
                        }
                    }
                }


            },
            search_auto:function (type) {
                var that=this
               if(type==1&&that.new_sponsor!=''){    //主办方
                   $.get('/admin/event/neweventtable/sponsor_suggest/',{token:that.new_sponsor},function (data) {
                       that.search_sponsor=data
                   })
               }else if(type==0&&that.event.venue_title!=''){   //场馆
                   $.get('/admin/event/neweventtable/addr_suggest_v2/',{token:that.event.venue_title},function (data) {
                       that.search_venue=data
                   })
               }else if(type==2&&that.add_guest.name.length>=2){   //嘉宾
                   $.get('/admin/event/neweventtable/guest_suggest_v2/',{token:that.add_guest.name},function (data) {
                       that.search_guest=data
                   })
               }

            },
            save:function (isshow_id) {
                $('.bg').show()
                var content=this.event_content
                this.event.begin_time=$('#start_time').val()
                this.event.end_time=$('#end_time').val()
                this.event.price_type=$('#price_type').val()
                this.event.isshow_id=isshow_id
                for(i in content){
                    for(j in this.Editor_txt){
                        if(this.Editor_txt[j].id==content[i].id){
                            content[i].value=this.Editor_txt[j].value
                        }
                    }
                }
                this.event.event_content=this.event_content
                console.log(this.event)
               $.ajax({
                   url:'/admin/event/neweventtable/event/add/',
                   data:{json_data: JSON.stringify(this.event)},
                   type:'post',
                   async:false,
                   success:function (data) {
                       if(data.code==1){
                           $('.bg').hide()
                           Materialize.toast('保存成功!','3000')
                           if(isshow_id==5){
                               if(reg.test(url)){
                                   window.location.href=window.location.href
                               }else{
                                   window.location.pathname=url+data.event_id
                               }
                           }else if(isshow_id==1){
                               window.location.pathname='/admin/event/neweventtable/'
                           }
                       }else{
                           $('.bg').show()
                           Materialize.toast('保存失败!','3000')
                       }

                   },
                   error:function () {
                       $('.bg').hide()
                       Materialize.toast('保存失败!','3000')
                   }
               })
            },

        }
    })

    vm.ready()



//分类
    $('ul.tabs').tabs();
    //时间
    $.datetimepicker.setLocale('ch');
    $('select').material_select();
    $('.price_time').datetimepicker({ format:'Y-m-d H:i',})
    $('#start_time').datetimepicker({
        format:'Y-m-d H:i',
        onChangeDateTime:function(dp,$input){
            vm.event.begin_time=$input.val()
        }
    });
    $('#end_time').datetimepicker({
        format:'Y-m-d H:i',
        onChangeDateTime:function(dp,$input){
            vm.event.end_time=$input.val()
        }
    });

})

