# 修改默认包缓存路径

http://t.csdn.cn/UVO0T

主要是用来解决，Error: EPERM: operation not permitted, rmdir '*'的问题

![image-20230920104305152](https://raw.githubusercontent.com/wodiu188/Images/main/blog_images/202309201043211.png)

出现这个问题，我的解决方式是，把所有的能清空的node都删除然后重新下载，原因是可能有重复的包存在了

> 清空方法
>
> `npm cache clean --force`
>
> 删除下面的文件夹
>
> C:\Program Files (x86)\Nodejs
>
> C:\Program Files\Nodejs
>
> C:\Users\{User}\AppData\Roaming\npm（或%appdata%\npm）
>
> C:\Users\{User}\AppData\Roaming\npm-cache（或%appdata%\npm-cache）
>
> C:\Users\{User}\AppData\Local\Temp\npm-*

检查您的%PATH%环境变量以确保没有引用Nodejs或npm存在。

重启电脑
