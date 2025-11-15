![Subsets II](/asset/images/SubsetsII.png)

-----

### 1\. Brute Force (Using a Set)

This method uses the standard "include/exclude" backtracking on a sorted array. It finds all subsets and then relies on a `Set` (with `JSON.stringify`) to filter out the duplicate subsets at the end. 🐢

```javascript
class Solution {
    constructor() {
        this.res = new Set();
    }

    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    subsetsWithDup(nums) {
        nums.sort((a, b) => a - b);
        this.backtrack(nums, 0, []);
        return Array.from(this.res).map((subset) => JSON.parse(subset));
    }

    /**
     * @param {number[]} nums
     * @param {number} i
     * @param {number[]} subset
     * @return {void}
     */
    backtrack(nums, i, subset) {
        if (i === nums.length) {
            this.res.add(JSON.stringify(subset));
            return;
        }

        subset.push(nums[i]);
        this.backtrack(nums, i + 1, subset);
        subset.pop();
        this.backtrack(nums, i + 1, subset);
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n \cdot 2^n)$
  * **Space complexity**: $O(2^n)$

-----

### 2\. Backtracking - I

This is a more efficient backtracking solution. After sorting, it uses a `for` loop inside the recursion. A key check (`if (i > start && nums[i] === nums[i - 1])`) skips processing duplicates at the same recursive level, preventing duplicate subsets from being generated from the start.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    subsetsWithDup(nums) {
        const res = [];
        nums.sort((a, b) => a - b);
        this.backtrack(0, [], nums, res);
        return res;
    }

    /**
     * @param {number} start
     * @param {number[]} subset
     * @param {number[]} nums
     * @param {number[][]} res
     * @return {void}
     */
    backtrack(start, subset, nums, res) {
        res.push([...subset]);
        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) {
                continue;
            }
            subset.push(nums[i]);
            this.backtrack(i + 1, subset, nums, res);
            subset.pop();
        }
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n \cdot 2^n)$
  * **Space complexity**: $O(n)$ (extra space for recursion stack)

-----

### 3\. Backtracking - II

This is another implementation of the same optimal backtracking logic as the one above, which sorts the array and skips duplicates within its recursive `for` loop. ✅

```javascript
class Solution {
    constructor() {
        this.res = [];
    }

    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    subsetsWithDup(nums) {
        nums.sort((a, b) => a - b);
        this.backtrack(0, [], nums);
        return this.res;
    }

    /**
     * @param {number} i
     * @param {number[]} subset
     * @param {number[]} nums
     * @return {void}
     */
    backtrack(i, subset, nums) {
        this.res.push([...subset]);
        for (let j = i; j < nums.length; j++) {
            if (j > i && nums[j] === nums[j - 1]) {
                continue;
            }
            subset.push(nums[j]);
            this.backtrack(j + 1, subset, nums);
            subset.pop();
        }
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n \cdot 2^n)$
  * **Space complexity**: $O(n)$ (extra space for recursion stack)

-----

### 4\. Iteration (Cascading)

This iterative solution (also called "cascading") builds the subsets level by level. After sorting, it intelligently handles duplicates: if a number is a duplicate, it only adds it to the new subsets created in the *previous* step, rather than to all existing subsets.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    subsetsWithDup(nums) {
        nums.sort((a, b) => a - b);
        const res = [[]];
        let prevIdx = 0;
        let idx = 0;

        for (let i = 0; i < nums.length; i++) {
            idx = i >= 1 && nums[i] === nums[i - 1] ? prevIdx : 0;
            prevIdx = res.length;
            for (let j = idx; j < prevIdx; j++) {
                const tmp = [...res[j]];
                tmp.push(nums[i]);
                res.push(tmp);
            }
        }

        return res;
    }
}
```

#### Time & Space Complexity

  * **Time complexity**: $O(n \cdot 2^n)$
  * **Space complexity**: $O(1)$ (extra space, not counting output)