/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
    const squareValidationMap = new Map();
    const colValidationMap = new Map();

    for (let row = 0; row < board.length; row++) {
        const newRow = board[row].filter((record) => { return record != "." });
        const rowSet = new Set(newRow);

        if (newRow.length != rowSet.size) {
            return false;
        }

        for (let col = 0; col < board[row].length; col++) {
            const value = board[row][col];
            if (value === '.') continue;
            
            if (!colValidationMap.get(col)) {
                colValidationMap.set(col, new Set());
            }

            const colValidationSet = colValidationMap.get(col);

            if(colValidationSet.has(value)) return false;
            colValidationSet.add(value);

            // Square Validation
            const squareRow = Math.floor(row / 3);
            const squareCol = Math.floor(col / 3);

            const squareValidationKey = `${squareRow}-${squareCol}`;

            if (!squareValidationMap.get(squareValidationKey)) {
                squareValidationMap.set(squareValidationKey, new Set());
            }

            const validationSet = squareValidationMap.get(squareValidationKey);

            if(validationSet.has(value)) return false;
            validationSet.add(value);
        }
    }

    return true;
};

console.log(isValidSudoku([
    [".",".","4",".",".",".","6","3","."],
    [".",".",".",".",".",".",".",".","."],
    ["5",".",".",".",".",".",".","9","."],
    [".",".",".","5","6",".",".",".","."],
    ["4",".","3",".",".",".",".",".","1"],
    [".",".",".","7",".",".",".",".","."],
    [".",".",".","5",".",".",".",".","."],
    [".",".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".",".","."]
]));