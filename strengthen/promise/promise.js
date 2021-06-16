// 声明构造函数
function Promise(executor){
    this.PromiseState = 'pending'
    this.PromiseResult = null
    this.callbacks = []
    // let wht = 'hhhh'
    var self = this
    // 看完js来想一想  为什么函数bb里面的PromiseState是undefined
    // console.log('00',this.PromiseState,this.PromiseResult,wht);
    // function bb(){
    //     console.log('11',this.PromiseState,this.PromiseResult,wht);
    // }
    // bb()
    function resolve(data){
        // console.log('22',this.PromiseState,this.PromiseResult,wht);
        if(self.PromiseState !== 'pending'){
            return
        }
        self.PromiseState = 'fullfilled'
        self.PromiseResult = data
        setTimeout(()=>{
            self.callbacks.forEach((item)=>{
                item.onResolved(data)
            })
        })
    }
    function reject(data){
        if(self.PromiseState !== 'pending'){
            return
        }
        self.PromiseState = 'rejected'
        self.PromiseResult = data
        setTimeout(()=>{
            self.callbacks.forEach((item)=>{
                item.onRejected(data)
            })
        })
    }

    try{
        // 执行器函数是同步执行的
        executor(resolve, reject);
    }catch(e){
        reject(e)
    }
}

// 添加then方法
Promise.prototype.then = function(onResolved, onRejected){
    let self = this
    if(typeof onResolved !== 'function'){
        onResolved = value=>value
        // value=>{    return value}
    }
    if(typeof onRejected !== 'function'){
        onRejected = reason=>{
            throw reason
        }
    }
    return new Promise((resolve, reject)=>{
        // 执行成功或失败的回调函数，并改变返回的promise的状态值和PromiseResult
        function callback(type){
            try{
                let result = type(self.PromiseResult)
                if(result instanceof Promise){
                    // 为什么用then方法而不是直接用PromiseState属性呢？
                    // 因为有可能执行器函数里有异步操作，此时PromiseState仍未pending
                    result.then(v=>{
                        resolve(v)
                    }, r=>{
                        reject(r)
                    })
                }else{
                    resolve(result)
                }
            }catch(e){
                reject(e)
            }
        }
        if(this.PromiseState === 'fullfilled'){
            setTimeout(()=>{
                callback(onResolved)
            })
        }
        if(this.PromiseState === 'rejected'){
            setTimeout(()=>{
                callback(onRejected)
            })
        }
        if(this.PromiseState === 'pending'){
            this.callbacks.push({
                onResolved: function(){
                    callback(onResolved)
                },
                onRejected: function(){
                    callback(onRejected)
                }
            })
        }
    })
}

// 添加catch方法
// Promise.prototype.catch = function(onRejected){
//     return this.then(undefined, onRejected)
// }
Promise.prototype.catch = function(onRejected){
    let self = this
    // console.log('测试作用域00',this.PromiseState,this.PromiseResult);
    return new Promise((resolve, reject)=>{
        // console.log('测试作用域',this.PromiseState,this.PromiseResult);
        // function aa(){
            // console.log('测试作用域11',this.PromiseState,this.PromiseResult);
        // }
        // aa()
        function callback(type){
            try{
                let result = type(self.PromiseResult)
                if(result instanceof Promise){
                    // 为什么用then方法而不是直接用PromiseState属性呢？
                    // 因为有可能执行器函数里有异步操作，此时PromiseState仍未pending
                    result.then(v=>{
                        resolve(v)
                    }, r=>{
                        reject(r)
                    })
                }else{
                    resolve(result)
                }
            }catch(e){
                reject(e)
            }
        }
        if(this.PromiseState === 'fullfilled'){
            resolve(this.PromiseResult)
        }
        if(this.PromiseState === 'rejected'){
            callback(onRejected)
        }
        if(this.PromiseState === 'pending'){
            this.callbacks.push({
                onResolved: function(){
                    resolve(self.PromiseResult)
                },
                onRejected: function(){
                    callback(onRejected)
                }
            })
        }
    })
}

Promise.resolve = function(value){
    return new Promise((resolve, reject)=>{
        if(value instanceof Promise){
            value.then(v=>{
                resolve(v)
            }, r=>{
                reject(r)
            })
        }else{
            resolve(value)
        }
    })
}

Promise.reject = function(reason){
    return new Promise((resolve, reject)=>{
        reject(reason)
    })
}

Promise.all = function(promises){
    return new Promise((resolve, reject)=>{
        let count = 0
        let result = []
        for(let i = 0; i < promises.length; i++){
            promises[i].then(v=>{
                count++
                result.push(v)
                if(count == promises.length){
                    resolve(result)
                }
            }, r=>{
                reject(r)
            })
        }
        // try {
        //     promises.forEach((item)=>{
        //         if(item.PromiseState === 'rejected'){
        //             state = 'rejected'
        //             result = item.PromiseResult
        //             throw 0
        //         }
        //         result.push(item.PromiseResult) 
        //     })
        // } catch (e) {
        // }
        // if(state === 'rejected'){
        //     reject(result)
        // }else{
        //     resolve(result)
        // }
    })
}

Promise.race = function(promises){
    return new Promise((resolve, reject)=>{
        for(let i = 0; i < promises.length; i++){
            promises[i].then(v=>{
                resolve(v)
            }, r=>{
                reject(r)
            })
        }
    })
    // return promises.find((item)=>{
    //     return item.PromiseState !== 'pending'
    // })
}