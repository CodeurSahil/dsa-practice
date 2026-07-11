![Set Matrix Zeroes](/asset/images/SetMatrixZeroes.png)
![Set Matrix Zeroes](/asset/images/SetMatrixZeroes2.png)

---

## 1. Brute Force (Using a Matrix Copy)

### Intuition
We need to modify the matrix so that if any cell is 0, then its entire row and entire column become 0. The main challenge is that if we change cells to 0 while scanning, those newly created zeros could incorrectly force more rows/columns to be zeroed in a cascading effect.

To avoid this, the brute force approach uses a completely separate copy of the matrix:
* We read zeros from the original matrix.
* We write the row/column changes into the copy.
* At the end, we copy the final values back.

This keeps the logic simple and prevents accidental cascading updates.

### Algorithm
1. Let `ROWS` and `COLS` be the matrix dimensions.
2. Create a copy matrix `mark` with the exact same values as the original matrix.
3. Traverse every cell `(r, c)` in the original matrix:
   * If `matrix[r][c] == 0`:
     * Set all cells in row `r` of `mark` to 0.
     * Set all cells in column `c` of `mark` to 0.
4. After processing all zeros, copy every value from `mark` back into `matrix`.
5. The original matrix is now updated correctly.

```python
from typing import List

class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        ROWS, COLS = len(matrix), len(matrix[0])
        mark = [[matrix[r][c] for c in range(COLS)] for r in range(ROWS)]

        for r in range(ROWS):
            for c in range(COLS):
                if matrix[r][c] == 0:
                    for col in range(COLS):
                        mark[r][col] = 0
                    for row in range(ROWS):
                        mark[row][c] = 0

        for r in range(ROWS):
            for c in range(COLS):
                matrix[r][c] = mark[r][c]

```

* **Time Complexity:** $O((m \cdot n) \cdot (m + n))$ where $m$ is the number of rows and $n$ is the number of columns. For every zero, we iterate over its entire row and column.
* **Space Complexity:** $O(m \cdot n)$ to store the `mark` copy matrix.

---

## 2. Iteration (Two Marker Arrays)

### Intuition

The key challenge is to avoid modifying the matrix too early. If we directly set rows and columns to 0 while scanning, newly created zeros could incorrectly trigger more rows and columns to be zeroed.

To handle this safely without copying the whole matrix, we split the process into two passes:

* **First pass:** Record which rows and columns need to be zeroed using two flag arrays (`rows` and `cols`).
* **Second pass:** Apply the zeroing based on those records.

This keeps the logic clean and easy to reason about while reducing space complexity.

### Algorithm

1. Let `ROWS` and `COLS` be the dimensions of the matrix.
2. Create two boolean arrays:
* `rows` of size `ROWS`, initialized to `False`.
* `cols` of size `COLS`, initialized to `False`.


3. Traverse the matrix:
* If `matrix[r][c] == 0`: mark `rows[r] = True` and `cols[c] = True`.


4. Traverse the matrix again:
* If `rows[r]` is true OR `cols[c]` is true: set `matrix[r][c] = 0`.


5. The matrix is now correctly updated.

```python
from typing import List

class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        ROWS, COLS = len(matrix), len(matrix[0])
        rows, cols = [False] * ROWS, [False] * COLS

        for r in range(ROWS):
            for c in range(COLS):
                if matrix[r][c] == 0:
                    rows[r] = True
                    cols[c] = True

        for r in range(ROWS):
            for c in range(COLS):
                if rows[r] or cols[c]:
                    matrix[r][c] = 0

```

* **Time Complexity:** $O(m \cdot n)$ because we traverse the matrix twice.
* **Space Complexity:** $O(m + n)$ to store the marker arrays for rows and columns.

---

## 3. Iteration (Space Optimized In-Place)

### Intuition

The two-array solution uses extra space to remember which rows/columns should be zeroed. To optimize space to $O(1)$, we can reuse the matrix itself as the "marker storage":

* Use the **first row** to mark which columns should become zero.
* Use the **first column** to mark which rows should become zero.

One complication: `matrix[0][0]` sits at the intersection of the first row and first column, so it cannot independently represent both. To fix this, we let `matrix[0][0]` represent the first column, and keep a separate boolean variable `rowZero` to track whether the first row originally contained a zero.

### Algorithm

1. Initialize `rowZero = False`.
2. **First pass (mark rows and columns):** Traverse every cell `(r, c)`.
* If `matrix[r][c] == 0`:
* Mark the column by setting `matrix[0][c] = 0`.
* If `r > 0`, mark the row by setting `matrix[r][0] = 0`.
* If `r == 0`, set `rowZero = True` (first row needs to be zeroed).




3. **Second pass (apply markers to the inner matrix):**
* Iterate `r` from `1` to `ROWS - 1`, and `c` from `1` to `COLS - 1`.
* If `matrix[0][c] == 0` or `matrix[r][0] == 0`, set `matrix[r][c] = 0`.


4. **Handle the first column:**
* If `matrix[0][0] == 0`, zero out the entire first column.


5. **Handle the first row:**
* If `rowZero` is true, zero out the entire first row.



```python
from typing import List

class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        ROWS, COLS = len(matrix), len(matrix[0])
        rowZero = False

        # Determine which rows/cols need to be zero
        for r in range(ROWS):
            for c in range(COLS):
                if matrix[r][c] == 0:
                    # Mark column
                    matrix[0][c] = 0
                    # Mark row
                    if r > 0:
                        matrix[r][0] = 0
                    else:
                        rowZero = True

        # Zero out the inner matrix based on marks
        for r in range(1, ROWS):
            for c in range(1, COLS):
                if matrix[0][c] == 0 or matrix[r][0] == 0:
                    matrix[r][c] = 0

        # Zero out the first column if needed
        if matrix[0][0] == 0:
            for r in range(ROWS):
                matrix[r][0] = 0

        # Zero out the first row if needed
        if rowZero:
            for c in range(COLS):
                matrix[0][c] = 0

```

* **Time Complexity:** $O(m \cdot n)$ to iterate over the matrix.
* **Space Complexity:** $O(1)$ since all state is maintained inside the existing matrix and a single boolean variable.
