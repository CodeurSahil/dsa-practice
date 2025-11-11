![Binary Tree Maximum Path Sum](/asset/images/BinaryTreeMaximumPathSum.png)
![Binary Tree Maximum Path Sum](/asset/images/BinaryTreeMaximumPathSum2.png)

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

### 1\. Depth First Search (Brute Force)

This recursive approach correctly identifies that the max path sum *for a given node* is `node.val + left + right`. However, it calculates the downward path sums (`left` and `right`) using a separate helper function (`getMax`) *at every single node*. This re-computation leads to an inefficient $O(n^2)$ time complexity. 🐢

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maxPathSum(root) {
        let res = -Infinity;

        function getMax(root) {
            if (!root) return 0;
            let left = getMax(root.left);
            let right = getMax(root.right);
            let path = root.val + Math.max(left, right);
            return Math.max(0, path); // Ignore negative paths
        }

        function dfs(root) {
            if (!root) return;
            let left = getMax(root.left);
            let right = getMax(root.right);
            res = Math.max(res, root.val + left + right);
            dfs(root.left);
            dfs(root.right);
        }

        dfs(root);
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n^2)$
  * **Space complexity**: $O(n)$ (for the recursion stack)

-----

### 2\. Depth First Search (Optimal)

This is the efficient $O(n)$ solution. It uses a **single DFS pass**. The helper function performs two crucial tasks at once:

1.  **Returns:** The maximum path sum that *extends downwards* from the current node (i.e., `node.val + max(left, right)`). This is what its parent needs.
2.  **Updates:** A global `res` (passed by reference) with the maximum path sum *using the current node as the "peak"* (i.e., `node.val + left + right`).

Crucially, it uses `Math.max(..., 0)` to handle negative path sums, effectively "cutting off" paths that reduce the total. ✅

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maxPathSum(root) {
        const res = [root.val]; // Use array for pass-by-reference
        this.dfs(root, res);
        return res[0];
    }

    /**
     * @param {TreeNode} root
     * @param {number[]} res
     * @return {number}
     */
    dfs(root, res) {
        if (root === null) {
            return 0;
        }

        const leftMax = Math.max(this.dfs(root.left, res), 0);
        const rightMax = Math.max(this.dfs(root.right, res), 0);

        // Update global max with the path *through* this node
        res[0] = Math.max(res[0], root.val + leftMax + rightMax);
        
        // Return the max path *down* from this node
        return root.val + Math.max(leftMax, rightMax);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(h)$ (for the recursion stack, where $h$ is the tree's height)