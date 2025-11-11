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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) return [];

    let queue = [[root, 0]];
    const levelOrder = [];

    while (queue.length) {
        const curNode = queue[0][0];
        const level = queue[0][1];

        if (!levelOrder[level]) levelOrder[level] = [];

        levelOrder[level].push(curNode.val);

        queue = queue.slice(1);

        if (curNode.left) {
            queue.push([curNode.left, level + 1]);
        }

        if (curNode.right) {
            queue.push([curNode.right, level + 1]);
        }
    }

    return levelOrder;
};