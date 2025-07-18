## ✅ Your Approach: DFS with Cycle Detection

* Time Complexity: **O(V + E)**
* Space Complexity: **O(V + E)** (due to recursion stack and graph representation)

### ✅ Pros:

* Simple and elegant.
* Detects cycles directly.
* Works well for most cases.

### ❌ Potential Improvements:

1. Use `Array(numCourses).fill(false)` for visited and recursion arrays to make them explicitly boolean.
2. Don’t recreate `cycleCheck` array every time in the loop — it should be maintained and cleared for each DFS.

```js
var canFinish = function(numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => []);

    for (const [course, pre] of prerequisites) {
        graph[pre].push(course);
    }

    const visited = new Array(numCourses).fill(false);
    const inRecStack = new Array(numCourses).fill(false);

    const dfs = (v) => {
        visited[v] = true;
        inRecStack[v] = true;

        for (const neighbor of graph[v]) {
            if (inRecStack[neighbor]) return true;
            if (!visited[neighbor] && dfs(neighbor)) return true;
        }

        inRecStack[v] = false;
        return false;
    };

    for (let i = 0; i < numCourses; i++) {
        if (!visited[i] && dfs(i)) return false;
    }

    return true;
};
```

---

## 🚀 Alternative (Sometimes Preferred): Kahn's Algorithm (BFS / Topological Sort)

### Idea:

* Count **in-degrees** of each node.
* Start with nodes that have 0 in-degree.
* Repeatedly remove nodes with 0 in-degree and reduce neighbors’ in-degrees.
* If we finish processing all nodes → no cycle.

### Code:

```js
var canFinish = function(numCourses, prerequisites) {
    const inDegree = new Array(numCourses).fill(0);
    const graph = Array.from({ length: numCourses }, () => []);

    for (const [course, pre] of prerequisites) {
        graph[pre].push(course);
        inDegree[course]++;
    }

    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    let count = 0;

    while (queue.length > 0) {
        const curr = queue.shift();
        count++;

        for (const neighbor of graph[curr]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) queue.push(neighbor);
        }
    }

    return count === numCourses;
};
```

---

## ✅ When to Choose What?

| Approach               | Use Case                                                                      |
| ---------------------- | ----------------------------------------------------------------------------- |
| **DFS (your current)** | You want to directly detect a cycle                                           |
| **Kahn's (BFS)**       | You need **topological ordering** or want a non-recursive, iterative approach |

---

## ⚙️ Performance Comparison (Same Big-O):

Both are `O(V + E)` time and space — you won’t see a significant difference unless the input size is very large or recursion depth becomes a problem.

---

Let me know if you’d like to implement **topological sorting** with return of the order instead!
