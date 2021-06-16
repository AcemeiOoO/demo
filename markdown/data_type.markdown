# 1.字符串  
ASCII字符可以以\x##形式的十六进制表示，例如：
```js
'\x41'; // 完全等同于 'A'
```
还可以用\u####表示一个Unicode字符：
```js
'\u4e2d\u6587'; // 完全等同于 '中文'
```
多行字符串  
```js
`这是一个
多行
字符串`;
```
模板字符串
```js
var name = '小明';
var age = 20;
var message = `你好, ${name}, 你今年${age}岁了!`;
alert(message);
```
相关api
```js
var s = 'Hello';
console.log(s.toUpperCase())       // 返回'HELLO'
console.log(s.toLowerCase())       // 返回'hello'
console.log(s.indexOf('world'))    // 返回-1
console.log(s.indexOf('ll'))       // 返回2
console.log(s.substring(3))       // 返回lo  (3到末尾)
```

# 2.数组
api
```js
var arr = [10, 20, '30', 'xyz'];
arr.indexOf(10);    // 元素10的索引为0
arr.slice();        //复制
push()/pop()
unshift()/shift()
sort()
reverse()
splice()
concat()
join()
```  

# 3.对象  
检测一个对象是够拥有某个属性
```js
var xiaoming = {
    name: '小明',
    birth: 1990,
    school: 'No.1 Middle School',
    height: 1.70,
    weight: 65,
    score: null
};
'name' in xiaoming; // true
```
in会将对象继承来的属性也判定为存在
```js
'toString' in xiaoming; // true
```
因为toString定义在object对象中，而所有对象最终都会在原型链上指向object，所以xiaoming也拥有toString属性。  
要判断一个属性是否是xiaoming自身拥有的，而不是继承得到的，可以用hasOwnProperty()方法:
```js
var xiaoming = {
    name: '小明'
};
xiaoming.hasOwnProperty('name'); // true
xiaoming.hasOwnProperty('toString'); // false
```
Map  
```js
var m = new Map(); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined
```
Set
```js
var s = new Set([1, 2, 3, 3, '3']);
s; // Set {1, 2, 3, "3"}
s.add(4);
s; // Set {1, 2, 3, 4}
s.add(4);
s; // 仍然是 Set {1, 2, 3, 4}
s.delete(3);   //Set {1, 2, 4}
```
Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。  
ES6标准引入了新的iterable类型，Array、Map和Set都属于iterable类型。具有iterable类型的集合可以通过新的for ... of循环来遍历，或者直接使用iterable内置的forEach方法
```js
// for...in...的奇怪问题
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x in a) {
    console.log(x); // '0', '1', '2', 'name'
}

// for...of...
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x of a) {
    console.log(x); // 'A', 'B', 'C'
}
```

# 4.函数
每一个函数内部都有arguments属性，箭头函数没有。  
JavaScript引擎在行末自动添加分号。  
解构赋值
```js
[a, b] = [b, a]
[a, b, ...rest] = [10, 20, 30, 40, 50];
{name, age} = xiaoming
{a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40}
var {name, single=true} = person;
var {hostname:domain, pathname:path} = location;
//若x,y已经声明 再次赋值时会报错
var x, y;
{x, y} = { name: '小明', x: 100, y: 200};// 语法错误: Uncaught SyntaxError: Unexpected token =
({x, y} = { name: '小明', x: 100, y: 200});//不报错
```

# 5.方法**  
绑定到对象上的函数称为方法。  
在一个方法内部，this是一个特殊变量，它始终指向当前对象。  
```js
var myage = function (aaa) {
    var y = new Date().getFullYear();
    return y - this.birth-aaa;
}
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: myage
};

var fn = xiaoming.age;
console.log(fn(5)); // NaN      要保证this指向正确，必须用obj.xxx()的形式调用！
console.log(myage(5)); //NaN
console.log(xiaoming.age(5)); //26
console.log(myage.apply(xiaoming,[5])); //26
console.log(myage.call(xiaoming,5)); //26
```
装饰器
```js
// 统计parseInt被调用了多少次
var count = 0;
var oldParseInt = parseInt; // 保存原函数

window.parseInt = function () {
    count += 1;
    return oldParseInt.apply(null, arguments); // 调用原函数
};
```

