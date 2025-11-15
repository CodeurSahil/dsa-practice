/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    nums = nums.sort((a, b) => a - b);

    const subsets = [];

    const getSubSet = (i, currSet) => {
        if (i >= nums.length) {
            subsets.push([...currSet]);
            return;
        }

        const num = nums[i];
        currSet.push(num);

        getSubSet(i + 1, currSet);

        currSet.pop();
        while (nums[i] === nums[i + 1]) i++;
        getSubSet(i + 1, currSet);
    }

    getSubSet(0, []);

    return subsets;
};