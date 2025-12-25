/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    let totalFuel = 0;
    let totalCost = 0;

    for (let i = 0; i < gas.length; i++) {
        totalFuel += gas[i];
        totalCost += cost[i];
    }

    if (totalFuel < totalCost) return -1;

    let total = 0, res = 0;

    for (let i = 0; i < gas.length; i++) {
        total += gas[i] - cost[i];

        if (total < 0) {
            total = 0;
            res = i + 1;
        }
    }

    return res;
};

/**
 * TIME Limit
 */

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    const allStartIndex = [];

    let totalFuel = 0;
    let totalCost = 0;

    for (let i = 0; i < gas.length; i++) {
        totalFuel += gas[i];
        totalCost += cost[i];
        if (gas[i] >= cost[i]) allStartIndex.push(i);
    }

    if (totalFuel < totalCost) return -1;

    console.log('allStartIndex', allStartIndex)

    for (const index of allStartIndex) {
        let helperIndex = index;
        let tankGas = gas[helperIndex];

        do {
            tankGas -= cost[helperIndex];
            helperIndex = (helperIndex + 1) % gas.length;

            if (tankGas < 0) break;
            if (helperIndex === index) return index;

            tankGas += gas[helperIndex];

        } while (tankGas > 0);
    }

    return -1;
};