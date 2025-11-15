/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const combinations = [];

    const getCom = (i, currCom, helperMap) => {

        if (i === nums.length) combinations.push([...currCom]);

        for (let j = 0; j < nums.length; j++) {
            if (!helperMap[j]) {
                currCom.push(nums[j]);
                helperMap[j] = true;

                getCom(i + 1, currCom, helperMap);

                currCom.pop();
                helperMap[j] = false;
            }
        }
    }

    getCom(0, [], {});

    return combinations;
};