![Interleaving String](/asset/images/InterleavingString.png)
![Interleaving String](/asset/images/InterleavingString2.png)
![Interleaving String](/asset/images/InterleavingString3.png)

---

## 1. Recursion (Brute Force)

### Intuition

At any position `k` in `s3`, we have at most two choices:

1. Take the next character from `s1` (if it matches `s3[k]`).
2. Take the next character from `s2` (if it matches `s3[k]`).

Using recursion, we explore all valid ways of building `s3` character by character. The recursive function `dfs(i, j, k)` answers: *"Can we form `s3` starting from index `k`, using characters from `s1` starting at `i` and `s2` starting at `j`?"* If we successfully consume all characters of `s3` and reach the end of both `s1` and `s2`, then `s3` is a valid interleaving.

### Algorithm

1. Define a recursive function `dfs(i, j, k)`.
2. **Base Case:** If `k == len(s3)`, return `True` only if `i == len(s1)` and `j == len(s2)`.
3. If the next character of `s1` matches `s3[k]`, recurse by taking the character from `s1`. If it returns `True`, return `True`.
4. If the next character of `s2` matches `s3[k]`, recurse by taking the character from `s2`. If it returns `True`, return `True`.
5. If neither choice works, return `False`.

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:

        def dfs(i, j, k):
            if k == len(s3):
                return (i == len(s1)) and (j == len(s2))

            if i < len(s1) and s1[i] == s3[k]:
                if dfs(i + 1, j, k + 1):
                    return True

            if j < len(s2) and s2[j] == s3[k]:
                if dfs(i, j + 1, k + 1):
                    return True

            return False

        return dfs(0, 0, 0)

