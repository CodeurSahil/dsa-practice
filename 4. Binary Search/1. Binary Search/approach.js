/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let startIndex = 0;
    let endIndex = nums.length - 1;

    while(startIndex <= endIndex) {
        const mid = startIndex + Math.floor((endIndex - startIndex) / 2);

        if (nums[mid] < target) {
            startIndex = mid + 1;
        } else if (nums[mid] > target) {
            endIndex = mid - 1;
        } else {
            return mid;
        }
    }

    return -1;
};