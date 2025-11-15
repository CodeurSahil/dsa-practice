![Palindrome Partitioning](/asset/images/PalindromePartitioning.png)

-----

### 1\. Backtracking - I

This backtracking approach uses two pointers, `j` (start of the current substring) and `i` (the current index being checked), to explore partitions.

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string[][]}
     */
    partition(s) {
        const res = [];
        const part = [];

        const dfs = (j, i) => {
            if (i >= s.length) {
                if (i === j) {
                    res.push([...part]);
                }
                return;
            }

            // Check if s[j..i] is a palindrome
            if (this.isPali(s, j, i)) {
                part.push(s.substring(j, i + 1));
                dfs(i + 1, i + 1); // Start new partition from i + 1
                part.pop();
            }

            dfs(j, i + 1); // Extend current partition to i + 1
        };

        dfs(0, 0);
        return res;
    }

    /**
     * @param {string} s
     * @param {number} l
     * @param {number} r
     * @return {boolean}
     */
    isPali(s, l, r) {
        while (l < r) {
            if (s[l] !== s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n \cdot 2^n)$
  * **Space complexity**: $O(n)$ (for the recursion stack)

-----

### 2\. Backtracking - II

This is the more standard and intuitive backtracking solution. The `dfs` function iterates from the current index `i` to the end of the string, trying every possible "cut" point `j`. If the substring `s[i...j]` is a palindrome, it's added to the current partition, and the recursion continues from `j + 1`.

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string[][]}
     */
    partition(s) {
        const res = [];
        const part = [];
        this.dfs(0, s, part, res);
        return res;
    }

    /**
     * @param {number} i
     * @param {string} s
     * @param {string[]} part
     * @param {string[][]} res
     * @return {void}
     */
    dfs(i, s, part, res) {
        if (i >= s.length) {
            res.push([...part]);
            return;
        }
        for (let j = i; j < s.length; j++) {
            if (this.isPali(s, i, j)) {
                part.push(s.substring(i, j + 1));
                this.dfs(j + 1, s, part, res);
                part.pop();
            }
        }
    }

    /**
     * @param {string} s
     * @param {number} l
     * @param {number} r
     * @return {boolean}
     */
    isPali(s, l, r) {
        while (l < r) {
            if (s[l] !== s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n \cdot 2^n)$
  * **Space complexity**: $O(n)$ (for the recursion stack)

-----

### 3\. Backtracking with DP Pre-computation

This is a significant optimization. It first **pre-computes all possible palindromic substrings** in $O(n^2)$ time and stores them in a 2D `dp` table. The backtracking function then runs, but its check for a palindrome is now an $O(1)$ lookup in the `dp` table, making it much faster in practice.

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string[][]}
     */
    partition(s) {
        const n = s.length;
        const dp = Array.from({ length: n }, () => Array(n).fill(false));
        
        // Pre-compute all palindrome substrings
        for (let l = 1; l <= n; l++) {
            for (let i = 0; i <= n - l; i++) {
                dp[i][i + l - 1] =
                    s[i] === s[i + l - 1] &&
                    (l <= 2 || dp[i + 1][i + l - 2]);
            }
        }

        const res = [];
        const part = [];
        const dfs = (i) => {
            if (i >= s.length) {
                res.push([...part]);
                return;
            }
            for (let j = i; j < s.length; j++) {
                if (dp[i][j]) {
                    part.push(s.substring(i, j + 1));
                    dfs(j + 1);
                    part.pop();
                }
            }
        };
        dfs(0);
        return res;
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n \cdot 2^n)$ (The $O(n^2)$ pre-computation is dominated)
  * **Space complexity**: $O(n^2)$ (for the `dp` table)

-----

### 4\. Recursion with DP Pre-computation

This approach also uses the same $O(n^2)$ DP pre-computation. However, the `dfs` function is structured to *return* the list of partitions for the remainder of the string. It builds the final result by combining the current palindrome with the results from the recursive calls.

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string[][]}
     */
    partition(s) {
        const n = s.length;
        const dp = Array.from({ length: n }, () => Array(n).fill(false));

        // Pre-compute all palindrome substrings
        for (let l = 1; l <= n; l++) {
            for (let i = 0; i <= n - l; i++) {
                dp[i][i + l - 1] =
                    s[i] === s[i + l - 1] &&
                    (l <= 2 || dp[i + 1][i + l - 2]);
            }
        }

        const dfs = (i) => {
            if (i >= s.length) {
                return [[]]; // Base case: one valid partition (the empty one)
            }

            const ret = [];
            for (let j = i; j < s.length; j++) {
                if (dp[i][j]) {
                    const nxt = dfs(j + 1);
                    for (const part of nxt) {
                        const cur = [s.slice(i, j + 1), ...part];
                        ret.push(cur);
                    }
                }
            }
            return ret;
        };

        return dfs(0);
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n \cdot 2^n)$
  * **Space complexity**: $O(n^2)$ (for the `dp` table and recursion stack)