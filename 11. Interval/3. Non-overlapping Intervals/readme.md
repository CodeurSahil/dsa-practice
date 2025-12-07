![Non-overlapping Intervals](/asset/images/Non-overlappingIntervals.png)
![Non-overlapping Intervals](/asset/images/Non-overlappingIntervals2.png)

-----

### 1\. Recursion (Brute Force)

This approach sorts the intervals by start time and tries every possible combination. For every interval, we have two choices: include it (if valid) or skip it. We calculate the maximum number of non-overlapping intervals we can keep and subtract that from the total length. 🐢

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[0] - b[0]);

        const dfs = (i, prev) => {
            if (i === intervals.length) return 0;
            
            // Option 1: Skip current interval
            let res = dfs(i + 1, prev);
            
            // Option 2: Include current interval (if no overlap)
            if (prev === -1 || intervals[prev][1] <= intervals[i][0]) {
                res = Math.max(res, 1 + dfs(i + 1, i));
            }
            return res;
        };

        return intervals.length - dfs(0, -1);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(2^n)$. In the worst case, we explore two branches for every interval.
  * **Space Complexity**: $O(n)$ for the recursion stack.

-----

### 2\. Dynamic Programming (Top-Down / Memoization)

This improves on the recursive solution by caching results. We sort by **end time** (though start time works too with adjustments). For each interval `i`, we find the max non-overlapping intervals in the range `[i+1...n]` that are compatible.

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[1] - b[1]);
        const n = intervals.length;
        let memo = new Array(n).fill(-1);

        const dfs = (i) => {
            if (i >= n) return 0;
            if (memo[i] !== -1) return memo[i];

            let res = 1;
            for (let j = i + 1; j < n; j++) {
                if (intervals[i][1] <= intervals[j][0]) {
                    res = Math.max(res, 1 + dfs(j));
                }
            }
            memo[i] = res;
            return res;
        };

        const maxNonOverlapping = dfs(0);
        return n - maxNonOverlapping;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$. Even with memoization, the inner loop iterates up to $n$ times.
  * **Space Complexity**: $O(n)$ for the memoization array and recursion stack.

-----

### 3\. Dynamic Programming (Bottom-Up)

This is essentially the **Longest Increasing Subsequence (LIS)** approach. We sort the intervals. `dp[i]` represents the maximum number of non-overlapping intervals ending at index `i`.

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[1] - b[1]);
        const n = intervals.length;
        const dp = new Array(n).fill(0);

        for (let i = 0; i < n; i++) {
            dp[i] = 1;
            for (let j = 0; j < i; j++) {
                // If interval j ends before i starts, we can extend the sequence
                if (intervals[j][1] <= intervals[i][0]) {
                    dp[i] = Math.max(dp[i], 1 + dp[j]);
                }
            }
        }

        const maxNonOverlapping = Math.max(...dp);
        return n - maxNonOverlapping;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$.
  * **Space Complexity**: $O(n)$ for the DP array.

-----

### 4\. Dynamic Programming with Binary Search

We can optimize the Bottom-Up approach. Instead of linearly scanning backwards to find the compatible interval `j`, we can use **Binary Search** to find the nearest interval that ends before the current one starts. This reduces the inner loop complexity. 🔍

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[1] - b[1]);
        const n = intervals.length;
        const dp = new Array(n).fill(0);
        dp[0] = 1;

        const bs = (r, target) => {
            let l = 0;
            while (l < r) {
                const m = (l + r) >> 1;
                if (intervals[m][1] <= target) {
                    l = m + 1;
                } else {
                    r = m;
                }
            }
            return l;
        };

        for (let i = 1; i < n; i++) {
            const idx = bs(i, intervals[i][0]);
            if (idx === 0) {
                dp[i] = dp[i - 1]; // Can't add current interval
            } else {
                // Either skip current, or take current + best from compatible range
                dp[i] = Math.max(dp[i - 1], 1 + dp[idx - 1]);
            }
        }
        return n - dp[n - 1];
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \log n)$. Sorting is $O(n \log n)$, and the loop runs $n$ times with a $\log n$ binary search.
  * **Space Complexity**: $O(n)$.

-----

### 5\. Greedy (Sort By Start Time)

This is a classic greedy strategy. We sort by **start time**. We iterate through the intervals. If two intervals overlap, we must remove one. The greedy choice is to **remove the interval that ends later**, because keeping the one that ends sooner leaves more room for subsequent intervals. ✨

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[0] - b[0]);
        let res = 0;
        let prevEnd = intervals[0][1];

        for (let i = 1; i < intervals.length; i++) {
            const start = intervals[i][0];
            const end = intervals[i][1];
            
            if (start >= prevEnd) {
                // No overlap, update end to current
                prevEnd = end;
            } else {
                // Overlap detected. Remove one (increment result).
                // Key logic: Keep the one that ends sooner.
                res++;
                prevEnd = Math.min(end, prevEnd);
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \log n)$ due to sorting. The iteration is $O(n)$.
  * **Space Complexity**: $O(1)$ (ignoring sort space).

-----

### 6\. Greedy (Sort By End Time)

This is essentially the same greedy logic but viewed differently. By sorting by **end time**, the "first" interval in the list is automatically the one that ends soonest (the best one to keep). We iterate and simply count how many intervals start *after* the previous one ends. Any interval that doesn't fit this criteria overlaps and is conceptually "removed". ✅

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[1] - b[1]);
        let res = 0;
        let prevEnd = intervals[0][1];

        for (let i = 1; i < intervals.length; i++) {
            const start = intervals[i][0];
            const end = intervals[i][1];
            
            if (start < prevEnd) {
                // Overlap: The current interval starts before the previous one ended.
                // Since we sorted by end time, the previous one is "better" to keep.
                // We discard the current one.
                res++;
            } else {
                // No overlap: Update the end pointer.
                prevEnd = end;
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \log n)$ due to sorting.
  * **Space Complexity**: $O(1)$ (ignoring sort space).