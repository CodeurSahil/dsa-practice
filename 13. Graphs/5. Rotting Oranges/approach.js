class Solution {
  /**
   * @param {number[][]} grid
   */
  islandsAndTreasure(grid) {
    const ROWS = grid.length;
    const COLS = grid[0].length;
    const DIR = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0]
    ];

    const queue = [];
    const INF = 2147483647;

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (grid[i][j] == 0) queue.push([i, j]);
      }
    }

    let DIST = 0;
    while (queue.length) {
      const [i, j] = queue.shift();

      for (const [dx, dy] of DIR) {
        let x = i + dx;
        let y = j + dy;

        if (
          x < 0 ||
          x >= ROWS ||
          y < 0 ||
          y >= COLS ||
          grid[x][y] != INF
        ) continue;

        grid[x][y] = grid[i][j] + 1;
        queue.push([x, y]);
      }

      DIST++;
    }

    return grid;
  }
}

// {
//   [X, -1, 0, X],
//   [X, X, X, -1],
//   [X, -1, X, -1],
//   [0, -1, X, X]
// }
