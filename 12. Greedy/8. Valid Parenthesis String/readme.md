![Valid Parenthesis String](/asset/images/ValidParenthesisString.png)
![Valid Parenthesis String](/asset/images/ValidParenthesisString2.png)

---

### 1. Recursion

This approach tries every possible interpretation of `*` using recursion. We track the count of open parentheses. If the count ever drops below zero, the path is invalid. At the end, the count must be exactly zero. 🐢

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    checkValidString(s) {
        function dfs(i, open) {
            // Invalid if we closed more than we opened
            if (open < 0) return false;
            // Base case: End of string. Valid only if all opened are closed.
            if (i === s.length) return open === 0;

            if (s[i] === '(') {
                return dfs(i + 1, open + 1);
            } else if (s[i] === ')') {
                return dfs(i + 1, open - 1);
            } else {
                // Try treating '*' as empty, '(', and ')'
                return (
                    dfs(i + 1, open) ||
                    dfs(i + 1, open + 1) ||
                    dfs(i + 1, open - 1)
                );
            }
        }

        return dfs(0, 0);
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**:  because each `*` branches into 3 recursive calls.
* **Space Complexity**:  for the recursion stack.

---

### 2. Dynamic Programming (Top-Down)

This improves on recursion by memoizing the results. The state is defined by `(index, open_count)`. If we encounter the same index with the same number of open parentheses, we return the stored result.

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    checkValidString(s) {
        const n = s.length;
        const memo = Array.from({ length: n + 1 }, () =>
            Array(n + 1).fill(null),
        );

        function dfs(i, open) {
            if (open < 0) return false;
            if (i === n) return open === 0;

            if (memo[i][open] !== null) return memo[i][open];

            let result;
            if (s[i] === '(') {
                result = dfs(i + 1, open + 1);
            } else if (s[i] === ')') {
                result = dfs(i + 1, open - 1);
            } else {
                result =
                    dfs(i + 1, open) ||
                    dfs(i + 1, open + 1) ||
                    dfs(i + 1, open - 1);
            }

            memo[i][open] = result;
            return result;
        }

        return dfs(0, 0);
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: . There are  possible states.
* **Space Complexity**:  for the memoization table.

---

### 3. Dynamic Programming (Bottom-Up)

We build a 2D table `dp[i][open]` where the value is true if the suffix `s[i:]` can be made valid given `open` current parentheses. We fill this table backwards from the end of the string.

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    checkValidString(s) {
        const n = s.length;
        const dp = Array.from({ length: n + 1 }, () =>
            Array(n + 1).fill(false),
        );
        dp[n][0] = true; // Base case: empty string valid with 0 open

        for (let i = n - 1; i >= 0; i--) {
            for (let open = 0; open < n; open++) {
                let res = false;
                if (s[i] === '*') {
                    res ||= dp[i + 1][open + 1];         // Treat as '('
                    if (open > 0) res ||= dp[i + 1][open - 1]; // Treat as ')'
                    res ||= dp[i + 1][open];             // Treat as ''
                } else {
                    if (s[i] === '(') {
                        res ||= dp[i + 1][open + 1];
                    } else if (open > 0) {
                        res ||= dp[i + 1][open - 1];
                    }
                }
                dp[i][open] = res;
            }
        }
        return dp[0][0];
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: .
* **Space Complexity**: .

---

### 4. Dynamic Programming (Space Optimized)

Since `dp[i]` only depends on `dp[i+1]`, we can reduce the space complexity by maintaining only the previous row (or column, depending on visualization) of the DP table.

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    checkValidString(s) {
        const n = s.length;
        let dp = Array(n + 1).fill(false);
        dp[0] = true;

        for (let i = n - 1; i >= 0; i--) {
            const newDp = Array(n + 1).fill(false);
            for (let open = 0; open < n; open++) {
                if (s[i] === '*') {
                    newDp[open] =
                        dp[open + 1] || (open > 0 && dp[open - 1]) || dp[open];
                } else if (s[i] === '(') {
                    newDp[open] = dp[open + 1];
                } else if (open > 0) {
                    newDp[open] = dp[open - 1];
                }
            }
            dp = newDp;
        }
        return dp[0];
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: .
* **Space Complexity**: .

---

### 5. Two Stacks

We use two stacks: one for indices of `(` and one for indices of `*`.

1. When we see `(`, push index to `left`.
2. When we see `*`, push index to `star`.
3. When we see `)`, prioritize popping from `left`. If empty, pop from `star`. If both empty, return false.
4. After the loop, match remaining `(` with `*`. A `*` can only balance a `(` if the `*` appeared **after** the `(`.

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    checkValidString(s) {
        const left = [];
        const star = [];
        for (let i = 0; i < s.length; i++) {
            const ch = s[i];
            if (ch === '(') {
                left.push(i);
            } else if (ch === '*') {
                star.push(i);
            } else {
                if (left.length === 0 && star.length === 0) {
                    return false;
                }
                if (left.length > 0) {
                    left.pop();
                } else {
                    star.pop();
                }
            }
        }

        // Match remaining open parentheses with stars
        while (left.length > 0 && star.length > 0) {
            // If the open parenthesis appears after the star, it can't be closed
            if (left.pop() > star.pop()) return false;
        }
        return left.length === 0;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: .
* **Space Complexity**:  for the stacks.

---

### 6. Greedy (Optimal)

This is the most efficient solution. We track the **range** of possible open parentheses counts `[leftMin, leftMax]`.

* `leftMax`: Treat every `*` as `(`. If this drops below 0, it's impossible to recover.
* `leftMin`: Treat every `*` as `)`. If this drops below 0, we can just treat that `*` as empty (reset `leftMin` to 0).
* At the end, `leftMin` must be 0 for the string to be valid. ✅

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    checkValidString(s) {
        let leftMin = 0;
        let leftMax = 0;

        for (const c of s) {
            if (c === '(') {
                leftMin++;
                leftMax++;
            } else if (c === ')') {
                leftMin--;
                leftMax--;
            } else {
                leftMin--; // Treat * as )
                leftMax++; // Treat * as (
            }
            
            // If max possible open is negative, we have too many )
            if (leftMax < 0) {
                return false;
            }
            // Min open cannot be negative (we can treat * as empty instead of ))
            if (leftMin < 0) {
                leftMin = 0;
            }
        }
        return leftMin === 0;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: .
* **Space Complexity**: .