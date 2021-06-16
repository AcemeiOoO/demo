function checkValidString( str ) {
    // write code here

    let obj = {
        ']': ['['],
        '[': [']'],
        '.': ['[',']','.']
    }
    let arr = [];
    for(let i = 0;i<str.length;i++){
        for(let key in obj){
            if(str[i] == key || obj[key].indexOf(str[i]) != -1){
                arr.push(str[i]);
                break;
            }
        }
    }
    if(arr.length){
        let arr1 = [];
        for(let i=0;i<arr.length;i++){
            if(arr[i] == '.'){
                arr1.push(arr[i]);
                arr.splice(i--,1);
                continue;
            }
            if(obj[arr[i]]){
                if(i>0){
                    if(obj[arr[i]].indexOf(obj[i-1])!=-1){
                        arr.splice(i-1,2);
                        i=0;
                    }
                }
            }
        }
        if(arr.length == 0 || arr1.length >= arr.length){
            return true
        }else{
            return false
        }
    }
    return true

    // let stack = [];
    // let k = 0;
    // for(let i=0;i<str.length;i++){
    //     switch (str[i]){
    //         case '.':
    //             stack.push('.');
    //             break;
    //         case '[':
    //             stack.push('[');
    //             break;
    //         case ']':
    //             value = stack.pop();
    //             if(value == '[' || value == '.'){

    //             }
    //     }
    // }
}
// console.log(checkValidString('[].]]'));





function process( tangCars ,  wangCars ) {
    // write code here
    let score = 0;
    let n = wangCars.length;
    wangCars.sort((a,b)=>{return a-b});
    tangCars.sort((a,b)=>{return a-b});
    let low = 0;
    let fast = n-1;
    for(let i=n-1;i>=0;i--){
        if(tangCars[i] > wangCars[fast]){
            low++;
        }else if(tangCars[i] < wangCars[fast]){
            fast--;
            score+=3;
        }else{
            if(tangCars[i] > wangCars[low]){
                low++;
            }else{
                low++;
                score+=1;
            }
        }
    }
    return score;
}
// console.log(process([8,7,5],[7,4,9]));










function maxArea(  lethality ,  amount ) {
    // write code here
    let dp = new Array(amount+1).fill(Infinity);
    dp[0] = 0;

    for(let i = 1; i <= amount;i++){
        for(let item of lethality){
            if(i-item >= 0){
                dp[i] = Math.min(dp[i],dp[i-item]+1)
            }
        }
    }
    return dp[amount] == Infinity ? -1 : dp[amount];
    
}
// console.log(maxArea([1,2,5],11));