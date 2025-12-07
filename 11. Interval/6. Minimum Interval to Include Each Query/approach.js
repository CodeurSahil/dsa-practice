/**
 * @param {number[][]} intervals
 * @param {number[]} queries
 * @return {number[]}
 */
var minInterval = function(intervals, queries) {
    intervals = intervals.sort((a, b) => a[0] - b[0]);
    const validationQueue = new MinPriorityQueue((data) => data[0]);
    
    const sortedQuery = [...queries].sort((a, b) => a - b);
    let checkIndex = 0;
    const res = [];

    for (const query of sortedQuery) {
        while(checkIndex < intervals.length && query >= intervals[checkIndex][0]) {
            const [l, r] = intervals[checkIndex];
            validationQueue.enqueue([r - l + 1, r]);
            checkIndex++;
        }

        while(!validationQueue.isEmpty() && validationQueue.front()[1] < query) validationQueue.pop();

        res[query] = !validationQueue.isEmpty() ? validationQueue.front()[0] : -1;
    }

    return queries.map((q) => res[q]);
};

// 4 - 1 + 1 = 4
// 4 - 2 + 1 = 3
// 6 - 3 + 1 = 4
// 4 - 4 + 1 = 1

/**
 * Failed on Time
 */

/**
 * @param {number[][]} intervals
 * @param {number[]} queries
 * @return {number[]}
 */
var minInterval = function(intervals, queries) {
    const res = new Array(queries.length).fill(-1);

    for (let i = 0; i < queries.length; i++) {
        const query = queries[i];
        for (let j = 0; j < intervals.length; j++) {
            if (query <= intervals[j][1] && query >= intervals[j][0]) {
                res[i] = Math.min(res[i] === -1 ? Infinity : res[i], intervals[j][1] - intervals[j][0] + 1);
            }
        }
    }

    return res;
};

// 4 - 1 + 1 = 4
// 4 - 2 + 1 = 3
// 6 - 3 + 1 = 4
// 4 - 4 + 1 = 1