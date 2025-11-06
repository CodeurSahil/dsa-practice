![Car Fleet1](/asset/images/carFleet1.png)
![Car Fleet2](/asset/images/carFleet2.png)


The core idea behind these solutions is that if a car behind is faster than a car ahead, it will eventually catch up and they will travel at the speed of the front car, effectively forming a single fleet.

-----

### 1\. Stack

This approach first sorts the cars by their starting position, closest to the target first. It then calculates the time it takes for each car to reach the target. A **stack** is used to track the arrival times of the fleets. A car forms a new fleet only if it arrives later than the fleet immediately in front of it (the time on top of the stack). 🚗

```javascript
class Solution {
    /**
     * @param {number} target
     * @param {number[]} position
     * @param {number[]} speed
     * @return {number}
     */
    carFleet(target, position, speed) {
        let pair = position.map((p, i) => [p, speed[i]]);
        pair.sort((a, b) => b[0] - a[0]); // Sort by position, descending
        
        let stack = [];
        for (let [p, s] of pair) {
            const timeToTarget = (target - p) / s;
            stack.push(timeToTarget);
            
            // If the current car is faster/arrives at the same time as the one in front,
            // it merges into that fleet.
            if (
                stack.length >= 2 &&
                stack[stack.length - 1] <= stack[stack.length - 2]
            ) {
                stack.pop();
            }
        }
        return stack.length;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \\log n)$, dominated by the sorting step.
  * **Space Complexity**: $O(n)$ for storing the pairs and the stack.

-----

### 2\. Iteration (Optimized Space)

This method is a space-optimized version of the stack approach. After sorting the cars by position, it iterates through them and only keeps track of the arrival time of the **current fleet's leader**. A new fleet is counted only when a car is found that would arrive later than the current leader. 🚙

```javascript
class Solution {
    /**
     * @param {number} target
     * @param {number[]} position
     * @param {number[]} speed
     * @return {number}
     */
    carFleet(target, position, speed) {
        if (position.length <= 1) return position.length;
        
        let pair = position.map((p, i) => [p, speed[i]]);
        pair.sort((a, b) => b[0] - a[0]);

        let fleets = 1;
        let leaderTime = (target - pair[0][0]) / pair[0][1];
        
        for (let i = 1; i < pair.length; i++) {
            let currentTime = (target - pair[i][0]) / pair[i][1];
            // If this car takes longer than the current fleet leader,
            // it cannot catch up and thus forms a new fleet.
            if (currentTime > leaderTime) {
                fleets++;
                leaderTime = currentTime;
            }
        }
        return fleets;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \\log n)$, dominated by sorting.
  * **Space Complexity**: $O(n)$ to store the initial pairs. The iteration itself uses $O(1)$ extra space.

-----

### 3\. Using an Array as a Map

This approach avoids a comparison-based sort by using an array where the **index represents the position**. It populates this array with the arrival times. Then, it iterates backward from the target position, effectively processing cars from front to back, and counts fleets whenever a car's arrival time is greater than the current leader's time. 🗺️

```javascript
var carFleet = function(target, position, speed) {
    const time = new Array(target).fill(0);
    for (let i = 0; i < position.length; i++) {
        time[position[i]] = (target - position[i]) / speed[i];
    }
    
    let fleets = 0;
    let leaderTime = 0;
    for (let i = target - 1; i >= 0; i--) {
        // If a car at this position takes longer than the current leader,
        // it forms a new fleet.
        if (time[i] > leaderTime) {
            leaderTime = time[i];
            fleets++;
        }
    }
    return fleets;
};
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(T)$, where $T$ is the target distance. This can be more or less efficient than $O(n \\log n)$ depending on the input values.
  * **Space Complexity**: $O(T)$ for the `time` array.