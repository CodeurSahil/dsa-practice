# 1. Contains Duplicate

![Contains Duplicate](/asset/images/ContainsDuplicate.png)

-----

### 1\. Brute Force

This method compares every element of the array with every other element. It's straightforward but **not very efficient** for large arrays. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    hasDuplicate(nums) {
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[i] === nums[j]) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

  * **Time Complexity**: $O(n^2)$
  * **Space Complexity**: $O(1)$

-----

### 2\. Sorting

This approach involves **sorting the array first**. If there are any duplicates, they will become adjacent, making them easy to find in a single pass. 📊

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    hasDuplicate(nums) {
        nums.sort((a, b) => a - b);
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] === nums[i - 1]) {
                return true;
            }
        }
        return false;
    }
}
```

  * **Time Complexity**: $O(n \\log n)$
  * **Space Complexity**: $O(1)$ or $O(n)$, depending on the sorting algorithm's implementation.

-----

### 3\. Hash Set

This method uses a `Set` to keep track of the numbers we've already seen. A `Set` only stores unique values, so we can check for duplicates in **constant time on average**. ✅

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    hasDuplicate(nums) {
        const seen = new Set();
        for (const num of nums) {
            if (seen.has(num)) {
                return true;
            }
            seen.add(num);
        }
        return false;
    }
}
```

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$

-----

### 4\. Hash Set Length

This is a more concise version of the Hash Set method. It leverages the property that a `Set` will automatically discard duplicates. If the size of the resulting `Set` is **smaller than the original array's length**, it means duplicates existed. ✨

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    hasDuplicate(nums) {
        return new Set(nums).size < nums.length;
    }
}
```

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$