![Find Median from Data Stream](/asset/images/FindMedianfromDataStream.png)
![Find Median from Data Stream](/asset/images/FindMedianfromDataStream2.png)

-----

### 1\. Sorting (Brute Force)

This approach stores all numbers in a simple array. Whenever `findMedian()` is called, it **sorts the entire array** to locate the middle element(s). While adding a number is fast, finding the median is very slow as the dataset grows. 🐢

```javascript
class MedianFinder {
    constructor() {
        this.data = [];
    }

    /**
     * @param {number} num
     * @return {void}
     */
    addNum(num) {
        this.data.push(num);
    }

    /**
     * @return {number}
     */
    findMedian() {
        // Sort the array every time median is requested
        this.data.sort((a, b) => a - b);
        
        let n = this.data.length;
        if (n & 1) {
            // Odd length: return middle element
            return this.data[Math.floor(n / 2)];
        } else {
            // Even length: return average of two middle elements
            return (this.data[n / 2] + this.data[n / 2 - 1]) / 2;
        }
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**:
      * `addNum()`: $O(1)$ (amortized).
      * `findMedian()`: $O(n \log n)$ due to sorting.
  * **Space Complexity**: $O(n)$ to store the elements.

-----

### 2\. Two Heaps (Optimal)

This is the most efficient solution for streaming data. It maintains two heaps to split the data into two halves:

1.  **A Max-Heap (`small`)**: Stores the smaller half of the numbers. The root is the largest of the small numbers.
2.  **A Min-Heap (`large`)**: Stores the larger half of the numbers. The root is the smallest of the large numbers.

By keeping these two heaps balanced (size difference $\le 1$), the median is always accessible at the top of one (or both) heaps in $O(1)$ time. ✅

```javascript
/**
 * const { PriorityQueue, MaxPriorityQueue, MinPriorityQueue } = require('@datastructures-js/priority-queue');
 */
class MedianFinder {
    constructor() {
        // Max heap for the smaller half of numbers
        this.small = new PriorityQueue((a, b) => b - a); 
        // Min heap for the larger half of numbers
        this.large = new PriorityQueue((a, b) => a - b); 
    }

    /**
     * @param {number} num
     */
    addNum(num) {
        // 1. Add to appropriate heap
        if (this.large.isEmpty() || num > this.large.front()) {
            this.large.enqueue(num);
        } else {
            this.small.enqueue(num);
        }

        // 2. Balance the heaps (size difference must be <= 1)
        if (this.small.size() > this.large.size() + 1) {
            this.large.enqueue(this.small.dequeue());
        } else if (this.large.size() > this.small.size() + 1) {
            this.small.enqueue(this.large.dequeue());
        }
    }

    /**
     * @return {number}
     */
    findMedian() {
        // If heaps are uneven, the larger one has the median
        if (this.small.size() > this.large.size()) {
            return this.small.front();
        } else if (this.large.size() > this.small.size()) {
            return this.large.front();
        } else {
            // Even number of elements: average the roots
            return (this.small.front() + this.large.front()) / 2.0;
        }
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**:
      * `addNum()`: $O(\log n)$ for heap insertion and balancing.
      * `findMedian()`: $O(1)$ to peek at the roots.
  * **Space Complexity**: $O(n)$ to store elements in the heaps.

(Where $m$ is the number of function calls and $n$ is the length of the data stream.)