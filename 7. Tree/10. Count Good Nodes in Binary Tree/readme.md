![Count Good Nodes in Binary Tree](/asset/images/CountGoodNodesinBinaryTree.png)
![Count Good Nodes in Binary Tree](/asset/images/CountGoodNodesinBinaryTree2.png)

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

This recursive DFS travels down the tree, passing the maximum value (`maxVal`) seen on the path so far. A node is "good" if its value is greater than or equal to this `maxVal`. 🌳

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    goodNodes(root) {
        return this.dfs(root, root.val);
    }

    /**
     * @param {TreeNode} node
     * @param {number} maxVal
     * @return {number}
     */
    dfs(node, maxVal) {
        if (!node) {
            return 0;
        }

        let res = node.val >= maxVal ? 1 : 0;
        maxVal = Math.max(maxVal, node.val);
        res += this.dfs(node.left, maxVal);
        res += this.dfs(node.right, maxVal);
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(h)$ (for the recursion stack, where $h$ is the tree's height)

-----

### 2\. Breadth First Search (BFS)

This iterative BFS uses a **queue** to traverse the tree level by level. It stores pairs of `[node, maxValOnPath]` in the queue, where `maxValOnPath` is the maximum value seen on the path from the root *to that node*. 🌊

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    goodNodes(root) {
        if (!root) return 0;
        
        let res = 0;
        let q = [[root, root.val]]; // Use array as queue: [node, maxValOnPath]

        while (q.length > 0) {
            let [node, maxval] = q.shift(); // Dequeue
            
            if (node.val >= maxval) {
                res++;
            }
            
            if (node.left) {
                q.push([node.left, Math.max(maxval, node.left.val)]);
            }
            if (node.right) {
                q.push([node.right, Math.max(maxval, node.right.val)]);
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$ (for the queue, in the worst case)