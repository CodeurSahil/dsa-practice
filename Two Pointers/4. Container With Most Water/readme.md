![Container With Most Water](/asset/images/containerWithMostWater.png)
![Container With Most Water](/asset/images/containerWithMostWater1.png)

### 1\. Brute Force

This method uses **nested loops to check every possible pair of lines**. For each pair, it calculates the area of the container they would form and keeps track of the maximum area found. While correct, it's inefficient for large inputs. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    maxArea(heights) {
        let res = 0;
        for (let i = 0; i < heights.length; i++) {
            for (let j = i + 1; j < heights.length; j++) {
                const area = Math.min(heights[i], heights[j]) * (j - i);
                res = Math.max(res, area);
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

### 2\. Two Pointers (Optimal)

This is the highly efficient, optimal solution. It uses **two pointers**, one at the beginning (`l`) and one at the end (`r`) of the array, representing the widest possible container. At each step, it calculates the area and then **moves the pointer corresponding to the shorter line inward**. This is because moving the taller line's pointer can't possibly increase the area, as the width would decrease and the height would be, at best, the same (limited by the shorter line). ✅

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    maxArea(heights) {
        let l = 0;
        let r = heights.length - 1;
        let res = 0;

        while (l < r) {
            const area = Math.min(heights[l], heights[r]) * (r - l);
            res = Math.max(res, area);
            
            if (heights[l] <= heights[r]) {
                l++;
            } else {
                r--;
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$, because each pointer traverses the array only once.
  * **Space Complexity**: $O(1)$.