# -*- coding: utf-8 -*-
from __future__ import division
from operator import itemgetter
from itertools import groupby
import os
import sys
import time, datetime
import json,collections
from random import randint
import requests
import traceback
from socialoauth import SocialSites, SocialAPIError
from helper import Session, UserStorage, gen_session_id

from django.shortcuts import render_to_response,render
from django.template import RequestContext
from django.http import HttpResponse, HttpResponseRedirect
from django.db.models import Sum
from django.views.decorators.csrf import csrf_exempt

from oauth_setting import SOCIALOAUTH_SITES,WECHAT
from credit_setting import EXCHANGE_RULE
from models import *
from userclass import UserInfo, UserEncoder
from event.models import NewEventTable, NewEventCat, NewEventImg
from utils.utils import sendcheckmsg, get_remote_ip
from share_event_view import get_share_event
from order.models import NewOrder,FeeUser,NewOrderMessage
from sponsor.models import SponsorRelate
from usercenter import pagination
from weixin.client import WeixinAPI
from weixin.oauth2 import OAuth2AuthExchangeError
from alipay.alipay_util import *
from common.common import *
import logging
from utils.cacheclient import cache,redis_cache

from django.conf import settings

BASE_DIR = settings.BASE_DIR


#### add by hydra at 14:31 06/29
from cat.models import NewEventCat
from tag.models import NewEventTag
from django.core.exceptions import ObjectDoesNotExist

log = logging.getLogger('website.debug')  


reload(sys)
sys.setdefaultencoding('utf-8')

CURRENT_PATH = os.path.dirname(os.path.realpath(__file__))
sys.path.append(os.path.normpath(os.path.join(CURRENT_PATH, '..')))
IMAGE_PATH = os.path.join(CURRENT_PATH, 'static/images')


def login_required(func):
    def wrapper(request, **args):
        if not get_user_session(request):
            return HttpResponseRedirect('/usercenter/login')
        return func(request, **args)
    return wrapper


def get_user_session(req):
    '''
    return type:dict
    return structure:
    user = {
    'id': xxx,
    'uid': xxx,
    'name': xxx,
    'avatar': xxx
    }
    '''
    try:
        user = req.session['usercenter_user']
    except:
        user = {}
    return user


def login(request):
    '''
    第三方登陆
    读取settings.py中的配置,生成第三方登陆按钮链接
    return value:各个登陆按钮的html代码
    '''
    socialsites = SocialSites(SOCIALOAUTH_SITES)
    link_map = {}
    for _site_class in socialsites.list_sites_class():
        _s = socialsites.get_site_object_by_class(_site_class)
        link_map[_s.site_name] = _s.authorize_url
    if get_user_session(request):
        return HttpResponseRedirect('/usercenter/index')
    link_map['alipay'] = create_quick_login_url()
    
    link_map['head'] = {
	'title':'快捷登陆_活动家',
	'keyword':'登陆,活动家',
	'description':'活动家用户快捷登陆页面。找会议，上活动家！',
	}

    link_map['main_cities'] = get_main_cities()                                       
    link_map['main_cats'] = get_main_cats()
    return render_to_response('login.html', link_map, context_instance=RequestContext(request))


def logout(request):
    '''
    退出登录
    '''
    try:
        del request.session['usercenter_user']
    except:
        return HttpResponseRedirect('/usercenter/login/')
    return HttpResponseRedirect('/usercenter/login/')


def wechatlogin(request):
    '''
    单独处理微信登录
    读取oauth_settings.py中WECHAT的配置，生成url并跳转到二维码页面
    '''
    api = WeixinAPI(appid=WECHAT['APP_ID'],
            app_secret=WECHAT['APP_SECRET'],
            redirect_uri=WECHAT['REDIRECT_URI'])

    redirect_uri = api.get_authorize_login_url(scope=("snsapi_login",))
    return HttpResponseRedirect(redirect_uri)

def wechat_callback(request):
    '''
    微信登录成功后的回调函数
    '''
    # 获取当前登录用户，用于判断是否绑定其他账号的标志
    user = get_user_session(request)
    code = request.GET.get('code', '')
    api = WeixinAPI(appid=WECHAT['APP_ID'],
            app_secret=WECHAT['APP_SECRET'],
            redirect_uri=WECHAT['REDIRECT_URI'])
    auth_info = api.exchange_code_for_access_token(code=code)
    api = WeixinAPI(access_token=auth_info['access_token'])
    resp = api.user(openid=auth_info['openid'])
    sitename = 'wechat'
    # 如不存在登录用户，则不是绑定账号，按新增用户处理；如存在，则为绑定账号操作；
    if not user:
        # 新增用户流程：获取用户的UID,name,avatar;写入uc_user表
        try:
            try:
                hasbind_obj = UserAccountBind.objects.get(account_uid=resp.get('unionid'))
            except:
                hasbind_obj = None

            if hasbind_obj:
                centeruser = hasbind_obj.user_obj
            else:
                centeruser = CenterUser.objects.get(uid=resp.get('unionid'))
                redis_cache.incr('login:wechat')
            centeruser.last_login_date = datetime.datetime.now()
            centeruser.log_count += 1
        except:
            name = resp.get('nickname')
            centeruser = CenterUser(
                name = name,
                uid = resp.get('unionid'),
                avatar = resp.get('headimgurl'),
                log_count = 1,
                login_from = 'wechat',
                active = True,
                register_ip = get_remote_ip(request)
            )
            redis_cache.incr('regist:wechat')
        centeruser.save()

        # 默认已绑定当前登录的用户
        # 今后以此账号为主账号，其他为从账号，个人资料等均显示主账号下设置的资料。
        try:
            hasbind_obj = UserAccountBind.objects.get(account_uid=centeruser.uid)
        except Exception,e:
            hasbind_obj = None
        if not hasbind_obj:
            mainAccount = UserAccountBind(user_obj=centeruser,account_uid=centeruser.uid,
                account_type=sitename)
            mainAccount.save()
        # --- end of 默认绑定------
        
        # user_info = UserInfo(s.uid, s.avatar, s.name)
        user = {
                'id': centeruser.id,
                'telephone':centeruser.telephone,
                'uid': resp.get('unionid'),
                'avatar': resp.get('headimgurl'),
                'name': resp.get('nickname'),
        }
        # request.session['user'] = json.dumps(user_info, cls=UserEncoder)
        request.session['usercenter_user'] = user

        # 修改人：牟波 时间：2015-11-11 15:23
        # 从session获取登录前的url，跳转到登录前的页面
        prev_url = request.session.get('prev_url','')
        if prev_url:
            del request.session['prev_url']
            return HttpResponseRedirect(prev_url)
        # 否则，跳转到index页面
        else:
            return HttpResponseRedirect('/usercenter/index')
    else:
        # 绑定流程：获取被绑定账号的uid，并存入UserAccountBind表
        loginuser = CenterUser.objects.get(id=user['id'])
        slave_uid = resp.get('unionid')
        # 绑定前先查询UserAccountBind表，是否存在当前被绑定账号的记录acc_obj
        try:
            acc_obj = UserAccountBind.objects.get(account_uid=slave_uid)
        except Exception,e:
            log.debug(e)
            acc_obj = None
        # 如果存在绑定记录，则修改acc_obj的user_obj；否则新增绑定记录
        if acc_obj:
             # 判断acc_obj的user_obj是否为当前登录账号
            if acc_obj.user_obj == loginuser:
                pass
            # 修改acc_obj的user_obj为当前登录账号
            else:
                acc_obj.user_obj = loginuser
                acc_obj.save()
        else:
            # 新增绑定记录
            slaveAccount = UserAccountBind(user_obj=loginuser,account_uid=slave_uid,account_type=sitename)
            slaveAccount.save()
        # 返回账号绑定页面
        return HttpResponseRedirect('/usercenter/index/?idx=account/bind/')

