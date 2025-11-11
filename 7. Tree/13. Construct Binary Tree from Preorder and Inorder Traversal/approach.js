/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    let preIndex = 0;
    const indexMap = new Map();

    inorder.forEach((val, i) => indexMap.set(val, i));
    
    const dfs = (l, r) => {
        if (l > r) return null;

        const root = new TreeNode(preorder[preIndex++]);
        const mid = indexMap.get(root.val);

        root.left = dfs(l, mid - 1);
        root.right = dfs(mid + 1, r);

        return root;
    }

    return dfs(0, preorder.length - 1);
};
