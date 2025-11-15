![Combination Sum II](/asset/images/CombinationSumII.png)
![Combination Sum II](/asset/images/CombinationSumII2.png)

-----

### 1\. Brute Force (Generate All Subsets)

This method generates *all* possible subsets using a standard "include/exclude" backtracking approach. It sorts the candidates first and uses a `Set` (with `JSON.stringify`) to store the valid combinations that sum to the target, which automatically handles duplicates. 🐢

```javascript
class Solution {
    constructor() {
        this.res = new Set();
    }

    /**
     * @param {number[]} candidates
     * @param {number} target
     * @return {number[][]}
     */
    combinationSum2(candidates, target) {
        this.res.clear();
        candidates.sort((a, b) => a - b);
        this.generateSubsets(candidates, target, 0, [], 0);
        return Array.from(this.res, (subset) => JSON.parse(subset));
    }

    /**
     * @param {number[]} candidates
     * @param {number} target
     * @param {number} i
     * @param {number[]} cur
     * @param {number} total
     * @return {void}
     */
    generateSubsets(candidates, target, i, cur, total) {
        if (total === target) {
            this.res.add(JSON.stringify([...cur]));
            return;
        }
        if (total > target || i === candidates.length) {
            return;
        }

        cur.push(candidates[i]);
        this.generateSubsets(
            candidates,
            target,
            i + 1,
            cur,
            total + candidates[i],
        );
        cur.pop();

        this.generateSubsets(candidates, target, i + 1, cur, total);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n \cdot 2^n)$
  * **Space complexity**: $O(n \cdot 2^n)$

-----

### 2\. Backtracking (Skipping Duplicates)

This backtracking solution is smarter. After sorting, it uses the standard "include/exclude" pattern but adds a key optimization: after deciding to *exclude* `candidates[i]`, it skips over all subsequent identical elements. This prevents duplicate combinations from being formed from the start, avoiding the need for a `Set`.

```javascript
class Solution {
    constructor() {
        this.res = [];
    }

    /**
     * @param {number[]} candidates
     * @param {number} target
     * @return {number[][]}
     */
    combinationSum2(candidates, target) {
        this.res = [];
        candidates.sort((a, b) => a - b);
        this.dfs(candidates, target, 0, [], 0);
        return this.res;
    }

    /**
     * @param {number[]} candidates
     * @param {number} target
     * @param {number} i
     * @param {number[]} cur
     * @param {number} total
     * @return {void}
     */
    dfs(candidates, target, i, cur, total) {
        if (total === target) {
            this.res.push([...cur]);
            return;
        }
        if (total > target || i === candidates.length) {
            return;
        }

        // Include candidates[i]
        cur.push(candidates[i]);
        this.dfs(candidates, target, i + 1, cur, total + candidates[i]);
        cur.pop();

        // Exclude candidates[i] AND all its duplicates
        while (
            i + 1 < candidates.length &&
            candidates[i] === candidates[i + 1]
        ) {
            i++;
        }
        this.dfs(candidates, target, i + 1, cur, total);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n \cdot 2^n)$
  * **Space complexity**: $O(n)$

-----

### 3\. Backtracking (Frequency Map)

This method first pre-processes the candidates into a `Map` of value frequencies and a new array `A` of unique numbers. The backtracking function then iterates over the *unique* numbers, using the map to track how many of each are still available to be used.

```javascript
class Solution {
    constructor() {
        this.res = [];
        this.count = new Map();
    }

    /**
     * @param {number[]} candidates
     * @param {number} target
     * @return {number[][]}
     */
    combinationSum2(nums, target) {
        const cur = [];
        const A = [];

        for (const num of nums) {
            if (!this.count.has(num)) {
                A.push(num);
            }
            this.count.set(num, (this.count.get(num) || 0) + 1);
        }
        this.backtrack(A, target, cur, 0);
        return this.res;
    }

    /**
     * @param {number[]} nums
     * @param {number} target
     * @param {number[]} cur
     * @param {number} i
     * @return {void}
     */
    backtrack(nums, target, cur, i) {
        if (target === 0) {
            this.res.push([...cur]);
            return;
        }
        if (target < 0 || i >= nums.length) {
            return;
        }

        // Include nums[i] if available
        if (this.count.get(nums[i]) > 0) {
            cur.push(nums[i]);
            this.count.set(nums[i], this.count.get(nums[i]) - 1);
            this.backtrack(nums, target - nums[i], cur, i);
            this.count.set(nums[i], this.count.get(nums[i]) + 1);
            cur.pop();
        }

        // Exclude nums[i]
        this.backtrack(nums, target, cur, i + 1);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n \cdot 2^n)$
  * **Space complexity**: $O(n)$

-----

### 4\. Backtracking (Optimal Iterative)

This is the most standard and efficient backtracking solution. It sorts the candidates, then uses a recursive DFS that iterates with a `for` loop. It ensures uniqueness by skipping duplicate numbers at the same level of recursion (the `i > idx` check). It also prunes the search by breaking early if the sum exceeds the target. ✅

```javascript
class Solution {
    constructor() {
        this.res = [];
    }

    /**
     * @param {number[]} candidates
     * @param {number} target
     * @return {number[][]}
     */
    combinationSum2(candidates, target) {
        this.res = [];
        candidates.sort((a, b) => a - b);

        const dfs = (idx, path, cur) => {
            if (cur === target) {
                this.res.push([...path]);
                return;
            }
            for (let i = idx; i < candidates.length; i++) {
                // Skip duplicates at the same level
                if (i > idx && candidates[i] === candidates[i - 1]) {
                    continue;
                }
                // Prune search
                if (cur + candidates[i] > target) {
                    break;
                }

                path.push(candidates[i]);
                dfs(i + 1, path, cur + candidates[i]); // i + 1 means use each number once
                path.pop();
            }
        };

        dfs(0, [], 0);
        return this.res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n \cdot 2^n)$ (a loose upper bound, $O(k \cdot 2^n)$ is tighter)
  * **Space complexity**: $O(n)$ (for the recursion stack)