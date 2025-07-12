/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let infoIndex = {};
    let landCount = 0;

    for (let i = 0; i < grid.length; i++) {
        const elements = grid[i];

        for (let j = 0; j < elements.length; j++) {
            const value = grid[i][j];

            infoIndex[`${i}-${j}`] = {
                m: i,
                n: j,
                visited: value == "1" ? false : true
            };
        }
    }

    const indexKeys = Object.keys(infoIndex);

    for (const key of indexKeys) {
        if (!infoIndex[key].visited) {
            checkFourDirectionallyForLand(grid, infoIndex, key);
            landCount++; 
        }
    }

    return landCount;
};

function checkFourDirectionallyForLand(grid, infoIndex, key) {
    console.log(key)
    const info = infoIndex[key];
    info.visited = true;

    //Checking Up
    if(info.m - 1 > -1) {
        const newM = info.m - 1;
        const newN = info.n;

        if(!infoIndex[`${newM}-${newN}`].visited) {
            checkFourDirectionallyForLand(grid, infoIndex, `${newM}-${newN}`);
        }
    }

    //Checking Down
    if(info.m + 1 < grid.length) {
        const newM = info.m + 1;
        const newN = info.n;

        if(!infoIndex[`${newM}-${newN}`].visited) {
            checkFourDirectionallyForLand(grid, infoIndex, `${newM}-${newN}`);
        }
    }

    //Checking Left
    if(info.n - 1 > -1) {
        const newM = info.m;
        const newN = info.n - 1;

        if(!infoIndex[`${newM}-${newN}`].visited) {
            checkFourDirectionallyForLand(grid, infoIndex, `${newM}-${newN}`);
        }
    }

    //Checking Down
    if(info.n + 1 < grid[info.m].length) {
        const newM = info.m;
        const newN = info.n + 1;

        if(!infoIndex[`${newM}-${newN}`].visited) {
            checkFourDirectionallyForLand(grid, infoIndex, `${newM}-${newN}`);
        }
    }

    return;
}