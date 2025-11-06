![Best Time to Buy and Sell Stock](/asset/images/BestTimetoBuyandSellStock.png)


### 1\. Brute Force

This approach uses **nested loops** to check every possible pair of buy and sell days. It iterates through each day as a potential "buy" day and then iterates through all subsequent days as potential "sell" days, keeping track of the maximum profit found. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
        let res = 0;
        for (let i = 0; i < prices.length; i++) {
            let buy = prices[i];
            for (let j = i + 1; j < prices.length; j++) {
                let sell = prices[j];
                res = Math.max(res, sell - buy);
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

### 2\. Two Pointers (Sliding Window)

This is an efficient solution that uses **two pointers**, a "left" pointer for buying and a "right" pointer for selling. The right pointer iterates through the array. If the "sell" price is lower than the "buy" price, it's a new minimum, so we move the buy pointer to this position. Otherwise, we calculate the profit and update the maximum profit. ↔️

```javascript
class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
        let l = 0, // Buy
            r = 1; // Sell
        let maxP = 0;

        while (r < prices.length) {
            if (prices[l] < prices[r]) {
                let profit = prices[r] - prices[l];
                maxP = Math.max(maxP, profit);
            } else {
                l = r; // Found a new lowest price
            }
            r++;
        }
        return maxP;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(1)$

-----

### 3\. Dynamic Programming (Kadane's Algorithm)

This is the most optimal and concise solution. It performs a **single pass** through the prices. It maintains two variables: `minBuy` (the lowest price seen so far) and `maxP` (the maximum profit seen so far). For each day, it updates `minBuy` if the current price is lower, and it updates `maxP` by checking if selling at the current price (relative to `minBuy`) yields a new maximum profit. ✅

```javascript
class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
        let maxP = 0;
        let minBuy = prices[0];

        for (let sellPrice of prices) {
            maxP = Math.max(maxP, sellPrice - minBuy);
            minBuy = Math.min(minBuy, sellPrice);
        }
        return maxP;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(1)$