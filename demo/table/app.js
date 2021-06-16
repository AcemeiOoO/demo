// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');


// 设置跨域
app.use(cors({
    origin: function (ctx) {
        return '*';
        // '*'  允许来自所有域名请求
       // return 'http://localhost:8080'; / 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))


// let router = new Router();
// router.get('/api/getMock', async (ctx, next) => {
//     await next()
//         let list = []
    
//         // 生成指定个数的随机字符串
//         function genrateRandomWords(n) {
//           let words = 'abcdefghijklmnopqrstuvwxyz你是好的嗯气短前端后端设计产品网但考虑到付款啦分手快乐的分类开发商的李开复封疆大吏师德师风吉林省附近',
//               len = words.length,
//               ret = ''
//           for(let i=0; i< n; i++) {
//             ret += words[Math.floor(Math.random() * len)]
//           }
//           return ret
//         }
    
//         // 生成10万条数据的list
//         for(let i = 0; i< 100000; i++) {
//           list.push({
//             name: `xu_0${i}`,
//             title: genrateRandomWords(12),
//             text: `我是第${i}项目, 赶快 吧~~`,
//             tid: `xx_${i}`
//           })
//         }
    
//         ctx.body = {
//           state: 200,
//           data: list
//         }
//         // await next()
// })


// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    if(ctx.url === '/api/getMock') {
        let list = []
    
        // 生成指定个数的随机字符串
        function genrateRandomWords(n) {
          let words = 'abcdefghijklmnopqrstuvwxyz你是好的嗯气短前端后端设计产品网但考虑到付款啦分手快乐的分类开发商的李开复封疆大吏师德师风吉林省附近',
              len = words.length,
              ret = ''
          for(let i=0; i< n; i++) {
            ret += words[Math.floor(Math.random() * len)]
          }
          return ret
        }
    
        // 生成10万条数据的list
        for(let i = 0; i< 1000001; i++) {
          list.push({
            name: `李小明${i}`,
            title: genrateRandomWords(12),
            text: `我是第${i}条数据`,
            tid: `xx_${i}`
          })
        }
    
        ctx.body = {
          state: 200,
          data: list
        }
    }
    await next()
});
