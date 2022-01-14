'''
Author: lujiafeng
Date: 2021-12-20 22:50:52
LastEditTime: 2021-12-20 23:29:27
LastEditors: lujiafeng
Description: 
FilePath: \demo\demo1.py
可以输入预定的版权声明、个性签名、空行等
'''
from urllib.request import urlopen

url = "http://www.baidu.com"
resp = urlopen(url)

with open("mybaidu.html", mode="w") as f:
  f.write(resp.read().decode("utf-8"))