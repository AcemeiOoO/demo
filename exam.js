// process.stdin.resume();
// process.stdin.setEncoding('ascii');

// 控制输入输出
var lines = "";
var k = 0;
var output = "";

// 定义变量
var n,done,len,max,min;


// process.stdin.on('data', function (data) {
//     // 本地调试时
//     // 一行一行获取输入,输出end看结果
//     // 会触发output
//     if(++k%2!=0){
//         lines = data.trim().split(' ');
//         n = parseInt(lines[0]);
//         done = [];
//         len = parseInt(lines[1]);
//         max = Math.max(parseInt(lines[2]),parseInt(lines[3]));
//         min = Math.min(parseInt(lines[2]),parseInt(lines[3]));
//     }else{
//         lines = data.split(' ');
//         for(var i = 0; i < len; i++){
//             done.push(parseInt(lines[i]));
//         }
//         output += findRes()+'\n'
//     }
//     if(data.trim() == 'end'){
//         process.stdin.emit('end');
//         return
//     }


// // //    考试时
// //     // 所有的数据在一个变量给出来
// //     data=data.split('\n')
// //     data.splice(data.length-1,1)
// //     while((++k)<=data.length){
// //         if(k%2!=0){
// //             lines = data[k-1].trim().split(' ');
// //             n = parseInt(lines[0]);
// //             done = [];
// //             len = parseInt(lines[1]);
// //             max = Math.max(parseInt(lines[2]),parseInt(lines[3]));
// //             min = Math.min(parseInt(lines[2]),parseInt(lines[3]));
// //         }else{
// //             lines = data[k-1].split(' ');
// //             for(var i = 0; i < len; i++){
// //                 done.push(parseInt(lines[i]));
// //             }
// //             console.log(findRes())
// //         }
// //     }

// // 输出
// // process.stdout.write()
    
// });

// process.stdin.on('end', function () {
//    console.log('结果是：');
//    console.log(output.slice(0,-1));
// });


function findMax(arr){
    var res = arr[0];
    for(var i = 1; i < arr.length; i++){
        res = Math.max(arr[i], res);
    }
    return res;
}
function findMin(arr){
    var res = arr[0];
    for(var i = 1; i < arr.length; i++){
        res = Math.min(arr[i], res);
    }
    return res;
}
function findRes(){
    if(n < 2){
        return 'NO';
    }
    if(max == findMax(done) && min == findMin(done)){
        return 'YES';
    }else{
        if(n>done.length){
            if(max == findMax(done)||min == findMin(done)){
                return 'YES';
            }
            if(n-done.length<2){
                return 'NO';
            }else{
                done.push(min,max);
                return max == findMax(done) && min == findMin(done) ? 'YES':'NO';
            }
        }
        return 'NO';
    }
}



// // 父对象
// function Person(name){
//     this.name = name
// }
// Person.prototype.age = 10

// // 组合继承
// function Sub(name){
//     Person.call(this,name)
// }
// Sub.prototype = new Person()

// let s = new Sub('Jane')
// console.log(s.name);
// console.log(s.age);
// console.log(s instanceof Person);
// console.log(Sub.prototype.constructor);
// console.log(Sub.__proto__);


// // 刷墙
// // let n = 3
// // let str='001'
// // let n = 7
// // let str='0100100'
// let min = 999999
// for(let i = 0; i <= n; i++){
//     let a=0
//     let b=0
//     for (let j = 0; j < n; j++) {
//         if(j<i){
//             if(str[j]=='0'){
//                 a++
//             }
//         }else{
//             if(str[j]=='1'){
//                 b++
//             }
//         }
//     }
//     min = Math.min(min,a+b)
// }
// console.log('min',min);




