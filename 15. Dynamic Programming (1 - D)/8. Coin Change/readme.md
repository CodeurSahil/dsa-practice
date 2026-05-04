![Coin Change](/asset/images/CoinChange.png)
![Coin Change](/asset/images/CoinChange2.png)

---

### 1. Recursion (Brute Force)

**Intuition:**
For any given `amount`, we can try subtracting every available coin from it. This gives us a new, smaller amount to solve. We recursively find the minimum coins needed for the smaller amount and add 1 (for the coin we just used). We take the absolute minimum across all possible coin choices. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} coins
     * @param {number} amount
     * @return {number}
     */
    coinChange(coins, amount) {
        const dfs = (currAmount) => {
            // Base cases
            if (currAmount === 0) return 0;
            if (currAmount < 0) return Infinity; // Invalid path

            let minCoins = Infinity;
            
            // Try every coin
            for (const coin of coins) {
                const res = dfs(currAmount - coin);
                if (res !== Infinity) {
                    minCoins = Math.min(minCoins, 1 + res);
                }
            }
            return minCoins;
        };

        const result = dfs(amount);
        return result === Infinity ? -1 : result;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n^t)$ where $n$ is the number of coins and $t$ is the amount. The recursion tree grows exponentially, resulting in Time Limit Exceeded (TLE).
* **Space Complexity**: $O(t)$ for the recursion stack depth.

---

### 2. Dynamic Programming (Top-Down / Memoization)

**Intuition:**
The brute-force approach recalculates the same `currAmount` repeatedly. We can use a `memo` map (or array) to cache the minimum coins needed for any specific amount once we calculate it, drastically reducing the time complexity.

```javascript
class Solution {
    /**
     * @param {number[]} coins
     * @param {number} amount
     * @return {number}
     */
    coinChange(coins, amount) {
        // Cache to store the minimum coins for a specific amount
        const memo = new Map();

        const dfs = (currAmount) => {
            if (currAmount === 0) return 0;
            if (currAmount < 0) return Infinity;
            
            // Return cached result if we've seen this amount before
            if (memo.has(currAmount)) {
                return memo.get(currAmount);
            }

            let minCoins = Infinity;
            for (const coin of coins) {
                const res = dfs(currAmount - coin);
                if (res !== Infinity) {
                    minCoins = Math.min(minCoins, 1 + res);
                }
            }

            // Store the result before returning
            memo.set(currAmount, minCoins);
            return minCoins;
        };

        const result = dfs(amount);
        return result === Infinity ? -1 : result;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n \cdot t)$ where $n$ is the number of coins and $t$ is the target amount. We solve for each amount exactly once.
* **Space Complexity**: $O(t)$ for the memo cache and recursion stack.

---

### 3. Dynamic Programming (Bottom-Up)

**Intuition:**
Instead of starting from the target `amount` and recursing down to `0`, we can start at `0` and iteratively build up to the target `amount`. 
Let `dp[a]` be the minimum coins needed to make amount `a`. 
To find `dp[a]`, we look back at the previously solved subproblems: `dp[a - coin] + 1` for all available coins, and pick the minimum. ✅

```javascript
class Solution {
    /**
     * @param {number[]} coins
     * @param {number} amount
     * @return {number}
     */
    coinChange(coins, amount) {
        // Initialize DP array with a value larger than any possible answer (amount + 1)
        const dp = new Array(amount + 1).fill(amount + 1);
        
        // Base case: it takes 0 coins to make amount 0
        dp[0] = 0;

        // Build up the solutions from 1 to the target amount
        for (let a = 1; a <= amount; a++) {
            for (const coin of coins) {
                // If we can use this coin
                if (a - coin >= 0) {
                    dp[a] = Math.min(dp[a], 1 + dp[a - coin]);
                }
            }
        }

        // If dp[amount] is still (amount + 1), it means it's impossible to make that amount
        return dp[amount] === amount + 1 ? -1 : dp[amount];
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n \cdot t)$.
* **Space Complexity**: $O(t)$ for the DP array.

---

### 4. Breadth-First Search (BFS)

**Intuition:**
We can view this problem as finding the shortest path in an unweighted graph where nodes are "amounts" and edges are "using a coin". We start at `amount 0`. In the first step (level 1), we can reach amounts equal to our coin denominations. In the second step (level 2), we add coins to those amounts, and so on. The first time we reach the target `amount`, the current level number is our minimum number of coins.

```javascript
class Solution {
    /**
     * @param {number[]} coins
     * @param {number} amount
     * @return {number}
     */
    coinChange(coins, amount) {
        if (amount === 0) return 0;

        let q = [0]; // Queue initialized with starting amount 0
        const seen = new Array(amount + 1).fill(false);
        seen[0] = true;
        
        let steps = 0; // Represents the number of coins used

        while (q.length > 0) {
            steps++;
            const nextLevel = []; // Track the next layer of amounts
            
            for (const curr of q) {
                for (const coin of coins) {
                    const nxt = curr + coin;
                    
                    if (nxt === amount) {
                        return steps; // Found the shortest path
                    }
                    
                    if (nxt < amount && !seen[nxt]) {
                        seen[nxt] = true;
                        nextLevel.push(nxt);
                    }
                }
            }
            q = nextLevel; // Move to the next depth level
        }

        return -1; // Target amount was never reached
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n \cdot t)$. We visit each reachable amount at most once, trying $n$ coins from each.
* **Space Complexity**: $O(t)$ for the queue and the `seen` array.