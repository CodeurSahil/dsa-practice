![Subtree of Another Tree](/asset/images/SubtreeofAnotherTree.png)
![Subtree of Another Tree](/asset/images/SubtreeofAnotherTree2.png)
![Subtree of Another Tree](/asset/images/SubtreeofAnotherTree3.png)

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

This is the classic recursive approach. It traverses the main tree (`root`). At each node, it uses a helper function (`sameTree`) to check if the subtree starting at that node is identical to `subRoot`. If it's not, it continues the search in the left and right children. 🌳

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @param {TreeNode} subRoot
     * @return {boolean}
     */
    isSubtree(root, subRoot) {
        if (!subRoot) {
            return true;
        }
        if (!root) {
            return false;
        }

        if (this.sameTree(root, subRoot)) {
            return true;
        }
        return (
            this.isSubtree(root.left, subRoot) ||
            this.isSubtree(root.right, subRoot)
        );
    }

    /**
     * @param {TreeNode} root
     * @param {TreeNode} subRoot
     * @return {boolean}
     */
    sameTree(root, subRoot) {
        if (!root && !subRoot) {
            return true;
        }
        if (root && subRoot && root.val === subRoot.val) {
            return (
                this.sameTree(root.left, subRoot.left) &&
                this.sameTree(root.right, subRoot.right)
            );
        }
        return false;
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(m \cdot n)$ (In the worst case, we check `n` nodes, and each check takes $O(m)$ time).
  * **Space complexity**: $O(n)$ (for the recursion stack in the worst case).

(Where $n$ is the number of nodes in `root` and $m$ is the number of nodes in `subRoot`.)

-----

### 2\. Serialization (Simple `includes`)

This method converts both trees into strings using a **pre-order traversal**. Crucially, it includes markers for `null` children (e.g., `-#`) to distinguish trees with different structures but similar values. It then uses the simple `String.prototype.includes()` method to see if the `subRoot`'s string is a substring of the `root`'s string. 📜

```javascript
/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function(root, subRoot) {
    let rootHash = createHash(root);
    let subRootHash = createHash(subRoot);
    return rootHash.includes(subRootHash);
};

let createHash = function(root){
    let hash = "";

    let traverse = (curr) => {
        if(!curr){
            hash = hash + "-#"; // Add null marker
            return;
        }

        hash = hash + "-" + curr.val; // Add node value

        traverse(curr.left);
        traverse(curr.right);
    }

    traverse(root);
    return hash;
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n + m + (n \cdot m))$. $O(n+m)$ for serialization and $O(n \cdot m)$ for `includes()`.
  * **Space complexity**: $O(n + m)$ (to store the serialized strings).

-----

### 3\. Serialization (Z-Algorithm)

This is a highly optimized version of the serialization approach. After serializing both trees (with null markers), it concatenates them into a single string. It then uses the **Z-algorithm**, a linear-time pattern matching algorithm, to find if the `subRoot` string appears. This avoids the potentially quadratic time of `String.prototype.includes()`. ✅

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {string}
     */
    serialize(root) {
        if (root === null) {
            return '$#'; // Use '$' as a value prefix, '#' as a null marker
        }
        return (
            '$' +
            root.val +
            this.serialize(root.left) +
            this.serialize(root.right)
        );
    }

    /**
     * @param {string} s
     * @return {number[]}
     */
    z_function(s) {
        const z = new Array(s.length).fill(0);
        let l = 0,
            r = 0,
            n = s.length;
        for (let i = 1; i < n; i++) {
            if (i <= r) {
                z[i] = Math.min(r - i + 1, z[i - l]);
            }
            while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
                z[i]++;
            }
            if (i + z[i] - 1 > r) {
                l = i;
                r = i + z[i] - 1;
            }
        }
        return z;
    }

    /**
     * @param {TreeNode} root
     * @param {TreeNode} subRoot
     * @return {boolean}
     */
    isSubtree(root, subRoot) {
        const serialized_root = this.serialize(root);
        const serialized_subRoot = this.serialize(subRoot);
        const combined = serialized_subRoot + '|' + serialized_root;

        const z_values = this.z_function(combined);
        const sub_len = serialized_subRoot.length;

        for (let i = sub_len + 1; i < combined.length; i++) {
            if (z_values[i] === sub_len) {
                return true;
            }
        }
        return false;
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n + m)$
  * **Space complexity**: $O(n + m)$