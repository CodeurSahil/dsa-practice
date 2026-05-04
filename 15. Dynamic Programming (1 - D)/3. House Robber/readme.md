![House Robber](/asset/images/HouseRobber.png)
![House Robber](/asset/images/HouseRobber2.png)

---

### 1. Recursion (Brute Force)

**Intuition:**
At every house, you make a choice: skip it and move to the next house, or rob it and skip the next house. We explore both branches of this decision tree for every house and return the maximum value. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    rob(nums) {
        const dfs = (i) => {
            // Base case: out of bounds
            if (i >= nums.length) {
                return 0;
            }
            // Max of (Skipping current house, Robbing current house)
            return Math.max(
                dfs(i + 1), 
                nums[i] + dfs(i + 2)
            );
        };

        return dfs(0);
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(2^n)$. The recursion tree doubles at each step, leading to an exponential time complexity (will Time Limit Exceed).
* **Space Complexity**: $O(n)$ for the recursion call stack.

---

### 2. Dynamic Programming (Top-Down / Memoization)

**Intuition:**
The recursive approach calculates the same subproblems repeatedly. We can optimize this by caching the maximum money we can rob starting from house `i` in a `memo` array. If we visit house `i` again, we simply return the cached result.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    rob(nums) {
        const memo = new Array(nums.length).fill(-1);

        const dfs = (i) => {
            if (i >= nums.length) {
                return 0;
            }
            // Return cached result if it exists
            if (memo[i] !== -1) {
                return memo[i];
            }
            
            // Calculate and cache the result
            memo[i] = Math.max(
                dfs(i + 1), 
                nums[i] + dfs(i + 2)
            );
            return memo[i];
        };

        return dfs(0);
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$. Each house is processed exactly once.
* **Space Complexity**: $O(n)$ for the `memo` array and the recursion stack.

---

### 3. Dynamic Programming (Bottom-Up)

**Intuition:**
Instead of starting from the beginning and recursing, we can build the solution iteratively from the ground up. Let `dp[i]` represent the maximum money robbed up to house `i`. To find `dp[i]`, we look at the best outcome from the previous house (`dp[i-1]`) versus robbing the current house plus the best outcome from two houses ago (`nums[i] + dp[i-2]`).

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    rob(nums) {
        if (!nums || nums.length === 0) return 0;
        if (nums.length === 1) return nums[0];

        const dp = new Array(nums.length).fill(0);
        
        // Base cases
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);

        // Build the dp array iteratively
        for (let i = 2; i < nums.length; i++) {
            dp[i] = Math.max(
                dp[i - 1],               // Skip current house
                nums[i] + dp[i - 2]      // Rob current house
            );
        }

        return dp[nums.length - 1];
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$. A single pass through the array.
* **Space Complexity**: $O(n)$ for the `dp` array.

---

### 4. Dynamic Programming (Space Optimized)

**Intuition:**
Notice in the bottom-up approach that to calculate the current house, we *only* ever need the results from the previous two houses (`dp[i-1]` and `dp[i-2]`). We don't need to keep the entire `dp` array in memory. We can just use two variables (`rob1` and `rob2`) and slide them forward as we iterate. ✅

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    rob(nums) {
        let rob1 = 0; // Represents dp[i-2]
        let rob2 = 0; // Represents dp[i-1]

        for (const num of nums) {
            // temp is the max money we can rob up to the current house
            const temp = Math.max(rob1 + num, rob2);
            
            // Slide the window forward
            rob1 = rob2;
            rob2 = temp;
        }

        // rob2 will hold the maximum money robbed at the end
        return rob2;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$.
* **Space Complexity**: $O(1)$. Only a few variables are used, making this highly memory efficient.