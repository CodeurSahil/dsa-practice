// /**
//  * @param {number[]} nums
//  * @param {number} target
//  * @return {number}
//  */
// var search = function(nums, target) {
//     let l = 0, r = nums.length - 1;

//     while (l < r) {
//         if (nums[l] === target) {
//             return l;
//         }

//         const MID = l + Math.floor((r - l) / 2);

//         if (nums[MID] > nums[l] && target > nums[l]) {
//             r = MID;
//         } else {
//             l = MID + 1;
//         }
//     }
    
//     return target === nums[l] ? l : -1;
// };


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let l = 0, r = nums.length - 1;

    while (l <= r) {
        const MID = l + Math.floor((r - l) / 2);

        if (nums[MID] === target) {
            return MID;
        }

        if (nums[l] <= nums[MID]) {
            if (target > nums[MID] || target < nums[l]) {
                l = MID + 1;
            } else {
                r = MID - 1;
            }
        } else {
            if (target < nums[MID] || target > nums[r]) {
                r = MID - 1;
            } else {
                l = MID + 1;
            }
        }
    }
    
    return -1;
};