# 6.高阶函数  
一个函数就接收另一个函数作为参数，这种函数就称之为高阶函数。  
```js
function add(x, y, f) {
    return f(x) + f(y);
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(String); // ['1', '2', '3', '4', '5', '6', '7', '8', '9']

arr.reduce(function (x, y) {}); 
//x < y，则返回-1，如果认为x == y，则返回0，如果认为x > y，则返回1
arr.sort((x, y)=>{return x-y}); //升序
arr.sort((x, y)=>{return y-x});  //降序
```

# 7.闭包  
```js
function mysum(){
    let arr = []
    for (let i = 1; i <= 3; i++) {
        arr.push((function(n){
            return function(){
                return n*n
            }
        })(i))
    }
    return arr
}
let myarr = mysum()
console.log(myarr[0]());
console.log(myarr[1]());
console.log(myarr[2]());
```

# 8.箭头函数  
箭头函数内部的this是词法作用域，由上下文确定。
```js
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};
obj.getAge(); // 25
// call()无法改变箭头函数的指向
var obj = {
    birth: 1990,
    getAge: function (year) {
        var b = this.birth; // 1990
        var fn = (y) => y - this.birth; // this.birth仍是1990
        return fn.call({birth:2000}, year);
    }
};
obj.getAge(2015); // 25
```

# 9.generator（生成器）  
```js
try {
    r1 = yield ajax('http://url-1', data1);
    r2 = yield ajax('http://url-2', data2);
    r3 = yield ajax('http://url-3', data3);
    success(r3);
}
catch (err) {
    handle(err);
}
```

# 10.包装对象  
number、boolean和string都有包装对象，用new创建：
```js
var n = new Number(123); // 123,生成了新的包装类型
var b = new Boolean(true); // true,生成了新的包装类型
var s = new String('str'); // 'str',生成了新的包装类型
```
包装对象定义的值的类型为object，和原始值不同。
```js
typeof new Number(123); // 'object'
new Number(123) === 123; // false

typeof new Boolean(true); // 'object'
new Boolean(true) === true; // false

typeof new String('str'); // 'object'
new String('str') === 'str'; // false
```
Number()、Boolean和String()可以用做普通函数，把任何类型的数据转换为number、boolean和string类型。  
除了null和undefined所有对象都有toString()方法。

# 11.Date  
当前时间是浏览器从本机操作系统获取的时间
```js
var now = new Date();
now; // Wed Jun 24 2015 19:49:22 GMT+0800 (CST)
now.getFullYear(); // 2015, 年份
now.getMonth(); // 5, 月份，注意月份范围是0~11，5表示六月
now.getDate(); // 24, 表示24号
now.getDay(); // 3, 表示星期三
now.getHours(); // 19, 24小时制
now.getMinutes(); // 49, 分钟
now.getSeconds(); // 22, 秒
now.getMilliseconds(); // 875, 毫秒数
now.getTime(); // 1435146562875, 以number形式表示的时间戳
```
创建一个指定日期和时间的Date对象（月份范围用整数表示是0~11）
```js
var d = new Date(2015, 5, 19, 20, 15, 30, 123);
d; // Fri Jun 19 2015 20:15:30 GMT+0800 (CST)

var d = Date.parse('2015-06-24T19:49:22.875+08:00');//符合ISO 8601格式的字符串
d; // 1435146562875
var d = new Date(1435146562875);
d; // Wed Jun 24 2015 19:49:22 GMT+0800 (CST)
d.getMonth(); // 5
//时间戳可以精确地表示一个时刻，并且与时区无关
d.toLocaleString(); // '2015/6/24 下午7:49:22'，本地时间（北京时区+8:00），显示的字符串与操作系统设定的格式有关
d.toUTCString(); // 'Wed, 24 Jun 2015 11:49:22 GMT'，UTC时间，与本地时间相差8小时
```

