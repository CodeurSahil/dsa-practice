![Edit Distance](/asset/images/EditDistance.png)
![Edit Distance](/asset/images/EditDistance2.png)

---

## 1. Recursion (Brute Force)

### Intuition
At every position in `s`, we have a choice:
1. **Skip** the current character in `s`.
2. **Use** the current character, but *only* if it matches the current character in `t`.

The recursive function answers: *"How many ways can we form `t[j:]` using characters from `s[i:]`?"* If we successfully match all characters of `t`, we have found one valid subsequence.

### Algorithm
1. If `t` is longer than `s`, return `0` immediately since it is impossible.
2. Define a recursive function `dfs(i, j)` where `i` is the current index in `s` and `j` is the current index in `t`.
3. **Base Cases:**
   * If `j` reaches the end of `t`, return `1` (a valid subsequence has been formed).
   * If `i` reaches the end of `s` before `t` is finished, return `0` (no valid subsequence can be formed).
4. Always consider skipping the current character in `s`: `res = dfs(i + 1, j)`.
5. If `s[i] == t[j]`, also consider using this character to match `t[j]`: add `dfs(i + 1, j + 1)` to `res`.
6. Return the total count `res`.

```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        if len(t) > len(s):
            return 0

        def dfs(i, j):
            if j == len(t):
                return 1
            if i == len(s):
                return 0

            res = dfs(i + 1, j)
            if s[i] == t[j]:
                res += dfs(i + 1, j + 1)
            return res

        return dfs(0, 0)

```

* **Time Complexity:** $O(2^m)$ where $m$ is the length of string `s`.
* **Space Complexity:** $O(m)$ for the recursion stack.

---

## 2. Dynamic Programming (Top-Down Memoization)

### Intuition

The recursive solution works by trying all possibilities, but it repeats the same subproblems many times. To make it efficient, we use top-down dynamic programming (memoization). A state is uniquely identified by `i` (current index in `s`) and `j` (current index in `t`). By storing the result for each `(i, j)` pair, we avoid recomputing the same state.

### Algorithm

1. If the length of `t` is greater than the length of `s`, return `0`.
2. Create a memoization dictionary `dp` where the key is `(i, j)` and the value is the number of ways to form `t[j:]` from `s[i:]`.
3. Inside `dfs(i, j)`, check the base cases.
4. If the state `(i, j)` is already in `dp`, return the cached result.
5. Compute the result by skipping the character in `s`, and optionally matching if `s[i] == t[j]`.
6. Store `res` in `dp[(i, j)]` and return it.

```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        if len(t) > len(s):
            return 0

        dp = {}
        
        def dfs(i, j):
            if j == len(t):
                return 1
            if i == len(s):
                return 0
            if (i, j) in dp:
                return dp[(i, j)]

            res = dfs(i + 1, j)
            if s[i] == t[j]:
                res += dfs(i + 1, j + 1)
                
            dp[(i, j)] = res
            return res

        return dfs(0, 0)

```

* **Time Complexity:** $O(m \cdot n)$ where $m$ is the length of `s` and $n$ is the length of `t`.
* **Space Complexity:** $O(m \cdot n)$ for the memo dictionary and recursion stack.

---

## 3. Dynamic Programming (Bottom-Up 2D)

### Intuition

Instead of solving this recursively, we use bottom-up dynamic programming by building answers for smaller suffixes first. We define a DP state that answers: *"How many ways can we form `t[j:]` using `s[i:]`?"* By filling a DP table from the end of the strings toward the beginning, we ensure that all required subproblems are already solved.

### Algorithm

1. Let `m = len(s)` and `n = len(t)`.
2. Create a 2D DP table `dp` of size `(m + 1) \times (n + 1)`.
3. Initialize the base case: For all `i`, set `dp[i][n] = 1`. This means there is exactly one way to form an empty string `t` (by choosing nothing).
4. Fill the table from bottom to top and right to left.
5. For each position `(i, j)`:
* Always consider skipping `s[i]`: `dp[i][j] = dp[i + 1][j]`
* If `s[i] == t[j]`, add the ways from matching: `dp[i][j] += dp[i + 1][j + 1]`


6. Return `dp[0][0]`.

```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m, n = len(s), len(t)
        dp = [[0] * (n + 1) for _ in range(m + 1)]

        for i in range(m + 1):
            dp[i][n] = 1

        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                dp[i][j] = dp[i + 1][j]
                if s[i] == t[j]:
                    dp[i][j] += dp[i + 1][j + 1]

        return dp[0][0]

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(m \cdot n)$ for the 2D DP table.

---

## 4. Dynamic Programming (Space Optimized 2-Row)

### Intuition

From the bottom-up DP approach, we know that `dp[i][j]` depends *only* on values from the next row (`i + 1`), meaning we never need older rows once a new row is computed. We can optimize space by keeping only two 1D arrays: `dp` (results for `i + 1`) and `nextDp` (results for current `i`).

### Algorithm

1. Create two 1D arrays of size `n + 1`: `dp` and `nextDp`.
2. Initialize the base case: Set `dp[n] = 1` and `nextDp[n] = 1`.
3. Iterate over string `s` from right to left (index `i`).
4. Iterate over string `t` from right to left (index `j`):
* Always carry over the value from skipping: `nextDp[j] = dp[j]`
* If `s[i] == t[j]`, add the matched combinations: `nextDp[j] += dp[j + 1]`


5. After finishing the row, copy `nextDp` into `dp`.
6. Return `dp[0]`.

```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m, n = len(s), len(t)
        dp = [0] * (n + 1)
        nextDp = [0] * (n + 1)

        dp[n] = nextDp[n] = 1
        
        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                nextDp[j] = dp[j]
                if s[i] == t[j]:
                    nextDp[j] += dp[j + 1]
            dp = nextDp[:]

        return dp[0]

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(n)$

---

## 5. Dynamic Programming (Optimal 1D In-Place)

### Intuition

We can compress the space further into a single 1D array. When updating `dp[j]` in-place, we still need access to the old value of `dp[j+1]` (which corresponds to `dp[i+1][j+1]` before it gets overwritten). To solve this without an extra array, we carry that needed diagonal value using a single variable (`prev`), which always holds the correct "old `dp[j+1]`" for the current update.

### Algorithm

1. Create a 1D array `dp` of size `n + 1` initialized to `0`.
2. Initialize the base case: `dp[n] = 1`.
3. Iterate through `s` from right to left (`m - 1` down to `0`).
4. Set `prev = 1` which corresponds to the diagonal value `dp[i+1][n]`.
5. For each character `s[i]`, iterate through `t` from right to left (`n - 1` down to `0`):
* Start with `res = dp[j]` (skipping `s[i]`).
* If `s[i] == t[j]`, add `prev` (matching both characters).
* Update `prev` to the old `dp[j]` before overwriting it (so it becomes the next diagonal).
* Write `dp[j] = res`.


6. Return `dp[0]`.

```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m, n = len(s), len(t)
        dp = [0] * (n + 1)

        dp[n] = 1
        for i in range(m - 1, -1, -1):
            prev = 1
            for j in range(n - 1, -1, -1):
                res = dp[j]
                
                if s[i] == t[j]:
                    res += prev

                prev = dp[j]
                dp[j] = res

        return dp[0]

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(n)$
