![Coin Change II](/asset/images/CoinChangeII.png)
![Coin Change II](/asset/images/CoinChangeII2.png)

---

## 1. Recursion (Brute Force)

### Intuition

At every step, we make a choice for the current coin:

1. **Skip the coin** and move to the next one.
2. **Use the coin** and reduce the remaining amount (staying on the same coin to potentially use it again).

Recursion is a natural fit here because each choice leads to a smaller subproblem. By sorting the coins and always moving forward (never looking back at previous coins), we avoid counting the same combination in different orders.

### Algorithm

1. Sort the coin denominations to maintain a consistent order.
2. Define a recursive function `dfs(i, a)` where `i` is the current coin index and `a` is the remaining amount.
3. **Base cases**:
* If `a == 0`: Return `1` because a valid combination is formed.
* If `i >= len(coins)`: Return `0` because no combination can be formed.


4. Calculate combinations:
* **Option 1**: Skip the current coin $\rightarrow$ `dfs(i + 1, a)`
* **Option 2**: Use the current coin (if `a >= coins[i]`) $\rightarrow$ `dfs(i, a - coins[i])`


5. Return the sum of both options.

```python
from typing import List

class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        coins.sort()

        def dfs(i, a):
            if a == 0:
                return 1
            if i >= len(coins):
                return 0

            res = 0
            # Option 1: Skip the current coin
            res = dfs(i + 1, a)
            
            # Option 2: Use the current coin
            if a >= coins[i]:
                res += dfs(i, a - coins[i])
                
            return res

        return dfs(0, amount)

```

* **Time Complexity:** $O(2^{\max(n, a/m)})$ where $n$ is the number of coins and $m$ is the minimum coin value.
* **Space Complexity:** $O(\max(n, a/m))$ for the recursion stack.

---

## 2. Dynamic Programming (Top-Down Memoization)

### Intuition

The pure recursive solution works, but it recomputes the same subproblems repeatedly. Each state is uniquely defined by the current coin index `i` and the remaining amount `a`. By caching the results for each `(i, a)` state in a 2D array, we avoid repeated calculations and drastically improve efficiency.

### Algorithm

1. Sort the coins.
2. Create a 2D memo table `memo` initialized to `-1`.
3. In the `dfs` function, before calculating, check if `memo[i][a]` is not `-1`. If so, return it.
4. Compute the result identically to the brute-force approach.
5. Store the result in `memo[i][a]` before returning.

```python
from typing import List

class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        coins.sort()
        memo = [[-1] * (amount + 1) for _ in range(len(coins) + 1)]

        def dfs(i, a):
            if a == 0:
                return 1
            if i >= len(coins):
                return 0
            if memo[i][a] != -1:
                return memo[i][a]

            res = dfs(i + 1, a)
            if a >= coins[i]:
                res += dfs(i, a - coins[i])

            memo[i][a] = res
            return res

        return dfs(0, amount)

```

* **Time Complexity:** $O(n \cdot a)$
* **Space Complexity:** $O(n \cdot a)$

---

## 3. Dynamic Programming (Bottom-Up 2D)

### Intuition

Instead of recursion, we build the answer step by step using a 2D table `dp`, where `dp[i][a]` represents the number of ways to form amount `a` using coins from index `i` onward. By filling the table from the base cases upward, we ensure that all required subproblems are solved when needed.

### Algorithm

1. Let $n$ be the number of coins.
2. Create a 2D DP table `dp` of size $(n + 1) \times (\text{amount} + 1)$ initialized to `0`.
3. Base case: `dp[i][0] = 1` for all $i$ (there is exactly 1 way to make amount 0).
4. Iterate through the coins in reverse order:
* For each amount $a$ from 1 to `amount`:
* Skip coin: `dp[i + 1][a]`
* Use coin: `dp[i][a - coins[i]]` (if `a >= coins[i]`)
* Add both options to get `dp[i][a]`.




5. Return `dp[0][amount]`.

```python
from typing import List

class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        n = len(coins)
        dp = [[0] * (amount + 1) for _ in range(n + 1)]

        for i in range(n + 1):
            dp[i][0] = 1

        for i in range(n - 1, -1, -1):
            for a in range(1, amount + 1):
                dp[i][a] = dp[i + 1][a]
                if a >= coins[i]:
                    dp[i][a] += dp[i][a - coins[i]]

        return dp[0][amount]

```

* **Time Complexity:** $O(n \cdot a)$
* **Space Complexity:** $O(n \cdot a)$

---

## 4. Dynamic Programming (Space Optimized 2-Row)

### Intuition

In the bottom-up approach, each row only depends on the row below it (skipping the coin) and the current row itself (using the same coin). We do not need the entire 2D grid. We can store just one 1D array (`dp`) and a temporary `nextDP` array to represent the state transitions.

### Algorithm

1. Create a 1D array `dp` of size `amount + 1` initialized to `0`. Set `dp[0] = 1`.
2. Iterate through the coins in reverse order:
* Create a new array `nextDP` initialized to `0`. Set `nextDP[0] = 1`.
* For each amount $a$ from 1 to `amount`:
* Copy value from `dp[a]` (skipping the coin).
* If $a \ge \text{coins}[i]$, add `nextDP[a - coins[i]]`.


* Overwrite `dp` with `nextDP`.


3. Return `dp[amount]`.

```python
from typing import List

class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        dp = [0] * (amount + 1)
        dp[0] = 1
        
        for i in range(len(coins) - 1, -1, -1):
            nextDP = [0] * (amount + 1)
            nextDP[0] = 1

            for a in range(1, amount + 1):
                nextDP[a] = dp[a]
                if a - coins[i] >= 0:
                    nextDP[a] += nextDP[a - coins[i]]
            dp = nextDP
            
        return dp[amount]

```

* **Time Complexity:** $O(n \cdot a)$
* **Space Complexity:** $O(a)$

---

## 5. Dynamic Programming (Optimal 1D)

### Intuition

We can actually collapse this into a single 1D array without needing a `nextDP` array. For each coin, as we iterate through amounts from left to right, `dp[a]` is automatically accumulating both the previous coin's combinations and the current coin's combinations (because `dp[a - coin]` was just updated in the same loop).

### Algorithm

1. Create a 1D array `dp` of size `amount + 1` initialized to `0`.
2. Initialize `dp[0] = 1`.
3. Iterate through the coins (order doesn't matter for this logic, but left-to-right or right-to-left both work).
4. For each coin, iterate through all amounts from `1` to `amount`:
* If the coin can be used (`coins[i] <= a`), add `dp[a - coins[i]]` to `dp[a]`.


5. Return `dp[amount]`.

```python
from typing import List

class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        dp = [0] * (amount + 1)
        dp[0] = 1
        
        for i in range(len(coins) - 1, -1, -1):
            for a in range(1, amount + 1):
                if coins[i] <= a:
                    dp[a] += dp[a - coins[i]]
                    
        return dp[amount]

```

* **Time Complexity:** $O(n \cdot a)$
* **Space Complexity:** $O(a)$

---