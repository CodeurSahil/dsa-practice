/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    if (!root) return '$';

    let strArr = [];

    const queue = [root];

    while (queue.length) {
        const curNode = queue.shift();

        if (!curNode) {
            strArr.push('$');
        } else {
            strArr.push(curNode.val);
            queue.push(curNode.left)
            queue.push(curNode.right)
        }
    }

    return strArr.join('|');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    const strArr = data.split('|');

    if (strArr[0] == '$') return null;

    const rootNode = new TreeNode(Number(strArr[0]));
    const queue = [rootNode];

    let indexCounter = 1;

    while (queue.length) {
        const curNode = queue.shift();

        if (strArr[indexCounter] != '$') {
            curNode.left = new TreeNode(Number(strArr[indexCounter]));
            queue.push(curNode.left);
        }
        indexCounter++;

        if (strArr[indexCounter] != '$') {
            curNode.right = new TreeNode(Number(strArr[indexCounter]));
            queue.push(curNode.right);
        }
        indexCounter++;
    }

    return rootNode;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */