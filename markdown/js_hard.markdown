## 1. 变量提升和函数提升  
JavaScript会将所有变量和函数声明移动到它的作用域的最前面，这就是所谓的**变量提升(Hoisting)**。  

### 变量提升
例子：
```js
    console.log(v1);
    var v1 = 100;
    function foo() {
        console.log(v1);
        var v1 = 200;
        console.log(v1);
    }
    foo();
    console.log(v1);
```

输出结果：
```js
    //undefined
    //undefined
    //200
    //100
```

执行顺序相当于：
```js
    function foo() {
        var v1
        console.log(v1);
        v1 = 200;
        console.log(v1);
    }
```
由于函数体内重新声明了v1，把父作用域的v1给覆盖了，因此会输出undefined。  


### 函数提升
具名函数的声明有两种方式：  
1. 函数声明式   
2. 函数字面量式  
```js
    //函数声明式
    function bar () {}
    //函数字面量式 
    var foo = function () {}
```
函数字面量式的声明和变量提升的结果是一样的，函数只是一个具体的值；但函数声明式的提升现象和变量提升略有不同。  
例子：
```js
    foo(); //1
    
    var foo;
    
    function foo () {
        console.log(1);
    }
    
    foo = function () {
        console.log(2);
    }
```

## 2. 多次声明同一个变量
使用var进行变量声明时，多次声明同一个变量并不会报错，js会对后续声明视而不见，但会执行后续声明中的变量初始化赋值。匿名函数可以来模仿块级作用域来避免重复声明的问题。  
使用let进行变量声明时，多次声明同一个变量会报错。

## 3. apply, call与bind方法
JavaScript开发者有必要理解apply、call与bind方法的不同点。它们的共同点是第一个参数都是this，即函数运行时依赖的上下文。

三者之中，call方法是最简单的，它等价于指定this值调用函数：
```js
    var user = {
        name: "Rahul Mhatre",
        whatIsYourName: function() {
            console.log(this.name);
        }
    };

    user.whatIsYourName(); // 输出"Rahul Mhatre",

    var user2 = {
        name: "Neha Sampat"
    };

    user.whatIsYourName.call(user2); // 输出"Neha Sampat"
```

apply方法与call方法类似。两者唯一的不同点在于，apply方法使用数组指定参数，而call方法每个参数单独需要指定：
- apply(thisArg, [argsArray])
- call(thisArg, arg1, arg2, …)
```js
    var user = {
        greet: "Hello!",
        greetUser: function(userName) {
            console.log(this.greet + " " + userName);
        }
    };

    var greet1 = {
        greet: "Hola"
    };

    user.greetUser.call(greet1, "Rahul"); // 输出"Hola Rahul"
    user.greetUser.apply(greet1, ["Rahul"]); // 输出"Hola Rahul"
```

使用bind方法，可以为函数绑定this值，然后作为一个新的函数返回：
```js
    var user = {
        greet: "Hello!",
        greetUser: function(userName) {
            console.log(this.greet + " " + userName);
        }
    };

    var greetHola = user.greetUser.bind({greet: "Hola"});
    var greetBonjour = user.greetUser.bind({greet: "Bonjour"});

    greetHola("Rahul") // 输出"Hola Rahul"
    greetBonjour("Rahul") // 输出"Bonjour Rahul"
```

## 4. 闭包中的this
this，一般而言，在JavaScript中，this指向函数执行时的当前对象，但是当没有明确的对象的时候，this就是指向全局对象window。
```js
    var name = "The Window";
    var obj = {
        name: "My Object",
        getNameFunc: function () {
                //this是指obj对象
                return function () {
                    //this是指window对象
                    return this.name; 
                };
            }
    };
    alert(obj.getNameFunc()());//The Window

    var name = "The Window";
    var object = {
        name: "My Object",
        getNameFunc: function () {
            var that = this;
            return function () {
                return that.name;
            };
        }
    };
    alert(object.getNameFunc()());//My Object
```
一般，函数内部的变量是运行完即销毁的，闭包函数可以访问父函数的变量，可使父函数的变量一直存在于内存中。  
通常闭包函数的this指向window。

