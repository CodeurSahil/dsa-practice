![Koko Eating Bananas](/asset/images/FindMinimuminRotatedSortedArray.png)
![Koko Eating Bananas](/asset/images/FindMinimuminRotatedSortedArray.png)


Of course\! Here are the JavaScript solutions for finding the minimum element in a rotated sorted array, formatted for clarity.

A rotated sorted array is an array that was originally sorted in ascending order and has been rotated some number of times. The goal is to find the smallest element, which is the "pivot" point of the rotation.

-----

### 1\. Brute Force (Linear Scan)

This is the simplest solution. It **iterates through the entire array** to find the minimum value. This approach doesn't take advantage of the array's partially sorted nature. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findMin(nums) {
        return Math.min(...nums);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(1)$

-----

### 2\. Binary Search

This is the optimal approach. It uses **binary search** to efficiently narrow down the search space. The key is to compare the middle element with the left and right boundaries to decide which half of the array is sorted and which half contains the pivot (the minimum value). 🔍

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findMin(nums) {
        let l = 0;
        let r = nums.length - 1;
        let res = nums[0];

        while (l <= r) {
            // If the current window is already sorted, the leftmost element is the minimum
            if (nums[l] <= nums[r]) {
                res = Math.min(res, nums[l]);
                break;
            }

            let m = l + Math.floor((r - l) / 2);
            res = Math.min(res, nums[m]);
            
            // If the middle is part of the left sorted portion, search the right portion
            if (nums[m] >= nums[l]) {
                l = m + 1;
            } else { // Otherwise, search the left portion
                r = m - 1;
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(\log n)$
  * **Space Complexity**: $O(1)$

-----

### 3\. Binary Search (Lower Bound Variation)

This is a more concise and elegant binary search implementation. The logic compares the middle element with the rightmost element. If `nums[m]` is smaller than `nums[r]`, it means the minimum element must be in the left half (including `m`). Otherwise, it must be in the right half. The loop continues until `l` and `r` converge on the minimum element. ✅

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findMin(nums) {
        let l = 0,
            r = nums.length - 1;
            
        while (l < r) {
            let m = l + Math.floor((r - l) / 2);
            if (nums[m] < nums[r]) {
                // The minimum is in the left half, including mid
                r = m;
            } else {
                // The minimum is in the right half
                l = m + 1;
            }
        }
        return nums[l];
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(\log n)$
  * **Space Complexity**: $O(1)$