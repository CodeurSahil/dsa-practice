![Alien Dictionary](/asset/images/AlienDictionary.png)
![Alien Dictionary](/asset/images/AlienDictionary2.png)

---

### 1. Depth First Search (Post-order Topological Sort)

**Intuition:**
We build a graph where an edge `A -> B` means letter `A` comes before letter `B` in the alien alphabet. 
To build the ordering and detect invalid alphabets (cycles), we use a standard 3-state DFS:
1. **Unvisited**: We haven't seen this character yet.
2. **Visiting (`true`)**: This character is currently in our active recursion stack. If we see it again, we've hit a cycle!
3. **Visited (`false`)**: We've fully processed this character and all its descendants.

We push characters to our result array *after* fully exploring their descendants, which gives us a reverse topological order. We reverse the array at the end to get the correct alphabet.

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {string}
     */
    foreignDictionary(words) {
        const adj = new Map();
        
        // 1. Initialize adjacency list with EVERY unique character
        for (const word of words) {
            for (const char of word) {
                if (!adj.has(char)) adj.set(char, new Set());
            }
        }

        // 2. Build the graph by comparing adjacent words
        for (let i = 0; i < words.length - 1; i++) {
            const w1 = words[i];
            const w2 = words[i + 1];
            const minLen = Math.min(w1.length, w2.length);

            // Invalid Case: prefix comes after the longer word (e.g., "abc" before "ab")
            if (w1.length > w2.length && w1.slice(0, minLen) === w2.slice(0, minLen)) {
                return ""; 
            }

            // Find the first differing character to establish an ordering rule
            for (let j = 0; j < minLen; j++) {
                if (w1[j] !== w2[j]) {
                    adj.get(w1[j]).add(w2[j]);
                    break; // Only the *first* difference tells us the order
                }
            }
        }

        const visited = {}; // char -> boolean (true = visiting, false = fully processed)
        const res = [];

        // 3. DFS for Topological Sort and Cycle Detection
        const dfs = (char) => {
            if (visited[char] !== undefined) {
                return visited[char]; // If true, we found a cycle. If false, it's already processed.
            }

            visited[char] = true; // Mark as currently visiting

            for (const neighbor of adj.get(char)) {
                if (dfs(neighbor)) {
                    return true; // Cycle detected deeper in the recursion
                }
            }

            visited[char] = false; // Mark as fully processed
            res.push(char);        // Add to result in post-order
            return false;
        };

        // 4. Run DFS on every unique character
        for (const char of adj.keys()) {
            if (dfs(char)) {
                return ""; // If any DFS path has a cycle, no valid ordering exists
            }
        }

        // 5. Reverse post-order to get the correct topological order
        return res.reverse().join("");
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(N + V + E)$, where $N$ is the total length of all words, $V$ is the number of unique characters, and $E$ is the number of rules (edges).
* **Space Complexity**: $O(V + E)$ for the adjacency list and recursion stack.

---

### 2. Topological Sort (Kahn's Algorithm / BFS)

**Intuition:**
This approach builds the alphabet from the "beginning" rather than the end. 
We count the number of prerequisites each character has (`indegree`). Any character with an indegree of `0` has no prerequisites and can be added to our alphabet immediately. As we add characters to our alphabet, we "remove" them from the graph by decrementing the indegree of their neighbors. If a neighbor's indegree drops to `0`, it's now ready to be processed.

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {string}
     */
    foreignDictionary(words) {
        const adj = new Map();
        const indegree = new Map();

        // 1. Initialize maps for every unique character
        for (const word of words) {
            for (const char of word) {
                if (!adj.has(char)) {
                    adj.set(char, new Set());
                    indegree.set(char, 0);
                }
            }
        }

        // 2. Build the graph and count indegrees
        for (let i = 0; i < words.length - 1; i++) {
            const w1 = words[i];
            const w2 = words[i + 1];
            const minLen = Math.min(w1.length, w2.length);

            if (w1.length > w2.length && w1.slice(0, minLen) === w2.slice(0, minLen)) {
                return ""; // Invalid ordering
            }

            for (let j = 0; j < minLen; j++) {
                if (w1[j] !== w2[j]) {
                    // Only increment indegree if this is a NEW edge
                    if (!adj.get(w1[j]).has(w2[j])) {
                        adj.get(w1[j]).add(w2[j]);
                        indegree.set(w2[j], indegree.get(w2[j]) + 1);
                    }
                    break;
                }
            }
        }

        // 3. Initialize queue with all characters that have 0 prerequisites
        const q = [];
        for (const [char, degree] of indegree.entries()) {
            if (degree === 0) {
                q.push(char);
            }
        }

        const res = [];

        // 4. Process queue
        while (q.length > 0) {
            const char = q.shift();
            res.push(char);

            for (const neighbor of adj.get(char)) {
                indegree.set(neighbor, indegree.get(neighbor) - 1);
                
                // If all prerequisites are met, add to queue
                if (indegree.get(neighbor) === 0) {
                    q.push(neighbor);
                }
            }
        }

        // 5. Check for cycles
        // If we processed all characters, we successfully ordered the alphabet.
        // If the result length is smaller, some characters were stuck in a cycle.
        if (res.length !== indegree.size) {
            return ""; 
        }

        return res.join("");
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(N + V + E)$
* **Space Complexity**: $O(V + E)$

---