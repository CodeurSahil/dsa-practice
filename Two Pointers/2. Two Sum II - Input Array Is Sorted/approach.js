/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    const dataLen = numbers.length;

    let startIndex = 0;
    let endIndex = dataLen - 1;

    while(startIndex < endIndex) {
        const leftValue = numbers[startIndex];
        const rightValue = numbers[endIndex];

        const sum = leftValue + rightValue;

        if (sum === target) {
            return [startIndex + 1, endIndex + 1];
        } else if(sum < target) {
            startIndex++;
        } else if(sum > target) {
            endIndex--;
        }
    }

    return;
};

//Passed