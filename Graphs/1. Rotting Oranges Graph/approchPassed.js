/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
    const gridLength = grid.length;
    let gridElementLength = 0;

    let rottenOranges = {};

    for (let i = 0; i < gridLength; i++) {
        const element = grid[i];
        gridElementLength = Math.max(gridElementLength, element.length);

        for (let j = 0; j < element.length; j++) {
            const val = element[j];

            if (val === 2) {
                rottenOranges[`${i}-${j}`] = { m: i, n: j };
            }
        }
    }

    let minutePassed = oneMinutePass(grid, rottenOranges, gridLength, gridElementLength, 0);

    for (const elements of grid) {
        if (elements.includes(1)) {
            return -1;
        }
    }

    return minutePassed ? minutePassed - 1 : 0;
};

function oneMinutePass(grid, rottenOranges, gridLength, gridElementLength, minutePassed) {
    const rottenOrangesKeys = Object.keys(rottenOranges);

    if (!rottenOrangesKeys.length) {
        return minutePassed;
    }

    minutePassed++;

    const newRottenOranges = {};

    for (const key of rottenOrangesKeys) {
        const m = rottenOranges[key].m;
        const n = rottenOranges[key].n;

        if (m - 1 > -1) {
            if (grid[m - 1][n] == 1) {
                grid[m - 1][n] = 2;
                newRottenOranges[`${m - 1}-${n}`] = { m: m - 1, n: n };
            }
        }

        if (m + 1 < gridLength) {
            if (grid[m + 1][n] == 1) {
                grid[m + 1][n] = 2;
                newRottenOranges[`${m + 1}-${n}`] = { m: m + 1, n: n };
            }
        }

        if (n - 1 > -1) {
            if (grid[m][n - 1] == 1) {
                grid[m][n - 1] = 2;
                newRottenOranges[`${m}-${n - 1}`] = { m: m, n: n - 1 };
            }
        }

        if (n + 1 < gridElementLength) {
            if (grid[m][n + 1] == 1) {
                grid[m][n + 1] = 2;
                newRottenOranges[`${m}-${n + 1}`] = { m: m, n: n + 1 };
            }
        }
    }

    return oneMinutePass(grid, newRottenOranges, gridLength, gridElementLength, minutePassed);
}