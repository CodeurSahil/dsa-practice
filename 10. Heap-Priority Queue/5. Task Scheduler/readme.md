![Task Scheduler](/asset/images/TaskScheduler.png)
![Task Scheduler](/asset/images/TaskScheduler2.png)

-----

### 1\. Brute Force (Simulation)

This approach simulates the CPU clock tick by tick. In every step, it searches for the task with the highest remaining frequency that is *not* currently in the cooldown period. 🐢

```javascript
class Solution {
    /**
     * @param {character[]} tasks
     * @param {number} n
     * @return {number}
     */
    leastInterval(tasks, n) {
        const count = new Array(26).fill(0);
        for (const task of tasks) {
            count[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;
        }

        const arr = [];
        for (let i = 0; i < 26; i++) {
            if (count[i] > 0) {
                arr.push([count[i], i]);
            }
        }

        let time = 0;
        const processed = [];
        while (arr.length > 0) {
            let maxi = -1;
            // Find the best available task
            for (let i = 0; i < arr.length; i++) {
                let ok = true;
                // Check cooldown constraint
                for (let j = Math.max(0, time - n); j < time; j++) {
                    if (j < processed.length && processed[j] === arr[i][1]) {
                        ok = false;
                        break;
                    }
                }
                if (!ok) continue;
                if (maxi === -1 || arr[maxi][0] < arr[i][0]) {
                    maxi = i;
                }
            }

            time++;
            let cur = -1;
            if (maxi !== -1) {
                cur = arr[maxi][1];
                arr[maxi][0]--;
                if (arr[maxi][0] === 0) {
                    arr.splice(maxi, 1);
                }
            }
            processed.push(cur);
        }
        return time;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(t \cdot n)$, where $t$ is the total time units required.
  * **Space Complexity**: $O(t)$ to store the history of processed tasks.

-----

### 2\. Max-Heap and Queue (Simulation)

This approach simulates the process efficiently using data structures.

  * **Max-Heap**: Stores tasks ready to be executed, prioritized by frequency (highest count first).
  * **Queue**: Stores tasks currently in cooldown `[remaining_count, time_available]`.

We extract the most frequent task, decrement it, and move it to the queue. When the current `time` equals the `time_available` of the task at the front of the queue, we move it back to the heap.

```javascript
class Solution {
    /**
     * @param {character[]} tasks
     * @param {number} n
     * @return {number}
     */
    leastInterval(tasks, n) {
        let count = new Array(26).fill(0);
        for (let task of tasks) {
            count[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;
        }

        // Assumes MaxPriorityQueue is available in the environment
        let maxHeap = new MaxPriorityQueue();
        for (let i = 0; i < 26; i++) {
            if (count[i] > 0) maxHeap.enqueue(count[i]);
        }

        let time = 0;
        let q = new Queue(); // Stores [count, next_valid_time]

        while (maxHeap.size() > 0 || q.size() > 0) {
            time++;

            if (maxHeap.size() > 0) {
                let cnt = maxHeap.dequeue().element - 1;
                if (cnt !== 0) {
                    q.push([cnt, time + n]);
                }
            }

            if (q.size() > 0 && q.front()[1] === time) {
                maxHeap.enqueue(q.pop()[0]);
            }
        }

        return time;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(m)$, where $m$ is the number of tasks.
  * **Space Complexity**: $O(1)$, as the alphabet size is fixed at 26.

-----

### 3\. Greedy (Counting Idle Slots)

This method calculates the number of **idle slots** required.

1.  We arrange the most frequent task first (e.g., `A _ _ A _ _ A`).
2.  The max frequency determines the number of chunks. The maximum possible idle slots are `(max_freq - 1) * n`.
3.  We iterate through the other tasks and fill these idle slots. If we run out of idle slots (result is negative), it means we have enough tasks to fill all gaps, and the answer is just the total length of tasks.

<!-- end list -->

```javascript
class Solution {
    /**
     * @param {character[]} tasks
     * @param {number} n
     * @return {number}
     */
    leastInterval(tasks, n) {
        const count = new Array(26).fill(0);
        for (const task of tasks) {
            count[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;
        }

        count.sort((a, b) => a - b);
        const maxf = count[25];
        let idle = (maxf - 1) * n;

        for (let i = 24; i >= 0; i--) {
            idle -= Math.min(maxf - 1, count[i]);
        }
        return Math.max(0, idle) + tasks.length;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(m)$, dominated by iterating over tasks to count frequencies.
  * **Space Complexity**: $O(1)$.

-----

### 4\. Math (Formula)

This is the most concise solution. It derives the formula based on the most frequent tasks.

  * The minimum length is determined by the tasks with the maximum frequency.
  * If there are `k` tasks that all share the maximum frequency `max_f`, the formula is: `(max_f - 1) * (n + 1) + k`.
  * The result is the maximum of this calculated value or the simple length of the task array (in case `n` is small and no idles are needed). ⚡

<!-- end list -->

```javascript
class Solution {
    /**
     * @param {character[]} tasks
     * @param {number} n
     * @return {number}
     */
    leastInterval(tasks, n) {
        const count = new Array(26).fill(0);
        for (const task of tasks) {
            count[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;
        }

        const maxf = Math.max(...count);
        let maxCount = 0;
        for (const i of count) {
            if (i === maxf) {
                maxCount++;
            }
        }

        const time = (maxf - 1) * (n + 1) + maxCount;
        return Math.max(tasks.length, time);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(m)$.
  * **Space Complexity**: $O(1)$.