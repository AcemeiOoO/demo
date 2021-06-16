/*
 * @lc app=leetcode.cn id=151 lang=javascript
 *
 * [151] 翻转字符串里的单词
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    s = s.split(' ').reverse();
    s = s.filter((item)=>{
        return item != '';
    })
    return s.join(' ');
};
// @lc code=end

