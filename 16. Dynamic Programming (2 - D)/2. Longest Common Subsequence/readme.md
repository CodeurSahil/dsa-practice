![Longest Common Subsequence](/asset/images/LongestCommonSubsequence.png)

---

## 1. Recursion (Brute Force)

### Intuition

To find the LCS of two strings, we compare characters one by one.

* If the current characters match, they contribute to the LCS, and we move both pointers forward.
* If they don't match, we try skipping a character from either string and take the best result.
This naturally leads to a recursive approach that explores all possibilities.

### Algorithm

1. Define a recursive function `dfs(i, j)` where `i` and `j` are the current indices in `text1` and `text2`.
2. **Base case:** If either index reaches the end of its string, return `0`.
3. If `text1[i] == text2[j]`, include this character in the LCS and recurse with `1 + dfs(i + 1, j + 1)`.
4. Otherwise, try both options: skip `text1[i]` or skip `text2[j]`, and return the `max(dfs(i + 1, j), dfs(i, j + 1))`.
5. Start the recursion from `dfs(0, 0)`.

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:

        def dfs(i, j):
            if i == len(text1) or j == len(text2):
                return 0
            if text1[i] == text2[j]:
                return 1 + dfs(i + 1, j + 1)
            return max(dfs(i + 1, j), dfs(i, j + 1))

        return dfs(0, 0)

```

* **Time Complexity:** $O(2^{m+n})$
* **Space Complexity:** $O(m+n)$ for the recursion stack.

---

## 2. Dynamic Programming (Top-Down Memoization)

### Intuition

The recursive solution recalculates the same subproblems many times. For example, `dfs(2, 3)` might be called from multiple branches. By storing results in a memo table, we avoid redundant work, transforming the exponential solution into a polynomial one.

### Algorithm

1. Create a memoization dictionary indexed by the tuple `(i, j)`.
2. Before computing `dfs(i, j)`, check if the result is already cached. If cached, return it immediately.
3. Otherwise, compute the result using the same logic as the plain recursion, store it in the memo, and return it.

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        memo = {}

        def dfs(i, j):
            if i == len(text1) or j == len(text2):
                return 0
            if (i, j) in memo:
                return memo[(i, j)]

            if text1[i] == text2[j]:
                memo[(i, j)] = 1 + dfs(i + 1, j + 1)
            else:
                memo[(i, j)] = max(dfs(i + 1, j), dfs(i, j + 1))

            return memo[(i, j)]

        return dfs(0, 0)

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(m \cdot n)$

---

## 3. Dynamic Programming (Bottom-Up 2D)

### Intuition

Instead of starting from the beginning and recursing forward, we can fill a 2D table iteratively from the end. The value `dp[i][j]` represents the LCS length for the suffixes `text1[i:]` and `text2[j:]`. By processing indices in reverse order (bottom-up, right-to-left), we ensure that when we compute `dp[i][j]`, the values we depend on are already computed.

### Algorithm

1. Create a 2D array `dp` of size `(m+1) \times (n+1)` initialized to `0`.
2. Iterate `i` from `m-1` down to `0`, and `j` from `n-1` down to `0`.
3. If `text1[i] == text2[j]`, set `dp[i][j] = 1 + dp[i+1][j+1]`.
4. Otherwise, set `dp[i][j] = max(dp[i+1][j], dp[i][j+1])`.
5. Return `dp[0][0]`.

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        dp = [[0 for j in range(len(text2) + 1)]
                 for i in range(len(text1) + 1)]

        for i in range(len(text1) - 1, -1, -1):
            for j in range(len(text2) - 1, -1, -1):
                if text1[i] == text2[j]:
                    dp[i][j] = 1 + dp[i + 1][j + 1]
                else:
                    dp[i][j] = max(dp[i][j + 1], dp[i + 1][j])

        return dp[0][0]

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(m \cdot n)$

---

## 4. Dynamic Programming (Space Optimized 2-Row)

### Intuition

Looking at the bottom-up recurrence, each cell `dp[i][j]` only depends on the *current* row and the *next* row (`i+1`). We don't need the entire 2D table; two 1D arrays suffice. We keep a `prev` array for the next row and a `curr` array for the current row, swapping them after each row is processed.

### Algorithm

1. If `text1` is shorter, swap the strings to minimize space usage (we want the arrays to be the size of the shorter string).
2. Initialize two arrays `prev` and `curr` of size `n+1`.
3. Iterate `i` from `m-1` down to `0`:
* For each `j` from `n-1` down to `0`, compute `curr[j]` using `prev[j+1]`, `prev[j]`, and `curr[j+1]`.
* Swap `prev` and `curr`.


4. Return `prev[0]` (because of the swap at the end of the last iteration).

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        if len(text1) < len(text2):
            text1, text2 = text2, text1

        prev = [0] * (len(text2) + 1)
        curr = [0] * (len(text2) + 1)

        for i in range(len(text1) - 1, -1, -1):
            for j in range(len(text2) - 1, -1, -1):
                if text1[i] == text2[j]:
                    curr[j] = 1 + prev[j + 1]
                else:
                    curr[j] = max(curr[j + 1], prev[j])
            prev, curr = curr, prev

        return prev[0]

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(\min(m, n))$

---

## 5. Dynamic Programming (Optimal 1D)

### Intuition

We can reduce space even further by using a *single* array and a temporary variable. When iterating right to left within a row, we need the old value at position `j` (which represents `dp[i+1][j]` in 2D terms) before overwriting it. We store this in a variable `prev` before the update, then use it for the diagonal reference (`dp[i+1][j+1]`) in the next inner loop iteration.

### Algorithm

1. If `text1` is shorter, swap strings for minimal space.
2. Initialize a single array `dp` of size `n+1`.
3. Iterate `i` from `m-1` down to `0`:
* Set `prev = 0` (represents the out-of-bounds `dp[i+1][n]`).
* For each `j` from `n-1` down to `0`:
* Save `temp = dp[j]` (the old value before update).
* If characters match, set `dp[j] = 1 + prev`.
* Otherwise, set `dp[j] = max(dp[j], dp[j+1])`.
* Update `prev = temp`.




4. Return `dp[0]`.

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        if len(text1) < len(text2):
            text1, text2 = text2, text1

        dp = [0] * (len(text2) + 1)

        for i in range(len(text1) - 1, -1, -1):
            prev = 0
            for j in range(len(text2) - 1, -1, -1):
                temp = dp[j]
                if text1[i] == text2[j]:
                    dp[j] = 1 + prev
                else:
                    dp[j] = max(dp[j], dp[j + 1])
                prev = temp

        return dp[0]

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(\min(m, n))$

---