## 5. 闭包（closure）定义私有变量
通常，JavaScript开发者使用下划线作为私有变量的前缀。但是实际上，这些变量依然可以被访问和修改，并非真正的私有变量。这时，使用闭包可以定义真正的私有变量：  
```js
    function Product() {

        var name;

        this.setName = function(value) {
            name = value;
        };

        this.getName = function() {
            return name;
        };
    }

    var p = new Product();
    p.setName("Fundebug");

    console.log(p.name); // 输出undefined
    console.log(p.getName()); // 输出Fundebug
```
代码中，对象p的的name属性为私有属性，使用p.name不能直接访问。


## 6. 立即执行函数
```js
    (function() {
        // 代码
        // ...
    })();
```
立即执行函数也可以理解为立即调用一个匿名函数。立即执行函数最常见的应用场景就是：将var变量的作用域限制于你们函数内，这样可以避免命名冲突。

## 7. 模块化
JavaScript并非模块化编程语言，至少ES6落地之前都不是。然而对于一个复杂的Web应用，模块化编程是一个最基本的要求。这时，可以使用立即执行函数来实现模块化，正如很多JS库比如jQuery以及我们Fundebug都是这样实现的。
```js
    var module = (function() {
        var N = 5;

        function print(x) {
            console.log("The result is: " + x);
        }

        function add(a) {
            var x = a + N;
            print(x);
        }

        return {
            description: "This is description",
            add: add
        };
    })();


    console.log(module.description); // 输出"this is description" 

    module.add(5); // 输出“The result is: 10”
```
所谓模块化，就是根据需要控制模块内属性与方法的可访问性，即私有或者公开。在代码中，module为一个独立的模块，N为其私有属性，print为其私有方法，decription为其公有属性，add为其共有方法。

## 8. 函数重载
所谓函数重载(method overloading)，就是函数名称一样，但是输入输出不一样。或者说，允许某个函数有各种不同输入，根据不同的输入，返回不同的结果。凭直觉，函数重载可以通过if...else或者switch实现，这就不去管它了。jQuery之父John Resig提出了一个非常巧(bian)妙(tai)的方法，利用了闭包。

从效果上来说，people对象的find方法允许3种不同的输入: 0个参数时，返回所有人名；1个参数时，根据firstName查找人名并返回；2个参数时，根据完整的名称查找人名并返回。

难点在于，people.find只能绑定一个函数，那它为何可以处理3种不同的输入呢？它不可能同时绑定3个函数find0,find1与find2啊！这里的关键在于old属性。

由addMethod函数的调用顺序可知，people.find最终绑定的是find2函数。然而，在绑定find2时，old为find1；同理，绑定find1时，old为find0。3个函数find0,find1与find2就这样通过闭包链接起来了。

根据addMethod的逻辑，当f.length与arguments.length不匹配时，就会去调用old，直到匹配为止。
```js
    function addMethod(object, name, f)
    {　　
        var old = object[name];　　
        object[name] = function()
        {
            // f.length为函数定义时的参数个数
            // arguments.length为函数调用时的参数个数　　　　
            if (f.length === arguments.length)
            {　　
                return f.apply(this, arguments);　　//把定义的函数find0应用过来　　
            }
            else if (typeof old === "function")
            {
                return old.apply(this, arguments);　　　　
            }　　
        };
    }


    // 不传参数时，返回所有name
    function find0()
    {　　
        return this.names;
    }


    // 传一个参数时，返回firstName匹配的name
    function find1(firstName)
    {　　
        var result = [];　　
        for (var i = 0; i < this.names.length; i++)
        {　　　　
            if (this.names[i].indexOf(firstName) === 0)
            {　　　　　　
                result.push(this.names[i]);　　　　
            }　　
        }　　
        return result;
    }


    // 传两个参数时，返回firstName和lastName都匹配的name
    function find2(firstName, lastName)
    {　
        var result = [];　　
        for (var i = 0; i < this.names.length; i++)
        {　　　　
            if (this.names[i] === (firstName + " " + lastName))
            {　　　　　　
                result.push(this.names[i]);　　　　
            }　　
        }　　
        return result;
    }


    var people = {　　
        names: ["Dean Edwards", "Alex Russell", "Dean Tom"]
    };


    addMethod(people, "find", find0);
    addMethod(people, "find", find1);
    addMethod(people, "find", find2);


    console.log(people.find()); // 输出["Dean Edwards", "Alex Russell", "Dean Tom"]
    console.log(people.find("Dean")); // 输出["Dean Edwards", "Dean Tom"]
    console.log(people.find("Dean", "Edwards")); // 输出["Dean Edwards"]
```

