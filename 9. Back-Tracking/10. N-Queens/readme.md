![N-Queens](/asset/images/N-Queens.png)
![N-Queens](/asset/images/N-Queens2.png)

-----

### 1\. Backtracking

This is a standard backtracking solution. For each row, it tries placing a queen in every column. To check if a placement is safe (`isSafe`), it manually iterates up the board to check the current column and both diagonals.

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {string[][]}
     */
    solveNQueens(n) {
        let res = [];
        let board = Array.from({ length: n }, () => Array(n).fill('.'));

        const backtrack = (r) => {
            if (r === n) {
                res.push(board.map((row) => row.join('')));
                return;
            }
            for (let c = 0; c < n; c++) {
                if (this.isSafe(r, c, board)) {
                    board[r][c] = 'Q';
                    backtrack(r + 1);
                    board[r][c] = '.';
                }
            }
        };

        backtrack(0);
        return res;
    }

    /**
     * @param {number} r
     * @param {number} c
     * @param {string[][]} board
     * @return {boolean}
     */
    isSafe(r, c, board) {
        // Check column
        for (let i = r - 1; i >= 0; i--) {
            if (board[i][c] === 'Q') return false;
        }
        // Check positive diagonal (top-left)
        for (let i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        // Check negative diagonal (top-right)
        for (let i = r - 1, j = c + 1; i >= 0 && j < board.length; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        return true;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n!)$
  * **Space complexity**: $O(n^2)$

-----

### 2\. Backtracking (Hash Set Optimization)

This solution significantly optimizes the `isSafe` check. Instead of re-scanning the board, it uses three `Set`s to maintain $O(1)$ lookups for occupied columns, positive diagonals (`r + c`), and negative diagonals (`r - c`).

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {string[][]}
     */
    solveNQueens(n) {
        const col = new Set();
        const posDiag = new Set(); // r + c
        const negDiag = new Set(); // r - c

        const res = [];
        const board = Array.from({ length: n }, () => Array(n).fill('.'));

        /**
         * @param {number} r
         * @return {void}
         */
        function backtrack(r) {
            if (r === n) {
                res.push(board.map((row) => row.join('')));
                return;
            }

            for (let c = 0; c < n; c++) {
                if (col.has(c) || posDiag.has(r + c) || negDiag.has(r - c)) {
                    continue;
                }

                col.add(c);
                posDiag.add(r + c);
                negDiag.add(r - c);
                board[r][c] = 'Q';

                backtrack(r + 1);

                col.delete(c);
                posDiag.delete(r + c);
                negDiag.delete(r - c);
                board[r][c] = '.';
            }
        }

        backtrack(0);
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n!)$
  * **Space complexity**: $O(n^2)$

-----

### 3\. Backtracking (Visited Array Optimization)

This is identical in logic to the Hash Set approach but uses fixed-size boolean arrays instead of `Set`s, which can be slightly more performant. It uses `r - c + n` to offset the index for the negative diagonal, ensuring it's always positive.

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {string[][]}
     */
    solveNQueens(n) {
        const col = Array(n).fill(false);
        const posDiag = Array(2 * n).fill(false);
        const negDiag = Array(2 * n).fill(false);
        const res = [];
        const board = Array.from({ length: n }, () => Array(n).fill('.'));

        /**
         * @param {number} r
         * @return {void}
         */
        function backtrack(r) {
            if (r === n) {
                res.push(board.map((row) => row.join('')));
                return;
            }
            for (let c = 0; c < n; c++) {
                if (col[c] || posDiag[r + c] || negDiag[r - c + n]) {
                    continue;
                }
                col[c] = true;
                posDiag[r + c] = true;
                negDiag[r - c + n] = true;
                board[r][c] = 'Q';

                backtrack(r + 1);

                col[c] = false;
                posDiag[r + c] = false;
                negDiag[r - c + n] = false;
                board[r][c] = '.';
            }
        }

        backtrack(0);
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n!)$
  * **Space complexity**: $O(n^2)$

-----

### 4\. Backtracking (Bitmask Optimization)

This is the most highly optimized solution, replacing the $O(n)$ arrays/sets with $O(1)$ integers used as **bitmasks**. Checking for a conflict in a column or diagonal becomes a single $O(1)$ bitwise AND operation.

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {string[][]}
     */
    solveNQueens(n) {
        let col = 0,
            posDiag = 0,
            negDiag = 0;
        const res = [];
        const board = Array.from({ length: n }, () => Array(n).fill('.'));

        /**
         * @param {number} r
         * @return {void}
         */
        function backtrack(r) {
            if (r === n) {
                res.push(board.map((row) => row.join('')));
                return;
            }
            for (let c = 0; c < n; c++) {
                if (
                    (col & (1 << c)) > 0 ||
                    (posDiag & (1 << (r + c))) > 0 ||
                    (negDiag & (1 << (r - c + n))) > 0
                ) {
                    continue;
                }
                col ^= 1 << c;
                posDiag ^= 1 << (r + c);
                negDiag ^= 1 << (r - c + n);
                board[r][c] = 'Q';

                backtrack(r + 1);

                col ^= 1 << c;
                posDiag ^= 1 << (r + c);
                negDiag ^= 1 << (r - c + n);
                board[r][c] = '.';
            }
        }

        backtrack(0);
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n!)$
  * **Space complexity**: $O(n^2)$