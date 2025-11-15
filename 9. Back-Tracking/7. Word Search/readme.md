![Word Search](/asset/images/WordSearch.png)
![Word Search](/asset/images/WordSearch2.png)
![Word Search](/asset/images/WordSearch3.png)

-----

### 1\. Backtracking (Hash Set)

This approach uses a standard backtracking **Depth First Search (DFS)** starting from every cell. To prevent using the same letter multiple times in one path, it uses a `Set` to keep track of the coordinates of cells currently in the recursive path.

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @param {string} word
     * @return {boolean}
     */
    exist(board, word) {
        const ROWS = board.length;
        const COLS = board[0].length;
        const path = new Set();

        const dfs = (r, c, i) => {
            if (i === word.length) return true;
            if (
                r < 0 ||
                c < 0 ||
                r >= ROWS ||
                c >= COLS ||
                board[r][c] !== word[i] ||
                path.has(`${r},${c}`)
            ) {
                return false;
            }

            path.add(`${r},${c}`);
            const res =
                dfs(r + 1, c, i + 1) ||
                dfs(r - 1, c, i + 1) ||
                dfs(r, c + 1, i + 1) ||
                dfs(r, c - 1, i + 1);
            path.delete(`${r},${c}`);
            return res;
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (dfs(r, c, 0)) return true;
            }
        }
        return false;
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(m \cdot 4^n)$
  * **Space complexity**: $O(n)$

(Where $m$ is the number of cells in the `board` and $n$ is the length of the `word`.)

-----

### 2\. Backtracking (Visited Array)

This is a minor variation of the first approach. Instead of a `Set`, it uses a **2D boolean array** (`visited`) to track the current path. This is often slightly more performant as it avoids the overhead of string creation for the `Set` keys.

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @param {string} word
     * @return {boolean}
     */
    exist(board, word) {
        const ROWS = board.length;
        const COLS = board[0].length;
        const visited = Array.from({ length: ROWS }, () =>
            Array(COLS).fill(false),
        );

        const dfs = (r, c, i) => {
            if (i === word.length) return true;
            if (
                r < 0 ||
                c < 0 ||
                r >= ROWS ||
                c >= COLS ||
                board[r][c] !== word[i] ||
                visited[r][c]
            ) {
                return false;
            }

            visited[r][c] = true;
            const res =
                dfs(r + 1, c, i + 1) ||
                dfs(r - 1, c, i + 1) ||
                dfs(r, c + 1, i + 1) ||
                dfs(r, c - 1, i + 1);
            visited[r][c] = false;
            return res;
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (dfs(r, c, 0)) return true;
            }
        }
        return false;
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(m \cdot 4^n)$
  * **Space complexity**: $O(n)$ (for the recursion stack, plus $O(m)$ for the visited array)

(Where $m$ is the number of cells in the `board` and $n$ is the length of the `word`.)

-----

### 3\. Backtracking (In-Place Modification)

This is the most space-efficient solution. Instead of using a separate data structure to track visited cells, it **modifies the board in-place**. It marks a cell as "visited" by changing its character to a special marker (like `#`) and then restores it after the recursive call returns. ✅

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @param {string} word
     * @return {boolean}
     */
    exist(board, word) {
        const ROWS = board.length;
        const COLS = board[0].length;

        const dfs = (r, c, i) => {
            if (i === word.length) return true;
            if (
                r < 0 ||
                c < 0 ||
                r >= ROWS ||
                c >= COLS ||
                board[r][c] !== word[i] ||
                board[r][c] === '#' // Already visited
            ) {
                return false;
            }

            const temp = board[r][c];
            board[r][c] = '#'; // Mark as visited
            const res =
                dfs(r + 1, c, i + 1) ||
                dfs(r - 1, c, i + 1) ||
                dfs(r, c + 1, i + 1) ||
                dfs(r, c - 1, i + 1);
            board[r][c] = temp; // Unmark (backtrack)
            return res;
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (dfs(r, c, 0)) return true;
            }
        }
        return false;
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(m \cdot 4^n)$
  * **Space complexity**: $O(n)$ (for the recursion stack)

(Where $m$ is the number of cells in the `board` and $n$ is the length of the `word`.)