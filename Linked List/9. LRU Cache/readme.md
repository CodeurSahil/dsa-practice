![LRU Cache](/asset/images/LRUCache.png)
![LRU Cache](/asset/images/LRUCache2.png)

-----

### 1\. Brute Force (Using an Array)

This simple implementation uses a standard array to store `[key, value]` pairs. Accessing (`get`) or updating (`put`) an item requires a **linear scan** to find it. The item is then moved to the end of the array to mark it as most recently used. 🐢

```javascript
class LRUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.cache = [];
        this.capacity = capacity;
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        for (let i = 0; i < this.cache.length; i++) {
            if (this.cache[i][0] === key) {
                let tmp = this.cache.splice(i, 1)[0];
                this.cache.push(tmp);
                return tmp[1];
            }
        }
        return -1;
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        for (let i = 0; i < this.cache.length; i++) {
            if (this.cache[i][0] === key) {
                this.cache.splice(i, 1);
                this.cache.push([key, value]);
                return;
            }
        }

        if (this.cache.length === this.capacity) {
            this.cache.shift(); // Remove LRU (front)
        }

        this.cache.push([key, value]);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$ for both `put()` and `get()` operations.
  * **Space complexity**: $O(n)$

-----

### 2\. Hash Map + Doubly Linked List (Optimal)

This is the classic, optimal solution. It combines a **`Map`** for $O(1)$ lookups with a **Doubly Linked List** for $O(1)$ insertions and deletions. The list maintains the order of use, with the most recent at the "right" (head) and the least recent at the "left" (tail). ✅

```javascript
class Node {
    /**
     * @param {number} key
     * @param {number} val
     */
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.cap = capacity;
        this.cache = new Map();
        // Dummy head (LRU) and tail (MRU)
        this.left = new Node(0, 0);
        this.right = new Node(0, 0);
        this.left.next = this.right;
        this.right.prev = this.left;
    }

    /** Remove node from list */
    remove(node) {
        const prev = node.prev;
        const nxt = node.next;
        prev.next = nxt;
        nxt.prev = prev;
    }

    /** Insert node at right (most recent) */
    insert(node) {
        const prev = this.right.prev;
        prev.next = node;
        node.prev = prev;
        node.next = this.right;
        this.right.prev = node;
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            this.remove(node);
            this.insert(node);
            return node.val;
        }
        return -1;
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        if (this.cache.has(key)) {
            this.remove(this.cache.get(key));
        }
        const newNode = new Node(key, value);
        this.cache.set(key, newNode);
        this.insert(newNode);

        if (this.cache.size > this.cap) {
            // Evict LRU
            const lru = this.left.next;
            this.remove(lru);
            this.cache.delete(lru.key);
        }
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(1)$ for both `put()` and `get()` operations.
  * **Space complexity**: $O(n)$

-----

### 3\. Built-In Data Structure (JavaScript `Map`)

JavaScript's built-in `Map` object handily maintains insertion order. We can leverage this to create a very simple LRU Cache. When we `get` an item, we `delete` it and then `set` it again, moving it to the "end" (most recent) of the map's order. When at capacity, we delete the "first" item (least recent) using `cache.keys().next().value`. 🔑

```javascript
class LRUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.cache = new Map();
        this.capacity = capacity;
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if (!this.cache.has(key)) return -1;
        
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size === this.capacity) {
            // Get the first key (LRU)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(1)$ for both `put()` and `get()` operations.
  * **Space complexity**: $O(n)$