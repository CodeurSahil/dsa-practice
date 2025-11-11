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
var diameterOfBinaryTree = function(root) {
    if (!root) return 0;

    const res = [0];

    dfs(root, res)

    return res[0];
};

const dfs = (root, res) => {
    if (!root) return 0;
    
    const leftHeight = dfs(root.left, res);x
    const rightHeight = dfs(root.right, res);

    res[0] = Math.max(res[0], leftHeight + rightHeight);

    return 1 + Math.max(leftHeight, rightHeight);
}