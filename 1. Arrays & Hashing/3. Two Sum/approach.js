var twoSum = function(nums, target) {
    nums = nums.sort((a, b) => a - b);

    let startPointer = 0;
    let endPointer = nums.length - 1;

    while(startPointer < endPointer) {
        const sum = nums[startPointer] + nums[endPointer];

        if(sum === target) {
            return [startPointer, endPointer];
        } else if(sum < target) {
            startPointer++;
        } else {
            endPointer--;
        }
    }

    return []
};

console.log(twoSum([2,7,11,15], 9));

// Only For Sorted Array