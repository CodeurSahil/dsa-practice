/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if (!p && !q) return true;
    if ((p && !q) || (!p && q)) return false;

    const stack1 = [];
    const stack2 = [];

    stack1.push([p, 'H', 0]);
    stack2.push([q, 'H', 0]);

    while (stack1.length) {
        const node1 = stack1.pop();
        const node2 = stack2.pop();

        if (
            (node1 && !node2) ||
            (node1[1] != node2[1]) ||
            (node1[2] != node2[2]) ||
            (node1[0].val != node2[0].val)
            ) {
            return false;
        }

        if (node1) {
            if (node1[0].right) stack1.push([node1[0].right, 'R', node1[2] + 1]);
            if (node1[0].left) stack1.push([node1[0].left, 'L', node1[2] + 1]);
        }

        if (node2) {
            if (node2[0].right) stack2.push([node2[0].right, 'R', node2[2] + 1]);
            if (node2[0].left) stack2.push([node2[0].left, 'L', node2[2] + 1]);
        }
    }

    if (stack1.length != 0 || stack2.length != 0) return false;

    return true;
};