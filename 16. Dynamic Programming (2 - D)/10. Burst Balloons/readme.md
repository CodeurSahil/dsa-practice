![Burst Balloons](/asset/images/BurstBalloons.png)
![Burst Balloons](/asset/images/BurstBalloons2.png)

---

## 1. Brute Force (Recursion)

### Intuition

A brute-force way to solve this is to try every possible balloon as the **last** one to burst in the current array.

* If we choose a balloon to burst now, we earn coins based on its left and right neighbors.

* Then the problem reduces to bursting the remaining balloons.

To simplify edge cases (so every balloon always has two neighbors), we add a `1` to both ends of the array. The recursive function answers: *"What is the maximum number of coins we can collect from the current list of balloons?"*

### Algorithm

1. Add `1` to the beginning and end of the array to handle boundaries safely.

2. Define a recursive function `dfs(nums)` where `nums` represents the current list of remaining balloons.

3. **Base Case:** If `len(nums) == 2`, return `0` since only the boundary `1`s are left (no real balloons remain).

4. Initialize `maxCoins = 0`.

5. For each balloon index `i` between the boundaries (`1` to `len(nums) - 2`):

   * Calculate coins gained by bursting `nums[i]`: `nums[i - 1] * nums[i] * nums[i + 1]`.

   * Recursively compute the max coins from the remaining balloons: Remove `nums[i]` and call `dfs` on the new list.

   * Update `maxCoins` with the best result.

6. Return `maxCoins` for the current configuration.

```python
from typing import List

class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        nums = [1] + nums + [1]

        def dfs(nums):
            if len(nums) == 2:
                return 0

            maxCoins = 0
            for i in range(1, len(nums) - 1):
                coins = nums[i - 1] * nums[i] * nums[i + 1]
                coins += dfs(nums[:i] + nums[i + 1:])
                maxCoins = max(maxCoins, coins)
            return maxCoins

        return dfs(nums)

```

* **Time Complexity:** $O(n \cdot 2^n)$
* **Space Complexity:** $O(n \cdot 2^n)$ for creating new arrays and the recursion stack.

## 2. Dynamic Programming (Top-Down Memoization)

### Intuition

The brute-force recursion tries every possible bursting order, which repeats the same work many times. A powerful way to rethink this problem is: **instead of choosing the first balloon to burst, choose the last balloon to burst in a subarray.**

If balloon `i` is the last one to burst between indices `l` and `r`:

* Everything inside `(l..r)` except `i` is already gone.
* The neighbors of `i` are fixed: `nums[l - 1]` on the left and `nums[r + 1]` on the right.
* The remaining work splits cleanly into two independent parts: best coins from `(l..i-1)` and best coins from `(i+1..r)`.

### Algorithm

1. Add `1` to both ends of the array.
2. Use a memoization dictionary `dp` where `dp[(l, r)]` stores the maximum coins obtainable by bursting balloons in the range `[l, r]`.
3. Define `dfs(l, r)`:
* If `l > r`, return `0` (no balloons to burst).
* If `(l, r)` is already computed, return `dp[(l, r)]`.


4. Try every balloon `i` in `[l, r]` as the last balloon to burst:
* Coins from bursting `i` last: `nums[l - 1] * nums[i] * nums[r + 1]`.
* Add the best coins from the left side `dfs(l, i - 1)` and right side `dfs(i + 1, r)`.
* Take the maximum over all choices of `i`.


5. Store the best value in `dp[(l, r)]` and return it.

```python
from typing import List

class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        nums = [1] + nums + [1]
        dp = {}
        
        def dfs(l, r):
            if l > r:
                return 0
            if (l, r) in dp:
                return dp[(l, r)]

            dp[(l, r)] = 0
            for i in range(l, r + 1):
                coins = nums[l - 1] * nums[i] * nums[r + 1]
                coins += dfs(l, i - 1) + dfs(i + 1, r)
                dp[(l, r)] = max(dp[(l, r)], coins)
                
            return dp[(l, r)]

        # Pass the indices of the original array boundaries
        return dfs(1, len(nums) - 2)

```

* **Time Complexity:** $O(n^3)$. There are $O(n^2)$ states, and for each state, we iterate through $O(n)$ choices for `i`.
* **Space Complexity:** $O(n^2)$ for the `dp` cache and recursion stack.

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We can solve this iteratively by building the DP table from the smallest intervals to the largest. The interval DP state `dp[l][r]` represents the maximum coins we can collect by bursting balloons from index `l` to `r`. We fill the table by gradually increasing the range size.

### Algorithm

1. Create a new array `new_nums = [1] + nums + [1]` to handle boundaries. Let `n = len(nums)`.
2. Create a 2D table `dp` of size `(n + 2) \times (n + 2)`, initialized to `0`.
3. Fill the DP table by increasing the interval size:
* Iterate `l` backward from `n` down to `1`.
* Iterate `r` forward from `l` up to `n`.


4. For each interval `[l, r]`, try every balloon `i` in `[l, r]` as the last balloon to burst:
* Compute coins: `new_nums[l - 1] * new_nums[i] * new_nums[r + 1]`.
* Add `dp[l][i - 1]` and `dp[i + 1][r]`.
* Update `dp[l][r]` with the maximum coins found.


5. The final answer is stored in `dp[1][n]`.

```python
from typing import List

class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        n = len(nums)
        new_nums = [1] + nums + [1]

        dp = [[0] * (n + 2) for _ in range(n + 2)]
        
        # l goes from n down to 1
        for l in range(n, 0, -1):
            # r goes from l up to n
            for r in range(l, n + 1):
                # i represents the last balloon to burst in the interval [l, r]
                for i in range(l, r + 1):
                    coins = new_nums[l - 1] * new_nums[i] * new_nums[r + 1]
                    coins += dp[l][i - 1] + dp[i + 1][r]
                    dp[l][r] = max(dp[l][r], coins)

        return dp[1][n]

```

* **Time Complexity:** $O(n^3)$ due to the three nested loops.
* **Space Complexity:** $O(n^2)$ for the 2D DP table.