## 9. prototype
每个JavaScript构造函数都有一个prototype属性，用于设置所有实例对象需要共享的属性和方法。prototype属性不能列举。JavaScript仅支持通过prototype属性进行继承属性和方法。  
```js
    function Rectangle(x, y)
    {
        this._length = x;
        this._breadth = y;
    }

    Rectangle.prototype.getDimensions = function()
    {
        return {
            length: this._length,
            breadth: this._breadth
        };
    };

    var x = new Rectangle(3, 4);
    var y = new Rectangle(4, 3);

    console.log(x.getDimensions()); // { length: 3, breadth: 4 }
    console.log(y.getDimensions()); // { length: 4, breadth: 3 }
```
代码中，x和y都是构造函数Rectangle创建的对象实例，它们通过prototype继承了getDimensions方法。  

## 10. 柯里化
柯里化，即Currying，可以是函数变得更加灵活。我们可以一次性传入多个参数调用它；也可以只传入一部分参数来调用它，让它返回一个函数去处理剩下的参数。
```js
    var add = function(x) {
        return function(y) {
            return x + y;
        };
    };

    console.log(add(1)(1)); // 输出2

    var add1 = add(1);
    console.log(add1(1)); // 输出2

    var add10 = add(10);
    console.log(add10(1)); // 输出11
```
代码中，我们可以一次性传入2个1作为参数add(1)(1)，也可以传入1个参数之后获取add1与add10函数，这样使用起来非常灵活。

## 11. 递归
在程序设计中我们经常会用到递归函数，下面以求1到N的和为例子，跟大家分享一下使用arguments.callee实现匿名函数的递归。

常规方法如下：
```js
    var fn =function(n){
        if(n>=1){
            return n+fn(n-1);
        }
        return 0;
    }
    alert(fn(10));//55
```
 
上面的是普通做法，但在复杂的程序设计中我们或许只要求调用一次该函数，在要求尽量少的函数名定义时，匿名函数是我们的比较理想的选择。  
匿名函数的递归可以使用arguments.callee来实现。arguments.callee指代的是当前执行的函数的一个引用。
```js
    var b=(function(n){
        if(n>=1){
            return n+arguments.callee(n-1);
        }
        return 0;
    })(10);
    alert(b);
```

## 12. Memoization
Memoization用于优化比较耗时的计算，通过将计算结果缓存到内存中，这样对于同样的输入值，下次只需要中内存中读取结果。
```js
    function memoizeFunction(func)
    {
        var cache = {};
        return function()
        {
            var key = arguments[0];
            if (cache[key])
            {
                return cache[key];
            }
            else
            {
                var val = func.apply(this, arguments);//apply只是改变了函数运行的环境和参数的结构
                cache[key] = val;
                return val;
            }
        };
    }


    var fibonacci = memoizeFunction(function(n)
    {
        return (n === 0 || n === 1) ? n : fibonacci(n - 1) + fibonacci(n - 2);
    });

    console.log(fibonacci(100)); // 输出354224848179262000000
    console.log(fibonacci(100)); // 输出354224848179262000000
```
代码中，第2次计算fibonacci(100)则只需要在内存中直接读取结果。

