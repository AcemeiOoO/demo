/* promise用于封装一个异步操作 
        状态 【PromiseState】
            pending 未决定的
            resolved / fullfilled 成功
            rejected  失败

        对象的值  【PromiseResult】
            保存着异步任务【成功/失败】的结果
            resolve
            reject

    promise函数内部是同步调用的

    API
        p.then(value=>{}, reason=>{})
        p.catch(reason=>{})

        //如果传入的参数为非Promise类型的对象，则返回的结果为成功promise对象
        //如果传入的参数为Promise对象，则参数的结果决定了resolve的结果
        var ppp = Promise.resolve(new Promise((resolve, reject)=>{
            reject('error');
        }))
        ppp.catch(reason=>{
            console.log(reason)
        })

        // 传入任何结果都会返回一个失败的promise对象，传入什么 PromiseResult的结果就是什么
        // 会报错两次
            // 可以用process设置全局的 rejected未处理错误 的函数
            process.on('unhandledRejection', error => {
                console.log('我帮你处理了', error.message);
            });
            // 所有是rejected状态的promise都需要被处理，不然会报错
            let p = Promise.reject(new Promise((resolve, reject)=>{
                reject('error');
            }))
            p.catch((reason)=>{
                console.log(reason);
                reason.catch((e)=>{
                    console.log(e);
                })
            })

        Promise.all()
            传入promise数组，若所有的item都resolve，则成功的promise，值为所有resolve的数据组合成的list；若有一个reject，则返回失败的promise，值为失败的promise的值
        Promise.race()
            传入promise数组，哪个执行的最快返回哪个的状态和值

    改变promise对象状态的方法
        1、resolve
        2、reject
        3、throw 

    可以为promise指定多个回调函数，都会执行

    then方法的返回结果是一个promise对象
        1、若成功、失败回调函数中都没有return操作，则then返回成功、undefined
        2、若return了一个非promise类型的对象，则then返回成功、return的值
        3、throw抛出错误，返回rejected
        4、返回一个promise类型对象，then的结果根据promise对象的状态

    异常穿透
        当使用promise的then链式调用时，可以在最后指定失败的回调。
        前面任何操作出现了异常，都可以在最后的失败回调中处理。

    中断promise链————返回一个pending状态的promise
        return new Promise(()=>{})

*/


// function mineReadFile(path){
//     return new Promise((resolve, reject)=>{
//         require('fs').readFile(path, (err, data)=>{
//             if(err){
//                 reject(err)
//             }
//             resolve(data)
//         })
//     })
// }

// mineReadFile('./practice_ajax.htm').then(value=>{
//     console.log(value.toString());
// }, reason=>{
//     console.log(reason);
// }) 

/**
 * util.promise()方法
 * 
 * 将函数改造成返回一个promise
 */
// const util = require('util');
// const fs = require('fs')

// let mineReadFile2 = util.promisify(fs.readFile);

// mineReadFile2('./practice_ajax.html').then(value=>{
//     console.log(value.toString());
// }, reason=>{
//     console.log(reason);
// }) 
