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
var goodNodes = function(root) {
    return dfs(root).length;
};

const dfs = (root) => {
    if (!root) return [-Infinity];

    let leftNode = dfs(root.left);
    let rightNode = dfs(root.right);

    leftNode = leftNode.filter((val) => root.val <= val);
    rightNode = rightNode.filter((val) => root.val <= val);

    return [root.val].concat(leftNode).concat(rightNode);
}