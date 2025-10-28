![Search a 2D Matrix](/asset/images/SearchinRotatedSortedArray.png)
![Search a 2D Matrix](/asset/images/SearchinRotatedSortedArray2.png)

### 1\. Brute Force (Linear Scan)

This is the simplest method. It **linearly scans the entire array** from beginning to end, checking each element. It does not use the fact that the array is *rotated sorted*. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                return i;
            }
        }
        return -1;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(1)$

-----

### 2\. Binary Search (Find Pivot, Search Both Halves)

This method first uses a modified binary search to **find the pivot point** (the smallest element, which is the start of the sorted sequence). Then, it performs a standard binary search on the left sorted portion and another on the right sorted portion.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        let l = 0;
        let r = nums.length - 1;

        // 1. Find the pivot
        while (l < r) {
            const m = Math.floor((l + r) / 2);
            if (nums[m] > nums[r]) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        const pivot = l;

        // 2. Search left half
        const result = this.binarySearch(nums, target, 0, pivot - 1);
        if (result !== -1) {
            return result;
        }

        // 3. Search right half
        return this.binarySearch(nums, target, pivot, nums.length - 1);
    }

    /**
     * @param {number[]} nums
     * @param {number} target
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    binarySearch(nums, target, left, right) {
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(\log n)$
  * **Space Complexity**: $O(1)$

-----

### 3\. Binary Search (Two Pass)

This is a more optimized two-pass approach. First, it **finds the pivot**. Second, it determines **which of the two sorted sub-arrays** the target *must* be in, and then performs just one standard binary search on that specific sub-array. 🎯

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        let l = 0,
            r = nums.length - 1;

        // 1. Find the pivot
        while (l < r) {
            let m = Math.floor((l + r) / 2);
            if (nums[m] > nums[r]) {
                l = m + 1;
            } else {
                r = m;
            }
        }

        let pivot = l;
        l = 0;
        r = nums.length - 1;

        // 2. Determine which half to search
        if (target >= nums[pivot] && target <= nums[r]) {
            l = pivot;
        } else {
            r = pivot - 1;
        }

        // 3. Standard binary search on that half
        while (l <= r) {
            let m = Math.floor((l + r) / 2);
            if (nums[m] === target) {
                return m;
            } else if (nums[m] < target) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        return -1;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(\log n)$
  * **Space Complexity**: $O(1)$

-----

### 4\. Binary Search (One Pass)

This is the most optimal solution. It performs a **single, modified binary search**. At each step, it checks if the target is the midpoint. If not, it determines which half (left or right) is sorted and then checks if the target lies within that sorted half to intelligently narrow the search window. ✅

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        let l = 0,
            r = nums.length - 1;

        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (target === nums[mid]) {
                return mid;
            }

            // Check if the left half is sorted
            if (nums[l] <= nums[mid]) {
                if (target > nums[mid] || target < nums[l]) {
                    l = mid + 1; // Target is in the unsorted right half
                } else {
                    r = mid - 1; // Target is in the sorted left half
                }
            } else { // Right half must be sorted
                if (target < nums[mid] || target > nums[r]) {
                    r = mid - 1; // Target is in the unsorted left half
                } else {
                    l = mid + 1; // Target is in the sorted right half
                }
            }
        }
        return -1;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(\log n)$
  * **Space Complexity**: $O(1)$