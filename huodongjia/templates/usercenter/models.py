#coding:utf-8
from __future__ import unicode_literals 
import datetime
 
from django.db import models
from django.contrib.auth.models import User,AbstractUser

from event.models import NewEventTable
from order.models import NewOrder
from tag.models import NewEventTag

class CenterUser(models.Model):
    id = models.AutoField(primary_key=True)
    uid = models.CharField(u'UID', max_length=255, blank=True, null=True)
    avatar = models.CharField(u'头像', max_length=255, blank=True, null=True)
    name = models.CharField(u'名字', max_length=40, blank=True, null=True)
    email = models.CharField(max_length=40, blank=True, null=True)
    telephone = models.CharField(u'电话', max_length=11, blank=True, null=True)
    password = models.CharField(max_length=20, blank=True, null=True)
    create_time = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    sex = models.IntegerField(blank=True, null=True)
    log_count = models.IntegerField(blank=True, null=True)
    last_login_date = models.DateTimeField(blank=True, null=True, verbose_name=u'最后登录时间')
    active = models.NullBooleanField(blank=True, null=True)
    login_from = models.CharField(max_length=20, blank=True, null=True)
    register_ip = models.CharField(max_length=20, blank=True, null=True)
    industry = models.CharField(max_length=20,blank=True,null=True)
    status = models.IntegerField(max_length=11,blank=True,null=True,default=0)
    tags = models.CharField(u'兴趣',max_length=100,blank=True,null=True)
    def __unicode__(self):
        return '%s %s' % (self.id,self.name)      
    class Meta:
        db_table = 'uc_user'
        verbose_name = u'用户'
        verbose_name_plural = u'用户'



class UserCredit(models.Model):
    
    id = models.AutoField(primary_key=True)
    state = models.NullBooleanField(u'积分状态', default=False)
    create_time = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    content = models.CharField(u'模型名称', max_length=100)
    cre_val = models.IntegerField(blank=True, null=True)
    class Meta:
        db_table='uc_usercredit'
        verbose_name = u'用户积分'
        verbose_name_plural = u'用户积分'
    def __unicode__(self):
        return self.cre_val


class UserCreditRelate(models.Model):
    '''
    用户和积分的关联
    '''
    id = models.AutoField(primary_key=True)
    user_obj = models.ForeignKey(CenterUser)
    credit = models.ForeignKey(UserCredit)
    class Meta:
        db_table='uc_ucredit_relate'
        verbose_name = u'用户和积分的关联'
        verbose_name_plural = u'用户和积分的关联'
    def __unicode__(self):
        return self.credit


class UserOrderRelate(models.Model):
    '''
    用户和订单的关联
    '''
    id = models.AutoField(primary_key=True)
    user_obj = models.ForeignKey(CenterUser)
    order = models.ForeignKey(NewOrder,related_name='usercenter_user')
    class Meta:
        db_table='uc_uorder_relate'
        verbose_name = u'用户和订单的关联'
        verbose_name_plural = u'用户和订单的关联'
    def __unicode__(self):
        return self.user_obj.name


class UserFavorEvent(models.Model):
    '''
    我的收藏
    '''
    id = models.AutoField(primary_key=True)
    user_obj = models.ForeignKey(CenterUser)
    event = models.ForeignKey(NewEventTable)
    class Meta:
        db_table='uc_favor_event'
        verbose_name = u'我的收藏'
        verbose_name_plural = u'我的收藏'


class UserPostEvent(models.Model):
    '''
    我的发布
    '''
    id = models.AutoField(primary_key=True)
    user_obj = models.ForeignKey(CenterUser)
    event = models.ForeignKey(NewEventTable, related_name='event_ucpost')
    status = models.NullBooleanField(default=False)
    class Meta:
        db_table='uc_post_event'
        verbose_name = u'我的发布'
        verbose_name_plural = u'我的发布'
    def __unicode__(self):
        return u'我的发布'


class GiftCat(models.Model):
    '''
    礼品分类
    '''
    id = models.AutoField(primary_key=True)
    name = models.CharField(u'礼品类型', max_length=30, blank=True, null=True)
    parent = models.ForeignKey('self', null=True, blank=True, verbose_name='父类')  
    class Meta:
        db_table='uc_gift_cat'
        verbose_name = u'礼品类型'
        verbose_name_plural = u'礼品类型'
    def __unicode__(self):
        return self.name


class UserGift(models.Model):
    '''
    礼品
    '''
    id = models.AutoField(primary_key=True)
    gift_cat = models.ForeignKey(GiftCat, related_name="cat_gift")
    name = models.CharField(u'名字', max_length=40, blank=True, null=True)
    pic_url = models.CharField(u'图片地址', max_length=255, blank=True, null=True)
    detail = models.CharField(u'描述', max_length=80, blank=True, null=True)
    create_time = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    expired_time = models.DateTimeField(verbose_name=u'过期时间')
    status = models.NullBooleanField(u'礼品状态', blank=True, null=True)
    price = models.IntegerField(u'价格', blank=True, null=True)
    credit = models.IntegerField(u'所需积分', blank=True, null=True)
    upload_image = models.ImageField(upload_to='photos', blank=True, null=True)
    city = models.CharField(u'城市',max_length=40,blank=True,null=True,default='全国')
    

    def save(self,force_insert=False, force_update=False, using=None,
             update_fields=None):
        #try:
        super(UserGift, self).save(force_insert, force_update, using, 
             update_fields)
        
        try:
            if self.upload_image:
                import ftplib,time,os
                server1='pic1.qkan.com'
                uid='imga'
                pwd='b@Veryevent'
                s = ftplib.FTP(server1,uid,pwd)
                spot='event'
                try:   
                    s.cwd(spot)   
                except ftplib.error_perm:   
                    s.mkd(spot) 
                #except:
                curTime = time.strftime("%Y-%m-%d", time.localtime(time.time()))
                try:   
                    s.cwd(curTime)   
                except ftplib.error_perm:   
                    s.mkd(curTime)
                    try:                 
                        s.cwd(curTime)  
                    except:
                        pass  
                f = open(self.upload_image.path,'rb')   
                from PIL import Image
                pixbuf = Image.open(self.upload_image.path)
                self.width, self.height = pixbuf.size
                
                base, ext = os.path.splitext(os.path.basename(self.upload_image.path))
                if not self.name:
                    self.name=base
                filename=spot+str(time.time())+ext
                s.storbinary('STOR '+filename, f)   # Send the file   
                f.close()                          # Close file and FTP   
                s.quit()
                self.pic_url='http://pic1.qkan.com/%s/%s/%s' % (spot,curTime,filename) #os.path.join( spot+'/'+curTime,filename)
                super(UserGift, self).save(force_insert, force_update, using, update_fields)
            
        except Exception, e:
            print e
            pass
    class Meta:
        db_table='uc_user_gift'
        verbose_name = u'礼品'
        verbose_name_plural = u'礼品'


