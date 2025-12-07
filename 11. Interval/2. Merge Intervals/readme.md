![Merge Intervals](/asset/images/MergeIntervals.png)
![Merge Intervals](/asset/images/MergeIntervals2.png)

-----

### 1\. Sorting (Standard Approach)

This is the most common and intuitive solution. First, we **sort the intervals by their start time**. Then, we iterate through the sorted list. For each interval, we check if it overlaps with the last interval in our output list (i.e., if `current.start <= last.end`). If they overlap, we merge them by updating the end time. If not, we simply add the current interval to the list. 📊

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number[][]}
     */
    merge(intervals) {
        // Sort by start time
        intervals.sort((a, b) => a[0] - b[0]);
        
        const output = [];
        output.push(intervals[0]);

        for (const interval of intervals) {
            const start = interval[0];
            const end = interval[1];
            const lastEnd = output[output.length - 1][1];

            // If current overlaps with the previous, merge them
            if (start <= lastEnd) {
                output[output.length - 1][1] = Math.max(lastEnd, end);
            } else {
                // No overlap, add to output
                output.push([start, end]);
            }
        }
        return output;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \log n)$, dominated by the sorting step.
  * **Space Complexity**: $O(1)$ or $O(n)$, depending on the sorting implementation (excluding the output array).

-----

### 2\. Sweep Line Algorithm

This approach treats the start and end points as "events" on a timeline. We use a map to record the net change in active intervals at each point (+1 for a start, -1 for an end). By sorting these points and iterating through them, we can determine when intervals begin (active count becomes \> 0) and when they end (active count returns to 0). 🧹

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number[][]}
     */
    merge(intervals) {
        const mp = new Map();
        for (const [start, end] of intervals) {
            mp.set(start, (mp.get(start) || 0) + 1);
            mp.set(end, (mp.get(end) || 0) - 1);
        }

        const sortedKeys = Array.from(mp.keys()).sort((a, b) => a - b);
        const res = [];
        let interval = [];
        let have = 0;

        for (const i of sortedKeys) {
            if (interval.length === 0) {
                interval.push(i); // Start of a new merged interval
            }
            have += mp.get(i);
            
            // If active intervals count drops to 0, close the current interval
            if (have === 0) {
                interval.push(i);
                res.push(interval);
                interval = [];
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \log n)$ due to sorting the keys of the map.
  * **Space Complexity**: $O(n)$ to store the map.

-----

### 3\. Greedy (Counting Sort / Direct Mapping)

This approach is optimized for scenarios where the **range of numbers is small**. Instead of comparing intervals, it maps the input onto a large array where the index represents the start time and the value represents the furthest end time reachable from that start. We then iterate through this array to construct the merged intervals. This avoids the $O(n \log n)$ sort but uses more memory based on the value range. ⚡

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number[][]}
     */
    merge(intervals) {
        let max = 0;
        for (let i = 0; i < intervals.length; i++) {
            max = Math.max(intervals[i][0], max);
        }

        // Map start times to their max end times
        let mp = new Array(max + 1).fill(0);
        for (let i = 0; i < intervals.length; i++) {
            let start = intervals[i][0];
            let end = intervals[i][1];
            // Use end + 1 to handle edge cases or 0-length intervals
            mp[start] = Math.max(end + 1, mp[start]); 
        }

        let res = [];
        let have = -1;
        let intervalStart = -1;
        
        for (let i = 0; i < mp.length; i++) {
            if (mp[i] !== 0) {
                if (intervalStart === -1) intervalStart = i;
                have = Math.max(mp[i] - 1, have);
            }
            // Check if current position closes the interval
            if (have === i) {
                res.push([intervalStart, have]);
                have = -1;
                intervalStart = -1;
            }
        }

        if (intervalStart !== -1) {
            res.push([intervalStart, have]);
        }

        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n + m)$, where $n$ is the number of intervals and $m$ is the maximum value in the intervals (range size).
  * **Space Complexity**: $O(m)$ to store the `mp` array.