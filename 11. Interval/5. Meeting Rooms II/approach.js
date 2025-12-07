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
     * @returns {number}
     */
    minMeetingRooms(intervals) {
        let startArr = [];
        let endArr = [];

        for (let i = 0; i < intervals.length; i++) {
            startArr.push(intervals[i].start);
            endArr.push(intervals[i].end);
        }

        startArr = startArr.sort((a, b) => a - b);
        endArr = endArr.sort((a, b) => a - b);

        let startPointer = 0;
        let endPointer = 0;
        let curCount = 0;
        let maxCount = 0;

        while (startPointer < startArr.length) {
            if (startArr[startPointer] < endArr[endPointer]) {
                startPointer++;
                curCount++;
            } else {
                endPointer++;
                curCount--;
            }
            maxCount = Math.max(maxCount, curCount);
        }

        return maxCount;
    }
}