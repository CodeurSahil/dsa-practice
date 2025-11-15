/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    candidates = candidates.sort((a, b) => a - b);

    const combinations = [];

// [1, 2, 2, 2, 5]
    const checkSum = (i, arrSum, curSum) => {
        if (i >= candidates.length) return;

        const candidate = candidates[i];

        let newSum = curSum + candidate;
        arrSum.push(candidate);

        if (newSum === target) combinations.push(arrSum);

        if (newSum >= target) return;

        checkSum(i + 1, Array.from(arrSum), newSum);

        arrSum.pop();
        for (let j = i + 1; j < candidates.length; j++) {
            if (candidates[i] === candidates[j]) i++;
        }
        checkSum(i + 1, Array.from(arrSum), curSum);
    }

    checkSum(0, [], 0);

    return combinations;
};