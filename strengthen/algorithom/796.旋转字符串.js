/*
 * @lc app=leetcode.cn id=796 lang=javascript
 *
 * [796] 旋转字符串
 */

// @lc code=start
/**
 * @param {string} A
 * @param {string} B
 * @return {boolean}
 */
var rotateString = function(A, B) {
// ababc
// abcab
if(A == B){
    return true
}
for(let i = 1;i<A.length;i++){
    if(A.slice(i,A.length).concat(A.slice(0,i)) == B){
        return true
    }
}
return false
};
// @lc code=end

