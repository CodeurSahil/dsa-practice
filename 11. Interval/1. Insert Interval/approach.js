/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    const newIntervals = [];

    for (const interval of intervals) {
        if (newInterval == null || interval[1] < newInterval[0]) {
            newIntervals.push(interval);
        }
        else if (interval[0] > newInterval[1]) {
            newIntervals.push(newInterval);
            newIntervals.push(interval);
            newInterval = null
        } else {
            newInterval[0] = Math.min(newInterval[0], interval[0]);
            newInterval[1] = Math.max(newInterval[1], interval[1]);
        }
    }

    if (newInterval) newIntervals.push(newInterval);

    return newIntervals;
};