![Best Time to Buy and Sell Stock with Cooldown](/asset/images/BestTimetoBuyandSellStockwithCooldown.png)

---

## 1. Recursion (Brute Force)

### Intuition

Using recursion, we try all possible decisions starting from day `0`. At each step, we either take an action (buy or sell) or skip the day (cooldown).
The recursive function asks: *"What is the maximum profit we can make starting from day `i`, given whether we are currently allowed to buy or not?"*

* If we are allowed to buy, we can either buy today (subtract price, move to next day holding stock) or skip.
* If we are holding a stock, we can either sell today (add price, **skip the next day due to cooldown**, move to buying state) or skip.

### Algorithm

1. Define a recursive function `dfs(i, buying)`.
2. If `i` goes beyond the last day, return `0`.
3. Compute the option to skip the current day (cooldown): `dfs(i + 1, buying)`.
4. If `buying` is true:
* Evaluate buying the stock: `dfs(i + 1, not buying) - prices[i]`.
* Return the max of buying or skipping.


5. If `buying` is false (holding stock):
* Evaluate selling the stock: `dfs(i + 2, not buying) + prices[i]`.
* Return the max of selling or skipping.


6. Start the recursion from day `0` with `buying = True`.

```python
class Solution:
    def maxProfit(self, prices: list[int]) -> int:

        def dfs(i, buying):
            if i >= len(prices):
                return 0

            cooldown = dfs(i + 1, buying)
            
            if buying:
                buy = dfs(i + 1, not buying) - prices[i]
                return max(buy, cooldown)
            else:
                sell = dfs(i + 2, not buying) + prices[i]
                return max(sell, cooldown)

        return dfs(0, True)

```

* **Time Complexity:** $O(2^n)$. The recursion tree splits into two branches at nearly every step.
* **Space Complexity:** $O(n)$ for the recursion stack.

---

## 2. Dynamic Programming (Top-Down Memoization)

### Intuition

The recursive solution recalculates the exact same `(day, buying_state)` pairs multiple times. To make it efficient, we use memoization. For each state, we store the best profit we can achieve so that we never compute it again.

### Algorithm

1. Create a `dp` hash map where the key is `(i, buying)` and the value is the max profit.
2. Inside `dfs(i, buying)`, check if the state is already in `dp`. If so, return it.
3. Compute the `buy`/`sell` and `cooldown` values exactly as in the brute force approach.
4. Store the maximum choice in `dp[(i, buying)]` and return it.

```python
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        dp = {}  # key=(i, buying) val=max_profit

        def dfs(i, buying):
            if i >= len(prices):
                return 0
            if (i, buying) in dp:
                return dp[(i, buying)]

            cooldown = dfs(i + 1, buying)
            
            if buying:
                buy = dfs(i + 1, not buying) - prices[i]
                dp[(i, buying)] = max(buy, cooldown)
            else:
                sell = dfs(i + 2, not buying) + prices[i]
                dp[(i, buying)] = max(sell, cooldown)
                
            return dp[(i, buying)]

        return dfs(0, True)

```

* **Time Complexity:** $O(n)$. There are only $2n$ possible states.
* **Space Complexity:** $O(n)$ for the memo dictionary and recursion stack.

---

## 3. Dynamic Programming (Bottom-Up 2D Table)

### Intuition

Instead of using recursion, we can solve this using bottom-up dynamic programming. We build the solution starting from the last day and move backward to day `0`. At every day `i`, we compute the maximum profit possible from that point onward for both states (`buying` and `holding`) and store it in a 2D table.

### Algorithm

1. Create a 2D DP table `dp` of size `(n + 1) x 2`.
* `dp[i][1]` represents the max profit starting at day `i` allowed to buy.
* `dp[i][0]` represents the max profit starting at day `i` holding a stock.


2. Traverse days from `n - 1` down to `0`.
3. For each day, evaluate both states using the previously computed future days.
4. Return `dp[0][1]`.

```python
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        n = len(prices)
        dp = [[0] * 2 for _ in range(n + 2)] # n+2 to safely handle i+2 when selling

        for i in range(n - 1, -1, -1):
            for buying in [True, False]:
                if buying:
                    buy = dp[i + 1][0] - prices[i]
                    cooldown = dp[i + 1][1]
                    dp[i][1] = max(buy, cooldown)
                else:
                    sell = dp[i + 2][1] + prices[i]
                    cooldown = dp[i + 1][0]
                    dp[i][0] = max(sell, cooldown)

        return dp[0][1]

```

* **Time Complexity:** $O(n)$
* **Space Complexity:** $O(n)$ for the DP table.

---

## 4. Dynamic Programming (Space Optimized / State Machine)

### Intuition

In the bottom-up DP approach, we only ever use values from the **next day** (`i + 1`) and the **day after next** (`i + 2`). That means we do not need an entire $O(n)$ DP table. We can compress the state into just a few variables.

We track:

* `dp1_buy`: The max profit if we are allowed to buy on the next day.
* `dp1_sell`: The max profit if we are allowed to sell on the next day.
* `dp2_buy`: The max profit if we are allowed to buy *two* days ahead (used for the cooldown rule after selling).

By updating these values while iterating backward, we achieve the exact same logic using constant space.

### Algorithm

1. Initialize `dp1_buy`, `dp1_sell`, and `dp2_buy` to `0`.
2. Traverse the prices array backward.
3. For each day, calculate the current best `buy` and `sell` profits.
4. Shift the state variables backward in time (i.e., `dp2_buy` becomes the old `dp1_buy`, and `dp1` variables become the current calculations).
5. Return `dp1_buy`.

```python
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        n = len(prices)
        
        # State variables representing future days
        dp1_buy, dp1_sell = 0, 0
        dp2_buy = 0

        for i in range(n - 1, -1, -1):
            # Calculate current day profits based on future states
            dp_buy = max(dp1_sell - prices[i], dp1_buy)
            dp_sell = max(dp2_buy + prices[i], dp1_sell)
            
            # Shift state variables backwards
            dp2_buy = dp1_buy
            dp1_buy = dp_buy
            dp1_sell = dp_sell

        return dp1_buy

```

* **Time Complexity:** $O(n)$
* **Space Complexity:** $O(1)$

---