def login_callback(request, sitename):
    '''
    第三方登陆成功后的回调函数
    @param sitename type:str weibo/douban
    @param code type:str
    '''
    # 判断session中是否有user？如果有，则表示在绑定账号，否则为登录
    user = get_user_session(request)
    code = request.GET.get('code', '')
    if not code:
        return HttpResponseRedirect('/usercenter/login/')

    socialsites = SocialSites(SOCIALOAUTH_SITES)
    s = socialsites.get_site_object_by_name(sitename)
    try:
        s.get_access_token(code)
    except SocialAPIError as e:
       # 这里可能会发生错误
        raise
    # 如不存在登录用户，则不是绑定账号，按新增用户处理；如存在，则为绑定账号操作；
    if not user:
        # 新增用户流程：获取用户的UID,name,avatar;写入uc_user表
        try:
            # 登录后，先查UserAccountBind表，确认是否有绑定
            try:
                user_bind = UserAccountBind.objects.get(account_uid=s.uid)
            except Exception,e:
                user_bind = None

            if user_bind:
                # 有绑定，则使用绑定后的CenterUser
                centeruser = user_bind.user_obj
            else:
                # 未绑定，则直接查询CenterUser表
                centeruser = CenterUser.objects.get(uid=s.uid)
            key = 'login:%s' % sitename
            redis_cache.incr(key)
            centeruser.last_login_date = datetime.datetime.now()
            centeruser.log_count += 1
        except:
            name = s.name
            centeruser = CenterUser(
                name = name,
                uid = s.uid,
                avatar = s.avatar,
                log_count = 1,
                login_from = sitename,
                active = True,
                register_ip = get_remote_ip(request)
            )
            key = 'regist:%s' % sitename
            redis_cache.incr(key)
        centeruser.save()
        
        # 默认已绑定当前登录的用户
        # 今后以此账号为主账号，其他为从账号，个人资料等均显示主账号下设置的资料。
        try:
            hasbind_obj = UserAccountBind.objects.get(account_uid=centeruser.uid)
        except Exception,e:
            hasbind_obj = None
        if not hasbind_obj:
            mainAccount = UserAccountBind(user_obj=centeruser,account_uid=s.uid,
                account_type=sitename)
            mainAccount.save()
        # --- end of 默认绑定------

        # user_info = UserInfo(s.uid, s.avatar, s.name)
        user = {
            'id': centeruser.id,
            'telephone':centeruser.telephone,
            'uid': s.uid,
            'avatar': s.avatar,
            'name': s.name,
            'access_token': s.access_token,
            'sitename': sitename, 
        }
        # request.session['user'] = json.dumps(user_info, cls=UserEncoder)
        request.session['usercenter_user'] = user
        # 修改人：牟波 时间：2015-11-11 15:23
        # 从session获取登录前的url，跳转到登录前的页面
        prev_url = request.session.get('prev_url','')
        if prev_url:
            del request.session['prev_url']
            return HttpResponseRedirect(prev_url)
        # 否则，跳转到index页面
        else:
            return HttpResponseRedirect('/usercenter/index')
    else:
        # 绑定流程：获取被绑定账号的uid，并存入UserAccountBind表
        loginuser = CenterUser.objects.get(id=user['id'])
        slave_uid = s.uid
        # 绑定前先查询UserAccountBind表，是否存在当前被绑定账号的记录acc_obj
        try:
            acc_obj = UserAccountBind.objects.get(account_uid=slave_uid)
        except Exception,e:
            log.debug(e)
            acc_obj = None
        # 如果存在绑定记录，则修改acc_obj的user_obj；否则新增绑定记录
        if acc_obj:
             # 判断acc_obj的user_obj是否为当前登录账号
            if acc_obj.user_obj == loginuser:
                pass
            # 修改acc_obj的user_obj为当前登录账号
            else:
                acc_obj.user_obj = loginuser
                acc_obj.save()
        else:
            # 新增绑定记录
            slaveAccount = UserAccountBind(user_obj=loginuser,account_uid=slave_uid,account_type='alipay')
            slaveAccount.save()
        # 返回账号绑定页面
        return HttpResponseRedirect('/usercenter/index/?idx=account/bind/')

def alipay_callback(request):
    '''
    支付宝登录成功后的回调函数
    @param sitename:alipay type:str
    @param code type:str
    '''
    # 获取当前登录用户，用于判断是否绑定其他账号的标志
    user = get_user_session(request)
    req_qset = request.GET
    sitename = 'alipay'
    if notify_verify(request):
        # 如不存在登录用户，则不是绑定账号，按新增用户处理；如存在，则为绑定账号操作；
        if not user:
            # 新增用户流程：获取用户的UID,name,avatar;写入uc_user表
            try:
                try:
                    hasbind_obj = UserAccountBind.objects.get(account_uid=req_qset.get('user_id'))
                except:
                    hasbind_obj = None

                if hasbind_obj:
                    centeruser = hasbind_obj.user_obj
                else:
                    centeruser = CenterUser.objects.get(uid=req_qset.get('user_id'))
                centeruser.last_login_date = datetime.datetime.now()
                centeruser.log_count += 1
            except:
                centeruser = CenterUser(
                    name = req_qset.get('real_name'),
                    uid = req_qset.get('user_id'),
                        avatar = 'http://huodongjia-yun.b0.upaiyun.com/static/images/default_avatar.jpg',
                    log_count = 1,
                    login_from = 'alipay',
                    active = True,
                    register_ip = get_remote_ip(request)
                )
            centeruser.save()

            # 默认已绑定当前登录的用户
            # 今后以此账号为主账号，其他为从账号，个人资料等均显示主账号下设置的资料。
            try:
                hasbind_obj = UserAccountBind.objects.get(account_uid=centeruser.uid)
            except Exception,e:
                hasbind_obj = None
            if not hasbind_obj:
                mainAccount = UserAccountBind(user_obj=centeruser,account_uid=centeruser.uid,account_type=sitename)
                mainAccount.save()
            # --- end of 默认绑定------
            user = {
                'id': centeruser.id,
                'telephone':centeruser.telephone,
                'uid': req_qset.get('user_id'),
                'avatar': 'http://huodongjia-yun.b0.upaiyun.com/static/images/default_avatar.jpg',
                'name': req_qset.get('real_name'),
                'sitename': 'alipay',
            }
            request.session['usercenter_user'] = user
            # 修改人：牟波 时间：2015-11-11 15:23
            # 从session获取登录前的url，跳转到登录前的页面
            prev_url = request.session.get('prev_url','')
            if prev_url:
                del request.session['prev_url']
                return HttpResponseRedirect(prev_url)
            # 否则，跳转到index页面
            else:
                return HttpResponseRedirect('/usercenter/index')
        else:
            # 绑定流程：获取被绑定账号的uid，并存入UserAccountBind表
            loginuser = CenterUser.objects.get(id=user['id'])
            slave_uid = req_qset.get('user_id')
            # 绑定前先查询UserAccountBind表，是否存在当前被绑定账号的记录acc_obj
            try:
                acc_obj = UserAccountBind.objects.get(account_uid=slave_uid)
            except Exception,e:
                log.debug(e)
                acc_obj = None
            # 如果存在绑定记录，则修改acc_obj的user_obj；否则新增绑定记录
            if acc_obj:
                # 判断acc_obj的user_obj是否为当前登录账号
                if acc_obj.user_obj == loginuser:
                    pass
                # 修改acc_obj的user_obj为当前登录账号
                else:
                    acc_obj.user_obj = loginuser
                    acc_obj.save()
            else:
                # 新增绑定记录
                slaveAccount = UserAccountBind(user_obj=loginuser,account_uid=slave_uid,account_type='alipay')
                slaveAccount.save()
            # 返回账号绑定页面
            return HttpResponseRedirect('/usercenter/index/?idx=account/bind/')
    else:
        return HttpResponseRedirect('/usercenter/login/')
        

