/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = async function (grid) {
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
            } else if (val === 1) {
                let pathExists = false;

                if (i - 1 > -1 && grid[i - 1][j]) {
                    pathExists = true;
                } else if(i + 1 < gridLength && grid[i + 1][j]) {
                    pathExists = true;
                } else if(j - 1 > -1 && grid[i][j - 1]) {
                    pathExists = true;
                } else if (j + 1 < gridElementLength && grid[i][j + 1]) {
                    pathExists = true;
                }

                if (!pathExists) {
                    return -1;
                }
            }
        }
    }

    let minutePassed = await oneMinutePass(grid, rottenOranges, gridLength, gridElementLength, 0);
    console.log('🚀 ~ approchTriedByMe.js:30 -> minutePassed: ', minutePassed);
    console.log('🎰 ~ approchTriedByMe.js:32 -> gridLength: ', grid);
    return minutePassed - 1;
};

function oneMinutePass(grid, rottenOranges, gridLength, gridElementLength, minutePassed) {
    console.log('🎯 ~ approchTriedByMe.js:39 -> minutePassed: ', minutePassed);

        const rottenOrangesKeys = Object.keys(rottenOranges);
        console.log('🎳 ~ approchTriedByMe.js:38 -> rottenOrangesKeys: ', rottenOrangesKeys);

        if (!rottenOrangesKeys.length) {

            console.log('🚇 ~ approchTriedByMe.js:47');
            return minutePassed;
        }

        console.log('😅 ~ approchTriedByMe.js:51');

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

        console.log('🛣️ ~ approchTriedByMe.js:76 -> newRottenOranges: ', newRottenOranges);

        return oneMinutePass(grid, newRottenOranges, gridLength, gridElementLength, minutePassed);
}


(async () => {
    let minutePassed = await orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]);
    console.log('🛡️ ~ approchTriedByMe.js:109 -> minutePassed: ', minutePassed);
    // orangesRotting([[2,1,1],[0,1,1],[1,0,1]]);

})();
