/**
 * @param {number[][]} graph
 * @return {number[]}
 */

/**
 * Directed Graph of 'n' nodes
 * Each Node Labeled From `0` to `n - 1`
 * Graph is Represented by a 0-indexed 2D integer array `graph`
 * Where `graph[i]` is an Integer Array of Nodes adjacent to node `i`
 * A node is a `terminal node` if there are `no outgoing edges`
 * A node is a `safe node` if every possible path starting from that node leads to a `terminal node` (or another safe node).
 */

/** */
var eventualSafeNodes = function(graph) {
    let nodesLen = graph.length;
    
    let dataObject = {};

    for(let i = 0; i < nodesLen; i++) {
        dataObject[i] = graph[i];
    }

    const safeNodes = [];
    
    removeTerminalNode(dataObject, nodesLen, safeNodes);
    
    return safeNodes.sort((a, b) => a - b);
};

function removeTerminalNode(graph, nodesLen, safeNodes) {
    let safeNodeAddedCount = 0;

    for(const key of Object.keys(graph)) {
        let nodes = graph[key];

        // if (nodes[0] === -1) {
        //     continue;
        // }

        let lastNodeArray = nodes.filter((node) => {
            return safeNodes.indexOf(node) === -1 ;
        })

        graph[key] = lastNodeArray;

        if (lastNodeArray.length == 0) {
            safeNodeAddedCount++;
            safeNodes.push(Number.parseInt(key));
            delete graph[key];
        }
    }

    if (safeNodeAddedCount != 0) {
        removeTerminalNode(graph, nodesLen, safeNodes);
    }

    return;
}
