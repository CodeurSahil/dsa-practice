![Gas Station](/asset/images/GasStation.png)
![Gas Station](/asset/images/GasStation2.png)

-----

### 1\. Brute Force

This method attempts to simulate the journey starting from **every single station**. If the tank ever drops below zero during a simulation, we stop and try the next starting point. This is inefficient because it repeats calculations for overlapping paths. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} gas
     * @param {number[]} cost
     * @return {number}
     */
    canCompleteCircuit(gas, cost) {
        const n = gas.length;

        for (let i = 0; i < n; i++) {
            let tank = gas[i] - cost[i];
            // If we can't even move to the next station, skip
            if (tank < 0) continue;

            let j = (i + 1) % n;
            // Simulate the full circle
            while (j !== i) {
                tank += gas[j] - cost[j];
                if (tank < 0) break;
                j = (j + 1) % n;
            }

            // If we made it back to start, return index
            if (j === i) return i;
        }
        return -1;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$
  * **Space Complexity**: $O(1)$

-----

### 2\. Two Pointers

This approach uses a sliding window technique. We maintain a window `[start, end]`. We expand `end` if the tank is positive. If the tank becomes negative, we essentially "borrow" gas by moving `start` backward to pick up previous stations, hoping to make the net gas positive again.

```javascript
class Solution {
    /**
     * @param {number[]} gas
     * @param {number[]} cost
     * @return {number}
     */
    canCompleteCircuit(gas, cost) {
        const n = gas.length;
        let start = n - 1,
            end = 0;
        let tank = gas[start] - cost[start];
        
        // Expand window until it covers the whole array
        while (start > end) {
            if (tank < 0) {
                // Not enough gas? Move start back to accumulate more
                start--;
                tank += gas[start] - cost[start];
            } else {
                // Enough gas? Move end forward to consume gas
                tank += gas[end] - cost[end];
                end++;
            }
        }
        return tank >= 0 ? start : -1;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(1)$

-----

### 3\. Greedy (Optimal)

This is the standard $O(n)$ solution. It relies on two key insights:

1.  **Global Check:** If the total gas available in the world is less than the total cost, a solution is impossible. Return `-1`.
2.  **Local Check:** If we start at station `A` and run out of gas at station `B`, then **no station between A and B can be a starting point**. (Because we arrived at those intermediate stations with *positive* gas and still failed; starting there with *zero* gas would fail even sooner). Therefore, the next possible start is `B + 1`. ✅

<!-- end list -->

```javascript
class Solution {
    /**
     * @param {number[]} gas
     * @param {number[]} cost
     * @return {number}
     */
    canCompleteCircuit(gas, cost) {
        // 1. Global Check: Is a solution even possible?
        const totalGas = gas.reduce((acc, val) => acc + val, 0);
        const totalCost = cost.reduce((acc, val) => acc + val, 0);
        if (totalGas < totalCost) {
            return -1;
        }

        // 2. Find the start point
        let currentTank = 0;
        let start = 0;
        
        for (let i = 0; i < gas.length; i++) {
            currentTank += gas[i] - cost[i];

            // If tank drops below 0, index i (and anything before it) cannot be the start.
            // Reset and try starting from i + 1.
            if (currentTank < 0) {
                currentTank = 0;
                start = i + 1;
            }
        }

        return start;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$. We pass through the array effectively once.
  * **Space Complexity**: $O(1)$.