/**
 * Falied Appraoch
 */

var solve = function(board) {
    const ROWS = board.length;
    const COLS = board[0].length;

    const DIRS = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ];

    const oIndex = [];

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (board[i][j] === 'O') oIndex.push([i, j]);
        }
    }

    const searchX = (x, y, [dx, dy]) => {
        if (
            x > ROWS - 1 ||
            y > COLS - 1 ||
            x < 0 ||
            y < 0
        ) return false;

        if (board[x][y] === 'X') return true;

        return searchX(x + dx, y + dy, [dx, dy]);
    }

    for (const [x, y] of oIndex) {
        const res = [];

        for (const [dx, dy] of DIRS) {
            res.push(searchX(x + dx, y + dy, [dx, dy]));
        }

        if (res.indexOf(false) == -1 && res.indexOf(true) != -1) board[x][y] = 'X';
    }

    return;
};


/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
    const ROWS = board.length;
    const COLS = board[0].length;

    const capture = (x, y) => {
        if (
            x < 0 ||
            y < 0 ||
            x > ROWS - 1 ||
            y > COLS - 1 ||
            board[x][y] != 'O'
        ) return;

        board[x][y] = 'V';

        capture(x + 1, y);
        capture(x - 1, y);

        capture(x, y + 1);
        capture(x, y - 1);
    }

    for (let i = 0; i < COLS; i++) {
        if (board[0][i] === 'O') capture(0, i);
        if (board[ROWS - 1][i] === 'O')capture(ROWS - 1, i);
    }

    for (let i = 0; i < ROWS; i++) {
        if (board[i][0] === 'O') capture(i, 0);
        if (board[i][COLS - 1] === 'O') capture(i, COLS - 1);
    }

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (board[i][j] === 'O') board[i][j] = 'X';
            if (board[i][j] === 'V') board[i][j] = 'O';
        }
    }

    return;
};