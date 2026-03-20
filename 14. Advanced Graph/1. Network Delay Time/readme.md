![Network Delay Time](/asset/images/NetworkDelayTime.png)
![Network Delay Time](/asset/images/NetworkDelayTime2.png)

---

### 1. Depth First Search (DFS)

**Intuition:**
We can explore every possible path from the starting node `k`. To avoid infinite loops and unnecessary work, we keep track of the shortest time we've seen to reach each node in a `dist` array. If our current DFS path reaches a node at a time *greater than or equal to* the currently known shortest time for that node, we stop exploring that path (pruning).

```javascript
class Solution {
    /**
     * @param {number[][]} times
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    networkDelayTime(times, n, k) {
        const adj = new Map();
        for (let i = 1; i <= n; i++) {
            adj.set(i, []);
        }
        for (const [u, v, w] of times) {
            adj.get(u).push([v, w]);
        }

        const dist = new Array(n + 1).fill(Infinity);

        const dfs = (node, time) => {
            // Prune: If we arrived later than a previously found path, stop.
            if (time >= dist[node]) {
                return;
            }

            dist[node] = time;
            for (const [nei, w] of adj.get(node)) {
                dfs(nei, time + w);
            }
        };

        // Start DFS from node k at time 0
        dfs(k, 0);

        // The time it takes for ALL nodes to receive the signal is the maximum
        // time it took to reach any single node.
        let maxTime = 0;
        for (let i = 1; i <= n; i++) {
            maxTime = Math.max(maxTime, dist[i]);
        }

        return maxTime === Infinity ? -1 : maxTime;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: $O(V \cdot E)$. In the worst case, we might traverse many non-optimal paths before finding the optimal ones.
* **Space Complexity**: $O(V + E)$ for the adjacency list and recursion stack.

---

### 2. Floyd-Warshall Algorithm

**Intuition:**
Floyd-Warshall computes the shortest path between **all pairs** of nodes. It does this by taking a matrix of direct edge weights and iteratively checking if routing a path through an intermediate node (`mid`) is shorter than the direct path. After computing all paths, we simply look at the distances from our starting node `k` to every other node and find the maximum.

```javascript
class Solution {
    /**
     * @param {number[][]} times
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    networkDelayTime(times, n, k) {
        const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));

        // Base cases: distance to self is 0, distance to neighbors is edge weight
        for (let i = 0; i < n; i++) dist[i][i] = 0;
        for (const [u, v, w] of times) {
            dist[u - 1][v - 1] = w;
        }

        // Floyd-Warshall: Try every node as an intermediate 'mid' point
        for (let mid = 0; mid < n; mid++) {
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    dist[i][j] = Math.min(dist[i][j], dist[i][mid] + dist[mid][j]);
                }
            }
        }

        // Find the maximum distance from starting node k
        let maxTime = 0;
        for (let j = 0; j < n; j++) {
            maxTime = Math.max(maxTime, dist[k - 1][j]);
        }

        return maxTime === Infinity ? -1 : maxTime;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: $O(V^3)$ due to the three nested loops.
* **Space Complexity**: $O(V^2)$ for the distance matrix.

---

### 3. Bellman-Ford Algorithm

**Intuition:**
Bellman-Ford finds the shortest paths from a single source node to all other nodes. It does this by "relaxing" all edges $V-1$ times. Relaxing an edge `u -> v` with weight `w` means checking if `dist[u] + w < dist[v]`, and if so, updating `dist[v]`. By repeating this $V-1$ times, we guarantee that the shortest path information has propagated through the longest possible path in the graph.

```javascript
class Solution {
    /**
     * @param {number[][]} times
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    networkDelayTime(times, n, k) {
        const dist = new Array(n).fill(Infinity);
        dist[k - 1] = 0;

        // Relax all edges N-1 times
        for (let i = 0; i < n - 1; i++) {
            // Optimization: if no distances change in an iteration, we can stop early
            let relaxed = false; 
            for (const [u, v, w] of times) {
                if (dist[u - 1] + w < dist[v - 1]) {
                    dist[v - 1] = dist[u - 1] + w;
                    relaxed = true;
                }
            }
            if (!relaxed) break; 
        }

        const maxTime = Math.max(...dist);
        return maxTime === Infinity ? -1 : maxTime;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: $O(V \cdot E)$. We loop over all $E$ edges $V-1$ times.
* **Space Complexity**: $O(V)$ to store the distance array.

---

### 4. Shortest Path Faster Algorithm (SPFA)

**Intuition:**
SPFA is an optimization of Bellman-Ford. Instead of blindly relaxing *all* edges in every iteration, we use a queue to only relax edges originating from nodes whose shortest distance was recently updated. If a node's distance hasn't improved, evaluating its outgoing edges is a waste of time.

```javascript
class Solution {
    /**
     * @param {number[][]} times
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    networkDelayTime(times, n, k) {
        const adj = new Map();
        for (let i = 1; i <= n; i++) adj.set(i, []);
        for (const [u, v, w] of times) adj.get(u).push([v, w]);

        const dist = new Array(n + 1).fill(Infinity);
        dist[k] = 0;
        
        // Queue stores nodes that have been recently relaxed/updated
        const q = [k]; 

        while (q.length > 0) {
            const node = q.shift(); // Dequeue
            
            for (const [nei, w] of adj.get(node)) {
                if (dist[node] + w < dist[nei]) {
                    dist[nei] = dist[node] + w;
                    // Note: Standard SPFA usually keeps track of whether a node 
                    // is already in the queue to avoid duplicate additions, 
                    // but this basic version still functions as an optimized BFS.
                    q.push(nei);
                }
            }
        }

        let maxTime = 0;
        for (let i = 1; i <= n; i++) {
            maxTime = Math.max(maxTime, dist[i]);
        }

        return maxTime === Infinity ? -1 : maxTime;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: Average $O(V + E)$, Worst Case $O(V \cdot E)$ (similar to Bellman-Ford if the graph is dense or has specific structures).
* **Space Complexity**: $O(V + E)$ for adjacency list and queue.

---

### 5. Dijkstra's Algorithm (Optimal)

**Intuition:**
Since all edge weights (times) are non-negative, Dijkstra's algorithm is the most efficient choice. We use a **Min-Priority Queue (Min-Heap)** to always process the node that currently has the smallest known arrival time. Once a node is popped from the heap, its shortest path is guaranteed to be finalized. We then update its neighbors and push them into the heap. ✅

```javascript
const { MinPriorityQueue } = require('@datastructures-js/priority-queue');

class Solution {
    /**
     * @param {number[][]} times
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    networkDelayTime(times, n, k) {
        const adj = new Map();
        for (let i = 1; i <= n; i++) adj.set(i, []);
        for (const [u, v, w] of times) adj.get(u).push([v, w]);

        // Min-Heap stores elements as [distance, node]
        // We prioritize popping elements with the smallest distance
        const minHeap = new MinPriorityQueue((x) => x[0]);
        minHeap.enqueue([0, k]);
        
        const visit = new Set();
        let maxTime = 0;

        while (!minHeap.isEmpty()) {
            const [time, node] = minHeap.dequeue();
            
            // If already finalized, skip
            if (visit.has(node)) continue;
            
            visit.add(node);
            maxTime = time; // Time monotonically increases due to Min-Heap

            // Optimization: If we've visited all nodes, we can stop early
            if (visit.size === n) break;

            for (const [nei, w] of adj.get(node)) {
                if (!visit.has(nei)) {
                    minHeap.enqueue([time + w, nei]);
                }
            }
        }

        return visit.size === n ? maxTime : -1;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: $O(E \log V)$. Processing each edge involves a heap insertion/extraction which takes $O(\log V)$.
* **Space Complexity**: $O(V + E)$ for the adjacency list, visited set, and heap.