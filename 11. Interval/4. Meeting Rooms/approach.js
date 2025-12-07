/**
 * Definition of Interval:
 * class Interval {
 *   constructor(start, end) {
 *     this.start = start;
 *     this.end = end;
 *   }
 * }
 */

class Solution {
    /**
     * @param {Interval[]} intervals
     * @returns {boolean}
     */
    canAttendMeetings(intervals) {
        if (intervals.length === 0 ) return true;
        
        intervals = intervals.sort((a, b) => a.start - b.start);

        let lastEnd = intervals[0].end;

        for (let i = 1; i < intervals.length; i++) {
            if (intervals[i].start < lastEnd) return false;
            lastEnd = intervals[i].end;
        }

        return true;
    }
}
