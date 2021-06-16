// 如需使用参数输入，请直接去掉下面注释
// const readline = require('readline');
//
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

function HardMan(str) {
    let id = setTimeout(() => {
        console.log(`I am ${str}`);
    }, 0)

    function fn() {
    }

    let delay = 0;

    fn.rest = function (time) {
        delay = time;
        setTimeout(() => {
            console.log(`Start learning after ${time} seconds`);
        }, parseInt(time) * 1000);
        return fn;
    }

    fn.restFirst = function (time) {
        clearTimeout(id);
        delay = time;
        setTimeout(() => {
            console.log(`Start learning after ${time} seconds`);
            console.log(`I am ${str}`);
        }, parseInt(time) * 1000);
        return fn;
    }

    fn.learn = function (item) {
        setTimeout(() => {
            console.log(`Learning ${item}`);
        }, parseInt(delay) * 1000);
    }
    return fn;
}
// HardMan("jack");
// HardMan("jack").rest(10).learn("computer");
HardMan("jack").restFirst(5).learn("chinese");