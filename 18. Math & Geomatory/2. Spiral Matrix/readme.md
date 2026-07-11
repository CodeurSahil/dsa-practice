![Spiral Matrix](/asset/images/SpiralMatrix.png)
![Spiral Matrix](/asset/images/SpiralMatrix2.png)

---

## 1. Recursion (DFS)

### Intuition

We want to print the matrix in spiral order. This solution treats the spiral as a sequence of smaller and smaller "rings". Each ring can be described by:

* How many rows are left to cover.

* How many columns are left to cover.

* A current position `(r, c)`.

* A direction `(dr, dc)` that tells us where to move next.

At each step, we do two things:

1. Walk straight in the current direction and append all elements along that edge.

2. Shrink the problem and rotate the direction for the next edge.

After moving along one edge, the remaining unvisited area becomes a smaller rectangle, and the next direction is obtained by "turning right" (changing the `(dr, dc)` vector).

### Algorithm

1. Keep an answer list `res`.

2. Define a recursive function `dfs(row, col, r, c, dr, dc)`:

   * **Base case:** If `row == 0` or `col == 0`, stop (nothing left to traverse).

   * Move `col` steps in the current direction: update `(r, c)` by `(dr, dc)` and append `matrix[r][c]` to `res`.

   * Recursively solve the smaller sub-rectangle:

     * Swap the roles of `row` and `col` (because after turning, the width and height swap roles).

     * Reduce the new width by 1 (one side was fully consumed).

     * Rotate the direction to turn right: new direction is `(dc, -dr)`.

3. Start the recursion by moving right from just outside the matrix: position `(0, -1)` with direction `(0, 1)`.

4. Return `res`.

```python
from typing import List

class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        m, n = len(matrix), len(matrix[0])
        res = []

        # append all the elements in the given direction
        def dfs(row, col, r, c, dr, dc):
            if row == 0 or col == 0:
                return

            for i in range(col):
                r += dr
                c += dc
                res.append(matrix[r][c])

            # sub-problem (swap dimensions, reduce one side, turn right)
            dfs(col, row - 1, r, c, dc, -dr)

        # start by going to the right
        dfs(m, n, 0, -1, 0, 1)
        return res


```

* **Time Complexity:** $O(m \cdot n)$ where $m$ is the number of rows and $n$ is the number of columns.
* **Space Complexity:** $O(\min(m, n))$ extra space for the recursion stack, plus $O(m \cdot n)$ for the output list.

## 2. Iteration (Layer-by-Layer Traversal)

### Intuition

A clean iterative way to traverse a matrix in spiral order is to maintain four boundaries:

* `top` $\rightarrow$ the topmost unvisited row
* `bottom` $\rightarrow$ one past the bottommost unvisited row
* `left` $\rightarrow$ the leftmost unvisited column
* `right` $\rightarrow$ one past the rightmost unvisited column

At each step, we walk along the current outer boundary in four specific directions: left to right, top to bottom, right to left, and bottom to top. After each pass, we shrink the boundaries inward.

### Algorithm

1. Initialize `res` as an empty list.
2. Set boundaries: `left = 0`, `right = len(matrix[0])`, `top = 0`, `bottom = len(matrix)`.
3. While there is still an unvisited rectangle (`left < right` and `top < bottom`):
* Traverse the top row from `left` to `right - 1` and append elements. Increment `top`.
* Traverse the right column from `top` to `bottom - 1` and append elements. Decrement `right`.
* If the remaining rectangle is invalid (`left >= right` or `top >= bottom`), break to prevent duplicates.
* Traverse the bottom row from `right - 1` down to `left` and append elements. Decrement `bottom`.
* Traverse the left column from `bottom - 1` up to `top` and append elements. Increment `left`.


4. Return `res`.

```python
from typing import List

class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        res = []
        left, right = 0, len(matrix[0])
        top, bottom = 0, len(matrix)

        while left < right and top < bottom:
            # Move left to right
            for i in range(left, right):
                res.append(matrix[top][i])
            top += 1
            
            # Move top to bottom
            for i in range(top, bottom):
                res.append(matrix[i][right - 1])
            right -= 1
            
            # Check if boundaries crossed
            if not (left < right and top < bottom):
                break
                
            # Move right to left
            for i in range(right - 1, left - 1, -1):
                res.append(matrix[bottom - 1][i])
            bottom -= 1
            
            # Move bottom to top
            for i in range(bottom - 1, top - 1, -1):
                res.append(matrix[i][left])
            left += 1

        return res


```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(1)$ extra space, $O(m \cdot n)$ space for the output list.

## 3. Iteration (Optimal - Direction Simulation)

### Intuition

Instead of keeping four boundaries (`top`, `bottom`, `left`, `right`), this approach tracks:

1. The current direction (right, down, left, up).
2. How many steps we can take in the current direction before turning.

The key idea is that spiral traversal alternates between moving along a row length and a column length:

* First, move right `cols` steps.
* Then down `rows - 1` steps.
* Then left `cols - 1` steps.
* Then up `rows - 2` steps, and so on...

After completing a direction, the available steps in that "dimension" shrink by 1. We store the remaining step counts in an array where `steps[0]` handles horizontal moves and `steps[1]` handles vertical moves. The bitwise check `d & 1` tells us whether the current direction is horizontal (`0`) or vertical (`1`).

### Algorithm

1. Create a list of direction vectors in clockwise order: right `(0, 1)`, down `(1, 0)`, left `(0, -1)`, up `(-1, 0)`.
2. Initialize step counts: `steps[0] = len(matrix[0])` (columns) and `steps[1] = len(matrix) - 1` (rows - 1).
3. Start just outside the matrix at `(r, c) = (0, -1)` so the first move lands on `(0, 0)`.
4. Set direction index `d = 0` (start moving right).
5. While the current step count `steps[d & 1]` is greater than 0:
* Move `steps[d & 1]` times in direction `d`:
* Update `(r, c)` by the direction vector.
* Append `matrix[r][c]` to the result.


* After finishing those moves, shrink the step count for that dimension: `steps[d & 1] -= 1`.
* Turn to the next direction: `d = (d + 1) % 4`.


6. Return the result list.

```python
from typing import List

class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        res = []
        directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        steps = [len(matrix[0]), len(matrix) - 1]

        r, c, d = 0, -1, 0
        while steps[d & 1]:
            for i in range(steps[d & 1]):
                r += directions[d][0]
                c += directions[d][1]
                res.append(matrix[r][c])
                
            steps[d & 1] -= 1
            d += 1
            d %= 4
            
        return res


```

* **Time Complexity:** $O(m \cdot n)$
* **Space Complexity:** $O(1)$ extra space, $O(m \cdot n)$ space for the output list.
