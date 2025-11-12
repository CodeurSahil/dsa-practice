/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    const createTrie = () => {
        const root = {};

        for (const word of words) {
            let node = root;

            for (const char of word) {
                if (!node[char]) node[char] = {};
                node = node[char];
            }

            node.word = word;
        }

        return root;
    }

    const res = [];

    const searchWord = (node, row, col) => {
        if (node.word != null) {
            res.push(node.word);
            node.word = null;
        }

        if (
            row < 0 ||
            col < 0 ||
            row >= board.length ||
            col >= board[0].length ||
            board[row][col] == '$'||
            !node[board[row][col]]
        ) {
            return;
        }

        node = node[board[row][col]];

        let tmp = board[row][col];
        board[row][col] = '$';

        for (const [x, y] of directions) {
            searchWord(node, row + x, col + y);
        }

        board[row][col] = tmp;
    }

    const root = createTrie();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            searchWord(root, i, j);
        }
    }

    return res;
};

/**
 * Failing Over Time For 1 Test Case
 * Reason are Set Usage, 
 */

class Node {
    constructor() {
        this.children = {};
        this.isLast = false;
    }
}

const createTrie = (root, word) => {
    let currNode = root;

    for (let char of word) {
        if (!currNode.children[char]) currNode.children[char] = new Node();

        currNode = currNode.children[char];
    }

    currNode.isLast = true;
}

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
    const root = new Node();

    for (let word of words) createTrie(root, word);

    const res = new Set();
    const visited = new Set();

    const ROWS = board.length;
    const COLS = board[0].length;

    const dfs = (r, c, node, word) => {
        if (
            r < 0 ||
            c < 0 ||
            r >= ROWS ||
            c >= COLS ||
            visited.has(`${r}-${c}`) ||
            !node.children[board[r][c]]
        ) {
            return;
        }

        const char = board[r][c];

        visited.add(`${r}-${c}`);
        node = node.children[char];
        word += char;

        if (node.isLast) {
            res.add(word);
        }

        dfs(r + 1, c, node, word);
        dfs(r - 1, c, node, word);
        dfs(r, c + 1, node, word);
        dfs(r, c - 1, node, word);

        visited.delete(`${r}-${c}`);
    }

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            dfs(i, j, root, '');
        }
    }

    return Array.from(res);
};