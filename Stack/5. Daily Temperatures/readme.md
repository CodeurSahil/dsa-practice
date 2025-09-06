![Daily Temperatures](/asset/images/dailyTemperatures.png)


### 1\. Brute Force

This is the most straightforward solution. For each day, it uses a **nested loop to scan all subsequent days** one by one until a warmer temperature is found. While easy to understand, it's not efficient for large inputs. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} temperatures
     * @return {number[]}
     */
    dailyTemperatures(temperatures) {
        const n = temperatures.length;
        const res = new Array(n).fill(0);

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (temperatures[j] > temperatures[i]) {
                    res[i] = j - i;
                    break;
                }
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$
  * **Space Complexity**: $O(1)$ extra space. The space for the output array is not counted.

-----

### 2\. Monotonic Stack

This is the classic and optimal solution using a **monotonic decreasing stack**. The stack stores the *indices* of the days. As we iterate through the temperatures, if the current temperature is warmer than the temperature at the index on top of the stack, we know we've found the answer for that day. We pop from the stack and calculate the difference in days, repeating until the stack is empty or the current day is no longer warmer. 🔥

```javascript
class Solution {
    /**
     * @param {number[]} temperatures
     * @return {number[]}
     */
    dailyTemperatures(temperatures) {
        const res = new Array(temperatures.length).fill(0);
        const stack = []; // Stores indices

        for (let i = 0; i < temperatures.length; i++) {
            while (
                stack.length > 0 &&
                temperatures[i] > temperatures[stack[stack.length - 1]]
            ) {
                const prevIndex = stack.pop();
                res[prevIndex] = i - prevIndex;
            }
            stack.push(i);
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$, because each element is pushed and popped at most once.
  * **Space Complexity**: $O(n)$ for the stack in the worst case (e.g., a strictly decreasing temperature list).

-----

### 3\. Dynamic Programming (Optimized Scan)

This is a clever approach that works by iterating **backward** from the end of the array. For each day `i`, instead of scanning the next days one by one, it uses the already computed result for the next day (`res[j]`) to **intelligently jump forward**. If `temperatures[j]` isn't warmer, we can skip `res[j]` days ahead, as we know there are no warmer days in that span. ⏭️

```javascript
class Solution {
    /**
     * @param {number[]} temperatures
     * @return {number[]}
     */
    dailyTemperatures(temperatures) {
        const n = temperatures.length;
        const res = new Array(n).fill(0);

        for (let i = n - 2; i >= 0; i--) {
            let j = i + 1;
            while (j < n && temperatures[j] <= temperatures[i]) {
                if (res[j] === 0) { // If no warmer day exists for j, none will for i
                    j = n;
                    break;
                }
                j += res[j]; // Jump to the next warmer day
            }

            if (j < n) {
                res[i] = j - i;
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$. Although there's a nested loop, each index is visited a constant number of times on average.
  * **Space Complexity**: $O(1)$ extra space. The space for the output array is not counted.