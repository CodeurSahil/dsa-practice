![Maximum Subarray](/asset/images/MaximumSubarray.png)

-----

### 1\. Brute Force

This approach checks every possible subarray. It uses two loops: the outer loop picks the starting element, and the inner loop extends the subarray to the right, calculating the sum at each step. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSubArray(nums) {
        let n = nums.length,
            res = nums[0];
        for (let i = 0; i < n; i++) {
            let cur = 0;
            for (let j = i; j < n; j++) {
                cur += nums[j];
                res = Math.max(res, cur);
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

### 2\. Recursion

This approach uses Depth First Search (DFS) to explore choices. The `flag` parameter indicates if we are currently "building" a subarray. If `flag` is true, we must either continue the current subarray or stop. If `flag` is false, we can either start a new subarray here or skip this element.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSubArray(nums) {
        const dfs = (i, flag) => {
            if (i === nums.length) return flag ? 0 : -1e6;
            if (flag) return Math.max(0, nums[i] + dfs(i + 1, true));
            return Math.max(dfs(i + 1, false), nums[i] + dfs(i + 1, true));
        };
        return dfs(0, false);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(2^n)$
  * **Space Complexity**: $O(n)$ (recursion stack)

-----

### 3\. Dynamic Programming (Top-Down)

This optimizes the recursive solution by caching results in a `memo` table. The state `memo[i][flag]` stores the result for index `i` with the specific `flag` status, avoiding re-computation.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSubArray(nums) {
        const memo = Array(nums.length + 1)
            .fill(null)
            .map(() => [null, null]);

        const dfs = (i, flag) => {
            if (i === nums.length) return flag ? 0 : -1e6;
            if (memo[i][+flag] !== null) return memo[i][+flag];
            memo[i][+flag] = flag
                ? Math.max(0, nums[i] + dfs(i + 1, true))
                : Math.max(dfs(i + 1, false), nums[i] + dfs(i + 1, true));
            return memo[i][+flag];
        };
        return dfs(0, false);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$

-----

### 4\. Dynamic Programming (Bottom-Up)

This iterative approach builds the solution from the end of the array. `dp[i][0]` represents the max subarray sum found in the range `[i...n-1]`. `dp[i][1]` represents the max subarray sum *starting* at index `i`.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSubArray(nums) {
        const n = nums.length;
        const dp = Array.from({ length: n + 1 }, () => Array(2).fill(0));

        dp[n - 1][1] = dp[n - 1][0] = nums[n - 1];
        for (let i = n - 2; i >= 0; i--) {
            dp[i][1] = Math.max(nums[i], nums[i] + dp[i + 1][1]);
            dp[i][0] = Math.max(dp[i + 1][0], dp[i][1]);
        }

        return dp[0][0];
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$

-----

### 5\. Dynamic Programming (Linear Array)

This simplifies the DP state. `dp[i]` stores the maximum subarray sum *ending* at index `i`. If `dp[i-1]` is positive, it contributes to the current element; otherwise, we start a new subarray at `nums[i]`.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSubArray(nums) {
        let dp = [...nums];
        for (let i = 1; i < nums.length; i++) {
            dp[i] = Math.max(nums[i], nums[i] + dp[i - 1]);
        }
        return Math.max(...dp);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$

-----

### 6\. Kadane's Algorithm (Optimal)

This is the standard $O(n)$ time and $O(1)$ space solution. We iterate through the array maintaining a `curSum`. If `curSum` becomes negative, we reset it to 0 because a negative prefix will never help maximize the future sum. We constantly update `maxSub` with the highest `curSum` seen. ✅

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSubArray(nums) {
        let maxSub = nums[0],
            curSum = 0;
        for (const num of nums) {
            if (curSum < 0) {
                curSum = 0;
            }
            curSum += num;
            maxSub = Math.max(maxSub, curSum);
        }
        return maxSub;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(1)$

-----

### 7\. Divide & Conquer

This approach splits the array into two halves, recursively finding the max subarray in the left and right halves. It also calculates the "max crossing sum" (a subarray that crosses the midpoint) and returns the maximum of these three values.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSubArray(nums) {
        const dfs = (l, r) => {
            if (l > r) {
                return -Infinity;
            }
            let m = (l + r) >> 1;
            let leftSum = 0,
                rightSum = 0,
                curSum = 0;
            
            // Calculate max sum extending left from mid
            for (let i = m - 1; i >= l; i--) {
                curSum += nums[i];
                leftSum = Math.max(leftSum, curSum);
            }

            // Calculate max sum extending right from mid
            curSum = 0;
            for (let i = m + 1; i <= r; i++) {
                curSum += nums[i];
                rightSum = Math.max(rightSum, curSum);
            }
            
            // Return max of: Left half, Right half, or Crossing
            return Math.max(
                dfs(l, m - 1),
                Math.max(dfs(m + 1, r), leftSum + nums[m] + rightSum),
            );
        };

        return dfs(0, nums.length - 1);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \log n)$
  * **Space Complexity**: $O(\log n)$ (recursion stack)