![Surrounded Regions](/asset/images/SurroundedRegions.png)
![Surrounded Regions](/asset/images/SurroundedRegions.png)

---

### 1. Depth First Search (DFS)

This approach iterates through the border cells. If a border cell is 'O', we start a DFS traversal to find all connected 'O's and mark them with a placeholder character (e.g., `'T'`). Finally, we iterate through the whole board: 'O' becomes 'X' (captured), and 'T' becomes 'O' (safe). 🐢

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    solve(board) {
        if (!board || board.length === 0) return;

        const ROWS = board.length;
        const COLS = board[0].length;

        // DFS to mark connected 'O's as 'T'
        const capture = (r, c) => {
            if (
                r < 0 || c < 0 || 
                r >= ROWS || c >= COLS || 
                board[r][c] !== 'O'
            ) {
                return;
            }
            
            board[r][c] = 'T'; // Mark as Temporary safe
            
            capture(r + 1, c);
            capture(r - 1, c);
            capture(r, c + 1);
            capture(r, c - 1);
        };

        // 1. Check Top and Bottom rows
        for (let c = 0; c < COLS; c++) {
            if (board[0][c] === 'O') capture(0, c);
            if (board[ROWS - 1][c] === 'O') capture(ROWS - 1, c);
        }

        // 2. Check Left and Right columns
        for (let r = 0; r < ROWS; r++) {
            if (board[r][0] === 'O') capture(r, 0);
            if (board[r][COLS - 1] === 'O') capture(r, COLS - 1);
        }

        // 3. Final Sweep
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (board[r][c] === 'O') {
                    board[r][c] = 'X'; // Captured
                } else if (board[r][c] === 'T') {
                    board[r][c] = 'O'; // Safe
                }
            }
        }
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: . We visit every cell at most a constant number of times.
* **Space Complexity**:  in the worst case (all 'O's) due to the recursion stack.

---

### 2. Breadth First Search (BFS)

This approach uses a queue to traverse the safe regions. We add all border 'O's to the queue initially. Then, we process the queue, marking neighbors as 'T' and adding them to the queue. This avoids recursion depth issues.

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    solve(board) {
        if (!board || board.length === 0) return;

        const ROWS = board.length;
        const COLS = board[0].length;
        const q = []; // Using array as queue
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        // 1. Add all border 'O's to the queue and mark them
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (
                    (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) &&
                    board[r][c] === 'O'
                ) {
                    q.push([r, c]);
                    board[r][c] = 'T';
                }
            }
        }

        // 2. Process Queue
        while (q.length > 0) {
            const [r, c] = q.shift(); // Dequeue

            for (const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;

                if (
                    nr >= 0 && nr < ROWS &&
                    nc >= 0 && nc < COLS &&
                    board[nr][nc] === 'O'
                ) {
                    board[nr][nc] = 'T';
                    q.push([nr, nc]);
                }
            }
        }

        // 3. Final Sweep
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (board[r][c] === 'O') {
                    board[r][c] = 'X';
                } else if (board[r][c] === 'T') {
                    board[r][c] = 'O';
                }
            }
        }
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: .
* **Space Complexity**:  for the queue.

---

### 3. Disjoint Set Union (DSU)

While less common for this specific problem due to overhead, DSU can be used.

1. Map every 2D coordinate to a 1D index.
2. Create a "dummy node" representing the "Safe/Border" region.
3. Connect all border 'O's to the dummy node.
4. Connect all adjacent 'O's to each other.
5. Finally, iterate through the board: if an 'O' is NOT connected to the dummy node, flip it to 'X'.

*Note: This is generally overkill compared to DFS/BFS but useful for understanding component connectivity.*

#### **Time & Space Complexity**

* **Time Complexity**: , nearly linear.
* **Space Complexity**:  for DSU parents array.