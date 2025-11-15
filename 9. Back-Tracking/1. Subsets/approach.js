/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const subSets = [];
    getSubset(0, nums, subSets, []);
    return subSets;
};

const getSubset = (i, nums, subSets, currSet) => {
    if (i >= nums.length) {
        subSets.push(currSet);
        return;
    }

    const num = nums[i];
    currSet.push(num);

    getSubset(i + 1, nums, subSets, Array.from(currSet));

    currSet.pop();
    getSubset(i + 1, nums, subSets, Array.from(currSet));
}