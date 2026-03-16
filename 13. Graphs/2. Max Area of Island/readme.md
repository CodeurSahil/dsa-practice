![Max Area of Island](/asset/images/MaxAreaofIsland.png)
![Max Area of Island](/asset/images/MaxAreaofIsland.png)

---

### 1. Depth First Search (DFS)

This approach iterates through every cell. When it finds a piece of land (`1`) that hasn't been visited, it starts a recursive DFS. The DFS explores all connected land cells, counts them, and marks them as visited (by changing `1` to `0`) to prevent recounting. 🐢

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    maxAreaOfIsland(grid) {
        const directions = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];
        const ROWS = grid.length,
            COLS = grid[0].length;

        const dfs = (r, c) => {
            // Base case: check bounds and if current cell is water
            if (r < 0 || c < 0 || r >= ROWS || c >= COLS || grid[r][c] === 0)
                return 0;

            grid[r][c] = 0; // Mark as visited
            let res = 1; // Count current cell
            
            // Recursively add area of all neighbors
            for (const [dr, dc] of directions) {
                res += dfs(r + dr, c + dc);
            }
            return res;
        };

        let area = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 1) {
                    area = Math.max(area, dfs(r, c));
                }
            }
        }

        return area;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**:  where  is rows and  is columns. We visit every cell at most once.
* **Space Complexity**:  in the worst case (full grid of land) due to recursion stack.

---

### 2. Breadth First Search (BFS)

This works similarly to DFS but uses a **Queue** to explore the island layer by layer. This is iterative and avoids recursion depth issues on very large connected components.

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    maxAreaOfIsland(grid) {
        const directions = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];
        const ROWS = grid.length,
            COLS = grid[0].length;
        let area = 0;

        const bfs = (r, c) => {
            const q = []; // Using array as queue
            q.push([r, c]);
            grid[r][c] = 0; // Mark visited
            let res = 1;

            while (q.length > 0) {
                const [row, col] = q.shift(); // Dequeue
                for (const [dr, dc] of directions) {
                    const nr = row + dr,
                        nc = col + dc;
                    if (
                        nr >= 0 &&
                        nc >= 0 &&
                        nr < ROWS &&
                        nc < COLS &&
                        grid[nr][nc] === 1
                    ) {
                        q.push([nr, nc]);
                        grid[nr][nc] = 0; // Mark visited
                        res++;
                    }
                }
            }
            return res;
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 1) {
                    area = Math.max(area, bfs(r, c));
                }
            }
        }

        return area;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: .
* **Space Complexity**:  for the queue in the worst case.

---

### 3. Disjoint Set Union (DSU)

This approach treats every `1` as a separate set initially. As we traverse the grid, if a `1` is adjacent to another `1`, we **union** them. We track the size of each set within the DSU structure.

* **Size Tracking:** When merging two sets, add the size of the child to the parent.
* **Max Area:** After processing the grid, simply check the max size found. ✅

```javascript
class DSU {
    constructor(n) {
        this.Parent = Array(n).fill(0).map((_, i) => i);
        this.Size = Array(n).fill(1);
    }

    find(node) {
        if (this.Parent[node] !== node) {
            this.Parent[node] = this.find(this.Parent[node]);
        }
        return this.Parent[node];
    }

    union(u, v) {
        let pu = this.find(u);
        let pv = this.find(v);
        if (pu === pv) return false;
        
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

    getSize(node) {
        return this.Size[this.find(node)];
    }
}

class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    maxAreaOfIsland(grid) {
        const ROWS = grid.length;
        const COLS = grid[0].length;
        const dsu = new DSU(ROWS * COLS);

        const directions = [[1, 0], [0, 1]]; // Only need Right and Down for DSU pass
        let area = 0;

        const index = (r, c) => r * COLS + c;

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 1) {
                    // Start with size 1 for single cell islands
                    area = Math.max(area, 1); 
                    
                    for (let [dr, dc] of directions) {
                        let nr = r + dr,
                            nc = c + dc;
                        if (
                            nr < ROWS &&
                            nc < COLS &&
                            grid[nr][nc] === 1
                        ) {
                            dsu.union(index(r, c), index(nr, nc));
                        }
                    }
                    // Update max area with the size of the current component
                    area = Math.max(area, dsu.getSize(index(r, c)));
                }
            }
        }

        return area;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: , where  is nearly constant.
* **Space Complexity**:  to store the parent and size arrays.