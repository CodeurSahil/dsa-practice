![Insert Interval](/asset/images/InsertInterval.png)
![Insert Interval](/asset/images/InsertInterval2.png)

-----

### 1\. Linear Search (Three-Pass Logic)

This is the standard and most intuitive approach. It processes the intervals in three distinct phases within a single loop structure:

1.  **Left Part:** Add all intervals that end *before* the new interval starts.
2.  **Merge Part:** Merge all overlapping intervals. An interval overlaps if its end is $\ge$ new interval's start. We continuously update `newInterval` to encompass the merged range.
3.  **Right Part:** Add the remaining intervals that start *after* the new interval ends.

<!-- end list -->

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @param {number[]} newInterval
     * @return {number[][]}
     */
    insert(intervals, newInterval) {
        let n = intervals.length,
            i = 0,
            res = [];

        // 1. Add all intervals ending before newInterval starts
        while (i < n && intervals[i][1] < newInterval[0]) {
            res.push(intervals[i]);
            i++;
        }

        // 2. Merge overlapping intervals
        while (i < n && newInterval[1] >= intervals[i][0]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.push(newInterval);

        // 3. Add remaining intervals
        while (i < n) {
            res.push(intervals[i]);
            i++;
        }

        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$ because we iterate through the list once.
  * **Space Complexity**: $O(1)$ extra space (excluding the output array).

-----

### 2\. Binary Search

This approach attempts to optimize finding the insertion point using binary search. It finds the correct position based on the start time, inserts the new interval, and then performs a linear scan to merge overlaps. While finding the spot is faster ($O(\log n)$), the insertion (`splice`) and subsequent merge still take $O(n)$, making the overall complexity linear.

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @param {number[]} newInterval
     * @return {number[][]}
     */
    insert(intervals, newInterval) {
        if (intervals.length === 0) {
            return [newInterval];
        }

        let n = intervals.length;
        let target = newInterval[0];
        let left = 0,
            right = n - 1;

        // Find insertion point
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (intervals[mid][0] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        // Insert newInterval at the correct sorted position
        intervals.splice(left, 0, newInterval);

        // Merge intervals
        let res = [];
        for (let interval of intervals) {
            if (res.length === 0 || res[res.length - 1][1] < interval[0]) {
                res.push(interval);
            } else {
                res[res.length - 1][1] = Math.max(
                    res[res.length - 1][1],
                    interval[1],
                );
            }
        }

        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$. Binary search is $O(\log n)$, but `splice` and the final merge loop are $O(n)$.
  * **Space Complexity**: $O(1)$ extra space.

-----

### 3\. Greedy (Iterative Merge)

This is a clean, single-loop variation of the linear search. It iterates through the intervals and decides essentially three things for each:

1.  Is the current interval completely to the left? -\> Push it.
2.  Is the current interval completely to the right? -\> Push `newInterval` (if not already pushed), then push current.
3.  Do they overlap? -\> Merge them into `newInterval` but **don't push yet** (we might need to merge with the *next* one too).

<!-- end list -->

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @param {number[]} newInterval
     * @return {number[][]}
     */
    insert(intervals, newInterval) {
        const res = [];
        for (const interval of intervals) {
            // Case 1: Current interval is before newInterval
            if (newInterval === null || interval[1] < newInterval[0]) {
                res.push(interval);
            } 
            // Case 2: Current interval is after newInterval
            else if (interval[0] > newInterval[1]) {
                res.push(newInterval);
                res.push(interval);
                newInterval = null; // Mark as pushed
            } 
            // Case 3: Overlap - Merge
            else {
                newInterval[0] = Math.min(interval[0], newInterval[0]);
                newInterval[1] = Math.max(interval[1], newInterval[1]);
            }
        }
        // If newInterval was never pushed (it ended up merging until the very end)
        if (newInterval !== null) res.push(newInterval);
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(1)$ extra space.