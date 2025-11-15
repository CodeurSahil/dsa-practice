/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    const dfs = (startY, startX, wordCounter) => {
        if (wordCounter === word.length) return true;

        if (
            startY < 0 ||
            startY >= board.length ||
            startX < 0 ||
            startX >= board[0].length ||
            board[startY][startX] != word[wordCounter]
        ) {
            return false;
        }

        const tmp = board[startY][startX];
        board[startY][startX] = '*';

        for (const [y, x] of directions) {
            if (dfs(startY + y, startX + x, wordCounter + 1)) return true;
        }

        board[startY][startX] = tmp;

        return false;
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (dfs(i, j, 0)) return true;
        }
    }

    return false;
};