import{_ as n,o as s,c as a,e}from"./app-88d36e46.js";const t={},i=e(`<h1 id="nginx-利用容器别名配置反向代理" tabindex="-1"><a class="header-anchor" href="#nginx-利用容器别名配置反向代理" aria-hidden="true">#</a> nginx 利用容器别名配置反向代理</h1><p>不同的容器想要使用docker nginx 反向代理, 需要相关的容器放在同一个docker 网络中. 同时利用docker 自动生成的容器别名.</p><p>可以通过以下命令查看当前容器是否拥有容器别名</p><div class="language-linux line-numbers-mode" data-ext="linux"><pre class="language-linux"><code>docker inspect 容器名/id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="docker-compose-配置" tabindex="-1"><a class="header-anchor" href="#docker-compose-配置" aria-hidden="true">#</a> docker-compose 配置</h2><p>在分别创建容器时可以在 docker-compose.yaml 或 docker-compose.yml 文件中配置 <code>networks</code> 字段, 并且配置添加到外置相应的docker 网络中</p><p>nginx docker-compose 配置如下(其他容器类似)</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
 <span class="token key atrule">nginx</span><span class="token punctuation">:</span>
   <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>latest
   <span class="token key atrule">container_name</span><span class="token punctuation">:</span> nginx
   <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
     <span class="token punctuation">-</span> /path<span class="token punctuation">:</span>/etc/nginx
   <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
   <span class="token key atrule">networks</span><span class="token punctuation">:</span>
     <span class="token punctuation">-</span> my<span class="token punctuation">-</span>network <span class="token comment"># 自定义的docker 网络名 (默认的 bridge 网络未验证是否可行)</span>
   <span class="token key atrule">ports</span><span class="token punctuation">:</span>
     <span class="token punctuation">-</span> <span class="token datetime number">80:80</span>
     <span class="token punctuation">-</span> 443<span class="token punctuation">:</span><span class="token number">443</span>


<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">my-network</span><span class="token punctuation">:</span>
    <span class="token key atrule">external</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>network

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>nginx 配置文件中只需要将代理的<code>ip</code>地址替换成相应的容器名称即可</p>`,9),c=[i];function l(p,o){return s(),a("div",null,c)}const d=n(t,[["render",l],["__file","nginx-dynamics-proxy.html.vue"]]);export{d as default};
