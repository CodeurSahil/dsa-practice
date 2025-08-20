/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if (s.length != t.length) {
        return false;
    }

    let mainStringObj = {};

    for(let alphabet of s) {
        if (!mainStringObj[alphabet]) {
            mainStringObj[alphabet] = 0;
        }

        mainStringObj[alphabet]++;
    }

    for(let alphabet of t) {
        if (!mainStringObj[alphabet]) {
            return false;
        }
        mainStringObj[alphabet]--;
    }

    return true;
};

console.log(isAnagram("anagram", "nagaram"));
console.log(isAnagram("rat", "car"));

// Failed On Input Like  "ab", "a"

/** So Added
if (s.length != t.length) {
        return false;
    } 
*/