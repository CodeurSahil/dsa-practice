/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function (target, position, speed) {
    const map = {};

    let fleet = 0;

    for (let i = 0; i < position.length; i++) {
        map[`${position[i]}`] = speed[i];
    }
    // console.log('🎍 ~ test.js:13 -> map: ', map);

    return oneHourPassed(target, Object.keys(map), map, fleet);
};

function oneHourPassed(target, keys, map, fleet) {
    // console.log('🍺 ~ test.js:21 -> target, keys, map, fleet: ', target, keys, map, fleet);
    const newMap = {};
    let fleetFound = false;

    for (const key of keys) {
        const currentDist = Number(key);

        const newDist = currentDist + map[key];

        if (newDist >= target) {
            fleetFound = true;
        } else {
            newMap[`${newDist}`] = Math.min(newMap[newDist] ? newMap[newDist] : Infinity, map[key]);
        }
    }

    if (fleetFound) {
        fleet++;
    }

    const newKey = Object.keys(newMap);
    // console.log('🌟 ~ test.js:43 -> newMap: ', newMap);
    // console.log('🚢 ~ test.js:42 -> newKey: ', newKey);
    if (newKey.length > 0) {
        return oneHourPassed(target, newKey, newMap, fleet);
    }

    return fleet;
}

console.log(carFleet(12, [10,8,0,5,3], [2,4,1,1,3]));

/// Failed / Wrong Approach

var carFleet = function (target, position, speed) {
    const stack = [];
    
    let pair = position.map((dist, i) => [dist, speed[i]]);
    pair.sort((a, b) => b[0] - a[0]);

    for(const [p, s] of pair) {
        const hourLeftToReach = (target - p) / s;

        stack.push(hourLeftToReach);

        if(stack.length > 1 && stack[stack.length - 1] <= stack[stack.length - 2]) {
            stack.pop();
        }
    }

    return stack.length;
};

// PASSED but a Bigger Run Time

// A very Good Approach
var carFleet = function(target, position, speed) {
    const time = new Array(target);
    for (let i = 0; i < position.length; i++) {
        time[position[i]] = (target - position[i]) / speed[i];
    }

    const stack = [];

    for (let i = target - 1; i >= 0; i--) {
        if (time[i] !== undefined && (!stack.length || time[i] > stack[stack.length - 1])) {
            stack.push(time[i]);
        }
    }

    return stack.length;    
};