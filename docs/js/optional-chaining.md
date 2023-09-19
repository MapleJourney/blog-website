# 可选链操作符

为了防止发生`null`或者`undefined`可以使用`.?`来防止发生报错

例如:

**1. 访问对象属性：**

```JavaScript
const user = {
  name: 'Alice',
  address: {
    city: 'New York'
  }
};

// 普通访问方式
console.log(user.address.city); // 输出: "New York"

// 使用可选链操作符
console.log(user?.address?.city); // 输出: "New York"

// 如果对象属性不存在，不会引发错误
console.log(user?.age?.toString()); // 输出: undefined

```

**2. 调用函数或方法：**

```JavaScript
const user = {
  name: 'Alice',
  sayHello: function() {
    console.log(`Hello, my name is ${this.name}`);
  }
};

// 普通调用方式
user.sayHello(); // 输出: "Hello, my name is Alice"

// 使用可选链操作符调用可能不存在的函数
user?.sayHello?.(); // 输出: "Hello, my name is Alice"

const nullUser = null;

// 使用可选链操作符调用可能为 null 的函数
nullUser?.sayHello?.(); // 什么都不会输出，不会引发错误

```

==可选链操作符是在 ECMAScript 2020（ES2020）中引入的新特性，可以在现代JavaScript环境中使用。==
