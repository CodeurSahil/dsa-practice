![productofArrayExceptSelf](/asset/images/productofArrayExceptSelf.png)

### 1\. Brute Force

This method iterates through each number in the input array. For every number, it **repeatedly checks for the next consecutive integer** (`num + 1`, `num + 2`, etc.) in a hash set to determine the length of the sequence starting from that number. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    longestConsecutive(nums) {
        let res = 0;
        const store = new Set(nums);

        for (let num of nums) {
            let streak = 0,
                curr = num;
            while (store.has(curr)) {
                streak++;
                curr++;
            }
            res = Math.max(res, streak);
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$ in the worst case (e.g., an array like `[1, 2, 3, 4, 5]`).
  * **Space Complexity**: $O(n)$ for the set.

-----

### 2\. Sorting

A more efficient approach is to **sort the array first**. This places all consecutive numbers adjacent to each other. A single pass through the sorted array is then enough to find the longest streak. 📊

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    longestConsecutive(nums) {
        if (nums.length === 0) {
            return 0;
        }
        nums.sort((a, b) => a - b);

        let longestStreak = 1;
        let currentStreak = 1;

        for (let i = 1; i < nums.length; i++) {
            if (nums[i] !== nums[i - 1]) { // Handle duplicates
                if (nums[i] === nums[i - 1] + 1) {
                    currentStreak += 1;
                } else {
                    longestStreak = Math.max(longestStreak, currentStreak);
                    currentStreak = 1;
                }
            }
        }
        return Math.max(longestStreak, currentStreak);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \\log n)$ due to the sorting step.
  * **Space Complexity**: $O(1)$ or $O(n)$ depending on the sorting algorithm's implementation.

-----

### 3\. Hash Set (Optimal)

This is a clever solution that achieves linear time. It uses a hash set for fast lookups but adds a crucial optimization: it only starts counting a sequence when it finds the **true start of a sequence**. A number `num` is a start if `num - 1` is not in the set. This ensures that each number is visited at most twice, leading to an overall linear time complexity. ✅

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    longestConsecutive(nums) {
        const numSet = new Set(nums);
        let longest = 0;

        for (let num of numSet) {
            // Only start counting if 'num' is the beginning of a sequence
            if (!numSet.has(num - 1)) {
                let length = 1;
                while (numSet.has(num + length)) {
                    length++;
                }
                longest = Math.max(longest, length);
            }
        }
        return longest;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$

-----

### 4\. Hash Map (Boundary Merging)

This approach uses a hash map to store the length of the consecutive sequence that a number belongs to. When processing a new number `num`, it checks if `num-1` and `num+1` exist. If they do, it **merges the sequences** by calculating the new total length and updating the length value only at the two new boundaries of the combined sequence. 🔗

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    longestConsecutive(nums) {
        const mp = new Map();
        let res = 0;

        for (let num of nums) {
            if (!mp.has(num)) {
                const left = mp.get(num - 1) || 0;
                const right = mp.get(num + 1) || 0;
                const totalLength = left + right + 1;

                mp.set(num, totalLength);
                res = Math.max(res, totalLength);

                // Update boundaries of the new sequence
                mp.set(num - left, totalLength);
                mp.set(num + right, totalLength);
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$