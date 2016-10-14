#-*- coding:utf-8 -*-
import requests
import os
import sys
import re
from StringIO import StringIO
from PIL import Image
import shutil
REG_EXP = re.compile(r'(src|href)="(http://pic.huodongjia.com[^"]+)"')

def save_static(directory):
    '''
    @param directory 目录名（相对路径）
    '''
    # 此脚本所在的目录
    script_path = os.path.abspath(os.path.dirname('__filename__'))
    # 需上传的目录
    directory_path = os.path.abspath(directory)

    success_cnt = 0
    for root, dirs, files in os.walk(directory_path):
        for filename in files:
            _, suffix = os.path.splitext(filename)
            if suffix == '.html':
                local_abs_filename = os.path.join(root, filename)
                
                with open(local_abs_filename) as f:
                    content = f.read()
                    content_reg = REG_EXP.findall(content)
                    for name, url in content_reg:
                        if name == "src":
                            if url.find(".js") != -1:
                                store_des = '/home/swing/website/static/js/'
                            else:
                                name = 'pic'
                                store_des = '/home/swing/website/static/images/'
                        else:
                            store_des = '/home/swing/website/static/css/'

                        back_slash = url.rfind('/')
                        save_name = url[back_slash + 1:]
                        try:
                            if name == 'pic':
                                resp = requests.get(url)
                                if resp.status_code == 200:
                                    img = Image.open(StringIO(resp.content)) 
                                    img.save(store_des + save_name)
                                else:
                                    print 'not find'
                            else:
                                a = requests.get(url, stream=True)
                                if a.status_code == 200:                                                         
                                    with open(store_des + save_name, 'wb') as f0:                                           
                                        a.raw.decode_content = True                                              
                                        shutil.copyfileobj(a.raw, f0)
                            success_cnt += 1
                        except Exception as e:
                            print e
                            print url, name ,save_name
                            print '***************'
    print success_cnt
    
             

if __name__ == '__main__':
    if len(sys.argv) > 1:
        for directory in sys.argv[1:]:
            save_static(directory)
