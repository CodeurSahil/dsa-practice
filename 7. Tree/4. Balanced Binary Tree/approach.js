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
 * @return {boolean}
 */
var isBalanced = function(root) {
    if (!root) return true;

    return dfs(root)[0] === 1;
};

const dfs = (root) => {
    if (!root) return [1, 0];

    const depthOfLeft = dfs(root.left);
    const depthOfRight = dfs(root.right);

    const isBalanced = depthOfLeft[0] === 1 && depthOfRight[0] === 1 && Math.abs(depthOfLeft[1] - depthOfRight[1]) <= 1;
    const height = 1 + Math.max(depthOfLeft[1], depthOfRight[1]);

    return [isBalanced ? 1 : 0, height];
}