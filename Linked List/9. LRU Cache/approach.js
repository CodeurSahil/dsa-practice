/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.map = new Map();
    this.capacity = capacity;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (!this.map.has(key)) return -1;

    const val = this.map.get(key);

    this.map.delete(key);
    this.map.set(key, val);

    return val;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.map.has(key)) {
        this.map.delete(key);
    } else if (this.map.size == this.capacity) {
        const firstKey = this.map.keys().next().value;
        this.map.delete(firstKey);
    }

    this.map.set(key, value);
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

/**
 * Failed By Time
 */

class Node {
    constructor(key, val, next) {
        this.key = key;
        this.val = val;
        this.next = null;
    }
}

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.totalCapacity = capacity;
    this.currentCapacity = 0;
    this.head = null;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    let currNode = this.head;
    let prevNode = null;

    while (currNode != null) {
        if (currNode.key === key) {

            if (prevNode) {
                prevNode.next = currNode.next;

                currNode.next = this.head;
                this.head = currNode;
            }

            return currNode.val;
        }

        prevNode = currNode;
        currNode = currNode.next
    }

    return -1;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    let checkIfAlreadyExists = this.get(key);

    if (checkIfAlreadyExists != -1) {
        this.head.val = value;
    } else {
        let newNode = new Node(key, value, null);

        newNode.next = this.head;
        this.head = newNode;

        this.currentCapacity++;

        if (this.currentCapacity > this.totalCapacity) {
            let curnode = this.head;

            while (curnode.next != null && curnode.next.next != null) {
                curnode = curnode.next;
            }

            curnode.next = null;

            this.currentCapacity--;
        }
    }

};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */