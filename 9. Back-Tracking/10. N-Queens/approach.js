/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    const col = new Set();
    const posDiag = new Set(); // r + c
    const negDiag = new Set(); // r - c

    const res = [];
    let board = Array.from({ length: n }, () => new Array(n).fill('.'));

    const backTrack = (r) => {
        if (r === n) {
            const RES = [];

            for (let x of board) {
                RES.push(x.join(''));
            }

            res.push(RES)

            return;
        }

        for (let c = 0; c < n; c++) {
            if (col.has(c) || posDiag.has(r + c) || negDiag.has(r - c)) continue;

            col.add(c);
            posDiag.add(r + c);
            negDiag.add(r - c);

            board[r][c] = 'Q';

            backTrack(r + 1);

            col.delete(c);
            posDiag.delete(r + c);
            negDiag.delete(r - c);

            board[r][c] = '.';
        }
    }

    backTrack(0);

    return res;
};


/**
 * My Approach But Didint Worked for Long Wokred till 4
 */


const duplicate = {};

const markAllDangerVisited = (i, j, visited, n) => {
    const straightMoves = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];

    const crossMoves = [
        [1, 1],
        [-1, 1],
        [1, -1],
        [-1, -1]
    ];

    for (const [x, y] of straightMoves) {
        markAllDangerPath(i + x, j + y, x, y, visited, n);
    }

    for (const [x, y] of crossMoves) {
        markAllDangerPath(i + x, j + y, x, y, visited, n);
    }
}

const markAllDangerPath = (i, j, x, y, visited, n) => {
    if (
        i < 0 ||
        i >= n ||
        j < 0 ||
        j >= n
    ) {
        return;
    }

    visited.set(`${i}${j}`, true);

    markAllDangerPath(i + x, j + y, x, y, visited, n);
}

const placeQueen = (board, n, currCount, allPositions, visited) => {
    if (currCount === 0) {
        let key = '';
        const RES = [];

        for (let x of board) {
            const str = x.join('');
            RES.push(str);

            key += str;
        }

        if (!duplicate[key]) {
            allPositions.push(RES);
            duplicate[key] = true;
        }

        return;
    }

    const visitedCopy = new Map(visited);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (!visited.get(`${i}${j}`)) {
                visited.set(`${i}${j}`, true);
                board[i][j] = 'Q';
                currCount--;
                
                markAllDangerVisited(i, j, visited, n);
                placeQueen(board, n, currCount, allPositions, visited);

                currCount++;
                board[i][j] = '.';
                visited = visitedCopy;
            }
        }
    }

    return false;
}
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    const allPositions = [];
    let currCount = n;

    
    for (let i = 0; i < n; i++) {
        let board = Array.from({ length: n }, () => new Array(n).fill('.'));
        let visited = new Map();

        for (let j = 0; j < n; j++) {
            if (board[i][j] == '.') {
                visited.set(`${i}${j}`, true);
                
                board[i][j] = 'Q';
                currCount--;
                
                markAllDangerVisited(i, j, visited, n);
                placeQueen(board, n, currCount, allPositions, visited);

                visited.set(`${i}${j}`, false);
                board[i][j] = '.';
                currCount++
            }
        }
    }

    return allPositions;
};