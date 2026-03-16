/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
    const ROWS = heights.length;
    const COLS = heights[0].length;

    const DIRS = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ];

    const res = [];

    const dfs = (x, y, checkMap) => {
        // console.log('🚉 ~ test.js:14 -> x, y: ', x, y);

        checkMap[`${x}-${y}`] = true;

        for (const [dx, dy] of DIRS) {
            const newX = x + dx;
            const newY = y + dy;

            if (newX > ROWS - 1 || newY > COLS - 1) checkMap.atlantic = true;
            if (newX < 0 || newY < 0) checkMap.pacific = true;

            if (checkMap.atlantic && checkMap.pacific) return;

            if (
                newX > ROWS - 1 ||
                newY > COLS - 1 ||
                newX < 0 ||
                newY < 0 ||
                checkMap[`${newX}-${newY}`]
            ) continue;

            if (heights[x][y] >= heights[newX][newY]) {
                dfs(newX, newY, checkMap);
            }
        }
    }

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            const checkMap = {};
            dfs(i, j, checkMap);
            // console.log(i, j, checkMap.atlantic, checkMap.pacific)
            if (checkMap.atlantic && checkMap.pacific) res.push([i, j]);
        }
    }

    return res;
};

/**
    x ->
    y
    |
    V
 */

// X >= ROWS then -> Atlantic
// Y >= ROWS then -> Atlantic

// X < 0 -> PACIFIC
// Y < 0 -> PACIFIC