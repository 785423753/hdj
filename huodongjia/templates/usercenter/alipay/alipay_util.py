#-*-coding:utf8 -*-
import types
from urllib import urlencode,urlopen
from hashcompat import md5_constructor as md5
from alipay_config import settings

def smart_str(s,encoding='utf-8',string_only=False,errors='strict'):
    if string_only and isinstance(s, (types.NoneType, int)):  
        return s  
    if not isinstance(s, basestring):  
        try:  
            return str(s)  
        except UnicodeEncodeError:  
            if isinstance(s, Exception):  
                return ' '.join([smart_str(arg, encoding, strings_only,  
                        errors) for arg in s])  
            return unicode(s).encode(encoding, errors)  
    elif isinstance(s, unicode):  
        return s.encode(encoding, errors)  
    elif s and encoding != 'utf-8':  
        return s.decode('utf-8', errors).encode(encoding, errors)  
    else:  
        return s


# 生成签名结果
def build_mysign(prestr, key, sign_type = 'MD5'):  
    if sign_type == 'MD5':  
        return md5(prestr + key).hexdigest()
    return ''

# 对数组排序并除去数组中的空值和签名参数  
# 返回数组和链接串
def params_filter(params):
    ks = params.keys()  
    ks.sort()  
    newparams = {}  
    prestr = ''  
    for k in ks:  
        v = params[k]  
        k = smart_str(k, settings.ALIPAY_INPUT_CHARSET)  
        if k not in ('sign','sign_type') and v != '':  
            newparams[k] = smart_str(v, settings.ALIPAY_INPUT_CHARSET)  
            prestr += '%s=%s&' % (k, newparams[k])  
    prestr = prestr[:-1]  
    return newparams, prestr

# 快捷登录接口
def create_quick_login_url():
    # 构造传递给支付宝的params字典
    params = {}
    params['service'] = 'alipay.auth.authorize'
    params['partner'] = settings.ALIPAY_PARTNER
    params['_input_charset'] = settings.ALIPAY_INPUT_CHARSET

    params['return_url'] = settings.ALIPAY_RETURN_URL
    params['target_service'] = settings.ALIPAY_TARGET_SERVICE

    params,prestr = params_filter(params)

    params['sign_type'] = settings.ALIPAY_SIGN_TYPE
    params['sign'] = build_mysign(prestr,settings.ALIPAY_KEY,\
        settings.ALIPAY_SIGN_TYPE)

    return settings._GATEWAY + urlencode(params)

# 验证支付宝返回的通知
def notify_verify(request):
    # 初级验证--sign
    _, params = params_filter(request.GET)
    mysign = build_mysign(params,settings.ALIPAY_KEY,\
        settings.ALIPAY_SIGN_TYPE)

    if mysign != request.GET.get('sign'):
        return False

    # 二级验证--查询支付宝服务器此条信息是否有效
    params = {}
    params['partner'] = settings.ALIPAY_PARTNER
    params['notify_id'] = request.GET.get('notify_id')
    
    gateway = 'https://mapi.alipay.com/gateway.do?service=notify_verify&'  
    verify_result = urlopen(gateway, urlencode(params)).read()  
    
    if verify_result.lower().strip() == 'true':  
        return True  
    return False
