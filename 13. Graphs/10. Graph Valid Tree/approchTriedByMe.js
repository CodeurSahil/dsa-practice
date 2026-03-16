class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @returns {boolean}
     */
    validTree(n, edges) {
        if (edges.length > n - 1) return false;

        const graph = new Map();

        for (let i = 0; i < n; i++) {
            if (!graph.has(i)) graph.set(i, []);
        }

        for (const [N1, N2] of edges) {
            graph.get(N1).push(N2);
            graph.get(N2).push(N1);
        }

        const visited = new Set();

        const dfs = (node, parent) => {
            if (visited.has(node)) return false;
 
            visited.add(node);

            for (const n of graph.get(node)) {
                if (n === parent) continue;

                if (!dfs(n, node)) return false; 
            }

            return true;
        }

        return dfs(0, -1) && visited.size === n;
    }
}

/**
 *   0  - 3
 *  /  \
 * 2    1 - 4
 *     \
 *      2
 *       \
 *        3
 */
