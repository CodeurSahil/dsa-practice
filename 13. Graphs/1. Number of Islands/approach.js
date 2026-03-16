/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    const possibleDist = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ];

    const m = grid.length;
    const n = grid[0].length;
    const visited = new Set();

    const dfs = (i, j) => {
        if (visited.has(`${i}-${j}`)) return;

        visited.add(`${i}-${j}`);

        if (
            i < 0 ||
            j < 0 ||
            i >= m ||
            j >= n ||
            grid[i][j] === '0'
        ) {
            return;
        }

        for (const [dx, dy] of possibleDist) {
            dfs(i + dx, j + dy);
        }
    }

    let islandCount = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] == '1' && !visited.has(`${i}-${j}`)) {
                dfs(i, j);
                islandCount++;
            }
        }
    }

    return islandCount
};