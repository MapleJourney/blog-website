import{_ as e,o as n,c as i,e as s}from"./app-88d36e46.js";const l={},d=s(`<h1 id="可选链操作符" tabindex="-1"><a class="header-anchor" href="#可选链操作符" aria-hidden="true">#</a> 可选链操作符</h1><p>为了防止发生<code>null</code>或者<code>undefined</code>可以使用<code>.?</code>来防止发生报错</p><p>例如:</p><p><strong>1. 访问对象属性：</strong></p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const user = {
  name: &#39;Alice&#39;,
  address: {
    city: &#39;New York&#39;
  }
};

// 普通访问方式
console.log(user.address.city); // 输出: &quot;New York&quot;

// 使用可选链操作符
console.log(user?.address?.city); // 输出: &quot;New York&quot;

// 如果对象属性不存在，不会引发错误
console.log(user?.age?.toString()); // 输出: undefined

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 调用函数或方法：</strong></p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const user = {
  name: &#39;Alice&#39;,
  sayHello: function() {
    console.log(\`Hello, my name is \${this.name}\`);
  }
};

// 普通调用方式
user.sayHello(); // 输出: &quot;Hello, my name is Alice&quot;

// 使用可选链操作符调用可能不存在的函数
user?.sayHello?.(); // 输出: &quot;Hello, my name is Alice&quot;

const nullUser = null;

// 使用可选链操作符调用可能为 null 的函数
nullUser?.sayHello?.(); // 什么都不会输出，不会引发错误

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>==可选链操作符是在 ECMAScript 2020（ES2020）中引入的新特性，可以在现代JavaScript环境中使用。==</p>`,8),a=[d];function c(r,v){return n(),i("div",null,a)}const o=e(l,[["render",c],["__file","optional-chaining.html.vue"]]);export{o as default};
