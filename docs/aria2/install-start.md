docker安装方法

docker文档地址
https://p3terx.com/archives/docker-aria2-pro.html
```dockerfile
docker run -d \
    --name aria2-pro \
    --restart unless-stopped \
    --log-opt max-size=1m \
    --network host \
    -e PUID=$UID \
    -e PGID=$GID \
    -e RPC_SECRET=<TOKEN> \
    -e RPC_PORT=6800 \
    -e LISTEN_PORT=6888 \
    -v $PWD/aria2-config:/config \
    -v $PWD/aria2-downloads:/downloads \
    p3terx/aria2-pro
```
这个`<TOKEN>`可以随机生成，但是你要记住他是啥例如`GMzorZKDVND4tSpBaOgTJgFQZSqRW0J4`

配置本机防火墙开放必要的入站端口，内网机器在路由器设置端口转发到相同端口。
使用你喜欢的 WebUI 或 App 进行连接，强烈推荐 AriaNg。

ariaNG安装与运行
```dockerfile
docker run -d \
    --name ariang \
    --restart unless-stopped \
    --log-opt max-size=1m \
    -p 6880:6880 \
    p3terx/ariang
```

