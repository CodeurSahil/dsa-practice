![Suduko 1](/asset/images/validSudoku1.png)
![Suduko 2](/asset/images/validSudoku2.png)

### 1\. Three-Pass Validation

This approach validates the board in **three separate stages**. It first iterates through all rows to check for duplicates, then through all columns, and finally through all 3x3 sub-boxes, using a `Set` in each stage to track seen numbers.  sudoku:

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @return {boolean}
     */
    isValidSudoku(board) {
        // Check rows
        for (let row = 0; row < 9; row++) {
            let seen = new Set();
            for (let i = 0; i < 9; i++) {
                if (board[row][i] === '.') continue;
                if (seen.has(board[row][i])) return false;
                seen.add(board[row][i]);
            }
        }

        // Check columns
        for (let col = 0; col < 9; col++) {
            let seen = new Set();
            for (let i = 0; i < 9; i++) {
                if (board[i][col] === '.') continue;
                if (seen.has(board[i][col])) return false;
                seen.add(board[i][col]);
            }
        }

        // Check 3x3 squares
        for (let square = 0; square < 9; square++) {
            let seen = new Set();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let row = Math.floor(square / 3) * 3 + i;
                    let col = (square % 3) * 3 + j;
                    if (board[row][col] === '.') continue;
                    if (seen.has(board[row][col])) return false;
                    seen.add(board[row][col]);
                }
            }
        }

        return true;
    }
}
```

*Note: Since the board size is fixed at 9x9, the complexity is technically constant, $O(1)$. The following notation describes the general case for an $n \\times n$ board.*

  * **Time Complexity**: $O(n^2)$
  * **Space Complexity**: $O(n)$

-----

### 2\. Hash Set (One Pass)

This is a more efficient method that checks all three conditions (rows, columns, and sub-boxes) in a **single pass** over the board. It uses three separate hash maps to store the numbers seen in each row, column, and 3x3 sub-box. 🗺️

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @return {boolean}
     */
    isValidSudoku(board) {
        const cols = new Map();
        const rows = new Map();
        const squares = new Map(); // Key = 'r/3, c/3'

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const val = board[r][c];
                if (val === '.') continue;

                const squareKey = `${Math.floor(r / 3)},${Math.floor(c / 3)}`;

                if (
                    (rows.get(r) && rows.get(r).has(val)) ||
                    (cols.get(c) && cols.get(c).has(val)) ||
                    (squares.get(squareKey) && squares.get(squareKey).has(val))
                ) {
                    return false;
                }

                if (!rows.has(r)) rows.set(r, new Set());
                if (!cols.has(c)) cols.set(c, new Set());
                if (!squares.has(squareKey)) squares.set(squareKey, new Set());

                rows.get(r).add(val);
                cols.get(c).add(val);
                squares.get(squareKey).add(val);
            }
        }
        return true;
    }
}
```

*Note: The complexity is technically constant, $O(1)$, for a fixed 9x9 board.*

  * **Time Complexity**: $O(n^2)$
  * **Space Complexity**: $O(n^2)$

-----

### 3\. Bitmasking

This highly optimized, space-efficient solution uses **integers as bitmasks** to track seen numbers. For each row, column, and sub-box, a single integer is used. The $i$-th bit of the integer is set to 1 if the number $i+1$ has been seen. This avoids the overhead of hash sets. 💡

```javascript
class Solution {
    isValidSudoku(board) {
        let rows = new Array(9).fill(0);
        let cols = new Array(9).fill(0);
        let squares = new Array(9).fill(0);

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === '.') continue;

                let val = board[r][c] - '1';
                let squareIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);
                let mask = 1 << val;

                if (
                    (rows[r] & mask) ||
                    (cols[c] & mask) ||
                    (squares[squareIndex] & mask)
                ) {
                    return false;
                }

                rows[r] |= mask;
                cols[c] |= mask;
                squares[squareIndex] |= mask;
            }
        }
        return true;
    }
}
```

*Note: The complexity is technically constant, $O(1)$, for a fixed 9x9 board.*

  * **Time Complexity**: $O(n^2)$
  * **Space Complexity**: $O(n)$