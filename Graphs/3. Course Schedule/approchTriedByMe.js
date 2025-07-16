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
    visited[startVertex] = true;
    cycleCheck[startVertex] = true;

    if (graph[startVertex]) {
        for(let i = 0; i < graph[startVertex].length; i++) {
            if(cycleCheck[graph[startVertex][i]]) {
                return true;
            }
    
            if (!visited[graph[startVertex][i]] && isCycleExists(graph, graph[startVertex][i], visited, cycleCheck)) {
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
    
    let visited = [];
    for (let i = 0; i < numCourses; i++) {
        if (!visited[i] && isCycleExists(graph, i, visited, [])) {
            return false;
        }
    }

    return true;
};