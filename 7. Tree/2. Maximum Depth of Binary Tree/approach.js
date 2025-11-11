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
 * @return {number}
 */
var maxDepth = function(root) {
    if (!root) return 0;

    let queue = [], maxLevel = 0;
    queue.push(root);

    while (queue.length) {
        const node = queue[0];

        queue = queue.slice(1);

        if (maxLevel === 0) node.val = 1;
        maxLevel = Math.max(maxLevel, node.val);

        if (node.left) {
            node.left.val = node.val + 1;
            queue.push(node.left);
        }

        if (node.right) {
            node.right.val = node.val + 1;
            queue.push(node.right);
        }
    }

    return maxLevel;
};