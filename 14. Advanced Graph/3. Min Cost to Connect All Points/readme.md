![Min Cost to Connect All Points](/asset/images/MinCosttoConnectAllPoints.png)
![Min Cost to Connect All Points](/asset/images/MinCosttoConnectAllPoints2.png)

---

### 1. Kruskal's Algorithm (with Disjoint Set Union)

**Intuition:**
Kruskal's algorithm builds the MST by sorting all possible edges by their weight (cost). We iterate through the sorted edges, picking the cheapest one. We use a Disjoint Set Union (DSU) data structure to check if adding this edge forms a cycle. If it doesn't (the points are in different components), we add the edge to our MST.

```javascript
class DSU {
    constructor(n) {
        this.Parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.Size = Array(n + 1).fill(1);
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
        
        // If they share the same root, connecting them forms a cycle
        if (pu === pv) {
            return false;
        }
        
        // Union by size
        if (this.Size[pu] < this.Size[pv]) {
            [pu, pv] = [pv, pu]; // Swap to attach smaller tree to larger tree
        }
        this.Size[pu] += this.Size[pv];
        this.Parent[pv] = pu;
        return true;
    }
}

class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    minCostConnectPoints(points) {
        const n = points.length;
        const dsu = new DSU(n);
        const edges = [];

        // Generate all possible edges (n * (n - 1) / 2)
        for (let i = 0; i < n; i++) {
            const [x1, y1] = points[i];
            for (let j = i + 1; j < n; j++) {
                const [x2, y2] = points[j];
                const dist = Math.abs(x1 - x2) + Math.abs(y1 - y2);
                edges.push([dist, i, j]);
            }
        }

        // Sort edges by distance (cheapest first)
        edges.sort((a, b) => a[0] - b[0]);

        let res = 0;
        let edgesAdded = 0;

        for (const [dist, u, v] of edges) {
            if (dsu.union(u, v)) {
                res += dist;
                edgesAdded++;
                // Optimization: Stop early if we have n - 1 edges (MST complete)
                if (edgesAdded === n - 1) break;
            }
        }
        return res;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n^2 \log(n^2)) \to O(n^2 \log n)$ due to generating and sorting $O(n^2)$ edges.
* **Space Complexity**: $O(n^2)$ to store the edges array.

---

### 2. Prim's Algorithm (Standard Min-Heap)

**Intuition:**
Prim's algorithm starts from an arbitrary node (e.g., node 0) and grows the MST. It maintains a Min-Heap of edges connecting the current MST to unvisited nodes. In each step, it pops the cheapest edge, adds the new node to the MST, and pushes all edges from this new node to other unvisited nodes into the heap.

```javascript
const { MinPriorityQueue } = require('@datastructures-js/priority-queue');

class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    minCostConnectPoints(points) {
        const n = points.length;
        
        // Build adjacency list: node -> [distance, neighbor]
        const adj = Array.from({ length: n }, () => []);
        for (let i = 0; i < n; i++) {
            const [x1, y1] = points[i];
            for (let j = i + 1; j < n; j++) {
                const [x2, y2] = points[j];
                const dist = Math.abs(x1 - x2) + Math.abs(y1 - y2);
                adj[i].push([dist, j]);
                adj[j].push([dist, i]);
            }
        }

        let res = 0;
        const visit = new Set();
        
        // Min-Heap stores [cost, node]
        const minH = new MinPriorityQueue((x) => x[0]);
        minH.enqueue([0, 0]); // Start at node 0 with 0 cost

        while (visit.size < n) {
            const [cost, i] = minH.dequeue();
            
            if (visit.has(i)) continue;
            
            res += cost;
            visit.add(i);
            
            for (const [neiCost, nei] of adj[i]) {
                if (!visit.has(nei)) {
                    minH.enqueue([neiCost, nei]);
                }
            }
        }
        return res;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n^2 \log n)$. Every edge (up to $n^2$) might be pushed to and popped from the heap.
* **Space Complexity**: $O(n^2)$ for the adjacency list and the heap.

---

### 3. Prim's Algorithm (Optimal Array-based)

**Intuition:**
For dense graphs (like a complete graph where every point connects to every other point), we can optimize Prim's algorithm by avoiding the heap and adjacency list entirely.
Instead of storing all edges, we maintain a `dist` array that keeps track of the **minimum distance from the *entire current MST* to every unvisited node**.
In each step, we simply find the unvisited node with the minimum `dist` using an $O(n)$ linear scan, add it to the MST, and then update the `dist` array for the remaining unvisited nodes based on the newly added node. ✅

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    minCostConnectPoints(points) {
        const n = points.length;
        // dist[i] represents the min cost to connect node i to the current MST
        const dist = new Array(n).fill(Infinity);
        const visit = new Array(n).fill(false);
        
        let node = 0; // Start building from node 0
        let edgesAdded = 0;
        let res = 0;

        while (edgesAdded < n - 1) {
            visit[node] = true;
            let nextNode = -1;
            
            // 1. Update distances and find the closest unvisited node
            for (let i = 0; i < n; i++) {
                if (visit[i]) continue;
                
                // Calculate distance from newly added 'node' to unvisited 'i'
                const curDist = Math.abs(points[i][0] - points[node][0]) +
                                Math.abs(points[i][1] - points[node][1]);
                
                // Update shortest known distance to node i from the MST
                dist[i] = Math.min(dist[i], curDist);
                
                // Track the node with the absolute minimum distance to the MST
                if (nextNode === -1 || dist[i] < dist[nextNode]) {
                    nextNode = i;
                }
            }

            // 2. Add the closest node to the MST
            res += dist[nextNode];
            node = nextNode; // Make it the new active node for the next iteration
            edgesAdded++;
        }

        return res;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n^2)$. We perform an $O(n)$ scan exactly $n-1$ times. There is no sorting and no heap overhead.
* **Space Complexity**: $O(n)$. We only need the `dist` and `visit` arrays of size $n$, making this highly memory efficient.