![Find the Duplicate Number](/asset/images/FindtheDuplicateNumber.png)
![Find the Duplicate Number](/asset/images/FindtheDuplicateNumber2.png)
![Find the Duplicate Number](/asset/images/FindtheDuplicateNumber3.png)

-----

### 1\. Sorting

This method sorts the array first. If there's a duplicate, the identical numbers will become adjacent, allowing for a single pass to find them. 📊

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findDuplicate(nums) {
        nums.sort((a, b) => a - b);
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i] === nums[i + 1]) {
                return nums[i];
            }
        }
        return -1;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n \log n)$
  * **Space complexity**: $O(1)$ or $O(n)$, depending on the sorting algorithm.

-----

### 2\. Hash Set

This approach uses a `Set` to keep track of numbers we've already seen. If we try to add a number that's already in the set, we've found the duplicate. 🗺️

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findDuplicate(nums) {
        let seen = new Set();
        for (let num of nums) {
            if (seen.has(num)) {
                return num;
            }
            seen.add(num);
        }
        return -1;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$

-----

### 3\. Array (as a Frequency Counter)

This method uses an auxiliary array as a frequency counter. Since the numbers are from 1 to $n$, we can use the number itself (minus 1) as the index.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findDuplicate(nums) {
        let seen = new Array(nums.length).fill(0);
        for (let num of nums) {
            if (seen[num - 1]) {
                return num;
            }
            seen[num - 1] = 1;
        }
        return -1;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$

-----

### 4\. Negative Marking (In-place)

A clever, in-place method that uses the array itself for tracking. It treats the value `num` as an index (`idx = abs(num) - 1`) and marks the number at that index as negative. If it encounters a number that's already negative, it knows the *index* (plus 1) is the duplicate. 💡

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findDuplicate(nums) {
        for (let num of nums) {
            let idx = Math.abs(num) - 1;
            if (nums[idx] < 0) {
                return Math.abs(num);
            }
            nums[idx] *= -1;
        }
        return -1;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(1)$

-----

### 5\. Binary Search (Pigeonhole Principle)

This advanced method performs a binary search on the *range of numbers* (1 to $n$), not the array itself. For a given `mid`, it counts how many numbers in the array are less than or equal to `mid`. If this count is greater than `mid`, the duplicate must be in the range `[low, mid]`. 🔍

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findDuplicate(nums) {
        let n = nums.length;
        let low = 1,
            high = n - 1;

        while (low < high) {
            let mid = Math.floor(low + (high - low) / 2);
            let lessOrEqual = 0;

            for (let i = 0; i < n; i++) {
                if (nums[i] <= mid) {
                    lessOrEqual++;
                }
            }

            if (lessOrEqual <= mid) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n \log n)$
  * **Space complexity**: $O(1)$

-----

### 6\. Bit Manipulation

This method counts the set bits for each bit position (0 to 31) for all numbers in `nums` (`x`) and compares this to the count for all numbers from 1 to $n$ (`y`). If `x > y` for a bit, the duplicate number must have that bit set.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findDuplicate(nums) {
        let n = nums.length;
        let res = 0;
        for (let b = 0; b < 32; b++) {
            let x = 0,
                y = 0;
            let mask = 1 << b;
            for (let num of nums) {
                if (num & mask) {
                    x++;
                }
            }
            for (let num = 1; num < n; num++) {
                if (num & mask) {
                    y++;
                }
            }
            if (x > y) {
                res |= mask;
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(32 \cdot n)$ or $O(n)$
  * **Space complexity**: $O(1)$

-----

### 7\. Fast And Slow Pointers (Cycle Detection)

This optimal solution treats the array as a linked list (where the value `nums[i]` is an index to the next node). Since there's a duplicate, there must be a cycle. It uses Floyd's Tortoise and Hare algorithm to find the cycle, and then a second set of pointers to find the *entrance* to the cycle, which is the duplicate number. 🐢🐇

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findDuplicate(nums) {
        let slow = 0;
        let fast = 0;
        while (true) {
            slow = nums[slow];
            fast = nums[nums[fast]];
            if (slow === fast) {
                break;
            }
        }

        let slow2 = 0;
        while (true) {
            slow = nums[slow];
            slow2 = nums[slow2];
            if (slow === slow2) {
                return slow;
            }
        }
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(1)$