# 12.正则表达式  
写法
```js
// g i m(多行匹配)
var re1 = /^\d{3}\-\d{3,8}$/;
var re2 = new RegExp('^\\d{3}\\-\\d{3,8}$');

re1;
re2;
re1.test('010-12345'); // true
re2.test('010-1234x'); // false
```
\d数字  
\w字母或数字  
.任意一个字符  
*任意个字符  
+至少一个字符  
?0个或1个字符  
{n}n个字符  
{n,m}n-m个字符  
[]范围  
|或者  
^开头  
$结尾  
```js
let str = ''
str.replace(/[a-zA-Z\_\$][0-9a-zA-Z\_\$]*/,'');
str.replace(/^js$/,'');//整行匹配
```
分组
```js
var re = /^(0[0-9]|1[0-9]|2[0-3]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])$/;
console.log(re.exec('19:05:30')); // ['19:05:30', '19', '05', '30']
```
贪婪匹配
```js
var re = /^(\d+)(0*)$/;
re.exec('102300'); // ['102300', '102300', '']

var re = /^(\d+?)(0*)$/;
re.exec('102300'); // ['102300', '1023', '00']
```

# 13.JSON  
JSON是JavaScript Object Notation的缩写，它是一种数据交换格式。  
JSON是JavaScript的一个子集。在JSON中，一共有number、boolean、string、null、array、object这六种数据类型。  
JSON定死了字符集必须是UTF-8，必须用双引号""。  
序列化
```js
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};
// 按缩进输出
JSON.stringify(xiaoming, null, '  ');

// 只输出指定的属性
JSON.stringify(xiaoming, ['name', 'skills'], '  ');

// 传入一个函数，这样对象的每个键值对都会被函数先处理
function convert(key, value) {
    if (typeof value === 'string') {
        return value.toUpperCase();
    }
    return value;
}
JSON.stringify(xiaoming, convert, '  ');//所有属性值都会变成大写

// toJSON方法精确控制如何序列化
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
    toJSON: function () {
        return { // 只输出name和age，并且改变了key：
            'Name': this.name,
            'Age': this.age
        };
    }
};
JSON.stringify(xiaoming); // '{"Name":"小明","Age":14}'
```
反序列化
```js
// JSON.parse()可以接收一个函数
var obj = JSON.parse('{"name":"小明","age":14}', function (key, value) {
    if (key === 'name') {
        return value + '同学';
    }
    return value;
});
console.log(JSON.stringify(obj)); // {name: '小明同学', age: 14}
```

# 14.面向对象编程  
大多数面向对象编程都有类和实例的概念，但是js不区分类和实例的概念，而是通过原型来实现面向对象编程。  
## 创建对象
js中一切皆对象。可以通过把一个对象a的原型指向另一个对象B，来表示a是从B继承来的，具有B的属性和方法。  
```js
// Object.create()方法可以传入一个原型对象，并创建一个基于该原型的新对象，但是新对象除了继承来的属性外，什么属性都没有
// 使用__proto__指定原型简单粗暴，但ie可能不兼容
// 原型对象:
var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

function createStudent(name) {
    // 基于Student原型创建一个新对象:
    var s = Object.create(Student);
    // 初始化新对象:
    s.name = name;
    return s;
}

var xiaoming = createStudent('小明');
xiaoming.run(); // 小明 is running...
xiaoming.__proto__ === Student; // true
```
JavaScript对每个创建的对象都会设置一个原型，指向它的原型对象。

