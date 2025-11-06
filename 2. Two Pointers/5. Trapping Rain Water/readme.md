!(Trapping Rain Water)/[asset/images/trappingRainWater.png]


The amount of water trapped above any given bar is determined by the height of the "walls" on its left and right, specifically `min(tallest_left_wall, tallest_right_wall) - current_bar_height`.

-----

### 1\. Brute Force

This is the most direct approach. For **each bar**, it iterates through the entire array twice: once to find the tallest bar to its left and once to find the tallest bar to its right. It then calculates the trapped water at that position. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} height
     * @return {number}
     */
    trap(height) {
        if (!height.length) {
            return 0;
        }
        let n = height.length;
        let res = 0;

        for (let i = 0; i < n; i++) {
            let leftMax = 0;
            for (let j = 0; j < i; j++) {
                leftMax = Math.max(leftMax, height[j]);
            }
            
            let rightMax = 0;
            for (let j = i + 1; j < n; j++) {
                rightMax = Math.max(rightMax, height[j]);
            }

            const water = Math.min(leftMax, rightMax) - height[i];
            if (water > 0) {
                res += water;
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$
  * **Space Complexity**: $O(1)$

-----

### 2\. Prefix & Suffix Arrays (Dynamic Programming)

This method optimizes the brute force approach by **pre-computing the maximum heights**. It uses two extra arrays: one to store the maximum height to the left of each position (`leftMax`) and another for the maximum height to the right (`rightMax`). This avoids redundant scanning, allowing the final water calculation to be done in a single pass. ↔️

```javascript
class Solution {
    /**
     * @param {number[]} height
     * @return {number}
     */
    trap(height) {
        let n = height.length;
        if (n === 0) return 0;

        let leftMax = new Array(n).fill(0);
        leftMax[0] = height[0];
        for (let i = 1; i < n; i++) {
            leftMax[i] = Math.max(leftMax[i - 1], height[i]);
        }

        let rightMax = new Array(n).fill(0);
        rightMax[n - 1] = height[n - 1];
        for (let i = n - 2; i >= 0; i--) {
            rightMax[i] = Math.max(rightMax[i + 1], height[i]);
        }

        let res = 0;
        for (let i = 0; i < n; i++) {
            res += Math.min(leftMax[i], rightMax[i]) - height[i];
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$ for the two extra arrays.

-----

### 3\. Monotonic Stack

This method uses a **monotonic decreasing stack** to store indices of the bars. When we encounter a bar that is taller than the one at the top of the stack, it creates a "valley" that can trap water. We can then pop from the stack and calculate the volume of water trapped between the current bar (right wall) and the new top of the stack (left wall). 💧

```javascript
class Solution {
    /**
     * @param {number[]} height
     * @return {number}
     */
    trap(height) {
        if (height.length === 0) return 0;

        const stack = []; // Stores indices
        let res = 0;

        for (let i = 0; i < height.length; i++) {
            while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
                const topIndex = stack.pop();
                if (stack.length === 0) break;
                
                const distance = i - stack[stack.length - 1] - 1;
                const boundedHeight = Math.min(height[i], height[stack[stack.length - 1]]) - height[topIndex];
                res += distance * boundedHeight;
            }
            stack.push(i);
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$ for the stack.

-----

### 4\. Two Pointers (Optimal)

This is the most space-efficient solution. It uses **two pointers**, one at the left end (`l`) and one at the right end (`r`), which move towards each other. It also keeps track of the maximum height seen so far from the left (`leftMax`) and right (`rightMax`). The key insight is that the amount of trapped water is limited by the smaller of the two max heights. So, we can always process the side with the smaller max height and add the trapped water to our total. ✅

```javascript
class Solution {
    /**
     * @param {number[]} height
     * @return {number}
     */
    trap(height) {
        if (!height || height.length === 0) return 0;

        let l = 0;
        let r = height.length - 1;
        let leftMax = height[l];
        let rightMax = height[r];
        let res = 0;
        
        while (l < r) {
            if (leftMax < rightMax) {
                l++;
                leftMax = Math.max(leftMax, height[l]);
                res += leftMax - height[l];
            } else {
                r--;
                rightMax = Math.max(rightMax, height[r]);
                res += rightMax - height[r];
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(1)$