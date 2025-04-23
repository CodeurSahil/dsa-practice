/**
 * Worked But Time Limit Exceed
 * But Did'nt work as expected
 */

var threeSum = function (nums) {
    nums = nums.sort((a, b) => { return a - b });

    let map = {};
    let valMap = {};

    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            const duosCompliment = 0 - (nums[i] + nums[j]);

            const index = nums.indexOf(duosCompliment);

            if (index == i || index == j) {
                continue;
            }

            if (index > -1) {
                let arrr = [index, i, j];

                arrr = arrr.sort((a, b) => { return a - b });

                const str = arrr.join(',');
                
                let val = [nums[index], nums[i], nums[j]];
                val = val.sort((a, b) => { return a - b });
                
                const str2 = val.join(',');

                if (valMap[str2]) {
                    continue;
                }

                valMap[str2] = true;
                map[str] = [nums[index], nums[i], nums[j]];
            }
        }
    }

    return Object.values(map);
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));