![Kth Smallest Element in a BST](/asset/images/KthSmallestElementinaBST.png)
![Kth Smallest Element in a BST](/asset/images/KthSmallestElementinaBST2.png)

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

This method traverses the entire tree (in any order), collects all node values into an array, and then **sorts the array**. It's simple but does not use the BST property and is inefficient. 🐢

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @param {number} k
     * @return {number}
     */
    kthSmallest(root, k) {
        const arr = [];
        this.dfs(root, arr);
        arr.sort((a, b) => a - b);
        return arr[k - 1];
    }

    /**
     * @param {TreeNode} node
     * @param {number[]} arr
     */
    dfs(node, arr) {
        if (!node) return;
        arr.push(node.val);
        this.dfs(node.left, arr);
        this.dfs(node.right, arr);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n \log n)$
  * **Space complexity**: $O(n)$

-----

### 2\. Inorder Traversal

This is a much better approach. It performs an **in-order traversal (Left, Root, Right)** to build a fully sorted array of the node values, then returns the element at index `k-1`.

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @param {number} k
     * @return {number}
     */
    kthSmallest(root, k) {
        const arr = [];
        this.dfs(root, arr);
        return arr[k - 1];
    }

    /**
     * @param {TreeNode} node
     * @param {number[]} arr
     */
    dfs(node, arr) {
        if (!node) return;
        this.dfs(node.left, arr);
        arr.push(node.val);
        this.dfs(node.right, arr);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$

-----

### 3\. Recursive DFS (Optimal)

This method optimizes the in-order traversal by **stopping early**. It maintains a counter for `k`. It only recurses until the k-th element is found, at which point it stores the result and stops.

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @param {number} k
     * @return {number}
     */
    kthSmallest(root, k) {
        // We use an array so it's passed by reference
        const tmp = new Int32Array(2);
        tmp[0] = k; // tmp[0] is our counter
        tmp[1] = 0; // tmp[1] is our result
        this.dfs(root, tmp);
        return tmp[1];
    }

    /**
     * @param {TreeNode} node
     * @param {number[]} tmp
     */
    dfs(node, tmp) {
        if (!node) return;
        this.dfs(node.left, tmp);
        tmp[0]--;
        if (tmp[0] === 0) {
            tmp[1] = node.val;
            return;
        }
        this.dfs(node.right, tmp);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$ (or $O(h+k)$ in many cases, but $O(n)$ worst-case)
  * **Space complexity**: $O(n)$ (for the recursion stack, $O(h)$ average)

-----

### 4\. Iterative DFS (Optimal)

This is the **iterative** version of the in-order traversal. It uses an explicit **stack** to mimic recursion. This allows it to find the k-th element without using the call stack and stop exactly when `k` reaches zero. ✅

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @param {number} k
     * @return {number}
     */
    kthSmallest(root, k) {
        let stack = [];
        let curr = root;

        while (stack.length > 0 || curr !== null) {
            while (curr !== null) {
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            k--;
            if (k === 0) {
                return curr.val;
            }
            curr = curr.right;
        }
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$ (or $O(h+k)$)
  * **Space complexity**: $O(n)$ (for the stack, $O(h)$ average)

-----

### 5\. Morris Traversal (In-Place)

This is an advanced, in-place traversal that achieves **constant space**. It temporarily modifies the tree's `right` pointers to create "threads" that link back to the in-order successor, allowing traversal without a stack.

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @param {number} k
     * @return {number}
     */
    kthSmallest(root, k) {
        let curr = root;

        while (curr) {
            if (!curr.left) {
                k--;
                if (k === 0) return curr.val;
                curr = curr.right;
            } else {
                let pred = curr.left;
                while (pred.right && pred.right !== curr) pred = pred.right;

                if (!pred.right) {
                    pred.right = curr;
                    curr = curr.left;
                } else {
                    pred.right = null;
                    k--;
                    if (k === 0) return curr.val;
                    curr = curr.right;
                }
            }
        }
        return -1;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(1)$