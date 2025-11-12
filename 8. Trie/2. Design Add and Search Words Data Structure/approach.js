class Node {
    constructor() {
        this.children = {};
        this.isLastChar = false;
    }
}
var Trie = function() {
    this.root = new Node();
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let curNode = this.root;

    for (const char of word) {
        if(!curNode.children[char]) {
            curNode.children[char] = new Node()
        }

        curNode = curNode.children[char];
    }

    curNode.isLastChar = true;
};

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let curNode = this.root;

    for (const char of word) {
        if(!curNode.children[char]) {
            return false;
        }

        curNode = curNode.children[char];
    }

    return curNode.isLastChar;
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let curNode = this.root;

    for (const char of prefix) {
        if(!curNode.children[char]) {
            return false;
        }

        curNode = curNode.children[char];
    }

    return true;
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */