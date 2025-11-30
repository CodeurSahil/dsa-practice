![K Closest Points to Origin](/asset/images/KClosestPointstoOrigin.png)
![K Closest Points to Origin](/asset/images/KClosestPointstoOrigin2.png)
![K Closest Points to Origin](/asset/images/KClosestPointstoOrigin3.png)

-----

### 1\. Sorting

This is the most straightforward approach. We calculate the squared Euclidean distance for every point, **sort the entire array** based on these distances, and take the first `k` elements. 🐢

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @param {number} k
     * @return {number[][]}
     */
    kClosest(points, k) {
        // Sort by squared Euclidean distance
        points.sort((a, b) => (a[0] ** 2 + a[1] ** 2) - (b[0] ** 2 + b[1] ** 2));
        return points.slice(0, k);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \log n)$ due to sorting.
  * **Space Complexity**: $O(1)$ or $O(n)$, depending on the sorting implementation (e.g., Timsort).

-----

### 2\. Min-Heap

This approach throws all points into a **Min-Heap**. We then extract the top (smallest distance) element $k$ times. This is useful if you need the elements returned in strictly sorted order, though it requires $O(n)$ space to store the heap.

```javascript
/**
 * const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
 */
class Solution {
    /**
     * @param {number[][]} points
     * @param {number} k
     * @return {number[][]}
     */
    kClosest(points, k) {
        // Priority is the distance
        const minHeap = new MinPriorityQueue((point) => point[0]);

        for (const [x, y] of points) {
            const dist = x ** 2 + y ** 2;
            minHeap.enqueue([dist, x, y]);
        }

        const res = [];
        for (let i = 0; i < k; i++) {
            const [_, x, y] = minHeap.dequeue();
            res.push([x, y]);
        }

        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(k \cdot \log n)$ (assuming heapify is efficient, or $O(n \log n)$ if pushing one by one).
  * **Space Complexity**: $O(n)$ to store all points in the heap.

-----

### 3\. Max-Heap (Streaming Optimal)

This solution is more space-efficient for large datasets. We maintain a **Max-Heap of size `k`**. We iterate through the points, adding them to the heap. If the heap size exceeds `k`, we remove the *largest* distance element. This leaves us with the $k$ smallest distances in the heap. ✅

```javascript
/**
 * const { PriorityQueue } = require('@datastructures-js/priority-queue');
 */
class Solution {
    /**
     * @param {number[][]} points
     * @param {number} k
     * @return {number[][]}
     */
    kClosest(points, k) {
        // Custom comparator for Max Heap based on distance
        const maxHeap = new PriorityQueue((a, b) => b[0] - a[0]);

        for (const [x, y] of points) {
            const dist = x ** 2 + y ** 2;
            maxHeap.push([dist, x, y]);
            
            // If heap exceeds k, remove the furthest point
            if (maxHeap.size() > k) {
                maxHeap.pop();
            }
        }

        const res = [];
        while (maxHeap.size() > 0) {
            let tmp = maxHeap.pop();
            res.push([tmp[1], tmp[2]]);
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \log k)$. We iterate $n$ times, and heap operations take $\log k$.
  * **Space Complexity**: $O(k)$ to hold the heap.

-----

### 4\. Quick Select (Hoare's Selection)

This is usually the fastest algorithm on average ($O(n)$). It uses the partitioning logic from QuickSort. We choose a pivot and move smaller elements to the left and larger to the right. We then only recurse into the side that contains the $k$-th element boundary, ignoring the other half. ⚡

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @param {number} k
     * @return {number[][]}
     */
    kClosest(points, k) {
        let L = 0,
            R = points.length - 1,
            pivot = points.length;

        // Partition until the pivot lands exactly at k
        while (pivot !== k) {
            pivot = this.partition(points, L, R);
            if (pivot < k) {
                L = pivot + 1;
            } else {
                R = pivot - 1;
            }
        }
        return points.slice(0, k);
    }

    /**
     * @param {number[][]} points
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    partition(points, l, r) {
        const pivotIdx = r;
        const pivotDist = this.euclidean(points[pivotIdx]);
        let i = l;
        
        for (let j = l; j < r; j++) {
            if (this.euclidean(points[j]) <= pivotDist) {
                [points[i], points[j]] = [points[j], points[i]];
                i++;
            }
        }
        [points[i], points[r]] = [points[r], points[i]];
        return i;
    }

    /**
     * @param {number[]} point
     * @return {number}
     */
    euclidean(point) {
        return point[0] ** 2 + point[1] ** 2;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$ on average, $O(n^2)$ in the worst case (if the pivot is always bad).
  * **Space Complexity**: $O(1)$ as it modifies the array in-place.