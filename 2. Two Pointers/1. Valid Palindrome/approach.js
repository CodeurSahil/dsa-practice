/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let str = '';

    for(let char of s) {
        char = char.toLowerCase();
        str += alphabet.indexOf(char) > -1 ? char : '';
    }

    let startIndex = 0;
    let lastIndex = str.length - 1;

    // if(lastIndex == -1) {
    //     return true;
    // }

    while(startIndex < lastIndex) {
        if(str[startIndex] !== str[lastIndex]) {
            return false;
        }

        startIndex++;
        lastIndex--;
    }

    return true;
};