// var lines = readline();
// lines = lines.split(" ");
// var k = parseInt(lines[0]);
// var full = parseInt(lines[1]);
// var arr = readline().split(" ");
// k = 4
// full = 10
// arr=[1,2,5,9]
// arr.sort((a,b)=>{return b-a});
// var i = 0;
// console.log(arr);
// for (var i = 0; i < arr.length; i++) {
//     if(arr.indexOf(full-arr[i])!=-1&&arr.indexOf(full-arr[i])!=i){
//         print(2)
//         var res = Math.min(full-arr[i],arr[i]) + ' '+Math.max(arr[i],full-arr[i])
//         print(res)
//     }
// }
// while(full>0&&i<k){
//     full = full - arr[i++]
// }
// if(full>0){
//     return -1
// }else{
//     // print(i)
//     console.log(i);
//     var res = ''
//     for(var j=0;j<i;j++){
//         res += arr[j] + ' '
//     }
//     // print(res)
//     console.log(res);
// }


// // var n = parseInt(readline());
// var n = 2
// while(n-->0){
//     // var num = parseInt(readline())
//     var num = 12;
//     var k = 0
//     if(num%3!=0){
//         k += num%3
//         num-=num%3
//     }
//     while(num%3==0&&num!=0){
//         num = num/3
//         k++
//     }
//     if(num%2!=0){
//         k += num%2
//         num-=num%2
//     }
//     while(num%2==0&&num!=0){
//         num = num/2
//         k++
//     }
//     while(num!=0){
//         num--
//         k++
//     }
//     // print(k)
//     // print('\n')
//     console.log(k);
// }

// var arr = readline()
// arr = arr.split(' ')
// var n = parseInt(arr[0])
// var m = parseInt(arr[1])
// while(n-->0){

// }

// var chnNumChar = {
//     零: 0,
//     一: 1,
//     二: 2,
//     三: 3,
//     四: 4,
//     五: 5,
//     六: 6,
//     七: 7,
//     八: 8,
//     九: 9
// };
// // ,
//     // 十: 10
// var chnNameValue = {
//     十: { value: 10, secUnit: false },
//     百: { value: 100, secUnit: false },
//     千: { value: 1000, secUnit: false },
//     万: { value: 10000, secUnit: true },
//     亿: { value: 100000000, secUnit: true }
// }
// function ChineseToNumber(chnStr) {
//     var rtn = 0;
//     var section = 0;
//     var number = 0;
//     var secUnit = false;
//     var str = chnStr.split('');

//     for (var i = 0; i < str.length; i++) {
//         var num = chnNumChar[str[i]];
//         if (typeof num !== 'undefined') {
//             number = num;
//             if (i === str.length - 1) {
//                 section += number;
//             }
//         } else {
//             if(str.length === 2 && str[i]=='十'){
//                 section = 10
//             }
//             var unit = chnNameValue[str[i]].value;
//             secUnit = chnNameValue[str[i]].secUnit;
//             if (secUnit) {
//                 section = (section + number) * unit;
//                 rtn += section;
//                 section = 0;
//             } else {
//                 section += (number * unit);
//             }
//             number = 0;
//         }
//     }
//     return rtn + section;
// }

// console.log(ChineseToNumber('一千一十五万'))





// function triangleCount(arr){
//     let len = arr.length;
//     if(len<3){
//         return 
//     }
//     let obj = {}
//     obj[arr[0]] = 0
//     arr.sort((a,b)=>{
//         obj[a] = 0;
//         return a-b;
//     })
//     // console.log(obj);
//     for (let i = 2; i < len; i++) {
//         let left = 0;
//         let right = i-1;
//         let value = arr[i]
//         while(left < right){
//             if(arr[left] + arr[right] <= value){
//                 left++;
//             }else{
//                 obj[arr[left]]++;
//                 obj[arr[right]]++;
//                 obj[value]++;
//                 right--;
//             }
//         }
        
//     }
//     // console.log(obj);
// }
// // triangleCount([1,2,3,4,5,6,7])




// var n = readline();
// var n = 7

// var nums = readline();

// nums = nums.split(' ');
// var nums = [1,2,3,4,5,6,7]

