![Kth Largest Element in an Array](/asset/images/KthLargestElementinanArray.png)

-----

### 1\. Sorting (Brute Force)

This is the most intuitive approach. We sort the entire array in ascending order and then access the element at the index `length - k`. While simple to implement, it does more work than necessary by sorting the entire array. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    findKthLargest(nums, k) {
        nums.sort((a, b) => a - b);
        return nums[nums.length - k];
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \log n)$ due to the sorting algorithm.
  * **Space Complexity**: $O(1)$ or $O(n)$, depending on the specific sort implementation (e.g., Timsort stack).

-----

### 2\. Min-Heap

This approach is efficient for streaming data or when $k$ is much smaller than $n$. We maintain a **Min-Heap of size $k$**. We iterate through the array, adding numbers to the heap. If the heap size exceeds $k$, we remove the smallest element (the root). Eventually, the heap contains the $k$ largest elements, and the root is the smallest of them (the $k$-th largest overall). 📦

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    findKthLargest(nums, k) {
        // Assumes MinPriorityQueue is available in the environment
        const minHeap = new MinPriorityQueue();
        for (let num of nums) {
            minHeap.enqueue(num);
            if (minHeap.size() > k) {
                minHeap.dequeue();
            }
        }
        return minHeap.front().element; // .element accesses the value
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \log k)$. Each insertion/deletion takes $O(\log k)$.
  * **Space Complexity**: $O(k)$ to store the heap elements.

-----

### 3\. Quick Select (Recursive)

This is generally the preferred algorithm for this problem. It relies on the **partitioning logic** of QuickSort. Instead of recurring into both sides of the pivot, we only recurse into the side that contains the target index (`length - k`). This reduces the average complexity to linear time. ⚡

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    findKthLargest(nums, k) {
        // The target index in a sorted array
        k = nums.length - k;

        const quickSelect = (left, right) => {
            let pivot = nums[right];
            let p = left;

            for (let i = left; i < right; i++) {
                if (nums[i] <= pivot) {
                    [nums[p], nums[i]] = [nums[i], nums[p]];
                    p++;
                }
            }
            [nums[p], nums[right]] = [nums[right], nums[p]];

            if (p > k) {
                return quickSelect(left, p - 1);
            } else if (p < k) {
                return quickSelect(p + 1, right);
            } else {
                return nums[p];
            }
        };

        return quickSelect(0, nums.length - 1);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$ on average. $O(n^2)$ in the worst case (if the pivot is always the smallest/largest element).
  * **Space Complexity**: $O(n)$ due to recursion stack depth in the worst case.

-----

### 4\. Quick Select (Optimal Iterative)

This version optimizes Quick Select by using **iteration** (to save stack space) and a **"Median of 3" pivot selection strategy**. This strategy picks the pivot from the beginning, middle, and end of the array, significantly reducing the probability of hitting the $O(n^2)$ worst-case scenario that occurs with sorted or reverse-sorted inputs. ✅

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    findKthLargest(nums, k) {
        function partition(left, right) {
            const mid = (left + right) >> 1;
            // Median-of-3 pivot selection logic
            [nums[mid], nums[left + 1]] = [nums[left + 1], nums[mid]];

            if (nums[left] < nums[right])
                [nums[left], nums[right]] = [nums[right], nums[left]];
            if (nums[left + 1] < nums[right])
                [nums[left + 1], nums[right]] = [nums[right], nums[left + 1]];
            if (nums[left] < nums[left + 1])
                [nums[left], nums[left + 1]] = [nums[left + 1], nums[left]];

            const pivot = nums[left + 1];
            let i = left + 1;
            let j = right;

            // Hoare's partition scheme
            while (true) {
                while (nums[++i] > pivot);
                while (nums[--j] < pivot);
                if (i > j) break;
                [nums[i], nums[j]] = [nums[j], nums[i]];
            }

            nums[left + 1] = nums[j];
            nums[j] = pivot;
            return j;
        }

        function quickSelect(k) {
            let left = 0;
            let right = nums.length - 1;

            while (true) {
                if (right <= left + 1) {
                    if (right == left + 1 && nums[right] > nums[left])
                        [nums[left], nums[right]] = [nums[right], nums[left]];
                    return nums[k];
                }

                const j = partition(left, right);

                if (j >= k) right = j - 1;
                if (j <= k) left = j + 1;
            }
        }

        // We look for the index k-1 because the logic sorts descending or treats k as 1-based
        return quickSelect(k - 1);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$ on average.
  * **Space Complexity**: $O(1)$, as it is iterative and modifies the array in place.

-----