def qq_callback(request):
    '''
    QQ登录成功后的回调函数
    @param sitename:qq type:str
    @param code type:str
    '''
    # 获取当前登录用户，用于判断是否绑定其他账号的标志
    user = get_user_session(request)
    code = request.GET.get('code', '')
    if not code:
        return HttpResponseRedirect('/usercenter/login/')
    sitename = 'qq'
    socialsites = SocialSites(SOCIALOAUTH_SITES)
    s = socialsites.get_site_object_by_name(sitename)
    try:
        s.get_access_token(code)
    except SocialAPIError as e:
       # 这里可能会发生错误
        raise
    # 获取session中的user，作为是否绑定账号的标志 
    if not user:
        # 查询当前登录账号是否与其他账号绑定 
        try:
            hasbind_obj = UserAccountBind.objects.get(account_uid=s.uid)
        except Exception,e:
            hasbind_obj = None
        
        # 如绑定则查找绑定的账号，否则查询CenterUser表
        if hasbind_obj:
            centeruser = hasbind_obj.user_obj
        else:
            try:
                centeruser = CenterUser.objects.get(uid=s.uid)
            except:
                centeruser = None
        # centeruser存在，记录登录时间,登录次数+1，保存
        # 如果不存在，则视为新用户，新增
        if centeruser:
            key = 'login:%s' % sitename
            redis_cache.incr(key)
            centeruser.last_login_date = datetime.datetime.now()
            centeruser.log_count += 1
        else:
            name = s.name
            centeruser = CenterUser(
                name = name,
                uid = s.uid,
                avatar = s.avatar,
                log_count = 1,
                login_from = sitename,
                active = True,
                register_ip = get_remote_ip(request)
            )
            key = 'regist:%s' % sitename
            redis_cache.incr(key)
        centeruser.save()

        # 默认已绑定当前登录的用户
        # 今后以此账号为主账号，其他为从账号，个人资料等均显示主账号下设置的资料。
        try:
            hasbind_obj = UserAccountBind.objects.get(account_uid=centeruser.uid)
        except Exception,e:
            hasbind_obj = None
        if not hasbind_obj:
            mainAccount = UserAccountBind(user_obj=centeruser,account_uid=s.uid,account_type=sitename)
            mainAccount.save()
        # --- end of 默认绑定------
       
       # user_info = UserInfo(s.uid, s.avatar, s.name)
        user = {
            'id': centeruser.id,
            'telephone':centeruser.telephone,
            'uid': s.uid,
            'avatar': s.avatar,
            'name': s.name,
            'sitename': sitename, 
        }
        # request.session['user'] = json.dumps(user_info, cls=UserEncoder)
        request.session['usercenter_user'] = user
        # 修改人：牟波 时间：2015-11-11 15:23
        # 从session获取登录前的url，跳转到登录前的页面
        prev_url = request.session.get('prev_url','')
        if prev_url:
            del request.session['prev_url']
            return HttpResponseRedirect(prev_url)
        # 否则，跳转到index页面
        else:
            return HttpResponseRedirect('/usercenter/index')
    else:
        # 绑定流程：获取被绑定账号的uid，并存入UserAccountBind表
        loginuser = CenterUser.objects.get(id=user['id'])
        slave_uid = s.uid
        # 绑定前先查询UserAccountBind表，是否存在当前被绑定账号的记录acc_obj
        try:
            acc_obj = UserAccountBind.objects.get(account_uid=slave_uid)
        except Exception,e:
            log.debug(e)
            acc_obj = None
        # 如果存在绑定记录，则修改acc_obj的user_obj；否则新增绑定记录
        if acc_obj:
            # 判断acc_obj的user_obj是否为当前登录账号
            if acc_obj.user_obj == loginuser:
                pass
            # 修改acc_obj的user_obj为当前登录账号
            else:
                acc_obj.user_obj = loginuser
                acc_obj.save()
        else:
            # 新增绑定记录
            slaveAccount = UserAccountBind(user_obj=loginuser,account_uid=slave_uid,account_type=sitename)
            slaveAccount.save()
        # 返回账号绑定页面
        return HttpResponseRedirect('/usercenter/index/?idx=account/bind')

@login_required
def index_handler(request):
    main_cats = get_main_cats() 
    main_cities = get_main_cities()
    user = get_user_session(request)
    loginUser = CenterUser.objects.get(id=user['id'])
    show_remind = loginUser.status
    head = {
	'title':'个人中心_活动家',
	'keyword':'用户,个人中心,活动家',
	'description':'活动家用户个人中心。找会议，上活动家！',
	}
    return render_to_response('user_base.html',{'main_cats': main_cats, 'main_cities': main_cities, 'head': head, 'login_user': loginUser, 'show_remind': show_remind},context_instance=RequestContext(request))


@login_required
def usercenter(request):
    return render_to_response('usercenter_index.html',{'user': get_user_session(request)})


@login_required
def setprofile(request):
    '''
    设置个人资料
    '''
    usercredit = 0
    creditcontent = ''
    user = get_user_session(request)
    user_id = int(user['id'])
    uid = user['uid']
    #session_tel = user['telephone']

    if request.method == 'POST':
        username = request.POST.get('username','').strip()
        sex = request.POST.get('usersex','')
        industry = request.POST.get('industry','')
        telephone = request.POST.get('telephone','').strip()
        email = request.POST.get('email','').strip()
        
        ######################################################
        # Version 2.1  modified by hydra at 11:43 06/29

        # --- add new field : tag ---
        tags = request.POST.get('tags',None)
        
        # ---- backup old  -----
        #authcode = request.POST.get('authcode','').strip()

        #cachecode = cache.get(str(telephone))
        # 未修改手机号，无需验证码
        #if session_tel == telephone and telephone:
        #    # 查询数据库，是否存在该用户
        #    try:
        #        curuser = CenterUser.objects.get(uid=uid)
        #    except Exception,e:
        #        curuser = None
        #    # 如果存在
        #    if curuser:
        #        curuser = CenterUser.objects.get(id=user_id)
        #    # 如果存在
        #    if curuser:
        #        curuser.name = username
        #        curuser.sex = sex
        #        curuser.industry = industry
        #        curuser.telephone = telephone
        #        curuser.email = email
        #        curuser.save()
        #    return HttpResponse(json.dumps({'code':1}))

        # 判断验证码是否正确
        #if not cachecode:
        #    msg = '验证码已失效，请重新获取'
        #    return HttpResponse(msg)
        #if authcode != cachecode:
        #    msg = '验证码错误，请重新填写'
        #    return HttpResponse(msg)

        # 计算更改用户资料的积分
        if username:
            usercredit += EXCHANGE_RULE['base']['username']
            creditcontent += 'username|'
        if telephone:
            usercredit += EXCHANGE_RULE['base']['telephone_vali']
            creditcontent += 'telephone|'
        if email:
            usercredit += EXCHANGE_RULE['base']['email_vali']
            creditcontent += 'email|'

        # 性别
        if sex == '1':
            sex = True
        else:
            sex = False

        # 查询数据库，是否存在该用户
        try:
            curuser = CenterUser.objects.get(id=user_id)
        except:
            curuser = None
        # 如果存在
        if curuser:
            curuser.name = username
            curuser.sex = sex
            curuser.industry = industry
            curuser.tags = tags
            curuser.telephone = telephone
            curuser.email = email
            curuser.save()

            # -------- OVER ----------
                    

            if (not curuser.status) and telephone:
                tel_user = CenterUser.objects.filter(telephone=telephone)
                # 未注册前的订单 
                notreg_order = NewOrder.objects.filter(order_tel=telephone).filter(order_status__in=[10, 20])
                if tel_user:
                    cre_val = 0
                    if notreg_order:
                        cre_val = int(int(sum(_order.order_totalpay for _order in notreg_order)) * 0.05)
                    # 确认该账号未被初始化
                    if not UserCredit.objects.filter(content='initorder' + telephone):
                        order_credit = UserCredit(content='initorder' + telephone,cre_val=cre_val)
                        order_credit.save()
                        order_ucr = UserCreditRelate(user_obj=tel_user.all()[0],credit=order_credit)
                        order_ucr.save()

                u_credit = UserCredit(content=creditcontent,cre_val=usercredit)
                u_credit.save()
                ucr = UserCreditRelate(user_obj=curuser,credit=u_credit)
                ucr.save()
                curuser.status = 1
                curuser.save()
                old_events = NewEventTable.objects.filter(from_info__tel=telephone).\
                        exclude(event_ucpost__user_obj=curuser)
                for _event in old_events:
                    upe = UserPostEvent(
                        user_obj=curuser,
                        event=_event,
                    )
                    upe.save()
        
            return HttpResponse(json.dumps({'code':1}))
        return HttpResponse(json.dumps({'code':1}))
    else:
        try:
            #curuser = CenterUser.objects.get(uid=uid)
            # 查询当前登录账号是否绑定到其他账号下，如果有，则显示主账号下设置的个人资料
            hasBind = UserAccountBind.objects.get(account_uid=uid)
            curuser = hasBind.user_obj
            if not curuser:
                curuser = CenterUser.objects.get(id=user_id)
        except Exception,e:
            curuser = None
        
        selected_tags = curuser.tags.split(',') if curuser.tags else []
        industry = curuser.industry if curuser.industry else 2
        for_select_tags = NewEventCat.objects.get(pk=industry).tag.all().values_list('name',flat=True)
        for_select_tags = list(set(for_select_tags) - set(selected_tags))
        catids = [2, 4, 3, 6, 9,118,120,122,124,126,128,96]
        industry_list = format_cat(*catids)
        
        for item in industry_list:
            if item['id'] == int(industry):
                item['selected'] = 1
            else:
                item['selected'] = 0
        
        return render_to_response('userprofile.html',{'curuser':curuser,'selected':selected_tags,\
        'for_select':for_select_tags,'industry':industry_list},context_instance=RequestContext(request))

