![Jump Game](/asset/images/JumpGame.png)

-----

### 1\. Recursion (Brute Force)

This is the naive approach. From the current index `i`, it tries every possible jump length (from 1 to `nums[i]`) recursively. If any of those jumps eventually reach the last index, it returns `true`. This explores every single path, leading to exponential time complexity. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    canJump(nums) {
        const dfs = (i) => {
            // Base case: Reached the last index
            if (i === nums.length - 1) {
                return true;
            }
            // Try all possible jumps from current position
            const end = Math.min(nums.length - 1, i + nums[i]);
            for (let j = i + 1; j <= end; j++) {
                if (dfs(j)) {
                    return true;
                }
            }
            return false;
        };

        return dfs(0);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n!)$ (or effectively exponential $O(k^n)$ where $k$ is max jump length).
  * **Space Complexity**: $O(n)$ for the recursion stack.

-----

### 2\. Dynamic Programming (Top-Down / Memoization)

This optimizes the recursive solution by storing results. If we land on an index `i` that we have already checked and found to be a "dead end" (cannot reach the last index), we instantly return `false` from our `memo` map instead of re-calculating.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    canJump(nums) {
        const memo = new Map();
        
        const dfs = (i) => {
            if (memo.has(i)) {
                return memo.get(i);
            }
            if (i == nums.length - 1) {
                return true;
            }
            if (nums[i] === 0) {
                return false;
            }
            
            const end = Math.min(nums.length - 1, i + nums[i]);
            for (let j = i + 1; j <= end; j++) {
                if (dfs(j)) {
                    memo.set(i, true);
                    return true;
                }
            }
            memo.set(i, false);
            return false;
        };

        return dfs(0);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$. Each index is computed once, but the inner loop can run up to $n$ times.
  * **Space Complexity**: $O(n)$ for the map and recursion stack.

-----

### 3\. Dynamic Programming (Bottom-Up)

This iterative approach eliminates the recursion stack. We initialize a `dp` array where `dp[i]` is true if we can reach the end from index `i`. We iterate backwards from the end of the array to the start, filling in the table.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    canJump(nums) {
        const n = nums.length;
        const dp = new Array(n).fill(false);
        dp[n - 1] = true; // The last index can definitely reach itself

        for (let i = n - 2; i >= 0; i--) {
            const end = Math.min(nums.length, i + nums[i] + 1);
            for (let j = i + 1; j < end; j++) {
                if (dp[j]) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[0];
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$ due to the nested loops.
  * **Space Complexity**: $O(n)$ for the DP array.

-----

### 4\. Greedy (Optimal)

This is the most efficient solution. We work **backwards** from the last index. We maintain a variable `goal`, which represents the nearest index we need to reach to win (initially the last index).

  * If we are at index `i` and can jump far enough to reach `goal` (i.e., `i + nums[i] >= goal`), then we know that from `i`, we are safe.
  * Therefore, `i` becomes the new `goal`.
  * If the `goal` reaches `0` by the end of the loop, it means we can start at 0 and reach the end. ✅

<!-- end list -->

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    canJump(nums) {
        let goal = nums.length - 1;

        for (let i = nums.length - 2; i >= 0; i--) {
            // Can we reach the current goal from index i?
            if (i + nums[i] >= goal) {
                // Yes, so index i is the new safe target
                goal = i;
            }
        }

        return goal === 0;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$. We iterate through the array once.
  * **Space Complexity**: $O(1)$. No extra space required.

-----
