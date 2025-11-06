![Largest Rectangle in Histogram](/asset/images/largestRectangleinHistogram1.png)
![Largest Rectangle in Histogram](/asset/images/largestRectangleinHistogram2.png)


### 1\. Brute Force

This method is the most straightforward. For **each bar in the histogram**, it treats that bar as the height of a potential rectangle and expands to the left and right as far as possible while the bars are at least as tall. It calculates the area for each such rectangle and keeps track of the maximum one found. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    largestRectangleArea(heights) {
        const n = heights.length;
        let maxArea = 0;

        for (let i = 0; i < n; i++) {
            let minHeight = heights[i];
            for (let j = i; j < n; j++) {
                minHeight = Math.min(minHeight, heights[j]);
                const width = j - i + 1;
                maxArea = Math.max(maxArea, minHeight * width);
            }
        }
        return maxArea;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$
  * **Space Complexity**: $O(1)$

-----

### 2\. Stack (Two Pass)

This approach uses a **monotonic stack in two separate passes**. The first pass determines, for each bar, the index of the first bar to its left that is shorter (the left boundary). The second pass does the same for the right boundary. With these boundaries, the width of the largest possible rectangle for each bar's height can be calculated in a final third pass. ↔️

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    largestRectangleArea(heights) {
        const n = heights.length;
        const leftBoundary = Array(n);
        const rightBoundary = Array(n);
        const stack = [];

        // Find left boundaries
        for (let i = 0; i < n; i++) {
            while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
                stack.pop();
            }
            leftBoundary[i] = stack.length ? stack[stack.length - 1] : -1;
            stack.push(i);
        }

        // Find right boundaries
        stack.length = 0;
        for (let i = n - 1; i >= 0; i--) {
            while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
                stack.pop();
            }
            rightBoundary[i] = stack.length ? stack[stack.length - 1] : n;
            stack.push(i);
        }

        let maxArea = 0;
        for (let i = 0; i < n; i++) {
            const width = rightBoundary[i] - leftBoundary[i] - 1;
            maxArea = Math.max(maxArea, heights[i] * width);
        }
        return maxArea;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$

-----

### 3\. Stack (One Pass)

This is a more optimized approach that uses a **single pass**. The stack stores pairs of `[index, height]`. When we encounter a bar that's shorter than the one at the top of the stack, it means the rectangle for the taller bar (on the stack) has just ended. We can then pop it and calculate its area because we've found its right boundary (the current index). The key insight is that a bar's rectangle extends as far back as its start index. 💡

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    largestRectangleArea(heights) {
        let maxArea = 0;
        const stack = []; // pair: [index, height]

        for (let i = 0; i < heights.length; i++) {
            let start = i;
            while (stack.length > 0 && stack[stack.length - 1][1] > heights[i]) {
                const [index, height] = stack.pop();
                maxArea = Math.max(maxArea, height * (i - index));
                start = index; // Extend the current bar's start index backward
            }
            stack.push([start, heights[i]]);
        }

        // Process any remaining bars in the stack
        for (const [index, height] of stack) {
            maxArea = Math.max(maxArea, height * (heights.length - index));
        }
        return maxArea;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$

-----

### 4\. Stack (Optimal One Pass)

This is the most refined and common one-pass solution. It uses a **monotonic increasing stack that stores only indices**. When we find a bar `heights[i]` that is shorter than the bar at the index on top of the stack, we pop from the stack. The popped bar's height is `heights[popped_index]`, its right boundary is `i`, and its left boundary is the index now at the top of the stack. This allows us to calculate the area for the popped bar immediately. ✅

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    largestRectangleArea(heights) {
        const n = heights.length;
        let maxArea = 0;
        const stack = []; // Stores indices

        for (let i = 0; i <= n; i++) {
            const currentHeight = i === n ? 0 : heights[i];
            while (
                stack.length &&
                heights[stack[stack.length - 1]] >= currentHeight
            ) {
                const height = heights[stack.pop()];
                const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$