![House Robber II](/asset/images/HouseRobberII.png)
![House Robber II](/asset/images/HouseRobberII2.png)

---

### 1. Recursion (Brute Force)

**Intuition:**
We use a boolean flag to track if we robbed the very first house. If we did, and we eventually reach the very last house, we are forced to return 0 for that last house. We run this recursive search starting from house 0 (flag = true) and starting from house 1 (flag = false) and take the maximum.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    rob(nums) {
        if (nums.length === 1) return nums[0];

        const dfs = (i, firstHouseRobbed) => {
            // Out of bounds
            if (i >= nums.length) return 0;
            
            // If we are at the last house AND we robbed the first house, we can't rob this one.
            if (firstHouseRobbed && i === nums.length - 1) return 0;

            // Option 1: Skip current house
            const skip = dfs(i + 1, firstHouseRobbed);
            
            // Option 2: Rob current house
            // We set flag to true if we are currently robbing house 0, otherwise carry the flag forward
            const rob = nums[i] + dfs(i + 2, firstHouseRobbed || (i === 0));

            return Math.max(skip, rob);
        };

        // Max of (Start at 0, Start at 1)
        return Math.max(dfs(0, true), dfs(1, false));
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(2^n)$. The recursion tree doubles at each step. Will Time Limit Exceed.
* **Space Complexity**: $O(n)$ for the recursion stack.

---

### 2. Dynamic Programming (Top-Down / Memoization)

**Intuition:**
We optimize the recursive approach by caching the results. Because our state depends on both the `index` and the `firstHouseRobbed` boolean, our cache needs to be 2-dimensional: `memo[index][flag]`.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    rob(nums) {
        if (nums.length === 1) return nums[0];

        // memo[index][0/1] where 1 means first house was robbed, 0 means it wasn't
        const memo = Array.from({ length: nums.length }, () => [-1, -1]);

        const dfs = (i, firstHouseRobbed) => {
            if (i >= nums.length) return 0;
            if (firstHouseRobbed && i === nums.length - 1) return 0;

            const flagIndex = firstHouseRobbed ? 1 : 0;
            if (memo[i][flagIndex] !== -1) {
                return memo[i][flagIndex];
            }

            const skip = dfs(i + 1, firstHouseRobbed);
            const rob = nums[i] + dfs(i + 2, firstHouseRobbed || (i === 0));

            memo[i][flagIndex] = Math.max(skip, rob);
            return memo[i][flagIndex];
        };

        return Math.max(dfs(0, true), dfs(1, false));
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$.
* **Space Complexity**: $O(n)$ for the 2D memo array and recursion stack.

---

### 3. Dynamic Programming (Bottom-Up)

**Intuition:**
Instead of a complex 2D state, we can write a simple helper function that solves the linear House Robber I problem. Then, we simply call this helper function twice: once passing an array slice excluding the last element, and once passing a slice excluding the first element.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    rob(nums) {
        if (nums.length === 1) return nums[0];

        const helper = (arr) => {
            if (arr.length === 0) return 0;
            if (arr.length === 1) return arr[0];

            const dp = new Array(arr.length).fill(0);
            dp[0] = arr[0];
            dp[1] = Math.max(arr[0], arr[1]);

            for (let i = 2; i < arr.length; i++) {
                dp[i] = Math.max(dp[i - 1], arr[i] + dp[i - 2]);
            }
            return dp[arr.length - 1];
        };

        // Max of (excluding last house, excluding first house)
        return Math.max(
            helper(nums.slice(0, nums.length - 1)),
            helper(nums.slice(1))
        );
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$. We iterate through the array roughly twice.
* **Space Complexity**: $O(n)$ for the `dp` arrays and the array slices.

---

### 4. Dynamic Programming (Space Optimized)

**Intuition:**
We take the clean logic from the bottom-up approach and optimize the `helper` function. The helper function only needs to remember the best results from the previous two houses (`rob1` and `rob2`), bringing the space complexity down to $O(1)$. ✅

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    rob(nums) {
        if (nums.length === 0) return 0;
        if (nums.length === 1) return nums[0]; // Special case: only 1 house, you can rob it safely.

        // Standard linear House Robber logic
        const helper = (start, end) => {
            let rob1 = 0; // Represents dp[i-2]
            let rob2 = 0; // Represents dp[i-1]

            for (let i = start; i <= end; i++) {
                const temp = Math.max(rob1 + nums[i], rob2);
                rob1 = rob2;
                rob2 = temp;
            }
            return rob2;
        };

        // Note: We use start/end indices to avoid creating new array slices in memory
        const robFirstToSecondToLast = helper(0, nums.length - 2);
        const robSecondToLast = helper(1, nums.length - 1);

        return Math.max(robFirstToSecondToLast, robSecondToLast);
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$.
* **Space Complexity**: $O(1)$. No arrays are created during the logic.