class Promise{
    constructor(executor){
        this.PromiseState = 'pending'
        this.PromiseResult = null
        this.callbacks = []
        var self = this
        
        function resolve(data){
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

    then(onResolved, onRejected){
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

    catch(onRejected){
        return this.then(undefined, onRejected)
    }

    static resolve(value){
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

    static reject(reason){
        return new Promise((resolve, reject)=>{
            reject(reason)
        })
    }

    static all(promises){
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
        })
    }

    static race(promises){
        return new Promise((resolve, reject)=>{
            for(let i = 0; i < promises.length; i++){
                promises[i].then(v=>{
                    resolve(v)
                }, r=>{
                    reject(r)
                })
            }
        })
    }
}