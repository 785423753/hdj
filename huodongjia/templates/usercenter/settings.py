# -*- coding: utf-8 -*-

SOCIALOAUTH_SITES = (
    ('weibo', 'socialoauth.sites.weibo.Weibo', '新浪微博',
        {
            'redirect_uri': 'http://www.huodongjia.com:7003/usercenter/logincallback/weibo',
          'client_id': '2841835620',
          'client_secret': 'cef68876cd0d4ba74a5be01f955f307c',
        }
    ),

    ('qq', 'socialoauth.sites.qq.QQ', 'QQ',
        {
          'redirect_uri': 'http://test.codeshift.org/account/oauth/qq',
          'client_id': '101263244',
          'client_secret': 'ebdd70a9935a4a4ed622beac3508d90f',
        }
    ),

  #  ('douban', 'socialoauth.sites.douban.DouBan', '豆瓣',
  #      {
  #        'redirect_uri': 'http://huodongjia.com',
  #        'client_id': '0b3969251ce3dad221ac3b6f56ab9076',
  #        'client_secret': 'ed4f29cbc57c2ebc',
  #        'scope': ['douban_basic_common']
  #      }
  #  ),
    ('taobao', 'socialoauth.sites.taobao.TaoBao', '淘宝',
        {
          'redirect_uri': 'http://huodongjia.com',
          'client_id': '0b3969251ce3dad221ac3b6f56ab9076',
          'client_secret': 'ed4f29cbc57c2ebc',
          'scope': ['']
        }
    ),

)
