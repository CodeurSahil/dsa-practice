![Min Cost Climbing Stairs](/asset/images/MinCostClimbingStairs.png)
![Min Cost Climbing Stairs](/asset/images/MinCostClimbingStairs2.png)



### 1. Recursion (Brute Force)

**Intuition:**
From any step $i$, you must pay `cost[i]` and then you have a choice: climb 1 step or climb 2 steps. The total cost from step $i$ is `cost[i]` plus the minimum of the costs from the paths ahead. Because you can start at step 0 or 1, you take the minimum of those two starting paths. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} cost
     * @return {number}
     */
    minCostClimbingStairs(cost) {
        const dfs = (i) => {
            // Base case: Reached the top (or overshot)
            if (i >= cost.length) {
                return 0;
            }
            // Pay current cost, then pick the cheapest path forward
            return cost[i] + Math.min(dfs(i + 1), dfs(i + 2));
        };

        // You can start from index 0 or index 1
        return Math.min(dfs(0), dfs(1));
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(2^n)$. The recursion tree grows exponentially, recalculating the same steps.
* **Space Complexity**: $O(n)$ for the recursion stack.

---

### 2. Dynamic Programming (Top-Down / Memoization)

**Intuition:**
We optimize the recursive approach by caching the minimum cost required to reach the top from a specific step `i`. Once we compute `dfs(i)`, we store it in a `memo` array so we never calculate it again.

```javascript
class Solution {
    /**
     * @param {number[]} cost
     * @return {number}
     */
    minCostClimbingStairs(cost) {
        const memo = new Array(cost.length).fill(-1);

        const dfs = (i) => {
            if (i >= cost.length) {
                return 0;
            }
            if (memo[i] !== -1) {
                return memo[i];
            }
            
            memo[i] = cost[i] + Math.min(dfs(i + 1), dfs(i + 2));
            return memo[i];
        };

        return Math.min(dfs(0), dfs(1));
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$. Each index is processed exactly once.
* **Space Complexity**: $O(n)$ for the memo array and recursion stack.

---

### 3. Dynamic Programming (Bottom-Up)

**Intuition:**
Instead of starting at the bottom and recursing upwards, we can build an array `dp` where `dp[i]` represents the absolute minimum cost to *arrive* at step `i`.
* You can arrive at step `i` from step `i-1` (meaning you paid `cost[i-1]`).
* Or you can arrive from step `i-2` (meaning you paid `cost[i-2]`).
We simply take the minimum of these two arrival routes.

```javascript
class Solution {
    /**
     * @param {number[]} cost
     * @return {number}
     */
    minCostClimbingStairs(cost) {
        const n = cost.length;
        // dp array of size n + 1 because we want to reach the "top" (index n)
        const dp = new Array(n + 1).fill(0);

        // dp[0] and dp[1] are 0 because we can start there for free
        for (let i = 2; i <= n; i++) {
            dp[i] = Math.min(
                dp[i - 1] + cost[i - 1], 
                dp[i - 2] + cost[i - 2]
            );
        }

        return dp[n];
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$.
* **Space Complexity**: $O(n)$ for the DP array.

---

### 4. Dynamic Programming (Space Optimized)

**Intuition:**
Notice that in the DP approaches, calculating the cost for step `i` *only* requires the values from `i+1` and `i+2` (or `i-1` and `i-2` depending on direction). We don't need a full array. 
We can iterate backward through the input `cost` array and modify it in-place. `cost[i]` will become "the cost of step `i` PLUS the cheapest path to the top from here". ✅

```javascript
class Solution {
    /**
     * @param {number[]} cost
     * @return {number}
     */
    minCostClimbingStairs(cost) {
        // Start from the 3rd to last step and work backwards
        for (let i = cost.length - 3; i >= 0; i--) {
            cost[i] += Math.min(cost[i + 1], cost[i + 2]);
        }

        // The answer is the cheapest starting point (0 or 1)
        return Math.min(cost[0], cost[1]);
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$.
* **Space Complexity**: $O(1)$ since we modify the input array in-place. *(Note: If modifying inputs is frowned upon in an interview, you can easily use two variables like `next1` and `next2` to achieve $O(1)$ space without mutation).*