![Walls And Gates](/asset/images/WallsAndGates.png)
![Walls And Gates](/asset/images/WallsAndGates2.png)
![Walls And Gates](/asset/images/WallsAndGates3.png)

---

### 1. Brute Force (DFS - Backtracking)

This method iterates through every empty room (`INF`) and launches a Depth First Search (DFS) to find the nearest treasure.

* It tries all 4 directions recursively.
* It returns `0` when it hits a treasure.
* It returns `INF` if it hits a wall or boundary.
* Since DFS explores paths deeply before finding the shortest one, and we repeat this for *every* cell, it is extremely inefficient and will likely Time Limit Exceeded (TLE) on large grids. 🐢

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {void}
     */
    islandsAndTreasure(grid) {
        const ROWS = grid.length, COLS = grid[0].length;
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        const INF = 2147483647;
        
        // Helper DFS function
        const dfs = (r, c, visit) => {
            if (
                r < 0 || c < 0 || r >= ROWS || c >= COLS ||
                grid[r][c] === -1 || visit[r][c]
            ) {
                return INF;
            }
            if (grid[r][c] === 0) {
                return 0;
            }

            visit[r][c] = true;
            let res = INF;
            
            for (const [dx, dy] of directions) {
                const dist = dfs(r + dx, c + dy, visit);
                if (dist !== INF) {
                    res = Math.min(res, 1 + dist);
                }
            }
            
            visit[r][c] = false; // Backtrack
            return res;
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === INF) {
                    // Create a fresh visited array for each start node
                    const visit = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
                    grid[r][c] = dfs(r, c, visit);
                }
            }
        }
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**:  in the worst case, as DFS can visit the entire grid for each cell.
* **Space Complexity**:  for recursion stack.

---

### 2. Breadth First Search (Naive - Single Source)

This approach is slightly better. For each empty room (`INF`), we run a full BFS.

* BFS guarantees finding the shortest path in an unweighted grid.
* However, running a *separate* BFS for every single empty room is still redundant. If we have 1000 empty rooms, we scan the grid 1000 times.

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {void}
     */
    islandsAndTreasure(grid) {
        const ROWS = grid.length, COLS = grid[0].length;
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        const INF = 2147483647;

        const bfs = (startR, startC) => {
            const q = [[startR, startC]]; // Using array as queue
            const visit = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
            visit[startR][startC] = true;
            let steps = 0;

            while (q.length > 0) {
                let size = q.length;
                for (let i = 0; i < size; i++) {
                    const [r, c] = q.shift(); // Dequeue
                    
                    if (grid[r][c] === 0) return steps; // Found nearest treasure

                    for (const [dr, dc] of directions) {
                        const nr = r + dr, nc = c + dc;
                        if (
                            nr >= 0 && nr < ROWS &&
                            nc >= 0 && nc < COLS &&
                            !visit[nr][nc] &&
                            grid[nr][nc] !== -1
                        ) {
                            visit[nr][nc] = true;
                            q.push([nr, nc]);
                        }
                    }
                }
                steps++;
            }
            return INF;
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === INF) {
                    grid[r][c] = bfs(r, c);
                }
            }
        }
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: .
* **Space Complexity**: .

---

### 3. Multi-Source BFS (Optimal)

This is the standard, most efficient solution. Instead of searching *from* every empty room *to* a treasure, we search **from all treasures simultaneously outwards**.

1. Add **all** treasure coordinates (`0`) to the queue initially.
2. Run standard BFS.
3. The first time the BFS "wave" hits an empty room (`INF`), that is guaranteed to be the shortest distance from *any* treasure.
4. We fill in the distance and add that room to the queue to continue the wave. ✅

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     */
    islandsAndTreasure(grid) {
        const ROWS = grid.length;
        const COLS = grid[0].length;
        const q = []; // Using array as queue
        const INF = 2147483647;

        // 1. Initialize Queue with all Treasure locations
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 0) {
                    q.push([r, c]);
                }
            }
        }

        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        
        // 2. Multi-source BFS
        while (q.length > 0) {
            const [r, c] = q.shift(); // Dequeue

            for (const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;

                // Check bounds and if the cell is an empty room (INF)
                // If grid[nr][nc] is not INF, it means it's either a wall (-1), 
                // a treasure (0), or an empty room we already visited/filled from a closer treasure.
                if (
                    nr >= 0 && nr < ROWS &&
                    nc >= 0 && nc < COLS &&
                    grid[nr][nc] === INF
                ) {
                    // Update distance directly using the parent's distance + 1
                    grid[nr][nc] = grid[r][c] + 1;
                    q.push([nr, nc]);
                }
            }
        }
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: . We process each cell at most once.
* **Space Complexity**:  for the queue.