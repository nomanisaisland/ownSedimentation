'''
Author: lujiafeng
Date: 2021-12-20 23:32:15
LastEditTime: 2021-12-20 23:57:26
LastEditors: lujiafeng
Description: 
FilePath: \demo\request模块.py
可以输入预定的版权声明、个性签名、空行等
'''
import requests

query = input("文章")
# url = f'https://www.google.com/search?q={query}'
url = f"https://juejin.cn/post/{query}"

dic = {
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
}

resp = requests.get(url, headers=dic)
print(resp.text)