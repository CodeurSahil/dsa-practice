/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    const validationMap = new Map();
    const dataLen = nums.length;

    let startIndex = 0;
    let endIndex = startIndex + 1;

    const solution = [];

    while(startIndex != dataLen - 1) {
        const firstNum = nums[startIndex];
        const secondNum = nums[endIndex];

        const thirdNeedNum = - (firstNum + secondNum);

        const indexOfThirdNum = nums.indexOf(thirdNeedNum);

        if(indexOfThirdNum !== -1) {
            const solArr = [firstNum, secondNum, thirdNeedNum];
            const indentificationStr = solArr.sort((a, b) => a - b).join('-');

            if(validationMap.has(indentificationStr)) {
                continue;
            }

            validationMap.set(indentificationStr, true);
            solution.push(solArr);
        }

        if(indexOfThirdNum === -1 && startIndex !== dataLen - 1 && endIndex !== dataLen - 1) {
            endIndex++;
        } else if(indexOfThirdNum === -1 && endIndex === dataLen - 1) {
            startIndex++;
            endIndex = startIndex + 1
        }
    }

    return solution;
};