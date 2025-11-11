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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function(root, subRoot) {
    if (!root && !subRoot) return true;
    if ((!root && subRoot) || (root && !subRoot)) return false;

    const stack = [];
    stack.push(root);

    while (stack.length) {
        const curNode = stack.pop();

        if (curNode.val == subRoot.val) {
            const verify = verifyTree(curNode, subRoot);

            if (verify) return true;
        } 

        if (curNode.right) stack.push(curNode.right);
        if (curNode.left) stack.push(curNode.left);
    }
    
    return false;
};

const verifyTree = (root, sub) => {
    if (!root && !sub) return true;
    if (!root || !sub) return false;

    const verifyLeft = verifyTree(root.left, sub.left);
    const verifyRight = verifyTree(root.right, sub.right);

    return verifyLeft && verifyRight && root.val == sub.val ? true : false;
}
