![Binary Tree Level Order Traversal](/asset/images/BinaryTreeLevelOrderTraversal.png)
![Binary Tree Level Order Traversal](/asset/images/BinaryTreeLevelOrderTraversal2.png)

*A `TreeNode` definition, as used in these examples:*

```javascript
/**
 * Definition for a binary tree node.
 * class TreeNode {
 * constructor(val = 0, left = null, right = null) {
 * this.val = val;
 * this.left = left;
 * this.right = right;
 * }
 * }
 */
```

-----

### 1\. Depth First Search (DFS)

This approach uses **recursion** to traverse the tree. It keeps track of the current `depth` of each node. When visiting a node, it uses the `depth` as an index to add the node's value to the correct level in the `res` array.

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number[][]}
     */
    levelOrder(root) {
        let res = [];

        /**
         * @param {TreeNode} node
         * @param {number} depth
         */
        function dfs(node, depth) {
            if (!node) return;

            if (res.length === depth) {
                res.push([]);
            }

            res[depth].push(node.val);
            dfs(node.left, depth + 1);
            dfs(node.right, depth + 1);
        }

        dfs(root, 0);
        return res;
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$ (or $O(h)$ for a balanced tree, due to the recursion stack)

-----

### 2\. Breadth First Search (BFS)

This is the classic, iterative solution using a **queue**. It processes the tree level by level. In each iteration, it finds the number of nodes at the current level (`q.size()`), dequeues that many nodes, adds their values to a `level` array, and enqueues all their children for the next level. 🌊

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number[][]}
     */
    levelOrder(root) {
        let res = [];
        if (!root) return res;

        const q = [root]; // Using an array as a queue

        while (q.length > 0) {
            let level = [];
            const size = q.length;

            for (let i = 0; i < size; i++) {
                let node = q.shift(); // Dequeue
                if (node !== null) {
                    level.push(node.val);
                    if (node.left) q.push(node.left);   // Enqueue left
                    if (node.right) q.push(node.right); // Enqueue right
                }
            }
            if (level.length > 0) {
                res.push(level);
            }
        }
        return res;
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$ (for the queue, which can hold up to $n/2$ nodes in a complete tree)