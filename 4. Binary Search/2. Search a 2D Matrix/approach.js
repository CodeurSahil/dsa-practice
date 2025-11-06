/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    let l = 0, r = (ROWS * COLS) - 1;

    while (l <= r) {
        const MID = l + Math.floor((r - l) / 2);

        const rowIndex = Math.floor(MID / COLS);
        const colIndex = MID % COLS;

        const VAL = matrix[rowIndex][colIndex];

        if (target > VAL) {
            l = MID + 1;;
        } else if (target < VAL) {
            r = MID - 1;;
        } else {
            return true;
        }
    }

    return false;
};