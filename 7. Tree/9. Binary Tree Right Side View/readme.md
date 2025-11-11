![Binary Tree Right Side View](/asset/images/BinaryTreeRightSideView.png)
![Binary Tree Right Side View](/asset/images/BinaryTreeRightSideView2.png)
![Binary Tree Right Side View](/asset/images/BinaryTreeRightSideView3.png)

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

This approach uses a **recursive DFS** and keeps track of the current `depth`. The key insight is to visit the **right child first**. This ensures that the *first time* we visit a new depth, the node we are on is the rightmost node at that level. We add it to our result and continue. 🌳

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number[]}
     */
    rightSideView(root) {
        let res = [];

        function dfs(node, depth) {
            if (!node) return;

            // If this is the first time we've seen this depth,
            // it must be the rightmost node so far.
            if (res.length === depth) {
                res.push(node.val);
            }

            dfs(node.right, depth + 1); // Visit right first
            dfs(node.left, depth + 1);
        }

        dfs(root, 0);
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(h)$ (for the recursion stack, where $h$ is the tree's height)

-----

### 2\. Breadth First Search (BFS)

This approach uses a **queue** for a level-by-level traversal. For each level, it processes all nodes in the queue. The **last node** processed at each level is the rightmost node, which gets added to the result. 🌊

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number[]}
     */
    rightSideView(root) {
        const res = [];
        if (!root) return res;
        
        const q = [root]; // Using an array as a queue

        while (q.length > 0) {
            let rightSide = null;
            const qLen = q.length;

            for (let i = 0; i < qLen; i++) {
                const node = q.shift(); // Dequeue
                if (node) {
                    rightSide = node; // Update rightmost node seen so far
                    q.push(node.left);
                    q.push(node.right);
                }
            }
            if (rightSide) {
                res.push(rightSide.val);
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$ (for the queue, which holds at most one level)