## Add by hydra at 15:23 2016/06/29
@login_required
def get_all_tags_of_cat(request):
    """
    获取行业下面的所有预设标签
    params: id
    return: tag's name.  type:list
    """
    ret = []
    user = get_user_session(request)
    user_obj = CenterUser.objects.get(id=user['id'])

    cat = request.GET.get('cat',None)

    selected_tags = user_obj.tags.split(',') if user_obj.tags else ''
    if cat:
        all_tags = list(NewEventCat.objects.get(pk=cat)\
        .tag.all().values_list('name',flat=True))
        for_select_tags = list(set(all_tags) - set(selected_tags))
    else:
        pass
    
    ret.append(selected_tags)
    ret.append(for_select_tags)

    return HttpResponse(json.dumps(ret))

## ----------- OVER -----------------------------
    


@csrf_exempt
def getauthcode(request):
    '''
    获取手机验证码
    '''
    telephone = request.POST.get('telephone','')
    # 调用发送短信接口，返回是否发送成功
    result = sendcheckmsg(telephone)
    return HttpResponse(json.dumps(result))

@login_required
def exchangeindex(request):
    '''
    积分换门票展示页
    '''
    user = get_user_session(request)
    user_obj = CenterUser.objects.get(id=user['id'])
    telephone = user_obj.telephone

    #用户现有总积分
    credit_value_sum = get_total_credit(user_obj.id)

    # 礼品、门票展示
    try:
        gifts = UserGift.objects.filter(expired_time__gt=datetime.datetime.now()).order_by('credit')
        min_gift_value = gifts[0].credit
    except:
        gifts = []
        min_gift_value = 0

    #设置兑换状态以及进度条百分比
    base_progress_value = 5000 #进度条基数
    if min_gift_value - credit_value_sum > 0:
        exchange_status = 0
        exchange_d_value = min_gift_value - credit_value_sum
    else:
        exchange_status = 1
        exchange_d_value = 0
    # 没有可兑换的礼品
    if min_gift_value == 0:
        exchange_status = 2
        exchange_d_value = 0
    # End of 设置兑换状态
    # 将以下活动分享到社交平台可获得积分

    events = get_share_event()
    events = events[:4]
    #End of 将以下活动分享到社交平台可获得积分
    # 行业
    cat_id_list = [2, 6, 4, 3, 9, 96,]
    indus = NewEventCat.objects.filter(id__in=cat_id_list)
    #待付款活动
    pay_orders = NewOrder.objects.filter(order_tel=telephone).\
            filter(order_status=0).filter(event__begin_time__gt=datetime.datetime.now())
    pay_order_list = []
    for _pay_orders in pay_orders:
        _dict = {}
        _dict['id'] = _pay_orders.order_number
        _dict['img'] = ''
        if _pay_orders.event.img.all():
            _dict['img'] = 'http://huodongjia-yun.b0.upaiyun.com/' + _pay_orders.event.img.all()[0].urls
        _dict['name'] = _pay_orders.event.name
        try:
            _dict['city'] = _pay_orders.event.city.all()[0].district_name
        except:
            _dict['city'] = ''
        _dict['begin_time'] = _pay_orders.event.begin_time
        _dict['total_price'] = int(_pay_orders.order_totalpay)
        _dict['order_credit'] = int(int(_pay_orders.order_totalpay) * EXCHANGE_RULE['action']['attend_event'])
        _dict['order_id'] = _pay_orders.order_id
        _dict['event_id'] = _pay_orders.event.old_event_id
        pay_order_list.append(_dict)
    paid_status = 0
    if pay_order_list:
        # 待付款状态，1表示仍有订单需要处理
        paid_status = 1
    #End of 待付款活动


    data = {
            'login_user': user_obj,
            'telephone': telephone,
            'exchange_status': exchange_status,
            'credit_value_sum': credit_value_sum,
            'base_progress_value': base_progress_value,
            'exchange_d_value': exchange_d_value,
            'gain_gifts': show_user_gifts(request),
            'gifts': gifts,
            'hot_events': events,
            #'hot_events': hot_events,
            'indus': indus,
            'paid_status': paid_status,
            'pay_orders': pay_order_list,
            'pay_orders_totalvalue': int(sum(_pay_order['order_credit'] for _pay_order in pay_order_list)),
    }
    return render_to_response('exchange.html', data,context_instance=RequestContext(request))


def show_user_gifts(request):
    '''
    显示用户未过期且兑换过的礼品
    '''
    user = get_user_session(request)
    gifts_id = UserGiftRelate.objects. \
                filter(recv_info__user_obj=CenterUser(user['id'])).values_list('gift_id', flat=True)
    #gain_gifts = UserGift.objects.filter(expired_time__gt=datetime.datetime.now()). \
    #                filter(id__in=gifts_id)
   
    # 计算已兑换礼物中每个礼物的数量
    dic = collections.Counter(gifts_id)
    gain_gifts = []
    for key in dic.keys():
        gift_dict = {}
        gift = UserGift.objects.filter(expired_time__gt=datetime.datetime.now()). \
                    filter(id=key)
        if gift:
            gift_dict['gift'] = gift.all()[0]
        gift_dict['quantity'] = dic.get(key)
        
        gain_gifts.append(gift_dict)
    # ---- End -----
    return gain_gifts

