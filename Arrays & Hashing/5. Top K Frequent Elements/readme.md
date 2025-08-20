# 5. Top K Frequent Elements

---

## 🧩 Problem Statement

![5. Top K Frequent Elements](/asset/images/topKFrequentElements.png)

-----

### 1\. Sorting

This approach first **counts the frequency** of each number using a hash map. Then, it converts the map into an array of `[frequency, number]` pairs, **sorts this array** in descending order based on frequency, and finally extracts the first `k` numbers. 📊

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    topKFrequent(nums, k) {
        const count = {};
        for (const num of nums) {
            count[num] = (count[num] || 0) + 1;
        }

        const arr = Object.entries(count).map(([num, freq]) => [
            freq,
            parseInt(num),
        ]);
        arr.sort((a, b) => b[0] - a[0]);

        return arr.slice(0, k).map((pair) => pair[1]);
    }
}
```

  * **Time Complexity**: $O(n \\log n)$, dominated by the sorting step.
  * **Space Complexity**: $O(n)$, to store the frequency map and the array of pairs.

-----

### 2\. Min-Heap

A more optimized approach involves counting frequencies and then using a **min-heap of size k**. We iterate through the unique numbers; for each number, we add it to the heap. If the heap's size exceeds `k`, we remove the element with the smallest frequency. This ensures the heap always contains the top `k` most frequent elements seen so far. 🏆

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    topKFrequent(nums, k) {
        const count = {};
        for (const num of nums) {
            count[num] = (count[num] || 0) + 1;
        }

        // Assumes a MinPriorityQueue implementation is available
        const heap = new MinPriorityQueue({ priority: (x) => x[1] });
        for (const [num, cnt] of Object.entries(count)) {
            heap.enqueue([num, cnt]);
            if (heap.size() > k) {
                heap.dequeue();
            }
        }

        const res = [];
        while (!heap.isEmpty()) {
            res.push(heap.dequeue().element[0]);
        }
        return res;
    }
}
```

  * **Time Complexity**: $O(n \\log k)$, where we process $n$ elements, and each heap operation takes $\\log k$ time.
  * **Space Complexity**: $O(n+k)$, for the frequency map and the heap.

(Where $n$ is the length of the array and $k$ is the number of top frequent elements.)

-----

### 3\. Bucket Sort

This is a very clever, non-comparison-based approach that achieves linear time complexity. We use an array of arrays (buckets), where the **index of each bucket represents a frequency**. After counting, we place each number into the bucket corresponding to its frequency. Finally, we iterate backward from the last bucket to collect the top `k` elements. 🧺

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    topKFrequent(nums, k) {
        const count = {};
        const freq = Array.from({ length: nums.length + 1 }, () => []);

        for (const n of nums) {
            count[n] = (count[n] || 0) + 1;
        }
        for (const n in count) {
            freq[count[n]].push(parseInt(n));
        }

        const res = [];
        for (let i = freq.length - 1; i > 0; i--) {
            for (const n of freq[i]) {
                res.push(n);
                if (res.length === k) {
                    return res;
                }
            }
        }
    }
}
```

  * **Time Complexity**: $O(n)$, as we iterate through the numbers and buckets a constant number of times.
  * **Space Complexity**: $O(n)$, for the frequency map and the buckets array.