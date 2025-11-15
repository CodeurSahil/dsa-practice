![Combination Sum](/asset/images/CombinationSum.png)
![Combination Sum](/asset/images/CombinationSum2.png)

-----

### 1\. Backtracking (Include/Exclude)

This approach uses a "choice" model. For each number, the algorithm makes two recursive calls: one that **includes** the current number (and can use it again) and one that **excludes** it (and moves to the next number).

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @returns {number[][]}
     */
    combinationSum(nums, target) {
        let ans = [];
        let cur = [];
        this.backtrack(nums, target, ans, cur, 0);
        return ans;
    }

    /**
     * @param {number[]} nums
     * @param {number} target
     * @param {number[][]} ans
     * @param {number[]} cur
     * @param {number} index
     */
    backtrack(nums, target, ans, cur, index) {
        if (target === 0) {
            ans.push([...cur]);
        } else if (target < 0 || index >= nums.length) {
            return;
        } else {
            // Include nums[index]
            cur.push(nums[index]);
            this.backtrack(nums, target - nums[index], ans, cur, index);

            // Exclude nums[index]
            cur.pop();
            this.backtrack(nums, target, ans, cur, index + 1);
        }
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(2^{t/m})$
  * **Space complexity**: $O(t/m)$

(Where $t$ is the given `target` and $m$ is the minimum value in `nums`.)

-----

### 2\. Backtracking (Optimized with Pruning)

This is a more common and often faster backtracking approach. It **sorts the input array** first. Then, it iterates through the candidates, adding one to the combination and recursing. Because the array is sorted, it can **prune** the search (stop early) if adding a number would exceed the target.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @returns {number[][]}
     */
    combinationSum(nums, target) {
        const res = [];
        nums.sort((a, b) => a - b);

        const dfs = (i, cur, total) => {
            if (total === target) {
                res.push([...cur]);
                return;
            }

            for (let j = i; j < nums.length; j++) {
                if (total + nums[j] > target) {
                    return; // Pruning
                }
                cur.push(nums[j]);
                dfs(j, cur, total + nums[j]); // Use 'j' to allow reuse
                cur.pop();
            }
        };

        dfs(0, [], 0);
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(2^{t/m})$
  * **Space complexity**: $O(t/m)$

(Where $t$ is the given `target` and $m$ is the minimum value in `nums`.)