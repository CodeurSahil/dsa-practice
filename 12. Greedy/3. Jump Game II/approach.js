/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let minJumps = 0, l = 0 , r = 0;

    while (r < nums.length - 1) {
        let farthest = 0;

        for (let i = l; i <= r; i++) farthest = Math.max(farthest, i + nums[i]);

        l = r + 1;
        r = farthest;
        minJumps++;
    }

    return minJumps;
};

/**
 * Time Limit Exceed's
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let minJumps = Infinity;

    const dfs = (i, jumpCount) => {
        if (i === nums.length - 1) minJumps = Math.min(minJumps, jumpCount);

        if (i > nums.length - 1) return;

        const NUM = nums[i];

        for (let j = 1; j <= NUM; j++) {
            dfs(i + j, jumpCount + 1)
        }
    }

    dfs(0, 0);

    return minJumps;
};