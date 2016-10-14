#-*-coding:utf-8 -*-
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls import patterns, url
from django.conf import settings

urlpatterns = patterns('',
    #用户登陆
    url(r'^login/$', 'usercenter.views.login'),
    # 获取第三方登录的url
    url(r'^login/account/$','usercenter.views.login_return_curpage'),
    #退出
    url(r'^logout/$','usercenter.views.logout'),
    # 微信登录
    url(r'^wechat/$','usercenter.views.wechatlogin'),
    url(r'^wechat/account/$','usercenter.views.login_return_curpage'),
    # 微信回调函数
    url(r'^wechathandler/$', 'usercenter.views.wechat_callback'),
    # 微信分享加分
    url(r'^wechat_share/$', 'usercenter.views.wechat_share'),
    # QQ回调函数
    url(r'^callback/$', 'usercenter.views.qq_callback'),
    #支付宝登录
    url(r'^alipaycallback/$', 'usercenter.views.alipay_callback'),
    # 用户登陆成功的回调函数
    url(r'^logincallback/(\w+)/$', 'usercenter.views.login_callback'),
    # 用户登陆后的首页
    url(r'^index/$', 'usercenter.views.index_handler'),
    # 个人资料设置
    url(r'^userprofile/$','usercenter.views.setprofile',name='userprofile'),
    # 获取手机验证码
    #url(r'^getauthcode/$','usercenter.views.getauthcode'),
    # 鼠标离开时验证验证码
    #url(r'^verifycode/$','usercenter.views.verifyauthcode'),
    # 前台积分换门票
    url(r'^exchange/$','usercenter.views.exchangeindex'),
    #订单查询
    url(r'^showorder/$','usercenter.views.showOrder'),
    url(r'^showorder/(?P<page>[\d]+)/$','usercenter.views.showOrder'),
    # 我的收藏
    url(r'^showcollection/$','usercenter.views.showCollection'),
    url(r'^showcollection/(?P<page>[\d]+)/$','usercenter.views.showCollection'),
    url(r'^collect/$','usercenter.views.collectevent'),
    url(r'^recommend/$','usercenter.views.recommend_event'),
    # 收藏计数
    url(r'^favor_count/$','usercenter.views.favor_count'),
    # 我的发布
    url(r'^myevent/$','usercenter.views.myevent'),
    url(r'^myevent/(?P<page>[\d]+)/$','usercenter.views.myevent'),
    url(r'^myevent/del/(?P<post_num>[\d]+)/$','usercenter.views.del_post'),
    #url(r'^myevent/order/(?P<eventid>\d+)/$','usercenter.views.showSignupInfo'),
    url(r'^myevent/order/(?P<eventid>\d+)/(?P<page>\d+)/$','usercenter.views.showSignupInfo'),
    #下载报名人信息
    url(r'^downloadorder/$','usercenter.views.downloadParticipators'),
    #积分换门票---选择热门行业
    url(r'^ajax_change_indus/','usercenter.views.get_hotevents'),
    #积分换门票---换一换
    url(r'^ajax_update_share/','usercenter.views.get_shareevents'),
    #兑换礼物
    url(r'^exchange_gifts/','usercenter.views.exchange_gifts'),
    #分享会议到微博
    url(r'^weibo_share_event/','usercenter.views.weibo_share'),
    # 分享到微信，加分
    url(r'^wechat_share_event/','usercenter.views.wechat_share'),
    # 绑定账号
    #url(r'^account/bind/','usercenter.views.bind_account'),
    # 取消账号绑定
    #url(r'^account/cancel/','usercenter.views.cancel_acc_bind'),
    url(r'^publish/edit-(?P<old_event_id>\d+)/','usercenter.views.publish_edit'),

    # 获取行业下的所有预设标签
    url(r'^alltags/$','usercenter.views.get_all_tags_of_cat'),

)


#STATIC_URL
urlpatterns += staticfiles_urlpatterns()
