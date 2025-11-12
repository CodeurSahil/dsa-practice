![Implement Trie (Prefix Tree)](/asset/images/ImplementTrie(PrefixTree).png)
![Implement Trie (Prefix Tree)](/asset/images/ImplementTrie(PrefixTree)2.png)

-----

## 1\. Prefix Tree (Array-based)

This version is highly optimized for a known, small character set, like the 26 lowercase English letters. It uses a **fixed-size array** at each node, where the index `0-25` corresponds to `'a'-'z'`.

```javascript
class TrieNode {
    constructor() {
        this.children = new Array(26).fill(null);
        this.endOfWord = false;
    }
}
class PrefixTree {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param {string} word
     * @return {void}
     */
    insert(word) {
        let cur = this.root;
        for (let c of word) {
            let i = c.charCodeAt(0) - 97;
            if (cur.children[i] === null) {
                cur.children[i] = new TrieNode();
            }
            cur = cur.children[i];
        }
        cur.endOfWord = true;
    }

    /**
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        let cur = this.root;
        for (let c of word) {
            let i = c.charCodeAt(0) - 97;
            if (cur.children[i] === null) {
                return false;
            }
            cur = cur.children[i];
        }
        return cur.endOfWord;
    }

    /**
     * @param {string} prefix
     * @return {boolean}
     */
    startsWith(prefix) {
        let cur = this.root;
        for (let c of prefix) {
            let i = c.charCodeAt(0) - 97;
            if (cur.children[i] === null) {
                return false;
            }
            cur = cur.children[i];
        }
        return true;
    }
}
```

### Time & Space Complexity

  * **Time complexity**: $O(n)$ for each function call.
  * **Space complexity**: $O(t)$

(Where $n$ is the length of the string and $t$ is the total number of TrieNodes.)

-----

## 2\. Prefix Tree (Map-based)

This version is more flexible and can store strings with *any* character (uppercase, numbers, symbols) without a large, sparse array. It uses a **Hash Map** at each node to store children. 🗺️

```javascript
class TrieNode {
    constructor() {
        this.children = new Map();
        this.endOfWord = false;
    }
}
class PrefixTree {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param {string} word
     * @return {void}
     */
    insert(word) {
        let cur = this.root;
        for (let c of word) {
            if (!cur.children.has(c)) {
                cur.children.set(c, new TrieNode());
            }
            cur = cur.children.get(c);
        }
        cur.endOfWord = true;
    }

    /**
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        let cur = this.root;
        for (let c of word) {
            if (!cur.children.has(c)) {
                return false;
            }
            cur = cur.children.get(c);
        }
        return cur.endOfWord;
    }

    /**
     * @param {string} prefix
     * @return {boolean}
     */
    startsWith(prefix) {
        let cur = this.root;
        for (let c of prefix) {
            if (!cur.children.has(c)) {
                return false;
            }
            cur = cur.children.get(c);
        }
        return true;
    }
}
```

### Time & Space Complexity

  * **Time complexity**: $O(n)$ for each function call.
  * **Space complexity**: $O(t)$

(Where $n$ is the length of the string and $t$ is the total number of TrieNodes.)