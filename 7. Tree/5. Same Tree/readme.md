![Same Tree](/asset/images/SameTree.png)
![Same Tree](/asset/images/SameTree2.png)
![Same Tree](/asset/images/SameTree3.png)

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

### 1\. Depth First Search (Recursive)

This is the classic recursive approach. It checks three conditions:

1.  Are both nodes `null`? (Base case for equality)
2.  Are the nodes' values equal?
3.  Are their respective left and right subtrees *also* the same (recursive step)?

If all are true, the trees are identical. 🌳

```javascript
class Solution {
    /**
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {boolean}
     */
    isSameTree(p, q) {
        if (!p && !q) {
            return true;
        }
        if (p && q && p.val === q.val) {
            return (
                this.isSameTree(p.left, q.left) &&
                this.isSameTree(p.right, q.right)
            );
        } else {
            return false;
        }
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(h)$ (height of the tree for the recursion stack)
      * **Best Case (balanced tree)**: $O(\log n)$
      * **Worst Case (skewed tree)**: $O(n)$

(Where $n$ is the number of nodes in the tree.)

-----

### 2\. Iterative DFS (Stack)

This method uses a **stack** to perform a depth-first traversal of both trees simultaneously. It pushes pairs of corresponding nodes `[p_node, q_node]` onto the stack. In each iteration, it pops a pair and checks if they are equivalent. If not, it returns `false`. Otherwise, it pushes their children onto the stack to be checked next.

```javascript
class Solution {
    /**
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {boolean}
     */
    isSameTree(p, q) {
        const stack = [[p, q]];

        while (stack.length) {
            const [node1, node2] = stack.pop();

            if (!node1 && !node2) continue;
            if (!node1 || !node2 || node1.val !== node2.val) {
                return false;
            }
            stack.push([node1.right, node2.right]);
            stack.push([node1.left, node2.left]);
        }

        return true;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$ (in the worst case)

-----

### 3\. Breadth-First Search (Queue)

This approach uses a **queue** to traverse both trees level by level in lockstep. It enqueues corresponding nodes from both trees. At each step, it dequeues a pair and checks their equivalence. If they are the same, it enqueues their children. If a mismatch is found at any point, the trees are not the same. 🌊

```javascript
class Solution {
    /**
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {boolean}
     */
    isSameTree(p, q) {
        const q1 = [p]; // Using an array as a queue
        const q2 = [q];

        while (q1.length && q2.length) {
            let nodeP = q1.shift();
            let nodeQ = q2.shift();

            if (nodeP === null && nodeQ === null) continue;
            if (
                nodeP === null ||
                nodeQ === null ||
                nodeP.val !== nodeQ.val
            ) {
                return false;
            }

            q1.push(nodeP.left);
            q1.push(nodeP.right);
            q2.push(nodeQ.left);
            q2.push(nodeQ.right);
        }

        return q1.length === q2.length;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$ (in the worst case for a complete binary tree)