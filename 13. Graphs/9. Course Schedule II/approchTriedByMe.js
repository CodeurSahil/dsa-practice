/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    const graph = new Map();

    for (let i = 0; i < numCourses; i++) {
        graph.set(i, []);
    }

    for (const [src, dest] of prerequisites) {
        graph.get(src).push(dest);
    }

    const stack = [];
    const visited = new Set();
    let hasCycle = false;

    const topoSort = (i, cycleSet) => {

        visited.add(i);
        cycleSet.add(i);

        for (const node of graph.get(i)) {
            if (cycleSet.has(node)) {
                hasCycle = true;
                return;
            }

            if (!visited.has(node)) topoSort(node, cycleSet);
        }

        cycleSet.delete(i);
        stack.push(i);
    }

    for (let i = 0; i < numCourses; i++) {
        const cycleSet = new Set();
        if (!visited.has(i)) topoSort(i, cycleSet);
    }

    console.log(stack)

    return hasCycle ? [] : stack;
};

/**
0 -> 1, 4
1 -> 2
2 -> 3
3 -> 0
4 -> 5
5 -> 1


 */