当我们用obj.xxx访问一个对象的属性时，JavaScript引擎先在当前对象上查找该属性，如果没有找到，就到其原型对象上找，如果还没有找到，就一直上溯到Object.prototype对象，最后，如果还没有找到，就只能返回undefined。
```js
// 当我们创建一个函数时：
function foo() {
    return 0;
}

// 函数也是一个对象，它的原型链是：
foo ----> Function.prototype ----> Object.prototype ----> null

// 由于Function.prototype定义了apply()等方法，因此，所有函数都可以调用apply()方法。
```
创建对象有两种方法，第一种是直接使用{...}，第二种是使用构造函数的方法。
```js
// 定义一个构造函数
function Student(name) {
    this.name = name;
    this.hello = function () {
        alert('Hello, ' + this.name + '!');
    }
}

// 使用关键字new来调用这个函数，并返回一个对象
var xiaoming = new Student('小明');
xiaoming.name; // '小明'
xiaoming.hello(); // Hello, 小明!

console.log('hello' in xiaoming);//true
console.log(xiaoming.hasOwnProperty('hello'));//true

// 原型链
xiaoming ----> Student.prototype ----> Object.prototype ----> null

// 用new Student()创建的对象还从原型上获得了一个constructor属性，它指向函数Student本身
xiaoming.constructor === Student.prototype.constructor; // true
Student.prototype.constructor === Student; // true

Object.getPrototypeOf(xiaoming) === Student.prototype; // true

xiaoming instanceof Student; // true
```
将方法定义在构造函数内部时，每个新生成的对象都会新生成自己的方法。因为方法的功能是一样的，这样会非常浪费内存。因此可以把方法定义在原型上，使用时在原型上查找。
```js
function Student(name) {
    this.name = name;
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
};

console.log('hello' in xiaoming);//true
console.log(xiaoming.hasOwnProperty('hello'));//false
```
调用构造函数时一定要写new。  
一个常用的编程模式：
```js
function Student(props) {
    this.name = props.name || '匿名'; // 默认值为'匿名'
    this.grade = props.grade || 1; // 默认值为1
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
};

function createStudent(props) {
    return new Student(props || {})
}

// 调用
var xiaoming = createStudent({
    name: '小明'
});

xiaoming.grade; // 1
```

## 原型继承
要正确实现原型的继承，需要用一个空函数F：
```js
// PrimaryStudent构造函数:
function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 空函数F:
function F() {
}

// 把F的原型指向Student.prototype:
F.prototype = Student.prototype;

// 把PrimaryStudent的原型指向一个新的F对象，F对象的原型正好指向Student.prototype:
PrimaryStudent.prototype = new F();

// 把PrimaryStudent原型的构造函数修复为PrimaryStudent:
PrimaryStudent.prototype.constructor = PrimaryStudent;

// 继续在PrimaryStudent原型（就是new F()对象）上定义方法：
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};

// 创建xiaoming:
var xiaoming = new PrimaryStudent({
    name: '小明',
    grade: 2
});
xiaoming.name; // '小明'
xiaoming.grade; // 2

// 验证原型:
xiaoming.__proto__ === PrimaryStudent.prototype; // true
xiaoming.__proto__.__proto__ === Student.prototype; // true

// 验证继承关系:
xiaoming instanceof PrimaryStudent; // true
xiaoming instanceof Student; // true
```
封装继承的函数：
```js
function inherits(Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}
```
调用封装后的函数：
```js
function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}

function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 实现原型继承链:
inherits(PrimaryStudent, Student);

// 绑定其他方法到PrimaryStudent原型:
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};
```

## class
es6开始可以使用class来定义类。
```js
class Student {
    constructor(name) {
        this.name = name;
    }

    hello() {
        alert('Hello, ' + this.name + '!');
    }
}
```
class的继承
```js
class PrimaryStudent extends Student {
    constructor(name, grade) {
        super(name); // 记得用super调用父类的构造方法!
        this.grade = grade;
    }

    // 定义在原型上的方法
    myGrade() {
        alert('I am at grade ' + this.grade);
    }

    // 定义在构造函数上的方法
    static reject(){
        
    }
}
```