// var map = new Map();

// for(var i=0; i<n; i++){
//     map.set(nums[i], 0);
// }

// for(var i=0; i<n-2; i++){
//     for(var j=i+1; j<n-1; j++){
//         for(var k=j+1; k<n; k++){
//             var a = parseInt(nums[i]), b = parseInt(nums[j]), c = parseInt(nums[k]);
//             if(a+b>c && b+c>a && a+c>b){
//                 map.set(nums[i], map.get(nums[i])+1);
//                 map.set(nums[j], map.get(nums[j])+1);
//                 map.set(nums[k], map.get(nums[k])+1);
//             }
//         }
//     }
// }

// var max = 0;
// for(var i=0; i<n; i++){
//     max = Math.max(map.get(nums[i]), max);
// }

// var arr = new Array();
// for(var i=0; i<n; i++){
//    if(map.get(nums[i]) == max){
//        arr.push(parseInt(nums[i]));
//    }
// }

// arr.sort();

// print(arr.join(' '))
// console.log(arr.join(' '));


function Box(){
    this.name='Jack';
}
function Desk(){
    this.age=20;
}
Desk.prototype=new Box();
var box1=new Desk('lee',23);
// console .log(box1.name+box1.age);//Jack20


// var map = new Map()
// map.set('a','111')
// map.set('b','222')
// map.set('c','333')
// console.log(map);
// for(var item of map.keys()){
//     console.log(item,map.get(item));
// }

// function A(){
//     this.name = 123;
// }
// A.prototype.getA = function(){
//     console.log(this);
// }
// let a = new A();
// let funca = a.getA;
// funca();

// (function() {
//     console.log('this is the start');
//     setTimeout(function cb() {
//     console.log('this is a msg from call back');
//     });
//     console.log('this is just a message');
//     setTimeout(function cb1() {
//     console.log('this is a msgfrom call back1');
//     }, 0);
//     console.log('this is the end');
//     })();
   

function find(arr){
    let n = arr.length;
    if(n <= 0){
        return false;
    }
    if(arr[i] < arr[n-1]){
        // 二分
    }
    // 找最小值
    let left = 0;
    let right = n-1;
    while(left < right){
        let mid = Math.floor((left + right)/2)
        if(arr[left] < arr[mid]){
            left = mid;
        }else{
            right = mid;
        }
    }
}

// [4,5,6,1,2,3].splice(3).concat([4,5,6,1,2,3].slice(0,3))

// // 不知道不是顺序的数组怎么二分查找，下面这个可以转换成顺序的
// // arr是数组，index是最小值的下标
// arr = arr.slice(index).concat(arr.slice(0,index))


function binarySearch(nums, i, j, target){
    let mid = Math.ceil((i+j)/2);
    if (nums[mid] == target)
            return mid;
        if (i >= j)
            return -1;
        if (nums[i] <= nums[mid]){
            // i和mid之间是递增的
            if (target >= nums[i] && target < nums[mid])
                // target值在这个递增的序列里面
                return binarySearch(nums, i, mid-1, target);
            else
                // target值不在这个递增的序列里面
                return binarySearch(nums, mid+1, j, target);
        } else {
            // mid和j之间是递增的
            if (target > nums[mid] && target <= nums[j])
                // target值在这个递增的序列里面
                return binarySearch(nums, mid+1, j, target);
            else
                // target值不在这个递增的序列里面
                return binarySearch(nums, i, mid-1, target);
        }
}
if(binarySearch([4,5,6,1,2,3], 0, 5, 5) != -1){
    // return true
}else{
    // return false
}
// console.log(binarySearch([4,5,6,1,2,3], 0, 5, 5));

var Foo = (function() {
    var x = 0;
    function Foo() {}
    Foo.prototype.increment = function() {
    ++x;
    // console.log(x);
    };
    return Foo;
    })();
    var a = new Foo();
    a.increment();
    a.increment();
    var b = new Foo();
    a.increment();
    

