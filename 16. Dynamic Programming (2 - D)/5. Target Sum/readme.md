![Target Sum](/asset/images/TargetSum.png)
![Target Sum](/asset/images/TargetSum2.png)

---

## 1. Recursion (Brute Force)

### Intuition

At every index, we have two independent choices:

1. Add the current number to our running total.
2. Subtract the current number from our running total.

Using recursion, we try all possible sign assignments. The recursive function answers: *"How many ways can we reach the target starting from index `i` with the current accumulated sum?"* When all numbers are processed, we simply check whether the accumulated sum equals the target.

### Algorithm

1. Define a recursive function `backtrack(i, total)` where `i` is the current index and `total` is the sum formed so far.
2. **Base Case:** If `i` reaches the end of the array, return `1` if `total` equals the `target`, otherwise return `0`.
3. For the current index, recursively call the function for both the `+` and `-` choices:
* `backtrack(i + 1, total + nums[i])`
* `backtrack(i + 1, total - nums[i])`


4. Add the results of both recursive calls and return.
5. Start the recursion from index `0` with an initial sum of `0`.

```python
from typing import List

class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:

        def backtrack(i, total):
            if i == len(nums):
                return 1 if total == target else 0

            return (backtrack(i + 1, total + nums[i]) +
                    backtrack(i + 1, total - nums[i]))

        return backtrack(0, 0)

```

* **Time Complexity:** $O(2^n)$. The recursion tree splits into two branches at every number.
* **Space Complexity:** $O(n)$ for the recursion stack.

---

## 2. Dynamic Programming (Top-Down Memoization)

### Intuition

The recursive solution tries all possible sign combinations, but many subproblems repeat (e.g., reaching the same index with the same running total through different paths). To avoid recomputing the same states, we use memoization. Each state is uniquely defined by the current index `i` and the current accumulated sum `total`.

### Algorithm

1. Create a memoization dictionary `dp` where the key is the tuple `(i, total)` and the value is the number of ways to reach the target from that state.
2. Inside `backtrack(i, total)`, check if the base case is met.
3. If the current state `(i, total)` is already in `dp`, return the stored value.
4. Compute the result by exploring both choices (`+` and `-`).
5. Store the computed result in `dp[(i, total)]` and return it.

```python
from typing import List

class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        dp = {}  # (index, total) -> # of ways

        def backtrack(i, total):
            if i == len(nums):
                return 1 if total == target else 0
            
            if (i, total) in dp:
                return dp[(i, total)]

            dp[(i, total)] = (backtrack(i + 1, total + nums[i]) +
                              backtrack(i + 1, total - nums[i]))
            
            return dp[(i, total)]

        return backtrack(0, 0)

```

* **Time Complexity:** $O(n \cdot m)$ where $n$ is the length of `nums` and $m$ is the sum of all elements.
* **Space Complexity:** $O(n \cdot m)$ for the memo dictionary and recursion stack.

---

## 3. Dynamic Programming (Bottom-Up Array of Maps)

### Intuition

Instead of using recursion, we can solve this by building solutions step-by-step as we process each number. At each position `i`, we keep track of all possible sums we can form and *how many ways* each sum can be formed. As we move forward, each existing sum branches into two new sums by adding or subtracting the current number.

### Algorithm

1. Create a list of maps/dictionaries `dp` of size `n + 1`. `dp[i]` stores how many ways each sum can be formed using the first `i` numbers.
2. Initialize the base case: `dp[0][0] = 1` (there is exactly one way to form sum `0` using no numbers).
3. Iterate through the numbers. For each existing `(total, count)` in `dp[i]`:
* Add the current number $\rightarrow$ update `dp[i + 1][total + nums[i]] += count`
* Subtract the current number $\rightarrow$ update `dp[i + 1][total - nums[i]] += count`


4. Return `dp[n][target]`.

```python
from typing import List
from collections import defaultdict

class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        n = len(nums)
        dp = [defaultdict(int) for _ in range(n + 1)]
        dp[0][0] = 1

        for i in range(n):
            for total, count in dp[i].items():
                dp[i + 1][total + nums[i]] += count
                dp[i + 1][total - nums[i]] += count

        return dp[n][target]

```

* **Time Complexity:** $O(n \cdot m)$
* **Space Complexity:** $O(n \cdot m)$

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

In the previous bottom-up DP approach, at each step, the new states depended *only* on the previous step (`i`), not on all earlier steps. This means we don't need a full array of dictionaries. We can reuse a single dictionary to keep track of all possible sums, updating it with a temporary `next_dp` dictionary as we process each number.

### Algorithm

1. Create a dictionary `dp` initialized with `dp[0] = 1`.
2. For each number in the array:
* Create a new dictionary `next_dp`.
* For every `(total, count)` in the current `dp`:
* Update `next_dp[total + num] += count`
* Update `next_dp[total - num] += count`


* Replace `dp` with `next_dp`.


3. After all numbers are processed, return `dp[target]`.

```python
from typing import List
from collections import defaultdict

class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        dp = defaultdict(int)
        dp[0] = 1

        for num in nums:
            next_dp = defaultdict(int)
            for total, count in dp.items():
                next_dp[total + num] += count
                next_dp[total - num] += count
            dp = next_dp

        return dp[target]

```

* **Time Complexity:** $O(n \cdot m)$
* **Space Complexity:** $O(m)$ because we only store the possible sums for the current step.

