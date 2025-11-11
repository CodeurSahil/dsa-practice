![Construct Binary Tree from Preorder and Inorder Traversal](/asset/images/ConstructBinaryTreefromPreorderandInorderTraversal.png)
![Construct Binary Tree from Preorder and Inorder Traversal](/asset/images/ConstructBinaryTreefromPreorderandInorderTraversal2.png)

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

This recursive solution identifies the root (the first element in `preorder`). It then finds this root in the `inorder` array using `indexOf` to determine the size of the left and right subtrees. The inefficiency comes from repeatedly using `slice()` and `indexOf()` (both $O(n)$ operations) at each step. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} preorder
     * @param {number[]} inorder
     * @return {TreeNode}
     */
    buildTree(preorder, inorder) {
        if (!preorder.length || !inorder.length) {
            return null;
        }

        let root = new TreeNode(preorder[0]);
        let mid = inorder.indexOf(preorder[0]);
        root.left = this.buildTree(
            preorder.slice(1, mid + 1),
            inorder.slice(0, mid),
        );
        root.right = this.buildTree(
            preorder.slice(mid + 1),
            inorder.slice(mid + 1),
        );
        return root;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n^2)$
  * **Space complexity**: $O(n)$

-----

### 2\. Hash Map + Depth First Search (Optimal)

This is the optimal and most common solution. It's a significant improvement on the first approach. By pre-computing the indices of the `inorder` array into a `Map`, finding the root's `mid` index becomes an $O(1)$ operation, which brings the total time complexity down to $O(n)$. ✅

```javascript
class Solution {
    /**
     * @param {number[]} preorder
     * @param {number[]} inorder
     * @return {TreeNode}
     */
    buildTree(preorder, inorder) {
        let pre_idx = 0;
        let indices = new Map();

        inorder.forEach((val, i) => indices.set(val, i));

        function dfs(l, r) {
            if (l > r) return null;
            let root_val = preorder[pre_idx++];
            let root = new TreeNode(root_val);
            let mid = indices.get(root_val);
            root.left = dfs(l, mid - 1);
            root.right = dfs(mid + 1, r);
            return root;
        }

        return dfs(0, inorder.length - 1);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$

-----

### 3\. Depth First Search (Single Pass)

This is a clever, but less intuitive, $O(n)$ solution that avoids `slice` entirely. It uses global indices for `preorder` and `inorder` and passes a `limit` (the value of the parent node) to determine the boundary of the current subtree. 💡

```javascript
class Solution {
    /**
     * @param {number[]} preorder
     * @param {number[]} inorder
     * @return {TreeNode}
     */
    buildTree(preorder, inorder) {
        let preIdx = 0,
            inIdx = 0;

        function dfs(limit) {
            if (preIdx >= preorder.length) return null;
            if (inorder[inIdx] === limit) {
                inIdx++; // This node is the boundary, stop building
                return null;
            }

            let root = new TreeNode(preorder[preIdx++]);
            // Left subtree's boundary is its parent's value
            root.left = dfs(root.val);
            // Right subtree's boundary is the same as the parent's
            root.right = dfs(limit);
            return root;
        }

        return dfs(undefined); // Start with no limit
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$ (for the recursion stack)