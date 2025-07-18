/**
 * @param {number[][]} graph
 * @return {number[]}
 */

/**
 * OUTPUT LIMIT EXCEEDS
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
    const terminalNodes = [];
    const safeNodes = [];
    
    for(let i = 0; i < nodesLen; i++) {
        if(graph[i].length === 0) {
            terminalNodes.push(i);
        }
    }
    console.log('🚂 ~ approchTriedByMe.js:19 -> terminalNodes: ', terminalNodes);

    let lastNodeObj = {};
    let visited = Array.from({ length: nodesLen }, () => false);

    for(let i = 0; i < nodesLen; i++) {
         console.log('🛢️ ~ approchTriedByMe.js:28');
        lastNodeObj[i] = [];
        topoLogicalSort(graph, i, lastNodeObj[i], visited)
    }

    console.log('🛠️ ~ approchTriedByMe.js:39 -> lastNodeObj: ', lastNodeObj);
    console.log('💬 ~ approchTriedByMe.js:40 -> Object.keys(lastNodeObj): ', Object.keys(lastNodeObj));
    for(const key of Object.keys(lastNodeObj)) {
        let lastNodeArray = lastNodeObj[key].filter((node) => {
            console.log('📱 ~ approchTriedByMe.js:45 -> terminalNodes.indexOf(node): ', terminalNodes.indexOf(node));
            return terminalNodes.indexOf(node) === -1;
        })

        console.log('🤯 ~ approchTriedByMe.js:50 -> lastNodeArray.length: ', lastNodeArray.length);
        if (lastNodeArray.length === 0) {
            safeNodes.push(Number.parseInt(key));
        }
    }
    
    return safeNodes;
};

function topoLogicalSort(graph, startVertex, lastNodeArray, visited) {
    console.log('\n🎏 ~  topoLogicalSort', graph, startVertex, lastNodeArray, visited[startVertex]);
    if(visited[startVertex]) {
        console.log('🚏 ~ approchTriedByMe.js:41');
        lastNodeArray.push(-1);
        return;
    } else if(graph[startVertex].length === 0) {
        console.log('😆 ~ approchTriedByMe.js:44');
        lastNodeArray.push(startVertex);
        return;
    }

    visited[startVertex] = true;
    
    for(const neighbour of graph[startVertex]) {
        console.log('🎁 ~ approchTriedByMe.js:47' ,startVertex);
        topoLogicalSort(graph, neighbour, lastNodeArray, visited);
    }

    visited[startVertex] = false;

    return;
}

eventualSafeNodes([[1,2],[2,3],[5],[0],[5],[],[]])