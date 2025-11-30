![Last Stone Weight](/asset/images/LastStoneWeight.png)
![Last Stone Weight](/asset/images/LastStoneWeight2.png)

-----

### 1\. Sorting (Iterative)

This is the simulation approach. In every iteration of the loop, we **re-sort** the array to bring the heaviest stones to the end, remove them, smash them, and push the result back if it's not zero. While simple, re-sorting inside a loop is inefficient. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeight(stones) {
        while (stones.length > 1) {
            stones.sort((a, b) => a - b);
            let cur = stones.pop() - stones.pop();
            if (cur) {
                stones.push(cur);
            }
        }
        return stones.length ? stones[0] : 0;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2 \log n)$ (Sorting takes $n \log n$, and we do it up to $n$ times).
  * **Space Complexity**: $O(1)$ or $O(n)$ depending on the sorting implementation.

-----

### 2\. Binary Search (Sorted Insertion)

This method optimizes the previous one. Instead of re-sorting the whole array, we maintain a sorted array. After smashing the two heaviest stones, if a stone remains, we use **binary search** to find the correct index to insert it back into the array to keep it sorted. 🔍

```javascript
class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeight(stones) {
        stones.sort((a, b) => a - b);
        let n = stones.length;

        while (n > 1) {
            let cur = stones.pop() - stones.pop();
            n -= 2;
            if (cur > 0) {
                let l = 0,
                    r = n;
                while (l < r) {
                    let mid = Math.floor((l + r) / 2);
                    if (stones[mid] < cur) {
                        l = mid + 1;
                    } else {
                        r = mid;
                    }
                }
                // Manual insertion (shifting elements)
                let pos = l;
                n++;
                stones.push(0); // Expand array
                for (let i = n - 1; i > pos; i--) {
                    stones[i] = stones[i - 1];
                }
                stones[pos] = cur;
            }
        }
        return n > 0 ? stones[0] : 0;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$. While finding the spot is $O(\log n)$, inserting an element into an array requires shifting elements, which is $O(n)$.
  * **Space Complexity**: $O(1)$.

-----

### 3\. Max-Heap (Priority Queue)

This is the most efficient general-purpose solution. A **Max-Heap** allows us to extract the largest element in $O(\log n)$ time and insert a new element in $O(\log n)$ time. We simply heapify the stones, and then repeatedly extract the top two. ✅

```javascript
/**
 * const { MaxPriorityQueue } = require('@datastructures-js/priority-queue');
 */
class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeight(stones) {
        // Assumes environment supports MaxPriorityQueue (e.g., LeetCode)
        const maxPQ = new MaxPriorityQueue();

        for (const stone of stones) {
            maxPQ.enqueue(stone);
        }

        while (maxPQ.size() > 1) {
            const stone1 = maxPQ.dequeue().element; // .element for some libs
            const stone2 = maxPQ.dequeue().element;

            if (stone1 !== stone2) {
                maxPQ.enqueue(stone1 - stone2);
            }
        }

        return maxPQ.size() === 1 ? maxPQ.dequeue().element : 0;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \log n)$. Each insertion and deletion is logarithmic.
  * **Space Complexity**: $O(n)$ to store the heap.

-----

### 4\. Bucket Sort (Counting Sort)

This approach works well when the **maximum weight of a stone is small**. We create a frequency array (buckets) where the index represents the stone weight. We iterate backwards from the heaviest weight. If we have two of the same weight, they cancel out. If we have one left, we subtract it from the next heaviest available stone. 🪣

```javascript
class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeight(stones) {
        let maxStone = 0;
        for (let stone of stones) {
            maxStone = Math.max(maxStone, stone);
        }

        const bucket = new Array(maxStone + 1).fill(0);
        for (let stone of stones) {
            bucket[stone]++;
        }

        let largest = maxStone;
        while (largest > 0) {
            // If even number of stones, they all smash each other
            if (bucket[largest] % 2 !== 0) {
                let nextLargest = largest - 1;
                while (nextLargest > 0 && bucket[nextLargest] === 0) {
                    nextLargest--;
                }

                if (nextLargest === 0) {
                    return largest;
                }

                // Smash largest with nextLargest
                bucket[nextLargest]--;
                bucket[largest - nextLargest]++;
                
                // We must re-evaluate from the larger of the new stone or the current nextLargest
                largest = Math.max(largest - nextLargest, nextLargest) + 1; 
            }
            largest--;
        }

        return 0;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n + w)$, where $w$ is the maximum weight of a stone.
  * **Space Complexity**: $O(w)$ to store the buckets.