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
 * @return {number[]}
 */
var rightSideView = function(root) {
    if (!root) return [];

    const validationMap = new Map();
    const queue = [[root, 0]];

    const view = [];
    
    while (queue.length) {
        const dataBlock = queue.shift();

        const curNode = dataBlock[0];
        const level = dataBlock[1];

        if (!validationMap.has(level)) {
            validationMap.set(level, true);
            view.push(curNode.val);
        }

        if (curNode.right) queue.push([curNode.right, level + 1]);
        if (curNode.left) queue.push([curNode.left, level + 1]);
    }

    return view;
};