```

* **Time Complexity:** $O(2^{m+n})$. The recursion tree splits into two branches whenever both `s1` and `s2` match `s3`.
* **Space Complexity:** $O(m+n)$ for the recursion stack.

---

## 2. Dynamic Programming (Top-Down Memoization)

### Intuition

The recursive approach explores all possible interleavings, but many states repeat (e.g., reaching the same index `i` in `s1` and `j` in `s2` through different paths). To make it efficient, we use memoization.

Notice that the position `k` in `s3` is always determined by how many characters we have already taken from `s1` and `s2` (i.e., `k = i + j`). Therefore, the state can be defined using just `i` and `j`.

### Algorithm

1. First, check if the lengths of `s1` and `s2` add up to the length of `s3`. If not, return `False`.
2. Create a memoization dictionary `dp` keyed by the tuple `(i, j)`.
3. Inside the `dfs` function, check if the state `(i, j)` is already in `dp`. If so, return it.
4. Try taking from `s1` or `s2`. Store the resulting boolean in `dp[(i, j)]` and return it.

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        if len(s1) + len(s2) != len(s3):
            return False

        dp = {}
        def dfs(i, j, k):
            if k == len(s3):
                return (i == len(s1)) and (j == len(s2))
            
            if (i, j) in dp:
                return dp[(i, j)]

            res = False
            if i < len(s1) and s1[i] == s3[k]:
                res = dfs(i + 1, j, k + 1)
                
            if not res and j < len(s2) and s2[j] == s3[k]:
                res = dfs(i, j + 1, k + 1)

            dp[(i, j)] = res
            return res

        return dfs(0, 0, 0)

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(m \cdot n)$ for the memo dictionary and recursion stack.

---

## 3. Dynamic Programming (Bottom-Up 2D)

### Intuition

Instead of recursion, we can solve this iteratively by building a 2D DP table. The value `dp[i][j]` represents whether it is possible to form the suffix of `s3` starting at position `i + j` using the suffix `s1[i:]` and the suffix `s2[j:]`. We fill the table in reverse (from the end of the strings to the beginning).

### Algorithm

1. Check if `len(s1) + len(s2) == len(s3)`.
2. Create a 2D DP table `dp` of size `(len(s1) + 1) x (len(s2) + 1)`.
3. Initialize the base case: `dp[len(s1)][len(s2)] = True`.
4. Iterate backward through `s1` (index `i`) and `s2` (index `j`).
5. Set `dp[i][j] = True` if:
* `s1[i] == s3[i+j]` AND the cell below (`dp[i+1][j]`) is `True`.
* `s2[j] == s3[i+j]` AND the cell to the right (`dp[i][j+1]`) is `True`.


6. Return `dp[0][0]`.

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        if len(s1) + len(s2) != len(s3):
            return False

        dp = [[False] * (len(s2) + 1) for i in range(len(s1) + 1)]
        dp[len(s1)][len(s2)] = True

        for i in range(len(s1), -1, -1):
            for j in range(len(s2), -1, -1):
                if i < len(s1) and s1[i] == s3[i + j] and dp[i + 1][j]:
                    dp[i][j] = True
                if j < len(s2) and s2[j] == s3[i + j] and dp[i][j + 1]:
                    dp[i][j] = True
                    
        return dp[0][0]

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(m \cdot n)$ for the 2D array.

---

## 4. Dynamic Programming (Space Optimized 2-Row)

### Intuition

Notice that to compute row `i` in the 2D DP table, we only need information from the row below it (`i + 1`) and the current row as we move left. We don't need the full 2D table. We can keep just one `dp` array representing the row below, and generate a `nextDp` array for the current row. We also swap the strings if necessary to ensure the 1D array is as small as possible.

### Algorithm

1. Swap `s1` and `s2` if `len(s2) < len(s1)` to minimize space. Let lengths be $m$ and $n$.
2. Create a 1D array `dp` of size `n + 1` representing the bottom row. Set `dp[n] = True`.
3. Iterate `i` from $m$ down to 0:
* Create `nextDp` initialized to `False`.
* Set `nextDp[n] = True` if `i == m`.
* Iterate `j` from $n$ down to 0:
* Check if `s1[i]` matches and `dp[j]` is True.
* Check if `s2[j]` matches and `nextDp[j+1]` is True.


* Assign `dp = nextDp`.


4. Return `dp[0]`.

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False
        if n < m:
            s1, s2 = s2, s1
            m, n = n, m

        dp = [False for _ in range(n + 1)]
        dp[n] = True
        
        for i in range(m, -1, -1):
            nextDp = [False for _ in range(n + 1)]
            if i == m:
                nextDp[n] = True
                
            for j in range(n, -1, -1):
                if i < m and s1[i] == s3[i + j] and dp[j]:
                    nextDp[j] = True
                if j < n and s2[j] == s3[i + j] and nextDp[j + 1]:
                    nextDp[j] = True
            dp = nextDp
            
        return dp[0]

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(\min(m, n))$

---

## 5. Dynamic Programming (Optimal 1D In-Place)

### Intuition

We can optimize the space even further. Instead of creating a separate `nextDp` array for the current row, we can update the 1D array *in-place*. We just need to keep a single variable (`nextDp`) to track the value of the "right neighbor" before it gets overwritten, allowing us to evaluate the current cell using the newly updated right cell and the old bottom cell.

### Algorithm

1. Swap strings so `s2` is the longer one.
2. Initialize `dp` of size `n + 1` with `False`. Set `dp[n] = True`.
3. Iterate `i` from $m$ down to 0:
* Maintain a `nextDp` variable tracking the cell to the right.
* Iterate `j` from $n$ down to 0:
* Evaluate if the state is valid by checking `dp[j]` (representing `s1` match looking down) or `nextDp` (representing `s2` match looking right).
* Update `dp[j]` in place.
* Update `nextDp = dp[j]` for the next iteration to the left.




4. Return `dp[0]`.

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False
        if n < m:
            s1, s2 = s2, s1
            m, n = n, m

        dp = [False for _ in range(n + 1)]
        dp[n] = True
        
        for i in range(m, -1, -1):
            nextDp = True if i == m else False
            for j in range(n, -1, -1):
                res = False if j < n else nextDp
                
                if i < m and s1[i] == s3[i + j] and dp[j]:
                    res = True
                if j < n and s2[j] == s3[i + j] and nextDp:
                    res = True
                    
                dp[j] = res
                nextDp = dp[j]
                
        return dp[0]

```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(\min(m, n))$



