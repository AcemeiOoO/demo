//引入模块
var http = require('http')
var fs = require('fs')
/* 
    url.parse()可以解析url
        Url {
            protocol: 'http:',
            slashes: true,
            auth: 'user:pass',
            host: 'host.com:8080',
            port: '8080',
            hostname: 'host.com',
            hash: '#hash',
            search: '?query=string',
            query: 'query=string',
            pathname: '/path/to/file',
            path: '/path/to/file?query=string',
            href: 'http://user:pass@host.com:8080/path/to/file?query=string#hash' 
        }
*/   
var url = require('url')

/*
    处理本地文件目录   (字符串前没有/或./相当于是./)
        path.resolve()
            在./开头时进行拼接，在/开头时进行覆盖
        path.join()
            在./和/开头时都进行拼接
*/
var path = require('path')  

// 保存了node的路径和当前文件的路径
// console.log(process.argv);

//创建一个web服务器，返回一个server实例
var server = http.createServer((req,res)=>{
    //拼接本地路径和url路径
    let arr = path.resolve().split('\\')
    arr.pop()
    let filepath = path.join(arr.join('\\'), url.parse(req.url).path)
    console.log(filepath);

    // 获取文件信息
    fs.stat(filepath, (err, stats)=>{
        if(!err&&stats.isFile()){
            res.writeHead(200)
            fs.createReadStream(filepath).pipe(res);
        }else if(stats.isDirectory()){
            if(fs.existsSync(filepath+'index.html')){
                res.writeHead(200)
                fs.createReadStream(filepath+'index.html').pipe(res);
            }else if(fs.existsSync(filepath+'default.html')){
                res.writeHead(200)
                fs.createReadStream(filepath+'default.html').pipe(res);
            }else{
                res.writeHead(404);
                res.end('404 Not Found');
            }
        }else{
            res.writeHead(404);
            res.end('404 Not Found');
        }
    })
    // fs.readFile(filepath,(err,data)=>{
    //     // res.writeHead(200,{'Content-type':'text/html'})
    //     if(!err){
    //         res.end(data.toString())
    //     }else{
    //         // res.end(Buffer.from('该文件不存在').toString())
    //         res.end('该文件不存在');
    //         // res.end('404 Not Found')
    //     }
    // })
})

// server.on('request',(request,response)=>{
//     //监听客户端的请求
//     console.log('路径',request.url);

//     // response.write('hello node.js')
//     // response.write('中的')
//     // response.write('请问任天堂')
//     // response.end()
//     response.end('hello node.js\n请问任天堂')

        // let data = {
        //     code: 200,
        //     data: {
        //         name: 'hml',
        //         age: '18'
        //     }
        // }
        // res.end(JSON.stringify(data))

// })

//绑定端口号，启动服务器
server.listen('3000',()=>{
    //服务器启动成功
    console.log('Server is running at http://127.0.0.1:3000/');
})