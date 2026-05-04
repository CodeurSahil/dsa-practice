![Partition Equal Subset Sum](/asset/images/PartitionEqualSubsetSum.png)

---

## 1. Recursion (Brute Force)

### Intuition
At each index, we have two choices:
1. **Take** the current number into the subset.
2. **Skip** the current number.

We keep reducing our `target` (which is `sum / 2`). If the target hits exactly `0`, we succeed. If we run out of numbers or the target becomes negative, that path fails.

### Algorithm
1. Compute `totalSum = sum(nums)`. If odd, return `False`.
2. Set `target = totalSum // 2`.
3. Define `dfs(i, target)`:
   * If `target == 0`, return `True`.
   * If `i == len(nums)` or `target < 0`, return `False`.
   * Try both choices: `dfs(i + 1, target)` (skip) or `dfs(i + 1, target - nums[i])` (take).
4. Return `dfs(0, target)`.

```python
class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        if sum(nums) % 2:
            return False

        def dfs(i, target):
            if i >= len(nums):
                return target == 0
            if target < 0:
                return False

            return dfs(i + 1, target) or dfs(i + 1, target - nums[i])

        return dfs(0, sum(nums) // 2)
```
* **Time Complexity:** $O(2^n)$
* **Space Complexity:** $O(n)$ for the recursion stack.

---

## 2. Dynamic Programming (Top-Down Memoization)

### Intuition
In plain recursion, many subproblems repeat (e.g., reaching the same index `i` with the same remaining `target`). To avoid recomputing them, we store results in a DP table where `memo[i][target]` tracks whether it’s possible to form the target using elements from index `i` onward.

### Algorithm
1. Create a `memo` table initialized to `-1`.
2. Inside `dfs(i, target)`, check if `memo[i][target]` is already computed. If so, return it.
3. Otherwise, compute the result, store it in the `memo` table, and return it.

```python
class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        total = sum(nums)
        if total % 2 != 0:
            return False

        target = total // 2
        n = len(nums)
        memo = [[-1] * (target + 1) for _ in range(n + 1)]

        def dfs(i, target):
            if target == 0:
                return True
            if i >= n or target < 0:
                return False
            if memo[i][target] != -1:
                return memo[i][target]

            memo[i][target] = (dfs(i + 1, target) or 
                               dfs(i + 1, target - nums[i]))
            return memo[i][target]

        return dfs(0, target)
```
* **Time Complexity:** $O(n \cdot \text{target})$
* **Space Complexity:** $O(n \cdot \text{target})$

---

## 3. Dynamic Programming (Bottom-Up 2D)

### Intuition
Instead of recursion, we build the answer gradually. Let `dp[i][j]` mean: *using the first `i` numbers, can we form sum `j`?*
For each number, we can either skip it (value stays `dp[i-1][j]`) or take it (check `dp[i-1][j - nums[i-1]]`).

### Algorithm
1. Create a DP table `dp` of size `(n + 1) x (target + 1)` filled with `False`.
2. Base case: `dp[i][0] = True` (sum `0` is always achievable by taking nothing).
3. Fill the table by checking if we can form the sum by either including or excluding the current number.

```python
class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        total = sum(nums)
        if total % 2 != 0:
            return False

        target = total // 2
        n = len(nums)
        dp = [[False] * (target + 1) for _ in range(n + 1)]

        for i in range(n + 1):
            dp[i][0] = True

        for i in range(1, n + 1):
            for j in range(1, target + 1):
                if nums[i - 1] <= j:
                    dp[i][j] = (dp[i - 1][j] or dp[i - 1][j - nums[i - 1]])
                else:
                    dp[i][j] = dp[i - 1][j]

        return dp[n][target]
```
* **Time Complexity:** $O(n \cdot \text{target})$
* **Space Complexity:** $O(n \cdot \text{target})$

---

## 4. Dynamic Programming (Space Optimized 1D)

### Intuition
Notice that `dp[i][j]` only ever relies on the previous row `dp[i-1]`. We don't need a full 2D matrix. We can just keep two 1D arrays: `dp` (previous row) and `nextDp` (current row being built).

