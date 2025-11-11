/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    let data = [];

    const queue = [];
    queue.push(root);

    while (queue.length) {
        const curNode = queue.shift();

        data.push(curNode.val);

        if (curNode.left) queue.push(curNode.left);
        if (curNode.right) queue.push(curNode.right);
    }

    data = data.sort((a, b) => a - b);

    return data[k - 1];
};