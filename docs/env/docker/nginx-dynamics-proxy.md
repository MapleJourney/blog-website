# nginx 利用容器别名配置反向代理

不同的容器想要使用docker nginx 反向代理, 需要相关的容器放在同一个docker 网络中. 同时利用docker 自动生成的容器别名.

可以通过以下命令查看当前容器是否拥有容器别名

```linux
docker inspect 容器名/id
```

## docker-compose 配置

在分别创建容器时可以在 docker-compose.yaml 或 docker-compose.yml 文件中配置 `networks` 字段, 并且配置添加到外置相应的docker 网络中

nginx docker-compose 配置如下(其他容器类似)

```yaml
version: '3'
services:
 nginx:
   image: nginx:latest
   container_name: nginx
   volumes:
     - /path:/etc/nginx
   restart: always
   networks:
     - my-network # 自定义的docker 网络名 (默认的 bridge 网络未验证是否可行)
   ports:
     - 80:80
     - 443:443


networks:
  my-network:
    external:
      name: my-network

```

nginx 配置文件中只需要将代理的`ip`地址替换成相应的容器名称即可
