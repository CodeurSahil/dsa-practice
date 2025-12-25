/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function(s) {
    const validationMap = new Map();

    for (let i = 0; i < s.length; i++) {
        validationMap.set(s[i], i);
    }

    let result = [];
    let size = 0, end = 0;

    for (let i = 0; i < s.length; i++) {
        size++;

        end = Math.max(end, validationMap.get(s[i]));

        if (end === i) {
            result.push(size);
            size = 0;
        }
    }

    return result;
};