### Algorithm
1. Initialize `dp` of size `target + 1` with `False`. Set `dp[0] = True`.
2. For each number, create `nextDp`.
3. Update `nextDp` based on values in `dp`.
4. Swap `dp` and `nextDp` for the next iteration.

```python
class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        if sum(nums) % 2:
            return False

        target = sum(nums) // 2
        dp = [False] * (target + 1)
        nextDp = [False] * (target + 1)

        dp[0] = True
        for i in range(len(nums)):
            for j in range(1, target + 1):
                if j >= nums[i]:
                    nextDp[j] = dp[j] or dp[j - nums[i]]
                else:
                    nextDp[j] = dp[j]
            dp, nextDp = nextDp, dp

        return dp[target]
```
* **Time Complexity:** $O(n \cdot \text{target})$
* **Space Complexity:** $O(\text{target})$

---

## 5. Dynamic Programming (Hash Set)

### Intuition
Instead of an array, use a Hash Set to track all achievable sums. For each new number, add it to every existing sum in the set. If we ever hit the target, we return `True`.

### Algorithm
1. Initialize a set `dp = {0}`.
2. For each number, create a `nextDP` set.
3. For every sum `t` in `dp`, add both `t` and `t + num` to `nextDP`.
4. Replace `dp` with `nextDP`. If the target is found, return `True`.

```python
class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        if sum(nums) % 2:
            return False

        dp = set()
        dp.add(0)
        target = sum(nums) // 2

        for i in range(len(nums) - 1, -1, -1):
            nextDP = set()
            for t in dp:
                if (t + nums[i]) == target:
                    return True
                nextDP.add(t + nums[i])
                nextDP.add(t)
            dp = nextDP
        return False
```
* **Time Complexity:** $O(n \cdot \text{target})$
* **Space Complexity:** $O(\text{target})$

---

## 6. Dynamic Programming (Optimal 1D)

### Intuition
This is the most optimal standard DP solution. We use a single 1D array. By iterating through the `target` sums **backwards** (from right to left), we ensure that a number is only used once per step, eliminating the need for a separate `nextDp` array.

### Algorithm
1. Create a boolean array `dp` of size `target + 1`. Initialize `dp[0] = True`.
2. For each number `num` in `nums`, traverse `j` backwards from `target` down to `num`.
3. Set `dp[j] = dp[j] OR dp[j - num]`.

```python
class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        if sum(nums) % 2:
            return False

        target = sum(nums) // 2
        dp = [False] * (target + 1)

        dp[0] = True
        for num in nums:
            for j in range(target, num - 1, -1):
                dp[j] = dp[j] or dp[j - num]

        return dp[target]
```
* **Time Complexity:** $O(n \cdot \text{target})$
* **Space Complexity:** $O(\text{target})$

---

## 7. Dynamic Programming (Bitset / Bit Manipulation)

### Intuition
We can treat the boolean DP array as a single large integer, where the $i$-th bit being `1` means a sum of $i$ is possible. When we encounter a new number, adding it to all existing sums is mathematically equivalent to left-shifting the entire bitset by `num` and then using a bitwise `OR` with the original bitset.

### Algorithm
1. Start with `dp = 1` (which is `1 << 0`, meaning sum `0` is possible).
2. For each number, do: `dp |= dp << num`.
3. Finally, check if the $target$-th bit is set by using a bitwise `AND`.

```python
class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        total = sum(nums)
        if total % 2 != 0:
            return False

        target = total // 2
        dp = 1 << 0  # Initialize the 0th bit to 1

        for num in nums:
            # Shift bits by 'num' and merge with existing sums
            dp |= dp << num

        # Check if the 'target' bit is set to 1
        return (dp & (1 << target)) != 0
```
* **Time Complexity:** $O(n \cdot \text{target})$ *(Technically much faster in Python due to large integer bitwise optimizations)*
* **Space Complexity:** $O(\text{target})$ *(Size of the integer in bits)*