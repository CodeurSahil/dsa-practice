/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    const numberMap = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z']
    }

    const combinations = [];

    const dfs = (i, str) => {
        if (i === digits.length) {
            combinations.push(str);
            return;
        }

        const alphabetVal = numberMap[digits[i]];

        for (const alphabet of alphabetVal) {
            dfs(i + 1, str + alphabet);
        }
    }

    dfs(0, '');

    return combinations;
};