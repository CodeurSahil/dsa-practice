![Regular Expression Matching](/asset/images/RegularExpressionMatching.png)
![Regular Expression Matching](/asset/images/RegularExpressionMatching2.png)

---

## 1. Recursion (Brute Force)

### Intuition
A recursive approach works because at each step we decide how to match the current part of the pattern with the current part of the string. The function `dfs(i, j)` represents: *"Can `s[i:]` be matched by `p[j:]`?"*

There are two main cases:
1. **The next pattern character is NOT `*`**: The current characters must match (directly or via `.`), and we move both pointers forward.
2. **The next pattern character IS `*`**: We have two choices:
   * **Skip** the `x*` part entirely (use `*` as zero occurrences).
   * **Use** the `x*` part to match one character from the string (if it matches), and stay on the same pattern index to potentially match more.

### Algorithm
1. Let `m = len(s)` and `n = len(p)`.
2. Define a recursive function `dfs(i, j)`:
   * **Base Case:** If `j` reaches the end of the pattern, return `True` only if `i` also reached the end of the string.
3. Compute whether the current characters match: `match = i < m and (s[i] == p[j] or p[j] == '.')`
4. If the next character in the pattern is `*` (i.e., `p[j + 1] == '*'`):
   * **Option 1:** Skip `p[j]` and `*` $\rightarrow$ `dfs(i, j + 2)`
   * **Option 2:** If `match` is true, consume one character from `s` and keep pattern at `j` $\rightarrow$ `dfs(i + 1, j)`
   * Return `True` if either option works.
5. Otherwise (no `*` case):
   * If `match` is true, move both pointers forward $\rightarrow$ `dfs(i + 1, j + 1)`.
   * If not, return `False`.
6. Start with `dfs(0, 0)` and return the result.

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s), len(p)

        def dfs(i, j):
            if j == n:
                return i == m

            match = i < m and (s[i] == p[j] or p[j] == ".")
            
            if (j + 1) < n and p[j + 1] == "*":
                return (dfs(i, j + 2) or          # don't use *
                       (match and dfs(i + 1, j))) # use *
                       
            if match:
                return dfs(i + 1, j + 1)
                
            return False

        return dfs(0, 0)

