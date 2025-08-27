/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    nums = nums.sort((a, b) => a - b);

    const totalRecords = nums.length;
    if(totalRecords === 0) return totalRecords;

    let maxCount = 1;
    let currentCount = 1;

    for (let i = 1; i < totalRecords; i++) {
        const difference = nums[i] - nums[i - 1];

        if(difference === 1) {
            currentCount++;
        } else if(difference === 0) {
            continue;
        } else {
            currentCount = 1;
        }
        
        if(maxCount < currentCount) {
            maxCount = currentCount;
        }
    }

    return maxCount;
};

console.log(longestConsecutive([100,4,200,1,3,2]))
console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1]))
console.log(longestConsecutive([1,0,1,2]))