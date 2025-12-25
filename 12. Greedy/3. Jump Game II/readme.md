![Jump Game II](/asset/images/JumpGameII.png)
![Jump Game II](/asset/images/JumpGameII2.png)

-----

### 1\. Recursion (Brute Force)

This method explores every possible jump from the current position. If we are at index `i`, we try jumping to `i+1`, `i+2`, etc., up to `i + nums[i]`. We recursively solve for those new positions and take the minimum + 1. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    jump(nums) {
        const dfs = (i) => {
            // Base case: Reached the end
            if (i >= nums.length - 1) {
                return 0;
            }
            // Cannot jump from here (dead end)
            if (nums[i] === 0) return 1000000; // Return arbitrary large number
            
            let res = 1000000;
            const end = Math.min(nums.length - 1, i + nums[i]);
            
            // Try all reachable jumps
            for (let j = i + 1; j <= end; j++) {
                res = Math.min(res, 1 + dfs(j));
            }
            return res;
        };

        return dfs(0);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n!)$ (Exponential).
  * **Space Complexity**: $O(n)$ for recursion stack.

-----

### 2\. Dynamic Programming (Top-Down / Memoization)

This optimizes the recursive approach by caching the minimum jumps needed from index `i`. If we encounter index `i` again, we return the stored result instantly.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    jump(nums) {
        const memo = new Map();
        
        const dfs = (i) => {
            if (memo.has(i)) {
                return memo.get(i);
            }
            if (i >= nums.length - 1) {
                return 0;
            }
            if (nums[i] === 0) {
                return 1000000;
            }
            
            let res = 1000000;
            const end = Math.min(nums.length - 1, i + nums[i]);
            
            for (let j = i + 1; j <= end; j++) {
                res = Math.min(res, 1 + dfs(j));
            }
            
            memo.set(i, res);
            return res;
        };

        return dfs(0);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$. Each state is computed once, but computing a state takes up to $O(n)$ work (the loop).
  * **Space Complexity**: $O(n)$ for the map and recursion stack.

-----

### 3\. Dynamic Programming (Bottom-Up)

We build a table `dp` where `dp[i]` is the minimum jumps to reach the end from index `i`. We fill it backwards from the last element (which needs 0 jumps).

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    jump(nums) {
        const n = nums.length;
        // Initialize with a value larger than any possible path (infinity)
        const dp = new Array(n).fill(1000000); 
        dp[n - 1] = 0;

        for (let i = n - 2; i >= 0; i--) {
            const end = Math.min(n, i + nums[i] + 1);
            for (let j = i + 1; j < end; j++) {
                dp[i] = Math.min(dp[i], 1 + dp[j]);
            }
        }
        return dp[0];
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$ due to nested loops.
  * **Space Complexity**: $O(n)$ for the DP array.

-----

### 4\. Breadth First Search (Greedy / Optimal)

This is the most efficient solution, often called **Implicit BFS**.
Instead of using a queue, we process the array in "windows" (or levels).

  * Level 0: Index `0` (reachable in 0 jumps).
  * Level 1: All indices reachable from Level 0 (reachable in 1 jump).
  * Level 2: All indices reachable from Level 1...

We maintain a range `[l, r]` which represents the current level. We iterate through this range to find the `farthest` point reachable in the *next* jump. Then, we update our range to `[r + 1, farthest]`. ✅

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    jump(nums) {
        let res = 0;
        let l = 0,
            r = 0;

        // While our current range [l, r] does not reach the end
        while (r < nums.length - 1) {
            let farthest = 0;
            // Iterate through the current level to find max reach
            for (let i = l; i <= r; i++) {
                farthest = Math.max(farthest, i + nums[i]);
            }
            // Move the window to the next level
            l = r + 1;
            r = farthest;
            res++;
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$. We visit each element at most once.
  * **Space Complexity**: $O(1)$. No extra structures are used.