![Swim in Rising Water](/asset/images/SwiminRisingWater.png)
![Swim in Rising Water](/asset/images/SwiminRisingWater2.png)
![Swim in Rising Water](/asset/images/SwiminRisingWater3.png)

---

### 1. Depth First Search (Brute Force)

**Intuition:**
We explore every possible path from start to finish. We track the `max_height` seen so far on the current path. If we reach the end, we return that maximum height. If we have multiple paths to the end, we take the minimum of their maximum heights. 🐢

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    swimInWater(grid) {
        const n = grid.length;
        const visit = Array.from({ length: n }, () => Array(n).fill(false));

        const dfs = (r, c, t) => {
            // Out of bounds or already visited
            if (Math.min(r, c) < 0 || Math.max(r, c) >= n || visit[r][c]) {
                return Infinity;
            }
            
            // Reached destination, return the max height needed for this path
            if (r === n - 1 && c === n - 1) {
                return Math.max(t, grid[r][c]);
            }

            visit[r][c] = true;
            t = Math.max(t, grid[r][c]); // Update max height for current path
            
            // Explore all 4 directions and find the best (minimum) path
            const res = Math.min(
                dfs(r + 1, c, t),
                dfs(r - 1, c, t),
                dfs(r, c + 1, t),
                dfs(r, c - 1, t)
            );
            
            visit[r][c] = false; // Backtrack
            return res;
        };

        return dfs(0, 0, 0);
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(4^{n^2})$. Explores every possible path. Will Time Limit Exceed.
* **Space Complexity**: $O(n^2)$ for the visited matrix and recursion stack.

---

### 2. Binary Search + DFS

**Intuition:**
If we can swim to the end at time $t$, we can certainly swim there at time $t+1$. This monotonic property allows us to use Binary Search on the answer. We guess a time `mid`. We then run a simple DFS to see if a path exists from start to end using *only* cells with elevation $\le$ `mid`.

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    swimInWater(grid) {
        const n = grid.length;
        let minH = grid[0][0];
        let maxH = grid[0][0];
        
        // Find the search space range
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                maxH = Math.max(maxH, grid[r][c]);
                minH = Math.min(minH, grid[r][c]);
            }
        }

        const dfs = (r, c, t, visit) => {
            if (
                Math.min(r, c) < 0 || Math.max(r, c) >= n || 
                visit[r][c] || grid[r][c] > t
            ) {
                return false;
            }
            if (r === n - 1 && c === n - 1) {
                return true;
            }
            
            visit[r][c] = true;
            return (
                dfs(r + 1, c, t, visit) ||
                dfs(r - 1, c, t, visit) ||
                dfs(r, c + 1, t, visit) ||
                dfs(r, c - 1, t, visit)
            );
        };

        let l = minH;
        let r = maxH;
        
        // Binary Search
        while (l < r) {
            const m = (l + r) >> 1; // Math.floor((l + r) / 2)
            const visit = Array.from({ length: n }, () => Array(n).fill(false));
            
            if (dfs(0, 0, m, visit)) {
                r = m; // Try to find a smaller time
            } else {
                l = m + 1; // Need more time
            }
        }

        return r;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n^2 \log (\text{maxHeight} - \text{minHeight}))$. The search space is the range of heights. For each check, DFS takes at most $O(n^2)$.
* **Space Complexity**: $O(n^2)$ for the visited matrix and recursion stack.

---

### 3. Dijkstra's Algorithm (Optimal)

**Intuition:**
We can adapt Dijkstra's algorithm. Instead of finding the path with the minimum *sum* of edge weights, we find the path with the minimum *maximum* edge weight. We use a Min-Priority Queue to constantly expand the path that currently has the lowest peak elevation. When we pop the destination cell from the heap, we are guaranteed to have found the optimal path. ✅

```javascript
const { MinPriorityQueue } = require('@datastructures-js/priority-queue');

class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    swimInWater(grid) {
        const N = grid.length;
        const visit = new Set();
        
        // Min-Heap stores elements as [max_height_so_far, r, c]
        // Prioritize paths with the smallest max_height
        const minH = new MinPriorityQueue((x) => x[0]);
        minH.enqueue([grid[0][0], 0, 0]);
        
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        visit.add('0,0');

        while (!minH.isEmpty()) {
            const [t, r, c] = minH.dequeue();
            
            // If we reached the end, return the max height of this path
            if (r === N - 1 && c === N - 1) {
                return t;
            }
            
            for (const [dr, dc] of directions) {
                const neiR = r + dr;
                const neiC = c + dc;
                const key = `${neiR},${neiC}`;
                
                if (
                    neiR >= 0 && neiC >= 0 && 
                    neiR < N && neiC < N && 
                    !visit.has(key)
                ) {
                    visit.add(key);
                    // The new path cost is the max of the current path cost and the neighbor's height
                    minH.enqueue([Math.max(t, grid[neiR][neiC]), neiR, neiC]);
                }
            }
        }
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n^2 \log n)$. There are $n^2$ cells. Heap operations take $O(\log(n^2)) = O(2 \log n) = O(\log n)$.
* **Space Complexity**: $O(n^2)$ for the heap and visited set.

---

### 4. Kruskal's Algorithm (Union-Find)

**Intuition:**
Imagine the water level rising minute by minute. At time `t`, all cells with elevation $\le$ `t` become available. We sort all cells by their elevation. We then iterate through them from lowest to highest elevation, "turning them on". When a cell turns on, we Union it with any of its 4 neighbors that are already turned on. The moment the start cell $(0,0)$ and the end cell $(n-1, n-1)$ belong to the same connected component, the current time/elevation is our answer.

```javascript
class DSU {
    constructor(n) {
        this.Parent = Array.from({ length: n }, (_, i) => i);
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
        
        if (this.Size[pu] < this.Size[pv]) {
            [pu, pv] = [pv, pu];
        }
        this.Size[pu] += this.Size[pv];
        this.Parent[pv] = pu;
        return true;
    }

    connected(u, v) {
        return this.find(u) === this.find(v);
    }
}

class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    swimInWater(grid) {
        const N = grid.length;
        const dsu = new DSU(N * N);
        const positions = [];

        // Flatten grid into [elevation, r, c] and sort
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                positions.push([grid[r][c], r, c]);
            }
        }
        positions.sort((a, b) => a[0] - b[0]);

        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

        for (const [t, r, c] of positions) {
            const currIdx = r * N + c;
            
            for (const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;
                const neiIdx = nr * N + nc;
                
                // If neighbor is in bounds and has an elevation <= current cell's elevation 
                // (meaning it's already "open" because we sorted by elevation)
                if (nr >= 0 && nc >= 0 && nr < N && nc < N && grid[nr][nc] <= t) {
                    dsu.union(currIdx, neiIdx);
                }
            }
            
            // Check if start and end are connected
            if (dsu.connected(0, N * N - 1)) {
                return t;
            }
        }
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n^2 \log n)$ due to sorting the $n^2$ positions. DSU operations are nearly constant time.
* **Space Complexity**: $O(n^2)$ for the DSU structures and position array.