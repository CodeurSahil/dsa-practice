/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function(node) {
    const oldToNewMap = new Map();

    const dfs = (n) => {
        if (!n) return null;

        if (oldToNewMap.has(n)) {
            return oldToNewMap.get(n);
        }

        const helperNode = new _Node(n.val);
        oldToNewMap.set(n, helperNode);

        for (const index in n.neighbors) {
            helperNode.neighbors.push(dfs(n.neighbors[index]));
        }

        return helperNode;
    }

    return dfs(node);
};