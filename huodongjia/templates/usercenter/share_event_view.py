# -*- coding: utf-8 -*-
import datetime
import json
import random

from django.shortcuts import render_to_response,render
from django.template import RequestContext
from django.http import HttpResponse, HttpResponseRedirect
from django.db.models import Sum
from utils.cacheclient import cache

from event.models import NewEventTable, NewEventCat, NewEventImg, NewEventPriceUnit
from credit_setting import EXCHANGE_RULE

def get_share_event(cat_id=None):
    '''
    用户中心
        -活动换门票
            -分享会议获取积分:展示会议
    return value events
    return data structure:
    events {
    'event_id': xxx, 
    'event_img': xxx,
    'event_name': xxx
    }
    '''
    if cat_id:
        events = NewEventTable.objects \
                .filter(cat__id=cat_id) \
                .filter(event_price_unit__end_time__gt=datetime.datetime.now()) \
                .filter(point=2).filter(Price__Type__id=6) \
                .filter(begin_time__gt=datetime.datetime.now()) \
                .filter(isshow__in=[1, 8]).order_by('?')
    else:
        events = NewEventTable.objects \
                .filter(event_price_unit__end_time__gt=datetime.datetime.now()) \
                .filter(point=2).filter(Price__Type__id=6) \
                .filter(begin_time__gt=datetime.datetime.now()) \
                .filter(isshow__in=[1, 8]).order_by('?')

    events = set(events)
    events = list(events)
    
    if len(events) > 8:
        events = events[:8] 
    random.shuffle(events)

    share_events = list()
    for _event in events:
        share_event = {}
        try:
            price_units = NewEventPriceUnit.objects.filter(event=_event)
            min_price = float(min(_unit.price for _unit in price_units))
        except Exception, e:
            min_price = 0
        share_event['credit'] = int(int(min_price) * EXCHANGE_RULE['action']['attend_event'])
        share_event['price'] = int(min_price)
        share_event['event_id'] = _event.old_event_id
        if _event.city.all():
            share_event['city'] = _event.city.all()[0].district_name
        share_event['begin_time'] = datetime.datetime.strftime(_event.begin_time, '%Y-%m-%d')
        if _event.img.all():
            share_event['event_img'] = 'http://huodongjia-yun.b0.upaiyun.com/' + _event.img.all()[0].urls
        else:
            share_event['event_img'] = ''
        share_event['event_name'] = _event.name
        share_events.append(share_event)

   # if cache.has_key('share_events'):
   #     return cache.get('share_events')
   # else:
   #     cache.set('share_events', share_events, 60 * 10)
    return share_events