var n = 3
var m = 6
var arr=[33,66,99]
var xi = [3,6,9,30,60,90]

xi.sort((a,b)=>{return b-a})
// console.log(xi);

var res = []
for(var k = 0; k<arr.length;k++){
    var sum = 0;
    for(var i = 0,len = xi.length; i < len;i++){
        // console.log(xi[i],arr[k]);
        if(xi[i] >= arr[k]){
            sum++;
        }else{
            break
        }
    }
    res.push(sum)
}
// console.log(res);


str = 'abcd12345ed125ss123456789'
str = str.replace(/[^0-9]/g,' ')
str = str.split(' ')
str.sort((a,b)=>{return b-a})
// console.log(str[0]);

var str = 'abcabcbb';
for (let i = 0; i < str.length; i++) {
    
}

var xiaoming = {
    age: 18,
    sex: 'man'
}
var xiaoming2 = new Proxy(xiaoming,{
    get(target,key,receiver){
        // console.log('get',target,key,receiver);
        return target[key]
    },
    set(target,key,value,receiver){
        // console.log('set',target,key,value,receiver);
    }
})
// console.log(xiaoming2.age);
// console.log(xiaoming2.age=20);

function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}
var hw = helloWorldGenerator();

// console.log(hw);
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());


function isMatch(str1,str2){
    if(str1.length < str2.length){
        [str1, str2] = [str2, str1]
    }
    if(str1.length - str2.length > 1){
        return false
    }
    let count = 0;
    let j = 0
    for (let i = 0; i < str1.length; i++) {
        if(str1[i]!=str2[j++]){
            count++
            if(str1.length != str2.length&&count == 1){
                j--
            }
        }
    }
    if(count>1){
        return false
    }
    return true
}
// console.log(isMatch('paae','ple'));



function trim(str){
    let l = 0;
    let r=str.length-1;
    while(str[l] == ' '){
        l++;
    }
    while(l <= r && str[r] == ' '){
        r--;
    }
    if(l>r){
        return ''
    }
    return str.slice(l,r+1)
}
// console.log(trim('     add    '));

{/* <a>a</a>abcy" => "aabcy" */}

var str = '<a>a</a>abcy'
// str = str.replace(/<[^\/].*?>(.*?)<^\/.*?>/g,'!!!')
str = str.replace(/<.*?>(.+)<\/.*?>/g,'$1')
// console.log(str);

// function A(){
//     var value = '111';
//     return function B(){
//         console.log(value);
//     }
// }
// // A()();
// function C(){
//     var value='222';
//     var self = this;
//     A()();
//     // A().call(self);
// }
// C()

// var p = new Promise((resolve, reject)=>{
//     console.log('start');
//     resolve();
// })
// p.then((value)=>{
//     console.log('111 resolve');
// }).then((value)=>{
//     console.log('222 resolve');
//     throw 'error'
// },(error)=>{
//     console.log('222  reject');
// }).then((value)=>{
//     console.log('333 resolve');
// },(error)=>{
//     console.log('333  reject');
// }).then((value)=>{
//     console.log('444 resolve');
// },(error)=>{
//     console.log('444  reject');
// })


// function asdf(){
//     this.data = '111';
//     return 'hello';
// }
// var aaa = new asdf()
// console.log(aaa);

// var aa = '123'
// var bb = new String('asd')
// console.log(Object.prototype.toString.call(aa));
// console.log(Object.prototype.toString.call(bb));
// console.log(aa instanceof String);
// console.log(aa instanceof Object);
// console.log(bb instanceof String);


// 方法写在原型上
Array.prototype.unique = function (){
    console.log('this',this);
    var res = [];
    for(let i = 0;i<this.length;i++){
        if(res.indexOf(this[i].name)==-1){
            res.push(this[i].name)
        }
    }
    return res
}
var users = [
    {id:1,name:'a'},
    {id:2,name:'a'},
    {id:3,name:'b'},
    {id:4,name:'b'}
]
// console.log(users.unique());


