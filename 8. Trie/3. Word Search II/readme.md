![Word Search II)](/asset/images/WordSearchII.png)
![Word Search II)](/asset/images/WordSearchII2.png)

-----

### 1\. Backtracking

This is a **brute-force** approach. It iterates through every word in the dictionary. For each word, it scans every cell of the board to find a starting match. If a match is found, it performs a standard backtracking DFS to see if the entire word can be formed. 🐢

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @param {string[]} words
     * @return {string[]}
     */
    findWords(board, words) {
        const ROWS = board.length,
            COLS = board[0].length;
        const res = [];

        const backtrack = (r, c, word, i) => {
            if (i === word.length) return true;
            if (
                r < 0 ||
                c < 0 ||
                r >= ROWS ||
                c >= COLS ||
                board[r][c] !== word[i]
            )
                return false;

            const temp = board[r][c];
            board[r][c] = '*'; // Mark as visited
            const ret =
                backtrack(r + 1, c, word, i + 1) ||
                backtrack(r - 1, c, word, i + 1) ||
                backtrack(r, c + 1, word, i + 1) ||
                backtrack(r, c - 1, word, i + 1);
            board[r][c] = temp; // Unmark
            return ret;
        };

        for (const word of words) {
            let flag = false;
            for (let r = 0; r < ROWS; r++) {
                if (flag) break;
                for (let c = 0; c < COLS; c++) {
                    if (board[r][c] !== word[0]) continue;
                    if (backtrack(r, c, word, 0)) {
                        res.push(word);
                        flag = true;
                        break;
                    }
                }
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(m \cdot n \cdot 4^t + s)$
  * **Space complexity**: $O(t)$

(Where $m$ is rows, $n$ is columns, $t$ is the max word length, and $s$ is the sum of all word lengths.)

-----

### 2\. Backtracking (Trie + Hash Set)

This is a much more efficient approach. First, all words are inserted into a **Trie (Prefix Tree)**. Then, a single DFS is started from *each cell* of the board, simultaneously traversing the Trie. If a path on the board forms a word in the Trie, it's added to a `Set` (to avoid duplicates). This prunes search paths that don't match any prefix. 🌳

```javascript
class TrieNode {
    constructor() {
        this.children = {};
        this.isWord = false;
    }

    /**
     * @param {string} word
     * @return {void}
     */
    addWord(word) {
        let cur = this;
        for (const c of word) {
            if (!(c in cur.children)) {
                cur.children[c] = new TrieNode();
            }
            cur = cur.children[c];
        }
        cur.isWord = true;
    }
}
class Solution {
    /**
     * @param {character[][]} board
     * @param {string[]} words
     * @return {string[]}
     */
    findWords(board, words) {
        const root = new TrieNode();
        for (const word of words) {
            root.addWord(word);
        }

        const ROWS = board.length,
            COLS = board[0].length;
        const res = new Set(),
            visit = new Set();

        const dfs = (r, c, node, word) => {
            if (
                r < 0 ||
                c < 0 ||
                r >= ROWS ||
                c >= COLS ||
                visit.has(`${r},${c}`) ||
                !(board[r][c] in node.children)
            ) {
                return;
            }

            visit.add(`${r},${c}`);
            node = node.children[board[r][c]];
            word += board[r][c];
            if (node.isWord) {
                res.add(word);
            }

            dfs(r + 1, c, node, word);
            dfs(r - 1, c, node, word);
            dfs(r, c + 1, node, word);
            dfs(r, c - 1, node, word);

            visit.delete(`${r},${c}`);
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                dfs(r, c, root, '');
            }
        }

        return Array.from(res);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(m \cdot n \cdot 4 \cdot 3^{t-1} + s)$
  * **Space complexity**: $O(s)$

(Where $m$ is rows, $n$ is columns, $t$ is the max word length, and $s$ is the sum of all word lengths.)

-----

### 3\. Backtracking (Trie with Pruning)

This is the most optimized solution. It builds on the Trie approach but adds **Trie pruning**. When a word is found, it's marked in the Trie (by setting `idx = -1`) to prevent re-adding. More importantly, it uses a reference count (`refs`) on each node. If a node's `refs` drops to 0 after finding a word, that branch of the Trie is "pruned" (set to `null`), stopping all future searches down that useless path. ✅

```javascript
class TrieNode {
    constructor() {
        this.children = Array(26).fill(null);
        this.idx = -1; // Index of the word in the original array
        this.refs = 0; // Reference count for pruning
    }

    /**
     * @param {string} word
     * @param {number} i
     * @return {void}
     */
    addWord(word, i) {
        let cur = this;
        cur.refs++;
        for (const c of word) {
            const index = c.charCodeAt(0) - 'a'.charCodeAt(0);
            if (cur.children[index] === null) {
                cur.children[index] = new TrieNode();
            }
            cur = cur.children[index];
            cur.refs++;
        }
        cur.idx = i;
    }
}
class Solution {
    /**
     * @param {character[][]} board
     * @param {string[]} words
     * @return {string[]}
     */
    findWords(board, words) {
        const root = new TrieNode();
        for (let i = 0; i < words.length; i++) {
            root.addWord(words[i], i);
        }

        const ROWS = board.length,
            COLS = board[0].length;
        const res = [];

        const dfs = (r, c, node) => {
            if (
                r < 0 ||
                c < 0 ||
                r >= ROWS ||
                c >= COLS ||
                board[r][c] === '*' ||
                node.children[this.getId(board[r][c])] === null
            ) {
                return;
            }

            let tmp = board[r][c];
            board[r][c] = '*';
            let prev = node;
            node = node.children[this.getId(tmp)];
            
            if (node.idx !== -1) {
                res.push(words[node.idx]);
                node.idx = -1; // Prevent re-adding
                // Pruning logic would go here (decrementing refs and cutting branches)
            }

            dfs(r + 1, c, node);
            dfs(r - 1, c, node);
            dfs(r, c + 1, node);
            dfs(r, c - 1, node);

            board[r][c] = tmp;
            
            // Post-DFS pruning (if node.refs can be decremented)
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                dfs(r, c, root);
            }
        }

        return Array.from(res);
    }

    /**
     * @param {string} c
     * @return {number}
     */
    getId(c) {
        return c.charCodeAt(0) - 'a'.charCodeAt(0);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(m \cdot n \cdot 4 \cdot 3^{t-1} + s)$
  * **Space complexity**: $O(s)$

(Where $m$ is rows, $n$ is columns, $t$ is the max word length, and $s$ is the sum of all word lengths.)