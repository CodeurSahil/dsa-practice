![TimeBasedKey-ValueStore](/asset/images/TimeBasedKey-ValueStore.png)
![TimeBasedKey-ValueStore](/asset/images/TimeBasedKey-ValueStore2.png)



### 1\. Brute Force (Map of Maps)

This approach uses a nested `Map` structure (`key -> (timestamp -> value)`). The `set` operation is efficient. However, the `get` operation must **iterate through all timestamps** associated with a key to find the largest timestamp that is less than or equal to the target. 🐢

```javascript
class TimeMap {
    constructor() {
        this.keyStore = new Map(); // key -> Map<timestamp, value[]>
    }

    /**
     * @param {string} key
     * @param {string} value
     * @param {number} timestamp
     * @return {void}
     */
    set(key, value, timestamp) {
        if (!this.keyStore.has(key)) {
            this.keyStore.set(key, new Map());
        }
        // This solution handles multiple values at the same timestamp
        if (!this.keyStore.get(key).has(timestamp)) {
            this.keyStore.get(key).set(timestamp, []);
        }
        this.keyStore.get(key).get(timestamp).push(value);
    }

    /**
     * @param {string} key
     * @param {number} timestamp
     * @return {string}
     */
    get(key, timestamp) {
        if (!this.keyStore.has(key)) {
            return '';
        }
        let bestTimestamp = 0;

        for (let time of this.keyStore.get(key).keys()) {
            if (time <= timestamp) {
                bestTimestamp = Math.max(bestTimestamp, time);
            }
        }
        
        if (bestTimestamp === 0) return '';
        const values = this.keyStore.get(key).get(bestTimestamp);
        return values[values.length - 1]; // Return the last value set at that time
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(1)$ for `set()` and $O(n)$ for `get()`.
  * **Space complexity**: $O(m \cdot n)$

(Where $n$ is the number of unique timestamps for a key and $m$ is the total number of keys.)

-----

### 2\. Binary Search (Map of Arrays)

This is the optimal solution. It uses a `Map` where each key stores an **array of `[timestamp, value]` pairs**. Since the problem states that timestamps are strictly increasing, each `set` operation just appends to an already sorted array. This allows the `get` operation to use **binary search** to find the correct timestamp in $O(\log n)$ time. ✅

```javascript
class TimeMap {
    constructor() {
        this.keyStore = new Map(); // key -> [timestamp, value][]
    }

    /**
     * @param {string} key
     * @param {string} value
     * @param {number} timestamp
     * @return {void}
     */
    set(key, value, timestamp) {
        if (!this.keyStore.has(key)) {
            this.keyStore.set(key, []);
        }
        this.keyStore.get(key).push([timestamp, value]);
    }

    /**
     * @param {string} key
     * @param {number} timestamp
     * @return {string}
     */
    get(key, timestamp) {
        const values = this.keyStore.get(key) || [];
        let left = 0;
        let right = values.length - 1;
        let result = '';

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (values[mid][0] <= timestamp) {
                result = values[mid][1]; // This is a potential answer
                left = mid + 1; // Try to find a later, valid timestamp
            } else {
                right = mid - 1;
            }
        }

        return result;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(1)$ for `set()` (amortized) and $O(\log n)$ for `get()`.
  * **Space complexity**: $O(m \cdot n)$

(Where $n$ is the number of entries for a key and $m$ is the total number of keys.)