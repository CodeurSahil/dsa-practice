/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
var isNStraightHand = function(hand, groupSize) {
    if (hand.length % groupSize != 0) return false;

    const checkMap = {};

    for (let num of hand) {
        checkMap[num] = (checkMap[num] || 0) + 1;
    }

    let values = Object.keys(checkMap).map((n) => Number(n));
    while (values.length != 0) {
        if (values.length < groupSize) return false;

        let lastVal;

        for (let i = 0; i < groupSize; i++) {
            if (lastVal != undefined && lastVal != values[i] - 1) return false;

            lastVal = values[i];
            checkMap[lastVal]--;

            if (checkMap[values[i]] === 0) delete checkMap[values[i]];
        }

        values = Object.keys(checkMap).map((n) => Number(n));
    }
    
    return true;
};