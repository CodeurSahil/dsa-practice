![Longest Increasing Path in a Matrix](/asset/images/LongestIncreasingPathinaMatrix.png)
![Longest Increasing Path in a Matrix](/asset/images/LongestIncreasingPathinaMatrix2.png)
![Longest Increasing Path in a Matrix](/asset/images/LongestIncreasingPathinaMatrix3.png)

---

## 1. Recursion (Brute Force)

### Intuition

A natural way to solve this is to try starting from *every* cell and explore all increasing paths using Depth-First Search (DFS). From a given cell, we look at its 4 neighbors. We only walk to a neighboring cell if its value is strictly greater than the current cell's value.

The recursive function answers: *"What is the longest increasing path starting from cell `(r, c)`, given that the previous value was `prevVal`?"* If the move goes out of bounds or the next value is not strictly larger, that path ends.

### Algorithm

1. Store the 4 possible movement directions (up, down, left, right).

2. Define a recursive function `dfs(r, c, prevVal)`:

   * If `(r, c)` is outside the grid, or `matrix[r][c] <= prevVal`, return `0`.

   * Otherwise, start with `res = 1` (the current cell counts as length 1).

   * Try all 4 directions and take the maximum: `1 + dfs(next_r, next_c, matrix[r][c])`.

3. For every cell in the matrix, call `dfs(r, c, -infinity)` so the first cell is always allowed.

4. Track and return the maximum result over all starting cells.

```python
from typing import List

class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        ROWS, COLS = len(matrix), len(matrix[0])
        directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

        def dfs(r, c, prevVal):
            if (min(r, c) < 0 or r >= ROWS or
                c >= COLS or matrix[r][c] <= prevVal
            ):
                return 0

            res = 1
            for d in directions:
                res = max(res, 1 + dfs(r + d[0], c + d[1], matrix[r][c]))
            return res

        LIP = 0
        for r in range(ROWS):
            for c in range(COLS):
                LIP = max(LIP, dfs(r, c, float('-inf')))
        return LIP


```

* **Time Complexity:** $O(m \cdot n \cdot 4^{m \cdot n})$. The recursion explores every possible path, branching up to 4 ways at each step.
* **Space Complexity:** $O(m \cdot n)$ for the recursion stack.

## 2. Dynamic Programming (Top-Down Memoization)

### Intuition

The brute-force DFS tries the same paths repeatedly. The key realization is that **if we start from the same cell `(r, c)`, the longest increasing path from that cell is always exactly the same.** Instead of recomputing it, we can store the result in a cache (`dp`). We drop the `prevVal` argument from our state by handling the increasing-check *before* making the recursive call. The function now simply asks: *"What is the longest increasing path starting from cell `(r, c)`?"*

### Algorithm

1. Create a dictionary `dp` where `dp[(r, c)]` stores the length of the longest increasing path starting from `(r, c)`.
2. Define `dfs(r, c, prevVal)`:
* If out of bounds or `matrix[r][c] <= prevVal`, return `0`.
* If `(r, c)` is already in `dp`, return `dp[(r, c)]`.
* Initialize `res = 1`. Explore all 4 directions, recursively calling `dfs` and taking the max.
* Store the result in `dp[(r, c)]` and return it.


3. Call `dfs` from every cell to ensure all `dp` values are populated.
4. Return the absolute maximum value stored in the `dp` cache.

```python
from typing import List

class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        ROWS, COLS = len(matrix), len(matrix[0])
        dp = {}  # (r, c) -> LIP

        def dfs(r, c, prevVal):
            if (r < 0 or r == ROWS or c < 0 or
                c == COLS or matrix[r][c] <= prevVal
            ):
                return 0
            if (r, c) in dp:
                return dp[(r, c)]

            res = 1
            res = max(res, 1 + dfs(r + 1, c, matrix[r][c]))
            res = max(res, 1 + dfs(r - 1, c, matrix[r][c]))
            res = max(res, 1 + dfs(r, c + 1, matrix[r][c]))
            res = max(res, 1 + dfs(r, c - 1, matrix[r][c]))
            
            dp[(r, c)] = res
            return res

        for r in range(ROWS):
            for c in range(COLS):
                dfs(r, c, -1)
                
        return max(dp.values())


```

* **Time Complexity:** $O(m \cdot n)$. We calculate the longest path for each cell exactly once.
* **Space Complexity:** $O(m \cdot n)$ for the `dp` cache and recursion stack.

## 3. Topological Sort (Kahn's Algorithm)

### Intuition

We can think of the matrix as a directed graph. Each cell is a node, and we draw a directed edge from a smaller value to a strictly larger neighboring value. Because edges always go from smaller to larger, it's impossible to form a cycle. Therefore, the matrix forms a **Directed Acyclic Graph (DAG)**.

In a DAG, the longest path can be found using a layer-by-layer Topological Sort.

* Nodes with `indegree == 0` are local minima. They have no smaller neighbors pointing into them. We start our Breadth-First Search (BFS) from all these nodes.
* Processing and removing one layer of nodes "unlocks" the next layer of larger nodes.
* The total number of layers processed before the queue empties is exactly the length of the longest increasing path.

### Algorithm

1. Treat each cell as a node. Create an `indegree` matrix of the same size.
2. Calculate indegrees: For each cell, check its 4 neighbors. If a neighbor is smaller, increment the current cell's indegree.
3. Initialize a queue with all cells that have an `indegree` of 0.
4. Perform BFS in layers. For each layer:
* Pop all current nodes in the queue.
* For each popped cell, check its 4 neighbors.
* If a neighbor is larger, decrement that neighbor's indegree (effectively removing the edge).
* If the neighbor's indegree reaches 0, push it into the queue.
* Increment the `LIS` (Longest Increasing Sequence) counter.


5. Return the `LIS` counter.

```python
from typing import List
from collections import deque

class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        ROWS, COLS = len(matrix), len(matrix[0])
        directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
        indegree = [[0] * COLS for _ in range(ROWS)]

        # Step 1 & 2: Build the indegree matrix
        for r in range(ROWS):
            for c in range(COLS):
                for d in directions:
                    nr, nc = d[0] + r, d[1] + c
                    if (0 <= nr < ROWS and 0 <= nc < COLS and
                        matrix[nr][nc] < matrix[r][c]
                    ):
                        indegree[r][c] += 1

        # Step 3: Enqueue all local minima (indegree 0)
        q = deque()
        for r in range(ROWS):
            for c in range(COLS):
                if indegree[r][c] == 0:
                    q.append([r, c])

        # Step 4: BFS layer by layer
        LIS = 0
        while q:
            for _ in range(len(q)):
                r, c = q.popleft()
                for d in directions:
                    nr, nc = r + d[0], c + d[1]
                    # If the neighbor is larger, we can move to it
                    if (0 <= nr < ROWS and 0 <= nc < COLS and
                        matrix[nr][nc] > matrix[r][c]
                    ):
                        indegree[nr][nc] -= 1
                        # If all smaller incoming paths are processed, add to queue
                        if indegree[nr][nc] == 0:
                            q.append([nr, nc])
            # Completed one full layer of nodes
            LIS += 1
            
        return LIS


```

* **Time Complexity:** $O(m \cdot n)$. Constructing the indegree matrix takes checking 4 neighbors per cell. The BFS visits every cell and edge exactly once.
* **Space Complexity:** $O(m \cdot n)$ for the `indegree` matrix and the `deque`.