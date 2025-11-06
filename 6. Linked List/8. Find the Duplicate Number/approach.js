/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    let tortoise = 0;
    let mare = 0;

    while (true) {
        tortoise = nums[tortoise]
        mare = nums[nums[mare]];

        if (tortoise == mare) break;
    }

    tortoise2 = 0;

    while (tortoise != tortoise2) {
        tortoise = nums[tortoise];
        tortoise2 = nums[tortoise2];

        if (tortoise == tortoise2) break;
    }

    return tortoise;
};

/**
Slow = 0 - 1 - 3 - 2 - 4
Fast = 0 - 3 - 4 - 4 - 4

slow 2 = 0 - 1 - 3 - 2
Slow  = 4 - 2 - 4 - 2
 [0,1,2,3,4]
 [3,1,3,4,2]
 */