Your solution works and correctly counts the number of islands using **DFS with a visited map (`infoIndex`)**, but it's a bit verbose and uses extra space unnecessarily.

Here's a **cleaner and more efficient approach** using **in-place DFS**, which:

* Avoids creating a separate `infoIndex` map.
* Marks visited land cells directly in the input grid (mutates the grid).
* Results in **cleaner, faster, and more memory-efficient** code.

---

### ✅ Optimized DFS Approach (In-place)

```javascript
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    if (!grid || grid.length === 0) return 0;

    let numIslands = 0;

    const rows = grid.length;
    const cols = grid[0].length;

    const dfs = (i, j) => {
        // Check boundaries and if cell is not land
        if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] === '0') {
            return;
        }

        // Mark current cell as visited
        grid[i][j] = '0';

        // Explore neighbors in 4 directions
        dfs(i + 1, j); // down
        dfs(i - 1, j); // up
        dfs(i, j + 1); // right
        dfs(i, j - 1); // left
    };

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                numIslands++;
                dfs(i, j); // Sink this island
            }
        }
    }

    return numIslands;
};
```

---

### 🔍 Key Improvements Over Your Version

| Aspect           | Your Version                         | Optimized Version                 |
| ---------------- | ------------------------------------ | --------------------------------- |
| Visited tracking | Separate `infoIndex` map             | In-place grid modification        |
| Space complexity | O(m × n) for `infoIndex`             | O(1) extra space (modifies input) |
| Code complexity  | More verbose with unnecessary checks | Clean and concise                 |
| Performance      | Slightly slower due to map lookups   | Faster due to direct grid access  |

---

### ⚠️ Note

If you're not allowed to **mutate the original `grid`**, you can create a copy of the grid beforehand using:

```javascript
const gridCopy = grid.map(row => row.slice());
```

Let me know if you'd like the **BFS version** or **Union-Find (Disjoint Set)** solution too — those are alternatives often asked in interviews.


# Tell me is there any other way to approach this problem

Yes, apart from **DFS (Depth-First Search)** which you've already implemented, there are **two other common and effective approaches** to solve the "Number of Islands" problem:

---

## ✅ 1. **BFS (Breadth-First Search) Approach**

Instead of going deep recursively (like DFS), you use a **queue** to explore the island **level-by-level**. This is helpful if recursion depth becomes an issue (e.g., for large grids).

### 🔧 Code:

```javascript
var numIslands = function (grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;

    const directions = [
        [0, 1],  // right
        [1, 0],  // down
        [0, -1], // left
        [-1, 0]  // up
    ];

    const bfs = (i, j) => {
        const queue = [[i, j]];
        grid[i][j] = '0'; // mark as visited

        while (queue.length > 0) {
            const [x, y] = queue.shift();

            for (const [dx, dy] of directions) {
                const newX = x + dx;
                const newY = y + dy;

                if (
                    newX >= 0 && newX < rows &&
                    newY >= 0 && newY < cols &&
                    grid[newX][newY] === '1'
                ) {
                    queue.push([newX, newY]);
                    grid[newX][newY] = '0'; // mark as visited
                }
            }
        }
    };

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                islandCount++;
                bfs(i, j);
            }
        }
    }

    return islandCount;
};
```

### 🔁 Time & Space:

* **Time**: O(m × n)
* **Space**: O(min(m, n)) for queue in worst case (BFS level)

---

## ✅ 2. **Union-Find / Disjoint Set Union (DSU)**

This is a **more advanced** technique, especially useful when you want to:

* Count **connected components** efficiently
* Process **dynamic updates** (like adding/removing lands)

### 💡 Idea:

* Treat each land cell as a node.
* Connect adjacent land cells using union.
* The number of **unique parents** (after unions) is the number of islands.

### 🔧 Code:

```javascript
class UnionFind {
    constructor(grid) {
        this.count = 0;
        const rows = grid.length, cols = grid[0].length;
        this.parent = new Array(rows * cols).fill(0).map((_, index) => index);
        this.rank = new Array(rows * cols).fill(0);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (grid[i][j] === '1') this.count++;
            }
        }
    }

    find(i) {
        if (this.parent[i] !== i) {
            this.parent[i] = this.find(this.parent[i]);
        }
        return this.parent[i];
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX !== rootY) {
            if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
            this.count--;
        }
    }
}

var numIslands = function (grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    const uf = new UnionFind(grid);

    const directions = [
        [0, 1],
        [1, 0]
    ];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                grid[i][j] = '0';
                for (const [dx, dy] of directions) {
                    const newX = i + dx;
                    const newY = j + dy;
                    if (
                        newX >= 0 && newX < rows &&
                        newY >= 0 && newY < cols &&
                        grid[newX][newY] === '1'
                    ) {
                        const id1 = i * cols + j;
                        const id2 = newX * cols + newY;
                        uf.union(id1, id2);
                    }
                }
            }
        }
    }

    return uf.count;
};
```

