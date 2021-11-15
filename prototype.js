// **原型链**
function Student(name) {
    this.name = name;
    this.age = 18;
}
Student.prototype.printInfo = function () {
    console.log(`info ${this.name} ${this.age}`);
}

let s1 = new Student('Ami')

// 实例
console.log(s1);
// 原型
console.log(Student.prototype);
// 原型的 constructor 指向构造函数
console.log(Student.prototype.constructor, Student.prototype.constructor === Student);
// 实例的 _proto_ 指向原型
console.log(s1.__proto__, s1.__proto__ === Student.prototype);

// 构造函数是继承自 Object 的，因此可以向上溯源引用到 Object 的原型和构造函数
// Object 的原型
console.log(Student.prototype.__proto__, Object.prototype);
// Object 的原型再往上是 null
console.log(Student.prototype.__proto__.__proto__);
// Object的构造函数
console.log(Student.prototype.__proto__.constructor);


function Super() {
    this.property = 'super'
}

function Sub() {

}

// **继承**
// 原型链继承

function Print(){
    let str = 'dy';
    return Print;
}

console.log(Print());
//dy
console.log(Print()());
//dyy
console.log(Print()()());
//dyyy
