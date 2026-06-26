![Unique Paths](/asset/images/UniquePaths.png)
![Unique Paths](/asset/images/UniquePaths2.png)

---

## 1. Recursion (Brute Force)

### Intuition

From any cell `(i, j)` in the grid, you can only move right or down. Therefore, the total number of paths from `(i, j)` is the sum of the paths going right and the paths going down.

* If you reach the bottom-right cell, you found one valid path (return 1).
* If you go out of bounds, that path is invalid (return 0).

### Algorithm

1. Start from the top-left cell `(0, 0)`.
2. At each cell `(i, j)`:
* If `(i, j)` is the destination `(m-1, n-1)`, return `1`.
* If `(i, j)` is outside the grid, return `0`.


3. Recursively compute: `dfs(i, j + 1) + dfs(i + 1, j)`.

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:

        def dfs(i, j):
            if i == (m - 1) and j == (n - 1):
                return 1
            if i >= m or j >= n:
                return 0
            return dfs(i, j + 1) + dfs(i + 1, j)

        return dfs(0, 0)

```

* **Time Complexity:** $O(2^{m+n})$. The recursion tree branches exponentially.
* **Space Complexity:** $O(m+n)$ for the recursion stack.

---

## 2. Dynamic Programming (Top-Down Memoization)

### Intuition

In the brute-force approach, the same cell `(i, j)` is solved many times. Since the number of paths from a specific cell never changes, we can cache the result once computed. This turns an exponential time complexity into polynomial time.

### Algorithm

1. Create a 2D `memo` table initialized to `-1`.
2. Define a recursive function `dfs(i, j)`.
3. Check base cases (out of bounds, reached destination).
4. If `memo[i][j]` is already computed (not `-1`), return it.
5. Otherwise, compute paths by moving right and down, store it in `memo[i][j]`, and return it.

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        memo = [[-1] * n for _ in range(m)]
        
        def dfs(i, j):
            if i == (m - 1) and j == (n - 1):
                return 1
            if i >= m or j >= n:
                return 0
            if memo[i][j] != -1:
                return memo[i][j]

            memo[i][j] = dfs(i, j + 1) + dfs(i + 1, j)
            return memo[i][j]

        return dfs(0, 0)

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(m \cdot n)$

---

## 3. Dynamic Programming (Bottom-Up 2D)

### Intuition

Instead of starting from the top and recursing, we build the answer from the destination backward. From any cell `(i, j)`, the number of unique paths to the destination is the paths from the cell below `(i+1, j)` plus paths from the cell to the right `(i, j+1)`. We fill the grid bottom-up and right-to-left.

### Algorithm

1. Create an `(m+1) \times (n+1)` DP table initialized to `0`.
2. Set `dp[m-1][n-1] = 1`.
3. Traverse rows from `m-1` down to `0` and columns from `n-1` down to `0`.
4. Update `dp[i][j] = dp[i+1][j] + dp[i][j+1]`.

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        dp[m - 1][n - 1] = 1

        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                dp[i][j] += dp[i + 1][j] + dp[i][j + 1]

        return dp[0][0]

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(m \cdot n)$

---

## 4. Dynamic Programming (Space Optimized 1D)

### Intuition

Notice that each cell only depends on the cell to its right (same row) and the cell below it (previous row processed). Instead of storing the entire 2D grid, we can keep just one row at a time, updating it from right to left.

### Algorithm

1. Initialize a 1D array `row` of size `n` with all `1`s (representing the bottom row).
2. Repeat for `m - 1` rows:
* Create a `newRow` filled with `1`s.
* Traverse columns from right to left (excluding the last column).
* Update: `newRow[j] = newRow[j + 1] + row[j]`.
* Replace `row` with `newRow`.



```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        row = [1] * n

        for i in range(m - 1):
            newRow = [1] * n
            for j in range(n - 2, -1, -1):
                newRow[j] = newRow[j + 1] + row[j]
            row = newRow
        return row[0]

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(n)$

---

## 5. Dynamic Programming (Highly Optimal 1D)

### Intuition

We can optimize the space even further. Since each row only depends on the row below it, a single 1D array is enough. We update it in place from right to left, accumulating paths.

### Algorithm

1. Initialize a 1D array `dp` of size `n` with all `1`s.
2. For each remaining row (from bottom to top), traverse columns from right to left.
3. Update `dp[j] = dp[j] + dp[j + 1]`.

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [1] * n
        for i in range(m - 2, -1, -1):
            for j in range(n - 2, -1, -1):
                dp[j] += dp[j + 1]

        return dp[0]

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(n)$

---

## 6. Math (Combinatorics)

### Intuition

To go from the top-left to the bottom-right of an $m \times n$ grid, you must make exactly $(m - 1)$ down moves and $(n - 1)$ right moves. The total number of moves is $(m + n - 2)$.
The problem simply asks: In how many different ways can we arrange these right and down moves? This is calculated using combinations:


$$ \binom{m+n-2}{n-1} $$

### Algorithm

1. If $m = 1$ or $n = 1$, return `1`.
2. Use the smaller value between $m$ and $n$ to minimize calculation steps.
3. Compute the combination iteratively to prevent overflow/excessive memory usage from factorials.

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        if m == 1 or n == 1:
            return 1
        if m < n:
            m, n = n, m

        res = j = 1
        for i in range(m, m + n - 1):
            res *= i
            res //= j
            j += 1

        return res

```

* **Time Complexity:** $O(\min(m, n))$
* **Space Complexity:** $O(1)$

---
