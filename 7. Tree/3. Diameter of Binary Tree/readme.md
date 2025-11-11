![Diameter of Binary Tree](/asset/images/DiameterofBinaryTree.png)
![Diameter of Binary Tree](/asset/images/DiameterofBinaryTree2.png)

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

### 1\. Brute Force (Recursive)

This method defines the diameter at any node as `height(left) + height(right)`. It then **recursively calculates** this value for every node in the tree and finds the maximum. This is inefficient because the `maxHeight` function is called repeatedly for the same nodes. 🐢

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    diameterOfBinaryTree(root) {
        if (!root) return 0;

        let leftHeight = this.maxHeight(root.left);
        let rightHeight = this.maxHeight(root.right);
        let diameter = leftHeight + rightHeight;
        
        // Check diameters in subtrees
        let sub = Math.max(
            this.diameterOfBinaryTree(root.left),
            this.diameterOfBinaryTree(root.right),
        );
        return Math.max(diameter, sub);
    }

    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maxHeight(root) {
        if (!root) return 0;
        return (
            1 + Math.max(this.maxHeight(root.left), this.maxHeight(root.right))
        );
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n^2)$
  * **Space complexity**: $O(n)$ (for the recursion stack)

-----

### 2\. Depth First Search (Optimal)

This is the optimal solution. It uses a **single DFS pass**. The helper function calculates the `height` of a node but simultaneously updates a global variable (passed by reference) with the maximum `diameter` (`left + right`) found so far. This avoids redundant calculations. ✅

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    diameterOfBinaryTree(root) {
        const res = [0]; // Use an array for pass-by-reference
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
            return 0; // Height of a null node
        }
        const left = this.dfs(root.left, res);
        const right = this.dfs(root.right, res);
        
        // Update diameter (max path through this node)
        res[0] = Math.max(res[0], left + right);
        
        return 1 + Math.max(left, right); // Return height
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

### 3\. Iterative DFS (Post-order)

This approach performs an **iterative post-order traversal** using a stack and a map. The map is used to store the `[height, diameter]` results for subtrees that have already been computed. When a node's children are both processed, it's popped from the stack, and its own height and diameter are calculated and stored.

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    diameterOfBinaryTree(root) {
        if (!root) return 0;
        
        let stack = [root];
        let mp = new Map();
        mp.set(null, [0, 0]); // [height, diameter] for null nodes

        while (stack.length > 0) {
            let node = stack[stack.length - 1];

            if (node.left && !mp.has(node.left)) {
                stack.push(node.left);
            } else if (node.right && !mp.has(node.right)) {
                stack.push(node.right);
            } else {
                node = stack.pop();

                let [leftHeight, leftDiameter] = mp.get(node.left);
                let [rightHeight, rightDiameter] = mp.get(node.right);

                let height = 1 + Math.max(leftHeight, rightHeight);
                let diameter = Math.max(
                    leftHeight + rightHeight, // Path through current node
                    Math.max(leftDiameter, rightDiameter) // Max path in subtrees
                );

                mp.set(node, [height, diameter]);
            }
        }
        return mp.get(root)[1];
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$ (for the map and stack)