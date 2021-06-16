const fs = require('fs')
const util = require('util')
const mineReadFile = util.promisify(fs.readFile)

async function main(){
    try{
        let data1 = await mineReadFile('./files/1.txt')
        let data2 = await mineReadFile('./files/2.txt')
        let data3 = await mineReadFile('./files/3.txt')
        console.log(data1+data2+data3);

    }catch(e){
        console.log(e);
    }
}
main()