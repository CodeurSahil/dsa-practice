/**
 * Used Recursion to check the longest substring
 * But Did'nt work as expected
 */

var lengthOfLongestSubstring = function(s) {
    return checkMax(s, 0, 0);;
};

function checkMax(string, currentIndex, maxCount) {
    let longestStringCount = 0;

    let indentifierMap = {};

    for(let i = currentIndex; i < string.length; i++) {
        let char = string[i];
        if(indentifierMap[char]) {
            return checkMax(string, currentIndex + 1, longestStringCount > maxCount ? longestStringCount : maxCount)
        }
        longestStringCount++;
        indentifierMap[char] = true;
    }

    checkMax(string, currentIndex + 1, longestStringCount > maxCount ? longestStringCount : maxCount);

    return longestStringCount > maxCount ? longestStringCount : maxCount;
}

console.log(lengthOfLongestSubstring("anviaj"));