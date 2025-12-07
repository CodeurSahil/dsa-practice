![Minimum Interval to Include Each Query](/asset/images/MinimumIntervaltoIncludeEachQuery.png)
![Minimum Interval to Include Each Query](/asset/images/MinimumIntervaltoIncludeEachQuery2.png)

-----

### 1\. Brute Force

This method iterates through every query. For each query, it checks every single interval to see if the query point falls within it (`left <= query <= right`). If it does, it calculates the size and keeps track of the minimum size found. 🐢

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @param {number[]} queries
     * @return {number[]}
     */
    minInterval(intervals, queries) {
        const res = [];
        for (const q of queries) {
            let cur = -1;
            for (const [l, r] of intervals) {
                if (l <= q && q <= r) {
                    const size = r - l + 1;
                    if (cur === -1 || size < cur) {
                        cur = size;
                    }
                }
            }
            res.push(cur);
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(m \cdot n)$
  * **Space Complexity**: $O(1)$ extra space (excluding output).

(Where $m$ is the number of queries and $n$ is the number of intervals.)

-----

### 2\. Sweep Line Algorithm (Events)

This approach treats interval starts, interval ends, and queries as events on a timeline.

1.  **Sort events:** Process everything from left to right.
2.  **Processing:**
      * If we hit an **Interval Start**, add its size to a Min-Heap.
      * If we hit a **Query**, the answer is the top of the Min-Heap.
      * If we hit an **Interval End**, mark it as inactive.
3.  **Lazy Removal:** Since standard Priority Queues don't support removing arbitrary elements efficiently, we check the `inactive` array when peeking at the heap top.

<!-- end list -->

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @param {number[]} queries
     * @return {number[]}
     */
    minInterval(intervals, queries) {
        let events = [];
        // Create events for intervals: [pos, type, size, index]
        // Type 0: Start, Type 2: End
        for (let i = 0; i < intervals.length; i++) {
            const [start, end] = intervals[i];
            events.push([start, 0, end - start + 1, i]);
            events.push([end, 2, end - start + 1, i]);
        }

        // Create events for queries: [pos, type, index]
        // Type 1: Query
        queries.forEach((q, i) => {
            events.push([q, 1, i]);
        });
        
        // Sort by time. Tie-break: Start(0) < Query(1) < End(2)
        // This ensures queries at interval boundaries are handled correctly.
        events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

        const ans = Array(queries.length).fill(-1);
        // Min heap storing [size, interval_index]
        // Assumes PriorityQueue is available
        const pq = new PriorityQueue((a, b) => a[0] - b[0]);
        const inactive = Array(intervals.length).fill(false);

        for (const [time, type, ...rest] of events) {
            if (type === 0) {
                // Interval start
                pq.push([rest[0], rest[1]]);
            } else if (type === 2) {
                // Interval end - mark as inactive
                inactive[rest[1]] = true;
            } else {
                // Query
                // Lazy removal: Pop invalid/ended intervals from the top
                while (!pq.isEmpty() && inactive[pq.front()[1]]) {
                    pq.pop();
                }
                if (!pq.isEmpty()) {
                    ans[rest[0]] = pq.front()[0];
                }
            }
        }

        return ans;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O((n + m) \log(n + m))$ due to sorting events.
  * **Space Complexity**: $O(n + m)$ to store events.

-----

### 3\. Min Heap (Sorted Intervals & Queries)

This is the standard optimal solution.

1.  **Sort Intervals** by start time.
2.  **Sort Queries** (but keep track of original indices to return answers in correct order).
3.  Iterate through the sorted queries. For each query `q`:
      * Add all intervals that start before `q` (`l <= q`) into a Min-Heap (ordered by size).
      * Remove all intervals from the heap that end before `q` (`r < q`), as they are no longer valid.
      * The top of the heap is the smallest valid interval for the current query. ✅

<!-- end list -->

```javascript
/**
 * const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
 */
class Solution {
    /**
     * @param {number[][]} intervals
     * @param {number[]} queries
     * @return {number[]}
     */
    minInterval(intervals, queries) {
        // Sort intervals by start time
        intervals.sort((a, b) => a[0] - b[0]);
        
        // MinHeap stores [size, end_time]
        const minHeap = new MinPriorityQueue((entry) => entry[0]);
        const res = {};
        let i = 0;

        // Sort queries to process them in order
        const sortedQueries = [...queries].sort((a, b) => a - b);

        for (const q of sortedQueries) {
            // 1. Add valid intervals starting before q
            while (i < intervals.length && intervals[i][0] <= q) {
                const [l, r] = intervals[i];
                minHeap.enqueue([r - l + 1, r]);
                i += 1;
            }

            // 2. Remove invalid intervals ending before q
            while (!minHeap.isEmpty() && minHeap.front()[1] < q) {
                minHeap.dequeue();
            }

            // 3. The top is the smallest valid interval
            res[q] = !minHeap.isEmpty() ? minHeap.front()[0] : -1;
        }

        // Map answers back to original query order
        return queries.map((q) => res[q]);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \log n + m \log m)$.
  * **Space Complexity**: $O(n + m)$.

-----

### 4\. Segment Tree (Coordinate Compression)

This solution is useful when the range of values is large ($10^7$) but the number of unique coordinates is small.

1.  **Compress Coordinates:** Map all unique interval boundaries and query points to indices $0, 1, 2...K$.
2.  **Segment Tree:** Build a Segment Tree over these compressed indices. The tree supports "Update Range" (set range `[L, R]` to have interval size `S`) and "Point Query" (get min value at index `X`).
3.  Since smaller intervals are preferred, when updating the range, we take `min(existing_val, new_val)`.

<!-- end list -->

```javascript
class SegmentTree {
    constructor(N) {
        this.n = N;
        this.tree = new Array(4 * N).fill(Infinity);
        this.lazy = new Array(4 * N).fill(Infinity);
    }

    propagate(treeidx, lo, hi) {
        if (this.lazy[treeidx] !== Infinity) {
            this.tree[treeidx] = Math.min(this.tree[treeidx], this.lazy[treeidx]);
            if (lo !== hi) {
                this.lazy[2 * treeidx + 1] = Math.min(this.lazy[2 * treeidx + 1], this.lazy[treeidx]);
                this.lazy[2 * treeidx + 2] = Math.min(this.lazy[2 * treeidx + 2], this.lazy[treeidx]);
            }
            this.lazy[treeidx] = Infinity;
        }
    }

    update(treeidx, lo, hi, left, right, val) {
        this.propagate(treeidx, lo, hi);
        if (lo > right || hi < left) return;
        if (lo >= left && hi <= right) {
            this.lazy[treeidx] = Math.min(this.lazy[treeidx], val);
            this.propagate(treeidx, lo, hi);
            return;
        }
        const mid = Math.floor((lo + hi) / 2);
        this.update(2 * treeidx + 1, lo, mid, left, right, val);
        this.update(2 * treeidx + 2, mid + 1, hi, left, right, val);
        this.tree[treeidx] = Math.min(this.tree[2 * treeidx + 1], this.tree[2 * treeidx + 2]);
    }

    query(treeidx, lo, hi, idx) {
        this.propagate(treeidx, lo, hi);
        if (lo === hi) return this.tree[treeidx];
        const mid = Math.floor((lo + hi) / 2);
        if (idx <= mid) return this.query(2 * treeidx + 1, lo, mid, idx);
        else return this.query(2 * treeidx + 2, mid + 1, hi, idx);
    }

    updateRange(left, right, val) {
        this.update(0, 0, this.n - 1, left, right, val);
    }

    queryPoint(idx) {
        return this.query(0, 0, this.n - 1, idx);
    }
}

class Solution {
    minInterval(intervals, queries) {
        // Collect all unique points for coordinate compression
        const points = [];
        for (const interval of intervals) {
            points.push(interval[0]);
            points.push(interval[1]);
        }
        for (const q of queries) {
            points.push(q);
        }
        const uniquePoints = [...new Set(points)].sort((a, b) => a - b);
        const compress = new Map();
        uniquePoints.forEach((point, idx) => {
            compress.set(point, idx);
        });

        const segTree = new SegmentTree(uniquePoints.length);
        
        // Update tree with intervals
        for (const interval of intervals) {
            const start = compress.get(interval[0]);
            const end = compress.get(interval[1]);
            const length = interval[1] - interval[0] + 1;
            segTree.updateRange(start, end, length);
        }

        // Query tree
        const ans = [];
        for (const q of queries) {
            const idx = compress.get(q);
            const res = segTree.queryPoint(idx);
            ans.push(res === Infinity ? -1 : res);
        }
        return ans;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O((n + m) \log k)$, where $k$ is the number of unique coordinates.
  * **Space Complexity**: $O(k)$ for the tree and map.

Would you like me to explain the "Coordinate Compression" technique in more detail?