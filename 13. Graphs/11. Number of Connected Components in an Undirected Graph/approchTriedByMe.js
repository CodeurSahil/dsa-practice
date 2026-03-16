class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @returns {number}
     */
    countComponents(n, edges) {
        const graph = new Map();

        for (let i = 0; i < n; i++) {
            graph.set(i, []);
        }

        for (const [N1, N2] of edges) {
            graph.get(N1).push(N2);
            graph.get(N2).push(N1);
        }

        const visited = new Set();

        const dfs = (node, parent) => {
            if (visited.has(node)) return;

            visited.add(node);

            for (const n of graph.get(node)) {
                if (n === parent) continue;
                dfs(n, node);
            }
        }

        let connections = 0;

        for (let i = 0; i < n; i++) {
            if (!visited.has(i)) {
                connections++;
                dfs(i, -1);
            }
        }

        return connections;
    }
}
