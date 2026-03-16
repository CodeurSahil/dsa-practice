![Number of Islands](/asset/images/NumberofIslands.png)
![Number of Islands](/asset/images/NumberofIslands2.png)

---

### 1. Depth First Search (DFS)

This approach iterates through every cell. When it finds a piece of land (`'1'`), it increments the island count and launches a DFS to "sink" the entire island (marking connected land as `'0'` so it isn't counted again). 🐢

```javascript
class Solution {
    /**
     * @param {character[][]} grid
     * @return {number}
     */
    numIslands(grid) {
        if (!grid || grid.length === 0) return 0;
        
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        const ROWS = grid.length, COLS = grid[0].length;
        let islands = 0;

        const dfs = (r, c) => {
            // Base case: check bounds and if current cell is water
            if (r < 0 || c < 0 || r >= ROWS || c >= COLS || grid[r][c] === '0') {
                return;
            }

            grid[r][c] = '0'; // Mark as visited (sink the island)
            
            // Recursively visit all 4 neighbors
            for (const [dr, dc] of directions) {
                dfs(r + dr, c + dc);
            }
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === '1') {
                    dfs(r, c);
                    islands++;
                }
            }
        }

        return islands;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**:  where  is rows and  is columns. We visit every cell at most once.
* **Space Complexity**:  in the worst case (full grid of land) due to the recursion stack.

---

### 2. Breadth First Search (BFS)

This works similarly to DFS but uses a **Queue** to explore the island layer by layer. This is iterative and prevents stack overflow errors on very large grids.

```javascript
class Solution {
    /**
     * @param {character[][]} grid
     * @return {number}
     */
    numIslands(grid) {
        if (!grid || grid.length === 0) return 0;

        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        const ROWS = grid.length, COLS = grid[0].length;
        let islands = 0;

        const bfs = (r, c) => {
            const q = []; // Using array as queue
            q.push([r, c]);
            grid[r][c] = '0'; // Mark visited immediately

            while (q.length > 0) {
                const [row, col] = q.shift(); // Dequeue
                
                for (const [dr, dc] of directions) {
                    const nr = row + dr, nc = col + dc;
                    if (
                        nr >= 0 && nc >= 0 &&
                        nr < ROWS && nc < COLS &&
                        grid[nr][nc] === '1'
                    ) {
                        q.push([nr, nc]);
                        grid[nr][nc] = '0'; // Mark neighbor visited
                    }
                }
            }
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === '1') {
                    bfs(r, c);
                    islands++;
                }
            }
        }

        return islands;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: .
* **Space Complexity**:  for the queue in the worst case.

---

### 3. Disjoint Set Union (DSU)

This approach treats every `'1'` as a separate set initially. As we traverse the grid, if a `'1'` is adjacent to another `'1'`, we **union** them.

* **Initial count:** Total number of `'1'`s.
* **Union operation:** If we successfully merge two sets, we decrement the total count.
* **Result:** The remaining count is the number of disjoint islands. ✅

```javascript
class DSU {
    constructor(n) {
        this.Parent = Array(n).fill(0).map((_, i) => i);
        this.Size = Array(n).fill(1);
    }

    find(node) {
        if (this.Parent[node] !== node) {
            this.Parent[node] = this.find(this.Parent[node]); // Path compression
        }
        return this.Parent[node];
    }

    union(u, v) {
        let pu = this.find(u);
        let pv = this.find(v);
        if (pu === pv) return false; // Already connected
        
        // Union by size
        if (this.Size[pu] >= this.Size[pv]) {
            this.Size[pu] += this.Size[pv];
            this.Parent[pv] = pu;
        } else {
            this.Size[pv] += this.Size[pu];
            this.Parent[pu] = pv;
        }
        return true;
    }
}

class Solution {
    /**
     * @param {character[][]} grid
     * @return {number}
     */
    numIslands(grid) {
        if (!grid || grid.length === 0) return 0;

        const ROWS = grid.length, COLS = grid[0].length;
        const dsu = new DSU(ROWS * COLS);
        
        // Directions: Right and Down are sufficient to connect everything in one pass
        const directions = [[1, 0], [0, 1]]; 
        let islands = 0;

        // Helper to convert 2D coords to 1D index
        const index = (r, c) => r * COLS + c;

        // 1. Count total land cells initially
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === '1') islands++;
            }
        }

        // 2. Iterate and Merge
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === '1') {
                    for (let [dr, dc] of directions) {
                        let nr = r + dr, nc = c + dc;
                        if (nr < ROWS && nc < COLS && grid[nr][nc] === '1') {
                            if (dsu.union(index(r, c), index(nr, nc))) {
                                islands--; // Successful merge reduces island count
                            }
                        }
                    }
                }
            }
        }

        return islands;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: , where  is the inverse Ackermann function (nearly constant).
* **Space Complexity**:  to store the parent and size arrays.