@login_required
def showOrder(request,page=1):
    '''
    个人中心订单展示
    '''
    ret = {}
    order_lst = []
    order_lst_1 = []
    order_lst_2 = []
    user = get_user_session(request)
    try:
        center_user = CenterUser.objects.get(id=user['id'])
        telephone = center_user.telephone
        cat_id = center_user.industry
        user = {'id':user['id'],'mobilephone': telephone,'industry':cat_id}
    except Exception,e:
        log.debug(e)
    if user:
        user_id = user.get('id',None)
        user_phone = user.get('mobilephone',None)
        user_industry = user.get('industry',None)
        ret['recommend_events'] = get_share_event(user_industry)
        if user_id:
            try:
                try:
                    userorderqset = UserOrderRelate.objects.filter(user_obj__id=int(user_id))
                    order_pay_status_dct = {0:u'未付款',10:u'已付款',20:u'已付款',30:u'已退款'}
                    order_status_dct = {0:u'未处理',10:u'待财务确认',20:u'正在出库',30:u'已发货',50:u'交易完成',60:u'退货中',70:u'已退货',100:u'已取消',110:u'已作废',200:u'已开发票'}
                    if userorderqset:
                        for userorderobj in userorderqset:
                            user_order_dct = {}
                            user_order_dct['user_name'] = userorderobj.order.order_user_name
                            user_order_dct['user_phone'] = userorderobj.order.order_tel
                            user_order_dct['order_addtime'] = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(userorderobj.order.order_addtime))
                            user_order_dct['order_num'] = userorderobj.order.order_number
                            user_order_dct['order_event_name'] = userorderobj.order.event.name
                            try:
                                user_order_dct['order_event_city'] = userorderobj.order.event.city.all()[0].district_name
                            except Exception,e:
                                user_order_dct['order_event_city'] = userorderobj.order.event.city.all()[0].district_name
                            try:
                                user_order_dct['order_event_begin_time'] = datetime.datetime.strftime(userorderobj.order.event.begin_time,'%Y-%m-%d %H:%M:%S')
                            except Exception,e:
                                user_order_dct['order_event_begin_time'] = ''
                            user_order_dct['order_price'] = float(userorderobj.order.order_price)
                            try: 
                                user_order_dct['order_event_img'] = userorderobj.order.event.img.all()[0].urls
                            except Exception,e:
                                user_order_dct['order_event_img'] = 'static/images/st2.jpg'
                            user_order_dct['order_amount'] = userorderobj.order.order_amount
                            user_order_dct['order_totalpay'] = float(userorderobj.order.order_totalpay)
                            user_order_dct['order_pay_status'] = order_pay_status_dct.get(userorderobj.order.order_status,'')
                            user_order_dct['order_status'] = order_status_dct.get(userorderobj.order.order_pay_status,'')
                            user_order_dct['order_event_id'] = userorderobj.order.event.old_event_id

                            order_lst_1.append(user_order_dct)
                except Exception,e:
                    log.debug(e)
                if user_phone:
                    orderqset = NewOrder.objects.filter(order_tel=user_phone)
                    if orderqset:
                        for orderobj in orderqset:
                            user_order_dct = {}
                            user_order_dct['user_name'] = orderobj.order_user_name
                            user_order_dct['user_phone'] = orderobj.order_tel
                            user_order_dct['order_addtime'] = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(orderobj.order_addtime))
                            user_order_dct['order_num'] = orderobj.order_number
                            user_order_dct['order_event_name'] = orderobj.event.name
                            user_order_dct['order_price'] = float(orderobj.order_price)
                            try:
                                user_order_dct['order_event_begin_time'] = datetime.datetime.strftime(orderobj.event.begin_time,'%Y-%m-%d %H:%M:%S')
                            except:
                                user_order_dct['order_event_begin_time'] = ''

                            try:
                                user_order_dct['order_event_city'] = orderobj.event.city.all()[0].district_name
                            except Exception,e:
                                user_order_dct['order_event_city'] = ''
                            try:
                                user_order_dct['order_event_img'] = orderobj.event.img.all()[0].urls
                            except Exception,e:
                                user_order_dct['order_event_img'] = 'static/images/st2.jpg'

                            user_order_dct['order_amount'] = orderobj.order_amount
                            user_order_dct['order_totalpay'] = float(orderobj.order_totalpay)
                            user_order_dct['order_pay_status'] = order_pay_status_dct.get(orderobj.order_status,'')
                            user_order_dct['order_status'] = order_status_dct.get(orderobj.order_pay_status,'')
                            user_order_dct['order_event_id'] = orderobj.event.old_event_id
                            order_lst_2.append(user_order_dct)

                    #免费订单
                    order_lst_3 = []
                    _fee_order_qset = FeeUser.objects.filter(phone=user_phone)
                    for _order in _fee_order_qset:
                        user_order_dct = {}
                        user_order_dct['user_name'] = _order.name
                        user_order_dct['user_phone'] = _order.phone
                        user_order_dct['order_num'] = ''
                        try:
                            user_order_dct['order_addtime'] = datetime.datetime.strftime(_order.last_edit_time, '%Y-%m-%d %H:%M:%S')
                            user_order_dct['order_event_name'] = _order.event.name
                            user_order_dct['order_event_begin_time'] = datetime.datetime.strftime(_order.event.begin_time,'%Y-%m-%d %H:%M:%S')
                            if _order.event.city.all():
                                user_order_dct['order_event_city'] = _order.event.city.all()[0].district_name
                            else:
                                user_order_dct['order_event_city'] = ''
                            if _order.event.img.all():
                                user_order_dct['order_event_img'] = _order.event.img.all()[0].urls
                            else:
                                user_order_dct['order_event_img'] = 'static/images/st2.jpg'
                        except Exception, e:
                            log.debug(traceback.print_exc())
                            log.debug(e)
                        user_order_dct['order_price'] = 0
                        user_order_dct['order_amount'] = 1
                        user_order_dct['order_totalpay'] = 0
                        user_order_dct['order_pay_status'] = ''
                        user_order_dct['order_status'] = ''
                        user_order_dct['order_event_id'] = _order.event.old_event_id
                        order_lst_3.append(user_order_dct)

                order_lst = order_lst_1 + order_lst_2
                #订单去重
                new_order_lst = []
                try:
                    order_lst.sort(key=itemgetter('order_num'))
                    for val,group in groupby(order_lst,key=itemgetter('order_num')):
                        new_order_lst.append(group.next())
                    new_order_lst.extend(order_lst_3)
                    new_order_lst.reverse()
                 
                except Exception,e:
                    log.debug(e)
                    
                #分页数据
                #计算总页数
                offset = 5
                #try:
                if not len(new_order_lst) % offset == 0:
                        totalpage = int(len(new_order_lst) // offset) + 1
                else:
                    totalpage = int(len(new_order_lst) // offset)
                page_obj = pagination.pagination(request.GET,totalpage,page,offset,request.get_full_path())
                (curpage,offset) = page_obj.getCurpageOffset()
                start = (curpage-1)*offset
                end = curpage*offset
                ret['order_lst'] = new_order_lst[start:end]
                #分页显示
                (firstPage,lastPage,prePage,nextPage,pageList) = page_obj.getPageInfo()

                ret['firstPage'] = firstPage
                ret['lastPage'] = lastPage
                ret['prePage'] = prePage
                ret['nextPage'] = nextPage
                ret['pageList'] = pageList

                if request.GET.get('json',None):
                    return HttpResponse(json.dumps(ret),content_type='application/json')
                return render_to_response('showOnselfOrder.html',ret,context_instance=RequestContext(request))
            except Exception,e:
                log.debug(e)
                log.debug(traceback.print_exc())
                order_lst = []
                ret['order_lst'] = order_lst
                if request.GET.get('json',None):
                    return HttpResponse(json.dumps(ret),content_type='application/json')

                return render_to_response('showOnselfOrder.html',ret,context_instance=RequestContext(request))
        else:
            return HttpResponseRedirect('/usercenter/login/')

    else:
        return HttpResponseRedirect('/usercenter/login/')

@login_required
def collectevent(request):
    '''
    处理用户的"收藏"请求
    '''
    user = get_user_session(request)
    if user:
        user_id = user.get('id','')
        if user_id:
            curuser = CenterUser.objects.get(id=int(user_id))
            old_event_id = request.GET.get('eventid', 0)
            curevent = NewEventTable.objects.get(old_event_id=int(old_event_id))
            try:
                ufavor = UserFavorEvent.objects.get(user_obj=curuser, event=curevent)
                return HttpResponse(json.dumps({'code':2}))
            except Exception,e:
                pass
            try:
                favorevent = UserFavorEvent(user_obj=curuser,event=curevent)
                favorevent.save()
                return HttpResponse(json.dumps({'code':1}))
            except Exception,e:
                log.debug(e)
                return HttpResponse(json.dumps({'code':0}))
        else:
            return HttpResponseRedirect('/usercenter/login/')
    else:
        return HttpResponseRedirect('/usercenter/login/')


def showPageCollectevent(request, old_event_id):
    user = get_user_session(request)
    if user:
        user_id = user.get('id','')
        if user_id:
            curuser = CenterUser.objects.get(id=int(user_id))
            curevent = NewEventTable.objects.get(old_event_id=old_event_id)
            try:
                user = UserFavorEvent.objects.get(user_obj=curuser, event=curevent)
                return 1
            except:
                return 0
    return 0


@login_required
def showCollection(request,page=1):
    '''
    "我的收藏"，展示用户收藏的活动
    '''
    ret = {}
    collection_lst = []
    user = get_user_session(request)
    user = {'id':user['id']}
    if user:
        user_id = user.get('id','')
        if user_id:
            try:
                collectionset = UserFavorEvent.objects.filter(user_obj__id=int(user_id)).order_by('-id')
                if collectionset:
                    # 分页，计算总页数
                    offset = 5
                    if not collectionset.count() % offset == 0:
                        totalpage = int(collectionset.count() // offset) + 1
                    else:
                        totalpage = collectionset.count() // offset
                    page_obj = pagination.pagination(request.GET,totalpage,page,offset,request.get_full_path())
                    (curpage,offset) = page_obj.getCurpageOffset()
                    start = (curpage-1) * offset
                    end = curpage * offset
                    for collc_obj in collectionset[start:end]:
                        collection_dict = {}
                        collection_dict['old_event_id'] = collc_obj.event.old_event_id
                        try:
                            event_img = collc_obj.event.img.all()[0].urls
                        except Exception, e:
                            event_img = ''
                            log.debug(e)

                        collection_dict['event_img'] = event_img

                        collection_dict['event_name'] = collc_obj.event.name
                        try:
                            event_city = collc_obj.event.city.all()[0].district_name
                        except Exception,e:
                            log.debug(e)
                        collection_dict['event_city'] = event_city

                        begintime = collc_obj.event.begin_time
                        event_time = begintime.strftime('%Y-%m-%d')
                        collection_dict['event_time'] = event_time

                        flag = 0
                        endtime = collc_obj.event.end_time
                        curdate = datetime.datetime.now()
                        days = 0
                        # 修改"成功举办"的判断条件为：当前时间-结束时间>=1天
                        if (curdate-endtime).days > 0:
                            flag = 1
                        if curdate < begintime:
                            flag = 2
                            days = (begintime - curdate).days
                        collection_dict['event_status'] = flag
                        collection_dict['day'] = days
                        collection_lst.append(collection_dict)
                        # 分页显示

                        (firstPage,lastPage,prePage,nextPage,pageList) = page_obj.getPageInfo()
                        ret['firstPage'] = firstPage
                        ret['lastPage'] = lastPage
                        ret['prePage'] = prePage
                        ret['nextPage'] = nextPage
                        ret['pageList'] = pageList
                        ret['collect_lst'] = collection_lst
                else:
                    collection_lst = []
                return render_to_response('showCollection.html',ret,context_instance=RequestContext(request))
            except Exception,e:
                collection_lst = []
                ret['collect_lst'] = collection_lst

                return render_to_response('showCollection.html',ret,context_instance=RequestContext(request))
        else:
            return HttpResponseRedirect('/usercenter/login/')
    else:
        return HttpResponseRedirect('/usercenter/login/')

def showSignupInfo(request,page=1,eventid=None):
    '''
    当前活动的订单信息分页展示
    '''
    ret = {}
    event = NewEventTable.objects.get(old_event_id=eventid)
    order_qs = None
    order_info = []
    try:
        if event.Price.Type.id == 6:
            order_qs = NewOrder.objects.filter(order_status=10,event_name=event.name)
            
            # 分页，计算总页数
            offset = 5
            if not order_qs.count() % offset == 0:
                totalpage = int(order_qs.count()/offset) + 1
            else:
                totalpage = int(order_qs.count()/offset)
            page_obj = pagination.pagination(request.GET,totalpage,page,offset,request.get_full_path())
            (curpage,offset) = page_obj.getCurpageOffset()
            start = (curpage-1) * offset
            end = curpage * offset
            
            # 分页显示
            (firstPage,lastPage,prePage,nextPage,pageList) = page_obj.getPageInfo()
            ret['firstPage'] = firstPage
            ret['lastPage'] = lastPage
            ret['prePage'] = prePage
            ret['nextPage'] = nextPage
            ret['pageList'] = pageList
            
            for _order in order_qs[start:end]:
                tmp = {}
                tmp['username'] = _order.order_user_name
                tmp['telephone'] = _order.order_tel
                tmp['email'] = _order.order_email
                tmp['company'] = _order.company
                tmp['job'] = _order.job
                order_info.append(tmp)
        elif event.Price.Type.id == 4:
            order_qs = FeeUser.objects.filter(event__name=event.name)
            # 分页，计算总页数
            offset = 5
            if not order_qs.count() % offset == 0:
                totalpage = int(order_qs.count()/offset) + 1
            else:
                totalpage = int(order_qs.count()/offset)
            page_obj = pagination.pagination(request.GET,totalpage,page,offset,request.get_full_path())
            (curpage,offset) = page_obj.getCurpageOffset()
            start = (curpage-1) * offset
            end = curpage * offset
            
            # 分页显示
            (firstPage,lastPage,prePage,nextPage,pageList) = page_obj.getPageInfo()
            ret['firstPage'] = firstPage
            ret['lastPage'] = lastPage
            ret['prePage'] = prePage
            ret['nextPage'] = nextPage
            ret['pageList'] = pageList
            for _order in order_qs[start:end]:
                tmp = {}
                tmp['username'] = _order.name
                tmp['telephone'] = _order.phone
                tmp['email'] = _order.email
                tmp['company'] = _order.company
                tmp['job'] = _order.job
                order_info.append(tmp)
        else:
            order_qs = NewOrderMessage.objects.filter(event_name=event.name)
            # 分页，计算总页数
            offset = 5
            if not order_qs.count() % offset == 0:
                totalpage = int(order_qs.count()/offset) + 1
            else:
                totalpage = int(order_qs.count()/offset)
            page_obj = pagination.pagination(request.GET,totalpage,page,offset,request.get_full_path())
            (curpage,offset) = page_obj.getCurpageOffset()
            start = (curpage-1) * offset
            end = curpage * offset
            
            # 分页显示
            (firstPage,lastPage,prePage,nextPage,pageList) = page_obj.getPageInfo()
            ret['firstPage'] = firstPage
            ret['lastPage'] = lastPage
            ret['prePage'] = prePage
            ret['nextPage'] = nextPage
            ret['pageList'] = pageList
            for _order in order_qs[start:end]:
                tmp = {}
                tmp['username'] = _order.msg_name
                tmp['telephone'] = _order.msg_tel
                tmp['email'] = _order.msg_email
                tmp['company'] = _order.company
                tmp['job'] = _order.job
                order_info.append(tmp)
    except Exception,e:
        log.debug(e)
    

    ret['orderlist'] = order_info
    if request.GET.get('json',None):
        return HttpResponse(json.dumps(ret), content_type='application/json')
    
    return HttpResponse(json.dumps(ret), content_type='application/json')

def myevent(request,page=1):
    '''
    "我的发布"，展示用户发布的所有活动
    '''
    ret = {}
    event_list = []

    today = datetime.datetime.now()

    user = get_user_session(request)
    user = {'id':user['id']}
    if user:
        user_id = user.get('id','')
        if user_id:
            try:
                eventset = UserPostEvent.objects.filter(user_obj__id=int(user_id)).order_by('-event__create_time')
                status_dict = {0:0,1:1}
                if eventset:
                    # 分页，计算总页数
                    offset = 5
                    if not eventset.count() % offset == 0:
                        totalpage = int(eventset.count()/offset) + 1
                    else:
                        totalpage = int(eventset.count()/offset)
                    page_obj = pagination.pagination(request.GET,totalpage,page,offset,request.get_full_path())
                    (curpage,offset) = page_obj.getCurpageOffset()
                    start = (curpage-1) * offset
                    end = curpage * offset
                    for item in eventset[start:end]:
                        event_dict = {}
#                        order = NewOrder.objects.filter(event_name=item.event.name).values('event_name').annotate(sum_amount=Sum('order_amount'))
                        if item.event.Price:
                            if item.event.Price.Type.id == 6:
                                order_qs = NewOrder.objects.filter(order_status=10,event_name=item.event.name)
                            elif item.event.Price.Type.id == 4:
                                order_qs = FeeUser.objects.filter(event__name=item.event.name)
                            else:
                                order_qs = NewOrderMessage.objects.filter(event_name=item.event.name)

                            if order_qs.exists():
                                event_dict['event_sign_num'] = order_qs.count()
                            else:
                                event_dict['event_sign_num'] = 0
                        event_dict['event_id'] = item.event.id
                        event_dict['old_event_id'] = item.event.old_event_id
                        try:
                            event_img = item.event.img.all()[0].urls
                        except:
                            event_img = ''
                        event_dict['event_img'] = event_img
                        event_dict['event_name'] = item.event.name
                        try:
                            event_city = item.event.city.all()[0].district_name
                        except:
                            event_city = ''
                        event_dict['event_city'] = event_city
                        
                        try:
                            begintime = item.event.begin_time
                            event_time = begintime.strftime('%Y-%m-%d')
                        except:
                            event_time = ''
                        event_dict['event_time'] = event_time
                        # 发布时间=create_time
                        try:
                            create_time = item.event.create_time
                            create_time = create_time.strftime("%Y-%m-%d %H:%m")
                        except:
                            create_time = ''
                        event_dict['create_time'] = create_time
                        # release_time(发布时间)
                        try:
                            release_time = item.event.release_time
                            releasetime = release_time.strftime("%Y-%m-%d %H:%m")
                        except:
                            releasetime = ''
                        event_dict['releasetime'] = releasetime
                        try:
                            event_dict['status'] = item.event.isshow.id
                            if item.event.isshow.id == 2:
                                try:
                                    event_dict['info'] = SponsorRelate.objects.get(event=item.event).failed_info
                                except Exception, e:
                                    event_dict['info'] = ''
                        except Exception, e:
                            event_dict['status'] = 0

                        # ------  Add by hydra at 17:42 2016/06/29  --------
                        # 是否可编辑
                        if item.event.end_time < today:
                            event_dict['editable'] = 0
                        else:
                            event_dict['editable'] = 1
                        
                        # 会议的收藏数
                        collected = UserFavorEvent.objects.filter(event=item).count()
                        event_dict['collected'] = collected

                        # 会议的关注数
                        attention = item.event.visit
                        if not attention:
                            attention = redis_cache.get('view:detail:%s' % item.id)

                        event_dict['attention'] = attention

                        # ---------  OVER  -----------------

                        # event_dict['event_status'] = status_dict.get(1,'')
                        # event_dict['event_visit'] = visit_dict.get(0,'')
                        event_list.append(event_dict)
                        # 分页显示
                        (firstPage,lastPage,prePage,nextPage,pageList) = page_obj.getPageInfo()
                        ret['firstPage'] = firstPage
                        ret['lastPage'] = lastPage
                        ret['prePage'] = prePage
                        ret['nextPage'] = nextPage
                        ret['pageList'] = pageList
                        ret['event_list'] = event_list
                else:
                    event_list = []
                if request.GET.get('json',None):
                    return HttpResponse(json.dumps(ret, cls=DjangoJSONEncoder), content_type='application/json')
                return render_to_response('showmyActivity.html',ret,context_instance=RequestContext(request))
            except Exception,e:
                event_list = []
                ret['event_list'] = event_list
                log.debug(traceback.format_exc())
                #log.debug(e)
                return render_to_response('showmyActivity.html',ret,context_instance=RequestContext(request))
        else:
            return HttpResponseRedirect('/usercenter/login/')
    else:
        return HttpResponseRedirect('/usercenter/login/')


def get_shareevents(request):
    '''
    用户中心
        --积分换门票
            --快速获取积分--分享会议 换一换
    '''
    share_events = get_share_event()

    event_len = len(share_events)
    rand_events = []
    rand_loop = 4 #随机的循环次数
    if event_len > 4:
        while rand_loop:
            event_len -= 1
            rand_loop -= 1
            rand_num = randint(0, event_len)
            share_events[rand_num], share_events[event_len] = \
                share_events[event_len], share_events[rand_num]
            rand_events.append(share_events.pop())
        return render(request, 'uc_share_event.html', {'share_events': rand_events})
    return render(request, 'uc_share_event.html', {'share_events': share_events})

def get_hotevents(request):
    cat_id = request.GET.get('cat_id', '2')
    hot_events = get_share_event(cat_id)
    hot_events = hot_events[:4]
    return render(request, 'uc_hotevents.html', {'hot_events': hot_events})


def get_total_credit(user_id):
    '''
    获取用户总积分
    @param user_id: 用户自增的id
    @return type: int
    '''
    if user_id:
        credit = UserCreditRelate.objects.filter(user_obj__id=user_id)
        credit_id_list = [_credit.credit_id for _credit in credit]
        # 某用户对应的所有积分记录
        user_credit_list = UserCredit.objects.filter(id__in=credit_id_list)
        #用户现有总积分
        credit_value_sum = sum(_user_credit.cre_val for _user_credit in user_credit_list)
        return credit_value_sum
    return 0


@csrf_exempt
@login_required
def exchange_gifts(request):
    '''
    兑换礼物
    '''
    user = get_user_session(request)
    user_id = user['id']
    gift_id = request.POST.get('gift_id', 0)
    name = request.POST.get('name', '')
    telephone = request.POST.get('telephone', '')
    province = request.POST.get('province', '')
    city = request.POST.get('city', '')
    addr = request.POST.get('addr', '')
    addr = province + city + addr
    try:
        gift = UserGift.objects.get(id=int(gift_id))
        if get_total_credit(user_id) >= gift.credit:
            user_obj = CenterUser.objects.get(id=user_id)

            #填写礼品地址
            user_recv_info = UserRecvInfo(
                user_obj=user_obj,     
                name=name,
                recv_tel=telephone,
                recv_addr=addr
            )
            user_recv_info.save()
            #End of 填写礼品地址
            #添加到礼品关联表 uc_ugift_relate
            ugift_relate = UserGiftRelate(
                recv_info=user_recv_info,
                gift_id=int(gift_id),
                exchange_time=datetime.datetime.now(),
                send_status=0,
            )
            ugift_relate.save()

            user_credit = UserCredit(
                state = 0,
                create_time = datetime.datetime.now(),
                content = '%s' % gift.name,
                cre_val = -gift.credit,
            )
            user_credit.save()

            ucredit_relate = UserCreditRelate(
                user_obj = CenterUser.objects.get(id=user_id),
                credit_id = user_credit.id
            )
            ucredit_relate.save()
            return HttpResponse(json.dumps({'code': 1}), content_type='application/json')
        return HttpResponse(json.dumps({'code': 0}), content_type='application/json')
    except Exception, e:
        log.debug(e)
    return HttpResponse(json.dumps({'code': 0}), content_type='application/json')


def change_post_status(event):
    '''
    修改用户提交的活动审核状态并加分
    '''
    #改状态
    upe = UserPostEvent.objects.filter(event=event)
    #End of 改状态
    if upe:
        upe.update(status=1)
        #加积分 
        credit = EXCHANGE_RULE['action']['postevent']
        content = 'verify postevent'
        user_credit = UserCredit(
        content=content,
        cre_val=credit
        )
        user_credit.save()
        
        
        user = upe.all()[0].user_obj
        try:
            user_credit_relate = UserCreditRelate(
                user_obj=user,
                credit=user_credit,
            )
            user_credit_relate.save()
        except Exception, e:
            log.debug(e)
        #End of 加积分 

@login_required
def weibo_share(request):

    old_event_id = request.GET.get('old_event_id', 0)
    try:
        event = NewEventTable.objects.get(old_event_id=old_event_id)
        name = event.name
        time = datetime.datetime.strftime(event.begin_time, '%Y-%m-%d')
        city = event.city.all()[0].district_name
        if event.img.all():
            pic_url = event.img.all()[0].urls
        else:
            pic_url = 'http://huodongjia-yun.b0.upaiyun.com/static/images/logo.jpg'
        event_url = 'http://www.huodongjia.com/event-%s.html' % old_event_id
        content = name + '将于' + time + '在' + city + '举办，希望能在会场遇见您！ （分享自 @活动家官微）' + event_url
        user = get_user_session(request)

        if user['sitename'] == 'weibo':
            data = {
                'access_token': str(user['access_token']),
                'status': content,
            }
            resp = requests.post('https://api.weibo.com/2/statuses/update.json', data=data, timeout=30)
            if resp.status_code == 200:
                ret_json = resp.json()
                if not ret_json.has_key('error_code'):
                    #加分
                    credit = EXCHANGE_RULE['action']['share_event']
                    content = 'share event|' + str(old_event_id) + str(user['id'])
                    if not UserCredit.objects.filter(content=content):
                        user_credit = UserCredit(
                            content=content,
                            cre_val=credit
                        )
                        user_credit.save()
                        user_credit_relate = UserCreditRelate(
                            user_obj = CenterUser.objects.get(id=user['id']),
                            credit=user_credit,
                        )
                        user_credit_relate.save()
                        #End of 加分 
                        return HttpResponse(json.dumps({'code': 1}))
                    else:
                        return HttpResponse(json.dumps({'code': 'dump'}))
                else:
                        return HttpResponse(json.dumps({'code': 'timeout'}))
            else:
                return HttpResponse(json.dumps({'code': 'unsym'}))
    except Exception, e:
        return HttpResponse(json.dumps({'code': 0}))


def favor_count(request):
    '''
    活动展示详情页，收藏总数
    @return value: favor_cnt type:int
    '''
    old_event_id = request.GET.get('old_event_id', 0)
    if old_event_id:
        curevent = NewEventTable.objects.get(old_event_id=int(old_event_id))
        favor_cnt = UserFavorEvent.objects.filter(event=curevent).count()
    else:
        favor_cnt = 0
    return favor_cnt

def wechat_share(request):
    '''
    处理微信分享成功后的"加分"请求
    @return：0-分享失败，1-成功，获得5积分，2-重复分享 3-用户id或活动id不存在
    Ps:跨域，使用jsonp传输数据
    '''
    # 获取微信分享成功后，返回的user_id,old_event_id
    user_id = request.GET.get('user_id','')
    old_event_id = request.GET.get('old_event_id','')
    callback = request.GET['callback']
    if user_id and old_event_id:
        content = user_id + '|' + old_event_id + '|wechat'
        try:
            # 查询,如果存在记录，则表示该用户重复分享活动
            hasShared = UserCredit.objects.get(content=content)
        except Exception,e:
            hasShared = None
        
        if hasShared:
            return HttpResponse('%s(%s)' % (callback,json.dumps({'code':2})))
        else:
            try:
                credit = EXCHANGE_RULE['action']['share_event']
                curuser = CenterUser.objects.get(id=int(user_id))
                curevent = NewEventTable.objects.get(old_event_id=int(old_event_id))
                # 加分
                shareObj = UserCredit(content=content,cre_val=credit)
                shareObj.save()
                # 关联用户
                uc_relate = UserCreditRelate(user_obj=curuser,credit=shareObj)
                uc_relate.save()
                return HttpResponse('%s(%s)' % (callback,json.dumps({'code':1})))
            except Exception,e:
                return HttpResponse('%s(%s)' % (callback,json.dumps({'code':0})))
    else:
        return HttpResponse('%s(%s)' % (callback,json.dumps({'code':3})))


@csrf_exempt
@login_required
def del_post(request, post_num):
    '''
    处理用户对未通过审核的活动的"删除"请求
    '''
    user = get_user_session(request)
    if user:
        try:
            user_obj = CenterUser.objects.get(id=user['id'])
            event = NewEventTable.objects.get(old_event_id=int(post_num))
            post_event = UserPostEvent.objects.get(event=event, user_obj=user_obj)
            #删除事件及关联
            if post_event:
                post_event.delete()
            return HttpResponse(json.dumps({'code': 1}))
        except:
            return HttpResponse(json.dumps({'code': 0}))
    return HttpResponse(json.dumps({'code': 0}))


def recommend_event(request):
    '''
    根据用户所在行业，随机推荐4条会议给用户收藏
    '''
    user = get_user_session(request)
    try:
        user_obj = CenterUser.objects.get(id=user['id'])
        share_events = get_share_event(user_obj.industry)
        #share_events = get_share_event(2)
        event_len = len(share_events)
        rand_events = []
        rand_loop = 4 #随机的循环次数
        if event_len > 4:
            while rand_loop:
                event_len -= 1
                rand_loop -= 1
                rand_num = randint(0, event_len)
                share_events[rand_num], share_events[event_len] = \
                    share_events[event_len], share_events[rand_num]
                rand_events.append(share_events.pop())
            return HttpResponse(json.dumps({'share_events': rand_events}))
        return HttpResponse(json.dumps({'share_events': share_events}))
    except Exception, e:
        return HttpResponseRedirect('/usercenter/login')

def create_third_login_urls():
    '''
    获取第三方登录的urls
    '''
    link_map = {}
    # 获取qq，weibo，douban的url
    socialsites = SocialSites(SOCIALOAUTH_SITES)
    for _site_class in socialsites.list_sites_class():
        _s = socialsites.get_site_object_by_class(_site_class)
        link_map[_s.site_name] = _s.authorize_url
    # 获取alipay的url
    link_map['alipay'] = create_quick_login_url()
    # 获取wechat的url
    api = WeixinAPI(appid=WECHAT['APP_ID'],
                app_secret=WECHAT['APP_SECRET'],
                redirect_uri=WECHAT['REDIRECT_URI'])
    redirect_url = api.get_authorize_login_url(scope=("snsapi_login",))
    link_map['wechat'] = redirect_url

    return link_map

@login_required
def bind_account(request):
    '''
    处理用户"绑定账号"的请求
    '''
    user = get_user_session(request)
    link_map = {}
    try:
        loginuser = CenterUser.objects.get(id=user['id'])
    except:
        return HttpResponseRedirect('/usercenter/login')
    if loginuser:
        link_map = create_third_login_urls()
        # 获取当前登录用户已绑定的账号
        account = UserAccountBind.objects.filter(user_obj=loginuser)
        acc_lst = {}
        for acc in account:
            acc_lst[acc.account_type] = 1
        return render(request, 'bindAccount.html', locals())
    else:
        return HttpResponseRedirect('/usercenter/login')

def cancel_acc_bind(request):
    '''
    取消账号绑定
    '''
    user = get_user_session(request)
    acc_type = request.GET.get('acc_type')
    try:
        accbindobj = UserAccountBind.objects.get(user_obj__id=user['id'],
                account_type=acc_type)
        accbindobj.delete()
    except Exception,e:
        log.debug(e)
    return HttpResponseRedirect('/usercenter/index/?idx=account/bind')

def login_return_curpage(request):
    '''
    登录后，跳转回登录前的页面
    Author:牟波  time：2015-11-11 15:27
    '''
    login_type = request.GET.get('type','')
    prev_url = request.GET.get('prev_url','')
    request.session['prev_url'] = prev_url
    
    link_map = create_third_login_urls()
    # 根据选择的登录方式，取得对应的url，并跳转到登录页面
    login_url = link_map.get(login_type,'')
    return HttpResponseRedirect(login_url)


def order_add_credit(request, price, order_num, telephone):
    '''
    支付成功加分, 对同一场活动的多次订单，不重复加分
    '''
    #加分
    credit_percent = EXCHANGE_RULE['action']['attend_event']
    cre_val=float(float(price) * credit_percent)
    user = get_user_session(request)
    if user:
        content = 'attend event|' + str(user['id']) + '|' + str(order_num)
        if not UserCredit.objects.filter(content=content):
            user_credit = UserCredit(
                content=content,
                cre_val=cre_val,
            )
            user_credit.save()
            user_credit_relate = UserCreditRelate(
            user_obj = CenterUser.objects.get(id=user['id']),
                credit=user_credit,
            )
            user_credit_relate.save()
        #End of 加分
    else:
        user_obj = CenterUser.objects.filter(telephone=telephone)
        if user_obj:
            content = 'attend event|' + str(user_obj.all()[0]) + str(order_num)
            if not UserCredit.objects.filter(content=content):
                user_credit = UserCredit(
                    content=content,
                    cre_val=cre_val,
                )
                user_credit.save()
                user_credit_relate = UserCreditRelate(
                user_obj = user_obj.all()[0],
                    credit=user_credit,
                )
                user_credit_relate.save()
            #End of 加分 
    return cre_val

def downloadParticipators(request):
    '''
    下载某场活动的报名人员信息
    '''
    import time,datetime
    from utils.exceltool import MExcel

    file_name = '%s.xls' % str(time.time()).replace('.','')
    download_dir = os.path.join(BASE_DIR,'media/download')
    path_file_name = os.path.join(download_dir,file_name)

    mwb = MExcel(path_file_name) 
    mwb.set_sheet(u'报名信息')
    header = [u'姓名',u'手机号',u'邮箱',u'公司',u'职位']
    data = []

    event_id = request.GET.get('event_id')
    if event_id and event_id.isdigit():
        ev_obj = NewEventTable.objects.filter(old_event_id=int(event_id)).first()
        if ev_obj.Price.Type.id == 6:
            orders = list(ev_obj.order_event.all().values('order_user_name','order_tel','order_email','company','job'))
            for dct in orders:
                tmp = [dct['order_user_name'],dct['order_tel'],dct['order_email'],dct['company'],dct['job']]
                data.append(tmp)
        elif ev_obj.Price.Type.id == 4:
            orders = list(ev_obj.event_feeuser.all().values('name','phone','email','company','job'))
            for dct in orders:
                tmp = [dct['name'],dct['phone'],dct['email'],dct['company'],dct['job']]
                data.append(tmp)
        else:
            pass

        mwb.set_header(header)
        mwb.set_data(data)
        f = mwb.save(file_name)
        data = f.read()
        f.close()

        response = HttpResponse(data,mimetype='text/xls')
        response['Content-Disposition'] = 'attachment; filename=%s' % file_name
        return response
            










