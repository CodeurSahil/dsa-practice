![Decode Ways](/asset/images/DecodeWays.png)
![Decode Ways](/asset/images/DecodeWays2.png)
![Decode Ways](/asset/images/DecodeWays3.png)

---

### 1. Recursion (Brute Force)

**Intuition:**
At every index `i`, we look at the characters ahead to see what valid decodings we can make.
* We can always decode a single digit as long as it's not `'0'`.
* We can decode two digits together if they form a number between `10` and `26`.
We branch our recursion for every valid choice and sum up all the successful paths that reach the end of the string. 🐢

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    numDecodings(s) {
        const dfs = (i) => {
            // Base case: successfully reached the end of the string
            if (i === s.length) return 1;
            
            // Base case: leading zero is invalid for both 1-digit and 2-digit decoding
            if (s[i] === '0') return 0;

            // Option 1: Take 1 digit
            let res = dfs(i + 1);

            // Option 2: Take 2 digits (must be between 10 and 26)
            if (i + 1 < s.length) {
                if (s[i] === '1' || (s[i] === '2' && s[i + 1] <= '6')) {
                    res += dfs(i + 2);
                }
            }

            return res;
        };

        return dfs(0);
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(2^n)$. The recursion tree splits into two branches at nearly every step, leading to exponential time complexity.
* **Space Complexity**: $O(n)$ for the recursion stack.

---

### 2. Dynamic Programming (Top-Down / Memoization)

**Intuition:**
Because the recursive approach recalculates the number of ways to decode the same substring `s[i:]` over and over, we can cache the result for each index `i`. If we reach an index we've already solved, we return the cached answer.

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    numDecodings(s) {
        // Cache to store the number of ways to decode starting at index i
        const memo = new Map();

        const dfs = (i) => {
            if (i === s.length) return 1;
            if (s[i] === '0') return 0;
            if (memo.has(i)) return memo.get(i);

            let res = dfs(i + 1);

            if (i + 1 < s.length && (s[i] === '1' || (s[i] === '2' && s[i + 1] <= '6'))) {
                res += dfs(i + 2);
            }

            memo.set(i, res);
            return res;
        };

        return dfs(0);
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$. We only solve for each index once.
* **Space Complexity**: $O(n)$ for the `memo` Map and recursion stack.

---

### 3. Dynamic Programming (Bottom-Up)

**Intuition:**
Instead of starting from the beginning and recursing, we start from the back of the string and build our way to the front. We define an array `dp` where `dp[i]` is the number of ways to decode the substring starting at index `i`.

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    numDecodings(s) {
        const n = s.length;
        // dp[i] represents the number of ways to decode s[i..n]
        const dp = new Array(n + 1).fill(0);
        
        // Base case: 1 way to decode an empty string
        dp[n] = 1;

        for (let i = n - 1; i >= 0; i--) {
            if (s[i] === '0') {
                dp[i] = 0; // Invalid
            } else {
                // Take 1 digit
                dp[i] = dp[i + 1];

                // Take 2 digits if valid
                if (i + 1 < n && (s[i] === '1' || (s[i] === '2' && s[i + 1] <= '6'))) {
                    dp[i] += dp[i + 2];
                }
            }
        }

        return dp[0];
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$.
* **Space Complexity**: $O(n)$ for the `dp` array.

---

### 4. Dynamic Programming (Space Optimized)

**Intuition:**
Notice how calculating `dp[i]` only ever requires `dp[i + 1]` and `dp[i + 2]`. We don't need to keep an array of size $n$. We can just maintain two variables tracking the next two values as we iterate backward. ✅

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    numDecodings(s) {
        const n = s.length;
        
        let dp1 = 1; // Represents dp[i + 1] (initially empty string base case)
        let dp2 = 0; // Represents dp[i + 2]

        for (let i = n - 1; i >= 0; i--) {
            let current = 0;
            
            if (s[i] !== '0') {
                current = dp1; // Take 1 digit
                
                // Take 2 digits
                if (i + 1 < n && (s[i] === '1' || (s[i] === '2' && s[i + 1] <= '6'))) {
                    current += dp2;
                }
            }
            
            // Shift the window backward
            dp2 = dp1;
            dp1 = current;
        }

        return dp1;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$.
* **Space Complexity**: $O(1)$. We only track three integer variables at any time.