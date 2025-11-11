![Balanced Binary Tree](/asset/images/BalancedBinaryTree.png)
![Balanced Binary Tree](/asset/images/BalancedBinaryTree2.png)

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

### 1\. Brute Force (Top-Down Recursion)

This "top-down" approach checks if the *current* node is balanced by calling a separate `height` function. It then recursively checks if the left and right subtrees are also balanced. This is inefficient as it recalculates the heights of the same nodes multiple times. 🐢

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {boolean}
     */
    isBalanced(root) {
        if (root === null) return true;

        let left = this.height(root.left);
        let right = this.height(root.right);
        if (Math.abs(left - right) > 1) return false;
        
        return this.isBalanced(root.left) && this.isBalanced(root.right);
    }

    /**
     * @param {TreeNode} root
     * @return {number}
     */
    height(root) {
        if (root === null) {
            return 0;
        }

        return 1 + Math.max(this.height(root.left), this.height(root.right));
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n^2)$
  * **Space complexity**: $O(n)$

-----

### 2\. Depth First Search (Bottom-Up Recursion)

This is the optimal "bottom-up" approach. It uses a single DFS pass. The helper function returns both the **height** of the subtree and whether it is **balanced**. This allows it to check for balance and calculate height in the same pass, stopping early if an imbalance is found. ✅

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {boolean}
     */
    isBalanced(root) {
        return this.dfs(root)[0] === 1;
    }

    /**
     * @param {TreeNode} root
     * @return {number[]} - Returns [isBalanced (1 or 0), height]
     */
    dfs(root) {
        if (!root) {
            return [1, 0]; // [isBalanced, height]
        }

        const left = this.dfs(root.left);
        const right = this.dfs(root.right);

        const balanced =
            left[0] === 1 &&
            right[0] === 1 &&
            Math.abs(left[1] - right[1]) <= 1;
        const height = 1 + Math.max(left[1], right[1]);

        return [balanced ? 1 : 0, height];
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(h)$
      * **Best Case (balanced tree)**: $O(\log n)$
      * **Worst Case (skewed tree)**: $O(n)$

(Where $n$ is the number of nodes and $h$ is the height of the tree.)

-----

### 3\. Iterative DFS (Post-order)

This approach performs an **iterative post-order traversal** using a stack and a `Map`. The map stores the calculated heights of nodes that have already been processed. When a node's children are both processed, its own height is calculated by retrieving their heights from the map, and the balance check is performed.

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {boolean}
     */
    isBalanced(root) {
        let stack = [];
        let node = root,
            last = null;
        let depths = new Map();

        while (stack.length > 0 || node !== null) {
            if (node !== null) {
                stack.push(node);
                node = node.left;
            } else {
                node = stack[stack.length - 1];
                if (node.right === null || last === node.right) {
                    stack.pop();
                    let left = depths.get(node.left) || 0;
                    let right = depths.get(node.right) || 0;
                    if (Math.abs(left - right) > 1) return false;
                    depths.set(node, 1 + Math.max(left, right));
                    last = node;
                    node = null;
                } else {
                    node = node.right;
                }
            }
        }
        return true;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$