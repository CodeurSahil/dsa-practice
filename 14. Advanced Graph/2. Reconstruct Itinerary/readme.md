![Reconstruct Itinerary](/asset/images/ReconstructItinerary.png)
![Reconstruct Itinerary](/asset/images/ReconstructItinerary2.png)

---

### 1. Depth First Search (DFS with Backtracking)

**Intuition:**
We build an itinerary step-by-step. At each airport, we look at all possible destinations in alphabetical order. We pick one, "use" the ticket, and keep going. If we hit a dead end before using all our tickets, we realize we made a mistake, so we backtrack (undo the choice) and try the next alphabetical destination.

```javascript
class Solution {
    /**
     * @param {string[][]} tickets
     * @return {string[]}
     */
    findItinerary(tickets) {
        const adj = new Map();
        
        // Sort tickets lexicographically so we always try the smallest destination first
        tickets.sort();
        
        for (const [src, dst] of tickets) {
            if (!adj.has(src)) adj.set(src, []);
            adj.get(src).push(dst);
        }

        const res = ["JFK"];

        const dfs = (src) => {
            // Base case: If we used all tickets, we are done!
            if (res.length === tickets.length + 1) {
                return true;
            }
            
            // If we reach an airport with no outgoing flights but haven't used all tickets
            if (!adj.has(src)) {
                return false;
            }

            const dests = adj.get(src);
            for (let i = 0; i < dests.length; i++) {
                const v = dests[i];
                
                // 1. Choose: Remove the ticket from our options
                adj.get(src).splice(i, 1);
                res.push(v);
                
                // 2. Explore
                if (dfs(v)) return true;
                
                // 3. Backtrack: Put the ticket back and try the next one
                adj.get(src).splice(i, 0, v);
                res.pop();
            }
            return false;
        };

        dfs("JFK");
        return res;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(E \cdot V)$, where $E$ is the number of edges (tickets) and $V$ is the number of vertices (airports). In the worst case, backtracking explores multiple branches.
* **Space Complexity**: $O(E \cdot V)$ for the recursion stack and adjacency list.

---

### 2. Hierholzer's Algorithm (Recursion)

**Intuition:**
This problem guarantees a valid Eulerian Path exists. Hierholzer's Algorithm is the mathematically optimal way to find it. We fly as far as we possibly can until we get completely stuck. The airport where we get stuck *must* be the final destination of our entire trip. We add it to our result, step backwards, and see if we missed any side-trips. 

Because we add airports to the result from the end of the trip to the beginning (post-order traversal), we reverse the array at the very end. We sort the tickets in *reverse* alphabetical order so we can efficiently use `.pop()` to grab the smallest destination.

```javascript
class Solution {
    /**
     * @param {string[][]} tickets
     * @return {string[]}
     */
    findItinerary(tickets) {
        const adj = new Map();
        
        // Sort in reverse lexicographical order so pop() grabs the smallest string
        tickets.sort().reverse();
        
        for (const [src, dst] of tickets) {
            if (!adj.has(src)) adj.set(src, []);
            adj.get(src).push(dst);
        }

        const res = [];
        
        const dfs = (src) => {
            const dests = adj.get(src);
            // While there are still outgoing flights from this airport
            while (dests && dests.length > 0) {
                const dst = dests.pop();
                dfs(dst);
            }
            // Once stuck, push to the result (builds the path backwards)
            res.push(src);
        };

        dfs("JFK");
        return res.reverse();
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(E \log E)$ due to the initial sorting step. The DFS processes each edge exactly once.
* **Space Complexity**: $O(E)$ for the recursion stack and the graph structure.

---

### 3. Hierholzer's Algorithm (Iteration)

**Intuition:**
This is the exact same logic as the recursive Hierholzer's approach, but we manually manage the call stack using an array (`stack`). This prevents maximum call stack size exceeded errors on extremely large inputs. 

```javascript
class Solution {
    /**
     * @param {string[][]} tickets
     * @return {string[]}
     */
    findItinerary(tickets) {
        const adj = new Map();
        
        // Sort reverse so pop() gets the smallest lexical destination
        tickets.sort().reverse();
        
        for (const [src, dst] of tickets) {
            if (!adj.has(src)) adj.set(src, []);
            adj.get(src).push(dst);
        }

        const stack = ["JFK"];
        const res = [];

        while (stack.length > 0) {
            const curr = stack[stack.length - 1]; // Peek at the top of the stack
            const dests = adj.get(curr);
            
            // If stuck (no outgoing flights left), pop and add to result
            if (!dests || dests.length === 0) {
                res.push(stack.pop());
            } else {
                // Otherwise, take the next flight
                stack.push(dests.pop());
            }
        }

        return res.reverse();
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(E \log E)$
* **Space Complexity**: $O(E)$

---