#-*- coding:utf-8 -*-

class settings:
  # 安全检验码，以数字和字母组成的32位字符
  ALIPAY_KEY = 'almvfjly2ei65yffne87mr8n5o33pmkg'

  ALIPAY_INPUT_CHARSET = 'utf-8'

  # 合作身份者ID，以2088开头的16位纯数字
  ALIPAY_PARTNER = '2088901588146565'

  # 签约支付宝账号或卖家支付宝帐户
  ALIPAY_SELLER_EMAIL = 'yun@3879.com'

  ALIPAY_SIGN_TYPE = 'MD5'

  # 付完款后跳转的页面（同步通知） 要用 http://格式的完整路径，不允许加?id=123这类自定义参数
  ALIPAY_RETURN_URL='http://www.huodongjia.com/usercenter/alipaycallback'

  # 交易过程中服务器异步通知的页面 要用 http://格式的完整路径，不允许加?id=123这类自定义参数
  ALIPAY_NOTIFY_URL='http://www.huodongjia.com/usercenter/alipay/notify/'

  # target_service，默认为user.auth.quick.login
  ALIPAY_TARGET_SERVICE = 'user.auth.quick.login'

  #支付宝网关地址
  _GATEWAY = 'https://mapi.alipay.com/gateway.do?'
