/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function(edges) {
    const graph = new Map();

    for (let i = 0; i < edges.length; i++) {
        const src = edges[i][0];
        const dest = edges[i][1];

        if (!graph.has(src)) graph.set(src, []);
        if (!graph.has(dest)) graph.set(dest, []);

        graph.get(src).push(dest);
        graph.get(dest).push(src);
    }

    const visited = new Set();
    const cycleNodes = new Set();
    let cycleStart = -1;

    const dfs = (node, parent) => {
        if (visited.has(node)) {
            cycleStart = node;
            return true;
        }

        visited.add(node);

        for (const neigh of graph.get(node)) {
            if (neigh === parent) continue;

            if (dfs(neigh, node)) {
                if (cycleStart !== -1) cycleNodes.add(neigh);

                if (node === cycleStart) {
                    cycleStart = -1;
                }

                return true;;
            }
        }

        return false;
    }

    dfs(1, -1);

    for (let i = edges.length - 1; i > 0; i--) {
        const src = edges[i][0];
        const dest = edges[i][1];

        if (cycleNodes.has(src) && cycleNodes.has(dest)) {
            return [src, dest];
        }
    }

    return [];
};

