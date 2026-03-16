![Rotting Oranges](/asset/images/RottingOranges.png)
![Rotting Oranges](/asset/images/RottingOranges2.png)

---

### 1. Breadth First Search (Multi-Source BFS)

**Intuition:**
This is the standard and most efficient approach. Since rot spreads from *all* existing rotten oranges simultaneously, we use **Multi-Source BFS**.

1. **Initialization:** We scan the grid once to find all initially rotten oranges (`2`) and add them to a queue. We also count the total `fresh` oranges (`1`).
2. **Simulation:** In each "minute" (loop iteration), we process all oranges currently in the queue (the current wavefront of rot). We infect their neighbors, decrement the `fresh` count, and add the newly rotten neighbors to the queue for the next minute.
3. **Termination:** If `fresh` becomes 0, we return the time. If the queue empties but `fresh > 0`, it's impossible to rot everyone, so return `-1`.

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    orangesRotting(grid) {
        const q = [];
        let fresh = 0;
        let time = 0;
        const ROWS = grid.length, COLS = grid[0].length;

        // 1. Initialize Queue and count fresh oranges
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 1) {
                    fresh++;
                }
                if (grid[r][c] === 2) {
                    q.push([r, c]);
                }
            }
        }

        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        
        // 2. BFS Process
        while (fresh > 0 && q.length > 0) {
            const length = q.length; // Process level by level
            
            for (let i = 0; i < length; i++) {
                const [currR, currC] = q.shift(); // Dequeue

                for (const [dr, dc] of directions) {
                    const row = currR + dr;
                    const col = currC + dc;
                    
                    // Check bounds and if neighbor is fresh
                    if (
                        row >= 0 && row < ROWS &&
                        col >= 0 && col < COLS &&
                        grid[row][col] === 1
                    ) {
                        grid[row][col] = 2; // Mark as rotten
                        q.push([row, col]); // Enqueue for next minute
                        fresh--;
                    }
                }
            }
            time++;
        }
        
        return fresh === 0 ? time : -1;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: . Each cell is visited at most once.
* **Space Complexity**:  for the queue in the worst case (e.g., all rotten initially).

---

### 2. Simulation (In-Place BFS / No Queue)

**Intuition:**
Instead of using a queue to track the wavefront, we can repeatedly scan the entire grid to simulate the passage of time.

1. **Marking Phase:** In each pass, we look for rotten oranges (`2`). If they have a fresh neighbor (`1`), we mark that neighbor as a "pending rot" (e.g., `3`) instead of `2`. This prevents the rot from spreading infinitely in a single pass.
2. **Commit Phase:** After scanning the whole grid, we iterate again to convert all `3`s (pending) into `2`s (rotten).
3. **Repeat:** We repeat this until no new changes occur. If fresh oranges remain, return `-1`.

While this saves space (no queue), it is much slower because we re-scan the entire grid for every single minute of simulation.

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    orangesRotting(grid) {
        const ROWS = grid.length;
        const COLS = grid[0].length;
        let fresh = 0;
        let time = 0;

        // 1. Initial fresh count
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 1) fresh++;
            }
        }

        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

        // 2. Simulation Loop
        while (fresh > 0) {
            let flag = false; // Did anything rot this minute?
            
            // Phase 1: Identify neighbors to rot (mark as 3)
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    if (grid[r][c] === 2) {
                        for (const [dr, dc] of directions) {
                            const row = r + dr, col = c + dc;
                            if (
                                row >= 0 && row < ROWS &&
                                col >= 0 && col < COLS &&
                                grid[row][col] === 1
                            ) {
                                grid[row][col] = 3; // Temporary marker
                                fresh--;
                                flag = true;
                            }
                        }
                    }
                }
            }

            if (!flag) return -1; // No progress made, but fresh oranges remain

            // Phase 2: Commit changes (3 -> 2)
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    if (grid[r][c] === 3) {
                        grid[r][c] = 2;
                    }
                }
            }

            time++;
        }

        return time;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**:  in the worst case (scanning the whole grid  times).
* **Space Complexity**:  auxiliary space.

