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
    console.log('🤪 ~ approchTriedByMe.js:17 -> graph: ', graph);
    console.log('🎎 ~ approchTriedByMe.js:17 -> nodesLen: ', nodesLen);

    const safeNodes = [];
    
    removeTerminalNode(graph, nodesLen, safeNodes);
    
    console.log('🛵 ~ approach2.js:25 -> safeNodes: ', safeNodes.sort((a, b) => a - b));
    return safeNodes.sort((a, b) => a - b);
};

function removeTerminalNode(graph, nodesLen, safeNodes) {
    let safeNodeAddedCount = 0;

    for(let i = 0; i < nodesLen; i++) {
        let nodes = graph[i];

        if (nodes[0] === -1) {
            continue;
        }

        let lastNodeArray = nodes.filter((node) => {
            console.log('📱 ~ approchTriedByMe.js:45 -> terminalNodes.indexOf(node): ', safeNodes.indexOf(node));
            return safeNodes.indexOf(node) === -1 ;
        })

        graph[i] = lastNodeArray;

        if (lastNodeArray.length == 0) {
            safeNodeAddedCount++;
            safeNodes.push(i);
            graph[i].push(-1);
        }
    }
    console.log('👻 ~ approach2.js:54 -> safeNodes: ', safeNodes);
    console.log('🚁 ~ approach2.js:49 -> graph: ', graph);

    if (safeNodeAddedCount != 0) {
        removeTerminalNode(graph, nodesLen, safeNodes);
    }

    return;
}

eventualSafeNodes([[1,2],[2,3],[5],[0],[5],[],[]])