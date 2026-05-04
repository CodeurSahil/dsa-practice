![Climbing Stairs](/asset/images/ClimbingStairs.png)

### 1. Recursion (Brute Force)

**Intuition:**
From any given step $i$, you have two choices: take 1 step to $i+1$, or take 2 steps to $i+2$. This creates a massive binary decision tree. We count `1` every time a path lands exactly on step $n$. 🐢

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    climbStairs(n) {
        const dfs = (i) => {
            // Base case: Reached the top
            if (i === n) return 1;
            // Base case: Overshot the top
            if (i > n) return 0;
            
            // Try both 1 step and 2 steps
            return dfs(i + 1) + dfs(i + 2);
        };

        return dfs(0);
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(2^n)$. The recursion tree grows exponentially. This will Time Limit Exceed (TLE) for large $n$.
* **Space Complexity**: $O(n)$ for the recursion stack.

---

### 2. Dynamic Programming (Top-Down / Memoization)

**Intuition:**
The recursive approach recalculates the same subproblems repeatedly. For example, `dfs(3)` might be calculated dozens of times. We can fix this by caching the result of `dfs(i)` the first time we compute it. Next time we need it, we return the cached value instantly.

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    climbStairs(n) {
        const cache = new Array(n + 1).fill(-1);
        
        const dfs = (i) => {
            if (i === n) return 1;
            if (i > n) return 0;
            
            // Return cached result if available
            if (cache[i] !== -1) {
                return cache[i];
            }
            
            // Calculate and store
            cache[i] = dfs(i + 1) + dfs(i + 2);
            return cache[i];
        };

        return dfs(0);
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$. Each step from $0$ to $n$ is calculated exactly once.
* **Space Complexity**: $O(n)$ for the cache array and recursion stack.

---

### 3. Dynamic Programming (Bottom-Up)

**Intuition:**
Instead of starting at 0 and recursing down to $n$, we can start from the bottom base cases and build our way up to $n$ iteratively. Let `dp[i]` be the number of ways to reach step `i`. We know `dp[i] = dp[i-1] + dp[i-2]`.

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    climbStairs(n) {
        if (n <= 2) return n;
        
        const dp = new Array(n + 1).fill(0);
        // Base cases
        dp[1] = 1;
        dp[2] = 2;
        
        // Build up to n
        for (let i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$. Single loop.
* **Space Complexity**: $O(n)$ for the DP array.

---

### 4. Dynamic Programming (Space Optimized)

**Intuition:**
Look closely at the Bottom-Up approach: to calculate step $i$, we *only* ever need the results from step $i-1$ and $i-2$. We don't need the entire array. We can just keep two variables (`one` and `two`) and update them as we climb. ✅

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    climbStairs(n) {
        if (n <= 2) return n;
        
        let one = 1; // Represents dp[i-2] initially
        let two = 2; // Represents dp[i-1] initially
        
        // We start calculating at step 3, so loop n - 2 times
        for (let i = 3; i <= n; i++) {
            let temp = one + two;
            one = two;   // Shift variables forward
            two = temp;
        }
        
        return two;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$.
* **Space Complexity**: $O(1)$. We only use a few variables.

---

### 5. Matrix Exponentiation

**Intuition:**
The Fibonacci sequence can be represented using linear algebra. We can find the $n$-th Fibonacci number in logarithmic time by raising the transformation matrix `[[1, 1], [1, 0]]` to the power of $n$ using binary exponentiation. This is mostly an academic exercise for this specific problem but is highly useful in competitive programming for massive values of $n$ ($n \ge 10^9$).

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    climbStairs(n) {
        if (n <= 2) return n;

        const multiplyMatrix = (A, B) => {
            return [
                [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
                [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]
            ];
        };

        const powerMatrix = (M, p) => {
            let res = [[1, 0], [0, 1]]; // Identity matrix
            let base = M;

            while (p > 0) {
                if (p % 2 === 1) {
                    res = multiplyMatrix(res, base);
                }
                base = multiplyMatrix(base, base);
                p = Math.floor(p / 2);
            }
            return res;
        };

        const M = [[1, 1], [1, 0]];
        // Because of how climbing stairs maps to Fib, n stairs is the (n)th power's [0][0] element
        const resMatrix = powerMatrix(M, n);
        
        return resMatrix[0][0];
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(\log n)$ due to binary exponentiation of the matrix.
* **Space Complexity**: $O(1)$. Matrices are of fixed size $2 \times 2$.