![Kth Largest Element in a Stream](/asset/images/KthLargestElementinaStream.png)
![Kth Largest Element in a Stream](/asset/images/KthLargestElementinaStream2.png)
![Kth Largest Element in a Stream](/asset/images/KthLargestElementinaStream3.png)

-----

### 1\. Sorting (Brute Force)

This approach maintains a full list of all numbers. Whenever `add(val)` is called, the new value is pushed into the array, and the **entire array is sorted**. We then simply return the element at the index corresponding to the $k$-th largest (which is `length - k` in a 0-indexed sorted array). 🐢

```javascript
class KthLargest {
    /**
     * @param {number} k
     * @param {number[]} nums
     */
    constructor(k, nums) {
        this.arr = nums;
        this.k = k;
    }

    /**
     * @param {number} val
     * @return {number}
     */
    add(val) {
        this.arr.push(val);
        this.arr.sort((a, b) => a - b);
        return this.arr[this.arr.length - this.k];
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(m \cdot n \log n)$
      * Where $m$ is the number of calls to `add()` and $n$ is the current size of the stream. Sorting takes $O(n \log n)$ and we do it $m$ times.
  * **Space Complexity**: $O(n)$
      * We store all $n$ elements. Sorting may require $O(1)$ or $O(n)$ auxiliary space depending on the algorithm (e.g., Timsort in V8).

-----

### 2\. Min-Heap (Optimal)

This is the standard, efficient solution. We maintain a **Min-Heap of size exactly $k$**.

  * The heap stores the $k$ largest elements seen so far.
  * The **root** of this Min-Heap (the smallest value in the heap) is guaranteed to be the **$k$-th largest** element of the entire stream.
  * When a new value comes in, we add it to the heap. If the heap size exceeds $k$, we remove the smallest element (the root). This keeps the heap size stable. ✅

<!-- end list -->

```javascript
/**
 * const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
 */
class KthLargest {
    /**
     * @param {number} k
     * @param {number[]} nums
     */
    constructor(k, nums) {
        // Uses a MinPriorityQueue (available in environments like LeetCode)
        this.minHeap = new MinPriorityQueue();
        this.k = k;

        for (const num of nums) {
            this.minHeap.enqueue(num);
        }

        // Ensure heap contains only the k largest elements
        while (this.minHeap.size() > k) {
            this.minHeap.dequeue();
        }
    }

    /**
     * @param {number} val
     * @return {number}
     */
    add(val) {
        this.minHeap.enqueue(val);
        if (this.minHeap.size() > this.k) {
            this.minHeap.dequeue();
        }
        return this.minHeap.front().element; // .element handles the object wrapper in some libraries
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(m \cdot \log k)$
      * Each `add()` operation involves a heap insertion and potentially a deletion, taking $O(\log k)$ time.
  * **Space Complexity**: $O(k)$
      * The heap only stores the $k$ largest elements, regardless of how many numbers are in the stream.