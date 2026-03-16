// Tried on 13 Feb

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    const graph = new Map();

    for (const [src, dst] of prerequisites) {
        if (!graph.has(src)) graph.set(src, []);

        const arr = graph.get(src);
        arr.push(dst);
    }

    console.log(graph)

    const visiting = new Set();

    const dfs = (course) => {
        if (visiting.has(course)) return false;

        if (!graph.has(course)) return true;


        visiting.add(course);

        for (const cor of graph.get(course)) {
            if (!dfs(cor)) return false
        }

        visiting.delete(course);
        graph.set(course, []); // Setting Empty For Faster Search Next time

        return true;
    }

    for (let i = 0; i < numCourses; i++) {
        if (!dfs(i)) return false
    }

    return true;
};


/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */

/**
 Total Number of Courses - "numCourses"
 Labled from "0" to "numCourses - 1"
 "prerequisites" array, where "prerequisites[i] = [ai, bi]"
 indicates that you must take course "bi" first if you want to take course "ai".

 For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.

 Return true if you can finish all courses. Otherwise, return false

Approch

We need to identify the Cycle 
if it exists, then return false
else true

*/
const isCycleExists = (graph, startVertex, visited, cycleCheck) => {
    console.log('⌨️ startVertex: ', startVertex);
    console.log('😎 ~ approchTriedByMe.js:24 -> graph, startVertex, visited, cycleCheck: ', graph, startVertex, visited, cycleCheck);
    visited[startVertex] = true;
    cycleCheck[startVertex] = true;

    if (graph[startVertex]) {
        console.log('⌨️ startVertex: ', startVertex);
        for(let i = 0; i < graph[startVertex].length; i++) {
            console.log('⌨️ startVertex: ', startVertex, i);
            if(cycleCheck[graph[startVertex][i]]) {
                return true;
            }
    
            if (!visited[graph[startVertex][i]] && isCycleExists(graph, graph[startVertex][i], visited, cycleCheck)) {
                console.log('🛸 ~ approchTriedByMe.js:35');
                return true;
            }
        }
    }

    cycleCheck[startVertex] = false;

    return false;
}

var canFinish = function(numCourses, prerequisites) {
    let graph = {};
    
    for(const courseEdge of prerequisites) {
        if(!graph[courseEdge[1]]) {
            graph[courseEdge[1]] = [];
        }
        
        graph[courseEdge[1]].push(courseEdge[0]);
    }
    console.log('🏆 ~ approchTriedByMe.js:47 -> graph: ', graph);
    
    let visited = [];
    for (let i = 0; i < numCourses; i++) {
        if (!visited[i] && isCycleExists(graph, i, visited, [])) {
            return false;
        }
    }

    return true;
};

console.log(canFinish(5, [[1,4],[2,4],[3,1],[3,2]]));
// console.log(canFinish(3, [[1,0],[2,0],[0,2]]));
// console.log(canFinish(3, [[1,0],[2,1]]));
// console.log(canFinish(2, [[1,0],[0,1]]));
// console.log(canFinish(2, [[1,0]]));