#coding:utf-8
from django import template
from django.conf import settings
from django.utils.datastructures import SortedDict
from django.utils.http import urlquote
from event.models import NewNavList
from utils import boring_encode
import datetime
register = template.Library()
import logging,random
log = logging.getLogger('website.debug')  

@register.filter(name='encodeid')  
def encodeid(value):
    try:
        return boring_encode.encode(str(value), 6)
    except Exception as e:
        log.debug(e)
        return value


@register.filter(name='encodetag')  
def encodetag(value):  
    return urlquote(value)

@register.filter(name='eventtag')  
def eventtag(value, arg):  
    if value.has_key(arg):
        if value[arg][1] and value[arg][1] not in ['<p><br /></p>','<p><br></p>']:
            return value[arg][1]

    return None

@register.filter(name='validetime')  
def validetime(value):
    if value['order_pay_status'] == '已付款':
        return True
    order_time = datetime.datetime.strptime(value['order_addtime'], '%Y-%m-%d %H:%M:%S')
    distance = datetime.datetime.now() - order_time
    if distance.days == 0:
        return True
    return False
@register.filter(name='countprice')  
def countprice(value, arg):
    if type(value)==list:
        sum = 0
        for pr_dct in value:
            if pr_dct.has_key('status_info'):
                if pr_dct['status_info'] == arg:
                    sum+=1
        return sum
    return None

@register.filter(name='filterprice')  
def countprice(value):
    today = datetime.datetime.today()
    if type(value)==list:
        new = []
        for pr_dct in value:
            end_time = datetime.datetime.strptime(pr_dct['end_time'],'%Y-%m-%d %H:%M:%S')
            if u'团体' in pr_dct['property']:
                continue

            if u'团购' in pr_dct['property']:
                continue

            if end_time<=today:
                continue
            if pr_dct['status']==0:
                continue
            new.append(pr_dct)
        sec_new = sorted(new,key=lambda x:x['end_time'])
        thrd_new = []
        for pr in sec_new:
            try:
                if float(pr['original_price'])== float(pr['price']):
                    pr['price_return'] = '0.00'
            except Exception,e:
                log.debug(e)

            if sec_new[0]['end_time'][:10] in pr.get('end_time',''):
                thrd_new.append(pr)
        #sec_new = list(set(sec_new))
        #如果有原价和现价相同则没有返现
        return thrd_new
    
    return None