```

* **Time Complexity:** $O(2^{m+n})$
* **Space Complexity:** $O(m+n)$ for the recursion stack.

---

## 2. Dynamic Programming (Top-Down Memoization)

### Intuition

A recursive solution explores all matching possibilities, but the same `(i, j)` states get recomputed multiple times, making plain recursion slow. To fix this, we use top-down dynamic programming (memoization).

Whenever we compute the answer for a state `(i, j)`, we store it in a cache so future calls can reuse it instantly.

### Algorithm

1. Let `m = len(s)` and `n = len(p)`.
2. Create a cache dictionary to store results for states `(i, j)`.
3. Inside the `dfs(i, j)` function, handle the base case.
4. If `(i, j)` is already in the cache, return the cached result.
5. Perform the exact same matching logic as the recursive approach.
6. Store the computed result in the cache before returning it.

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s), len(p)
        cache = {}

        def dfs(i, j):
            if j == n:
                return i == m
            if (i, j) in cache:
                return cache[(i, j)]

            match = i < m and (s[i] == p[j] or p[j] == ".")
            
            if (j + 1) < n and p[j + 1] == "*":
                cache[(i, j)] = (dfs(i, j + 2) or (match and dfs(i + 1, j)))
                return cache[(i, j)]

            if match:
                cache[(i, j)] = dfs(i + 1, j + 1)
                return cache[(i, j)]

            cache[(i, j)] = False
            return False

        return dfs(0, 0)

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(m \cdot n)$ for the cache and recursion stack.

---

## 3. Dynamic Programming (Bottom-Up 2D)

### Intuition

Instead of recursion, we can solve this using bottom-up dynamic programming by building answers for smaller suffixes of the strings.

We define a DP state that answers: *"Can the substring `s[i:]` be matched by the pattern `p[j:]`?"* By filling a table from the end of both strings toward the beginning, we ensure that when we compute a state, all the states it depends on are already known.

### Algorithm

1. Create a 2D boolean DP table `dp` of size `(len(s) + 1) \times (len(p) + 1)`. Let `dp[i][j]` represent whether `s[i:]` matches `p[j:]`.
2. Initialize the base case: `dp[len(s)][len(p)] = True` because two empty strings match.
3. Fill the table from bottom to top and right to left (iterating backwards).
4. For each position `(i, j)`, calculate `match`.
5. If the next character in the pattern is `*`:
* Set `dp[i][j]` to `True` if skipping the `*` works (`dp[i][j+2]`) OR if `match` is true and consuming a character from `s` works (`dp[i+1][j]`).


6. If the next character is not `*`:
* If `match` is true, move both pointers forward: `dp[i][j] = dp[i + 1][j + 1]`.


7. Return `dp[0][0]`.

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        dp = [[False] * (len(p) + 1) for i in range(len(s) + 1)]
        dp[len(s)][len(p)] = True

        for i in range(len(s), -1, -1):
            for j in range(len(p) - 1, -1, -1):
                match = i < len(s) and (s[i] == p[j] or p[j] == ".")

                if (j + 1) < len(p) and p[j + 1] == "*":
                    dp[i][j] = dp[i][j + 2]
                    if match:
                        dp[i][j] = dp[i + 1][j] or dp[i][j]
                elif match:
                    dp[i][j] = dp[i + 1][j + 1]

        return dp[0][0]

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(m \cdot n)$

---

## 4. Dynamic Programming (Space Optimized 2-Row)

### Intuition

In the bottom-up DP solution, each row `i` only depends on the next row (`i + 1`) and values within the current row while moving across `j`. We don't need the full 2D table. We can compress it into two 1D arrays: `dp` (represents the row for `i + 1`) and `nextDp` (represents the row for `i`).

### Algorithm

1. Create a 1D boolean array `dp` of size `len(p) + 1`. Initialize `dp[len(p)] = True`.
2. Iterate `i` from `len(s)` down to `0`:
* Create a new array `nextDp` for the current row.
* Set `nextDp[len(p)] = (i == len(s))` (empty pattern only matches empty string).
* For each `j` from `len(p) - 1` down to `0`:
* Compute `match`.
* If next pattern character is `*`, resolve `nextDp[j]` using `nextDp[j + 2]` and `dp[j]`.
* Otherwise, if `match`, set `nextDp[j] = dp[j + 1]`.


* After finishing the row, assign `dp = nextDp`.


3. Return `dp[0]`.

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        dp = [False] * (len(p) + 1)
        dp[len(p)] = True

        for i in range(len(s), -1, -1):
            nextDp = [False] * (len(p) + 1)
            nextDp[len(p)] = (i == len(s))

            for j in range(len(p) - 1, -1, -1):
                match = i < len(s) and (s[i] == p[j] or p[j] == ".")

                if (j + 1) < len(p) and p[j + 1] == "*":
                    nextDp[j] = nextDp[j + 2]
                    if match:
                        nextDp[j] |= dp[j]
                elif match:
                    nextDp[j] = dp[j + 1]

            dp = nextDp

        return dp[0]

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(n)$

---

## 5. Dynamic Programming (Optimal 1D In-Place)

### Intuition

This "optimal" version goes one step further: it updates the 1D array in-place without creating a second array. The main challenge with in-place updates is that some transitions need the diagonal value `dp[i + 1][j + 1]`. When we compress to 1D, that diagonal value gets overwritten while we move left through `j`.

To handle this, we keep one extra variable (`dp1`) that stores the previous diagonal value as we update the row.

### Algorithm

1. Create a 1D boolean array `dp` of size `len(p) + 1`. Initialize `dp[len(p)] = True`.
2. Iterate `i` from `len(s)` down to `0`:
* Save the old end value in `dp1` (acts as the diagonal).
* Update `dp[len(p)] = (i == len(s))`.
* Iterate `j` from `len(p) - 1` down to `0`:
* Compute `match`.
* If next character is `*`, resolve using `dp[j + 2]` and `dp[j]`.
* Otherwise, if `match`, the result is the diagonal `dp1`.
* Shift the diagonal tracker: set `dp1` to the old `dp[j]` value before updating `dp[j]` with the new result.




3. Return `dp[0]`.

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        dp = [False] * (len(p) + 1)
        dp[len(p)] = True

        for i in range(len(s), -1, -1):
            dp1 = dp[len(p)]
            dp[len(p)] = (i == len(s))

            for j in range(len(p) - 1, -1, -1):
                match = i < len(s) and (s[i] == p[j] or p[j] == ".")
                res = False
                
                if (j + 1) < len(p) and p[j + 1] == "*":
                    res = dp[j + 2]
                    if match:
                        res |= dp[j]
                elif match:
                    res = dp1
                    
                # Update current cell, and track the old cell for the next diagonal
                dp[j], dp1 = res, dp[j]

        return dp[0]

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(n)$
