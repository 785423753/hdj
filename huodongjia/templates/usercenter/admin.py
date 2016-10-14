#-*-coding:utf-8 -*-
from django.contrib import admin

# Register your models here.
from models import UserGift, GiftCat, UserRecvInfo, UserGiftRelate,UserPostEvent


class UserCenter(admin.ModelAdmin):


    def show_price_symbol(self, obj):
        return '￥' + str(obj.price)
    show_price_symbol.short_description=u'价格'
    show_price_symbol.allow_tags = True 
        

    list_display = ['id', 'name', 'pic_url', 'expired_time', 'detail', 'status', 'show_price_symbol', 'credit']
    readonly_fields = ('pic_url', )


class GiftCatAdmin(admin.ModelAdmin):
    pass
class GiftExchangeAdmin(admin.ModelAdmin):
    def name(self, obj):
        return obj.recv_info.name
    name.short_description=u'收货人'
    name.allow_tags = True


    def telephone(self, obj):
        return obj.recv_info.recv_tel
    telephone.short_description=u'收货人电话'
    telephone.allow_tags = True


    def address(self, obj):
        return obj.recv_info.recv_addr
    address.short_description=u'收货地址'
    address.allow_tags = True


    def gift_name(self, obj): 
        return obj.gift.name
    gift_name.short_description=u'礼品名'
    gift_name.allow_tags = True


    def gift_price(self, obj): 
        return obj.gift.price
    gift_price.short_description=u'票价'
    gift_price.allow_tags = True

    list_display = ['name', 'telephone', 'address', 'gift_name', 'gift_price', 'exchange_time', 'send_status']
    readonly_fields = ('gift', )

class UserPostEventAdmin(admin.ModelAdmin):
    '''
    '''
    def user_name(self,obj):
        try:
            return obj.user_obj.name
        except:
            return u''

    def event_name(self,obj):
        try:
            return obj.event.name
        except:
            return u''

    search_fields = ['event__name','user_obj__name']
    raw_id_fields = ['event']
    list_display = ['id','user_name','event_name']



admin.site.register(UserGift, UserCenter)
admin.site.register(GiftCat, GiftCatAdmin)
admin.site.register(UserGiftRelate, GiftExchangeAdmin)
admin.site.register(UserPostEvent, UserPostEventAdmin)
