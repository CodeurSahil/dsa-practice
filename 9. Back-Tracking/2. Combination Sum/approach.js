/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    const combinations = [];

    for (let i = 0; i < candidates.length; i++) {
        backtracking(i, candidates, combinations, Array.from([]), 0, target)
    }

    return combinations;
};


const backtracking = (i, candidates, combinations, sumArr, currentSum, target) => {
    let newSum = currentSum + candidates[i];
    sumArr.push(candidates[i]);

    if (newSum === target) {
        combinations.push(sumArr);
    }

    if (newSum >= target) {
        return;
    }

    for (let j = i; j < candidates.length; j++) {
        backtracking(j, candidates, combinations, Array.from(sumArr), newSum, target);
    }
}



