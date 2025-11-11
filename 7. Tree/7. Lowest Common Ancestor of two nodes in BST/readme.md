![Lowest Common Ancestor of a Binary Search Tree](/asset/images/LowestCommonAncestorofaBinarySearchTree.png)
![Lowest Common Ancestor of a Binary Search Tree](/asset/images/LowestCommonAncestorofaBinarySearchTree2.png)

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

### 1\. Recursion

This approach leverages the BST property. The LCA is the "split point" node where `p` and `q` diverge into different subtrees.

  * If both `p` and `q` are smaller than the root, the LCA must be in the **left** subtree.
  * If both `p` and `q` are larger than the root, the LCA must be in the **right** subtree.
  * Otherwise, the current root *is* the split point and thus the LCA.

<!-- end list -->

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {TreeNode}
     */
    lowestCommonAncestor(root, p, q) {
        if (!root || !p || !q) {
            return null;
        }
        if (Math.max(p.val, q.val) < root.val) {
            return this.lowestCommonAncestor(root.left, p, q);
        } else if (Math.min(p.val, q.val) > root.val) {
            return this.lowestCommonAncestor(root.right, p, q);
        } else {
            return root;
        }
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(h)$
  * **Space complexity**: $O(h)$ (for the recursion stack)

(Where $h$ is the height of the tree. In a balanced BST, $h = \log n$. In a skewed tree, $h = n$.)

-----

### 2\. Iteration

This is the space-optimized version of the same logic. It uses a `while` loop to traverse down the tree, discarding the half that both `p` and `q` do not belong to. Once the paths to `p` and `q` diverge, the current node is the LCA. ✅

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {TreeNode}
     */
    lowestCommonAncestor(root, p, q) {
        let cur = root;

        while (cur) {
            if (p.val > cur.val && q.val > cur.val) {
                cur = cur.right;
            } else if (p.val < cur.val && q.val < cur.val) {
                cur = cur.left;
            } else {
                return cur;
            }
        }
        return null;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(h)$
  * **Space complexity**: $O(1)$

(Where $h$ is the height of the tree.)