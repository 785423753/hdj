/**
 * Created by Administrator on 2016/11/25 0025.
 */

$(document).ready(function(){
    var myDate = new Date();
    var today=myDate.toLocaleDateString().replace('/','-').replace('/','-')

   var vm= new Vue({
        el: '#md_price',
        data: {
            add_guest:{
                type_name:'',
                id:'0',
                img:'http://pic.huodongjia.com/static/images/avatar.png',
                job:'',
                company:''
            },
            new_price:'',
            new_sponsor:'',
            new_tag:'',
            new_ring:'',
            current_province:'',
            current_city:'',
            current_cat:6,
            current_tag:[437,969,966],
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

            event:{
                id: '',
                introduction:'',
                title: '测试标题烦心',
                scale: '1001+',
                begin_time: '2017-12-15 8:00',
                end_time: '2017-11-17 18:00',
                city_id: 101,
                cat_id: 2,
                province_id:600,
                tags_id: [437],
                imgs_id: ['241029', '241027'],
                venue_title: '测试场馆',
                venue_address: '测试场馆位置',
                sponsor_list: [{id: '30121', name: 'update测试主办方000'}, {id: '30121',name: 'new测试主办方002'}],
                ticket_list: [
                    {
                        id: 69656,
                        price: '23.3333',
                        ticket_name: 'update会务费',
                        begin_time: '2017-12-15 8:00',
                        end_time: '2016-12-17 18:00',
                        description: '不含早餐',
                        min_stock: '2',
                        stock: '880',
                        status: 1,
                    },
                    {
                        id: 69656,
                        price: '23.3333',
                        ticket_name: 'update会务费',
                        begin_time: '2017-12-15 8:00',
                        end_time: '2016-12-17 18:00',
                        description: '不含早餐',
                        min_stock: '2',
                        stock: '880',
                        status: 0,
                    }
                ],
                price_type: '4',
                previous_id: ['166259', '166260'],
                from_info_list: [
                    {
                        id: 55880,
                        contacts: 'update小时',
                        telephone: '18234086185',
                        content:'内容',
                        email: 'updateesd@12.com',
                        url: 'updatehttps://ww.huo.com',
                        source: '5',
                    },

                ],
                imgs_id:[
                    {
                        id: 33231,
                        url: 'http://pic.huodongjia.com/event/2016-11-22/1479797577.85.jpeg!hdj123',
                    },
                    {
                        id: 33221,
                        url: 'http://pic.huodongjia.com/event/2016-11-22/1479797577.85.jpeg!hdj123',
                    },
                ],
                review_list:[
                    {
                        id: 33231,
                        url: 'http://pic.huodongjia.com/event/2016-11-22/1479797577.85.jpeg!hdj123',
                        description: 'update领导们',
                    },
                    {
                        id: 33221,
                        url: 'http://pic.huodongjia.com/event/2016-11-22/1479797577.85.jpeg!hdj123',
                        description: 'new同学们',
                    },
                ],
            },
            event_content:[
                {name:'会议详情',left:1,right:22,level:0,value:'',id:1,type:1,children:[]},
                    {name:'会议介绍',left:2,right:11,level:1,value:'',id:2,type:1,children:[]},
                        {name:'关于大会',left:3,right:4,level:2,value:'<p>关于大会</p>',type:1,id:3,children:[
                            {name:'与会嘉宾',value:'2200'},
                            {name:'演讲嘉宾',value:'2200'},
                            {name:'会议时间',value:'2200'},
                            {name:'支持机构与媒体机构',value:'2200'},
                            {name:'参会群体细分（按行业）',children:[
                                {name:'小额借贷平台',value:'2200'},
                                {name:'支付企业',value:'2200'},
                                {name:'其他',value:'2200'},
                            ]}
                        ]},
                        {name:'大会亮点',left:5,right:6,level:2,value:'<p>大会亮点</p>',id:4,type:1,children:[]},
                        {name:'大会背景',left:7,right:8,level:2,value:'<p>大会背景</p>',id:5,type:1,children:[]},
                        {name:'主办方介绍',left:9,right:10,level:2,value:'<p>主办方介绍</p>',id:6,type:1,children:[]},
                    {name:'会议日程',left:12,right:15,level:1,value:'',id:7,type:1,children:[]},
                        {name:'第一天',left:13,right:14,level:2,value:'<p>第一天</p>',id:8,type:1,children:[]},
                    {name:'会议嘉宾',left:16,right:17,level:1,value:'<p>会议嘉宾</p>',id:9,type:2,children:[
                        {name:'秦捷云',img:'http://pic.huodongjia.com/guest/2016-12-13/1481612241.24.jpg!hdj123',job:'创始合伙人',company:'天使基金',guest_id:0,img_id:0},
                        {name:'秦捷云',img:'http://pic.huodongjia.com/guest/2016-12-13/1481612241.24.jpg!hdj123',job:'创始合伙人',company:'天使基金',guest_id:''},
                        {name:'往届嘉宾',children:[
                            {name:'秦捷云',img:'http://pic.huodongjia.com/guest/2016-12-13/1481612241.24.jpg!hdj123',job:'创始合伙人',company:'天使基金',guest_id:''},
                            {name:'秦捷云',img:'http://pic.huodongjia.com/guest/2016-12-13/1481612241.24.jpg!hdj123',job:'创始合伙人',company:'天使基金',guest_id:''},
                        ]}
                    ]},
                    {name:'参会指南',left:18,right:21,level:1,value:'',id:10 ,type:1,children:[]},
                        {name:'交通指南',left:19,right:20,level:2,value:'<p>交通指南</p>',id:11,type:1,children:[]},


                //{1: editor, 4:editor,  6:editor, 10: editor}
                // [editor_1, editor-]
            ]
        },
        methods: {
            ready:function(){
                var tags={},current_tag=this.current_tag,i=this.title_index,key=this.event.cat_id,
                    that=this
                $.get('/admin/event/neweventtable/show_tag_json_v2/',{},function (data) {
                    that.all_tags=data
                    that.tag=that.all_tags[key]
                    for(i in that.all_tags[key]){
                        that.all_tags[key][i].isture=false
                        for(j in that.event.tags_id){
                            if(that.all_tags[key][i].id==that.event.tags_id[j]){
                                that.choosed_tags.push(that.all_tags[key][i].name)
                            }
                        }
                    }
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
                this.left=this.event_content[i].left
                this.right=this.event_content[i].right
                this.left_t=this.event_content[i].left+1
                this.right_t=this.event_content[i].left+2
                this.tag_index=i+1

                var id=[],Editor=[],content=this.event_content,_id=[],editor_dict={}
                for(i in content){
                    // if(content[i].right-content[i].left==1){
                        id.push('edtor_'+content[i].id)
                        _id.push(content[i].id)
                    editor_dict[content[i].id]=content[i].value
                    Editor.push({name:'editor_'+content[i].id,id:content[i].id})
                    // }
                }
                console.log(editor_dict)
                var that=this
                for(var i in content){
                    $('#'+id[i]).css({height:'400px'})
                     var editor= new wangEditor(id[i]);
                    editor.onchange=function () {
                        var id=this.$txt[0].id.split('_')[1]
                        for(i in content){
                            if(content[i].id==id){
                                content[i].value=this.$txt.html()
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

                    // editor.$txt.html(content[i].value);
                }
                for(i in Editor){
                    for(j in content){
                        if(Editor[i].id==content[j].id){
                            // Editor[i].name.$txt.html(content[i].value)
                        }
                    }
                }
            },
            choose_pro:function (e) {
                if(e.path[0].id=='province'){
                    this.event.province_id=e.path[0].value
                    for(i in this.all_citys){
                        if(this.event.province_id==this.all_citys[i].id){
                            this.city=this.all_citys[i].child
                        }
                    }
                    var that=this
                    setTimeout(function () {
                        that.event.city_id=$('#city').val()
                    },1000)
                }else{
                    this.event.city_id=e.path[0].value
                }
            },
            choosed_tag:function (name,id) {
                var s=this.event.tags_id.indexOf(id)
                if(s==-1){
                    this.event.tags_id.push(id)
                    this.choosed_tags.push(name)
                }
            },
            addNewTodo: function () {
                var price=this.new_price.split('/')
                if(price!=''){
                    for(i in price){
                        this.event.ticket_list.push({
                            price:price[i],
                            ticket_name: '会务费',
                            begin_time: today+" 08:00",
                            end_time: today+" 18:00",
                            description: '',
                            min_stock: '1',
                            stock: '',
                            status: 1
                        })
                    }
                }else {
                    Materialize.toast('请填写票价!','3000')
                }
                this.new_price=''
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
                $(time[index]).prev().text(value)
                cs=='start_time' ? this.event.ticket_list[index].star_time=value:this.event.ticket_list[index].end_time=value
//                   console.log(JSON.stringify(this.todos))
            },
            choose_cat: function (index) {
                this.current_cat=$('.tabs li').eq(index).attr('data-id')
            },
            onFileChange:function(e) {
                var files = e.target.files || e.dataTransfer.files,id=e.path[0].id,that=this
                $(e.path[0]).text('正在上传')
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
                        $(e.path[0]).text('上传成功')
                    },
                    error:function () {

                    }
                })
            },
            createImage:function(url,img_id,id) {
                console.log(id)
                var vm = this,pic='http://pic.huodongjia.com/';
                if(id=='banner'){
                    vm.event.imgs_id .push ({
                        id:img_id,
                        url:pic+url,
                    });
                }else if(id=='review'){
                    vm.event.review_list.push ({
                        id:img_id,
                        url:pic+url,
                        description:''
                    });
                }else if(id=='guest'){
                    vm.add_guest.img=pic+url
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
                console.log(left+" "+right+" "+index)
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
            delete_tag:function (index,right) {
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
                    content.push({name:this.new_tag,left:r,right:r+1,level:2,value:this.new_tag,id:this.id,type:1,children:[]})
                    // content.splice(_index,0,{name:this.new_tag,left:r,right:r+1,level:2,value:this.new_tag,id:this.id})
                    this.new_tag=''
                    setTimeout(function () {
                        var last_id=content[content.length-1].id
                        var editor = new wangEditor('edtor_'+last_id);
                        $('#edtor_'+last_id).css({height:'400px'})
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
                        editor.$txt.html(content[content.length-1].value);
                    },2000)
                }else {
                    // 添加嘉宾标签
                    content[g_i].children.push(
                        {name:this.new_tag,children:[]}
                    )
                    this.new_tag=''
                }
            },
            add_guests:function () {
                var type=this.add_guest.type_name,content=this.event_content
                if(this.add_guest.img&&this.add_guest.name){
                    for(i in content){
                        if(content[i].type==2){
                            if(type==''){
                                content[i].children.push({name:this.add_guest.name,img:this.add_guest.img,job:this.add_guest.job,company:this.add_guest.company,guest_id:this.add_guest.id})
                                this.add_guest={
                                    type_name:'',
                                    id:'0',
                                    img:'http://pic.huodongjia.com/static/images/avatar.png',
                                    job:'',
                                    company:''
                                }
                                $('#modal1').modal('close');
                            }else{
                                for(j in content[i].children){
                                    if(content[i].children[j].name==type){
                                        content[i].children[j].children.push({name:this.add_guest.name,img:this.add_guest.img,job:this.add_guest.job,company:this.add_guest.company,guest_id:this.add_guest.id})
                                        this.add_guest={
                                            type_name:'',
                                            id:'0',
                                            img:'http://pic.huodongjia.com/static/images/avatar.png',
                                            job:'',
                                            company:''
                                        }
                                        $('#modal1').modal('close');
                                    }
                                }
                            }
                        }
                    }
                }else{
                  alert('填写名字或上传头像')
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
            save:function () {
                this.event.event_content=this.event_content
                console.log()
               $.ajax({
                   url:'/admin/event/neweventtable/event/add/',
                   data:{json_data: JSON.stringify(this.event)},
                   type:'post',
                   async:false,
                   success:function () {
                       
                   }
               })
            }
        }
    })
    vm.ready()

//分类
    $('ul.tabs').tabs();
    //时间
    $.datetimepicker.setLocale('ch');
    $('select').material_select();
    $('.price_time').datetimepicker({ minDate:'-1970-01-01',format:'Y-m-d h:i',})
    $('#start_time').datetimepicker({
        minDate:'-1970-01-01', // yesterday is minimum date
        value:today+" 08:00",
        format:'Y-m-d h:i',
    });
    $('#end_time').datetimepicker({
        minDate:'-1970-01-01', // yesterday is minimum date
        value:today+" 18:00",
        format:'Y-m-d h:i',
    });

})