我的理解：  
    递归时会先执行函数体里遇到的第一个函数f1，在第一个函数f1中遇到新的函数f2时，会接着执行遇见的函数f2,直至执行完成，再一个个返回。（之前知道递归的思想，现在理解更深刻了）

    从打印的日志看运行过程。
    1、计算fibonacci(100)，实际为执行函数memoizeFunction(function(100){})，此时cache里没有n为100时的结果，因此开始执行真正计算的函数体。
    2、计算fibonacci(n - 1) + fibonacci(n - 2)时先遇见fibonacci(99)，于是开始执行fibonacci(99)。
    3、n为99的计算值不在cache中，继续计算fibonacci(98) + fibonacci(97)中的fibonacci(98)（会先计算前面一个，计算完之后再计算后面一个）。
    4、计算fibonacci(97)
    5、计算fibonacci(96)
    ...
    i、计算fibonacci(1) + fibonacci(0)，这两个都可直接计算出，因此先计算完n=1，再计算完n=0,再计算完n=2。
    i+1、接着计算n=3时的fibonacci(2) + fibonacci(1)，此时fibonacci(2)有返回值，接下来执行fibonacci(1)，此时fibonacci(1)已经储存在了cache中，可直接取出，返回fibonacci(3)。
    i+2、接着计算n=4时的fibonacci(3) + fibonacci(2)中的fibonacci(2)(可直接取出)
    ...
    k、计算n=100时的fibonacci(99) + fibonacci(98)中的fibonacci(98)(可直接取出)，返回fibonacci(100)
    k+1、第二次计算fibonacci(100)时可直接取出

```js
        function memoizeFunction(func)
        {
            var cache = {};
            return function()
            {
                console.log('start',arguments[0]);
                var key = arguments[0];
                if (cache[key])
                {
                    console.log('end in cathe');
                    return cache[key];
                }
                else
                {
                    console.log(111);
                    var val = func.apply(this, arguments);//函数在这个地方才真正执行
                    cache[key] = val;
                    console.log('end n',key);
                    return val;
                }
            };
        }


        var fibonacci = memoizeFunction(function(n)
        {
            console.log('n',n);
            return (n === 0 || n === 1) ? n : fibonacci(n - 1) + fibonacci(n - 2);
        });

        console.log(fibonacci(100)); // 输出354224848179262000000
        console.log(fibonacci(100)); // 输出354224848179262000000
```

```js
        // 注释掉存入cache的步骤后电脑差点崩了！
        // 又试了一次电脑又开始响了！不试了！！
        function memoizeFunction(func)
        {
            var cache = {};
            return function()
            {
                console.log('start',arguments[0]);
                var key = arguments[0];
                // if (cache[key])
                // {
                //     console.log('end in cathe');
                //     return cache[key];
                // }
                // else
                // {
                    console.log(111);
                    var val = func.apply(this, arguments);
                    cache[key] = val;
                    console.log('end n',key);
                    return val;
                // }
            };
        }


        var fibonacci = memoizeFunction(function(n)
        {
            console.log('n',n);
            return (n === 0 || n === 1) ? n : fibonacci(n - 1) + fibonacci(n - 2);
        });

        console.log(fibonacci(100)); // 输出354224848179262000000
        // console.log(fibonacci(100)); // 输出354224848179262000000
```

## 13. 闭包、返回一个函数
执行aaa()、bbb()时，由于函数体里没有i，因此会链接到外部，即全局i。当全局i改变后，函数执行输出的是改变后的i。
```js
        var i = 10
        aaa = function(){
            console.log('i =',i);
        }
        i = 100
        bbb = function(){
            console.log('i =',i);
        }
        aaa()//i = 100
        bbb()//i = 100
```
ccc是一个函数，该函数会返回一个函数。
ddd是一个立即执行函数。
```js
        var i = 10
        ccc = (num) => {
            return function(){
                console.log('i =',num);
            }
        }
        ccc = ccc(i)

        i = 100
        ddd = function(num){
            console.log('i =',num);
        }(i)//i = 100

        ccc()//i = 10
```

