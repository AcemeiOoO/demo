// process.stdin.on('data', function (data) {
//     // 所有的数据在一个变量给出来
//     // 控制输入输出
//     data=data.split('\n')
//     data.splice(data.length-1,1)

//     var k = 0;
//     var lines = "";

//     // 定义变量
//     var n,len;

//     while((++k)<=data.length){
//         if(k%2!=0){
//             // 第一行数据
//             lines = data[k-1].trim().split(' ');
//             // 处理
//             n = parseInt(lines[0]);
//             len = parseInt(lines[1]);
//         }else{
//             // 第二行数据
//             lines = data[k-1].split(' ');
//             // 输出
//             process.stdout.write(findRes())
//         }
//     }

//     function findRes(){
//         return
//     }

// })


// var obj = {
//     a:1,
//     b:2,
//     c:function(){
//         console.log('ccc');
//     },
//     d: new RegExp('^ab$','g')
// }
// obj.c()
// console.log(JSON.stringify(obj));

// obj = {
//     5:['first'],
//     2:['before',1],
//     1:[''],
//     3:['after',1],
//     8:[''],
//     7:['after',8],
//     9:[''],
//     6:['last']
// }
// list = [
//     {id: 7, after: 8},
//     {id: 9},
//     {id: 6, last: true},
//     {id: 5, first: true},
//     {id: 2, before: 1},
//     {id: 1},
//     {id: 3, after: 1},
//     {id: 8},
// ]
// arr = [7,9,6,5,2,1,3,8]   
// var temp;
// var index;
// var i = 0;
// var flag = false;
// while(i<list.length){
//     flag = false
//     if(list[i].first){
//         temp = list.splice(i,1);
//         list.splice(0,0,temp[0]);
//         temp = arr.splice(i,1);
//         arr.splice(0,0,temp[0]);
//     }
//     if(list[i].last){
//         temp = list.splice(i,1);
//         list.push(temp[0]);
//         temp = arr.splice(i,1);
//         arr.push(temp[0]);
//         flag = true;
//     }
//     if(list[i].before){
//         index = arr.indexOf(list[i].before);
//         if(index>i){
//             flag = true
//         }
//         temp = list.splice(i,1);
//         list.splice(index,0,temp[0]);
//         temp = arr.splice(i,1);
//         arr.splice(index,0,temp[0]);
//     }
//     if(list[i].after){
//         index = arr.indexOf(list[i].after);
//         if(index>i){
//             flag = true
//         }
//         temp = list.splice(i,1);
//         list.splice(index+1,0,temp[0]);
//         temp = arr.splice(i,1);
//         arr.splice(index+1,0,temp[0]);
//     }
//     // if(!flag){
//         i++;
//     // }
    
//     console.log(list);   
// }         
// i=0
// while(i<list.length){
//     flag = false
//     if(list[i].first){
//         temp = list.splice(i,1);
//         list.splice(0,0,temp[0]);
//         temp = arr.splice(i,1);
//         arr.splice(0,0,temp[0]);
//     }
//     if(list[i].last){
//         temp = list.splice(i,1);
//         list.push(temp[0]);
//         temp = arr.splice(i,1);
//         arr.push(temp[0]);
//         flag = true;
//     }
//     if(list[i].before){
//         index = arr.indexOf(list[i].before);
//         if(index>i){
//             flag = true
//         }
//         temp = list.splice(i,1);
//         list.splice(index,0,temp[0]);
//         temp = arr.splice(i,1);
//         arr.splice(index,0,temp[0]);
//     }
//     if(list[i].after){
//         index = arr.indexOf(list[i].after);
//         if(index>i){
//             flag = true
//         }
//         temp = list.splice(i,1);
//         list.splice(index+1,0,temp[0]);
//         temp = arr.splice(i,1);
//         arr.splice(index+1,0,temp[0]);
//     }
//     // if(!flag){
//         i++;
//     // }
    
//     console.log(list);   
// }                                                                                                                                                
// if(list[i].after||list[i].before||list[i].first||list[i].last){
//     i--;
// }

function normal(path){
    let arr = path.split('/');
    let res = [];
    for(let i=0;i<arr.length;i++){
        if(!arr[i]){
            continue;
        }
        switch(arr[i]){
            case '.':
                break;
            case '..':
                if(res.length==0){
                    return -1;
                }
                res.pop();
                break;
            default:
                res.push(arr[i]);
                break;
        }
    }
    res = './' + res.join('/');
    return res

}
// console.log(normal('./a/b/../'));
// console.log(normal('./a/..'));
// console.log(normal('a'));
// console.log(normal('.'));
// console.log(normal('./a/./b'));
// console.log(normal('a/b/../../../c'));

function fiind(arr){

    let result = 0;
    for(let i=0;i<arr.length;i++){
        result ^= arr[i];
    }
    // console.log('result',result);

    let post = 0;
    //获取 result 二进制最低位1的位置 1&1 =1 
    for(let i=0;i<32;i++){
        if(((result>>i)& 1)==1){
            post=i;
            break;
        }
    }
    let x=0,y=0;
    for(let i=0;i<arr.length;i++){
        if((arr[i]>>post)&1==1){
            x^=arr[i];
        }
          
      }
      y= result^x;
    // console.log(x,y);

    // let res = [];
    // for(let i=0;i<arr.length;i++){
    //     if(arr.indexOf(arr[i]) == arr.lastIndexOf(arr[i])){
    //         res.push(arr[i]);
    //     }
    // }
    // return res;
}
// console.log(fiind([1,2,3,4,2,3,4,9]));

let flag = false;
function dfs(arr,points,i,j) {
    if (flag) return;//已找到路径，return
    if (i >= arr.length || j >= arr[0].length) return;//遇到边界return
    points.push([i,j]);
    if (arr[i][j] == 0) {//碰到障碍物，此路不通，pop后return
        points.pop();
        return;
    }
    if (i == arr.length - 1 && j == arr[0].length - 1)//到达终点
    {
        console.log('points',points);
        for (let [i,j] of points) {
            console.log('aa',i,j);
        }
        flag = true;
        return;
    }
    dfs(nums, points, i + 1, j);//向右走
    dfs(nums, points, i, j + 1);//向下走
    points.pop();//不通，pop
}
dfs([[0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0]],[],0,0)