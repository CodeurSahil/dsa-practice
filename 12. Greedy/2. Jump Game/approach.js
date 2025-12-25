/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let GOEL = nums.length - 1;

    for (let i = nums.length - 2; i >= 0; i--) {
        if (i + nums[i] >= GOEL) GOEL = i;
    }

    return GOEL === 0;
};