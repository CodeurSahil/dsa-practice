![Design Add and Search Words Data Structure)](/asset/images/DesignAddandSearchWordsDataStructure.png)
![Design Add and Search Words Data Structure)](/asset/images/DesignAddandSearchWordsDataStructure2.png)

-----

### 1\. Brute Force

This method stores all words in a simple array. The `search` function must iterate through the entire array, checking each word against the pattern. This is very slow for a large number of words. 🐢

```javascript
class WordDictionary {
    constructor() {
        this.store = [];
    }

    /**
     * @param {string} word
     * @return {void}
     */
    addWord(word) {
        this.store.push(word);
    }

    /**
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        for (let w of this.store) {
            if (w.length !== word.length) continue;
            let i = 0;
            while (i < w.length) {
                if (w[i] === word[i] || word[i] === '.') {
                    i++;
                } else {
                    break;
                }
            }
            if (i === w.length) {
                return true;
            }
        }
        return false;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(1)$ for `addWord()`, $O(m \cdot n)$ for `search()`.
  * **Space complexity**: $O(m \cdot n)$

(Where $m$ is the number of words added and $n$ is the length of the string.)

-----

### 2\. Depth First Search (Trie)

This is the optimal solution. It uses a **Trie (Prefix Tree)** to store words. The `search` function performs a DFS. When it encounters a `.` wildcard, it recursively explores *all* possible children nodes from that point, returning `true` if any path leads to a valid word. ✅

```javascript
class TrieNode {
    constructor() {
        this.children = Array(26).fill(null);
        this.word = false;
    }
}
class WordDictionary {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param {string} c
     * @return {number}
     */
    getIndex(c) {
        return c.charCodeAt(0) - 'a'.charCodeAt(0);
    }

    /**
     * @param {string} word
     * @return {void}
     */
    addWord(word) {
        let cur = this.root;
        for (const c of word) {
            const idx = this.getIndex(c);
            if (cur.children[idx] === null) {
                cur.children[idx] = new TrieNode();
            }
            cur = cur.children[idx];
        }
        cur.word = true;
    }

    /**
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        return this.dfs(word, 0, this.root);
    }

    /**
     * @param {string} word
     * @param {number} j
     * @param {TrieNode} root
     * @return {boolean}
     */
    dfs(word, j, root) {
        let cur = root;

        for (let i = j; i < word.length; i++) {
            const c = word[i];
            if (c === '.') {
                for (const child of cur.children) {
                    if (child !== null && this.dfs(word, i + 1, child)) {
                        return true;
                    }
                }
                return false;
            } else {
                const idx = this.getIndex(c);
                if (cur.children[idx] === null) {
                    return false;
                }
                cur = cur.children[idx];
            }
        }
        return cur.word;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$ for `addWord()`, $O(n)$ for `search()` (in the best case, $O(m \cdot 26^n)$ worst case with many wildcards).
  * **Space complexity**: $O(t+n)$

-----

### 3\. Bucketing by Length

```javascript
var WordDictionary = function () {
    this.dictionary = new Map();
};

/** * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
    const len = word.length;
    if (!this.dictionary.has(len)) {
        this.dictionary.set(len, new Set());
    }
    this.dictionary.get(len).add(word);
};

/** * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
    const len = word.length;
    if (!this.dictionary.has(len)) return false;
    const wordSet = this.dictionary.get(len);

    // direct match
    if (wordSet.has(word)) return true;

    // wildcard search
    if (word.includes('.')) {
        const chars = [...word];
        for (const candidate of wordSet) {
            if (chars.every((char, i) => char === '.' || char === candidate[i])) {
                return true;
            }
        }
    }

    return false;
};


/** * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
```

#### **Time & Space Complexity**

  * **Time complexity**: `addWord()`: $O(n)$. `search()`: $O(m \cdot n)$.
  * **Space complexity**: $O(L)$

(Where $n$ is the length of the word, $m$ is the number of words *of the same length*, and $L$ is the total number of characters in the dictionary.)