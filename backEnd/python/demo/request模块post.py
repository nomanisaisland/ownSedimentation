'''
Author: lujiafeng
Date: 2021-12-21 00:00:07
LastEditTime: 2021-12-21 00:04:09
LastEditors: lujiafeng
Description: 
FilePath: \demo\request模块post.py
可以输入预定的版权声明、个性签名、空行等
'''

import requests
S = input("请输入单词")
data = {
  "kw": S
}
url = "https://fanyi.baidu.com/sug"

resp = requests.post(url,data=data)
print(resp.json())