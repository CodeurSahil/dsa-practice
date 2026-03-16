![Count Ways to Group Overlapping Ranges](/asset/images/CountWaystoGroupOverlappingRanges.png)
![Count Ways to Group Overlapping Ranges](/asset/images/CountWaystoGroupOverlappingRanges2.png)

### **Intuition**

The problem states that **overlapping ranges must be in the same group**. This effectively means we need to find the number of **connected components** (merged intervals).

If we have  distinct connected components (groups of overlapping ranges), each component can independently be assigned to either **Group 1** or **Group 2**.

* Component 1 can be in Group 1 or Group 2 (2 choices).
* Component 2 can be in Group 1 or Group 2 (2 choices).
* ...
* Component  can be in Group 1 or Group 2 (2 choices).

Total ways = . We return this result modulo .

### **Algorithm**

1. **Sort** the ranges by their start time.
2. Iterate through the sorted ranges to **merge overlapping intervals**.
3. Count the number of merged intervals (connected components). Let this count be `count`.
4. The answer is .

### **Code**

```javascript
/**
 * @param {number[][]} ranges
 * @return {number}
 */
var countWays = function(ranges) {
    const MOD = 1_000_000_007;
    
    // 1. Sort ranges by start time
    ranges.sort((a, b) => a[0] - b[0]);

    let count = 0;
    let maxEnd = -1;

    // 2. Iterate and count connected components
    for (const [start, end] of ranges) {
        // If the current range starts after the previous max end, 
        // it means we found a new disconnected component.
        if (start > maxEnd) {
            count++;
        }
        // Update the maxEnd to extend the current component
        maxEnd = Math.max(maxEnd, end);
    }

    // 3. Calculate 2^count % MOD
    // We can't use Math.pow for large numbers due to precision issues, so we loop.
    let res = 1;
    for (let i = 0; i < count; i++) {
        res = (res * 2) % MOD;
    }

    return res;
};

```

### **Complexity Analysis**

* **Time Complexity:**  due to sorting. The iteration takes .
* **Space Complexity:**  (or  depending on the sort implementation's stack), as we modify the input or use constant extra space.