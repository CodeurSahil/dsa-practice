![Maximum Depth of Binary Tree](/asset/images/MaximumDepthofBinaryTree.png)
![Maximum Depth of Binary Tree](/asset/images/MaximumDepthofBinaryTree2.png)

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

### 1\. Recursive DFS

This is the most intuitive approach, defining the depth recursively. The depth of a node is 1 (for itself) plus the maximum of its left or right subtree's depth. The base case for a `null` node is a depth of 0. 🌳

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maxDepth(root) {
        if (root === null) {
            return 0;
        }

        return (
            1 + Math.max(this.maxDepth(root.left), this.maxDepth(root.right))
        );
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(h)$
      * **Best Case (balanced tree)**: $O(\log n)$
      * **Worst Case (skewed tree)**: $O(n)$

(Where $n$ is the number of nodes and $h$ is the height of the tree.)

-----

### 2\. Iterative DFS (Stack)

This method uses an explicit **stack** to mimic the recursive DFS. It stores pairs of `[node, depth]`. When a node is popped, its depth is compared to the current maximum, and its children are pushed onto the stack with an incremented depth.

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maxDepth(root) {
        if (!root) return 0;
        
        const stack = [[root, 1]];
        let res = 0;

        while (stack.length > 0) {
            const [node, depth] = stack.pop();

            if (node !== null) {
                res = Math.max(res, depth);
                stack.push([node.left, depth + 1]);
                stack.push([node.right, depth + 1]);
            }
        }
        return res;
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$ (in the worst case)

-----

### 3\. Breadth-First Search (BFS)

This approach uses a **queue** for a level-by-level traversal. The maximum depth is simply the total number of levels traversed. We process all nodes at one level before moving to the next, incrementing the `level` counter each time. 🌊

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maxDepth(root) {
        if (!root) return 0;

        const queue = [root];
        let level = 0;
        
        while (queue.length > 0) {
            const size = queue.length;
            for (let i = 0; i < size; i++) {
                const node = queue.shift();
                if (node.left) {
                    queue.push(node.left);
                }
                if (node.right) {
                    queue.push(node.right);
                }
            }
            level++;
        }
        return level;
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$ (in the worst case, for a complete tree)