![Search a 2D Matrix](/asset/images/Searcha2DMatrix.png)
![Search a 2D Matrix](/asset/images/Searcha2DMatrix2.png)

### 1\. Brute Force

This method involves a **linear scan** of the entire matrix, row by row and column by column, until the target is found or the matrix is exhausted. It's the simplest solution but doesn't use the sorted properties of the matrix. 🐢

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @param {number} target
     * @return {boolean}
     */
    searchMatrix(matrix, target) {
        for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix[r].length; c++) {
                if (matrix[r][c] == target) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(m \cdot n)$
  * **Space Complexity**: $O(1)$

(Where $m$ is the number of rows and $n$ is the number of columns.)

-----

### 2\. Staircase Search

This clever approach takes advantage of the matrix's sorted structure. We start at the **top-right corner**. If the target is smaller, we move left (as the current column is now too large). If the target is larger, we move down (as the current row is now too small). This path "walks" through the matrix, eliminating a row or column at each step. 🚶‍♂️

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @param {number} target
     * @return {boolean}
     */
    searchMatrix(matrix, target) {
        const m = matrix.length,
            n = matrix[0].length;
        let r = 0,
            c = n - 1;

        while (r < m && c >= 0) {
            if (matrix[r][c] > target) {
                c--;
            } else if (matrix[r][c] < target) {
                r++;
            } else {
                return true;
            }
        }
        return false;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(m + n)$
  * **Space Complexity**: $O(1)$

(Where $m$ is the number of rows and $n$ is the number of columns.)

-----

### 3\. Binary Search (Two-Pass)

This method applies binary search twice.

1.  First, it performs a **binary search on the rows** (specifically, on the first or last element of each row) to quickly find which row the target *should* be in.
2.  Second, it performs a **binary search within that specific row** to find the target. 🔍

<!-- end list -->

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @param {number} target
     * @return {boolean}
     */
    searchMatrix(matrix, target) {
        const ROWS = matrix.length;
        const COLS = matrix[0].length;

        // 1. Binary search for the correct row
        let top = 0;
        let bot = ROWS - 1;
        while (top <= bot) {
            const row = Math.floor((top + bot) / 2);
            if (target > matrix[row][COLS - 1]) {
                top = row + 1;
            } else if (target < matrix[row][0]) {
                bot = row - 1;
            } else {
                break;
            }
        }

        if (!(top <= bot)) {
            return false; // Row not found
        }

        // 2. Binary search within the found row
        const row = Math.floor((top + bot) / 2);
        let l = 0;
        let r = COLS - 1;
        while (l <= r) {
            const m = Math.floor((l + r) / 2);
            if (target > matrix[row][m]) {
                l = m + 1;
            } else if (target < matrix[row][m]) {
                r = m - 1;
            } else {
                return true;
            }
        }
        return false;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(\log m + \log n) = O(\log(m \cdot n))$
  * **Space Complexity**: $O(1)$

(Where $m$ is the number of rows and $n$ is the number of columns.)

-----

### 4\. Binary Search (One-Pass)

This is the most optimal solution. It treats the 2D matrix as a **single, flat, sorted 1D array** of size $m \cdot n$. It then performs a standard binary search on this "virtual" array, using simple math (division and modulo) to map the 1D midpoint index back to its corresponding `(row, col)` in the 2D matrix. ✅

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @param {number} target
     * @return {boolean}
     */
    searchMatrix(matrix, target) {
        let ROWS = matrix.length,
            COLS = matrix[0].length;

        let l = 0,
            r = ROWS * COLS - 1;
        while (l <= r) {
            let m = l + Math.floor((r - l) / 2);
            let row = Math.floor(m / COLS),
                col = m % COLS;
            
            if (target > matrix[row][col]) {
                l = m + 1;
            } else if (target < matrix[row][col]) {
                r = m - 1;
            } else {
                return true;
            }
        }
        return false;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(\log(m \cdot n))$
  * **Space Complexity**: $O(1)$

(Where $m$ is the number of rows and $n$ is the number of columns.)