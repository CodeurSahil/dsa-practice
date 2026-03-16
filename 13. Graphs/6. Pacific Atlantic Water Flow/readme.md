![Pacific Atlantic Water Flow](/asset/images/PacificAtlanticWaterFlow.png)
![Pacific Atlantic Water Flow](/asset/images/PacificAtlanticWaterFlow2.png)
![Pacific Atlantic Water Flow](/asset/images/PacificAtlanticWaterFlow3.png)

---

### 1. Brute Force (DFS from Every Cell)

**Intuition:**
For every single cell in the grid, we start a traversal (DFS) to see if it can reach the Pacific and the Atlantic.

* We simulate water flowing **downhill** (neighbor height  current height).
* If a path hits the Top or Left edge, `pacific = true`.
* If a path hits the Bottom or Right edge, `atlantic = true`.
* If both are true, add the cell to the result.
* *Note: This is very inefficient because we re-compute paths for the same cells many times.*

```javascript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    pacificAtlantic(heights) {
        const ROWS = heights.length, COLS = heights[0].length;
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        const checkFlow = (startR, startC) => {
            let pacific = false, atlantic = false;
            // Use a visited set for this specific traversal to avoid cycles
            let visited = new Set();
            
            const dfs = (r, c) => {
                // If we already reached both, no need to continue
                if (pacific && atlantic) return;
                
                visited.add(`${r},${c}`);
                
                // Check boundaries (Oceans)
                if (r === 0 || c === 0) pacific = true;
                if (r === ROWS - 1 || c === COLS - 1) atlantic = true;

                for (let [dr, dc] of directions) {
                    let nr = r + dr, nc = c + dc;
                    if (
                        nr >= 0 && nr < ROWS && 
                        nc >= 0 && nc < COLS &&
                        !visited.has(`${nr},${nc}`) &&
                        heights[nr][nc] <= heights[r][c] // Downhill flow
                    ) {
                        dfs(nr, nc);
                    }
                }
            };
            
            dfs(startR, startC);
            return pacific && atlantic;
        };

        let res = [];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (checkFlow(r, c)) {
                    res.push([r, c]);
                }
            }
        }
        return res;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: . For each of the  cells, we potentially traverse the whole grid.
* **Space Complexity**:  for recursion stack and visited set.

---

### 2. Depth First Search (Optimized / Reverse Flow)

**Intuition:**
Instead of checking where water goes *from* each cell, we check which cells can *reach* the oceans by moving **uphill**.

1. Start DFS from all **Pacific** border cells (Top & Left). Move only to neighbors with `height >= current`. Mark reachable cells in a `pacificReachable` set.
2. Start DFS from all **Atlantic** border cells (Bottom & Right). Move uphill. Mark reachable cells in an `atlanticReachable` set.
3. The answer is the **intersection** of these two sets.

```javascript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    pacificAtlantic(heights) {
        const ROWS = heights.length, COLS = heights[0].length;
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        
        // Sets to keep track of reachable cells from each ocean
        // Storing coordinates as strings "r,c"
        const pac = new Set();
        const atl = new Set();

        const dfs = (r, c, visit, prevHeight) => {
            if (
                visit.has(`${r},${c}`) ||
                r < 0 || c < 0 || r >= ROWS || c >= COLS ||
                heights[r][c] < prevHeight // Water can't flow uphill (so we can't reverse climb downhill)
            ) {
                return;
            }
            
            visit.add(`${r},${c}`);
            for (const [dr, dc] of directions) {
                dfs(r + dr, c + dc, visit, heights[r][c]);
            }
        };

        // Run DFS for Top (Pacific) and Bottom (Atlantic) rows
        for (let c = 0; c < COLS; c++) {
            dfs(0, c, pac, heights[0][c]);
            dfs(ROWS - 1, c, atl, heights[ROWS - 1][c]);
        }

        // Run DFS for Left (Pacific) and Right (Atlantic) columns
        for (let r = 0; r < ROWS; r++) {
            dfs(r, 0, pac, heights[r][0]);
            dfs(r, COLS - 1, atl, heights[r][COLS - 1]);
        }

        const res = [];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (pac.has(`${r},${c}`) && atl.has(`${r},${c}`)) {
                    res.push([r, c]);
                }
            }
        }
        return res;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: . We visit each cell at most twice (once for Pacific, once for Atlantic).
* **Space Complexity**:  for recursion stack and sets.

---

### 3. Breadth First Search (Multi-Source)

**Intuition:**
This uses the same "reverse flow" logic as the DFS solution but explores layer-by-layer using a Queue. We can use **Multi-Source BFS** by initializing the queue with *all* border cells of a specific ocean at once.

```javascript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    pacificAtlantic(heights) {
        const ROWS = heights.length, COLS = heights[0].length;
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        
        const bfs = (q) => {
            const reachable = new Set();
            // Mark initial sources as reachable
            q.forEach(([r, c]) => reachable.add(`${r},${c}`));
            
            while (q.length > 0) {
                const [r, c] = q.shift();
                
                for (const [dr, dc] of directions) {
                    const nr = r + dr, nc = c + dc;
                    if (
                        nr >= 0 && nr < ROWS && 
                        nc >= 0 && nc < COLS &&
                        !reachable.has(`${nr},${nc}`) &&
                        heights[nr][nc] >= heights[r][c] // Reverse flow condition
                    ) {
                        reachable.add(`${nr},${nc}`);
                        q.push([nr, nc]);
                    }
                }
            }
            return reachable;
        };

        const pacificQ = [];
        const atlanticQ = [];

        for (let r = 0; r < ROWS; r++) {
            pacificQ.push([r, 0]);
            atlanticQ.push([r, COLS - 1]);
        }
        for (let c = 0; c < COLS; c++) {
            pacificQ.push([0, c]);
            atlanticQ.push([ROWS - 1, c]);
        }

        const pacificReachable = bfs(pacificQ);
        const atlanticReachable = bfs(atlanticQ);

        const res = [];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (pacificReachable.has(`${r},${c}`) && atlanticReachable.has(`${r},${c}`)) {
                    res.push([r, c]);
                }
            }
        }
        return res;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: .
* **Space Complexity**: .