![Meeting Rooms II](/asset/images/MeetingRoomsII.png)
![Meeting Rooms II](/asset/images/MeetingRoomsII2.png)

-----

### 1\. Min Heap

This approach uses a Min-Heap to keep track of the **end times** of meetings currently in progress. We first sort the meetings by start time. For each new meeting, we check if the earliest-ending meeting in the heap has finished (end time $\le$ current start time). If so, we remove it (reuse the room). We then add the current meeting's end time to the heap. The size of the heap represents the number of rooms needed.

```javascript
/**
 * Definition of Interval:
 * class Interval {
 * constructor(start, end) {
 * this.start = start;
 * this.end = end;
 * }
 * }
 */

class Solution {
    /**
     * @param {Interval[]} intervals
     * @returns {number}
     */
    minMeetingRooms(intervals) {
        intervals.sort((a, b) => a.start - b.start);
        
        // Assumes MinPriorityQueue is available
        const minHeap = new MinPriorityQueue();
        
        for (const interval of intervals) {
            // If the earliest ending meeting finishes before the current one starts, reuse the room
            if (!minHeap.isEmpty() && minHeap.front().element <= interval.start) {
                minHeap.dequeue();
            }
            // Add the current meeting's end time
            minHeap.enqueue(interval.end);
        }
        return minHeap.size();
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \log n)$ due to sorting. Heap operations take $O(\log n)$.
  * **Space Complexity**: $O(n)$ for the heap.

-----

### 2\. Sweep Line Algorithm

This approach treats start and end times as events on a timeline. We use a map to record changes: `+1` for a start time and `-1` for an end time. By sorting these time points and iterating through them, we track the running sum of active meetings. The maximum value of this sum is the answer.

```javascript
/**
 * Definition of Interval:
 * class Interval {
 * constructor(start, end) {
 * this.start = start;
 * this.end = end;
 * }
 * }
 */

class Solution {
    /**
     * @param {Interval[]} intervals
     * @returns {number}
     */
    minMeetingRooms(intervals) {
        const mp = new Map();
        for (const i of intervals) {
            mp.set(i.start, (mp.get(i.start) || 0) + 1);
            mp.set(i.end, (mp.get(i.end) || 0) - 1);
        }
        
        const sortedKeys = Array.from(mp.keys()).sort((a, b) => a - b);
        let activeMeetings = 0;
        let maxRooms = 0;
        
        for (const key of sortedKeys) {
            activeMeetings += mp.get(key);
            maxRooms = Math.max(maxRooms, activeMeetings);
        }
        return maxRooms;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \log n)$ for sorting the keys.
  * **Space Complexity**: $O(n)$ for the map.

-----

### 3\. Two Pointers (Optimal)

This is the most efficient and standard solution. We separate the start and end times into two arrays and sort both. We then use two pointers (`s` for start, `e` for end). If a meeting starts before the earliest active meeting ends (`start[s] < end[e]`), we need a new room (`count++`). Otherwise, a meeting has ended, freeing up a room (`count--`).

```javascript
/**
 * Definition of Interval:
 * class Interval {
 * constructor(start, end) {
 * this.start = start;
 * this.end = end;
 * }
 * }
 */

class Solution {
    /**
     * @param {Interval[]} intervals
     * @returns {number}
     */
    minMeetingRooms(intervals) {
        const start = intervals.map((i) => i.start).sort((a, b) => a - b);
        const end = intervals.map((i) => i.end).sort((a, b) => a - b);

        let res = 0,
            count = 0,
            s = 0,
            e = 0;
            
        while (s < intervals.length) {
            if (start[s] < end[e]) {
                s++;
                count++;
            } else {
                e++;
                count--;
            }
            res = Math.max(res, count);
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \log n)$ for sorting the arrays.
  * **Space Complexity**: $O(n)$ to store the start and end time arrays.

-----

### 4\. Greedy (Similar to Sweep Line)

This approach creates a list of "events" where each start time is `[time, 1]` and each end time is `[time, -1]`. Sorting these events processes them in chronological order. By tracking the cumulative sum (`count`), we find the maximum number of concurrent meetings. Note the sort condition: if times are equal, we process the end time (`-1`) *before* the start time (`1`) to minimize rooms needed (i.e., a meeting ends and frees a room just as another starts).

```javascript
/**
 * Definition of Interval:
 * class Interval {
 * constructor(start, end) {
 * this.start = start;
 * this.end = end;
 * }
 * }
 */

class Solution {
    /**
     * @param {Interval[]} intervals
     * @returns {number}
     */
    minMeetingRooms(intervals) {
        const time = [];
        for (const i of intervals) {
            time.push([i.start, 1]);
            time.push([i.end, -1]);
        }

        // Sort by time. If times are equal, process end (-1) before start (1)
        time.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

        let res = 0,
            count = 0;
        for (const t of time) {
            count += t[1];
            res = Math.max(res, count);
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \log n)$ due to sorting.
  * **Space Complexity**: $O(n)$ for the `time` array.