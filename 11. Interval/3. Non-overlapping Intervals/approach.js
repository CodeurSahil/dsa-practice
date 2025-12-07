/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    intervals = intervals.sort((a, b) => a[1] - b[1]);

    let overLappingIntervalCount = 0;
    let prevEnd = intervals[0][1];

    for (let i = 1; i < intervals.length; i++) {
        let nextInterval = intervals[i];

        if (nextInterval[0] < prevEnd) {
            overLappingIntervalCount++;
        } else {
            prevEnd = nextInterval[1]
        }
    }

    return overLappingIntervalCount;
};