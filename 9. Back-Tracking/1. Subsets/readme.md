![Subsets](/asset/images/Subsets.png)

-----

### 1\. Backtracking (DFS)

This is a classic recursive approach. For each element in `nums`, we make two choices:

1.  **Include** the element in the current subset.
2.  **Do not include** the element in the current subset.

We then recurse to the next element. The base case is when we have considered all elements, at which point we add the current subset to our results.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    subsets(nums) {
        const res = [];
        const subset = [];
        this.dfs(nums, 0, subset, res);
        return res;
    }

    /**
     * @param {number[]} nums
     * @param {number} i
     * @param {number[]} subset
     * @param {number[][]} res
     * @return {void}
     */
    dfs(nums, i, subset, res) {
        if (i >= nums.length) {
            res.push([...subset]);
            return;
        }
        // Decision to include nums[i]
        subset.push(nums[i]);
        this.dfs(nums, i + 1, subset, res);
        
        // Decision NOT to include nums[i]
        subset.pop();
        this.dfs(nums, i + 1, subset, res);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n \cdot 2^n)$
  * **Space complexity**: $O(n)$ (for the recursion stack, not counting output)

-----

### 2\. Iteration (Cascading)

This iterative approach starts with an empty set `[[]]`. It then iterates through each number in `nums`. For each number, it creates new subsets by adding that number to *all* existing subsets and appends them to the result.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    subsets(nums) {
        let res = [[]];

        for (let num of nums) {
            let size = res.length;
            for (let i = 0; i < size; i++) {
                let subset = res[i].slice(); // Create a copy
                subset.push(num);
                res.push(subset);
            }
        }

        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n \cdot 2^n)$
  * **Space complexity**: $O(n)$ (for the temporary `subset`, not counting output)

-----

### 3\. Bit Manipulation

This method uses a "bitmask" to generate all subsets. If `nums` has $n$ elements, there are $2^n$ possible subsets. We can iterate from $0$ to $2^n - 1$. Each number `i` in this range represents a unique subset. The $j$-th bit of `i` determines if the $j$-th element of `nums` is included in that subset.

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    subsets(nums) {
        let res = [];
        let n = nums.length;
        
        // Iterate from 0 to 2^n - 1
        for (let i = 0; i < (1 << n); i++) {
            let subset = [];
            for (let j = 0; j < n; j++) {
                // Check if the j-th bit is set
                if (i & (1 << j)) {
                    subset.push(nums[j]);
                }
            }
            res.push(subset);
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n \cdot 2^n)$
  * **Space complexity**: $O(n)$ (for the temporary `subset`, not counting output)