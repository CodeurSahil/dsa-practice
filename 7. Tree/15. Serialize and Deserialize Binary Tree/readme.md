![Serialize and Deserialize Binary Tree](/asset/images/SerializeandDeserializeBinaryTree.png)
![Serialize and Deserialize Binary Tree](/asset/images/SerializeandDeserializeBinaryTree2.png)

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

This method uses a **pre-order traversal** (Root, Left, Right) to serialize the tree. It's crucial to add a `null` marker ('N') for empty children to preserve the tree's structure. The deserialization function then uses the same pre-order logic to rebuild the tree from the resulting array. 🌳

```javascript
class Codec {
    /**
     * Encodes a tree to a single string.
     *
     * @param {TreeNode} root
     * @return {string}
     */
    serialize(root) {
        const res = [];
        this.dfsSerialize(root, res);
        return res.join(',');
    }

    dfsSerialize(node, res) {
        if (node === null) {
            res.push('N');
            return;
        }
        res.push(node.val.toString());
        this.dfsSerialize(node.left, res);
        this.dfsSerialize(node.right, res);
    }

    /**
     * Decodes your encoded data to tree.
     *
     * @param {string} data
     * @return {TreeNode}
     */
    deserialize(data) {
        const vals = data.split(',');
        const i = { val: 0 }; // Use an object to pass index by reference
        return this.dfsDeserialize(vals, i);
    }

    dfsDeserialize(vals, i) {
        if (vals[i.val] === 'N') {
            i.val++;
            return null;
        }
        const node = new TreeNode(parseInt(vals[i.val]));
        i.val++;
        node.left = this.dfsDeserialize(vals, i);
        node.right = this.dfsDeserialize(vals, i);
        return node;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$

-----

### 2\. Breadth First Search (BFS)

This method uses a **level-order traversal** (via a queue) to serialize the tree. It adds all nodes level by level, including `null` markers ('N'). The `deserialize` function also uses a queue to rebuild the tree, iteratively linking children to their parents. 🌊

```javascript
class Codec {
    /**
     * Encodes a tree to a single string.
     *
     * @param {TreeNode} root
     * @return {string}
     */
    serialize(root) {
        if (!root) return 'N';
        const res = [];
        const queue = [root]; // Use array as a queue

        while (queue.length > 0) {
            const node = queue.shift();
            if (!node) {
                res.push('N');
            } else {
                res.push(node.val);
                queue.push(node.left);
                queue.push(node.right);
            }
        }
        return res.join(',');
    }

    /**
     * Decodes your encoded data to tree.
     *
     * @param {string} data
     * @return {TreeNode}
     */
    deserialize(data) {
        const vals = data.split(',');
        if (vals[0] === 'N') return null;
        
        const root = new TreeNode(parseInt(vals[0]));
        const queue = [root]; // Use array as a queue
        let index = 1;

        while (queue.length > 0) {
            const node = queue.shift();
            
            if (vals[index] !== 'N') {
                node.left = new TreeNode(parseInt(vals[index]));
                queue.push(node.left);
            }
            index++;
            
            if (vals[index] !== 'N') {
                node.right = new TreeNode(parseInt(vals[index]));
                queue.push(node.right);
            }
            index++;
        }
        return root;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$