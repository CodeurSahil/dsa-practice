![Sliding Window Maximum](/asset/images/SlidingWindowMaximum.png)

-----

### 1\. Brute Force

This method iterates through every possible starting position of the window. For each window, it performs a **full scan within that window** to find its maximum element. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    maxSlidingWindow(nums, k) {
        let output = [];

        for (let i = 0; i <= nums.length - k; i++) {
            let maxi = nums[i];
            for (let j = i; j < i + k; j++) {
                maxi = Math.max(maxi, nums[j]);
            }
            output.push(maxi);
        }

        return output;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n \cdot k)$
  * **Space complexity**: $O(1)$ extra space. $O(n-k+1)$ for the output.

(Where $n$ is the length of the array and $k$ is the size of the window.)

-----

### 2\. Segment Tree

This approach uses a **Segment Tree**, a data structure optimized for range queries. The tree is built once in $O(n)$ time. Then, for each of the $n-k+1$ windows, we can query for the maximum value in that range. Each query takes $O(\log n)$ time. 🌳

```javascript
class SegmentTree {
    /**
     * @constructor
     * @param {number} N
     * @param {number[]} A
     */
    constructor(N, A) {
        this.n = N;
        this.build(N, A);
    }

    /**
     * @param {number} N
     * @param {number[]} A
     * @return {void}
     */
    build(N, A) {
        // Pad n to be a power of 2
        let nPow2 = 1;
        while (nPow2 < N) {
            nPow2 <<= 1;
        }
        this.nPow2 = nPow2;
        this.tree = new Array(2 * this.nPow2).fill(-Infinity);
        for (let i = 0; i < N; i++) {
            this.tree[this.nPow2 + i] = A[i];
        }
        for (let i = this.nPow2 - 1; i > 0; i--) {
            this.tree[i] = Math.max(this.tree[i << 1], this.tree[(i << 1) | 1]);
        }
    }

    /**
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    query(l, r) {
        let res = -Infinity;
        l += this.nPow2;
        r += this.nPow2;

        while (l <= r) {
            if (l & 1) res = Math.max(res, this.tree[l++]);
            if (!(r & 1)) res = Math.max(res, this.tree[r--]);
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    maxSlidingWindow(nums, k) {
        let n = nums.length;
        let segTree = new SegmentTree(n, nums);
        let output = [];

        for (let i = 0; i <= n - k; i++) {
            output.push(segTree.query(i, i + k - 1));
        }

        return output;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n \log n)$
  * **Space complexity**: $O(n)$

-----

### 3\. Max Heap (Priority Queue)

This method uses a **Max Priority Queue** (Max Heap) to keep track of the elements in the current window. The heap stores `[value, index]` pairs. As the window slides, we add the new element. Crucially, we "lazily" remove elements from the top of the heap if their index is no longer within the window's bounds. 🔥

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    maxSlidingWindow(nums, k) {
        // Assumes MaxPriorityQueue is available (e.g., from a library)
        const heap = new MaxPriorityQueue({ priority: (x) => x[0] });
        const output = [];
        const length = nums.length;

        for (let i = 0; i < length; i++) {
            heap.enqueue([nums[i], i]);

            // When the window is full
            if (i >= k - 1) {
                // Remove max elements that are out of the window
                while (heap.front().element[1] <= i - k) {
                    heap.dequeue();
                }
                output.push(heap.front().element[0]);
            }
        }

        return output;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n \log n)$
  * **Space complexity**: $O(n)$

-----

### 4\. Dynamic Programming

This is a very clever $O(n)$ approach. It divides the array into blocks of size `k`. It then creates two auxiliary arrays: `leftMax` (max from the start of the block) and `rightMax` (max from the end of the block). The maximum of any window `[i, i+k-1]` can be found by combining the `rightMax` at index `i` and the `leftMax` at index `i+k-1`. ↔️

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    maxSlidingWindow(nums, k) {
        const n = nums.length;
        const leftMax = new Array(n);
        const rightMax = new Array(n);

        leftMax[0] = nums[0];
        rightMax[n - 1] = nums[n - 1];

        for (let i = 1; i < n; i++) {
            if (i % k === 0) {
                leftMax[i] = nums[i];
            } else {
                leftMax[i] = Math.max(leftMax[i - 1], nums[i]);
            }

            let j = n - 1 - i;
            if ((j + 1) % k === 0) {
                rightMax[j] = nums[j];
            } else {
                rightMax[j] = Math.max(rightMax[j + 1], nums[j]);
            }
        }

        const output = new Array(n - k + 1);
        for (let i = 0; i < n - k + 1; i++) {
            output[i] = Math.max(rightMax[i], leftMax[i + k - 1]);
        }

        return output;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$

-----

### 5\. Deque (Monotonic Queue)

This is the optimal $O(n)$ solution. It uses a **Deque (double-ended queue)** to store *indices*. The deque is kept in "monotonic decreasing" order (by the values at those indices).

1.  Before adding a new index `r`, remove all smaller-valued indices from the back.
2.  Add `r` to the back.
3.  Remove any index from the front if it's outside the window.
4.  The front of the deque always holds the index of the maximum element in the window. ✅

<!-- end list -->

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    maxSlidingWindow(nums, k) {
        const n = nums.length;
        const output = new Array(n - k + 1);
        const q = []; // Stores indices
        let l = 0,
            r = 0;

        while (r < n) {
            // Remove smaller values from the back
            while (q.length && nums[q[q.length - 1]] < nums[r]) {
                q.pop();
            }
            q.push(r);

            // Remove front if it's out of window
            if (l > q[0]) {
                q.shift();
            }

            // When window is full, add max to output
            if (r + 1 >= k) {
                output[l] = nums[q[0]];
                l++;
            }
            r++;
        }

        return output;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(k)$

-----

### 6\. Deque (Implemented with Array)

This is the same logic as the Deque solution above, but implemented using a standard array and two pointers (`head`, `tail`) to simulate a deque. This avoids potential overhead from library deque implementations.

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    const result = [];
    const deque = new Array(nums.length); // store indices
    let head = 0, tail = 0; // head and tail pointers

    for (let right = 0; right < nums.length; right++) {
        // 1. Remove smaller numbers from the back
        while (tail > head && nums[deque[tail - 1]] < nums[right]) {
            tail--; // pop from back
        }

        // 2. Add the current index
        deque[tail++] = right;

        // 3. Remove elements that are out of the window from the front
        if (deque[head] <= right - k) {
            head++; // pop from front
        }

        // 4. If the window is full, the max is at the front
        if (right >= k - 1) {
            result.push(nums[deque[head]]);
        }
    }

    return result;
};
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$ (or $O(k)$ if array is pre-sized to $k$)