/**
 * Created by Administrator on 2016/11/25 0025.
 */
$(document).ready(function(){
    var myDate = new Date();
    var today=myDate.toLocaleDateString()
    //票价
    Vue.component('todo-item', {
        template: '<tr><td><span>{{title.price}}</span><input name="price" type="text" v-model="title.price"></td> ' +
        '<td><span>{{title.name}}</span><input  name="price" type="text" v-model="title.name"></td> ' +
        '<td><span>{{title.star_time}}</span><input v-on:blur="$emit(\'start\')" type="text" name="start_time" class="price_time start_time"  v-model="title.star_time" ></td> ' +
        '<td><span>{{title.end_time}}</span><input  v-on:blur="$emit(\'end\')" type="text" name="end_time" class="price_time end_time"  v-model="title.end_time" ></td> ' +
        '<td style="padding: 0 5px;"><span>{{title.note}}</span><div class="note"><textarea id="note" class="materialize-textarea" v-model="title.note"></textarea></div></td> ' +
        '<td><span>{{title.min}}</span><input name="min_price" type="number" v-model="title.min"></td>' +
        '<td><span>{{title.max}}</span><input name="min_price" type="number" v-model="title.max"></td> ' +
        '<td><span v-if="title.checked">有效</span><span v-else>无效</span><input type="checkbox" class="filled-in"  v-bind:id="index" v-model="title.checked" /> <label v-bind:for="index"></label></td> ' +
        '<td class="operate" style="width: 65px;"><div class="edit"><i class="material-icons" v-on:click="$emit(\'remove\')">delete</i> <i v-on:click="$emit(\'change\')" class="material-icons">mode_edit</i></div>' +
        '<div class="sure">  <i class="material-icons" v-on:click="$emit(\'done\')">✔</i></div></td> </tr>',
        props: ['title','index']
    })
    Vue.component('venue-item', {
        template: '<tr><td  style="width: 40%"><span>{{title.name}}</span><input type="text"  v-model="title.name" class="validate"></td>' +
        '<td><span>{{title.address}}</span><input type="text" v-model="title.address" class="validate"></td><td>{{title.city}}</td>' +
        '<td class="operate" style="width: 65px;"><div class="edit"><i class="material-icons" v-on:click="$emit(\'remove\')">delete</i> <i v-on:click="$emit(\'change\')" class="material-icons">mode_edit</i></div>' +
        '<div class="sure">  <i class="material-icons" v-on:click="$emit(\'done\')">✔</i></div></td></tr>',
        props: ['title']
    })
    Vue.component('sponsor-item', {
        template: '<tr><td  style="width: 40%"><span>{{title.name}}</span></td>' +
        '<td><span>{{title.isclaim}}</span></td><td>{{title.events}}</td>' +
        '<td class="operate" style="width: 65px;"><i class="material-icons" v-on:click="$emit(\'remove\')">delete</i></td></tr>',
        props: ['title']
    })
    Vue.component('source-item', {
        template: '<tr><td><span>{{title.name}}</span><input type="text" v-model="title.name"></td>' +
        '<td><span>{{title.phone}}</span><input type="text" v-model="title.phone"></td>' +
        '<td><span>{{title.mail}}</span><input type="text" v-model="title.mail"></td>' +
        '<td><span><a href="">{{title.url}}</a></span><input type="text" v-model="title.url"></td>' +
        '<td style="width: 30%;"><span>{{title.mark}}</span><div class="note"><textarea id="note" class="materialize-textarea" v-model="title.mark"></textarea></div></td>' +
        '<td><span>{{title.state}}</span><input type="text" v-model="title.state"></td>' +
        '<td class="operate" style="width: 65px;"><div class="edit"><i class="material-icons" v-on:click="$emit(\'remove\')">delete</i> <i v-on:click="$emit(\'change\')" class="material-icons">mode_edit</i></div>' +
        '<div class="sure">  <i class="material-icons" v-on:click="$emit(\'done\')">✔</i></div></td></tr>',
        props: ['title']
    })
   var vm= new Vue({
        el: '#md_price',
        data: {
            new_price:'',
            new_venue:'',
            new_sponsor:'',
            new_venue_addr:'',
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
            todos: [
                {
                    price:100.00,
                    name:'会务费',
                    star_time:today+" 08:00",
                    end_time:today+" 18:00",
                    checked:true,
                    note:'说明',
                    min:1,
                    max:''
                },
                {
                    price:100.00,
                    name:'会务费',
                    star_time:today+" 08:00",
                    end_time:today+" 18:00",
                    checked:true,
                    note:'',
                    min:1,
                    max:''
                }
            ],
            province:[
                {name:'北京',id:'001'},
                {name:'上海',id:'002'}
            ],
            city:[
                {name:'北京',id:'001'},
                {name:'上海',id:'002'}
            ],
            venue:[
                {name:'哈尔滨工业大学科学园国际会议中心201教室',address:'钟楼区三堡街运河5号',city:'秦皇岛'}
            ],
            sponsor:[
                {name:'哈尔滨工业大学科学园国际会议中心201教室',isclaim:false,events:'10'}
            ],
            source:[],
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
            image: [],
            review_img:[]
        },
        methods: {
            ready:function(){
                var tags=[
                    {
                        tag__id: 437,
                        tag__name: "互联网"
                    },
                    {
                        tag__id: 969,
                        tag__name: "大数据"
                    },
                    {
                        tag__id: 16284,
                        tag__name: "创业创新"
                    },
                    {
                        tag__id: 966,
                        tag__name: "移动互联网"
                    },
                    {
                        tag__id: 970,
                        tag__name: "云计算"
                    },
                    {
                        tag__id: 715,
                        tag__name: "物联网"
                    },
                    {
                        tag__id: 1192,
                        tag__name: "科技"
                    },
                    {
                        tag__id: 973,
                        tag__name: "营销"
                    },
                    {
                        tag__id: 441,
                        tag__name: "信息安全"
                    },
                    {
                        g__id: 1295,
                        tag__name: "机器人"
                    },
                    {
                        tag__id: 977,
                        tag__name: "通信"
                    },
                    {
                        tag__id: 4710,
                        tag__name: "智能硬件"
                    },
                    {
                        tag__id: 1763,
                        tag__name: "软件"
                    },
                ],current_tag=this.current_tag
                for(i in tags){
                    tags[i].isture=false
                    for(j in current_tag){
                        if(tags[i].tag__id==current_tag[j]){
                            tags[i].isture=true
                        }
                    }
                }
                this.tag=tags
            },
            addNewTodo: function () {
                var price=this.new_price.split('/')
                console.log(price)
                if(price!=''){
                    for(i in price){
                        this.todos.push({
                            price:price[i],
                            name:'会务费',
                            star_time:today+" 08:00",
                            end_time:today+" 18:00",
                            checked:true,
                            note:'无',
                            min:1,
                            max:''
                        })
                    }
                }else {
                    Materialize.toast('请填写票价!','3000')
                }
                this.new_price=''
            },
            addVenue: function () {
                if(this.new_venue!=''){
                    this.venue.push({
                        name:this.new_venue,
                        address:this.new_venue_addr,
                        city:''
                    })
                }else {
                    Materialize.toast('请填写场馆名称!','3000')
                }
                this.new_venue='',this.new_venue_addr=''
            },
            addSponsor: function () {
                var sponsor=this.new_sponsor.split('/')
                if(sponsor!=''){
                    for(i in sponsor){
                        this.sponsor.push({
                            isclaim:false,
                            name:sponsor[i],
                            events:'0'
                        })
                    }
                }else {
                    Materialize.toast('请填写主办方名称!','3000')
                }
                this.new_sponsor=''
            },
            addSource:function(){
               var source=this.new_source
                console.log(JSON.stringify(source))
                if(source.mark!=''||source.url!=''){
                    this.source.push({
                        state:'未联系',
                        url:source.url,
                        name:source.name,
                        mail:source.mail,
                        phone:source.phone,
                        mark:source.mark
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
                cs=='start_time' ? this.todos[index].star_time=value:this.todos[index].end_time=value
//                   console.log(JSON.stringify(this.todos))
            },
            choose_cat: function (index) {
                this.current_cat=$('.tabs li').eq(index).attr('data-id')
            },
            onFileChange:function(e) {
                console.log(e)
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0],e.target.id);
                console.log(files)
            },
            createImage:function(file,id) {
                console.log(id)
                var image = new Image();
                var reader = new FileReader();
                var vm = this;
                reader.onload = (e) => {
                    if(id=='banner'){
                        vm.image .push (e.target.result);
                    }else if(id=='review'){
                        vm.review_img .push (e.target.result);
                    }

                };
                reader.readAsDataURL(file);
            }
        }
    })
    vm.ready()
//分类
    $('ul.tabs').tabs();
    //时间
    $.datetimepicker.setLocale('ch');
    $('.price_time').datetimepicker({ minDate:'-1970-01-01'})
    $('#start_time').datetimepicker({
        minDate:'-1970-01-01', // yesterday is minimum date
        value:today+" 08:00"
    });
    $('#end_time').datetimepicker({
        minDate:'-1970-01-01', // yesterday is minimum date
        value:today+" 18:00"
    });
    $('select').material_select();

    //编辑器
    var editor = new wangEditor('editor-trigger');

    // 上传图片
    editor.config.uploadImgUrl = '/upload';
    editor.config.uploadParams = {
        // token1: 'abcde',
        // token2: '12345'
    };
    editor.config.uploadHeaders = {
        // 'Accept' : 'text/x-json'
    }
     editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
         if (item === 'emotion') {
             return null;
         }
         return item;
     });
    editor.create();
})