# -*-coding:utf-8 -*-
EXCHANGE_RULE = {
    "base":{
        "email_vali": 5,        #邮箱验证
        "telephone_vali": 10,   # 手机验证 
        "indus": 5,             #行业 
        "username":5,           #用户名
    },
    "action":{
        "postevent": 20,        #发布审核通过的活动
        "share_event": 5,       #分享活动
        "attend_event": 0.05,    #参加活动，获取票价的10%
    }        
}
