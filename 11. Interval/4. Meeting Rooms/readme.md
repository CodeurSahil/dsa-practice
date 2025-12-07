![Meeting Rooms](/asset/images/MeetingRooms.png)
![Meeting Rooms](/asset/images/MeetingRooms2.png)

-----

### 1\. Brute Force

This method compares **every meeting with every other meeting**. If any pair of meetings overlaps, it returns `false`.

The condition `Math.min(A.end, B.end) > Math.max(A.start, B.start)` effectively checks if the intersection of the two intervals has a positive length.

```javascript
/**
 * Definition of Interval:
 * class Interval {
 * constructor(start, end) {
 * this.start = start;
 * this.end = end;
 * }
 * }
 */
class Solution {
    /**
     * @param {Interval[]} intervals
     * @returns {boolean}
     */
    canAttendMeetings(intervals) {
        const n = intervals.length;
        for (let i = 0; i < n; i++) {
            const A = intervals[i];
            for (let j = i + 1; j < n; j++) {
                const B = intervals[j];
                // Check if intervals A and B overlap
                if (Math.min(A.end, B.end) > Math.max(A.start, B.start)) {
                    return false;
                }
            }
        }
        return true;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$ due to the nested loops comparing every pair.
  * **Space Complexity**: $O(1)$

-----

### 2\. Sorting (Optimal)

This approach is much more efficient. By **sorting the meetings by their start time**, we simplify the problem. We only need to check if the current meeting starts *before* the previous meeting ends. If we find such a case, there is an overlap.

```javascript
/**
 * Definition of Interval:
 * class Interval {
 * constructor(start, end) {
 * this.start = start;
 * this.end = end;
 * }
 * }
 */
class Solution {
    /**
     * @param {Interval[]} intervals
     * @returns {boolean}
     */
    canAttendMeetings(intervals) {
        // Sort by start time
        intervals.sort((a, b) => a.start - b.start);
        
        for (let i = 1; i < intervals.length; i++) {
            // If current meeting starts before the previous one ends -> Overlap
            if (intervals[i].start < intervals[i - 1].end) {
                return false;
            }
        }
        return true;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \log n)$ dominated by the sorting step.
  * **Space Complexity**: $O(1)$ or $O(n)$, depending on the sorting algorithm implementation.