// // 1
// function foo(count){
//     this.count++;
// }
// foo.count = 0
// foo(100)
// console.log(foo.count);

// // 2
// // 箭头函数 this一旦被捕获就不会发生变化
// function foo() {
//     return (a) => {
//         console.log(this.a);
//     }
// }
// var obj1 = {a: 1};
// var obj2 = {a: 2};

// var bar = foo.call(obj1);
// bar.call(obj2);

// // 3
// const shapes={
//     radius: 10,
//     diameter(){
//         return this.radius * 2;
//     },
//     perimeter: ()=> 2 * this.radius
// };
// console.log(shapes.diameter());
// console.log(shapes.perimeter());
    

// 闭包实现
// for (var i =1; i<5;i++){
//     (function (j) {
//         setTimeout(function() {
//             console.log(j)
//         },j*1000);
//     })(i);
// }
// console.log(i);

// 每隔1s输出
async function aaa(){
    function bbb(i){
        return new Promise((resolve,reject)=>{
            setTimeout(function() {
                console.log(i)
    // 每隔1s执行
                resolve()
            },1000);
        })
    }
    
    for (var i =0; i<5;i++){
        await bbb(i)
    }
}
// aaa()

// async function aaa(){
//     function bbb(i){
//         return new Promise((resolve,reject)=>{
//             setTimeout(function() {
//                 console.log(i)
//                 resolve()
//             },1000*i);
//             // 没有使用await resolve的位置没有影响
//             // resolve()
//         })
//     }
    
//     for (var i =0; i<5;i++){
//         bbb(i)
//     }
// }
// aaa()

// let aa;
// (function fn() {
// console.log(aa);
// aa= 2;
// console.log(aa);
// console.log(bb);
// })();
// let bb=3;


// let obj={
//     x:1,
//     fn1() {
//         console.log(this.x);
//     },
//     fn2: ()=> {
//         console.log(this.x);
//     },
//     fn3: function(){
//         console.log(this.x);
//     }
// }
// obj.fn1();
// obj.fn2();
// obj.fn3();
    
function qq(){
    let a = ''
    return (function(){
        a+='1';
        return a
    })()
}
// console.log(qq());
// console.log(qq());
// console.log(qq());

function GetRequest(url,name) {
    let last = '';
    let obj = {};
    return function(){
        console.log(last);
        console.log(obj);
        if(last == url){
            return obj[name]
        }
        if (url.indexOf("?") != -1) {
            last = url; //获取url中"?"符后的字串
            obj = {};
            
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                obj[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }else{
            return ''
        }
        return obj[name];
    }
 }
//  console.log(GetRequest('?a=1&b=2&c=3','a'));
//  console.log(GetRequest('?a=1&b=2&c=3','b'));
//  console.log(GetRequest('?a=1&b=2&c=3','c'));



//父类
function Person(name){//给 构造函数添加了参数
    this.name = name ;
    this.sum = function(){
        alert( this. name )
    }
}
Person . prototype.age = 10;//给 构造函数添加了原型属性
    
function Con(){
    Person.call(this,"jer");//重点
    this.age = 12;
}
var con1 = new Con();
    console. log(con1.name);//"jer"
    console. log(con1.age);//12
    console.log(con1 instanceof Person);//false
    

    var name = "The Window";

    　　var object = {
    　　　　name : "My Object",
    
    　　　　getNameFunc : function(){
    　　　　　　return function(){
    　　　　　　　　return this.name;
    　　　　　　};
    
    　　　　}
    
    　　};
    
    console.log(object.getNameFunc()());

    　var name = "The Window";

　　var object = {
　　　　name : "My Object",

　　　　getNameFunc : function(){
　　　　　　var that = this;
　　　　　　return function(){
　　　　　　　　return that.name;
　　　　　　};

　　　　}

　　};

console.log(object.getNameFunc()());

