![Validate Binary Search Tree](/asset/images/ValidateBinarySearchTree.png)
![Validate Binary Search Tree](/asset/images/ValidateBinarySearchTree2.png)

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

### 1\. Brute Force

This "top-down" recursive approach is inefficient. For *every* node, it not only checks its immediate children but also recursively validates that *all* descendants in the left subtree are smaller and *all* descendants in the right are larger, leading to many redundant checks. 🐢

```javascript
class Solution {
    /**
     * @param {number} val
     * @param {number} limit
     * @returns {boolean}
     */
    left_check(val, limit) {
        return val < limit;
    }

    /**
     * @param {number} val
     * @param {number} limit
     * @returns {boolean}
     */
    right_check(val, limit) {
        return val > limit;
    }

    /**
     * @param {TreeNode} root
     * @returns {boolean}
     */
    isValidBST(root) {
        if (!root) {
            return true;
        }

        if (
            !this.isValid(root.left, root.val, this.left_check) ||
            !this.isValid(root.right, root.val, this.right_check)
        ) {
            return false;
        }

        return this.isValidBST(root.left) && this.isValidBST(root.right);
    }

    /**
     * @param {TreeNode} root
     * @param {number} limit
     * @param {function} check
     * @returns {boolean}
     */
    isValid(root, limit, check) {
        if (!root) {
            return true;
        }
        if (!check.call(this, root.val, limit)) {
            return false;
        }
        return (
            this.isValid(root.left, limit, check) &&
            this.isValid(root.right, limit, check)
        );
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n^2)$
  * **Space complexity**: $O(n)$

-----

### 2\. Depth First Search (DFS)

This is the optimal recursive solution. It performs a single DFS pass, validating each node by ensuring its value falls within a valid range `(min_val, max_val)`. This range is progressively narrowed as the traversal goes down the tree. ✅

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {boolean}
     */
    isValidBST(root) {
        return this.valid(root, -Infinity, Infinity);
    }

    /**
     * @param {TreeNode} node
     * @param {number} left
     * @param {number} right
     */
    valid(node, left, right) {
        if (node === null) {
            return true;
        }
        if (!(left < node.val && node.val < right)) {
            return false;
        }
        return (
            this.valid(node.left, left, node.val) &&
            this.valid(node.right, node.val, right)
        );
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(h)$ (for the recursion stack, where $h$ is the tree's height)

-----

### 3\. Breadth First Search (BFS)

This iterative approach uses a **queue** to check the same logic as the optimal DFS. Each item in the queue stores a triplet `[node, min_bound, max_bound]`, ensuring the node's value is valid for its position in the tree. 🌊

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {boolean}
     */
    isValidBST(root) {
        if (root === null) {
            return true;
        }

        const queue = [[root, -Infinity, Infinity]]; // Using array as queue

        while (queue.length > 0) {
            const [node, left, right] = queue.shift(); // Dequeue

            if (!(left < node.val && node.val < right)) {
                return false;
            }
            if (node.left) {
                queue.push([node.left, left, node.val]);
            }
            if (node.right) {
                queue.push([node.right, node.val, right]);
            }
        }

        return true;
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$ (for the queue)