/**
 * Used Recursion to check the longest substring
 * But Did'nt work as expected
 */

var apply = function(arr) {
    let indentifierMap = {};

    for (let word of arr) {
        let splittedWord = word.split('').sort().join('-');
        console.log('🔗 ~ approchTriedByMe.js:10 -> splittedWord: ', splittedWord);

        if (!indentifierMap[splittedWord]) {
            indentifierMap[splittedWord] = [];
        }

        indentifierMap[splittedWord].push(word);
    }

    return Object.values(indentifierMap);
};

console.log(apply(['listen', 'silent', 'enlist', 'abc', 'cab', 'bac', 'rat', 'tar', 'art']));