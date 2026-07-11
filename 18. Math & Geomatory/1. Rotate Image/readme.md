![Rotate Image](/asset/images/RotateImage.png)
![Rotate Image](/asset/images/RotateImage2.png)

---

## 1. Brute Force (Using Extra Space)

### Intuition
A direct and beginner-friendly way to think about this is:
* Create a new matrix where each element from the original matrix is placed in its rotated position.
* After building this rotated version, copy it back into the original matrix.

The key observation for a 90° clockwise rotation is that an element at position `(i, j)` in the original matrix moves to position `(j, n - 1 - i)` in the rotated matrix. By applying this rule to every cell, we can construct the rotated matrix easily.

### Algorithm
1. Let `n` be the size of the matrix.
2. Create a new `n x n` matrix called `rotated`, initially filled with zeros.
3. Traverse each cell `(i, j)` of the original matrix:
   * Place its value into the rotated position: `rotated[j][n - 1 - i] = matrix[i][j]`.
4. After filling the rotated matrix, copy all values back into the original matrix.
5. The original matrix is now rotated 90 degrees clockwise.

```python
from typing import List

class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        n = len(matrix)
        rotated = [[0] * n for _ in range(n)]

        for i in range(n):
            for j in range(n):
                rotated[j][n - 1 - i] = matrix[i][j]

        for i in range(n):
            for j in range(n):
                matrix[i][j] = rotated[i][j]

```

* **Time Complexity:** $O(n^2)$ to traverse the matrix twice.
* **Space Complexity:** $O(n^2)$ to store the temporary `rotated` matrix.

---

## 2. Rotate By Four Cells (In-Place)

### Intuition

We want to rotate the `n x n` matrix 90 degrees clockwise in-place, without using extra space. A useful way to visualize this is to rotate the matrix layer by layer, starting from the outermost layer and moving inward.

For each square layer, elements move in groups of four. Each element in the group shifts to its new rotated position:

* top-left $\rightarrow$ top-right
* top-right $\rightarrow$ bottom-right
* bottom-right $\rightarrow$ bottom-left
* bottom-left $\rightarrow$ top-left

By rotating these four cells at a time, we complete the rotation without needing an extra matrix.

### Algorithm

1. Initialize two pointers: `l = 0` (left boundary) and `r = n - 1` (right boundary).
2. While `l < r` (process each layer):
* For each position `i` in the current layer (from `0` to `r - l - 1`):
* Identify: `top = l` and `bottom = r`.
* Save the `topLeft` value temporarily.
* Move `bottom-left` $\rightarrow$ `top-left`.
* Move `bottom-right` $\rightarrow$ `bottom-left`.
* Move `top-right` $\rightarrow$ `bottom-right`.
* Move saved `top-left` $\rightarrow$ `top-right`.


* After finishing one layer: increment `l` and decrement `r`.


3. Continue until all layers are rotated.

```python
from typing import List

class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        l, r = 0, len(matrix) - 1
        
        while l < r:
            for i in range(r - l):
                top, bottom = l, r

                # save the topleft
                topLeft = matrix[top][l + i]

                # move bottom left into top left
                matrix[top][l + i] = matrix[bottom - i][l]

                # move bottom right into bottom left
                matrix[bottom - i][l] = matrix[bottom][r - i]

                # move top right into bottom right
                matrix[bottom][r - i] = matrix[top + i][r]

                # move top left into top right
                matrix[top + i][r] = topLeft
                
            r -= 1
            l += 1

```

* **Time Complexity:** $O(n^2)$ as we touch every element in the matrix exactly once.
* **Space Complexity:** $O(1)$ since we only use a few temporary variables.

---

## 3. Reverse And Transpose (Optimal / Most Elegant)

### Intuition

A very clean and elegant way to rotate a matrix in-place is to break the 90-degree rotation down into two simpler mathematical operations:

1. Reverse the matrix vertically.
2. Transpose the matrix.

**Why this works:**
Reversing the matrix flips it upside down. Transposing then swaps rows with columns. Doing both sequentially mathematically results in an exact 90° clockwise rotation. This method is elegant, easy to remember, and avoids complex pointer math while remaining $O(1)$ in space.

### Algorithm

1. **Reverse the matrix vertically:**
* The first row becomes the last, the second becomes the second-to-last, etc.


2. **Transpose the matrix:**
* Swap elements across the main diagonal.
* For all `i < j`, swap `matrix[i][j]` with `matrix[j][i]`.


3. The matrix is now rotated 90 degrees clockwise in-place.

```python
from typing import List

class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        # 1. Reverse the matrix vertically
        matrix.reverse()

        # 2. Transpose the matrix (swap across the main diagonal)
        for i in range(len(matrix)):
            for j in range(i + 1, len(matrix)):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

```

* **Time Complexity:** $O(n^2)$. Reversing takes $O(n^2)$, and transposing takes $O(n^2)$. Overall $O(n^2)$.
* **Space Complexity:** $O(1)$ as operations are performed entirely in-place.
