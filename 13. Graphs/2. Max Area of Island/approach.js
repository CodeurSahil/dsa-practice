/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
    const ROWS = grid.length;
    const COL = grid[0].length;
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ];

    const visitedSet = new Set();
    let maxArea = 0;

    const getIslandLand = (i, j, obj) => {
        if (
            visitedSet.has(`${i}-${j}`) ||
            i < 0 ||
            i >= ROWS ||
            j < 0 ||
            j >= COL ||
            grid[i][j] == '0'
            ) return;

        visitedSet.add(`${i}-${j}`);
        obj.len++;

        for (const [dx, dy] of directions) {
            getIslandLand(i + dx, j + dy, obj);
        }
    }

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COL; j++) {
            if (!visitedSet.has(`${i}-${j}`) && grid[i][j] == '1') {
                let obj = { len: 0 };

                getIslandLand(i, j, obj);

                maxArea = Math.max(maxArea, obj.len);
            }

            visitedSet.add(`${i}-${j}`);
        }
    }

    return maxArea;
};