class UserRecvInfo(models.Model):
    '''
    用户收货信息
    '''
    user_obj = models.ForeignKey(CenterUser, related_name='user_recv')
    name = models.CharField(max_length=30, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    recv_tel = models.CharField(max_length=11, blank=True, null=True)
    recv_addr = models.CharField(max_length=100, blank=True, null=True)
    class Meta:
        db_table='uc_urecv_info'
        verbose_name = u'用户收货信息'
        verbose_name_plural = u'用户收货信息'
    def __unicode__(self):
        return self.name


class UserGiftRelate(models.Model):
    '''
    用户关联礼品
    '''
    SEND_CHOICE = (
        (0,  '未出货'),
        (1,  '出货中'),
        (2,  '出货完成'),
    )

    id = models.AutoField(primary_key=True)
    gift = models.ForeignKey(UserGift)
    recv_info = models.ForeignKey(UserRecvInfo, related_name='recv_gift')
    exchange_time = models.DateTimeField(auto_now_add=True, verbose_name=u'兑换时间')
    send_status = models.IntegerField('出票状态', blank=True, null=True, choices=SEND_CHOICE)
    class Meta:
        db_table='uc_ugift_relate'
        verbose_name = u'用户兑换的礼品'
        verbose_name_plural = u'用户兑换礼品'
    def __unicode__(self):
        return self.gift.name


# 用户账号绑定表
class UserAccountBind(models.Model):
    '''
    用户账号绑定关联表
    '''
    user_obj = models.ForeignKey(CenterUser,related_name='user_account')
    account_uid = models.CharField(u'被绑定账号UID',max_length=255,blank=True,null=True)
    account_type = models.CharField(u'账号类型',max_length=10,blank=True,null=True)
    bind_time = models.DateTimeField(auto_now_add=True, verbose_name=u'兑换时间',null=True,blank=True,default=datetime.datetime.now())

    class Meta:
        db_table = 'uc_account_bind'
        verbose_name = u'用户账号关联'
        verbose_name_plural = u'用户账号关联'

    def __unicode__(self):
        return self.user_obj.name

# 登录情况统计表 Add by hydra at 14:43 2016/07/08
class LoginSource(models.Model):
    '''
    用户账号绑定关联表
    '''
    cn_name = models.CharField(u'中文名称',max_length=10,blank=True,null=True)
    en_name = models.CharField(u'英文名称',max_length=10,blank=True,null=True)
    reg_daily = models.IntegerField(u'昨日注册量',null=True,blank=True)
    reg_total = models.IntegerField(u'总注册量',null=True,blank=True)
    login_daily = models.IntegerField(u'昨日登录量',null=True,blank=True)
    login_total = models.IntegerField(u'总登录量',null=True,blank=True)
    set_profile_num = models.IntegerField(u'设置资料数量',null=True,blank=True)
    create_time = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间',null=True,blank=True,default=datetime.datetime.now())
    update_time = models.DateTimeField(auto_now=True, verbose_name=u'更新时间',null=True,blank=True,default=datetime.datetime.now())

    class Meta:
        db_table = 'uc_login_source'
        verbose_name = u'第三方登录情况'
        verbose_name_plural = u'第三方登录情况'

    def __unicode__(self):
        return self.cn_name

class Member(models.Model):
    '''
    '''
    company_type_cho = ((0,u'国有企业'),(1,u'外资企业(含合资)'))
    name = models.CharField(max_length=20,verbose_name=u'姓名')
    age = models.CharField(max_length=20,verbose_name=u'年龄段')
    sex = models.CharField(max_length=10,verbose_name=u'性别')
    education = models.CharField(max_length=10,verbose_name=u'学历')
    telephone = models.CharField(max_length=20,verbose_name=u'手机号')
    email = models.CharField(max_length=20,verbose_name=u'邮箱')
    company = models.CharField(max_length=255,verbose_name=u'邮箱')
    job = models.CharField(max_length=20,verbose_name=u'邮箱')
    industry = models.IntegerField(verbose_name=u'邮箱')
    company_type = models.SmallIntegerField(verbose_name=u'公司类型',choices=company_type_cho)
    company_size = models.CharField(max_length=20,verbose_name=u'公司规模')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间',default=datetime.datetime.now())

    class Meta:
        db_table = 'sys_member'
        verbose_name = u'会员'
        verbose_name_plural = u'会员'

    def __unicode__(self):
        return self.name
