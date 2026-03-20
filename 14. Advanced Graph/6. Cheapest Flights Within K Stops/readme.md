![Cheapest Flights Within K Stops](/asset/images/CheapestFlightsWithinKStops.png)
![Cheapest Flights Within K Stops](/asset/images/CheapestFlightsWithinKStops2.png)
![Cheapest Flights Within K Stops](/asset/images/CheapestFlightsWithinKStops3.png)
![Cheapest Flights Within K Stops](/asset/images/CheapestFlightsWithinKStops4.png)

---

### 1. Dijkstra's Algorithm (State-Space Search)

**Intuition:**
Standard Dijkstra's algorithm finds the cheapest path by always expanding the lowest-cost node. However, it completely ignores our $k$-stops limit. To fix this, we change our definition of a "visited node." Instead of just tracking `dist[city]`, we track a 2D state: `dist[city][stopsUsed]`. 

We use a Min-Priority Queue to always expand the cheapest known state. The first time we pop our destination (`dst`) from the heap, we are mathematically guaranteed that it is the cheapest possible route within our stop constraints.



```javascript
const { MinPriorityQueue } = require('@datastructures-js/priority-queue');

class Solution {
    /**
     * @param {number} n
     * @param {number[][]} flights
     * @param {number} src
     * @param {number} dst
     * @param {number} k
     * @return {number}
     */
    findCheapestPrice(n, flights, src, dst, k) {
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v, cst] of flights) {
            adj[u].push([v, cst]);
        }

        // dist[city][stops] tracks the best cost to reach a city with a specific number of stops
        const dist = Array.from({ length: n }, () => Array(k + 5).fill(Infinity));
        dist[src][0] = 0;

        // Min-Heap stores elements as an array: [cost, node, stops_so_far]
        const minHeap = new MinPriorityQueue((x) => x[0]);
        minHeap.enqueue([0, src, -1]);

        while (!minHeap.isEmpty()) {
            const [cst, node, stops] = minHeap.dequeue();

            // The first time we reach the destination, it is guaranteed to be the cheapest
            if (node === dst) return cst;
            
            // If we hit our stop limit, or if we've already found a better cost for this state, skip
            if (stops === k || dist[node][stops + 1] < cst) {
                continue;
            }

            for (const [nei, w] of adj[node]) {
                const nextCst = cst + w;
                const nextStops = stops + 1;
                
                // If this path is strictly cheaper for this specific number of stops, record and queue it
                if (dist[nei][nextStops + 1] > nextCst) {
                    dist[nei][nextStops + 1] = nextCst;
                    minHeap.enqueue([nextCst, nei, nextStops]);
                }
            }
        }

        return -1;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(m \cdot k \cdot \log(n \cdot k))$. The heap can grow up to the number of unique states.
* **Space Complexity**: $O(n \cdot k)$ to store the 2D distance array and the heap.

---

### 2. Bellman-Ford Algorithm

**Intuition:**
Bellman-Ford is practically tailor-made for this problem. It naturally processes graphs layer by layer (or edge by edge). 
* Iteration 1 finds the cheapest flights using exactly 1 edge (0 stops).
* Iteration 2 finds the cheapest flights using up to 2 edges (1 stop).
* Iteration $k + 1$ finds the cheapest flights using up to $k+1$ edges ($k$ stops).

We use a temporary array (`tmpPrices`) during each iteration. This prevents a single iteration from "chaining" multiple flights together and accidentally bypassing the stop limit.



```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} flights
     * @param {number} src
     * @param {number} dst
     * @param {number} k
     * @return {number}
     */
    findCheapestPrice(n, flights, src, dst, k) {
        let prices = Array(n).fill(Infinity);
        prices[src] = 0;

        // Run exactly k + 1 iterations (which equals k stops)
        for (let i = 0; i < k + 1; i++) {
            // Create a copy to prevent chaining multiple flights in one step
            const tmpPrices = [...prices];

            for (const [s, d, p] of flights) {
                if (prices[s] === Infinity) continue;
                
                // Relax the edge: if arriving at 'd' via 's' is cheaper, update it
                if (prices[s] + p < tmpPrices[d]) {
                    tmpPrices[d] = prices[s] + p;
                }
            }
            prices = tmpPrices;
        }
        
        return prices[dst] === Infinity ? -1 : prices[dst];
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n + (m \cdot k))$. We loop over all $m$ flights exactly $k+1$ times.
* **Space Complexity**: $O(n)$ to store the `prices` and `tmpPrices` arrays.

---

### 3. Shortest Path Faster Algorithm (SPFA / Level-BFS)

**Intuition:**
This is an optimized hybrid. It acts like Bellman-Ford, but instead of iterating over *all* edges blindly, it uses a queue to only evaluate edges stemming from cities whose prices were successfully updated in the previous step.

Every state in the queue tracks the `currentCost`, `city`, and `stopsUsed`. If expanding a path exceeds `k` stops, we discard it.

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} flights
     * @param {number} src
     * @param {number} dst
     * @param {number} k
     * @return {number}
     */
    findCheapestPrice(n, flights, src, dst, k) {
        const prices = Array(n).fill(Infinity);
        prices[src] = 0;
        
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v, cst] of flights) {
            adj[u].push([v, cst]);
        }

        // Queue stores states as [currentCost, node, stopsUsed]
        const q = [[0, src, 0]];

        while (q.length > 0) {
            const [cst, node, stops] = q.shift(); // Dequeue
            
            // If we've hit our layover limit, stop exploring this specific path
            if (stops > k) continue;

            for (const [nei, w] of adj[node]) {
                const nextCost = cst + w;
                
                // If we found a cheaper way to reach the neighbor, update and queue it
                if (nextCost < prices[nei]) {
                    prices[nei] = nextCost;
                    q.push([nextCost, nei, stops + 1]);
                }
            }
        }

        return prices[dst] !== Infinity ? prices[dst] : -1;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n \cdot k)$. In the worst case, we process updates for every node up to $k$ times.
* **Space Complexity**: $O(n + m)$ for the adjacency list and the queue.

---