### 🧠 When to Use:

* When the problem involves **dynamic connectivity**
* Or you’re counting islands after multiple **updates** (like "addLand")

---

## 🔄 Summary Table

| Method         | Space  | Speed | Pros                               | Cons                     |
| -------------- | ------ | ----- | ---------------------------------- | ------------------------ |
| DFS (in-place) | O(1)   | Fast  | Easy, memory-efficient             | May cause stack overflow |
| BFS            | O(m×n) | Fast  | No recursion, good for large grids | Needs queue space        |
| Union-Find     | O(m×n) | Fast  | Handles dynamic updates well       | Complex to implement     |

---

Let me know if you want a comparison with **recursive vs iterative DFS** or a solution that works with **immutable inputs**!


## OTHER APPROCHES

Yes, the **Rotting Oranges** problem can be approached in a few different ways beyond the commonly-used **BFS** (which is the optimal and standard solution). Here's a breakdown of **all meaningful approaches** with trade-offs and insights:

---

## ✅ 1. **Breadth-First Search (BFS)** – 📌 Best Approach

Already covered above. Treat each rotten orange as a source and propagate rotting level by level (minute by minute). Use a queue.

* **Time**: O(m × n)
* **Space**: O(m × n)
* ✅ Handles multi-source rot
* ✅ Easy to track time
* ✅ Safe from stack overflows

---

## 🔁 2. **Recursive DFS-based Simulation** (your approach)

You simulate the spread recursively minute-by-minute.

* **Time**: O(m × n × maxMinutes)
* **Space**: O(m × n) + recursion call stack
* ❌ Can hit stack overflow in large grids
* ✅ Works and is logically correct
* ❌ Not optimal in performance

---

## 🧠 3. **Topological Sorting (Kahn’s Algorithm)**

While BFS looks similar to topological sort, this is a more formal graph approach. Treat each fresh orange as a node, and edges connect it to rotten neighbors. We could model it as a DAG where rotting dependencies are processed in order.

* **Time**: O(m × n)
* **Space**: O(m × n)
* ❌ Overcomplicates a grid problem
* ❌ Not practical here but **conceptually viable**

---

## 🗺️ 4. **Dynamic Programming (DP-style grid propagation)**

You can use a DP grid where each cell stores the time it will rot. Start from rotten oranges and propagate the minimum time to adjacent fresh oranges.

### DP-Like Approach Pseudocode:

```txt
For each rotten orange, start DFS with time = 0.
If the cell has been visited with a smaller time, skip.
For each fresh neighbor, update time = min(current, neighbor + 1)
```

* **Time**: O((m × n)²) worst case (repeated updates)
* ❌ Can be slow due to reprocessing
* ✅ Interesting as a grid-update problem

---

## 🔀 5. **Multi-source Dijkstra (or BFS with weighted edges)**

You could treat this as a multi-source shortest path problem where all rotten oranges are sources, and the cost to rot a neighbor is 1.

* **Time**: O(m × n log(m × n)) using min-heap
* ❌ Overkill here since all edges are weight 1
* ✅ Valuable in extended versions (e.g., rotting cost varies)

---

## 🧪 6. **Union-Find / Disjoint Set Union (DSU)** – Not suitable

You might think about using DSU to group rot-spread areas, but rotting spreads over time, not just connectivity, so DSU can't track time evolution.

* ❌ Not a valid approach here

---

## 🔍 Summary of All Viable Strategies:

| Approach                       | Suitable? | Notes                           |
| ------------------------------ | --------- | ------------------------------- |
| **BFS**                        | ✅ Best    | Fast, clean, scalable           |
| **Recursive Simulation (DFS)** | ✅ Ok      | Works but risky on large inputs |
| **Topological Sort**           | ❌ No      | Overkill for this grid problem  |
| **DP Propagation**             | ✅ Rare    | Less efficient but valid        |
| **Dijkstra (Multi-Source)**    | ✅ Niche   | Useful if edge weights differ   |
| **DSU / Union-Find**           | ❌ No      | Not time-aware                  |

---

Would you like a comparison in terms of runtime performance on real inputs or a visual breakdown of how BFS vs DP works on an example?
