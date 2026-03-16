![Clone Graph](/asset/images/CloneGraph.png)
![Clone Graph](/asset/images/CloneGraph2.png)
![Clone Graph](/asset/images/CloneGraph3.png)
![Clone Graph](/asset/images/CloneGraph4.png)

---

### 1. Depth First Search (DFS)

This approach uses recursion to traverse the graph. To handle cycles (where a node points back to an ancestor) and avoid infinite loops, we use a `Map` to store visited nodes.

* **Key Idea:** The map stores `original_node -> cloned_node`.
* If we encounter a node already in the map, we simply return the stored clone.
* Otherwise, we create a new node, add it to the map, and recursively clone its neighbors.

```javascript
/**
 * // Definition for a Node.
 * class Node {
 * constructor(val = 0, neighbors = []) {
 * this.val = val;
 * this.neighbors = neighbors;
 * }
 * }
 */

class Solution {
    /**
     * @param {Node} node
     * @return {Node}
     */
    cloneGraph(node) {
        const oldToNew = new Map();
        return this.dfs(node, oldToNew);
    }

    /**
     * @param {Node} node
     * @param {Map} oldToNew
     * @return {Node}
     */
    dfs(node, oldToNew) {
        if (node === null) {
            return null;
        }

        // If the node is already visited, return its clone
        if (oldToNew.has(node)) {
            return oldToNew.get(node);
        }

        // Create a copy and store it in the map immediately (before recursion)
        const copy = new Node(node.val);
        oldToNew.set(node, copy);

        // Recursively clone all neighbors
        for (const nei of node.neighbors) {
            copy.neighbors.push(this.dfs(nei, oldToNew));
        }

        return copy;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: , where  is vertices (nodes) and  is edges. We visit every node and iterate through every edge once.
* **Space Complexity**:  for the recursion stack and the `oldToNew` map.

---

### 2. Breadth First Search (BFS)

This approach uses a **Queue** to explore the graph layer by layer. It is iterative and avoids potential stack overflow issues on very deep graphs.

* We start by cloning the first node and pushing it to the queue.
* While the queue is not empty, we process the current node.
* For each neighbor, if it hasn't been visited (not in the map), we clone it and add it to the queue.
* We then link the current clone to the neighbor's clone.

```javascript
/**
 * // Definition for a Node.
 * class Node {
 * constructor(val = 0, neighbors = []) {
 * this.val = val;
 * this.neighbors = neighbors;
 * }
 * }
 */

class Solution {
    /**
     * @param {Node} node
     * @return {Node}
     */
    cloneGraph(node) {
        if (!node) return null;
        
        const oldToNew = new Map();
        const q = new Queue(); // Assumes Queue class exists, or use array []
        
        // Initialize with the first node
        oldToNew.set(node, new Node(node.val));
        q.push(node);

        while (!q.isEmpty()) {
            const cur = q.pop(); // Dequeue
            
            for (const nei of cur.neighbors) {
                // If neighbor hasn't been cloned yet
                if (!oldToNew.has(nei)) {
                    oldToNew.set(nei, new Node(nei.val));
                    q.push(nei);
                }
                // Add the clone of the neighbor to the current node's neighbors
                oldToNew.get(cur).neighbors.push(oldToNew.get(nei));
            }
        }
        return oldToNew.get(node);
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: .
* **Space Complexity**:  for the `oldToNew` map and the queue.
