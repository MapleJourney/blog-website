import{_ as e,o as n,c as i,e as d}from"./app-88d36e46.js";const s={},a=d(`<p>docker安装方法</p><p>docker文档地址 https://p3terx.com/archives/docker-aria2-pro.html</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code>docker run -d \\
    --name aria2-pro \\
    --restart unless-stopped \\
    --log-opt max-size=1m \\
    --network host \\
    -e PUID=$UID \\
    -e PGID=$GID \\
    -e RPC_SECRET=&lt;TOKEN&gt; \\
    -e RPC_PORT=6800 \\
    -e LISTEN_PORT=6888 \\
    -v $PWD/aria2-config:/config \\
    -v $PWD/aria2-downloads:/downloads \\
    p3terx/aria2-pro
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个<code>&lt;TOKEN&gt;</code>可以随机生成，但是你要记住他是啥例如<code>GMzorZKDVND4tSpBaOgTJgFQZSqRW0J4</code></p><p>配置本机防火墙开放必要的入站端口，内网机器在路由器设置端口转发到相同端口。 使用你喜欢的 WebUI 或 App 进行连接，强烈推荐 AriaNg。</p><p>ariaNG安装与运行</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code>docker run -d \\
    --name ariang \\
    --restart unless-stopped \\
    --log-opt max-size=1m \\
    -p 6880:6880 \\
    p3terx/ariang
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),r=[a];function l(c,o){return n(),i("div",null,r)}const v=e(s,[["render",l],["__file","install-start.html.vue"]]);export{v as default};
