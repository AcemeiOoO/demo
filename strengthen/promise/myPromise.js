// promise的结构和原生的还是不一样
// node用process.nextTick模拟微任务
class Promise{
    constructor(executor){
        // 设置状态值
        this.PromiseState = 'pending'
        this.PromiseResult = null
        this.callbacks = []
        let self = this

        // 设置用户可调用的成功、失败回调
        // 不能直接用this
        function resolve(data){
            self.PromiseState = 'resolved';
            self.PromiseResult = data;
            // setTimeout(()=>{
            //     self.callbacks.forEach(item => {
            //         item.onResolve()
            //     });
            // })
            let observer = new MutationObserver(()=>{ 
                self.callbacks.forEach(item => {
                    item.onResolve()
                });
                observer.disconnect();
            })
            let node = document.createElement('div')
            observer.observe(node,{
                childList:true
            })
            node.innerHTML = 1
        }
        function reject(data){
            self.PromiseState = 'rejected';
            self.PromiseResult = data;
            // setTimeout(()=>{
            //     self.callbacks.forEach(item => {
            //         item.onReject()
            //     });
            // })
            let observer = new MutationObserver(()=>{ 
                self.callbacks.forEach(item => {
                    item.onReject()
                });
                observer.disconnect();
            })
            let node = document.createElement('div')
            observer.observe(node,{
                childList:true
            })
            node.innerHTML = 1
        }
        executor(resolve, reject)

    }

    then(onResolve, onReject){
        let that = this
        if(typeof onResolve !== 'function'){
            onResolve = value => value
        }
        if(typeof onReject !== 'function'){
            onReject = reason => reason
        }
        return new Promise((resolve, reject)=>{
            // 执行then的回调函数
            function execThen(type){
                // then的回调函数的返回值有一下几种情况
                //     return非promise对象（包括undefined）
                //             返回成功的promise，值为return的值
                //     return一个promise对象
                //             promise对象的状态即为返回的状态
                //     throw一个error
                //             返回错误的promise，值为错误原因
                try{
                    let result = type(that.PromiseResult)
                    if(result instanceof Promise){
                        // 如果返回的是一个promise，该回调的状态为promise的状态，值为promise的值
                        // 如果不调用then，返回的就是一个promise，不符合规范
                        result.then(v=>{
                            resolve(v)
                        },r=>{
                            reject(r)
                        })
                    }else{
                        resolve(result)
                    }
                }catch(e){
                    reject(e)
                }
            }
            // 返回的这个promise也需要设置状态
            if(that.PromiseState === 'resolved'){
                // 用setTimeout包起来是因为then回调是微任务，不能同步执行（暂时用setTimeout模拟）
                // setTimeout(()=>{
                //     execThen(onResolve)
                // },0)

                //用MutationObserver模拟异步执行的微任务
                let observer = new MutationObserver(()=>{ 
                    // 微任务的内容
                    execThen(onResolve);
                    observer.disconnect();
                })
                // 创建一个节点，用于控制任务的开始
                let node = document.createElement('div')
                // observe是MutationObserver的方法，用于
                // 监听子节点的改变，一旦改变则触发回调函数 nextTickHandler 
                observer.observe(node,{
                    childList:true
                })
                node.innerHTML = 1
            }
            if(that.PromiseState === 'rejected'){
                // setTimeout(()=>{
                //     execThen(onReject)
                // },0)

                let observer = new MutationObserver(()=>{ 
                    execThen(onReject);
                    observer.disconnect();
                })
                let node = document.createElement('div')
                observer.observe(node,{
                    childList:true
                })
                node.innerHTML = 1
            }
            if(that.PromiseState === 'pending'){
                // 不能直接写  
                // onResolve: onResolve
                // 原因：
                // 1、没办法调用resolve, reject设置返回的 promise的状态
                // 2、没办法传参 PromiseResult
                that.callbacks.push({
                    onResolve: ()=>{
                        execThen(onResolve)
                    },
                    onReject: ()=>{
                        execThen(onReject)
                    }
                })
            }
        })
    }

    catch(onReject){
        return this.then(undefined,onReject)
    }

    static resolve(value){
        return new Promise((resolve, reject)=>{
            if(value instanceof Promise){
                value.then(v=>{
                    resolve(v)
                },r=>{
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
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(v=>{
                    count++;
                    result.push(v);
                    if(count == promises.length){
                        resolve(result);
                    }
                }, r=>{
                    reject(r);
                })
            }
        })
    }

    static race(promises){
        return new Promise((resolve, reject)=>{
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(v=>{
                    resolve(v);
                }, r=>{
                    reject(r);
                })
            }
        })
    }
}