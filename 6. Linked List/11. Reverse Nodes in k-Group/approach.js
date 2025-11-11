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
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (!root) return null;

    invert(root);

    return root;
};

const invert = (root) => {
    const leftNode = root.left;
    const rightNode = root.right;

    root.left = rightNode;
    root.right = leftNode;

    if (root.left) invert(root.left);
    if (root.right) invert(root.right);

    return;
}