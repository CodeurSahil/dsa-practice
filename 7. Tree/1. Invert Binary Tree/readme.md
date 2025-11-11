![Invert Binary Tree](/asset/images/InvertBinaryTree.png)
![Invert Binary Tree](/asset/images/InvertBinaryTree2.png)

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

### 1\. Breadth-First Search

This approach uses a queue to visit each node level by level, swapping its left and right children.

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {TreeNode}
     */
    invertTree(root) {
        if (root == null) return null;
        const queue = [root]; // Using an array as a queue
        while (queue.length > 0) {
            let node = queue.shift();
            [node.left, node.right] = [node.right, node.left];
            if (node.left != null) queue.push(node.left);
            if (node.right != null) queue.push(node.right);
        }
        return root;
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$

-----

### 2\. Depth-First Search

This is the classic recursive solution. It swaps the children of the current node and then recursively inverts the left and right subtrees.

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {TreeNode}
     */
    invertTree(root) {
        if (!root) return null;

        [root.left, root.right] = [root.right, root.left];
        this.invertTree(root.left);
        this.invertTree(root.right);

        return root;
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$ (for the recursion stack, $O(h)$ average, $O(n)$ worst case)

-----

### 3\. Iterative DFS

This approach uses an explicit stack to perform a depth-first traversal, mimicking the recursive solution without using the call stack.

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {TreeNode}
     */
    invertTree(root) {
        if (!root) return null;
        const stack = [root];
        while (stack.length) {
            const node = stack.pop();
            [node.left, node.right] = [node.right, node.left];
            if (node.left) stack.push(node.left);
            if (node.right) stack.push(node.right);
        }
        return root;
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$ (for the stack, $O(h)$ average, $O(n)$ worst case)