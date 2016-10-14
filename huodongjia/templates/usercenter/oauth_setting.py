# -*- coding: utf-8 -*-

SOCIALOAUTH_SITES = (
    ('weibo', 'socialoauth.sites.weibo.Weibo', '新浪微博',
        {
          #'redirect_uri': 'http://www.huodongjia.com/usercenter/logincallback/weibo',
          #'client_id': '553061895',
          #'client_secret': 'a67189ee9d240b428d1ad62706ead5f4',
          'redirect_uri': 'http://hdjcs.41huiyi.com/usercenter/logincallback/weibo',
          'client_id': '875414664',
          'client_secret': '21dc79de1dd2dcb2934dddc8a392ee80',
        }
    ),

    ('qq', 'socialoauth.sites.qq.QQ', 'QQ',
        {
            'redirect_uri': 'http://www.huodongjia.com/usercenter/callback',
          'client_id': '101263244',
          'client_secret': 'ebdd70a9935a4a4ed622beac3508d90f',
        }
    ),

    ('douban', 'socialoauth.sites.douban.DouBan', '豆瓣',
        {
            'redirect_uri': 'http://www.huodongjia.com/usercenter/logincallback/douban',
          'client_id': '0b3969251ce3dad221ac3b6f56ab9076',
          'client_secret': 'ed4f29cbc57c2ebc',
          'scope': ['douban_basic_common']
        }
    ),

)

WECHAT = {
        'APP_ID':'wx0a129e80e2873bd1',
        'APP_SECRET':'d4624c36b6795d1d99dcf0547af5443d',
        'REDIRECT_URI':'http://www.huodongjia.com/usercenter/wechathandler',
}
