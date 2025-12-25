/**
 * @param {number[][]} triplets
 * @param {number[]} target
 * @return {boolean}
 */
var mergeTriplets = function(triplets, target) {
    const validationSet = new Set();

    for (const [a, b, c] of triplets) {
        if (
            a > target[0] ||
            b > target[1] ||
            c > target[2]
        ) {
            continue;
        }

        if (a === target[0]) validationSet.add(0);
        if (b === target[1]) validationSet.add(1);
        if (c === target[2]) validationSet.add(2);
    }

    return validationSet.size === target.length;
};