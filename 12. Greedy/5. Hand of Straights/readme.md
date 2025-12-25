![Hand of Straights](/asset/images/HandofStraights.png)

---

### 1. Sorting (Greedy)

This is the most intuitive approach. We count the frequency of each card first. Then, we sort the unique card values. We iterate through the sorted cards, and whenever we find a card that still has a count greater than 0, we treat it as the **start** of a new group. We then attempt to find and "consume" the next `groupSize - 1` consecutive cards.

```javascript
class Solution {
    /**
     * @param {number[]} hand
     * @param {number} groupSize
     * @return {boolean}
     */
    isNStraightHand(hand, groupSize) {
        if (hand.length % groupSize !== 0) {
            return false;
        }

        const count = {};
        for (const num of hand) {
            count[num] = (count[num] || 0) + 1;
        }

        // Sort hand to ensure we process numbers in increasing order
        hand.sort((a, b) => a - b);

        for (const num of hand) {
            // If this card is available, it MUST be the start of a sequence
            if (count[num] > 0) {
                // Try to build the sequence
                for (let i = num; i < num + groupSize; i++) {
                    if (!count[i]) return false; // Missing a card
                    count[i] -= 1;
                }
            }
        }
        return true;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**:  due to sorting.
* **Space Complexity**:  to store the frequency map.

---

### 2. Min-Heap

This approach is useful to avoid sorting the entire array if we want to dynamically pick the smallest available card. We put all unique card values into a **Min-Heap**.

1. Extract the minimum value (`first`) from the heap.
2. Check if `first`, `first+1`, ..., `first+groupSize-1` exist in the frequency map.
3. Decrement their counts. If a card's count drops to 0, we ensure it was the one we just popped from the heap (otherwise, we are removing cards out of order, which implies a gap in sequences).

```javascript
/**
 * const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
 */
class Solution {
    /**
     * @param {number[]} hand
     * @param {number} groupSize
     * @return {boolean}
     */
    isNStraightHand(hand, groupSize) {
        if (hand.length % groupSize !== 0) {
            return false;
        }

        const count = {};
        for (const n of hand) {
            count[n] = (count[n] || 0) + 1;
        }

        const minPQ = new MinPriorityQueue();
        for (const key in count) {
            minPQ.enqueue(Number(key));
        }

        while (!minPQ.isEmpty()) {
            const first = minPQ.front().element;
            
            // Try to form a group starting from 'first'
            for (let i = first; i < first + groupSize; i++) {
                if (!(i in count) || count[i] === 0) {
                    return false;
                }
                
                count[i] -= 1;
                
                // If a card count reaches 0, it must be the current min in the heap
                if (count[i] === 0) {
                    if (i !== minPQ.front().element) {
                        return false;
                    }
                    minPQ.dequeue();
                }
            }
        }
        return true;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**:  because heap operations are logarithmic.
* **Space Complexity**: .

---

### 3. Ordered Map (Simulation with Queue)

This logic simulates "opening" groups. We iterate through the sorted unique keys.

* `openGroups`: How many groups are currently active and need the current number to continue.
* `Queue`: Tracks exactly *when* (how many steps ago) a group started, so we know when to close it.

If we encounter a number `num`, and we have `openGroups` active, we *must* use `openGroups` copies of `num` to extend them. Any remaining copies of `num` start **new** groups.

```javascript
class Solution {
    /**
     * @param {number[]} hand
     * @param {number} groupSize
     * @return {boolean}
     */
    isNStraightHand(hand, groupSize) {
        if (hand.length % groupSize !== 0) return false;

        let count = new Map();
        hand.forEach((num) => count.set(num, (count.get(num) || 0) + 1));

        // Get unique keys sorted
        const sortedKeys = Array.from(count.keys()).sort((a, b) => a - b);
        
        // Tracks the number of new groups started at previous steps
        let q = []; 
        let lastNum = -1;
        let openGroups = 0;

        for (const num of sortedKeys) {
            const c = count.get(num);

            // Case 1: Gap in numbers but we have open groups needing extension
            if (openGroups > 0 && num > lastNum + 1) {
                return false;
            }
            // Case 2: Not enough current cards to satisfy open groups
            if (openGroups > c) {
                return false;
            }

            // The surplus cards start NEW groups
            const newGroups = c - openGroups;
            q.push(newGroups);
            
            lastNum = num;
            openGroups += newGroups; // Total active groups

            // If a group has reached size 'groupSize', it closes
            if (q.length === groupSize) {
                openGroups -= q.shift();
            }
        }

        return openGroups === 0;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**:  due to sorting keys.
* **Space Complexity**: .

---

### 4. Hash Map (Optimized Linear Scan)

This solution attempts to be . It iterates through the input. For any number `num`, it first hunts backward (`num-1`, `num-2`...) to find the **true start** of the consecutive sequence `num` belongs to. Once the start is found, it greedily builds as many groups as possible from that start point.

```javascript
class Solution {
    /**
     * @param {number[]} hand
     * @param {number} groupSize
     * @return {boolean}
     */
    isNStraightHand(hand, groupSize) {
        if (hand.length % groupSize !== 0) return false;

        const count = new Map();
        hand.forEach((num) => count.set(num, (count.get(num) || 0) + 1));

        for (const num of hand) {
            if (count.get(num) === 0) continue;

            // Find the start of the sequence this card belongs to
            let start = num;
            while (count.get(start - 1) > 0) start--;

            // Consume sequences starting from 'start'
            while (start <= num) {
                while (count.get(start) > 0) {
                    for (let i = start; i < start + groupSize; i++) {
                        if (!count.get(i)) return false;
                        count.set(i, count.get(i) - 1);
                    }
                }
                start++;
            }
        }
        return true;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: . Although there are nested loops, each card is added to the map once and decremented from the map exactly once.
* **Space Complexity**: .