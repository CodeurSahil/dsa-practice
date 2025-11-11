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
var maxPathSum = function(root) {
    let maxSum = root.val;

    const dfs = (root) => {
        if (!root) return 0;

        const leftSum = dfs(root.left);
        const rightSum = dfs(root.right);

        const subTreeSum = leftSum + rightSum + root.val;
        const rightTree = rightSum + root.val;
        const leftTree = leftSum + root.val;

        maxSum = Math.max(root.val, maxSum, subTreeSum, rightTree, leftTree);

        return Math.max(root.val,root.val + Math.max(leftSum, rightSum));
    }

    const rootSum = dfs(root);

    maxSum = Math.max(maxSum, rootSum);

    return maxSum;
};