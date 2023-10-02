# qb 报错 unauthorized

在第一次安装qBittorrent时, 首次打开web UI 会报错 unauthorized.

## 解决

修改aBittorrent.conf文件, 关闭主机头验证

```conf
WebUIHostHeaderValidation=false
```
