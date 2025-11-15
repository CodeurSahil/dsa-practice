![](/asset/images/generateParentheses.png)

### 1\. Brute Force

This method generates **every possible combination** of `n` open and `n` close parentheses. It then runs a validation check on each combination to filter out the invalid ones. While simple to conceptualize, it's very inefficient because it explores many invalid paths. 🐢

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isValid(s) {
        let open = 0;
        for (const c of s) {
            open += c === '(' ? 1 : -1;
            if (open < 0) return false;
        }
        return open === 0;
    }

    /**
     * @param {string} s
     * @param {string[]} res
     * @param {number} n
     */
    dfs(s, res, n) {
        if (s.length === 2 * n) {
            if (this.isValid(s)) res.push(s);
            return;
        }
        this.dfs(s + '(', res, n);
        this.dfs(s + ')', res, n);
    }

    /**
     * @param {number} n
     * @return {string[]}
     */
    generateParenthesis(n) {
        const res = [];
        this.dfs('', res, n);
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(2^{2n} \\cdot n)$. We generate $2^{2n}$ strings and validate each in $O(n)$ time.
  * **Space Complexity**: $O(2^{2n} \\cdot n)$ to store all the generated strings.

-----

### 2\. Backtracking

This is a much more intelligent approach. Instead of generating everything, it builds the strings one character at a time, following two simple rules:

1.  Only add an opening parenthesis `(` if we haven't used all `n` of them.
2.  Only add a closing parenthesis `)` if it doesn't exceed the number of open parentheses.

This **prunes the search tree** by never exploring invalid paths, leading to a significant speedup. ✅

```javascript
class Solution {
    /**
     * @param {number} openN
     * @param {number} closedN
     * @param {number} n
     * @param {string[]} res
     * @param {string} currentString
     */
    backtrack(openN, closedN, n, res, currentString) {
        if (openN === closedN && openN === n) {
            res.push(currentString);
            return;
        }

        if (openN < n) {
            this.backtrack(openN + 1, closedN, n, res, currentString + '(');
        }
        if (closedN < openN) {
            this.backtrack(openN, closedN + 1, n, res, currentString + ')');
        }
    }

    /**
     * @param {number} n
     * @return {string[]}
     */
    generateParenthesis(n) {
        const res = [];
        this.backtrack(0, 0, n, res, '');
        return res;
    }
}
```

#### **Time & Space Complexity**

*The number of valid combinations is the n-th Catalan number.*

  * **Time Complexity**: $O(\\frac{4^n}{\\sqrt{n}})$
  * **Space Complexity**: $O(n)$ for the recursion depth.

-----

### 3\. Dynamic Programming

This method builds the solution for `n` by **reusing the results from smaller values**. The core idea is that any valid parenthesis string of length `2k` can be expressed as `(a)b`, where `a` is a valid sequence of length `2i` and `b` is a valid sequence of length `2 * (k - i - 1)`. We can combine all pre-computed smaller results to build up the solution for `n`. 🏗️

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {string[]}
     */
    generateParenthesis(n) {
        // dp[k] will store all valid sequences of length 2k
        const dp = Array.from({ length: n + 1 }, () => []);
        dp[0] = [''];

        for (let k = 1; k <= n; k++) {
            for (let i = 0; i < k; i++) {
                // left is sequence 'a', right is sequence 'b'
                for (const left of dp[i]) {
                    for (const right of dp[k - i - 1]) {
                        dp[k].push('(' + left + ')' + right);
                    }
                }
            }
        }

        return dp[n];
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(\\frac{4^n}{\\sqrt{n}})$
  * **Space Complexity**: $O(\\frac{4^n}{\\sqrt{n}})$ to store all intermediate results.