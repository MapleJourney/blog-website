import{_ as n,o as s,c as a,e}from"./app-88d36e46.js";const t={},p=e(`<h2 id="修改日志颜色" tabindex="-1"><a class="header-anchor" href="#修改日志颜色" aria-hidden="true">#</a> 修改日志颜色</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> copy
<span class="token keyword">from</span> colorlog <span class="token keyword">import</span> ColoredFormatter
<span class="token keyword">import</span> scrapy<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>log

color_formatter <span class="token operator">=</span> ColoredFormatter<span class="token punctuation">(</span>
    <span class="token punctuation">(</span>
        <span class="token string">&#39;%(log_color)s%(levelname)-5s%(reset)s &#39;</span>
        <span class="token string">&#39;%(yellow)s[%(asctime)s]%(reset)s&#39;</span>
        <span class="token string">&#39;%(white)s %(name)s %(funcName)s %(bold_purple)s:%(lineno)d%(reset)s &#39;</span>
        <span class="token string">&#39;%(log_color)s%(message)s%(reset)s&#39;</span>
    <span class="token punctuation">)</span><span class="token punctuation">,</span>
    datefmt<span class="token operator">=</span><span class="token string">&#39;%y-%m-%d %H:%M:%S&#39;</span><span class="token punctuation">,</span>
    log_colors<span class="token operator">=</span><span class="token punctuation">{</span>
        <span class="token string">&#39;DEBUG&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;white&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;INFO&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;green&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;WARNING&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;yellow&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;ERROR&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;CRITICAL&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;red,bg_white&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>

_get_handler <span class="token operator">=</span> copy<span class="token punctuation">.</span>copy<span class="token punctuation">(</span>scrapy<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>log<span class="token punctuation">.</span>_get_handler<span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">_get_handler_custom</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
    handler <span class="token operator">=</span> _get_handler<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
    handler<span class="token punctuation">.</span>setFormatter<span class="token punctuation">(</span>color_formatter<span class="token punctuation">)</span>
    <span class="token keyword">return</span> handler

scrapy<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>log<span class="token punctuation">.</span>_get_handler <span class="token operator">=</span> _get_handler_custom
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[p];function c(l,i){return s(),a("div",null,o)}const u=n(t,[["render",c],["__file","scrapy.html.vue"]]);export{u as default};
