![Binary Search](/asset/images/binarySearch.png)

### 1\. Recursive Binary Search

This approach implements the "divide and conquer" strategy by calling itself on smaller and smaller sub-arrays. The function's state (like the left and right boundaries) is managed on the **call stack**. 🌳

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    binary_search(l, r, nums, target) {
        if (l > r) return -1;
        let m = l + Math.floor((r - l) / 2);

        if (nums[m] === target) return m;
        return nums[m] < target
            ? this.binary_search(m + 1, r, nums, target)
            : this.binary_search(l, m - 1, nums, target);
    }

    search(nums, target) {
        return this.binary_search(0, nums.length - 1, nums, target);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(\log n)$
  * **Space Complexity**: $O(\log n)$ due to the recursion call stack depth.

-----

### 2\. Iterative Binary Search

This is the most common and space-efficient implementation. It uses a `while` loop and two pointers (`l` and `r`) to manage the search interval, completely avoiding the overhead of recursion. ✅

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

        while (l <= r) {
            const m = l + Math.floor((r - l) / 2);
            if (nums[m] > target) {
                r = m - 1;
            } else if (nums[m] < target) {
                l = m + 1;
            } else {
                return m;
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

### 3\. Upper Bound Variation

This is a modified binary search that finds the index of the **first element strictly greater than the target**. After the loop, it checks if the element just before the result is the target. This is useful for problems involving ranges.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        let l = 0,
            r = nums.length;

        while (l < r) {
            let m = l + Math.floor((r - l) / 2);
            if (nums[m] > target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        // l is the upper bound. Check if the element before it is the target.
        return l > 0 && nums[l - 1] === target ? l - 1 : -1;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(\log n)$
  * **Space Complexity**: $O(1)$

-----

### 4\. Lower Bound Variation

This variation finds the index of the **first element greater than or equal to the target**. It's a common building block in many algorithms. After the loop, it verifies if the element at the resulting index is indeed the target.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        let l = 0,
            r = nums.length;

        while (l < r) {
            let m = l + Math.floor((r - l) / 2);
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        // l is the lower bound. Check if it's our target.
        return l < nums.length && nums[l] === target ? l : -1;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(\log n)$
  * **Space Complexity**: $O(1)$

-----

### 5\. Built-In Function

JavaScript's `Array.prototype.indexOf()` can find an element's index, but it performs a **linear scan** from the beginning of the array. It does not take advantage of a sorted array and is therefore much less efficient than a true binary search for this task. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        return nums.indexOf(target);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(1)$