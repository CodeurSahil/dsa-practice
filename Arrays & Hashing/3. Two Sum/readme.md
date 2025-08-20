# Two Sum - Problem Statement and Solution Approaches

## 🧩 Problem Statement
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to the target.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

### 📌 Example
```
Input: nums = [2, 7, 11, 15], target = 9  
Output: [0, 1]  
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

-----

## Approaches 

### 1\. Brute Force

This is the most straightforward approach. It uses **nested loops** to check every possible pair of numbers in the array to see if they add up to the target. It's easy to understand but inefficient for large datasets. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums, target) {
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] === target) {
                    return [i, j];
                }
            }
        }
        return [];
    }
}
```

  * **Time Complexity**: $O(n^2)$
  * **Space Complexity**: $O(1)$

-----

### 2\. Sorting (Two Pointers)

This method first **sorts a copy of the array** (while keeping track of the original indices) and then uses two pointers—one at the beginning and one at the end—to efficiently find the pair. The pointers move inwards based on whether their sum is too small or too large. ↔️

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums, target) {
        let A = [];
        for (let i = 0; i < nums.length; i++) {
            A.push([nums[i], i]);
        }

        A.sort((a, b) => a[0] - b[0]);

        let i = 0,
            j = nums.length - 1;
        while (i < j) {
            let cur = A[i][0] + A[j][0];
            if (cur === target) {
                return [A[i][1], A[j][1]];
            } else if (cur < target) {
                i++;
            } else {
                j--;
            }
        }
        return [];
    }
}
```

  * **Time Complexity**: $O(n \\log n)$ (dominated by the sorting step)
  * **Space Complexity**: $O(n)$ (to store the array of pairs)

-----

### 3\. Hash Map (Two Pass)

This approach uses a hash map to trade space for time. In the **first pass**, it populates a map with numbers and their indices. In the **second pass**, it iterates through the array again, checking if the required complement (`target - current_number`) exists in the map. 🗺️

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums, target) {
        const indices = {}; // val -> index

        for (let i = 0; i < nums.length; i++) {
            indices[nums[i]] = i;
        }

        for (let i = 0; i < nums.length; i++) {
            let diff = target - nums[i];
            if (indices[diff] !== undefined && indices[diff] !== i) {
                return [i, indices[diff]];
            }
        }

        return [];
    }
}
```

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$

-----

### 4\. Hash Map (One Pass)

This is the most optimal solution. It iterates through the array just **once**. For each element, it first checks if its complement already exists in the map. If it does, we have a solution. If not, it adds the current element and its index to the map for future checks. This avoids the need for a second pass. 🚀

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums, target) {
        const prevMap = new Map();

        for (let i = 0; i < nums.length; i++) {
            const diff = target - nums[i];
            if (prevMap.has(diff)) {
                return [prevMap.get(diff), i];
            }

            prevMap.set(nums[i], i);
        }

        return [];
    }
}
```

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$

## ✅ Final Tips
- The hash map approach is the most efficient for unsorted arrays.
- The two-pointer technique only works when the array is sorted **or** if you’re allowed to sort it.
- Brute force is useful to understand the core problem logic before optimizing.
