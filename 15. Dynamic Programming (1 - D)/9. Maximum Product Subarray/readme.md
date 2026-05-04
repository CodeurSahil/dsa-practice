![Maximum Product Subarray](/asset/images/MaximumProductSubarray.png)

---

### 1. Brute Force

**Intuition:**
The most straightforward approach is to evaluate every possible contiguous subarray. We fix a starting index `i`, then expand a window to the right `j`, keeping a running product. We update our maximum result at every step. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxProduct(nums) {
        let res = nums[0];

        for (let i = 0; i < nums.length; i++) {
            let cur = nums[i];
            res = Math.max(res, cur);
            
            for (let j = i + 1; j < nums.length; j++) {
                cur *= nums[j];
                res = Math.max(res, cur);
            }
        }

        return res;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n^2)$. We check every contiguous subarray.
* **Space Complexity**: $O(1)$. 

---

### 2. Sliding Window (Segment Processing)

**Intuition:**
A zero completely resets any ongoing product, so we can treat the array as separate "zero-free" segments. 
Within a zero-free segment:
* If there is an **even** number of negatives, the product of the entire segment is positive (and therefore the maximum).
* If there is an **odd** number of negatives, we must drop either the prefix up to the first negative OR the suffix after the last negative to leave an even number of negatives. We slide a window to enforce this `need` count.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxProduct(nums) {
        const A = [];
        let cur = [];
        let res = -Infinity;

        // 1. Find the absolute max element and split the array by 0s
        for (const num of nums) {
            res = Math.max(res, num);
            if (num === 0) {
                if (cur.length > 0) A.push(cur);
                cur = [];
            } else {
                cur.push(num);
            }
        }
        if (cur.length > 0) A.push(cur);

        // 2. Process each zero-free segment
        for (const sub of A) {
            let negs = sub.filter(x => x < 0).length;
            let prod = 1;
            // If odd negatives, we need one less to make the product positive
            let need = negs % 2 === 0 ? negs : negs - 1; 
            
            negs = 0;
            let j = 0;

            for (let i = 0; i < sub.length; i++) {
                prod *= sub[i];
                if (sub[i] < 0) {
                    negs++;
                    // Slide the left pointer to drop a negative if we exceed our 'need'
                    while (negs > need) {
                        prod /= sub[j];
                        if (sub[j] < 0) negs--;
                        j++;
                    }
                }
                // Update result if the window is valid
                if (j <= i) {
                    res = Math.max(res, prod);
                }
            }
        }

        return res;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$. Each element is added and removed from a segment/window at most once.
* **Space Complexity**: $O(n)$ to store the segments in the `A` array.

---

### 3. Kadane's Algorithm (Min/Max Tracking)

**Intuition:**
This is the optimal dynamic programming approach. Because a negative number multiplied by a negative number becomes positive, the *minimum* (most negative) product ending at the previous step is just as important as the *maximum* product. 
At each step, we calculate the current max and current min by multiplying the current number with both the previous max and previous min. ✅

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxProduct(nums) {
        let res = nums[0];
        let curMin = 1;
        let curMax = 1;

        for (const num of nums) {
            // Store curMax before it's updated so curMin can use it
            const tmp = curMax * num;
            
            curMax = Math.max(num * curMax, num * curMin, num);
            curMin = Math.min(tmp, num * curMin, num);
            
            res = Math.max(res, curMax);
        }

        return res;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$. We do a single pass through the array.
* **Space Complexity**: $O(1)$. We only track three variables.

---

### 4. Prefix & Suffix Products

**Intuition:**
As established, the max product of a zero-free array with an odd number of negatives will always be found by removing either the first negative (a suffix product) or the last negative (a prefix product).
By sweeping through the array from left-to-right (prefix) and right-to-left (suffix), we naturally evaluate all these possibilities. If we hit a `0`, we reset the running product to `1` (implicitly starting a new zero-free segment). ✅

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxProduct(nums) {
        const n = nums.length;
        let res = nums[0];
        let prefix = 0;
        let suffix = 0;

        for (let i = 0; i < n; i++) {
            // (prefix || 1) handles the 0-reset. 
            // If prefix is 0, it falls back to 1 before multiplying.
            prefix = nums[i] * (prefix || 1);
            suffix = nums[n - 1 - i] * (suffix || 1);
            
            res = Math.max(res, prefix, suffix);
        }

        return res;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$. Single pass from both directions.
* **Space Complexity**: $O(1)$.