// let sum = 0;
// for (var i = 0; i < arr.length - 1; i++) {
//     if (arr[i + 1] > arr[i]) {
//         for (var j = i; j < arr.length - 1; j++) {
//             if (arr[j + 1] < arr[j]) {
//                 break;
//             }
//         }
//         let temp = arr[j] - arr[i] - parseInt(fee) * 2;
//         if (temp > 0) {
//             sum += temp;
//         }
//         i = j;
//     }
// }
// return sum;

function knapsack( V ,  n ,  vw ) {
    // 动态规划优化
    {
        var dp = new Array(V+1)
        // 第一次赋值
        for (let i = V; i >= 0; i--) {
            if(i >= vw[0][0]){
                dp[i] = vw[0][1];
            }else{
                dp[i] = 0
            }
        }
        for(var i = 1; i < n; i++){
            for (let j = V; j >= vw[i][0]; j--) {
                dp[j] = Math.max(dp[j], dp[j-vw[i][0]]+vw[i][1])
            }
        }
        console.log(dp[V]);
    }
    

    // 动态规划
    {
        // // 初始化数组
        // var dp = new Array(n)
        // for(var i = 0; i < n; i++){
        //     dp[i] = new Array(V+1)
        //     for(var j = 0; j < V+1; j++){
        //         dp[i][j] = 0
        //     }
        // }
        // // 给第一行赋值
        // for(var j = 0; j < V+1; j++){
        //     if(j >= vw[0][0]){
        //         dp[0][j] = vw[0][1];
        //     }
        // }
        // // 从第二行开始遍历
        // for(var i = 1; i < n; i++){
        //     for(var j = 0; j < V+1; j++){
        //         var max = dp[i-1][j];
        //         if(j >= vw[i][0]){
        //             max = Math.max(max, dp[i-1][j-vw[i][0]]+vw[i][1]);
        //         }
        //         dp[i][j] = max;
        //     }
        // }
        // console.log(dp[n-1][V]);
    }

    // // 优化的递归算法
    {
        // function findMax(v, index, vw, remem){
        //     if(index>=n-1){
        //             if(!remem[index][v]){
        //                 if(v >= vw[index][0]){
        //                     remem[index][v] = vw[index][1]
        //                 }else{
        //                     remem[index][v] =  0
        //                 }
        //             }
        //             return remem[index][v]
        //     }
        //     if(remem[index][v]){
        //         return remem[index][v]
        //     }
        //     var max=0;
        //     // 当前物品不放进背包
        //     max = findMax(v, index+1, vw, remem)
        //     // 物品放进背包
        //     if(v >= vw[index][0]){
        //         max = Math.max(max, findMax(v-vw[index][0], index+1, vw, remem) + vw[index][1])
        //     }
        //     remem[index][v] = max;
        //     return remem[index][v]
        // }
        // var remem = new Array(n)
        // for(var i = 0; i < n; i++){
        //     remem[i] = new Array(V+1)
        //     for(var j = 0; j < V+1; j++){
        //         remem[i][j] = 0
        //     }
        // }
        // var res = findMax(V, 0, vw, remem)
        // console.log(res);
    }

    // //递归算法
    {
        // function findMax(v, index, vw){
        //     if(index>=n-1){
        //         if(v >= vw[index][0]){
        //             return vw[index][1]
        //         }else{
        //             return 0
        //         }
        //     }
        //     var max1,max2;
        //     if(v >= vw[index][0]){
        //         max1 = findMax(v-vw[index][0], index+1, vw) + vw[index][1]
        //     }
        //     // 当前物品不放进背包
        //     max2 = findMax(v, index+1, vw)
        //     return Math.max(max1, max2)
        // }
        // var res = findMax(V, 0, vw)
        // console.log(res);
    }
}
// knapsack(10,2,[[1,3],[10,4]])
// knapsack(200,200,[[183,153],[28,164],[163,145],[53,155],[18,37],[56,14],[159,126],[123,154],[116,189],[139,174],[171,97],[83,119],[111,188],[195,89],[10,135],[173,7],[64,15],[108,100],[36,192],[134,179],[137,105],[84,52],[91,96],[127,49],[79,128],[157,24],[57,104],[140,17],[117,6],[174,122],[104,20],[94,73],[103,17],[19,170],[71,107],[114,122],[32,99],[56,99],[20,42],[56,88],[76,59],[114,28],[93,72],[101,86],[198,50],[94,40],[30,99],[9,24],[148,182],[136,158],[22,130],[178,199],[190,67],[117,114],[82,81],[79,89],[163,101],[121,178],[129,129],[110,78],[4,111],[154,129],[5,165],[30,100],[63,167],[171,200],[32,5],[61,28],[149,79],[123,40],[45,143],[51,42],[76,174],[195,121],[43,9],[70,9],[126,77],[163,95],[150,153],[60,173],[24,51],[118,87],[182,29],[196,95],[164,73],[65,78],[109,3],[190,172],[135,158],[96,91],[149,162],[37,103],[44,133],[169,96],[176,143],[60,186],[159,114],[166,28],[14,105],[102,57],[35,144],[48,180],[138,149],[165,143],[76,94],[55,6],[189,84],[29,151],[150,86],[59,44],[34,96],[13,189],[12,92],[190,87],[41,82],[92,42],[114,117],[79,18],[165,78],[42,83],[115,117],[80,139],[141,109],[51,114],[19,144],[129,173],[38,146],[96,196],[7,154],[164,80],[39,55],[166,177],[32,111],[143,151],[52,133],[173,64],[21,92],[85,17],[148,23],[170,192],[78,171],[84,66],[67,112],[173,128],[153,59],[72,7],[17,128],[51,200],[176,142],[127,157],[128,67],[37,21],[40,177],[123,186],[50,153],[104,185],[164,200],[100,194],[33,151],[35,41],[72,32],[75,59],[13,85],[164,109],[39,50],[64,34],[154,14],[35,131],[69,127],[125,76],[87,172],[197,133],[102,150],[96,150],[80,169],[26,126],[101,55],[37,46],[36,55],[176,113],[70,140],[193,199],[192,184],[158,170],[125,155],[25,9],[99,31],[122,139],[28,174],[129,78],[16,181],[188,49],[65,42],[197,94],[191,45],[88,188],[165,11],[91,124],[100,65],[191,18]])


function redBall(arr, n){
    let dp = new Array(n+1);
    for(let i = 0; i <= n;i++){
        dp[i] = 0;
    }
    dp[0] = 1;
    for (let i = 0; i < arr.length; i++) {
        for(let j = n; j>0;j--){
            dp[j] = dp[j] * (1-arr[i]) + dp[j-1] * arr[i];
        }    
        dp[j] = dp[j] * (1-arr[i]);    
    }
    console.log(dp[n]);
}
redBall([0.4,0.6],1)