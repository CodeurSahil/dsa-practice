var eventualSafeNodes = function(graph) {
    const n = graph.length;
    const reverseGraph = Array.from({ length: n }, () => []);
    console.log('🍺 ~ chat-gtp-optimal.js:3 -> reverseGraph: ', reverseGraph);
    const outdegree = Array(n).fill(0);
    console.log('🎃 ~ chat-gtp-optimal.js:5 -> outdegree: ', outdegree);

    // Build reverse graph and count outdegrees
    for (let u = 0; u < n; u++) {
        for (const v of graph[u]) {
            reverseGraph[v].push(u); // reverse the edge
        }
        outdegree[u] = graph[u].length;
    }
    console.log('🎐 ~ chat-gtp-optimal.js:13 -> outdegree: ', outdegree);
    console.log('🚝 ~ chat-gtp-optimal.js:11 -> reverseGraph: ', reverseGraph);

    const queue = [];
    const safe = Array(n).fill(false);

    // Terminal nodes (outdegree = 0)
    for (let i = 0; i < n; i++) {
        if (outdegree[i] === 0) {
            queue.push(i);
        }
    }
    console.log('🛠️ ~ chat-gtp-optimal.js:24 -> queue: ', queue);
    
    // Process queue using BFS
    while (queue.length) {
        const node = queue.shift();
        safe[node] = true;
        
        for (const prev of reverseGraph[node]) {
            outdegree[prev]--;
            
            if (outdegree[prev] === 0) {
                queue.push(prev);
            }
        }
        console.log('🎰 ~ chat-gtp-optimal.js:37 -> outdegree: ', outdegree);
        console.log('🛠️ ~ chat-gtp-optimal.js:24 -> queue: ', queue);
        
    }
    // Collect and return safe nodes in sorted order
    const result = [];
    for (let i = 0; i < n; i++) {
        if (safe[i]) {
            result.push(i);
        }
    }

    return result;
};


eventualSafeNodes([[1,2],[2,3],[5],[0],[5],[],[]])



/**
 * const eventualSafeNodes = (graph) => {
  const n = graph.length;
  const state = Array(n).fill(0); // 0=unseen,1=visiting,2=safe
  const dfs = (v) => {
    if (state[v] !== 0) return state[v] === 2;
    state[v] = 1;
    for (const nei of graph[v]) {
      if (!dfs(nei)) return false;
    }
    state[v] = 2;
    return true;
  };
  const res = [];
  for (let i = 0; i < n; ++i) if (dfs(i)) res.push(i);
  return res;
};
 */