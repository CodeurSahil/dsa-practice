/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    intervals = intervals.sort((a, b) => a[0] - b[0]);
    const newIntervals = [];

    let curInterval = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        const nextInterval = intervals[i];

        if (nextInterval[0] > curInterval[1]) {
            newIntervals.push(curInterval);
            curInterval = nextInterval;
        } else if (curInterval[0] > nextInterval[1]) {
            newIntervals.push(nextInterval);
        } else {
            curInterval[0] = Math.min(curInterval[0], nextInterval[0]);
            curInterval[1] = Math.max(curInterval[1], nextInterval[1]);
        }
    }

    if (curInterval) newIntervals.push(curInterval);

    return newIntervals;
};